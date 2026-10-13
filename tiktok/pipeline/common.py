"""Shared paths, brand tokens and helpers for the Purple Street TikTok pipeline."""
from __future__ import annotations

import json
import re
import subprocess
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
VIDEOS_DIR = ROOT / "videos"
ASSETS = ROOT / "assets"
FONTS = ASSETS / "fonts"
BRAND = ASSETS / "brand"
IMAGES = ASSETS / "images"
VOICE = ASSETS / "voice"
MUSIC = ASSETS / "music"
OUTPUT = ROOT / "output"
BUILD = ROOT / "build"  # scratch space, git-ignored

W, H, FPS = 1080, 1920, 30

# Brand palette, sampled from the Instagram avatar/poster and purplestreet.org.
VIOLET = (169, 116, 240)       # #A974F0 avatar background (assets/brand/avatar.jpg)
PURPLE = (94, 42, 132)         # #5E2A84 poster background
DEEP = (30, 15, 51)            # #1E0F33 shadow tone for duotones
CREAM = (247, 239, 223)        # #F7EFDF poster type / paper
INK = (12, 10, 12)             # near-black ink

FONT_DISPLAY = FONTS / "ArchivoBlack-Regular.ttf"
FONT_TEXT = FONTS / "Inter-Variable.ttf"

HANDLE = "@purplestreetorg"
WEBSITE = "purplestreet.org"

USER_AGENT = "PurpleStreetVideoPipeline/1.0 (https://purplestreet.org)"


def load_video(video_id: str) -> dict:
    path = VIDEOS_DIR / f"{video_id}.json"
    if not path.exists():
        matches = sorted(VIDEOS_DIR.glob(f"*{video_id}*.json"))
        if len(matches) != 1:
            raise SystemExit(f"Unknown video '{video_id}'. Available: {[p.stem for p in VIDEOS_DIR.glob('*.json')]}")
        path = matches[0]
    cfg = json.loads(path.read_text(encoding="utf-8"))
    cfg["id"] = path.stem
    return cfg


def all_video_ids() -> list[str]:
    return sorted(p.stem for p in VIDEOS_DIR.glob("*.json"))


def strip_accents(s: str) -> str:
    return "".join(c for c in unicodedata.normalize("NFD", s) if unicodedata.category(c) != "Mn")


def norm_token(s: str) -> str:
    """Lowercase, accent-free, punctuation-free form used to match words."""
    s = strip_accents(s.lower())
    return re.sub(r"[^a-z0-9]", "", s)


def split_sentences(text: str) -> list[str]:
    parts = re.split(r"(?<=[.!?])\s+", text.strip())
    return [p.strip() for p in parts if p.strip()]


def tokenize(text: str) -> list[str]:
    """Display tokens: whitespace-separated words, punctuation kept attached."""
    return text.split()


def ffprobe_duration(path: Path) -> float:
    out = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(path)],
        capture_output=True, text=True, check=True,
    ).stdout.strip()
    return float(out)


def slugify(s: str) -> str:
    s = strip_accents(s)
    s = re.sub(r"[^A-Za-z0-9]+", "-", s).strip("-")
    return s[:80]
