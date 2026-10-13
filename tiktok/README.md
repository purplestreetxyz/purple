# Purple Street · TikTok videos

Pipeline that builds vertical TikTok videos (1080×1920, 30 fps, H.264/AAC) for
[Purple Street](https://purplestreet.org) (`@purplestreetorg`) from a script, archival photos from
Wikimedia Commons, a synthesized Spain-Spanish voiceover, word-synced captions and generated music.

| Video | Duration | Config | Output (1080×1920) | Web version (720×1280) |
|---|---|---|---|---|
| Las Sinsombrero | ~49 s | `videos/01-sinsombrero.json` | `output/01-sinsombrero.mp4` | `output/web/01-sinsombrero-720p.mp4` |
| Margarete Schütte-Lihotzky | ~48 s | `videos/02-schutte-lihotzky.json` | `output/02-schutte-lihotzky.mp4` | `output/web/02-schutte-lihotzky-720p.mp4` |
| Clara Campoamor | ~55 s | `videos/03-clara-campoamor.json` | `output/03-clara-campoamor.mp4` | `output/web/03-clara-campoamor-720p.mp4` |

Image, voice and music sources with licenses: [`CREDITS.md`](CREDITS.md).

## Requirements

- Python 3.10+ and FFmpeg (with libx264) on `PATH`.
- `pip install -r requirements.txt`

Voiceovers use ElevenLabs **Laura 1** (`Io5OWgIEXStywKwU9Gkc`) by default. Re-synthesizing the
voice needs `ELEVENLABS_API_KEY` in the environment. Image fetch and re-render reuse the committed
`assets/voice/` files and need no key. The Whisper `small` model (~500 MB) is downloaded on first
use of the alignment step.

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

Rendering takes about 2–3 minutes per video on 4 CPU cores (`--workers` controls parallelism).

## Changing a video

Everything about a video lives in its JSON config:

- `script`: the exact voiceover text. Captions use these words verbatim.
- `tts`: `provider` (`elevenlabs`, `gtts`, `edge`, `piper`), `tempo` per provider, `gap` between
  sentences, `extra_pause_after` (sentence index → extra seconds), and `say` (pronunciation
  respellings used only for the TTS, e.g. `"Schütte-Lihotzky": "Shute-Lijotski"`; keep the word
  count the same). For `elevenlabs`, set `tts.elevenlabs.voice_id` / `model_id` (defaults to
  Laura 1 + `eleven_multilingual_v2`) and export `ELEVENLABS_API_KEY`.
- `music`: `style` (`jazz`, `minimal`, `epic`), `bpm`, `key` (MIDI note), `seed`; `music_volume`.
- `scenes`: the visual timeline. Each scene starts when the phrase in `at` is spoken, so scenes stay
  in sync if the voice is re-generated. Types:
  - The first scene has no `at` and starts at 0 s; each video opens straight on a full-bleed photo
    with the voice and captions.
  - `image`: a Commons `file` with `layout` `full` (full-bleed Ken Burns), `poster` (framed print on
    violet) or `pair` (two portraits, `file2`, `names`). Motion: `zoom` `[start, end]`, `focus`
    / `focus_end` (0–1 image coordinates), optional `crop` `[x0, y0, x1, y1]`, `grade`
    (`auto`, `mono`, `duo`, `color`), and a `label` name tag `{name, info}`.
  - `card`: typographic card (`style` `violet`, `black`, `cream`) with `kicker`, `lines` (strings or
    `{text, style: "accent", size, at}`; `at` reveals the line on a spoken phrase), `sub`, and
    `hide_captions` when the card already shows the spoken words.
  - The branded closing card (ink-illustration avatar, PURPLE STREET, `@purplestreetorg`,
    purplestreet.org) is appended automatically.

After adding a new Commons file, run `python -m pipeline.commons <id>` and then `python -m pipeline.credits`.

## Voice options

| Provider | Voice | Notes |
|---|---|---|
| `elevenlabs` (default) | ElevenLabs Laura 1 (`Io5OWgIEXStywKwU9Gkc`) | Needs `ELEVENLABS_API_KEY`. Model `eleven_multilingual_v2`. Re-run with `python -m pipeline.build --steps voice,align,music,render --provider elevenlabs`. |
| `gtts` | Google Translate TTS, Spain-Spanish female | Keyless. Unofficial endpoint; review Google's terms before commercial use. |
| `edge` | Microsoft `es-ES-ElviraNeural` | Keyless, but Microsoft blocks many datacenter IPs (403 on the build server). |
| `piper` | Piper `es_ES-sharvard-medium`, speaker F | Fully offline, CC BY 3.0 training data. Slightly more synthetic. |

To drop in a pre-recorded read, put `assets/voice/<id>/voice.flac`, update `sentences.json` with
sentence start/end times (or rebuild `words.json` with Whisper), then run
`python -m pipeline.align <id>` and render.

## Brand

Colors, type and layouts follow the Purple Street Instagram branding (ink illustration on violet,
and the poster with heavy cream "PURPLE STREET" type on black): violet `#A974F0` (sampled from the
avatar), purple `#5E2A84`, cream `#F7EFDF`, ink black; Archivo Black for display type and captions,
Inter for small text. The closing card's logo is the ink-illustration avatar in
`assets/brand/avatar.jpg`; replace that file to change it.
