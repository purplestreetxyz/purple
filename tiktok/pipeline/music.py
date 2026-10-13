"""Procedural background music (original, generated here -> no third-party license).

Each video config has a "music" block: {"style": "jazz" | "minimal" | "epic", "bpm": 88, "key": 62, "seed": 1}.
Writes assets/music/<id>.flac with the requested duration (defaults to voice length + outro).
"""
from __future__ import annotations

import argparse
import json
import subprocess

import numpy as np

from .common import MUSIC, VOICE, load_video

SR = 44100

PROGRESSIONS = {
    # semitone offsets from the key root; chords as stacked intervals
    "jazz": [(2, [0, 3, 7, 10, 14]), (7, [0, 4, 7, 10, 14]), (0, [0, 4, 7, 11, 14]), (9, [0, 4, 7, 10, 13])],
    "minimal": [(0, [0, 3, 7, 10]), (8, [0, 4, 7, 11]), (3, [0, 4, 7, 11]), (10, [0, 4, 7, 9])],
    "epic": [(0, [0, 3, 7, 12]), (8, [0, 4, 7, 12]), (3, [0, 4, 7, 12]), (10, [0, 4, 7, 12])],
}


def midi_hz(m: float) -> float:
    return 440.0 * 2 ** ((m - 69) / 12)


def env_adsr(n: int, a: float, d: float, s: float, r: float) -> np.ndarray:
    a_n, d_n, r_n = int(a * SR), int(d * SR), int(r * SR)
    sus = max(0, n - a_n - d_n - r_n)
    e = np.concatenate([np.linspace(0, 1, a_n, endpoint=False), np.linspace(1, s, d_n, endpoint=False),
                        np.full(sus, s), np.linspace(s, 0, r_n)])
    return np.pad(e, (0, max(0, n - len(e))))[:n]


def rhodes(freq: float, dur: float, vel: float = 0.6) -> np.ndarray:
    t = np.arange(int(dur * SR)) / SR
    idx = 1.8 * np.exp(-t * 3.0) * vel
    tone = np.sin(2 * np.pi * freq * t + idx * np.sin(2 * np.pi * freq * t))
    tone += 0.25 * np.sin(2 * np.pi * freq * 2 * t) * np.exp(-t * 6)
    return tone * env_adsr(len(t), 0.004, 0.6, 0.35, 0.25) * np.exp(-t * 0.6) * vel


def pad(freq: float, dur: float, rng) -> np.ndarray:
    t = np.arange(int(dur * SR)) / SR
    out = np.zeros_like(t)
    for det in (-0.07, 0.0, 0.08):
        f = freq * 2 ** (det / 12)
        ph = rng.random() * 2 * np.pi
        for h in range(1, 7):
            out += np.sin(2 * np.pi * f * h * t + ph * h) / (h ** 1.6)
    return out * env_adsr(len(t), 0.9, 0.5, 0.8, 0.9) * 0.18


def pluck(freq: float, dur: float, bright: float = 0.5) -> np.ndarray:
    t = np.arange(int(dur * SR)) / SR
    out = np.zeros_like(t)
    for h, amp in ((1, 1.0), (2, 0.5 * bright), (3, 0.25 * bright), (4.0, 0.18 * bright)):
        out += amp * np.sin(2 * np.pi * freq * h * t) * np.exp(-t * (5 + 4 * h))
    return out * env_adsr(len(t), 0.002, 0.05, 0.9, 0.05)


def marimba(freq: float, dur: float) -> np.ndarray:
    t = np.arange(int(dur * SR)) / SR
    out = np.sin(2 * np.pi * freq * t) * np.exp(-t * 7) + 0.35 * np.sin(2 * np.pi * freq * 4 * t) * np.exp(-t * 22)
    return out * env_adsr(len(t), 0.002, 0.05, 0.9, 0.04)


def bass(freq: float, dur: float) -> np.ndarray:
    t = np.arange(int(dur * SR)) / SR
    x = np.sin(2 * np.pi * freq * t) + 0.3 * np.sin(2 * np.pi * freq * 2 * t)
    return np.tanh(1.5 * x) * env_adsr(len(t), 0.01, 0.2, 0.7, 0.08) * 0.5


def kick(vel=1.0) -> np.ndarray:
    t = np.arange(int(0.45 * SR)) / SR
    f = 48 + 90 * np.exp(-t * 30)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 9) * vel


def noise_hit(dur, decay, rng, hp=True, vel=1.0) -> np.ndarray:
    n = rng.standard_normal(int(dur * SR))
    if hp:
        n = np.diff(n, prepend=0)
    t = np.arange(len(n)) / SR
    return n * np.exp(-t * decay) * vel


def timpani(freq, vel=1.0) -> np.ndarray:
    t = np.arange(int(1.6 * SR)) / SR
    return (np.sin(2 * np.pi * freq * t) + 0.4 * np.sin(2 * np.pi * freq * 1.5 * t)) * np.exp(-t * 2.5) * vel


def lowpass(x: np.ndarray, cutoff: float) -> np.ndarray:
    spec = np.fft.rfft(x)
    freqs = np.fft.rfftfreq(len(x), 1 / SR)
    spec *= 1 / np.sqrt(1 + (freqs / cutoff) ** 4)
    return np.fft.irfft(spec, n=len(x))


def reverb(x: np.ndarray, rng, seconds=2.2, mix=0.25) -> np.ndarray:
    n = int(seconds * SR)
    ir = rng.standard_normal(n) * np.exp(-np.arange(n) / SR * (6.9 / seconds))
    ir = lowpass(ir, 5000)
    ir /= np.sqrt(np.sum(ir ** 2))
    size = 1 << int(np.ceil(np.log2(len(x) + n)))
    wet = np.fft.irfft(np.fft.rfft(x, size) * np.fft.rfft(ir, size), size)[:len(x)]
    return x * (1 - mix) + wet * mix * 0.7


def add(buf: np.ndarray, sig: np.ndarray, at: float, gain: float = 1.0) -> None:
    i = int(at * SR)
    if i >= len(buf):
        return
    j = min(len(buf), i + len(sig))
    buf[i:j] += sig[:j - i] * gain


def compose(style: str, bpm: float, key: int, duration: float, seed: int) -> np.ndarray:
    rng = np.random.default_rng(seed)
    beat = 60 / bpm
    bar = 4 * beat
    n_bars = int(np.ceil(duration / bar)) + 1
    length = int((n_bars * bar + 3) * SR)
    harm, perc, low = np.zeros(length), np.zeros(length), np.zeros(length)
    prog = PROGRESSIONS[style]
    for b in range(n_bars):
        t0 = b * bar
        root, chord = prog[b % len(prog)]
        notes = [key + root + iv for iv in chord]
        section = 0 if b < 2 else (1 if b < n_bars * 0.55 else 2)
        if style == "jazz":
            for k, m in enumerate(notes[1:]):
                add(harm, rhodes(midi_hz(m), bar * 0.95, 0.42), t0 + k * 0.012)
                add(harm, rhodes(midi_hz(m), beat * 1.4, 0.3), t0 + 2.5 * beat + k * 0.01)
            for k, bt in enumerate([0, 1.5, 2, 3, 3.5]):
                m = notes[0] - 24 + (7 if k in (2, 4) else 0)
                add(low, bass(midi_hz(m), beat * 0.9), t0 + bt * beat, 0.8)
            if section >= 1:
                for bt in range(4):
                    add(perc, kick(0.8 if bt % 2 == 0 else 0.4), t0 + bt * beat, 0.7 if bt % 2 == 0 else 0.0)
                    add(perc, noise_hit(0.25, 18, rng, vel=0.5), t0 + (bt + 0.0) * beat, 0.25 if bt % 2 else 0)
                    for sw in (0, 0.66):
                        add(perc, noise_hit(0.06, 70, rng, vel=0.35), t0 + (bt + sw) * beat, 0.5)
        elif style == "minimal":
            add(harm, sum(pad(midi_hz(m), bar * 1.02, rng) for m in notes), t0, 0.8)
            arp = notes + [notes[1] + 12, notes[2] + 12]
            pattern = [0, 2, 4, 1, 3, 5, 2, 4]
            for k in range(8):
                m = arp[pattern[k] % len(arp)] + 12
                add(harm, marimba(midi_hz(m), beat * 0.9), t0 + k * beat / 2, 0.32)
                if section == 2:
                    add(harm, marimba(midi_hz(m + 12), beat * 0.4), t0 + k * beat / 2 + beat / 4, 0.12)
            add(low, bass(midi_hz(notes[0] - 24), bar * 0.95), t0, 0.7)
            if section >= 1:
                for bt in range(4):
                    add(perc, kick(0.7), t0 + bt * beat, 0.55 if bt in (0, 2) else 0.0)
                    add(perc, noise_hit(0.05, 90, rng, vel=0.3), t0 + (bt + 0.5) * beat, 0.6)
        elif style == "epic":
            add(harm, sum(pad(midi_hz(m), bar * 1.05, rng) for m in notes + [notes[0] - 12]), t0, 0.9)
            for k in range(8):
                m = notes[[0, 1, 2, 3, 2, 1, 2, 3][k]] + 12
                add(harm, pluck(midi_hz(m), beat * 1.2, 0.7), t0 + k * beat / 2, 0.30)
            add(low, bass(midi_hz(notes[0] - 24), bar), t0, 0.7)
            if section >= 1:
                add(perc, timpani(midi_hz(key - 24), 0.9), t0, 0.7)
                add(perc, timpani(midi_hz(key - 24), 0.5), t0 + 2.5 * beat, 0.5)
                add(perc, kick(0.9), t0 + 2 * beat, 0.5)
            if section == 2:
                for bt in range(8):
                    add(perc, noise_hit(0.05, 80, rng, vel=0.3), t0 + bt * beat / 2, 0.45)
                add(perc, noise_hit(0.3, 14, rng, vel=0.6), t0 + beat, 0.35)
                add(perc, noise_hit(0.3, 14, rng, vel=0.6), t0 + 3 * beat, 0.35)
    harm = lowpass(harm, 6000 if style != "jazz" else 4200)
    mix = reverb(harm, rng, 2.4, 0.3) + reverb(perc, rng, 1.0, 0.12) * 0.8 + lowpass(low, 900)
    if style == "jazz":  # gentle vinyl crackle
        crackle = (rng.random(length) > 0.9996) * rng.standard_normal(length) * 0.15
        mix += lowpass(crackle + rng.standard_normal(length) * 0.003, 7000)
    mix = mix[:int(duration * SR)]
    mix = np.tanh(mix / (np.max(np.abs(mix)) + 1e-9) * 1.3) * 0.8
    fade = int(1.5 * SR)
    mix[-fade:] *= np.linspace(1, 0, fade)
    return mix.astype(np.float32)


def build_music(video_id: str, duration: float | None = None) -> None:
    cfg = load_video(video_id)
    mcfg = cfg.get("music", {})
    if duration is None:
        words = json.loads((VOICE / cfg["id"] / "words.json").read_text())
        duration = words[-1]["e"] + cfg.get("outro_gap", 0.5) + 4.2 + 0.5
    mix = compose(mcfg.get("style", "minimal"), mcfg.get("bpm", 92), mcfg.get("key", 57), duration, mcfg.get("seed", 1))
    stereo = np.stack([mix, np.roll(mix, int(0.012 * SR))], axis=1)
    MUSIC.mkdir(parents=True, exist_ok=True)
    out = MUSIC / f"{cfg['id']}.flac"
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-f", "f32le", "-ar", str(SR), "-ac", "2", "-i", "-",
                    "-sample_fmt", "s16", str(out)], input=stereo.tobytes(), check=True)
    print(f"  music: {out} ({duration:.1f}s, style={mcfg.get('style')})")


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("video")
    ap.add_argument("--duration", type=float)
    args = ap.parse_args()
    build_music(args.video, args.duration)


if __name__ == "__main__":
    main()
