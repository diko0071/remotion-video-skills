# remotion-video-skills

Video factory for product videos, built on Remotion. Every video is code:
deterministic, reviewable, reusable. Target output: 30-50 videos per week.

This file is the working process, written as instructions for an AI
collaborator and grown from real videos. Sections dated with an incident
are lessons: the rule is in the first paragraph, the story under it is the
context that earned it. Where it says "Dmitry" or "the requester", read
the person who ordered the video; where it names Ryze's internal product
repo or asset library, substitute your own. Everything about camera, cuts,
continuity, hooks and the kit is general.

**THE RULE THAT MAKES THIS REPO WORK: KIT FIRST.** Before writing ANY scene,
component, or animation — open `src/kit/` and `src/core/` and read what is
already there. Reuse beats rewrite, every time. Nothing gets built twice.
This rule is repeated throughout this file on purpose: it is the one that
keeps 50 videos a week possible.

Studio: `bun run dev`. Render: `bunx remotion render <id> out/<id>.mp4`.
Still: `bunx remotion still <id> out/check.png --frame=<n>`.

## The two video types

Every video is one of two types. Never mix their layouts.

1. **demo** — full-screen walkthrough of the Ryze app. The real UI shell
   (navbar, rail, chat) at 1920x1080. A prompt is typed, tools run, an
   artifact panel opens. Looks exactly like the product.
2. **promo** — marketing video. Neutral warm background, a big heading, and
   centered content states (cards, grids, composer). Square 1080x1080,
   vertical 1080x1920, or wide 1920x1080. This is the Gooseworks-style format,
   BUT: Gooseworks demos a terminal skill — we demo a product with a UI.
   **Never use terminal aesthetics**: no `$` prompts, no monospace pills, no
   macOS terminal windows. Our composer IS the input surface.

## Architecture: layers

```
src/
  core/       Animation physics only. Springs, reveal, typing, press, blink,
              shimmer, ticker. No product, no scenario timings. Changes ~never.
  kit/        Reusable video blocks built from core: ToolFlow, promo blocks,
              workflow primitives. A block never hardcodes scenario timing —
              timings come in via props.
  engine/
    demo/     scenario types + timeline + player for the demo video type.
    promo/    scenario types + theme + scene presets + player for promo.
              The player only knows: sequence scenes, cross-fade, theme.
              Scene "kinds" (title/card/showcase/outro) are PRESETS; any
              scenario can pass `{ kind: "custom", render, duration }` with
              its own component — the engine never needs editing for a new
              kind of scene. Style unity comes from the theme + kit blocks +
              these rules, not from a fixed scene list.
  kit/ryze-ui/ The app UI kit, ported 1:1 from the product motion kit
              (base.css tokens + components). This is the source of truth for
              how the product looks in videos. Do not restyle it.
  screens/    Static app states (chat empty, messages, tools, charts, ...) —
              reference compositions, also usable as demo backdrops.
  scenarios/  One folder per video. Data + scenario-specific components.
  services/   API clients, one folder per provider, each with client.ts +
              types.ts: anthropic (createMessage, reviewImage, extractJson),
              openai (generateImage on gpt-image-2 for asset generation),
              elevenlabs (generateMusic, generateSpeech). Shared env.ts reads
              keys from env -> .env.local. Scripts NEVER
              call provider APIs inline — always through a service.
  validation/ Code-level QA module: check registry (types.ts, index.ts,
              checks/*). runValidation(id) runs every check and returns a
              structured report. First check: sheet-review — sends the
              contact sheet to Fable via services/anthropic and returns
              PASS/FIX with issues (severity, where, what, fix).
```

**The core rule: CORE IS EXTENDED, NEVER EDITED PER VIDEO.** A new video must
be possible by adding a scenario folder only. If a scenario needs a new
primitive, add it to `kit/` as a generic, props-driven block — then use it
from the scenario. If you find yourself editing `core/` or `engine/` to ship
one video, stop: you are doing it wrong.

## Kit promotion policy (how the kit grows)

**Look at the kit before you build. Reuse the kit while you build. Grow the
kit after you build.** That is the whole loop.

The kit is grown by evolution, not designed up-front:

1. **First use** — when a video needs something new, check `kit/` first. If a
   block covers it, use the block. If not, write it inside the scenario
   folder (scenario-local component).
2. **Second use** — the moment a second video (or a second scene in the same
   video) needs the same mechanic, STOP. Promote it to `kit/` as a generic,
   props-driven block, refactor the FIRST usage to consume the kit block too,
   and only then continue. Never copy scenario code into another scenario,
   and never re-implement an existing mechanic from scratch — that is the
   failure mode this policy exists to prevent (it already happened once with
   the tools scene; do not repeat it).
3. **Physics is never per-type.** Springs, typing, flights, reveals, windows,
   rect interpolation live in `core/` and are shared by demo, promo, and any
   future video type. Kit blocks are built on core and are also type-agnostic:
   a ToolFlow or a PromptComposer must work inside a demo chat, a promo card,
   a browser frame — anywhere.
4. Recognize repeating mechanics aggressively. Already-promoted examples:
   typed prompt in a composer (`kit/prompt-composer`), tool progress
   (`kit/tool-flow`, `kit/tool-card`), element minimizing into the input /
   expanding out of it (`core/lerpRect` + chip slot pattern), showcase grids,
   card shells and headings (`kit/promo-blocks`). Future demos will repeat
   chat interfaces, browser frames, popping charts, site reveals — same rule:
   first inline, second use promoted to kit.

## Scenario structure (modular, no dumps)

A scenario is a folder, never a single dump file. Split by module so pieces
are reusable even inside scenes:

```
scenarios/<video-id>/
  index.tsx        Scenario definition only: scene list / beat list (data).
  timings.ts       Named frame constants for complex scenes (see below).
  <part>-card.tsx  One file per scene component (composer-card, tools-card, …).
  <flow>/          Multi-phase scenes get their own folder with one file per
                   sub-component (grid.tsx, phase-heading.tsx, …).
```

Register the scenario in `scenarios/index.tsx`. Components are bound to
compositions via closures — NEVER pass React components through
`defaultProps` (Remotion serializes props to JSON; the component dies).

## Intake — what to ask BEFORE building

A video request usually arrives as one sentence ("сделай видео про фичу X").
Do NOT start coding from that. Confirm the brief first — one short message,
grouped questions, not an interrogation. Ask only what the request leaves
open:

1. **Type & format** — demo (app walkthrough), promo (marketing), or tour
   (with voiceover)? Wide / square / vertical? Target length if any.
2. **The story** — what is the ONE claim this video sells, and what is the
   wow moment? If the requester can't name the wow, propose one from the
   feature and confirm it.
3. **Product truth** — what does the feature actually do (flows, copy,
   numbers)? Findings/metrics shown on screen must read real: ask for 2-3
   real examples (or pull them from the product) instead of inventing.
4. **Assets** — logos, product screenshots, brand photos: exists already vs
   generate. Integration logos live in public/integrations/ (synced from the
   product repo — copy from there, never draw custom logos).
5. **References** — "make it like X"? Download X, break it down into
   references/ FIRST (see references/README.md), then build.

If the answer set is obvious from context, don't ask — state your read in
one line ("понял так: promo, wide, про approvals, вау = клик-клик-клик
автопилот — погнал?") and give the requester a chance to correct BEFORE code
exists. Ambiguous middle ground = ask; obvious = state and go.

## How a video gets validated (the quality loop)

Nothing ships on "looks done in code". The loop, in order — each step gates
the next:

1. **Self-check while building**: ONE smoke still to confirm the composition
   mounts. NEVER iterate scene-by-scene stills after that (Dmitry, 2026-08-02:
   каждый одиночный still — это полный бандл+браузер ради одного кадра; час
   ушёл в трубу на потайловые проверки). The loop is: DRAFT render → MAP
   (contact sheet) → fix EVERYTHING the map shows in one batch → re-draft.
   Individual stills exist only to zoom into a defect the map already found.
2. **Full render** — `bun run video -- <id>` (music auto-generated/mixed).
3. **Contact sheet with your own eyes** — `bun run sheet -- <id>`, read the
   ENTIRE map: pacing, dead tiles, parks, clipped text, scroll overshoot.
   Fix what you see before burning AI review on it.
4. **AI review** — `bun run validate -- <id>` sends the sheet to the model
   with the house rules. P0/P1 = fix, re-render, re-sheet, re-validate.
   P2-only = PASS: ship, cherry-pick the P2s you agree with. Reviewer
   findings are CLAIMS — verify against real frames (crop the region, look)
   before fixing; refute hallucinations with frame proof, and never "fix"
   what a human (Dmitry) explicitly asked for — his word outranks the
   reviewer.
5. **Human pass** — deliver to your delivery folder and show. Requester
   feedback loops back into scene fixes AND, when it reveals a rule, into
   this file.
6. **Feedback names a CLASS, not a frame (15.08, the day of three videos).**
   When Dmitry says "тут задержка" or "оно прыгает", the defect he points at
   is one INSTANCE of a mechanism-level problem. Fix the mechanism in core/
   kit (a prop, a marks helper, a law in this file) and the instance fixes
   itself — patching the single frame guarantees the same feedback on the
   next video. Every one of today's fixes that went into the kit
   (continuationMarks, history, camera law, logo props) closed the class
   forever; none of the frame-level tweaks survived his next watch.

## INSPIRATION.md — the shelf of demos worth stealing from (2026-08-16)

`INSPIRATION.md` in the repo root collects OUTSIDE demo videos Dmitry likes —
the ones we want to learn from. Each entry: link, who made it, what happens in
it beat by beat, and the specific mechanic worth taking. Whenever he drops a
link ("смотри как у них"), add it there and break it down; when planning a new
video, read that file before inventing anything.

## Story first (narrative gate — non-negotiable)

A video is a narrative, not a slide deck. The overnight batch of 10 videos
failed exactly here: title → tool card → chart → outro is a template, not a
story, and every one of them was boring. The one video built around an arc
(audit-fix: score 30 → Fix in one click → tools → score 98 → schedule) was
the only one worth keeping. Rules:

1. **STORY.md before code.** Every new scenario starts with 5 lines in
   `scenarios/<id>/STORY.md`: hook (first 3s) / problem / work-on-screen /
   wow moment / close. If the arc cannot be told in words, the video does
   not get built.
2. **At least one continuous flow scene with an arc** per video — a scene
   where state transforms on screen (minimize → prompt → result → publish),
   not a sequence of disconnected cards.
3. **At least one new mechanic per video.** If a video assembles entirely
   from existing kit cards, that is the tell that it has no story. Invent
   the mechanic the story needs, then promote it to kit on second use.
4. **References before building.** Read `references/README.md` and watch 2-3
   relevant breakdowns before planning scenes. When Dmitry drops a video he
   likes, download it, extract frames, add a breakdown to references/.
5. **Contact sheet before shipping:** `bun run sheet -- <id>` tiles the whole
   render into one image — read it end to end to judge pacing and dead
   scenes. Stills of individual elements are NOT a substitute for seeing
   the film.

## Generation rules (learned, non-negotiable)

These came from real review rounds. Follow them.

**Rule zero: check the kit.** Every mechanic below already has a kit block or
core primitive. If you are about to write an animation by hand, first confirm
it does not already exist in `kit/` or `core/`.

**Smoothness — «не надо резкости»**
- Nothing pops. Every appearance is a spring (opacity + translateY), every
  state change is a cross-fade driven by a spring from the change frame.
- Scope: this is about ELEMENTS inside a scene (tool rows, chips, labels).
  SCENE-to-scene transitions follow the Motion language section: hard cuts on
  the beat or morphs — not slow crossfades.
- Tool rows: shimmer label cross-fades into done label, chevron cross-fades
  into check, detail line expands via animated max-height. Use `kit/ToolFlow`.
- Layout must never jump: if an element (attachment chip, slot) will appear,
  animate its height open — never let content reflow in one frame.
- BOTTOM-ANCHORED feeds (Slack) are the exception to animated appearance:
  real Slack does NOT animate message height — a new message lands in ONE
  discrete step and the kit CSS owns every gap. Render messages gated by
  frame with zero wrappers: no height animation (16 frames of creeping
  layout made the camera vibrate), no reserved slots (they read as giant
  holes before the message exists), no hand-picked heights (they broke the
  kit's own spacing). The camera spring absorbs the single-step shift
  cleanly. All three wrong fixes were tried on slack-autopilot (2026-08-15)
  before the obvious one: copy what the real app does.

**Continuity — one mechanic, reused**
- The signature promo mechanic is minimize-into-input: an element shrinks and
  flies into the composer as an attachment chip, the user prompts, the result
  expands back out. Use the SAME mechanic every time something enters the
  composer. Do not invent a second way.
- Within a continuous flow scene the composer is the anchor: it appears when
  something minimizes into it, disappears when the result takes the stage.

**Composer rules**
- The composer is its own card. Never wrap it in another white card
  (card-in-card is forbidden; use `bare: true`).
- The composer does NOT exist while a grid/showcase is on stage. It appears
  with the first minimize.
- Heading sits right next to the composer (same as a standalone card scene),
  not parked at the top. When the stage shows full-bleed content, the heading
  moves up; when the composer returns, the heading comes back down to it.
  Animate the heading between those positions — never teleport it.
- If the prompt text references style ("match this style"), show style
  reference chips (small image attachments) popping into the composer after
  the text finishes typing.

**Pacing — crescendo («скорость увеличивается с каждым терном»)**
- Energy builds through the video: every scene slightly tighter than the
  previous one; inside a long scene, beats accelerate (tools at 20 -> 18 ->
  16 frame gaps, dashboard widgets landing faster and faster).
- Auto-scroll moves in fast snaps (springs ~13 frames per jump), like a real
  chat catching up — never a slow constant glide. Scroll must stop exactly at
  the content's end: no dead space below the last block (measure with a
  final-frame still, adjust distance).
- Deep-research answers are EXTENSIVE: one lonely chart reads as lazy. A
  dashboard answer stacks 5-7 widgets (line, stat cards, bar+donut in
  columns, area, table) and scrolls through them quickly.
- Do not park on a state. A showcase grid holds ~3s max, then the flow moves.
- Typing speed ~0.45 chars/frame. Tools run 40-55 frames each, sequentially.
- Platform logos (Meta, Google) go in the phase heading when publishing to
  that platform: `public/meta-ads.svg` etc.

**No empty frames (5 review waves on approvals-autopilot, all one class)**
- Every frame of every scene must carry content. The bug appeared four ways
  in one video: blank white card mid-morph, a card gap in the machine-gun
  (next card waited for the previous to leave), a lone toggle before its
  headline, a lone logo opening the outro. Same root every time: animations
  scheduled sequentially with a hole between exit and entrance.
- Rule: the next element's entrance STARTS BEFORE the previous element's
  exit finishes, and the first content element of a scene is visible by
  frame ~4. Morphing shells carry text through the morph (fade the old
  label out INSIDE the moving shell, fade new content in before it lands).
- Check: render stills of frame 2-5 of EVERY scene — if any of them could
  be mistaken for a loading state, it's a bug.

**Scene budgets — set durations BEFORE building content**
- Write the timeline as bar-multiples from the grammar FIRST (hook ≤2.5s,
  setup ≤4s, work scenes by beats, payoff burst ≤3s, endcard ≤3s), then cut
  content to fit. Building content first and timing it after produced a
  front-heavy film three reviews in a row (title 4s, research 7s).
- A scene ends ON its last action, cut on the beat — max ~1s of hold after
  the final event. "Let it breathe" tails (the 1.5s empty 7/7 beat, a badge
  parked 1.4s) read as dead air on the sheet every single time; the music
  does the breathing, not an empty screen.

**Conversation continuity & momentum (Dmitry, 2026-08-15 — launch-ads)**
- A multi-scene chat is ONE conversation: later scenes pass prior turns via
  ChatScene `history` (settled components) and omit `prompt` when the agent
  simply continues. Never restart the thread with the same first bubble.
- History NEVER re-animates. Anything the viewer has already seen renders
  fully settled from frame 0 — tool rows pre-done (start/done negative),
  no reveal springs, no word streams. Re-playing an entrance the viewer
  already watched reads as a bug, not a recap.
- No dead air after an action: a click/submit earns its result within a few
  frames, and the scene CUTS shortly after its last action lands (~15-20f).
- After a cut back into a known screen, the camera does not park on it —
  it starts moving to the NEW content immediately. Continuation scenes use
  `continuationMarks(answer)` from kit/chat/chat-scene: the result block
  appears WHILE the answer text is still streaming (resultAt ~14, not after
  streamTo), and the camera snaps toward it by frame ~6. The viewer never
  re-reads a screen they have already seen.

**Cursor & clicks**
- Every UI button press on screen gets the `kit/cursor` pointer: it travels
  to the button and dips on click (plus the mouse-click sfx). A button
  scaling by itself with no cursor reads as a glitch, not a click.
- Cursor coordinates are relative to the nearest positioned ancestor — wrap
  the target UI in `position: relative`.

**Titles**
- Signature treatment: accent word in brand color + hand-drawn underline
  (`kit/underline-accent`), like the reference batch.
- Short titles get `white-space: nowrap` — a trailing period must NEVER wrap
  onto its own line.
- A finale headline (e.g. "Your whole marketing stack, available in Claude")
  lives in its OWN scene with no scene heading above it. Never show a scene
  heading and a content headline saying different things at once.

**Endings**
- Promo outro: product logo, one heading, a button with the domain
  (`get-ryze.ai →`). No shell commands, no install lines.

**Buttons**
- Button corner radius follows the product, not generic marketing style: the
  app uses near-square corners (radius-md 2.4px). At promo scale use small
  radii (6-12px). NEVER pill/capsule buttons (border-radius 999) anywhere.

## The measured-replica style: camera, cuts, continuity (mcp-hook, 2026-09-06 — Dmitry: «первый видос, который получился реально супер динамичным»)

Born from replicating the Crowdreply MCP launch (`references/crowdreply-mcp/`,
scenario `src/scenarios/mcp-hook/`). Dmitry named it a house style. Every
rule below has a working implementation in that scenario — read the file
before re-inventing it, and promote to kit on second use.

**1. Nothing is eyeballed. Every number is measured from the reference.**
- Frames at the source fps, full res: `ffmpeg -vf "fps=25,scale=1920:1080"`
  into `out/ref25/`, then per-frame bboxes (dark mask, colour mask, connected
  components) with numpy — that gave the capsule rise curve, the pill overshoot,
  the text left-edge slide, the tile column, the Slack card. Zoomed strips at
  full fps around every interaction (`crop=` + `tile=`) for mechanics.
- Sampled curves live in `src/scenarios/mcp-hook/curves.ts`: raw 25fps samples
  (`CAPSULE_TOP`, `CAPSULE_W`, `BIG_LEFT`, `MCP_SCALE`, `CLUSTER_SPREAD`) and
  `sample(values, frame, start30)` interpolating them onto our 30fps timeline.
  `at30(f25)` converts reference frames; `cl(t)` in `claude-timings.ts`
  converts reference seconds to local frames. A timing is a measured second,
  never a feel.
- Clicks sync to the reference AUDIO: high-pass the track and detect RMS
  transients (`ffmpeg -af highpass=f=2500` → numpy onsets). The click sound
  onsets (4.97 / 9.93 / 14.73 / 26.13 / 33.3 / 34.34 s here) are the press
  frames; the cursor arrives ~0.3s earlier and holds.
- Gate: `python3 scripts/frame-score.py mcp-hook references/crowdreply-mcp/source.mp4`
  plus ref|ours pair sheets (`hstack` of both at 4fps). A change that worsens
  the score is reverted.

**2. Camera = keyed poses with real cuts, blur inside the world.**
- `src/core/stage/keyed-camera.ts`: `CamKey {at, zoom, x, y, cut?}`; `keyedCamera()`
  eases between keys and returns velocity-proportional `blurX/blurY`; a key
  with `cut: true` is a hard jump (the whip-zoom onto the port: 1 → 1.95 with
  blur, settling 1.74 → 1.61; the cut to wide 0.82). Pose tables per scene:
  `CAM_A/CAM_B` in `timings.ts`, `CAM_C` in `claude-timings.ts`.
- The rig (`src/kit/keyed-rig.tsx`, `KeyedRig`) puts `DirectionalBlur` INSIDE `FocusCamera`
  with the scene background on the blurred layer. Blurring the viewport
  container instead samples transparency at the frame edge and paints a light
  strip at the bottom during every whip (Dmitry saw it instantly).
- Push-only inside a scene still holds: the second prompt is NOT a cut to a
  new chat (the reference does that) but a push into the same docked composer
  (1.78 → 1.85), then a pan up to the new bubble. Dmitry chose this over the
  reference: «чтобы плавный максимально был переход».
- Camera zoom numbers are derived from text heights in the reference frames
  (typing 2.1, send button 2.9, chat 1.85, report 2.2), not guessed.

**3. Directional motion blur on every fast move.**
`src/kit/directional-blur.tsx` — `DirectionalBlur id x y` renders an
inline SVG `feGaussianBlur stdDeviation="x y"` per element (unique id per
element, active only above 0.3px). Used for: the big headline sliding left
(blur = |dx| * 0.28), the capsule rising (blur = |dy| * 0.32), the camera
whips, chat scrolls, the page slide-out. Isotropic `filter: blur()` reads as
out-of-focus; directional reads as speed.

**4. One object carries every transition (no cut is empty).**
- Capsule → tile column: icons scatter inside the capsule with growing black
  plates (`SCATTER` in `capsule.tsx`), and after the cut the tiles start from
  `screenOfA(iconWorld(i))` — the icons' screen positions under the previous
  camera (`timings.ts`) — and spring into the column.
- Tile → Claude: `TileMorph` (`scene-claude.tsx`) is rendered OUTSIDE the rig
  by `MorphLayer` (`index.tsx`), which projects the kit star's world position
  through `camera(CAM_C)` each frame; the black tile shrinks onto that point,
  its plate dissolves, the white star tints to terracotta, then the kit star
  takes over (`.mh-nostar` hides it until the handoff). The cursor rides the
  tile all the way (`CURSOR3.carry`).
- Chat → Slack: `SlideOut`/`SlideIn` (`index.tsx`) slide the outgoing page up
  and the next scene in from below, both with y-blur, over `SLACK.slide`
  frames on each side of `SLACK.from`. `CarryLayer` holds the dragged document
  in SCREEN space across both sequences (grabbed at the doc card's projected
  position, lifted up-left, carried to the Slack tile) so the object never
  belongs to either page.
- Port → MCP pill: the glyph bars ride the cursor (`cursorAt` from
  `src/core/stage/cursor-path.ts`, the same spring math as `kit/cursor`) and land inside the
  pill before its own bars fade in; the pill appears EMPTY first, then bars,
  then the MCP mark, then the chip — layered, never all at once.

**5. Layered appearance with overshoot — that is the «динамика».**
`src/kit/pop.tsx` — `Pop at from rise` = `SPRINGS.pop` spring
(overshoot) + rise + 4-frame opacity. Icons, chips, bars, the MCP mark, tiles
all «подпрыгивают». A container first (capsule lands, pill pops), contents one
per frame after. Static appearance = «всё очень сильно статично».

**6. Holds must stay alive.** A cursor parked on a button for 0.8s with nothing
moving reads as a freeze. `kit/claude-ui/composer.tsx` got `sendGlow` and
`sendShine`: hover glow that breathes (sin), a shine band cycling every 26
frames, a flash + decay on press; the camera keeps creeping (2.9 → 3.08)
through the hold. The strand pulses in `web.tsx` and the shimmer rows in the
Initiating block do the same job for their holds.

**7. Reference UIs are inflated; our kit is 1:1.** `scene-claude.tsx` wraps
the real `kit/claude-ui` in a 1200×675 box scaled by `UI_SCALE = 1.6`
(`claude-timings.ts`) — kit proportions untouched, reference sizes matched
(composer 1216 vs their 1224). All Claude-phase coordinates are in UI space
(divide screen by 1.6); the camera works in world space.

**8. Text endcards move or they die** (`scene-tail.tsx`). Letters rise from
below out of blur one at a time (`Word`); the line's font size shrinks
CONTINUOUSLY (340 → 165) as words are added; the background inverts in six
frames and the key word glows in three shadow layers; the old line exits left
with x-blur while the next word grows in place and drifts to centre; the URL
pill grows with the typed text and every letter prints coral and cools to
white. Measured sizes: Talk 340, line 165, Build 350 → 145, pill 206 tall.

**9. Assets are never cropped from the reference.** Icons come from
`public/ai/`, `public/integrations/` (`mcp.svg`, `google-docs.svg`, `slack.svg`
added this day); glyphs like the three bars are drawn in code from measured
geometry. A crop is blurry at any zoom and Dmitry rejected it twice.

Promoted to kit the same day (mcp-hook now consumes them; the refactor
rendered PSNR ~62 dB against the pre-promotion mp4, i.e. identical modulo
encoding):
- `core/measure.ts` — `refFrame(f, refFps)`, `sampleRef(values, frame, start, refFps)`;
  a scenario keeps its own `curves.ts` with the measured arrays and thin
  wrappers baking in its reference fps.
- `core/motion.tsx` — `ramp(frame, from, to, easing?)` (clamped 0..1).
- `core/stage/keyed-camera.ts` — `CamKey {at, zoom, x, y, cut?}`,
  `keyedCamera(keys, frame)` → pose + `blurX/blurY`.
- `core/stage/cursor-path.ts` — `cursorAt(stops, frame, fps)`: the kit
  cursor's spring path as a pure function, for anything that rides the cursor.
- `kit/keyed-rig.tsx` — `KeyedRig id keys bg` (FocusCamera + blur inside the
  world), `projectThroughKeys(keys, frame, x, y)` for overlays outside the rig.
- `kit/directional-blur.tsx` — `DirectionalBlur id x y`, `FilterDefs`
  (`WHITE_FILTER`/`CREAM_FILTER` for solidifying icon alpha).
- `kit/pop.tsx` — `Pop at from rise`: overshoot spring + rise + 4f opacity.
- `kit/transitions/slide.tsx` — `SlidePage id at len direction` (page up/out,
  next in from below, y-blur). `kit/transitions/carry.tsx` — `CarriedObject
  stops from until size grow render` (an object + cursor in screen space
  across sequences).
- `kit/rise-letters.tsx` — `RiseLetters text from step color glow`,
  `glowShadow(g)`. `kit/platform-icon.tsx` — AI platform marks in white.

## Relay feeds: one bot per viewport, transitions the product would make (grok-bot, 2026-09-01)

Three rounds of «это скринкаст» on grok-bot, one class each time:
- **Camera cuts between zoom levels over a dense UI read as a shaking
  screencast**, not as dynamics (v3: six rig scenes, hard cuts 1.45 → 1.0 →
  1.5, snaps on chat rows). Motion has to come from the STAGE: lift the
  composer out of the interface (one object carries the transition), dissolve
  the app, and let content build big on a clean ground.
- **A relay of agents is ONE feed the camera walks, never a screen swap per
  agent.** Each agent's block mounts on its turn; a zero-height `data-click`
  anchor at the block top is the shot target with `align.y = 0` so the
  previous agent is never in view («в кадре один бот»). No `minHeight`
  padding to fill the viewport — the moment the camera pulls back those
  paddings become holes.
- **Speak the way the product speaks**: typing dots → a text bubble → a result
  card (title, status pill, content, description, buttons); approvals are the
  real "The Bot wants to run a task" card; handoffs are the real
  "Messaged ● Bot" system row.
- **The pull-back is one shot with a slower per-shot `chase`** (stiffness
  ~0.009) so the camera never settles before the cut — two shots in a row
  read as «сначала один раз отъехал, потом второй». Fill the wall for the
  deepest zoom first (15 columns × 84 messages here), then pick the zoom.
- Cursor wander is a prop now (`SceneCursor wander`); rigs on clean stages
  run `drift={0}` — on a still ground both noises read as «курсор дрожит».
- Process: a Bash patch interrupted mid-run may have half-applied. The next
  patch must be idempotent (regex to final values, `if b in s: continue`),
  never assert-then-replace from the assumed old state.

## grok-bot day, the rest of the lessons (2026-09-01, sixteen versions in one sitting)

- **A wow object that lives outside the product is «набросано».** The first
  payoff piled dashboards over the interface; the fix was not a prettier pile
  but moving results to where the product puts them (bots messaging in a
  thread, approvals as the real task card). Ask «где это живёт в продукте?»
  before drawing any payoff.
- **Brainstorm in dialogue, build in one go.** The relay (bots handing work to
  each other, one human click) came out of four short exchanges, not from a
  plan. Each time I proposed three options with a recommendation and he
  picked or reshaped one; each build after that landed.
- **«Просто быстрее, ничего не меняй» means SCALE, not re-choreograph.** When
  he asks for speed, multiply the existing marks by one factor (8s → 5s was
  ×0.6 on every opening constant); re-arranging the beats («логотипы пачкой»)
  is a different change he did not ask for and it got rejected instantly.
- **Speed feedback comes in layers; expect three passes.** Opening ×0.6, then
  the typing hold −30%, then the send «к шестой секунде», then the hook hold.
  Each was a class: fixed one constant per class, never a frame.
- **«Курсор дрожит» → measure before touching anything.** Frame-diff the rest
  position (≤1px), check the approach is monotonic, run the determinism test
  (PSNR inf single vs multi-worker). Here the cursor was clean; the thing
  wobbling every frame next to it was the bloub EYES (sin(frame/7)). Calm the
  eyes to /22 and ±0.12, zero the cursor wander on a still ground, and say
  plainly what was measured.
- **Music is re-generated when the tempo changes** (`--force-music` with the
  BPM in the prompt: 120 → 128 after the opening got 40% faster). An old bed
  under a faster cut is heard immediately («не успевает за темпом»).
- **The film ground is the app ground.** «Бежевый» meant the app's golden
  cream #FDFAF3, not the promo grey-cream; when he says a colour by feel,
  reuse a colour that already exists in his product.
- **A floating app window on the ground read as a mockup and he loved it**
  (`scale 0.92`, radius 22, shadow). The hero's landing slot and the composer's
  lift start must be mapped through the same scale/offset, and the click
  cursor must live INSIDE the scaled container.
- **jump-check flags a hard cut into a moving scene** (wall → kinetic hook).
  Read the frames: a cut followed by motion is legit; report it as such
  instead of hiding it.
- **Bot names are product copy.** «Creatives» read as a folder; roles read as
  teammates: SEO Optimizer, Paid Ads Optimizer, GEO Optimizer, Creative
  Director.

## Wow-object scenes: generous, tilted, never parked (Dmitry, 2026-08-16 — the wall day)

When a video's payoff is a mass object (a wall of creatives, a field of deck
slides), three rules came from three rounds of the same feedback:
- **Generous**: the object must read as ENDLESS — tiles extend past every
  frame edge at the final zoom (compute visible span at end-scale and size
  the field beyond it). "Looks big" from the builder's seat reads small on
  the viewer's screen.
- **Tilted and alive**: the house look is a slight rotation (-4deg, ramped
  in with the zoom so it never jumps against the straight scene before it),
  rows sliding, and arrivals landing every ~0.5s spread across ALL rows and
  edges — one arrival every 1.5s reads as nothing happening.
- **Never parked**: after the zoom-out settles, hold ≤1s and cut. Every
  extra second on a settled wall was called out as «зависает» twice.
Counter chips / stat pills over the object are banned («отвратительно
выглядит») — the object itself carries the scale claim.

## Overlaying text on a scene: KineticLine, never KineticBeats

KineticBeats' root AbsoluteFill paints the cream background — dropped over a
scene it silently covers it (cost two rounds: the planet cold open, the deck
wall cold open). For text OVER content use KineticLine directly in a
positioned wrapper; KineticBeats is only for standalone text scenes. On busy
imagery every part needs a highlight plate (group hl) — bare ink words drown.

## Feed cuts — cold open for Twitter/social (Ira's feedback, 2026-08-16)

Feeds autoplay muted with a thumb hovering: the first 2-3 seconds must be the
video's most striking VISUAL, not a text setup — text intros die unread in
mute. Every promo whose arc builds to a wow object (planet, star, wall) gets a
`<id>-feed` cut: a cold open showing that object ALREADY FINISHED (settled,
moving — reuse the same component with its end-state spin/scale, never a
re-render or copy) with ONE concrete hook line over/under it (a number beats
an adjective: "100,000 winning creatives."), then a hard cut into the full
film unchanged. The mid-film build of the object now reads as "how that
opening shot exists" — payoff-first structure. Feed scenario = its own tiny
folder (index.tsx + music.json + STORY.md) composing the original scenario
component; first one: creative-library-feed.

## Scenes cut on ACTION, VO flows over cuts (Dmitry, 2026-08-16 — «почему планета висит»)

Never stretch a scene to the end of its VO line: a formed wow-object idling
while the narrator finishes reads as dead air (the planet hung 2.5s waiting
for "…make them yours"). Put Audio in its own `<Sequence layout="none">` at
the timeline level — unbounded by any scene — and cut scenes on their last
ACTION (+≤1s). The sentence tail lands over the NEXT scene's first beats,
which is exactly how real edits sound. Corollary: the next scene's first
event fires within ~6 frames of the cut. Verify the rebuilt timeline with
numbered proof frames (render 4 stills at claimed seconds and look), not by
asserting it.

## Voiced beat language (InDrive primitive — the house storytelling system)

Born 2026-08-15 from the InDrive/TikTok-One case breakdown
(`references/indrive-case/BREAKDOWN.md`) across creative-library and
cited-by-ai. The pipeline: write `vo.json` (eleven_v3 with audio tags) ->
`bun scripts/generate-vo.ts <id>` -> transcribe each line with ElevenLabs
scribe for word-level frame marks -> author beats as data.

- **A beat is a THOUGHT, not a word.** The screen holds for the whole phrase
  (2-4s); words accumulate onto the standing line at their VO timestamps
  (invisible words reserve layout space — no reflow). The screen changes only
  at sentence boundaries. Word-per-screen flashing was tried and rejected
  («я не успеваю даже эти анимации посмотреть»).
- Blocks: `kit/kinetic-beats.tsx` (KineticBeats: beats -> screens, per-word
  marks, sfx optional) on top of `kit/kinetic-text.tsx` (KineticLine,
  InlineTile, HighlightWord, SparkBurst, emoji/word/group/image/br parts).
- **Adjacent highlighted words share ONE marker plate** (the `group` part —
  built automatically by KineticBeats from consecutive hl words). Two
  touching plates read as a bug.
- While the line stands, OTHER layers carry motion: inline tiles pop in
  pauses, sparks burst off the highlight, counters tick. VO pauses (a "Hmm")
  are exactly where tiles/objects get their screen time.
- Emoji are allowed INSIDE beat lines in this language (Dmitry's call —
  «глазики-молоточки») — they are inline objects, placed mid-phrase at their
  own timestamps. The "no emoji" rule still holds everywhere else.

## Copy & VO rules (backlink-exchange, 2026-08-15 — the night of five rewrites)

- **The speaker says MORE than the screen shows.** VO carries the full
  sentence; the beat displays only the key fragment with a marker ("And
  you? You'll receive up to fifty backlinks a month on autopilot" -> screen:
  "up to 50 backlinks a month"). Word-for-word screen copy of the VO reads
  as subtitles, not design.
- **AI-copy patterns are banned in VO**: negative parallelisms ("Everyone
  says X. Nobody says Y"), empty intensifiers ("real stores", "real domain
  ratings" — нереальных сторов не бывает), rule-of-three punchlines,
  strikethrough-reveal drama. When copy gets rejected twice, write FIVE
  full alternative scripts and let Dmitry pick — faster than iterating one.
- **"websites", never "stores"** — Ryze sells beyond ecom.
- **Explain features through one household example** (you roast coffee; a
  linen site links to you; you link to a candle site) — not through feature
  nouns. End the thought (ratings grow, everyone wins) BEFORE the offer
  ("with us you get up to 50/mo").
- **Backlink Exchange is CHAINS, never A<->B swaps** (Google penalty) —
  arrows on screen must always flow one direction.
- **A [pause] tag before the last word can stretch to 3s** — for tight
  punchlines write the sentence without pauses and let punctuation breathe.

## Promos show UI OBJECTS, never a whole app page (Dmitry, 2026-09-24 — sell-agents)

In promo videos the real app is not shown as a full page. Take the objects out of
the interface (a button, a score ring card, a checklist card, a chip) and put them
on a clean ground as floating cards: they pop, count, tick, fly and morph. A full
page under a zoom always crops at the frame edges and reads as a screenshot
(«отвратительно, всё поопрезано»). Build the objects from the kit components
(e.g. AuditScoreRing, AuditIssueLine inside a card shell) so they stay 1:1 with
the product, but never mount the page shell (RyzeApp, sidebar, navbar) in a promo.

## Product screens in promos: copy the real layout, never a video-ish grid (Dmitry, 2026-08-16 — competitor-ads)

When a promo scene shows a real Ryze page, the LAYOUT ENGINE is ported too,
not just the styling. Three separate rounds of feedback on the Competitor Ads
library were all one class: my grid looked like a video, not like the product.

- **Read the product's layout component before laying anything out.** The app
  uses `components/ui/masonry.tsx`: fixed column width, natural card heights,
  each card dropped into the shortest column, GAP 16. A uniform tile grid with
  hand-picked heights reads as fake the moment it sits next to the real UI.
- **Card anatomy comes from the product card**: square media on top, then the
  text block under it (headline 1-2 lines + muted body), brand chip over the
  media corner, tiny radius (10px), whisper shadow `0 1px 2px`. Big rounded
  cards with a floating pill row over the image are a video invention.
- **The page margins are FIXED across every state.** Filter changes reflow the
  wall INSIDE the same left/right edges — never let a filtered state widen,
  narrow, or re-centre the grid. Compute all phases through one helper with
  the same edge constants.
- **Spacing follows the app, not the eye**: filter bar to first row is ~14px
  in the product; a 50px+ gap reads as a different app. Measure the real
  screen rather than balancing the frame by feel.
- **A filtered wall must still look FULL** (Dmitry: «реклам никогда не должно
  быть мало»). Fewer columns, bigger cards, more of them — the last filter
  step in competitor-ads keeps 8 winners in two full rows, not 4 lonely cards.
  Author enough source data that every phase fills the screen.

## Scene continuity for ambient systems (competitor-ads, 2026-08-16)

A background system that keeps running across a cut (a radar sweep, a ticking
clock, an orbiting field) must CONTINUE its time, not restart. Wrap it in
`<Sequence from={-PREVIOUS_TOTAL} layout="none">` inside the new scene so its
internal frame keeps counting — the viewer sees one continuous machine, and
the cut only changes what is in front of it. Restarting the animation announces
the cut and reads as a glitch («он у тебя заново начинается — это ж странно»).

**Hand-matched constants across scenes are NOT continuity (Dmitry,
2026-08-16 — competitor-ads-feed, three failed fixes).** If two adjacent
scenes each render the same ambient system and "seamlessness" depends on
scene B's hardcoded scale (0.726) equaling scene A's zoom-curve endpoint,
plus matching sweep offsets, plus matching camera initial zoom — that is
three places that must agree, and they won't. The frame WILL jump, and every
fix will touch many lines, which is the tell that the architecture is wrong
(his words: «если нужно очень много строк поменять — иди меняй
архитектуру»). The correct shape: ONE component owns the ambient layer for
the whole span — one clock, one zoom function, one CameraRig — and what used
to be the second scene becomes overlays gated by `<Sequence from={...}
layout="none">` inside it. Then dim/highlight become interpolations instead
of steps, and a frame mismatch is impossible by construction. Proof gate:
pixel-diff the frames around the former cut — all deltas < 1.0.

## Scene-start opacity is an empty frame too (competitor-ads, 2026-08-16)

`useReveal(2)` at the top of a scene means frame 4 renders at ~10% opacity —
on the contact sheet that tile is indistinguishable from a loading state, and
it violates the no-empty-frames rule just as much as a literal blank. For a
scene that opens on already-established content (a page the story just cut
into), start the reveals BEFORE zero (`useReveal(-10)`, `appearAt: -8`) so
frame 0 is already ~70% in and frame 4 is fully readable. Only content that is
genuinely arriving for the first time animates in from zero.

## Generated creatives: NO purple, NO gradients (Dmitry, 2026-08-16 — the dusk regen verdict)

Purple color and glow gradients are the instant "vibe-coded AI slop" tell —
both are banned in every generated brand creative, and gradients are to be
avoided everywhere in generated art. The whole 58-image dusk set failed on
exactly this (violet glows, purple rings, dusk-gradient horizons). The
working process instead: take a REAL top app's ad creatives as the reference
(we keep an internal library of top ads), feed the reference
style to gpt-image-2 and recreate it for our fictional brand — copy what
already converts, never invent an aesthetic from adjectives. References
first, генерация вторym.

## No placeholder art, ever (Dmitry, 2026-08-15)

Initial-letter avatars ("Y", "L") and empty favicon boxes are not acceptable.
If no real asset exists: draw a small inline SVG icon (coffee cup, linen
fold, candle, chain link — 2px stroke on a brand-color tile), fetch a real
favicon (gstatic faviconV2, skip <400-byte globe fallbacks), or invent a
plausible domain with a drawn icon. kit-worthy icons live with their scene
until second use.

## Sound design (revised 2026-08-15)

- **Any sound can be GENERATED**: ElevenLabs sound-generation
  (POST /v1/sound-generation, `ELEVENLABS_API_KEY`) — describe the sound in
  words ("cash register cha-ching, single coin ring, short"), convert to wav
  into `public/sfx/`, register in the SfxName union. cash/pop/sparkle/
  paper-flick were made this way. remotion.media is mostly meme sounds —
  generation beats searching.
- **Sounds are per-MEANING, never per-beat.** A repeated tick on every beat
  reads as «шиза» (Dmitry, twice). Map: money emoji -> cash, tile -> rotate
  pop/paper-flick/whip, sparks -> sparkle, highlight -> whoosh, UI click ->
  mouse-click. No sound on plain text beats.
- KineticBeats takes `sfx={false}` — new videos start silent except
  mouse-click on real UI clicks, then sounds are added deliberately.

## Camera jitter is always a LAYOUT problem (2026-08-16 — the night of six wrong fixes)

The camera chase re-simulates its whole path from frame 0 every frame, using the
CURRENT measurement of the target. So the moment a target changes size or
position, the entire trajectory is rewritten retroactively — the viewer sees a
jerk. Every jitter bug this repo has had traces back to one of these:

- **A button that changes its label under the camera.** "Approve & launch" ->
  "Live" halves the width, the centre moves, the camera lurches. Point shots at
  the CARD (a container whose size never changes) and let the cursor click the
  button. Same for any status pill that swaps text.
- **A composer that grows while the camera watches its send button.** Open the
  composer before frame 0 (`revealAt` negative) so its geometry is settled.
- **A row that appears in flow.** A tool row popping in adds its height in one
  frame and shoves everything below it.

**Do NOT "fix" this by reserving space** (Dmitry, explicitly): empty slots
waiting for content read as holes. And do NOT stop the camera from chasing —
chasing is correct behaviour. Fix the TARGET, not the camera.

**Never store cross-frame state in a ref to stabilise a target.** Remotion
renders frames in parallel tabs; a ref is populated in one worker and empty in
another, so neighbouring frames disagree and the picture flickers every other
frame. This exact "fix" caused a full night of chasing ghosts. Measurement must
be a pure function of the current frame.

**The core now helps:** `CameraRig` quantises target centres to a 2px grid,
rounds measured rects to whole pixels, warns ONCE per target when it drifts
(`target "X" is not stable — it shifts NxMpx`), and accepts a per-shot `chase`
config so one transition can be tuned without touching the shared `snap` preset.
Read those warnings — they name the offending scene before you ever see the
jerk.

**Gate: `bun scripts/jump-check.mjs <id> [...]`** — compares frames pixel-wise,
reports jerks in the middle of smooth motion, and distinguishes them from scene
cuts (a cut is a big change followed by stillness). Run it on every video before
delivering; "clean" is the only acceptable output.

## Transitions & layout consistency (2026-08-16)

- **A scene must never appear fully formed in one frame.** Cutting into a
  finished picture reads as a glitch. Give the scene an entrance the way the
  radar got one: the orbits DRAW in from the centre outward, the centre card
  reveals, blips fade up one by one, and the whole scene rides a short opacity
  ramp. Build the entrance into the KIT block so every future user inherits it.
- **A cut into a static scene is the worst case** — the eye reads it as the
  video freezing. If the next scene starts still, it needs motion in its first
  half-second.
- **Flying objects keep their own proportions.** `FlyToSlot` takes `aspect`:
  a wide site screenshot flying into the composer must fly as a wide card, not
  be squeezed into a square (which produced either cropping or dark bars).
  Square creatives keep `aspect: 1` and are unaffected.
- **`objectFit: contain` with a coloured backdrop is NOT a fix for cropping.**
  It only works when the slot already matches the image ratio; otherwise it
  trades a crop for letterbox bars, which look just as broken. Match the slot
  to the asset.
- **The user question sits at the TOP of the frame in every chat scene.** One
  video framed it centred and it instantly looked like a different product.
  When a scene overrides `shots`, check the first shot's `align.y` against the
  other chat scenes before shipping.
- **Camera moves in one direction inside a scene.** Two shots that pull the
  same element up and then back down (0.24 then 0.28) read as the camera
  hesitating. Zoom never decreases, vertical alignment never reverses.

## Process rules that cost a whole night (2026-08-16)

- **Copy the scene that already works.** There were five clean scenes on disk
  while I invented new mechanics for the broken one. When a video misbehaves,
  open a working sibling FIRST and diff the structure — the answer is usually
  "this one is built differently for no reason".
- **A fix request is not a licence to rewrite the film.** Asked to remove a
  camera jerk in ads-chatgpt, I restructured the scenario and deleted the whole
  second phase of the agent's work (campaign, ad sets, budget). Fix the named
  defect; if the structure also looks wrong, SAY so and wait.
- **Editing the kit edits every video.** Before changing `kit/` for one video,
  list who else consumes it. Softening the shared `snap` spring or changing
  `word-stream` touched all ten films while solving nothing.
- **Measure before diagnosing.** "I see a jump" is a claim until frames prove
  it: render the range, diff neighbouring frames, and locate the changed region
  (`y` band tells you which element moved). Three of my six wrong fixes came
  from guessing at a cause I had not measured.

## Approved brand scenes (statement + lockup ident)

Two promo scene kinds are approved brand assets — reuse them, never rebuild
them: `statement` (left text / centre photo / right word on three levels, with
a static caption plate) and `lockup` (the ident: mark spins in centre, slides
left as the wordmark unfurls, tagline after). Authoring is three fields per
scene; full contract and examples in `src/engine/promo/README.md`. The
wordmark uses Cabinet Grotesk from `public/fonts` (the logo font from
get-ryze.ai) via `kit/brand-font`; everything else stays on Plus Jakarta.

## Guide clicks are machine-verified — the day of twenty broken clicks (2026-08-17)

One full day of Dmitry repeating «у тебя клик не работает» across four
guides ended in a ground-up rewrite of the guide click engine. The lesson
that outranks the code: a class of bug the requester has named TWICE must
stop being guarded by my attention and become a MACHINE gate that fails the
render — my "I checked it this time" was worthless twenty times in a row.
The gates now live in src/guide (ClickAssert: visible + unambiguous target
across the cursor's whole approach; scroll as a timeline primitive;
resolve that ignores hidden layers) — details in src/guide/README.md.
Corollaries burned that day: scenario acts and kit ports are MY output
regardless of which subagent drafted them — verify their ids against the
layers before rendering, never cite an agent when it breaks; and cwd resets
between background commands silently no-op python patches — always `cd`
inside the same command as the edit, then verify the patch actually landed.

## STORY.md is a CLICK SCRIPT, not a synopsis (Dmitry, 2026-08-18 — the day guide-agent was deleted and rebuilt)

Guide-agent was thrown away in full and rebuilt because its story lived in
my head instead of on paper: rail clicks teleported content, an edit played
on text that was not even visible. The rule that came out of it:

- **Before ANY code, STORY.md spells out EVERY click, numbered.** For each
  click: what is clicked, and what changes on screen because of it. Every
  tiny thing — a rail swap, a scroll, a caret focus, a row appearing, a
  hold. If it happens on screen, it has a line in the script.
- **The laws the script must obey are written at the top of the file**
  (drill-in changes only the menu; content changes only from an item/row
  click; every VO fact visible the moment it is spoken; the panel persists
  across pages; no teleports).
- The scenario is then BUILT from the script — acts map 1:1 to the numbered
  clicks. If the build needs a click the script does not have, stop and fix
  the script first.
- Reference: `src/guide/scenarios/agent/STORY.md`.

## Guide videos are a SEPARATE engine: src/guide (Dmitry, 2026-08-16/17)

Narrated YouTube guides (guide-schedules, guide-templates) do NOT use the demo
or promo engines and must never affect them. Everything about making one —
the law (one mounted session, causality, word-anchored clicks, static camera,
plain language), the product-truth-first process against the product repo,
the verification gates (jump-check, freezedetect+silencedetect dead-air
intersection, causality questions on the sheet), and every pitfall already
paid for — lives in `src/guide/README.md`. Read it FIRST before touching any
guide. The first walkthrough attempt died from beat-per-page slide-show
architecture; the post-mortem is `references/GUIDE-MECHANICS.md`.

## The agent panel and in-chat widgets are PORTED, not approximated (Dmitry, 2026-08-16 — walkthrough-schedules v1)

The sidebar agent is a real product surface with a real DOM; a video that draws
it "close enough" is instantly wrong to anyone who uses the app. Read
`app/modules/sidebar-agent/*` and `app/modules/chat/components/*` before
building any panel scene. What v1 got wrong and the laws that came out of it:

- **Panel width is 480px** at our 1920 stage (`md:w-[26rem] xl:w-[30rem]` — the
  xl branch wins). Not 416, not a number that "reads better".
- **Questions are a WIDGET CARD, never loose pills.** The real
  `question-widget.tsx` is a bordered card: heading row, questions separated by
  dividers, capsule options (selected = solid primary), optional "Other..."
  input, and a footer bar with Submit / Submitted. `kit/ryze-ui/widgets`
  already exports `WidgetCard` + `QuestionSection` + `SubmitButton` and
  `src/screens/chat-question-widget.tsx` shows the correct composition — use
  them. Building the pills bare (as v1 did) skips the whole card and reads as a
  different product.
- **Submitting a widget sends a real user message**, not free-typed prose:
  `Answers:` followed by one `- question answer` line per question
  (`formatAnswers`, `ANSWERS_PREFIX`). Show that message, not an invented one.
- **The panel renders the SAME chat components as the full page.** Nothing
  about a message, tool group or reasoning row is panel-specific — if a scene
  needs a "panel version" of a chat block, that is the tell it is wrong.
- **A prompt sent by a button is not typed.** Buttons like Create with Agent
  call `openTask(prompt)` and the message appears at once: use
  `instant: true` on the ChatTurn instead of animating a typing pass.
- **Expand is part of the story.** The panel header's maximize opens the same
  conversation as a full chat (and closes the panel). Morph it: the panel width
  grows into the main area while the in-flow panel spacer collapses to zero, so
  the navbar and page behind end up at their natural width — squeezing the
  shell to 1664px wraps the breadcrumbs and gives the trick away. Fade the
  panel-only header buttons out during the morph.

## Porting product pages into the kit (app screens in videos)

When a video needs a real Ryze screen, the page is ported from the product repo
into `src/kit/ryze-ui/pages/` — never drawn from memory. Full process:
`references/PORTING-PRODUCT-PAGES.md`. Short form: read the route and every
component under it, take copy from `content.*.ts`, take fields from the types
and schema, take columns from the `*ToTableProps` builders, cover EVERY tab and
view toggle as its own exported page, use real assets (integration logos,
template covers, ad creatives from the public bucket), keep the app's tiny
radius scale (capsules are banned), and render a still and look at it before
calling it done. That file also carries the animation lessons from 14.08 —
cursor targets are DOM ids (never coordinates) and must exist on the OUTGOING
page, layout jumps are caused by the markup path (which shell/class), not by
the scroll, panels open with motion and stay open, and every click is verified
by rendering its exact frame and looking at it.

## Replica process (1:1 copies of reference films)

When the task is "make this exact video" — a frame-accurate copy of a
reference — follow `references/REPLICA.md`. Non-negotiables: 8fps-or-denser
map before any code, measured cut list into timings.ts, real assets for
anything that exists in the world (brand marks, mascots, OS UI — never drawn
from memory), frame-score gate on every change (worse number = revert), and
a per-second eye pass plus zoomed strips on every interaction moment.
String-replace edits assert the needle or they did not happen.

## Motion language (from the Higgsfield reference batch — the bar)

Extracted frame-by-frame from 6 top-tier videos; proof and per-video timelines
in `references/higgsfield/BREAKDOWN.md`. These rules are what "expensive"
means. They override softer habits elsewhere in this file.

**Transitions**
- Scene changes are HARD CUTS on the musical grid or MORPHS (an on-screen
  object physically transforms into the next scene's object). Soft crossfades
  read cheap — allowed only for background-level swaps.
- One object carries the intro: logo → shape → card → composer. Matter is
  continuous; the viewer never loses the thread (match-cut thinking).
- Other legit transitions: zoom-into-screenshot (a framed window scales up to
  full-bleed), headline-shrinks-into-status-line, hard white cut to endcard.

**Motion blur — the single biggest "expensive" tell**
- Every fast move gets velocity-proportional blur: directional blur while
  text slides in, scale blur while a card expands, blur on avalanche rows
  landing. Settles to sharp at rest. No blur = cardboard.

**Scene length grammar (macro-crescendo)**
- Lockup hook 1.5-2.5s → setup/UI scenes 4-8s → optional ONE long real-work
  take 10-20s (pace comes from inside the capture: cursor working, prompts
  landing, camera moving) → results montage with TIGHTENING cuts (2s → 1s)
  → machine-gun burst (2-6 cuts/sec, ≤3s, at the music peak) → hard cut to
  endcard 3-5s. Shot lengths compress toward the climax, release at the end.
- Cut lengths are bar-multiples (~1.4-2s at 110-125 BPM); montage bursts sit
  on beats. Pick the BPM before building the timeline and snap scene
  durations to it (120 BPM @ 30fps = 15 frames/beat, 60/bar).

**Payoff**
- The generated result plays FULL-BLEED — UI chrome vanishes while the output
  takes over the frame for 2-4s. Sell the result, not the browser.
- "Scale" claims end in an avalanche: rows of outputs stacking with
  accelerating rhythm + motion blur, camera pulls back, hard cut to endcard.
- The deliverable gets its own 2s beat: URL pill, deploy check-diagram.

**Typography**
- Progress states are typography: big centered status types in, then SHRINKS
  with blur into a corner status line (inline logo chips) as work starts.
- Key word of a headline gets a highlight-box drawn around it (cousin of our
  underline-accent). Keyword typography can pop word-by-word synced to VO.
- Endcards are alive: one word flickers through accent colors for a few
  frames; small-caps availability line below the lockup.

**Screen recordings**
- Never static: virtual camera zooms to the active region, pans between
  panels, speed-ramps dull stretches; floating caption pills anchor to
  regions. A zero-cut long take is fine when the capture itself moves.

**Music**
- Structure: impact hit on the first lockup → a breath (dip) during the hero
  morph → loud compressed bed through work scenes → montage rides the peak →
  tail/decrescendo only in the last 1.5-5s. Mixed loud; never ends early,
  never plateaus quietly. Put the hit/dip/peak requests in the music prompt.

**Texture**
- One organic motif over clean UI (particles, halftone print, paper-cut) makes
  cleanliness read as intentional. ONE motif per video, ours not theirs.
- Real prompts (specific APIs, numbers, product names) + visible cursor
  clicking send. Marketing-copy prompts read fake.

## Claude UI kit (kit/claude-ui) — authenticity rules

Ported 1:1 from real claude.ai DOM snapshots (deleted after porting — the kit
IS the reference now). When a video
shows Claude, it must be indistinguishable from the real product:

- Ivory bg #FAF9F5, text #141413, terracotta accent #D97757/#C15F3C.
- Welcome heading ("Let's noodle") is SERIF (SourceSerif4), centered
  vertically with the composer as one block.
- Empty composer: placeholder only — NO "Type / for skills" hint anywhere.
  Reply composer placeholder: "Write a message…".
- Tool rows: favicon + "Label toolName". Ryze favicon ONLY on real Ryze
  connector tools (Meta ads, Google ads, GA). Claude-internal apps
  (visualize) get the terracotta starburst via `claudeIcon: true`.
- NO shimmer "thinking" lines — Claude does not do that. Tools appear, then
  the spark status line (starburst + summary) comes AFTER the tool rows,
  then the serif text, then the viz card.
- Agent always closes the turn: after a dashboard/result, Claude says it's
  ready ("Your dashboard is ready — … Want this as a weekly report?").
- MCP app results render in `ClaudeVizCard` (app-window header: initial
  badge + app name). Viz library inside: ClaudeLineChart, ClaudeAreaChart,
  ClaudeBarChart, ClaudeDonut, ClaudeStatCards (count-up), ClaudeMiniTable —
  all generic, data via props, timings via drawAt/appearAt.

## Visual style

- Fonts: Plus Jakarta Sans for everything product/promo (via
  `@remotion/google-fonts`). Artifact scenes (fake storefronts, landing
  pages) may use characterful fonts (e.g. Fraunces) — scenario-local choice.
- App UI colors are locked by `src/ryze-base.css` tokens (brand `#C19767`,
  background `#FDFAF3`). Promo palette: background `#F2F0EB`, ink `#171310`,
  accent `#C19767`. Success green `#059669`.
- Real assets over mocks: competitor creatives come from the public
  `ad-templates` bucket (615 top Meta creatives, see Assets). Product photos
  are generated with Gemini (`generate-image` flow) into `public/`.
- The bar is ВАУ. If a frame looks like a plain wireframe, it is not done.
- No emoji anywhere in rendered videos, code, or docs.

## NO CODE COMMENTS (Dmitry, 2026-08-02 — final)

Zero comments in code. No block comments explaining choreography, no inline
notes, no "why this value" annotations — the code and named constants carry
the meaning, docs live in this file. If something truly needs prose, it goes
into CLAUDE.md or STORY.md, never into the source. This has been called out
repeatedly (COMMENT DETECTED, 2026-07-29; again 2026-08-02) — before every
commit, grep the diff for `/*` and `//` above code you wrote and strip them.

## React/Remotion hooks (hard constraint, caused a real render crash)

Every frame is a fresh render, and React hook order must be IDENTICAL between
renders. Concretely:
- ALL hooks (useSpringAt, useCurrentFrame, springs in loops) run BEFORE any
  early `return null`. Compute first, bail after.
- Never call a hook inside a conditional JSX expression
  (`frame >= X ? {opacity: useSpringAt(...)} : null` = crash #310). Hoist it
  to the top of the component.
- Hooks in .map() are fine ONLY if the array length never changes between
  frames (slice a constant list OUTSIDE, gate visibility with opacity, not
  with hooks).

## Remotion rules (hard constraints)

- Everything is frame-driven. CSS transitions/keyframes DO NOT work in
  renders — re-implement as functions of `useCurrentFrame()` (see
  `core/motion.tsx`: Shimmer, Pulse, Ticker).
- Images: always Remotion `<Img>`, never `<img>` (raw img races the capture
  and renders blank/broken).
- No `Date.now()`, no `Math.random()` — renders must be deterministic.
- No hooks inside `.map()` loops — extract a component per item.
- Scene-level parameters (scroll distance, widths) travel through explicit
  props contracts (`ArtifactSceneProps`), never through closures the engine
  can't see — if the engine computed it, the engine passes it.
- Fonts via `@remotion/google-fonts` only, versions pinned to the remotion
  version in package.json.

## Remotion craft (distilled from the official Remotion skills)

Remotion Skills 2.0 are installed PROJECT-LOCAL at `.claude/skills/` (12 skills,
synced 2026-08-17 from remotion-dev/skills, v4.0.512 — newer than the old
marketplace plugin; prefer these). 2.0 structure: each skill is a router
SKILL.md + topic sub-skill .md files — load only the sub-skill you need
(e.g. `remotion-markup/transitions.md`, `voiceover.md`, `sfx.md`). They are
taste-neutral: mechanics only, our taste stays in this file and the kit.
Notable 2.0 additions worth using here:
- `@remotion/rough-notation` — first-party animated Highlight / Circle /
  Underline / Box / StrikeThrough around text, progress-driven. Complements
  our `kit/underline-accent` (which stays the brand signature) for new
  annotation styles — don't hand-draw a circle/box annotation again.
- `@remotion/effects` `lightLeak()` + `<TransitionSeries.Overlay>` — an
  effect over a cut point WITHOUT shortening the timeline (we're on
  4.0.503, supported). A legit "expensive cut" option alongside hard cuts
  and morphs; fits the one-organic-motif rule.
- Adaptive silence detection recipe (`remotion-markup/silence-detection.md`):
  measure `loudnorm` `input_thresh` first, pass it as `silencedetect`
  noise threshold — better than our fixed-threshold dead-air gate; adopt
  when the gate misfires on quiet music beds.
- `Interactive.Div name="..."` markup (remotion-interactivity) makes
  elements selectable/editable in Studio — optional for us, useful when a
  human will hand-tune a scenario.
The old plugin also remains (`~/.claude/plugins/marketplaces/remotion/skills/`)
— 11 skills with deep-dive .md files per topic. This section is the distilled
subset that matters for this repo. When going deeper (captions, maps, 3D,
audio viz, Lottie, ffmpeg), open the skill files directly.

**Animation (hard rules)**
- CSS `transition`, CSS `animation` and Tailwind animation classes DO NOT
  render correctly. Every animation is `useCurrentFrame()` + `interpolate()`
  or a spring. Our `core/` already wraps this — use it.
- Always clamp: `extrapolateLeft/Right: "clamp"` (our helpers do this).
  `inputRange` must be strictly increasing — `[1, 0]` throws at render time.
- Prefer individual CSS transform properties (`scale`, `translate`, `rotate`)
  over `transform` strings, and keep `interpolate()` inline in `style` —
  this keeps values editable in Remotion Studio. Use `transform` strings only
  for skew/perspective/order-sensitive chains.
- For scale animations add `output: 'perceptual-scale'`.
- House easings: `Easing.spring({damping: 200})` (push, no bounce) and
  `Easing.bezier(0.16, 1, 0.3, 1)` (ease-out expo feel).

**Layout — you are designing a video, not a webpage**
- Decide what the viewer must notice first in each scene; build the frame
  around that one thing. No redundant elements.
- Safe area at 1080px width: keep key text ≥80px from the sides, ≥100px from
  top/bottom. Scale with composition width.
- Type minimums at 1080px width: main headline ~84px, important supporting
  text ~44px. Our card headings run smaller because they sit inside product
  cards — but standalone title/outro scenes must respect these minimums.

**Media**
- Video/audio: `<Video>`/`<Audio>` from `@remotion/media`. Images: Remotion
  `<Img>` (waits for load — never raw `<img>`). GIF/APNG/WebP: `<AnimatedImage>`.
- Assets in `public/`, referenced via `staticFile()`. Remote URLs allowed.
- Most components accept `from`, `durationInFrames`, `trimBefore` directly;
  `<Sequence>` (layout="none" for headless) is the fallback wrapper.

**Packages**
- Install Remotion-adjacent packages with `bunx remotion add <pkg>` (correct
  version pinning), e.g. `bunx remotion add @remotion/transitions`.
- `@remotion/transitions` gives `TransitionSeries` with fade/slide/wipe and
  overlays — an option for scene cuts beyond our built-in cross-fade.
- Fonts: `@remotion/google-fonts/<Font>` `loadFont()` — type-safe, blocks
  render until ready. Load only needed weights/subsets when possible.

**Sound (when we add it)**
- Sound effects: `<Audio>` with the remotion.media library (whoosh, whip,
  switch, mouse-click, ding, shutter...) — mouse-click fits button presses,
  whoosh fits flights, switch fits toggles.
- Voiceover: official voiceover.md covers ElevenLabs TTS end-to-end; we
  already use an ElevenLabs key (`ELEVENLABS_API_KEY`).

**Studio & verification**
- `bunx remotion studio --no-open` starts/reuses the preview server;
  `/[composition-id]` deep-links a composition.
- Quick layout checks: `bunx remotion still <id> --frame=<n> --scale=0.25`
  renders 4x faster; use full scale only for final eye passes.
- Naming layers: wrapping key elements in `Interactive.Div name="..."` makes
  them selectable/editable in Studio. Optional for us; useful when a human
  will hand-tune a scenario in Studio.

**Ecosystem note**: skills.sh lists many third-party Remotion skills — they
are mostly forks/copies of the official pack. The official plugin covers
everything we need today; revisit `elevenlabs-remotion` and `remotion-ads`
only when voiceover/ads-specific work starts.

## The stage system (core/stage/ — camera, cursor, objects; use for EVERY scene with movement)

One module drives all camera and cursor motion. Born 2026-08-14 from the
Claude-tweet replica + the Screen Studio / openscreen breakdown; approved on
ask-open and guide-cam ("оба ахуенные"). Everything lives in `src/core/stage/`.

**Objects.** Every camera/cursor target is a DOM element with `data-click="id"`
— the SAME ids the cursor clicks. Measurement (`objects.tsx`) walks the
offsetParent chain up to the stage: layout coordinates, immune to the camera
transform, deterministic per frame, no cross-frame state. Rules:
- Target CONTAINERS or stable elements. Never target a moving element (the
  typing caret, a growing list) — the spring re-derives target history from
  the current frame, so a moving target replays its jumps unsmoothed. During
  typing the camera HOLDS on the composer (the Claude reference does exactly
  this; caret-follow was tried and reverted).
- An object must stay MOUNTED while any shot or cursor move references it.
  Hide with opacity, never unmount (page swap layers keep all pages in DOM).
- SVG internals have no offset coords — target the nearest HTML wrapper and
  use `nudge` for points inside a chart.

**Camera (`camera.tsx`).** `CameraRig shots={[...]}` — a shot is
`{at, target?, zoom?|fit?, align?, nudge?, axis?, snap?}`. No move/ease/
durations: a shot means "from frame N the camera wants THIS framing", and a
critically-damped spring-chase (`chase.ts`, per axis, overshoot-clamped)
renders the motion — velocity-continuous through every retarget, simulated
from frame 0 each frame (pure function, render-farm safe). `axis: "x"|"y"`
locks the other axis to the previous shot (horizontal pans that don't dive).
`snap: true` = stiffer spring for chat-catch-up jumps. `align` places the
object in the viewport (0..1). Focus is CLAMPED to the stage bounds by
default — the camera can never frame emptiness past the interface edge
(`bounds={false}` for zoom<1 promo pullbacks). A gentle push-in drift +
noise wander runs on top (`drift={0}` to disable). Spring character lives in
`CHASE` presets — tune stiffness there, not per shot.

**Cursor (`cursor.tsx`).** ONE `SceneCursor` per scene, rendered INSIDE the
rig (it zooms with the camera like a real recording — never a sibling).
`{from, moves: [{target, at, travel?, press?, nudge?}]}` — same spring-chase
toward each object, arrives just before `at`, dips on click, idles with
noise wander that is velocity-gated (still = breathes, moving = straight).
Click sfx stays a separate `SfxTrack` at the same frames.

**Scroll does not exist.** Content never translates inside a scroller —
that would lie to the object system (layout vs visual position). The feed
grows in stage space (taller than the viewport is fine) and the camera
walks it with shots (snap shots for chat catch-up). One source of motion.

**Camera never pulls back inside a scene (Dmitry, 2026-08-15 — apply
everywhere).** Once the camera has pushed in, it does not zoom back out within
the same scene: zoom levels across a scene's shots are non-decreasing (equal
or tighter, push-crescendo). The only way out of a zoomed state is a HARD CUT
to the next scene. This kills the "looked at it, then wandered off" feel:
zoomed to the errors = stay on the errors. Corollary: no wide-out settle shot
after a send/click — cut from the tight frame directly.

**Mount-synced shots (Dmitry, 2026-08-15 — the root of "камера дёргается",
found after fixing frames three times).** In a bottom-anchored feed a mounting
message TELEPORTS every visible message in one frame. If the camera shot for
the new block fires even 4-8 frames AFTER the mount, the viewer sees two
separate events: the feed jumps, a beat passes, then the camera moves. The
law: the shot targeting a newly mounted block fires ON the mount frame with
`snap: true` — the feed's jump and the camera's whip become one gesture, each
masking the other (same trick as snapping into the sliding thread panel).
Never schedule a shot "a few frames after" the thing it frames appears.

**Camera targets must be MEASURED ONCE and never re-measured (2026-08-16 — the
jitter that lived in every video).** `chase()` re-simulates the whole spring
from frame 0 on every frame, so the target function must be a pure function of
frame. It was not: `useObjectRects` measured the DOM inside `useLayoutEffect`
and stored rects in React state, so the numbers arrived one render late and
could land before or after Remotion captured the frame. Any change to that
snapshot — a card mounting, a chunk starting mid-timeline, a measurement
landing a tick later — rewrote the spring's entire history retroactively and
the camera jumped. Proof: two identical renders of a scene with an
object-targeted camera differed (PSNR 44); a scene without one was
pixel-identical (PSNR inf).
The fix, now in `core/stage/objects.tsx`: rects are measured synchronously
during render into a **ref cache, first-measure-wins**, and the frame is held
with `delayRender` until the pending targets exist. Consequences to respect:
- A target's geometry is frozen at first sight. Never point a shot or a cursor
  move at something that later moves in LAYOUT (masonry reflow, list insert) —
  transforms are fine, they were never measured anyway.
- Keep targets MOUNTED (`opacity`, not `frame < at → null`). An unmounted
  target has no rect, so the first frame that needs it pays a delayRender and
  the spring starts from a fallback.
- Verify determinism the same way, it is two commands: render a range twice
  and `ffmpeg -lavfi psnr`. PSNR inf = deterministic. Anything else is a bug,
  not a rounding artifact.

**Framing language (from the Amplitude + Claude reference breakdowns):**
frame whole regions (a panel, the composer, a message) — not arbitrary
points; deep zooms only on self-contained regions; between actions the
camera parks (drift keeps it alive); micro-movements tied to on-screen
actions beat constant swimming. Camera language 1.5–2.2x for full-bleed UI.

## Kit catalog (check here FIRST — grep src/kit/)

core/: springs presets, useSpringAt, useReveal(start, distance, duration),
typing, press, blink, lerpRect, window01, Shimmer, Pulse, Ticker,
useVelocityBlur (motion-blur filter matched to a spring), beat.ts (beatGrid:
BPM -> beats/bars in frames, snapToBar/snapToBeat — every timeline picks a
BPM and builds durations from bars), schedule.ts (cascade: start + gaps ->
frame marks, for accelerating click/row runs).
Physics ONLY comes from here — scenario/engine files never re-implement
reveal/typing/blink/press/shimmer (this drifted 5 times before the first
full review; re-exports like kit/ryze-ui/motion.tsx are the pattern).
Installed Remotion packages beyond basics: @remotion/motion-blur
(<CameraMotionBlur> for whole-scene smears — avalanches, camera moves;
<Trail> for directional ghost trails), @remotion/noise (noise2D/3D for the
one-organic-motif layer: particle drift, texture wander), @remotion/layout-utils
(measureText — exact highlight-box around a headline word).
kit/chat/chat-scene: the WHOLE ask-then-answer chat scene as one data-driven
block — user bubble (optional photo attachments, `attachmentSize` for big
site/creative chips) → Spark thinking → WordStream answer → any result block
(chart, creatives grid, table) → scroll-out, with default camera shots built
in (override via `shots`, add a cursor via `overlay`). `chatSceneMarks(answer)`
derives all timings from the answer text — chart growFrom/tooltip anchor off
`marks.resultAt`. Both ask-and-chart and ask-creatives chat scenes are 30-line
data files on top of it — new "ask X, get Y" videos should be too.
Multi-turn conversations (born 15.08, launch-ads): `history` renders prior
turns settled above the active turn, `prompt` is optional (agent continues
without a new bubble), `continuationMarks(answer)` paces the follow-up
(result streams WITH the text), `bounds={false}` lets the feed grow below
1080 while the camera walks it. See Conversation continuity & momentum.
kit/campaign-panel: the "everything's ready → Launch → Live" approval card
(platform logos, meta line, thumbs row, press + green flip) — used by
ads-chatgpt and launch-ads; any approve-then-live beat should use it.
kit/kinetic-text: InlineTile (white logo tile popping into a sentence),
KineticLine (word-by-word kinetic hooks; parts = words / accent words /
highlight+sparks / emoji / logo tiles / {br: true} line breaks). This IS the
house hook style — hooks are data, not bespoke components.
kit/settle-text: SettleLine/SettleBeats — THE DEFAULT text entrance for
every text beat, endcards included (Dmitry, 2026-09-04, confirmed on the
Perplexity hybrid-compute reference, references/perplexity-split/; born
2026-08-25 from the Perplexity Portable Computer reference,
references/perplexity-kinetic/): serif Fraunces line, whole layout reserved
up front, each word rises from below (0.38em) out of blur into ink at its
own `at`, ~15f settle, ~4-6f stagger; inline icons open an animated gap
between words and spring-pop from a point. No highlight plates, no sparks,
soft fades between beats. A two-part line splits across two rows (`br`),
the second row arriving after the first. KineticLine (bold plates, words
popping) is used only when Dmitry asks for it by name — a KineticLine
endcard was called «как будто в Remotion сделали» on 2026-09-04.
Platform logos also render inline in product widgets: QuestionSection
options take `logos`, ToolFlow ToolSpec takes `logos` — sprinkle real
platform marks wherever the copy names a platform (Dmitry: «духуя логотипы»).
Morph transition (fix-seo): an in-chat widget expands into a full-frame
scene with zero cut — measure the widget's rect via useObjectRects inside
the rig, render an overlay that lerps that rect to the final geometry while
a backdrop fades in, hide the in-flow original at EXPAND_AT. Use this when a
preview "становится" the next scene; mirrored scenes share geometry through
exported constants (SCORE_COL/SCAN_SITE pattern) so nothing jumps.
kit/fly-to-input: the signature minimize-into-input as objects — Composer
gets `attachment={<AttachmentSlots count={4}/>}` (empty measured slots), and
one `<FlyToSlot image slotId from={{x,y,size,tilt}} appearAt flyAt/>` per
tile flies it into its slot (object-anchored: no hand-tuned landing coords).
kit/spark (ryze-sun thinking pulse), kit/chat/word-stream (word-by-word
streamed answer text, `streamWords` + `<WordStream/>`).
kit/radar: the monitoring primitive — `<Radar nodes center cfg/>` draws
elliptic orbit rings, a rotating conic sweep beam, and one blip per node
(favicon + label + badge) that flashes and emits a ping ring each time the
beam passes it. `radarConfig()` owns centre/radii/aspect/revolution/color;
badges pop on the node's FIRST sweep. Any "we watch this for you 24/7" claim
uses it — the scene supplies the centre card and the node data only.
kit/grok-ui: the Grok Bot app, ported from Dmitry's screenshots of the real
client (2026-09-01): Bloub (the official bot avatar — body paths exported
from the app in bloub-shapes.ts; props: shape circle/triangle/square, color,
gaze {x,y}, blink 0..1 via blinkAt/blinkTrack), GrokFrame, GrokSidebar (rows
of bots; `sidebarAvatarRect(i)` gives the avatar slot so a hero can fly into
it), GrokHeader, GrokThread/GrokDay/GrokBubble, GrokBotCard (the bot card
with status pill, cover, Publish/Copy link), GrokComposer (pill composer with
+ and mic, caret), GrokPanel + GrokScreen ("<bot>'s screen" browser frame) +
GrokRoutines / GrokRoutinesEmpty + GrokMembers (group-thread panel),
GrokCluster (two stacked bots = a group thread avatar), GrokBotMessage (name
label in the bot's colour, avatar at the bubble foot), GrokSystemRow +
GrokInlineBot ("Added ● SEO Optimizer", "Created routine …"), GrokThumb /
GrokThumbRow (images inside a bubble), GrokApprovalCard ("The Bot wants to
run a task" with Approval required → Approved and an Approve button that
carries a data-click id). User bubbles are BLACK, right-aligned. Group
threads are bottom-anchored (`GrokThread anchored`): messages mount in one
step, no height animation. Inter font. Eyes ARE the character: gaze follows what the bot
"looks at" (the orbiting ring, the panel), blink on every landing.
kit/muse-ui: Meta's Muse Mac app, ported from Dmitry's screenshots and the
launch film (2026-09-21, references/muse-ad/): MuseFrame (white shell) +
MuseRail (six icons, no user avatar unless given) + MuseTopbar ("Chats" and
"Invite" chips); MuseAvatar / MuseFloat (Polly's head or the headphones pose,
label pill under it with any status + icon, the avatar always in FRONT of the
pill); MuseThread (760 column, `anchored`), MuseDay, MuseBubble (grey agent /
blue user), MuseSuggestCard, MuseArtifactThumb, MuseTyping, MuseDone;
MuseApprovalCard (their "Muse wants to place an order" anatomy: logo + title,
sub, grey 2-col item grid, total, Deny / Allow pills, `approved` flips the
buttons to a green Approved); MuseComposer (typed, caret, attachments,
`sending` = blue stop button); MuseArtifactPanel + MuseArtifactDoc (title,
stat tiles, leak rows), MuseProfilePanel (avatar, Connected, tabs, activity
feed). Assets in public/muse/ (polly-head, polly-working, polly-body alpha,
muse-icon). Inter font. Stills: muse-chat / muse-working / muse-artifact.
kit/orbit-ring: OrbitRing + orbitPhase/orbitRadius — tool tiles popping onto
an ellipse around a centre, accelerating, contracting and vanishing into it
(promoted 2026-09-21 from grok-bot; muse-ryze is the second consumer).
kit/gradient-field + kit/sweep-title + kit/mark-reveal (2026-09-04, from
the Gemini Enterprise LinkedIn opener, references/lnkd-dMyzNnP9/):
GradientField is the drifting colour-blob ground (blobs as data, GEMINI_FIELD /
RYZE_FIELD presets); SweepTitle is an oversized word that enters from the
right, holds, and exits left with velocity blur; MarkReveal takes any alpha
image as a mask (ryze-sun.png), fills it with any node (the field) and shrinks
it from full-bleed to a small mark while the ground fades to `ground`, then
fades a wordmark in beside it. The three together are the "gradient becomes
the logo" opener; lab composition `kit-lab-gemini`.
kit/lockup: `partnerNode` renders any React node after the × (a live Bloub
that blinks); `partner.showWord` keeps the word next to a partner mark.
kit/stack-avalanche: StackAvalanche — the centre-pile payoff (cards slam onto
a stack with alternating tilts, accelerating marks), promoted from
creative-library-globe. Items carry `w/h` aspect and an optional `badge`
node; `stackLayout(center, base, spread)` places the pile for any frame size.
kit/tile-img: TileImg — the ONE way to render a creative/screenshot inside a
tile: cover-crop anchored to TOP (Dmitry: headlines live at the top of ads;
centre-crop beheads them). Every wall/grid/chip tile uses it.
kit/: tool-flow, tool-card, prompt-composer, promo-blocks (Heading/CardShell/
BareShell + CARD_STYLE — the ONE white card surface, never re-declare the
radius/shadow pair), phase-heading, underline-accent, logo-cycler
(swap-in-frame, clamps on over-long scenes, optional finale), cursor
(traveling pointer with click dips), score-ring, sfx (mouse-click only — the SfxName union is the
approval gate), claude-ui (frame, composer, chat pieces, MCP dialogs, Caret,
viz library), slack-ui (frame, sidebar, channel/thread panes, messages,
composer, file card — ported 1:1 from real Slack DOM dumps, cast avatars in
assets), ryze-ui (product 1:1 kit: app shell, chat, widgets, icons,
attachment-chip, tool-beat-row — product-styled blocks the demo engine
consumes; NOT interchangeable with promo-styled kit blocks).
services/media: mediaDurationSec (ffprobe) — the only place duration is
probed.

UI kits are one-component-per-file with a barrel index.tsx (claude-ui,
slack-ui, ryze-ui all follow this). Never grow a kit by stuffing components
into index — add a file, re-export from the barrel.
Barrels list THEIR OWN module's files only (`./file`). Never re-export
another module through a barrel or a shim file (`export { X } from
"../../core/..."` is banned) — consumers import from the source. When a
refactor de-duplicates code, fix the consumers' imports; do not leave a
one-line forwarding file behind.

## Music (ElevenLabs, wired into rendering)

Every final render should carry background music. The pipeline is one command:

```
bun run video -- <composition-id> [--force-music] [--no-music]
```

It reads `scenarios/<id>/music.json`, generates `public/music/<id>.mp3` via the
ElevenLabs Music API when missing (length auto-matched to the composition
duration), renders the composition, and muxes the track with a 1s fade-in,
2.5s fade-out and `volume` (default 0.55). `--force-music` regenerates the
track; `--no-music` renders silent. Key lives in `.env.local`
(`ELEVENLABS_API_KEY`, gitignored). Generated mp3s are committed so renders
are reproducible without burning credits.

**music.json**: `{ "prompt": "...", "volume": 0.5, "lengthMs": optional }`.

**Length is auto-guarded**: before every render the script compares the
existing mp3 duration to the composition duration and regenerates when the
track is more than 1s short — music must NEVER end before the video.

**Prompt rules (distilled from the ElevenLabs music prompting guide):**
- Lead with the use case — "background music for a SaaS product promo" steers
  tone and structure better than pure genre words.
- Layer: genre + mood + 2-3 named instruments + BPM. Example: "Modern minimal
  tech house, warm analog synth chords, soft four-on-the-floor kick, 118 BPM".
- ALWAYS end with "instrumental only" (the script also sends
  `force_instrumental: true` as a belt-and-braces).
- Match the video's energy arc: promos want a subtle build/resolve ("builds to
  a bright optimistic resolve"); demos want steady, unobtrusive beds.
- Match the scenario's brand: cozy candle store → acoustic folk; food brand →
  playful funk; SaaS feature → minimal electronic. Never one default track
  for everything.
- Simple evocative wording beats long technical prose; length of prompt does
  not correlate with quality.
- Match the video's crescendo: for accelerating promos ask for "building
  momentum", "accelerating intensity", "punchy build-ups" — a flat ambient
  bed makes a fast video feel slow.

## Sound effects

Files live in `public/sfx/` (from the remotion.media library), fired via
`kit/sfx.tsx` (`Sfx` / `SfxTrack`) at exact frames from the scenario timings.

**Approved: `mouse-click` ONLY** — on button presses and send presses.
Dmitry explicitly rejected whoosh and ding (only the mouse click stays). Do not add other effects without his sign-off; if a
new mechanic seems to want a sound, propose it first. The wider library
(whip, page-turn, switch, shutter, meme sounds) exists at remotion.media but
stays out of our videos until approved.

The render script mixes the composition audio (sfx) with the generated music
(`amix`), so effects survive the music mux automatically.

## AI validation (required before shipping)

**Primary reviewer: a Fable SUBAGENT over a high-frequency map (Dmitry,
2026-08-15 — replaces `bun run validate` as the main pass).** Without a
subagent-capable setup, `bun run validate -- <id> --model=<id>` is the same
checklist run by the CLI. After reading
the sheet yourself, build dense strips (`fps=15` tiles per phase, plus the
full sheet) and spawn a Fable subagent (Agent tool, model fable) that LOOKS
at every strip and checks THE BASICS first:
- elements aligned (nothing floating detached from its anchor — menus to
  composers, cursors to targets, labels to rows);
- no jerks (camera or elements jumping between adjacent tiles);
- nothing toggles/moves BY ITSELF — every state change has a visible cause
  on screen (cursor click, typed text, arriving content);
- transitions make sense (no content appearing from nowhere, no scene
  starting as if it were a different report/context);
- design sane at zoom (nothing clipped by overflow, single-line
  placeholders, buttons whole).
Feed it the file paths, the scene's timeline (what SHOULD happen when), and
require per-strip verdicts with frame ranges. Its findings are claims —
verify against real frames before fixing. The old script pass is optional
extra polish:

```
bun run validate -- <composition-id>
```

`src/validation` sends the sheet to Fable with our house rules and returns a
structured verdict. Only P0/P1 issues block a ship (the code derives the
verdict from severities — the reviewer always finds P2 polish ideas, that is
its job, not a reason to loop forever). FIX = fix, re-render, re-sheet,
re-validate. PASS with P2 notes = ship; cherry-pick the P2s you agree with.
Add new checks as files in
`src/validation/checks/` registered in `CHECKS` — candidates: audio length vs
video, font-size minimums, brand-color drift, dead-air detection.

## Frame-by-frame self-review before ANY delivery (Dmitry, 2026-09-07 — claude-directory v2, «куда он кликает?»)

Nothing leaves this repo until I have walked the whole film myself at 100
frames per second of attention: every 10 ms (every 3rd frame at 30fps, or a
15fps strip per phase), start to end, asking at every action: where is the
cursor, what is under it, what did the click change, what is in the frame
and what is outside it, does the thing on screen have a cause. v2 shipped
with the cursor clicking empty space under the card and a composer zoomed so
tight that the typed prompt was never visible and a chip floated with no
reason — both were on the check stills I rendered and looked at, and I sent
the file anyway. A still I glanced at is not a still I checked. Ten seconds
of attention per second of film, before the file goes out, no exceptions,
no "the map looked fine": the map shows scenes, the strips show actions.
Positions of cursor targets are MEASURED from a zoom-1 render (numpy bbox of
the button), never computed in my head from layout constants.

## Verification protocol (before showing ANY video)

**Reviewer findings are claims, not facts.** The sheet reviewer reads a
blurry tile grid: it called a strictly-monotonic counter "regressing" once.
Before fixing a reported defect, verify it against real frames (render the
exact frames, crop the region, look). Fix what's confirmed, refute what
isn't — never "fix" a hallucination, and never argue without frame proof.
The reverse also holds: my own "this scene reads fine" is a claim until the
sheet shows it — the reviewer caught real parks I had already stared past.

**Contact sheet is mandatory after EVERY video** — `bun run sheet -- <id>`
tiles the whole render into one map. Bugs hide between stills: pacing holes,
elements that never appeared, states that overlap, scenes that park too
long. Individual stills are for zooming into a phase; the SHEET is how you
find bugs. Render → sheet → read the whole map with your eyes → only then
ship. No exceptions, even for a one-line change.

1. `bunx tsc --noEmit` from the repo root. Beware: outside the repo a fake
   `tsc` package answers — verify with `bunx tsc --version` if in doubt.
2. Render the DRAFT, build the sheet, and review every phase ON THE MAP —
   beginnings, flight midpoints, endings. Never re-render single stills
   scene-by-scene to check work; the map is the review surface, stills are
   only for zooming into a defect the map already surfaced.
3. Check transition endpoints specifically (on the map): where a scroll
   stops (no dead space below content), where a flight lands (chip seated
   in the composer), where a heading settles.
4. Full render (`bunx remotion render`), then watch it before delivering.
5. Never claim "готово" from code reading alone. A frame you did not render
   and look at is a frame you have not verified.

## Assets

- `public/` — scenario assets. Subfolder per purpose (`showcase/` for
  library creatives). Kebab-case names.
- Already-downloaded brand sets: `away/` (luggage, 7 ads), `kachava/`
  (superfood shake, 5 ads), `creative-wall/` (151 mixed top ads),
  `fix-seo-2/` (Graza before/after storefront screenshots), `showcase/`
  (dandelion, baxter). Check these before fetching anything new, and when
  the requester names a vibe («сумка», «AG1»), pick a cohesive same-brand
  set from your creative library; never mix brands in one "generated" grid.
- Competitor creatives come from Ryze's internal ad-templates library (not
  part of this repo — drop your own creatives into the gitignored folders
  listed in .gitignore). Prefer square (aspect 1.0) for grids, pick
  same-brand pairs for edit before/after.
- Brand photos: generate with Gemini `gemini-3-pro-image-preview`, save as
  jpg into `public/`. Prompt for photorealistic, no text, no labels.
- The Ryze motion kit (source of the UI) is internal; `src/kit/ryze-ui/`
  is its 1:1 port and the source of truth inside this repo.

## Workflow for a new video

0. **READ THE KIT FIRST.** `ls src/kit src/core` + the Kit catalog section,
   skim block props before planning a single scene. Plan the video AS a
   composition of existing blocks; list what is missing. Check
   `references/README.md` and watch 2-3 relevant breakdowns.
1. **STORY.md** in the scenario folder: hook / setup / work-on-screen / wow /
   close, 5 lines. No arc in words = no video.
   Then the scene-duration table IN BARS, checked against the grammar
   budgets (hook ≤2.5s, setup ≤4s, endcard ≤3s, scene ends on its last
   action) BEFORE any component is written. Half of the approvals-autopilot
   review findings were violations of rules already written in this file —
   the fix is running the numbers against the rules up front, not after
   the first render.
2. Pick the type (demo | promo) and format (square/vertical/wide for promo).
3. Create `scenarios/<id>/` — scenario data in `index.tsx`, components split
   by file, `timings.ts` when a scene has more than ~4 marks, `music.json`
   with a brand-and-energy-matched prompt.
4. Reuse kit blocks first. Only write scenario components for what is truly
   unique — and if you notice you are recreating something that exists
   (typed composer, tool list, flight, grid, cursor click), stop and use the
   kit block.
5. Register in `scenarios/index.tsx`.
6. Verify while building: stills of every new visual (--scale=0.25 for speed).
7. `bun run video -- <id>` — renders + generates/mixes music automatically.
8. `bun run sheet -- <id>` — read the WHOLE contact map with your eyes:
   pacing, dead tiles, clipped text, scroll overshoot.
9. `bun run validate -- <id>` — Fable pass. Fix P0/P1, re-render, re-sheet,
   re-validate until PASS.
10. Copy to your delivery folder and deliver.
11. Before finishing: re-read the scenario code — "did I write anything the
    kit already had? did any mechanic appear twice?" Promote to kit now, not
    later. Leaving duplicates behind is the one way to rot this repo.

## Motion lives in the CAMERA, not in the objects (introducing-agent, 2026-09-10 — five rounds of «у тебя менее плавно»)

Replicating Gumloop's "Introducing Gumball" (`references/gumloop-gumball/`,
scenario `src/scenarios/introducing-agent/`), the same feedback came back
until the mechanism changed: my scenes animated objects on a static canvas
(a blob shrinking, chips scaling down, a pill sliding), theirs move the
CAMERA over a continuous world. Rules that came out of it:
- **A pull-back is a KeyedRig zoom-out, never an object scaling down.** The
  hook is one rig from a 2.9x face-fill to 0.5x with the text living in the
  same world (scaled 1/ZF); the blob's screen path is converted to world
  through the zoom (`toWorld(sx, sy, z)`), so the camera does the shrinking
  and the frame blurs by velocity for free. Any cut inside such a move
  («резко появляется») is the tell that two scenes should be one rig.
- **Neighbouring beats share one rig when the reference pans between them.**
  Chips → grid → Searching → cluster is ONE `KeyedRig`: the chip stack lives
  inside a grid cell at 0.3 world scale (camera zoomed 3.3x on it), zooms out
  in 4 frames, pans RIGHT over a static pill (the hero moving left on screen
  means the camera moves right — read the measurement, do not guess the
  direction), then keeps panning right until the cluster rises in its own
  world spot. No scene swap, no object slide.
- **A state change carries over a cut as a MORPH of the same element.** The
  dark "Budget brief" panel collapses (1154→693→497 wide, ease-in then
  ease-out over 9 ref frames) into the "Summarizing" pill while the window
  fades, and the next scene starts with that pill already settled
  (`PILL_AT = -12`). Cut placement follows the settle frame, never the
  headline change.
- **Direction is a claim to measure.** «Прыгает вправо» and «камера идёт
  вправо» were both measured wrong the first time from the strips; the
  per-frame bbox (`measure*.json`) settled both.
- **Rows that swap models keep the losers in fixed edge slots** (three per
  side), fade them with the slide, and blur only while moving — static
  blurred logos read as a bug.
- Scale is measured, not felt: their headlines are ~150px at 1920, chips
  50px, list rows 84px; my first pass at 96/32/58 read as «вайб-кодено»
  next to the reference in an hstack pair strip. Pair strips
  (`ffmpeg hstack` ref|ours at 4–12 fps per 2–4 s) are the review surface
  for any replica.
