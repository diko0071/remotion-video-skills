# remotion-video-skills

A video factory where every product video is code. Built on
[Remotion](https://remotion.dev): scenes are React components driven by
frame math, so videos are deterministic, reviewable in pull requests, and
reusable through a growing kit of motion blocks. It was built to ship
Ryze AI's product videos at 30-50 a week; the kit, the camera physics and
the measured-replica tooling are general.

Full working rules live in [CLAUDE.md](./CLAUDE.md). That file is the
process, written as instructions for an AI collaborator and full of dated
lessons; the rule is always in the first paragraph of a section, the story
under it is context. This README is the map.

## Quickstart

```
git clone https://github.com/diko0071/remotion-video-skills && cd remotion-video-skills
bun install
bun run dev                                          # Remotion Studio
bunx remotion render audit-fix out/audit-fix.mp4     # a 30s promo, no keys, no external assets
```

Requirements: [bun](https://bun.sh) 1.2 or newer, Node 18 or newer,
`ffmpeg` and `ffprobe` on PATH. The first render downloads Chrome Headless
Shell (about 170 MB) and fonts load from Google Fonts at bundle time, so
stay online. `scripts/frame-score.py` needs `python3` with `numpy` and
`Pillow`.

Good second things to open: `superagent` and `mcp-hook` (two frame-measured
replicas of launch videos), `guide-schedules` (a narrated app walkthrough
whose voiceover, music and sound effects are all committed).

## Producing a video

```
bun run video -- <composition-id>      # render + auto-generate & mix music
bun run sheet -- <composition-id>      # contact sheet (the whole film, one image)
bun run validate -- <composition-id>   # AI review of the sheet (Anthropic)
bun run lint                           # eslint + tsc
```

The loop: build, render, read the contact sheet with your own eyes,
`validate` until PASS (P0/P1 block, P2 are polish notes), deliver.
`--force-music` regenerates the track, `--no-music` renders silent.
`bun run validate -- <id> --model=<model-id>` picks the reviewing model.

## Layout

```
src/
  core/        animation physics: springs, typing, blur, beat grid, keyed
               camera, cursor paths, reference measurement. Never edited
               per video.
  kit/         reusable motion blocks + UI kits (ryze-ui, claude-ui,
               slack-ui, grok-ui, chat, transitions)
  engine/      demo (app walkthrough) and promo (marketing scenes) players
  guide/       the third engine: narrated product guides with
               machine-verified clicks
  scenarios/   one folder per video: STORY.md, timings, scenes, music.json
  screens/     still compositions used as design previews
  services/    API clients: anthropic, elevenlabs, openai, media (ffprobe)
  validation/  check registry behind `bun run validate`
scripts/       render, contact sheet, frame scoring, jump check, VO and
               music generation
references/    frame-level breakdowns of reference videos (the motion bar);
               the source videos and frame maps are not committed
showcase/      a small Vite gallery of rendered videos (vercel.json deploys it)
.claude/       vendored Remotion skills for Claude Code (see the README there)
```

Three video types: **demo** (full 1920x1080 app walkthrough), **promo**
(marketing scenes, square, vertical or wide) and **guide** (narrated
walkthrough with a scripted cursor). A new video is a new
`scenarios/<id>/` folder; core, kit and engine are extended, never edited
per video.

## Keys

`.env.example` lists everything. Keys are read from env, then `.env.local`.
Nothing is needed to open Studio or render. Music generation needs
`ELEVENLABS_API_KEY`, validation needs `ANTHROPIC_API_KEY`, image
generation for new brand assets needs `OPENAI_API_KEY`. Never commit real
keys.

## Assets not in this repo

Third-party ad creatives, scraped brand storefronts, licensed fonts and
heavy footage are gitignored (see `.gitignore`). Remotion's `<Img>` fails
the render on a missing file, so a composition that needs one of those
folders does not render until you drop your own files in. Generated music
(`public/music`), voiceovers (`public/vo`) and sound effects (`public/sfx`)
are committed, as are the logos of the products the videos integrate with.

Compositions that render from a clean clone (96): `ai-visibility`,
`amplitude-agents`, `ando-jams`, `approvals-autopilot`, `ask-and-chart`,
`ask-chat`, `ask-open`, `audit-fix`, `bot-effect`, `chat-*`, `cited-panes`,
`claude-chat`, `claude-empty`, `claude-mcp-popup`, `claude-mcp-settings`,
`deck-gen`, `dither-lab`, `fix-seo-2-after`, `fix-seo-2-before`,
`fix-seo-bad-site`, `guide-approvals`, `guide-backlink-exchange`,
`guide-blog-studio`, `guide-cam`, `guide-mcp`, `guide-publishing`,
`guide-reports`, `guide-schedules`, `guide-seo-setup`,
`guide-technical-audit`, `guide-templates`, `guide-thumb`,
`guide-visibility`, `guide-writing-articles`, `kit-lab-gemini`,
`mcp-claude`, `mcp-hook`, `scan-algo`, `scene-lab`, `shipper-adwait`,
`slack-autopilot`, `slack-channel`, `slack-thread`, `slack-thread-pdf`,
`superagent`, `walkthrough-seo`, `why-ryze`, and the `page-ryze-*` stills
not listed below.

Compositions that need a gitignored folder:

| Folder | Compositions |
|---|---|
| `public/ad-templates` | `guide-brand`, `walkthrough-paid-ads`, `page-ryze-ad-templates`, `page-ryze-brand-context`, `page-ryze-chat-kit-*`, `page-ryze-paid-ads-creatives` |
| `ad-templates` + `comp-ads` (+ `creatives`) | `guide-competitor-ads`, `page-ryze-competitor-ads`, `guide-creatives`, `guide-paid-ads-overview`, `guide-platform-overview` |
| `public/creatives` | `guide-agent`, `page-ryze-creatives`, `platform-tour` |
| `public/apps` (+ `dusk`, `creative-wall`) | `approvals`, `approvals-feed`, `ask-creatives`, `creatives-input`, `competitor-ads`, `competitor-ads-feed`, `creative-library`, `creative-library-globe`, `creative-library-globe-avalanche` |
| `public/creative-wall` | `creative-library-feed`, `grok-plugins` |
| `public/dusk` | `ads-chatgpt`, `cited-by-ai`, `cited-by-ai-feed`, `fix-seo`, `launch-ads` |
| `public/appicons` | `backlink-exchange` |
| `public/kachava` | `grok-bot`, `grok-bot-cta` |
| `public/yt` | `yt-full`, `yt-part1` |
| `public/showcase` | `ads-promo` |
| `public/shipper-2/*.mp4` | `shipper-2` |
| `public/afuri`, `public/vermillion`, `public/joyrush`, `public/graza` | `build-afuri`, `build-vermillion`, `build-joyrush`, `build-blog` |

The five shared page data files under `src/kit/ryze-ui/pages/*/data.ts`
point at `ad-templates`, `comp-ads` and `creatives`; that is why most guide
videos are in the second group.
