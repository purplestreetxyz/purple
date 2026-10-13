"""Synthesize the voiceover sentence by sentence and assemble it with controlled pauses.

Providers (pick with --provider or "tts.provider" in the video config):
  gtts        Google Translate TTS, Spain-Spanish female (lang=es, tld=es). No key needed. Default.
  edge        Microsoft Edge neural voice es-ES-ElviraNeural via edge-tts. No key needed, but the
              endpoint rejects many datacenter IPs (403); works from most home connections.
  piper       Offline Piper voice es_ES-sharvard-medium, speaker F (CC BY 3.0 dataset).
  elevenlabs  ElevenLabs TTS (Laura 1 by default). Needs ELEVENLABS_API_KEY in the environment.

Writes assets/voice/<id>/voice.flac and sentences.json (sentence text + start/end seconds).
"""
from __future__ import annotations

import argparse
import asyncio
import json
import os
import subprocess
import tempfile
import urllib.error
import urllib.request
from pathlib import Path

import numpy as np

from .common import BUILD, VOICE, load_video, split_sentences

SR = 44100
PIPER_URL = "https://huggingface.co/rhasspy/piper-voices/resolve/main/es/es_ES/sharvard/medium/"
ELEVENLABS_DEFAULT_VOICE = "Io5OWgIEXStywKwU9Gkc"  # Laura 1
ELEVENLABS_DEFAULT_MODEL = "eleven_multilingual_v2"


def _decode(path: Path, tempo: float = 1.0) -> np.ndarray:
    """Decode any audio file to mono float32 at SR, trimming leading/trailing silence."""
    af = [
        "silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.02",
        "areverse",
        "silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.05",
        "areverse",
    ]
    if abs(tempo - 1.0) > 1e-3:
        af.append(f"atempo={tempo}")
    raw = subprocess.run(
        ["ffmpeg", "-v", "error", "-i", str(path), "-af", ",".join(af), "-ac", "1", "-ar", str(SR), "-f", "f32le", "-"],
        capture_output=True, check=True,
    ).stdout
    return np.frombuffer(raw, dtype=np.float32).copy()


def synth_gtts(text: str, out: Path, opts: dict) -> None:
    from gtts import gTTS

    for attempt in range(5):
        try:
            gTTS(text, lang="es", tld=opts.get("tld", "es")).save(str(out))
            return
        except Exception as exc:  # network hiccups / rate limits
            if attempt == 4:
                raise
            print("  gTTS retry:", exc)
            import time
            time.sleep(3 * (attempt + 1))


def synth_edge(text: str, out: Path, opts: dict) -> None:
    import edge_tts

    async def run():
        comm = edge_tts.Communicate(text, opts.get("voice", "es-ES-ElviraNeural"), rate=opts.get("rate", "+0%"))
        await comm.save(str(out))

    asyncio.run(run())


def synth_piper(text: str, out: Path, opts: dict) -> None:
    model_dir = BUILD / "piper"
    model_dir.mkdir(parents=True, exist_ok=True)
    model = model_dir / "es_ES-sharvard-medium.onnx"
    for f in (model, model.with_suffix(".onnx.json")):
        if not f.exists():
            subprocess.run(["curl", "-sL", "-o", str(f), PIPER_URL + f.name], check=True)
    subprocess.run(
        ["piper", "-m", str(model), "--speaker", str(opts.get("speaker", 1)), "-f", str(out)],
        input=text.encode(), check=True, capture_output=True,
    )


def synth_elevenlabs(text: str, out: Path, opts: dict) -> None:
    api_key = opts.get("api_key") or os.environ.get("ELEVENLABS_API_KEY")
    if not api_key:
        raise SystemExit(
            "elevenlabs provider needs ELEVENLABS_API_KEY in the environment "
            "(or tts.elevenlabs.api_key in the video config)."
        )
    voice_id = opts.get("voice_id", ELEVENLABS_DEFAULT_VOICE)
    model_id = opts.get("model_id", ELEVENLABS_DEFAULT_MODEL)
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{voice_id}"
    body = json.dumps({
        "text": text,
        "model_id": model_id,
        "voice_settings": {
            "stability": float(opts.get("stability", 0.4)),
            "similarity_boost": float(opts.get("similarity_boost", 0.75)),
            "style": float(opts.get("style", 0.2)),
            "use_speaker_boost": bool(opts.get("use_speaker_boost", True)),
        },
    }).encode()
    req = urllib.request.Request(
        url,
        data=body,
        method="POST",
        headers={
            "xi-api-key": api_key,
            "Content-Type": "application/json",
            "Accept": "audio/mpeg",
        },
    )
    for attempt in range(5):
        try:
            with urllib.request.urlopen(req, timeout=120) as resp:
                out.write_bytes(resp.read())
            return
        except urllib.error.HTTPError as exc:
            detail = exc.read().decode("utf-8", "replace")[:300]
            if attempt == 4 or exc.code not in (429, 500, 502, 503):
                raise SystemExit(f"ElevenLabs HTTP {exc.code}: {detail}") from exc
            print(f"  ElevenLabs retry ({exc.code}): {detail}")
            import time
            time.sleep(3 * (attempt + 1))


PROVIDERS = {"gtts": synth_gtts, "edge": synth_edge, "piper": synth_piper, "elevenlabs": synth_elevenlabs}


def spoken_text(sentence: str, say: dict) -> str:
    for written, spoken in say.items():
        if len(written.split()) != len(spoken.split()):
            raise SystemExit(f"tts.say must keep the word count: {written!r} -> {spoken!r}")
        sentence = sentence.replace(written, spoken)
    return sentence


def build_voice(video_id: str, provider: str | None = None) -> Path:
    cfg = load_video(video_id)
    tcfg = cfg.get("tts", {})
    provider = provider or tcfg.get("provider", "gtts")
    synth = PROVIDERS[provider]
    opts = tcfg.get(provider, {})
    tempo = tcfg.get("tempo", {}).get(provider, 1.0)
    gap = tcfg.get("gap", 0.32)
    extra = {int(k): v for k, v in tcfg.get("extra_pause_after", {}).items()}
    lead_in = tcfg.get("lead_in", 0.35)

    sentences = split_sentences(cfg["script"])
    out_dir = VOICE / cfg["id"]
    out_dir.mkdir(parents=True, exist_ok=True)
    chunks = [np.zeros(int(lead_in * SR), np.float32)]
    t = lead_in
    meta = []
    with tempfile.TemporaryDirectory() as tmp:
        for i, sentence in enumerate(sentences):
            spoken = spoken_text(sentence, tcfg.get("say", {}))
            ext = "wav" if provider == "piper" else "mp3"
            raw = Path(tmp) / f"s{i:02d}.{ext}"
            synth(spoken, raw, opts)
            audio = _decode(raw, tempo)
            meta.append({"index": i, "text": sentence, "spoken": spoken, "start": round(t, 3),
                         "end": round(t + len(audio) / SR, 3)})
            chunks.append(audio)
            t += len(audio) / SR
            pause = gap + extra.get(i, 0.0)
            chunks.append(np.zeros(int(pause * SR), np.float32))
            t += pause
            print(f"  [{i:02d}] {meta[-1]['start']:6.2f}-{meta[-1]['end']:6.2f}  {sentence[:70]}")
    voice = np.concatenate(chunks)
    peak = float(np.max(np.abs(voice))) or 1.0
    voice = voice / peak * 0.89
    wav = out_dir / "voice.flac"
    subprocess.run(
        ["ffmpeg", "-y", "-v", "error", "-f", "f32le", "-ar", str(SR), "-ac", "1", "-i", "-",
         "-af", "loudnorm=I=-16:TP=-1.5:LRA=11", "-ar", str(SR), "-sample_fmt", "s16", str(wav)],
        input=voice.tobytes(), check=True,
    )
    (out_dir / "sentences.json").write_text(json.dumps(
        {"provider": provider, "options": opts, "tempo": tempo, "duration": round(t, 3), "sentences": meta},
        indent=2, ensure_ascii=False))
    print(f"  voice: {wav} ({t:.1f}s, provider={provider})")
    return wav


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("video")
    ap.add_argument("--provider", choices=sorted(PROVIDERS))
    args = ap.parse_args()
    build_voice(args.video, args.provider)


if __name__ == "__main__":
    main()
