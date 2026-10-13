"""Render a video: scenes (images / cards / outro) + word-synced captions + audio mix.

Frames are drawn with Pillow in worker processes and piped to ffmpeg (H.264 + AAC).
"""
from __future__ import annotations

import argparse
import json
import math
import multiprocessing as mp
import subprocess
from functools import lru_cache
from pathlib import Path

import numpy as np
from PIL import Image, ImageChops, ImageDraw, ImageFilter, ImageFont, ImageOps

from .common import (BRAND, BUILD, CREAM, DEEP, FONT_DISPLAY, FONT_TEXT, FPS, H, HANDLE, IMAGES, INK, MUSIC, OUTPUT,
                     PURPLE, VIOLET, VOICE, W, WEBSITE, load_video, norm_token)
from .commons import local_name

CAPTION_Y = 1400          # vertical centre of the caption block (inside TikTok's safe area)
CAPTION_MAX_W = 900
CAPTION_SIZE = 96
LABEL_Y = 300
OUTRO_DUR = 4.2
XFADE = 0.22


# ----------------------------------------------------------------------------- helpers

def ease_out(x: float) -> float:
    x = min(1.0, max(0.0, x))
    return 1 - (1 - x) ** 3


def ease_in_out(x: float) -> float:
    x = min(1.0, max(0.0, x))
    return 3 * x * x - 2 * x * x * x


def back_out(x: float, s: float = 1.6) -> float:
    x = min(1.0, max(0.0, x)) - 1
    return x * x * ((s + 1) * x + s) + 1


@lru_cache(maxsize=64)
def display_font(size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(FONT_DISPLAY), size)


@lru_cache(maxsize=64)
def text_font(size: int, weight: str = "Bold") -> ImageFont.FreeTypeFont:
    f = ImageFont.truetype(str(FONT_TEXT), size)
    f.set_variation_by_name(weight)
    return f


def fit_font(text: str, max_w: int, max_size: int, min_size: int = 40) -> ImageFont.FreeTypeFont:
    size = max_size
    while size > min_size:
        f = display_font(size)
        if f.getlength(text) <= max_w:
            return f
        size -= 4
    return display_font(min_size)


def tracked(draw: ImageDraw.ImageDraw, xy, text, font, fill, tracking=0.0, anchor_center=False):
    """Draw letter-spaced text. Returns the drawn width."""
    widths = [font.getlength(c) for c in text]
    total = sum(widths) + tracking * (len(text) - 1)
    x, y = xy
    if anchor_center:
        x -= total / 2
    for c, w in zip(text, widths):
        draw.text((x, y), c, font=font, fill=fill)
        x += w + tracking
    return total


def tracked_width(text, font, tracking):
    return sum(font.getlength(c) for c in text) + tracking * (len(text) - 1)


@lru_cache(maxsize=1)
def grain_tiles() -> list[Image.Image]:
    rng = np.random.default_rng(7)
    tiles = []
    for _ in range(6):
        n = rng.normal(0, 9, (H // 2, W // 2)).astype(np.float32)
        img = Image.fromarray(np.clip(128 + n, 0, 255).astype(np.uint8), "L").resize((W, H), Image.BILINEAR)
        tiles.append(img)
    return tiles


def add_grain(img: Image.Image, frame: int, amount: float = 0.5) -> Image.Image:
    g = grain_tiles()[(frame // 3) % 6].convert("RGB")
    return ImageChops.blend(img, ImageChops.overlay(img, g), amount)


@lru_cache(maxsize=1)
def caption_gradient() -> Image.Image:
    """Alpha mask that darkens the top (labels) and lower half (captions) of full-bleed images."""
    y = np.arange(H, dtype=np.float32)
    bottom = np.clip((y - 900) / 700, 0, 1) ** 1.3 * 0.72
    top = np.clip((420 - y) / 420, 0, 1) ** 1.5 * 0.45
    a = np.maximum(bottom, top)
    return Image.fromarray((np.repeat(a[:, None], W, axis=1) * 255).astype(np.uint8), "L")


def solid(color) -> Image.Image:
    return Image.new("RGB", (W, H), color)


def gradient_map(gray: Image.Image, stops: list[tuple[float, tuple]]) -> Image.Image:
    xs = np.array([s[0] for s in stops]) * 255
    lut = []
    for ch in range(3):
        ys = np.array([s[1][ch] for s in stops], dtype=np.float32)
        lut += list(np.interp(np.arange(256), xs, ys).astype(np.uint8))
    return gray.convert("RGB").point(lut)


def grade(img: Image.Image, mode: str) -> Image.Image:
    if mode == "auto":
        hsv = np.asarray(img.convert("HSV").resize((64, 64)))
        mode = "mono" if hsv[..., 1].mean() < 38 else "color"
    if mode == "mono":
        g = ImageOps.autocontrast(img.convert("L"), cutoff=0.6)
        return gradient_map(g, [(0, INK), (0.55, (150, 140, 132)), (1, CREAM)])
    if mode == "duo":
        g = ImageOps.autocontrast(img.convert("L"), cutoff=0.6)
        return gradient_map(g, [(0, DEEP), (0.5, VIOLET), (1, CREAM)])
    if mode == "color":
        return ImageOps.autocontrast(img, cutoff=0.4)
    return img


# ----------------------------------------------------------------------------- timeline

def build_timeline(cfg: dict, words: list[dict]) -> dict:
    """Resolve each scene's "at" anchor phrase to a start time."""
    norm_words = [norm_token(w["w"]) for w in words]
    scenes = []
    cursor = 0
    for sc in cfg["scenes"]:
        sc = dict(sc)
        if sc.get("at"):
            target = [norm_token(t) for t in sc["at"].split()]
            for i in range(cursor, len(norm_words) - len(target) + 1):
                if norm_words[i:i + len(target)] == target:
                    break
            else:
                raise SystemExit(f"Anchor not found after word {cursor}: {sc['at']!r}")
            cursor = i + 1
            sc["start"] = max(0.0, words[i]["s"] - sc.get("lead", 0.08))
            sc["word_index"] = i
        else:
            sc["start"] = 0.0
            sc["word_index"] = 0
        for ln in sc.get("lines", []):
            if isinstance(ln, dict) and ln.get("at"):
                target = [norm_token(t) for t in ln["at"].split()]
                hit = next(i for i in range(sc["word_index"], len(norm_words))
                           if norm_words[i:i + len(target)] == target)
                ln["delay"] = words[hit]["s"] - sc["start"]
        scenes.append(sc)
    voice_end = words[-1]["e"]
    outro_start = voice_end + cfg.get("outro_gap", 0.5)
    total = outro_start + OUTRO_DUR
    scenes.append({"type": "outro", "start": outro_start})
    for a, b in zip(scenes, scenes[1:]):
        a["end"] = b["start"]
    scenes[-1]["end"] = total
    return {"scenes": scenes, "total": total, "voice_end": voice_end}


def caption_pages(words: list[dict], hidden: list[tuple[float, float]]) -> list[dict]:
    """Group words into short caption pages (max 2 lines, <= ~4-5 words)."""
    pages, cur = [], []
    font = display_font(CAPTION_SIZE)

    def lines_for(ws):
        lines, line = [], []
        for w in ws:
            trial = " ".join(x["w"].upper() for x in line + [w])
            if line and font.getlength(trial) > CAPTION_MAX_W:
                lines.append(line)
                line = [w]
            else:
                line.append(w)
        if line:
            lines.append(line)
        return lines

    for k, w in enumerate(words):
        if cur and (len(lines_for(cur + [w])) > 2 or len(cur) >= 5 or w["i"] != cur[-1]["i"]):
            pages.append(cur)
            cur = []
        cur.append(w)
        last = w["w"][-1]
        if last in ",:;" and len(cur) >= 2:
            pages.append(cur)
            cur = []
        elif last in ".?!":
            pages.append(cur)
            cur = []
    if cur:
        pages.append(cur)
    out = []
    for p in pages:
        s = p[0]["s"]
        if any(a - 0.05 <= s < b for a, b in hidden):
            continue
        out.append({"words": p, "lines": lines_for(p), "start": s, "end": p[-1]["e"]})
    for a, b in zip(out, out[1:]):
        a["end"] = min(max(a["end"] + 0.35, a["end"]), b["start"])
    if out:
        out[-1]["end"] += 0.4
    return out


# ----------------------------------------------------------------------------- scene renderers

class Renderer:
    def __init__(self, cfg: dict, timeline: dict, pages: list[dict]):
        self.cfg = cfg
        self.tl = timeline
        self.pages = pages
        self.img_dir = IMAGES / cfg["id"]
        sources = self.img_dir / "sources.json"
        self.sources = json.loads(sources.read_text()) if sources.exists() else {}
        self._cache: dict = {}

    # -- assets
    def source(self, sc: dict) -> Image.Image:
        key = ("src", sc["file"], tuple(sc.get("crop", ())), sc.get("grade", "auto"))
        if key not in self._cache:
            im = Image.open(self.img_dir / local_name(sc["file"])).convert("RGB")
            if sc.get("crop"):
                x0, y0, x1, y1 = sc["crop"]
                im = im.crop((int(x0 * im.width), int(y0 * im.height), int(x1 * im.width), int(y1 * im.height)))
            self._cache[key] = grade(im, sc.get("grade", "auto"))
        return self._cache[key]

    def fitted(self, sc: dict, box_w: int, box_h: int, zmax: float) -> tuple[Image.Image, float]:
        """Source pre-scaled so the Ken Burns transform scale stays close to 1 (no aliasing)."""
        key = ("fit", sc["file"], tuple(sc.get("crop", ())), sc.get("grade", "auto"), box_w, box_h)
        if key not in self._cache:
            src = self.source(sc)
            cover = max(box_w / src.width, box_h / src.height) * zmax
            im = src.resize((max(1, round(src.width * cover)), max(1, round(src.height * cover))), Image.LANCZOS)
            self._cache[key] = (im, cover / zmax)
        return self._cache[key]

    def ken_burns(self, sc: dict, t: float, dur: float, box_w: int, box_h: int) -> Image.Image:
        z0, z1 = sc.get("zoom", [1.0, 1.12])
        zmax = max(z0, z1)
        im, base = self.fitted(sc, box_w, box_h, zmax)
        p = ease_in_out(t / max(dur, 0.01)) if sc.get("ease", True) else t / max(dur, 0.01)
        p = 0.15 + 0.85 * p  # never fully static at the cut
        z = z0 + (z1 - z0) * p
        fx0, fy0 = sc.get("focus", [0.5, 0.5])
        fx1, fy1 = sc.get("focus_end", [fx0, fy0])
        fx, fy = fx0 + (fx1 - fx0) * p, fy0 + (fy1 - fy0) * p
        scale = z / zmax  # im is already scaled for zmax
        vw, vh = box_w / scale, box_h / scale
        cx = min(max(fx * im.width, vw / 2), im.width - vw / 2)
        cy = min(max(fy * im.height, vh / 2), im.height - vh / 2)
        a = 1 / scale
        return im.transform((box_w, box_h), Image.AFFINE, (a, 0, cx - box_w / 2 * a, 0, a, cy - box_h / 2 * a),
                            resample=Image.BICUBIC)

    # -- scene types
    def scene_frame(self, sc: dict, t: float, frame: int) -> Image.Image:
        dur = sc["end"] - sc["start"]
        kind = sc["type"]
        if kind == "image":
            layout = sc.get("layout", "full")
            if layout == "pair":
                img = self.image_pair(sc, t, dur)
            elif layout == "full":
                img = self.image_full(sc, t, dur)
            else:
                img = self.image_poster(sc, t, dur)
        elif kind == "card":
            img = self.card(sc, t, dur)
        elif kind == "outro":
            img = self.outro(sc, t, dur)
        else:
            raise ValueError(kind)
        if sc.get("label") and kind == "image":
            self.draw_label(img, sc["label"], t)
        if kind == "image":
            self.draw_attribution(img, sc)
        return img

    def image_full(self, sc, t, dur):
        img = self.ken_burns(sc, t, dur, W, H)
        shade = Image.new("RGB", (W, H), (8, 4, 14))
        return Image.composite(shade, img, caption_gradient())

    def poster_bg(self, color) -> Image.Image:
        key = ("bg", color)
        if key not in self._cache:
            self._cache[key] = solid(color)
        return self._cache[key].copy()

    def image_poster(self, sc, t, dur):
        bg_color = {"violet": VIOLET, "purple": PURPLE, "black": INK, "cream": CREAM}[sc.get("bg", "violet")]
        img = self.poster_bg(bg_color)
        src = self.source(sc)
        max_w, max_h = sc.get("max_w", 940), sc.get("max_h", 820)
        ar = src.width / src.height
        pw, ph = (max_w, round(max_w / ar)) if max_w / ar <= max_h else (round(max_h * ar), max_h)
        cy = sc.get("center_y", 720)
        x0, y0 = (W - pw) // 2, cy - ph // 2
        enter = ease_out(t / 0.45)
        y0 += round((1 - enter) * 60)
        panel = self.ken_burns(dict(sc, zoom=sc.get("zoom", [1.0, 1.08])), t, dur, pw, ph)
        d = ImageDraw.Draw(img)
        border, line, shadow = 16, 6, 18
        d.rectangle([x0 - border - line + shadow, y0 - border - line + shadow,
                     x0 + pw + border + line + shadow, y0 + ph + border + line + shadow], fill=INK)
        d.rectangle([x0 - border - line, y0 - border - line, x0 + pw + border + line, y0 + ph + border + line], fill=INK)
        d.rectangle([x0 - border, y0 - border, x0 + pw + border, y0 + ph + border], fill=CREAM)
        img.paste(panel, (x0, y0))
        if sc.get("headline"):
            self.draw_blocks(img, [sc["headline"]] if isinstance(sc["headline"], str) else sc["headline"],
                             top=y0 + ph + border + 50, t=t - 0.15, size=78)
        return img

    def image_pair(self, sc, t, dur):
        """Two portraits side by side, each in a poster frame with a name block underneath."""
        img = self.poster_bg({"violet": VIOLET, "purple": PURPLE, "black": INK}[sc.get("bg", "violet")])
        d = ImageDraw.Draw(img)
        pw, ph = sc.get("panel", [430, 580])
        cy = sc.get("center_y", 720)
        names = sc.get("names", ["", ""])
        for k, (file, focus) in enumerate(((sc["file"], sc.get("focus", [0.5, 0.4])),
                                            (sc["file2"], sc.get("focus2", [0.5, 0.4])))):
            local_t = t - 0.18 * k
            p = ease_out(local_t / 0.4)
            if p <= 0:
                continue
            sub = {"file": file, "focus": focus, "zoom": [1.0, 1.08], "grade": sc.get("grade", "auto")}
            panel = self.ken_burns(sub, max(0, local_t), dur, pw, ph)
            x0 = W // 2 - 30 - pw if k == 0 else W // 2 + 30
            y0 = cy - ph // 2 + round((1 - p) * 80)
            b, ln, sh = 12, 5, 14
            d.rectangle([x0 - b - ln + sh, y0 - b - ln + sh, x0 + pw + b + ln + sh, y0 + ph + b + ln + sh], fill=INK)
            d.rectangle([x0 - b - ln, y0 - b - ln, x0 + pw + b + ln, y0 + ph + b + ln], fill=INK)
            d.rectangle([x0 - b, y0 - b, x0 + pw + b, y0 + ph + b], fill=CREAM)
            img.paste(panel, (x0, y0))
            if names[k]:
                f = fit_font(names[k].upper(), pw, 46)
                l, tp, r, bt = f.getbbox(names[k].upper())
                bx = x0 + (pw - (r - l + 36)) // 2
                by = y0 + ph + 40
                d.rectangle([bx, by, bx + r - l + 36, by + bt - tp + 28], fill=INK)
                d.text((bx + 18 - l, by + 14 - tp), names[k].upper(), font=f, fill=CREAM)
        return img

    def draw_blocks(self, img, lines, top, t, size=120, max_w=920, fill=INK, color=CREAM, gap=14, stagger=0.1):
        d = ImageDraw.Draw(img)
        y = top
        for k, line in enumerate(lines):
            f = fit_font(line, max_w - 60, size)
            l, tp, r, b = f.getbbox(line)
            tw, th = r - l, b - tp
            p = back_out((t - k * stagger) / 0.35)
            if p <= 0:
                y += th + 44 + gap
                continue
            bw, bh = tw + 56, th + 44
            x = (W - bw) // 2
            yy = y + round((1 - min(p, 1)) * 40)
            d.rectangle([x, yy, x + bw, yy + bh], fill=fill)
            d.text((x + 28 - l, yy + 22 - tp), line, font=f, fill=color)
            y += bh + gap
        return y

    def card(self, sc, t, dur):
        style = sc.get("style", "violet")
        bg = {"violet": VIOLET, "purple": PURPLE, "black": INK, "cream": CREAM}[style]
        img = self.poster_bg(bg)
        d = ImageDraw.Draw(img)
        lines = [ln if isinstance(ln, dict) else {"text": ln} for ln in sc["lines"]]
        base = sc.get("size", 150)
        # measure
        rows = []
        for ln in lines:
            f = fit_font(ln["text"], 880, ln.get("size", base))
            l, tp, r, b = f.getbbox(ln["text"])
            rows.append((ln, f, l, tp, r - l, b - tp))
        kicker = sc.get("kicker")
        kf = text_font(34, "ExtraBold")
        total_h = sum(h + 60 for *_, h in rows) + (90 if kicker else 0)
        y = sc.get("center_y", 820) - total_h // 2
        if kicker:
            p = ease_out(t / 0.3)
            kc = CREAM if style in ("black", "purple", "violet") else INK
            if p > 0:
                tracked(d, (W / 2, y + (1 - p) * 20), kicker.upper(), kf, kc, tracking=6, anchor_center=True)
            y += 90
        for k, (ln, f, l, tp, tw, th) in enumerate(rows):
            delay = ln.get("delay", 0.08 + k * 0.12)
            p = back_out((t - delay) / 0.32)
            bh = th + 44
            if p > 0:
                accent = ln.get("style") == "accent"
                if style in ("black",):
                    block, color = (VIOLET if accent else None), (CREAM if not accent else INK)
                elif style == "cream":
                    block, color = (VIOLET if accent else INK), (INK if accent else CREAM)
                else:
                    block, color = (CREAM if accent else INK), (INK if accent else CREAM)
                s = 0.6 + 0.4 * p
                layer = Image.new("RGBA", (tw + 60, bh), (0, 0, 0, 0))
                ld = ImageDraw.Draw(layer)
                if block:
                    ld.rectangle([0, 0, tw + 59, bh - 1], fill=block + (255,))
                ld.text((30 - l, 22 - tp), ln["text"], font=f, fill=color + (255,))
                if ln.get("strike"):
                    sp = ease_out((t - delay - ln.get("strike_delay", 0.5)) / 0.25)
                    if sp > 0:
                        ld.rectangle([10, bh // 2 - 6, 10 + (tw + 40) * sp, bh // 2 + 6], fill=VIOLET + (255,))
                lw, lh = max(1, round(layer.width * s)), max(1, round(layer.height * s))
                layer = layer.resize((lw, lh), Image.BICUBIC)
                img.paste(layer, ((W - lw) // 2, y + (bh - lh) // 2), layer)
            y += bh + 16
        if sc.get("sub"):
            p = ease_out((t - sc.get("sub_delay", 0.5)) / 0.3)
            if p > 0:
                sf = text_font(44, "SemiBold")
                sc_col = CREAM if style in ("black", "purple", "violet") else INK
                for line in sc["sub"] if isinstance(sc["sub"], list) else [sc["sub"]]:
                    d.text((W / 2, y + 30 + (1 - p) * 20), line, font=sf, fill=sc_col, anchor="ma")
                    y += 62
        return img

    def avatar(self, size: int) -> Image.Image:
        key = ("avatar", size)
        if key not in self._cache:
            a = Image.open(BRAND / "avatar.jpg").convert("RGB").resize((size, size), Image.LANCZOS)
            # Feather the top edge so the illustration's flat violet melts into the card background.
            fade = np.clip(np.arange(size, dtype=np.float32) / 90, 0, 1)
            mask = Image.fromarray((np.repeat(fade[:, None], size, axis=1) * 255).astype(np.uint8), "L")
            self._cache[key] = (a, mask)
        return self._cache[key]

    def outro(self, sc, t, dur):
        """Closing card: the ink-illustration avatar on its own violet, PURPLE STREET band, handle and site."""
        img = self.poster_bg(VIOLET)
        d = ImageDraw.Draw(img)
        p = ease_out(t / 0.6)
        z = 0.94 + 0.06 * p + 0.03 * ease_in_out(t / dur)
        a, mask = self.avatar(W)
        size = round(W * z)
        a, mask = a.resize((size, size), Image.BICUBIC), mask.resize((size, size), Image.BICUBIC)
        if p < 1:
            mask = mask.point(lambda v: int(v * p))
        band_top = 1170
        img.paste(a, ((W - size) // 2, band_top + 60 - size), mask)

        q = ease_out(t / 0.35)
        band_h = 360
        y0 = band_top + round((1 - q) * (H - band_top))
        d.rectangle([0, y0, W, y0 + band_h], fill=INK)
        for k, word in enumerate(("PURPLE", "STREET")):
            r = ease_out((t - 0.3 - 0.1 * k) / 0.35)
            if r <= 0:
                continue
            f = display_font(150)
            d.text((W / 2, y0 + 105 + k * 160 + round((1 - r) * 30)), word, font=f, fill=CREAM, anchor="mm")

        r = ease_out((t - 0.6) / 0.35)
        if r > 0:
            dy = round((1 - r) * 24)
            d.text((W / 2, band_top + band_h + 80 + dy), HANDLE, font=display_font(76), fill=INK, anchor="mm")
            d.text((W / 2, band_top + band_h + 160 + dy), WEBSITE, font=text_font(44, "SemiBold"), fill=INK,
                   anchor="mm")
        r = ease_out((t - 0.9) / 0.35)
        if r > 0:
            kf = text_font(38, "ExtraBold")
            tracked(d, (W / 2, 120 - round((1 - r) * 20)), "SÍGUENOS PARA MÁS HERSTORY", kf, INK, tracking=6,
                    anchor_center=True)
        return img

    # -- overlays
    def draw_label(self, img, label: dict, t: float):
        p = ease_out((t - 0.2) / 0.35)
        if p <= 0:
            return
        d = ImageDraw.Draw(img)
        name = label["name"].upper()
        nf = fit_font(name, W - 170, 54, 30)
        l, tp, r, b = nf.getbbox(name)
        x = 60 - round((1 - p) * 500)
        y = LABEL_Y
        d.rectangle([x, y, x + r - l + 44, y + b - tp + 34], fill=INK)
        d.text((x + 22 - l, y + 17 - tp), name, font=nf, fill=CREAM)
        if label.get("info"):
            inf = text_font(36, "Bold")
            info = label["info"]
            l2, t2, r2, b2 = inf.getbbox(info)
            y2 = y + b - tp + 34
            x2 = 60 - round((1 - ease_out((t - 0.32) / 0.35)) * 500)
            d.rectangle([x2, y2, x2 + r2 - l2 + 36, y2 + b2 - t2 + 26], fill=VIOLET)
            d.text((x2 + 18 - l2, y2 + 13 - t2), info, font=inf, fill=INK)

    def draw_attribution(self, img, sc):
        """Small on-screen credit for images whose license requires attribution (CC BY / BY-SA)."""
        y = 238
        for file in (sc.get("file"), sc.get("file2")):
            info = self.sources.get(file or "", {})
            lic = info.get("license", "")
            if not lic or lic.lower().startswith(("public domain", "cc0", "pd")) or sc.get("no_credit"):
                continue
            artist = info.get("artist", "") or "Wikimedia Commons"
            text = f"Foto: {artist[:48]} · {lic} · Wikimedia Commons"
            f = text_font(24, "Medium")
            d = ImageDraw.Draw(img)
            tw = f.getlength(text)
            x = W - 40 - tw
            d.rectangle([x - 10, y - 6, W - 30, y + 30], fill=(0, 0, 0))
            d.text((x, y), text, font=f, fill=CREAM)
            y += 40

    def draw_captions(self, img: Image.Image, t: float, center_y: int = CAPTION_Y, light_bg: bool = False):
        page = next((p for p in self.pages if p["start"] - 0.02 <= t < p["end"]), None)
        if not page:
            return
        widest = max(display_font(CAPTION_SIZE).getlength(" ".join(w["w"].upper() for w in ln)) for ln in page["lines"])
        size = CAPTION_SIZE if widest <= W - 110 else int(CAPTION_SIZE * (W - 110) / widest)
        f = display_font(size)
        d = ImageDraw.Draw(img)
        lh = round(112 * size / CAPTION_SIZE)
        n = len(page["lines"])
        y0 = center_y - (n * lh) // 2
        appear = back_out((t - page["start"] + 0.02) / 0.16, 1.2)
        for li, line in enumerate(page["lines"]):
            texts = [w["w"].upper() for w in line]
            space = f.getlength(" ")
            widths = [f.getlength(x) for x in texts]
            total = sum(widths) + space * (len(texts) - 1)
            x = (W - total) / 2
            y = y0 + li * lh + round((1 - min(1, appear)) * 24)
            for w, txt, wd in zip(line, texts, widths):
                active = w["s"] - 0.03 <= t < max(w["e"], w["s"] + 0.12)
                said = t >= w["s"] - 0.03
                if active:
                    pop = back_out((t - w["s"] + 0.03) / 0.12, 2.0)
                    pad = 14 + 4 * (1 - min(1, pop))
                    d.rounded_rectangle([x - pad, y - 8, x + wd + pad, y + lh - 10], radius=14, fill=VIOLET,
                                        outline=INK, width=5)
                    d.text((x, y + 4), txt, font=f, fill=CREAM, stroke_width=7, stroke_fill=INK)
                else:
                    if light_bg:
                        d.text((x, y + 4), txt, font=f, fill=INK, stroke_width=4, stroke_fill=CREAM)
                    else:
                        d.text((x, y + 4), txt, font=f, fill=CREAM if said else (235, 228, 214),
                               stroke_width=7, stroke_fill=INK)
                x += wd + space

    # -- frame
    def frame(self, n: int) -> bytes:
        t = n / FPS
        scenes = self.tl["scenes"]
        idx = max(i for i, s in enumerate(scenes) if s["start"] <= t + 1e-6)
        cur = scenes[idx]
        img = self.scene_frame(cur, t - cur["start"], n)
        if idx > 0 and t - cur["start"] < XFADE and cur.get("transition", "fade") == "fade":
            prev = scenes[idx - 1]
            pimg = self.scene_frame(prev, t - prev["start"], n)
            img = Image.blend(pimg, img, ease_in_out((t - cur["start"]) / XFADE))
        img = add_grain(img, n, 0.2)
        if not cur.get("hide_captions") and cur["type"] != "outro":
            light = cur["type"] == "card" and cur.get("style") == "cream"
            self.draw_captions(img, t, cur.get("caption_y", CAPTION_Y), light)
        return img.tobytes()


_R: Renderer | None = None


def _init(cfg, tl, pages):
    global _R
    _R = Renderer(cfg, tl, pages)


def _frame(n):
    return _R.frame(n)


# ----------------------------------------------------------------------------- audio + encode

def mix_audio(cfg: dict, timeline: dict, out: Path) -> None:
    """Voice + music. Music is ducked under the voice (sidechain) and swells on the closing card."""
    total = timeline["total"]
    outro = timeline["scenes"][-1]["start"]
    voice = VOICE / cfg["id"] / "voice.flac"
    music = MUSIC / f"{cfg['id']}.flac"
    bed = cfg.get("music_volume", 0.24)
    swell = cfg.get("outro_music_volume", 0.9)
    vol = f"if(lt(t,{outro - 0.3:.3f}),{bed},{bed}+({swell}-{bed})*min(1,(t-{outro - 0.3:.3f})/0.8))"
    graph = (
        f"[0:a]aresample=44100,apad,atrim=0:{total:.3f},asplit=2[v][sc];"
        f"[1:a]aresample=44100,apad,atrim=0:{total:.3f},volume='{vol}':eval=frame,afade=t=in:d=1.2,"
        f"afade=t=out:st={total - 1.4:.3f}:d=1.4[m];"
        f"[m][sc]sidechaincompress=threshold=0.025:ratio=5:attack=15:release=400:makeup=1[md];"
        f"[v][md]amix=inputs=2:duration=first:normalize=0,"
        f"loudnorm=I=-14:TP=-1.2:LRA=11,aresample=44100[a]"
    )
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", str(voice), "-i", str(music), "-filter_complex", graph,
                    "-map", "[a]", "-ac", "2", "-ar", "44100", "-c:a", "pcm_s16le", str(out)], check=True)


def render(video_id: str, workers: int = 3, preview: str | None = None, web: bool = True) -> Path:
    cfg = load_video(video_id)
    words = json.loads((VOICE / cfg["id"] / "words.json").read_text())
    tl = build_timeline(cfg, words)
    hidden = [(s["start"], s["end"]) for s in tl["scenes"] if s.get("hide_captions")]
    pages = caption_pages(words, hidden)
    n_frames = math.ceil(tl["total"] * FPS)

    if preview:  # --preview "3.2,10,25.5" -> PNG frames for inspection
        r = Renderer(cfg, tl, pages)
        out_dir = BUILD / "preview" / cfg["id"]
        out_dir.mkdir(parents=True, exist_ok=True)
        for ts in preview.split(","):
            n = min(n_frames - 1, round(float(ts) * FPS))
            Image.frombytes("RGB", (W, H), r.frame(n)).save(out_dir / f"t{float(ts):06.2f}.jpg", quality=88)
        print("  previews in", out_dir)
        return out_dir

    BUILD.mkdir(exist_ok=True)
    OUTPUT.mkdir(exist_ok=True)
    audio = BUILD / f"{cfg['id']}-mix.wav"
    mix_audio(cfg, tl, audio)
    out = OUTPUT / f"{cfg['id']}.mp4"
    enc = subprocess.Popen(
        ["ffmpeg", "-y", "-v", "error", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}", "-r", str(FPS),
         "-i", "-", "-i", str(audio), "-map", "0:v", "-map", "1:a",
         "-c:v", "libx264", "-preset", "medium", "-crf", "21", "-profile:v", "high", "-pix_fmt", "yuv420p",
         "-c:a", "aac", "-b:a", "192k", "-ar", "44100", "-movflags", "+faststart", "-shortest", str(out)],
        stdin=subprocess.PIPE)
    print(f"  rendering {n_frames} frames ({tl['total']:.1f}s) with {workers} workers")
    with mp.get_context("fork").Pool(workers, initializer=_init, initargs=(cfg, tl, pages)) as pool:
        for k, buf in enumerate(pool.imap(_frame, range(n_frames), chunksize=6)):
            enc.stdin.write(buf)
            if k % 300 == 0:
                print(f"    frame {k}/{n_frames}", flush=True)
    enc.stdin.close()
    if enc.wait() != 0:
        raise SystemExit("ffmpeg failed")
    print("  wrote", out)
    if web:
        web_out = OUTPUT / "web" / f"{cfg['id']}-720p.mp4"
        web_out.parent.mkdir(exist_ok=True)
        subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", str(out), "-vf", "scale=720:1280:flags=lanczos",
                        "-c:v", "libx264", "-preset", "slow", "-crf", "24", "-profile:v", "high", "-pix_fmt", "yuv420p",
                        "-c:a", "aac", "-b:a", "128k", "-movflags", "+faststart", str(web_out)], check=True)
        print("  wrote", web_out)
    (BUILD / f"{cfg['id']}-timeline.json").write_text(json.dumps(
        {"total": tl["total"], "scenes": [{k: v for k, v in s.items() if k in ("type", "file", "at", "start", "end")}
                                          for s in tl["scenes"]]}, indent=1, ensure_ascii=False))
    return out


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("video")
    ap.add_argument("--workers", type=int, default=3)
    ap.add_argument("--preview", help="comma-separated timestamps (s) to export as JPG instead of rendering")
    ap.add_argument("--no-web", action="store_true")
    args = ap.parse_args()
    render(args.video, args.workers, args.preview, not args.no_web)


if __name__ == "__main__":
    main()
