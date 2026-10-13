"""One-shot build: images -> voice -> word timings -> music -> render -> credits.

    python -m pipeline.build                 # everything, all videos (reuses cached voice/images)
    python -m pipeline.build 02 --steps render
    python -m pipeline.build 01 --steps voice,align,music,render --provider piper
"""
from __future__ import annotations

import argparse

from . import align, commons, credits, music, render, tts
from .common import all_video_ids, load_video, VOICE

STEPS = ["images", "voice", "align", "music", "render", "credits"]


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("videos", nargs="*", help="video ids or unique prefixes (default: all)")
    ap.add_argument("--steps", default="images,music,render,credits",
                    help=f"comma list from {STEPS}. 'voice' and 'align' are opt-in: the committed voiceover and word timings are reused.")
    ap.add_argument("--provider", choices=sorted(tts.PROVIDERS), help="override the TTS provider")
    ap.add_argument("--workers", type=int, default=3)
    args = ap.parse_args()
    steps = args.steps.split(",")
    vids = [load_video(v)["id"] for v in args.videos] if args.videos else all_video_ids()
    for vid in vids:
        print(f"== {vid}")
        if "images" in steps:
            commons.fetch_video(vid)
        new_voice = "voice" in steps or not (VOICE / vid / "voice.flac").exists()
        if new_voice:
            tts.build_voice(vid, args.provider)
        if new_voice or not (VOICE / vid / "words.json").exists() or "align" in steps:
            align.align_video(vid)
        if "music" in steps:
            music.build_music(vid)
        if "render" in steps:
            render.render(vid, args.workers)
    if "credits" in steps:
        credits.main()


if __name__ == "__main__":
    main()
