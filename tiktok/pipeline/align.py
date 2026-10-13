"""Word-level timing for captions.

Each synthesized sentence is transcribed with faster-whisper (word timestamps) and its words are
matched to the script words with a sequence alignment; words Whisper missed are interpolated
inside the sentence. Output: assets/voice/<id>/words.json -> [{"w": display word, "s": start, "e": end, "i": sentence}]
"""
from __future__ import annotations

import argparse
import difflib
import json

import numpy as np

from .common import VOICE, load_video, norm_token, tokenize

SR = 16000
_model = None


def _whisper(size: str):
    global _model
    if _model is None:
        from faster_whisper import WhisperModel
        _model = WhisperModel(size, device="cpu", compute_type="int8")
    return _model


def _load_audio(path) -> np.ndarray:
    import subprocess
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", str(path), "-ac", "1", "-ar", str(SR), "-f", "f32le", "-"],
                         capture_output=True, check=True).stdout
    return np.frombuffer(raw, dtype=np.float32)


def align_sentence(audio: np.ndarray, start: float, end: float, display: list[str], spoken: list[str], model) -> list[dict]:
    pad = 0.15
    a0 = max(0, int((start - pad) * SR))
    seg = audio[a0:int((end + pad) * SR)]
    offset = a0 / SR
    segments, _ = model.transcribe(seg, language="es", word_timestamps=True, initial_prompt=" ".join(spoken),
                                   vad_filter=False, beam_size=5)
    heard = [w for s in segments for w in (s.words or [])]
    heard_norm = [norm_token(w.word) for w in heard]
    want_norm = [norm_token(w) for w in spoken]
    times: list[tuple[float, float] | None] = [None] * len(display)
    sm = difflib.SequenceMatcher(a=want_norm, b=heard_norm, autojunk=False)
    for block in sm.get_opcodes():
        tag, i1, i2, j1, j2 = block
        if tag == "equal":
            for k in range(i2 - i1):
                w = heard[j1 + k]
                times[i1 + k] = (w.start + offset, w.end + offset)
        elif tag == "replace" and j2 > j1:
            # Map a differing span (numbers, respellings) proportionally onto the heard span.
            t0, t1 = heard[j1].start + offset, heard[j2 - 1].end + offset
            lens = [max(1, len(want_norm[i])) for i in range(i1, i2)]
            total, acc = sum(lens), 0
            for k, i in enumerate(range(i1, i2)):
                s = t0 + (t1 - t0) * acc / total
                acc += lens[k]
                times[i] = (s, t0 + (t1 - t0) * acc / total)
    # Interpolate anything still missing between known neighbours (or the sentence bounds).
    known = [(i, t) for i, t in enumerate(times) if t]
    for i, t in enumerate(times):
        if t:
            continue
        prev = max((k for k in known if k[0] < i), default=None, key=lambda k: k[0])
        nxt = min((k for k in known if k[0] > i), default=None, key=lambda k: k[0])
        lo = prev[1][1] if prev else start
        hi = nxt[1][0] if nxt else end
        lo_i = prev[0] if prev else -1
        hi_i = nxt[0] if nxt else len(times)
        frac0 = (i - lo_i - 1) / max(1, hi_i - lo_i - 1)
        frac1 = (i - lo_i) / max(1, hi_i - lo_i - 1)
        times[i] = (lo + (hi - lo) * frac0, lo + (hi - lo) * frac1)
    out = []
    for i, (w, (s, e)) in enumerate(zip(display, times)):
        s = max(start - 0.05, min(s, end))
        e = max(s + 0.05, min(e, end + 0.05))
        out.append({"w": w, "s": round(s, 3), "e": round(e, 3)})
    for i in range(1, len(out)):  # enforce monotonic timings
        if out[i]["s"] < out[i - 1]["s"]:
            out[i]["s"] = out[i - 1]["s"]
        out[i]["e"] = max(out[i]["e"], out[i]["s"] + 0.05)
    matched = sum(1 for b in sm.get_matching_blocks() for _ in range(b.size))
    return out, matched


def align_video(video_id: str, model_size: str = "small") -> None:
    cfg = load_video(video_id)
    vdir = VOICE / cfg["id"]
    meta = json.loads((vdir / "sentences.json").read_text())
    audio = _load_audio(vdir / "voice.flac")
    model = _whisper(model_size)
    words = []
    total = matched_total = 0
    for s in meta["sentences"]:
        display, spoken = tokenize(s["text"]), tokenize(s["spoken"])
        ws, matched = align_sentence(audio, s["start"], s["end"], display, spoken, model)
        for w in ws:
            w["i"] = s["index"]
        words += ws
        total += len(display)
        matched_total += matched
    (vdir / "words.json").write_text(json.dumps(words, indent=1, ensure_ascii=False))
    print(f"  aligned {len(words)} words, {matched_total}/{total} matched exactly by Whisper")


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("video")
    ap.add_argument("--model", default="small")
    args = ap.parse_args()
    align_video(args.video, args.model)


if __name__ == "__main__":
    main()
