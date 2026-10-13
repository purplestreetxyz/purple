"""Download Wikimedia Commons images referenced by the video configs and record their licenses.

Every scene with a "file" key names a Commons file (without the "File:" prefix). Images are
stored in assets/images/<video-id>/ together with sources.json, which CREDITS.md is built from.
"""
from __future__ import annotations

import argparse
import html
import io
import json
import re
import time

import requests
from PIL import Image

from .common import IMAGES, USER_AGENT, all_video_ids, load_video, slugify

API = "https://commons.wikimedia.org/w/api.php"
MAX_SIDE = 2400

session = requests.Session()
session.headers["User-Agent"] = USER_AGENT


def _clean(value: str) -> str:
    value = re.sub(r"<[^>]+>", "", str(value or ""))
    return re.sub(r"\s+", " ", html.unescape(value)).strip()


def file_info(title: str) -> dict:
    params = dict(
        action="query", format="json", titles=f"File:{title}", prop="imageinfo",
        iiprop="url|size|extmetadata|mime", iiurlwidth=MAX_SIDE,
    )
    for attempt in range(5):
        r = session.get(API, params=params, timeout=60)
        if r.status_code == 200 and r.text.startswith("{"):
            break
        time.sleep(2 * (attempt + 1))
    pages = r.json()["query"]["pages"]
    page = next(iter(pages.values()))
    if "imageinfo" not in page:
        raise SystemExit(f"Commons file not found: {title}")
    ii = page["imageinfo"][0]
    meta = {k: _clean(v.get("value", "")) for k, v in ii.get("extmetadata", {}).items()}
    return {
        "title": title,
        "page": ii["descriptionurl"],
        "original": ii["url"],
        "download": ii.get("thumburl") if ii["width"] > MAX_SIDE else ii["url"],
        "width": ii["width"],
        "height": ii["height"],
        "license": meta.get("LicenseShortName", ""),
        "license_url": meta.get("LicenseUrl", ""),
        "artist": meta.get("Artist", ""),
        "credit": meta.get("Credit", ""),
        "date": meta.get("DateTimeOriginal", "") or meta.get("DateTime", ""),
        "description": meta.get("ImageDescription", "")[:300],
    }


def local_name(title: str) -> str:
    return slugify(title.rsplit(".", 1)[0]) + ".jpg"


def fetch_video(video_id: str, force: bool = False) -> None:
    cfg = load_video(video_id)
    out_dir = IMAGES / cfg["id"]
    out_dir.mkdir(parents=True, exist_ok=True)
    sources_path = out_dir / "sources.json"
    sources = json.loads(sources_path.read_text()) if sources_path.exists() else {}
    wanted = []
    for scene in cfg["scenes"]:
        for key in ("file", "file2"):
            if scene.get(key) and scene[key] not in wanted:
                wanted.append(scene[key])
    for title in wanted:
        dest = out_dir / local_name(title)
        if dest.exists() and title in sources and not force:
            continue
        info = file_info(title)
        for attempt in range(5):
            r = session.get(info["download"], timeout=120)
            if r.status_code == 200:
                break
            time.sleep(3 * (attempt + 1))
        r.raise_for_status()
        im = Image.open(io.BytesIO(r.content))
        im = im.convert("RGB")
        im.thumbnail((MAX_SIDE, MAX_SIDE), Image.LANCZOS)
        im.save(dest, quality=92)
        info["local"] = dest.name
        sources[title] = info
        print(f"  {cfg['id']}: {title} [{info['license']}]")
        time.sleep(0.5)
    sources = {t: sources[t] for t in wanted if t in sources}
    sources_path.write_text(json.dumps(sources, indent=2, ensure_ascii=False))


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("videos", nargs="*", default=None)
    ap.add_argument("--force", action="store_true")
    args = ap.parse_args()
    for vid in args.videos or all_video_ids():
        fetch_video(vid, args.force)


if __name__ == "__main__":
    main()
