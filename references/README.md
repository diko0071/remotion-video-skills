# References

Study before building. The best scenes in this repo were born from frame-by-
frame breakdowns of reference videos; the worst were invented from nothing.

## How to use
1. Before any new video: watch 2-3 references (or their frame breakdowns).
2. When Dmitry drops a video link he liked — download it (yt-dlp), extract
   frames (ffmpeg fps=1.5), study, and add a breakdown file here.
3. A breakdown notes: the arc (hook / problem / work / wow / close), each
   scene's mechanic, pacing (seconds per scene), and anything worth stealing
   for the next video.

## Breakdowns

### crowdreply-superagent (Crowdreply "Introducing SuperAgent", 53s)
`crowdreply-superagent/BREAKDOWN.md`. Second measured replica, built on the kit promoted
from mcp-hook (`src/scenarios/superagent/`). New mechanics: typewriter line locking under
a magnifier, widgets assembling into a tilted browser window, word-per-blob colour typing,
button → neon icon → orb reveal, prompt chips scattering around the agent.

### crowdreply-mcp (Crowdreply "Show up in AI answers" MCP launch, 44s) — THE MEASURED-REPLICA STYLE
`crowdreply-mcp/BREAKDOWN.md` + 6fps map + zoomed strips. Replicated end to end
as `src/scenarios/mcp-hook/` with per-frame measurements driving every curve
(see CLAUDE.md "The measured-replica style"). Steal: capsule-with-port and
cable drag, icons carried into a tile column, tile-to-star morph, document
carried across a page slide, layered pops, text endcard that never stops
moving.

### higgsfield (6 videos, X/@higgsfield + @higgsfield_ai) — THE BAR
Full frame-level breakdown: `higgsfield/BREAKDOWN.md` (per-video timelines,
cut timestamps, loudness curves, zooms of every key transition in
`higgsfield/analysis/`). This batch defines our motion language: hard cuts +
morphs (no soft crossfades), motion blur on every fast move, cuts on the
musical grid, macro-crescendo shot lengths, full-bleed payoffs, machine-gun
montage bursts, avalanche endings, alive endcards. Distilled rules live in
CLAUDE.md ("Motion language"). Study this one FIRST.

### gooseworks (3 videos, X/@GooseworksAI + @shivsakhuja)
The promo format this repo's promo type is built on.
- Square, warm neutral bg, one heading + one centered content state at a time.
- Arc: hook prompt → tools run (progress theater) → results grid → feature
  scenes (edit by prompting, publish) → outro with logo + domain.
- Pacing: no state parked longer than ~3s; every transition is a minimize/
  expand or cross-fade, never a hard cut.
- Their input surface is a terminal; ours is the Ryze composer. Same energy,
  different skin — never copy the terminal aesthetics.

### grok-bot (Ira's launch posts + x.ai/bot + Gojiberry counter-example)
`grok-bot/BREAKDOWN.md`. The official bot avatar SVGs (bloub) and the real
"Add to Grok Bot" card live here; the Gojiberry promo is the slide-deck
anti-pattern we built against. Kit: `src/kit/grok-ui`.

### bot-effect (Grok Bot "now available on Android", x.com/bot, 10s)
`bot-effect/BREAKDOWN.md`. The dive-into-the-lockscreen effect: zoom 1.5x
while the screen clip opens to the frame, the notification arrives inside,
pull-back lands on the opening framing. Replica: `src/scenarios/bot-effect/`.

### shipper-2 (Shipper "Introducing Claude for business-building", 16s)
`shipper-2/BREAKDOWN.md`. The dithered-texture film: posterized fluid +
halftone/ASCII lattice under clean UI, glyph scramble, word roller, push into
the send button, feature chain the camera walks.

## External galleries
- https://www.remotion.dev/prompts — community showcase; good for scene ideas
  (maps with 3D landmarks, timelines, chart combos, launch videos).
- https://github.com/ali-abassi/remotion-templates — catalog of ready-made
  mechanics: 17 animated caption styles, audio visualizations, matrix/glitch/
  particle effects, 3D showcases. Use as a mechanics reference when a video
  needs captions, audio bars, or 3D — port the idea into our style, not the
  code verbatim.

## Batch 3 (6 videos, 2026-08-16, from Dmitry) — `batch3/BREAKDOWN.md`
Contra Indy (mascot agent + touch-grass payoff), Tembo (typed headings,
template walls, tag-@agent-anywhere), Conduit (founder footage + floating
UI, authority clips, scale counters), Wonder (design-canvas stage, context
chips, MCP), Poke (agent 1:1 inside iMessage, rich in-bubble cards,
integrations wall), Bevel 3.0 (inline chart-in-sentence kinetic text, blob
mascot, biological-age payoff). Key new patterns: a FACE for the agent, live
counters as proof of work, agent inside real surfaces, real-footage payoffs.

## Batch 2 breakdowns (8 videos, Aug 2026)

### cards — "Meta Ads skills in Claude" (thetripathi58, 32s)
Arc: logo → title with orange accent word + hand-drawn underline → terminal
run → dark interlude ("An expert ad team.") → SECTION CARDS: category kicker
(Research & Intel / Diagnose / Plan / Make) + stacks of small feature rows
(name + one-liner) staggering in, sections cross-fade → outro.
Steal: feature-list cards as an explainer format; accent word + underline.

### photo-input — "Generate video ads in minutes" (aiedge_, 20s)
Arc: PRODUCT PHOTOS FLY INTO THE INPUT one by one → prompt types → tools →
mascot loader ("Goosing…") → results as phone mockups where the product
PHOTO SWAPS inside the mockup → outro.
Steal: multi-photo fly-into-input opener (best first scene in the batch);
mascot loader with a brand verb; photo-swap inside a result frame.

### loader-swipe — same opener (shivsakhuja, 20s)
Arc: photos → input → tools → mascot loader → FULLSCREEN SWIPE CAROUSEL of
vertical creatives, background color re-tints to match each creative
(green→orange→purple→teal→red→black) → outro.
Steal: fullscreen result carousel with bg color matching the creative.

### tour1 — "Goose Ad Remixer" product tour (sohmehta, 42s)
Arc: product title → domain input types → "Setting up Alder" checklist card
NEXT TO brand-kit card (colors/fonts/voice) → "400+ proven ads" masonry
gallery → composer prompt → "Goose is making your ads" progress checklist →
results. Voiceover carries the story.
Steal: setup checklist + brand-kit side-by-side; masonry gallery reveal;
progress checklist as a scene.

### tour2 — "Creator Program" announcement (sohmehta, 40s)
Arc: collage → serif headline "is live." with orange underline → $10,000
with HAND-DRAWN CIRCLE on money texture → "Here's how." → numbered steps
(1 Grab your link / 2 Post anywhere + social icons / 3 Get paid $100).
Steal: numbered-step scenes with orange badge; hand-drawn circle annotation
around the key number; serif display type for announcements.

### tour3 — dark cinematic (sohmehta, 60s)
Arc: serif on dark + money textures + LIVE FOOTAGE inserts (hands, desk) →
cost table card → $8,500 card → input types → creative grid → "to you." →
$100 circled → "$1 every sign-up guaranteed".
Steal: dark cinematic variant of promo; footage inserts between UI cards
(later — needs stock footage pipeline).

### promo1 / promo2 — "One skill. Any brand." TEMPLATE (26s / 33s)
Identical skeleton, different content — proof this is a REPEATABLE FORMAT:
title "X-style ads. Now in Y." → dark input types → skill-finder tree with
"found" check → BRAND SECTIONS (brand logo + phone mockup of the ad, one per
brand) → multi-mockup collage → "One skill. Any brand."
Steal: the whole skeleton as a scenario template; brand section + phone
mockup; file-tree "finding a skill" beat (ours: tool discovery); collage.

## Cross-cutting patterns (batch 2)
- Accent word in brand color + hand-drawn underline — in EVERY title.
- Mascot loader with a branded verb (ours: Ryze sun + "Ryzing…").
- Results always get a physical frame: phone mockup, swipe card, collage.
- Numbered steps for how-it-works.
- Voiceover formats run 40-60s; silent formats 20-33s.
