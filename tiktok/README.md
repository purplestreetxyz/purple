# Purple Street · TikTok videos

Pipeline that builds vertical TikTok videos (1080×1920, 30 fps, H.264/AAC) for
[Purple Street](https://purplestreet.org) (`@purplestreetorg`) from a script, archival photos from
Wikimedia Commons, a synthesized Spain-Spanish voiceover, word-synced captions and generated music.

| Video | Config | Output (1080p) | Web version (720p) |
|---|---|---|---|
| Las Sinsombrero | `videos/01-sinsombrero.json` | `output/01-sinsombrero.mp4` | `output/web/01-sinsombrero-720p.mp4` |
| Margarete Schütte-Lihotzky | `videos/02-schutte-lihotzky.json` | `output/02-schutte-lihotzky.mp4` | `output/web/02-schutte-lihotzky-720p.mp4` |
| Clara Campoamor | `videos/03-clara-campoamor.json` | `output/03-clara-campoamor.mp4` | `output/web/03-clara-campoamor-720p.mp4` |

Image, voice and music sources with licenses: [`CREDITS.md`](CREDITS.md).

## Requirements

- Python 3.10+ and FFmpeg (with libx264) on `PATH`.
- `pip install -r requirements.txt`

No API keys are needed. The Whisper `small` model (~500 MB) is downloaded on first use of the
alignment step.

## Re-render

```bash
cd tiktok
python -m pipeline.build                  # all videos: fetch images, music, render, credits
python -m pipeline.build 02 --steps render  # just re-render one video
```

The committed voiceover (`assets/voice/<id>/voice.flac`) and word timings (`words.json`) are reused,
so a plain re-render is deterministic and needs no network once the images are downloaded.

Individual steps (all take a video id or a unique prefix such as `01`):

```bash
python -m pipeline.commons 01        # download Commons images + license metadata -> assets/images/<id>/
python -m pipeline.tts 01            # synthesize voiceover sentence by sentence -> assets/voice/<id>/
python -m pipeline.align 01          # Whisper word timestamps -> assets/voice/<id>/words.json
python -m pipeline.music 01          # generate the music bed -> assets/music/<id>.flac
python -m pipeline.render 01 --preview 3,12.5,40   # export JPG frames to build/preview/<id>/
python -m pipeline.render 01         # full render -> output/<id>.mp4 + output/web/<id>-720p.mp4
python -m pipeline.credits           # rebuild CREDITS.md
```

Rendering takes about 4–6 minutes per video on 4 CPU cores (`--workers` controls parallelism).

## Changing a video

Everything about a video lives in its JSON config:

- `script`: the exact voiceover text. Captions use these words verbatim.
- `tts`: `provider` (`gtts`, `edge`, `piper`), `tempo` per provider, `gap` between sentences,
  `extra_pause_after` (sentence index → extra seconds), and `say` (pronunciation respellings used
  only for the TTS, e.g. `"Schütte-Lihotzky": "Shute-Lijotski"`; keep the word count the same).
- `music`: `style` (`jazz`, `minimal`, `epic`), `bpm`, `key` (MIDI note), `seed`; `music_volume`.
- `scenes`: the visual timeline. Each scene starts when the phrase in `at` is spoken, so scenes stay
  in sync if the voice is re-generated. Types:
  - `intro`: poster card (title block, kicker, duotone image panel). Captions move to `caption_y`.
  - `image`: a Commons `file` with `layout` `full` (full-bleed Ken Burns), `poster` (framed print on
    violet) or `pair` (two portraits, `file2`, `names`). Motion: `zoom` `[start, end]`, `focus`
    / `focus_end` (0–1 image coordinates), optional `crop` `[x0, y0, x1, y1]`, `grade`
    (`auto`, `mono`, `duo`, `color`), and a `label` name tag `{name, info}`.
  - `card`: typographic card (`style` `violet`, `black`, `cream`) with `kicker`, `lines` (strings or
    `{text, style: "accent", size, at}`; `at` reveals the line on a spoken phrase), `sub`, and
    `hide_captions` when the card already shows the spoken words.
  - The branded closing card (`@purplestreetorg`, purplestreet.org) is appended automatically.

After adding a new Commons file, run `python -m pipeline.commons <id>` and then `python -m pipeline.credits`.

## Voice options

| Provider | Voice | Notes |
|---|---|---|
| `gtts` (default) | Google Translate TTS, Spain-Spanish female | Most natural of the keyless options tested here. Unofficial endpoint, so review Google's terms before commercial use. |
| `edge` | Microsoft `es-ES-ElviraNeural` | Very natural neural voice with no key, but Microsoft blocks many datacenter IPs (it returned 403 on the build server). Try it from a home connection: `python -m pipeline.build 01 --steps voice,align,music,render --provider edge`. |
| `piper` | Piper `es_ES-sharvard-medium`, speaker F | Fully offline, CC BY 3.0 training data. Slightly more synthetic. |

To use a professional voice (e.g. ElevenLabs or Azure), record or export one audio file per
sentence, or the whole read, into `assets/voice/<id>/voice.flac`. Update `sentences.json` with
the sentence start/end times, then run `python -m pipeline.align <id>` and render.

## Brand

Colors, type and layouts follow the Purple Street Instagram branding (ink illustration on violet,
and the poster with heavy cream "PURPLE STREET" type on black): violet `#9B6BE8`, purple `#5E2A84`,
cream `#F7EFDF`, ink black; Archivo Black for display type and captions, Inter for small text; and the
cat-eye glasses mark from purplestreet.org. To use the Instagram ink illustration on the closing card,
save it as `assets/brand/avatar.png` and re-render.
