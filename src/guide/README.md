# Guide videos (src/guide)

Narrated YouTube guides that walk a beginner through one Ryze feature. This
module is separate from the demo/promo engines ON PURPOSE: nothing here may
change how demo or promo videos are built, and nothing in `engine/` is needed
here. Shipped guides: `guide-schedules`, `guide-templates` — read both
scenarios before writing a new one; they are the reference implementations.

## The law (non-negotiable)

1. **One continuous session.** The app shell mounts ONCE for the whole video.
   Pages are swapped as layers inside it. Nothing that stays on screen is ever
   re-mounted or replays its entrance. A screen the viewer already saw comes
   back settled.
2. **Every state change has a visible cause in the same shot** — a click, a
   submit, the agent finishing. The narration never moves the interface; it
   only decides how long a state holds.
3. **Click the object, not the menu.** The thing just created is on screen —
   click it. Never navigate through the rail to reach something visible.
4. **The cursor exists only to click.** It fades in, travels, clicks, fades
   out. A cursor that approaches a button and does not press it reads as a
   bug (Dmitry, twice). Near-consecutive clicks keep the cursor alive between
   them (CursorVeil bridges gaps ≤2s).
5. **Camera is static.** No zooms, no pans. Motion comes from the interface
   and the cursor.
6. **Speech leads, actions land on words.** Every act's clicks are anchored to
   the exact word that names them, via word-level transcripts. Never place a
   click "roughly here" in frames.
7. **Plain language in VO.** The viewer knows nothing: no "tools", "prompts",
   "cron", "MCP". A scheduled task is "a job you hand the agent once". Say
   what things are FOR, not what they are called internally. Templates/decks
   are "just examples — ask for any deck you want, your style, your branding".
8. **No dead frames.** Long VO over a frozen screen is a defect even with
   narration. Measure, don't guess (see Verification).

## The process for a new guide

### 1. Product truth first — go to the real repo

The Ryze product repo (internal) is the source of truth.
Before anything else, read the feature's real module:

- the route + page under `app/(app)/` and `app/modules/<feature>/`
- `content.<feature>.ts` — ALL on-screen copy comes from here, verbatim
- component files — layout anatomy, button labels, dialog fields, empty states
- `lib/utils/<feature>/` — catalogs and constants (e.g. all 78 templates,
  9 decks, 5 dashboards live in `lib/utils/templates/`)
- real prompts: buttons like "Create with Agent" send an exact prompt string —
  find it and use it verbatim in the video

Then check the help center: **https://help.get-ryze.ai** — search it for the
feature's article (WebFetch the page). It carries the user-facing explanation,
naming and flow order that the video's narration should match. If the repo and
the help center still leave a hole in the story (what a setting actually does,
which flow is the intended one), ASK DMITRY before building — a wrong guess
costs a full re-render.

Approximating the product from memory is the #1 rejected-video cause.

### 2. Port what is missing into the kit

Compare with `src/kit/ryze-ui/pages/<feature>/`. Port what the video needs and
is not there yet, following `references/PORTING-PRODUCT-PAGES.md` and the
schedules/templates modules as the pattern:

- one component per file, `data.ts` for content, `types.ts`, barrel `index.tsx`
- every page exposes a `<Feature>Body` (no shell) so the guide session can
  swap it inside one `RyzeApp`
- interactive elements get `data-click="<id>"` — cursor targeting depends on it
- dialogs are ported from the real dialog component (fields, hint text, cost
  note — verbatim), rendered always-mounted and hidden with `visible={false}`
- assets: previews/screenshots from the product's `public/` or the already
  rendered sets (`public/deck-gen/slides`, `public/deck-gen/dash`,
  `public/dashboard-templates/previews`)

### 3. STORY.md — the click path in words

Write the path a real user walks, click by click, in order — and for EVERY
click name where it exists in the product (file or help article). A click
with no product source does not go in the video (the invented table
"Publish now" button cost a full review round). Then the arc
(hook / wow / close). If a VO line has no state to sit on, it is the wrong
line. The narration is written to FIT the click path, never the other way.

### 4. Voice

`vo.json`: voiceId `SAz9YHcvj6GT2YYXdXww` (River), modelId `eleven_v3`, with
emotion tags (`[warm]`, `[curious]`, `[excited]`, `[pause]`). Short lines —
one line per on-screen event; 16 short lines beat 9 long ones (dead-air is
measured, see below). Then:

```
bun scripts/generate-vo.ts guide-<id>     # mp3s + vo-durations.json
bun scripts/vo-marks.ts guide-<id>        # word-level timestamps (scribe_v1)
```

Print the word lists and READ them — scribe sometimes mishears a word
("build" -> "filled"); anchor on a word that transcribed correctly.

### 5. acts.ts — the script as data

One act per VO line: `{ vo, actions?, hold?, gap? }`. An action anchors to a
word: `{ on: "press", after: 6, click: "schedules.create", set: "panel" }`.
`set` names a state the session reads via `timeline.at("panel")`. `press:
false` is ONLY for hover-passes — avoid them; if the cursor goes somewhere,
it clicks. If a word is missing, buildTimeline throws with the full word list.
Duplicate ids across layers are scoped: `"tpl2//tpl.<Title>"` with the layer's
`scope` prop on PageLayer.

### 6. index.tsx — the session

- `timeline = buildTimeline(ACTS, MARKS, VO, titleHold(VO))`
- state = pure function of frame: `frame >= timeline.at("x")`
- layers: `<PageLayer visible scope>` per page state, all mounted for the
  whole video (`opacity`, never unmount) — cursor targets must stay measurable
- panel: `usePanelSlide([{ open, close }])` + `GUIDE_PANEL_WIDTH`; give the
  clicked button press feedback and delay the panel a few frames so the click
  reads before the layout moves
- player: `<GuidePlayer timeline voDir title titleUntil titleVo outroAt>` —
  intro title card and the Ryze lockup outro come from the engine
- register in `src/Root.tsx`

### 7. Verify — every gate, before showing

```
bunx tsc --noEmit
bun scripts/guide-timeline.ts guide-<id>      # read the schedule: word → action
bun run video -- guide-<id>                   # render + music
bun scripts/jump-check.mjs guide-<id>         # must print "clean"
ffmpeg -i out/guide-<id>.mp4 -vf "freezedetect=n=-58dB:d=1.6" -map 0:v -f null -
ffmpeg -i out/guide-<id>.mp4 -af "silencedetect=n=-45dB:d=0.8" -f null -
bun run sheet -- guide-<id>
bun scripts/guide-stills.ts guide-<id>       # a still per VO midpoint + per click
```

`guide-stills` is the one-shot gate: LOOK at every still it produces and
answer, per frame — is the thing the narration talks about IN FRAME? did the
click land on it and visibly press? does the click's consequence appear?
Findings here are yours to fix before Dmitry ever sees the video.

Dead air = intersect freeze spans with silence spans; anything ≥1.5s over a
frozen screen gets a VO line or an on-screen event. On the contact sheet ask
exactly three questions: does anything appear without a visible cause? does
any already-seen screen replay its entrance? does every click land on what
the narration names? Then verify key transitions with real frames. Deliver to
your delivery folder and send the file.

## Pitfalls already paid for (do not rediscover)

- **Grid column snap**: `repeat(auto-fill, minmax(...))` re-columns in one
  frame when the panel squeezes the page — pass fixed `cols` to any layer
  visible while the panel opens/closes.
- **Scroll**: scroll the INNER content (`scrollPx` -> margin), never the page
  wrapper (empty void slides in) and never a transform if anything inside
  will be clicked (transforms don't move layout, cursor lands wrong).
  A scroll that goes down and back reads as pointless — don't tour-scroll;
  filter by tabs instead.
- **Dialogs/menus must close on the action that replaces them** (Build closes
  the preview dialog) and must stay mounted while hidden.
- **Entrance wrappers must self-destruct**: a reveal wrapper whose `opacity`
  never quite reaches 1 creates a stacking context and traps any dropdown
  inside it under later siblings — drop the wrapper styles entirely once the
  spring settles (`p > 0.995`).
- **Row menus anchor to the trigger** (`position: relative` on the button,
  menu at `top: 100%`), never to the page container.
- **The modal veil darkens EVERYTHING** — render dialogs as siblings of the
  whole app (shell + panel), not inside the page area.
- **Springs clamped by duration end with a velocity cliff** — jump-check
  flags it; for a there-and-back move use one continuous cosine curve.
- **eleven_v3 re-records drift**: regenerating one line changes its length —
  always re-run vo-marks and re-render; never reuse stale durations.
- **Panel open reflow is the product's real behavior** but give it fixed
  cols + a few frames' delay after the click, or it reads as a glitch.

## Lesson structure (Dmitry, 2026-08-17 — the publishing rebuild)

A guide is a LESSON, not a screen recording. The first publishing cut showed
screens and narrated over them — verdict: «твоё видео бессмысленное, пользы
людям ноль». The rules that fixed it:

- **Teach an entity ON its own screen, completely, then move on.** Click the
  Planned tab and say EVERYTHING about planned articles right there (what it
  is, that it writes itself on its scheduled day, that Generate now exists —
  and click it). Then Drafted, everything about drafts. Then Published, and
  point at the stats sitting in the table (impressions, trend). Never scatter
  facts about one entity across the video, and never narrate a state the
  viewer cannot see.
- **Tabs/filters are clicked, not described.** If the VO names a state, the
  cursor clicks its tab and the table filters. Static narration over an
  unchanging list is dead air with sound.
- **One artifact carries the whole arc.** The same article is the draft you
  open, preview, improve, edit, save, publish, and later republish. Switching
  examples mid-story breaks the lesson. Corollary: its data must stay
  consistent in every frame — status badge, URL column, active filter (a
  Published row sitting in the Drafted filter is a bug; return to All after
  publishing), and the preview/editor content must BE that article (title,
  slug, meta, keyword).
- **Say the automatic behaviors out loud** — they are the product's point and
  they are invisible: planned topics write themselves on their scheduled day
  and become drafts; with auto-publishing on they go live the same day;
  without it they wait in Drafted; Generate now skips the wait.

## More pitfalls (2026-08-17)

- **Row menus follow product logic, not a fixed list.** The product's
  `article-row-actions.tsx` gates every item by status: Published =
  Republish / Unpublish / Delete; Drafted = Edit / Reschedule / Delete;
  Planned adds Generate now. Port the GATING, not just the looks — a menu
  showing Edit on a published article is instantly wrong to any user.
- **A click target must exist AT the click frame.** Switching the rail
  section (or any layer) on the same frame as the click unmounts the target
  under the cursor — it never travels there. Flip state a few frames AFTER
  the click (`SEO_RAIL_AT + 4`).
- **A menu must survive its own item's click.** Hiding the menu at the
  dialog's `at` frame means the click on the menu item lands on nothing —
  keep it visible until `click_frame + ~5`.
- **Press-scale creates stacking contexts on table rows.** Every `<tr>` with
  a `scale` style is its own context, so later rows paint OVER an open menu.
  The row hosting a menu gets `position: relative; zIndex`.
- **Containers must not clip dropdowns.** The product renders menus in a
  portal; our in-flow menu got clipped by `.cp-table { overflow: hidden }`
  the moment the table was shorter than the menu. Table/card containers
  don't clip; if a radius needs clipping, clip the inner table, not the
  wrapper that hosts menus.
- **Anchor words come from the TRANSCRIPT, not the script.** scribe returns
  «publish» where vo.json says «published», «wanna» for «want to» — after
  every vo-marks run, print the word list and anchor to what was actually
  heard.
- **State changes cascade to every surface.** Publish flips the header
  button, the meta-card Status, the plan row badge AND its URL cell — grep
  every place the changed fact is displayed; one stale surface reads as a
  broken product.

## VO is ONE take, cut into lines (Dmitry, 2026-08-17 — «у неё в словах задержки»)

Per-line generation is BANNED for guides: each line was a separate eleven_v3
take, so prosody reset at every line boundary — random pace shifts, and a
`[pause]` tag inside a line stretched to ~3s ON TOP of our inter-line gap
(«with real results, right next to it» arrived seconds late). The pipeline:

```
bun scripts/generate-vo-take.ts <id>      # one take -> _take.mp3 -> per-line cuts
bun scripts/vo-marks.ts <id> --force      # word marks per cut line
```

The script joins all vo.json lines with blank lines, voices them as ONE
request (consistent narrator through the whole film), transcribes the take,
finds each line's start by fuzzy-matching its first 3 words (monotonic
pointer, prefix-3 fuzzy — scribe says «rise» for Ryze, «wanna» for want to),
and ffmpeg-cuts the take into the same per-line mp3s the rest of the
pipeline already expects. Nothing downstream changes.

Rules that come with it:
- **No [pause] tags in guide VO** — in a single take punctuation and
  paragraph breaks do the breathing; the tag over-stretches.
- **Re-run vo-marks --force after every take** and re-check ANCHOR words
  against the new transcript: the same script can come back as «publish»
  in one take and «published» in the next — acts anchor to what was HEARD
  (guide-timeline warns on a missing word; treat any warning as a stop).
- `--reuse-take` re-cuts without re-voicing (boundary tweaks are free).
- Delete the `_take` entry if it lands in vo-marks.json.

## Scroll is a TIMELINE primitive, never a scenario hack (Dmitry, 2026-08-17 — «у тебя со скроллом проблемы везде»)

Every scroll bug in guides (templates, publishing, competitor-ads) was the
same class: scroll implemented ad-hoc per scenario (a margin here, a spring
there), so the page position and the click targets went out of sync — the
cursor clicked an element that the scroll had pushed OFF SCREEN, then a
layer swap silently teleported the page back. The law and the machinery:

- **Scroll is declared in acts, next to clicks**: an action takes
  `scroll: px` (word-anchored like everything else). `buildTimeline`
  collects them into `timeline.scrolls`; the session renders them with ONE
  line — `useGuideScroll(timeline.scrolls)` (src/guide/scroll.ts, piecewise
  springs between stops) — passed to the page's `scrollPx` prop.
- **A click target must be INSIDE the viewport on its click frame.** If the
  page is scrolled down and the next click is at the top, the acts MUST
  scroll back first (`scroll: 0` a beat before the click) — that is what a
  real user does. Never swap to an unscrolled layer under the cursor.
- **Never animate scroll with a lone useSpringAt in the scenario** — that
  was the hack that kept breaking. One source of truth: acts → timeline →
  useGuideScroll.
- Verify on the stills: every click still must show its target under the
  cursor, in frame — a target above/below the fold is the bug this section
  exists for.
- **Scroll only when the content actually overflows** (Dmitry, 2026-08-17 —
  «гора пустого места»): a page that fits the viewport gets NO scroll
  stops at all, and a scroll stop must never exceed contentHeight −
  viewport — check the deepest frame with a still before authoring the px.
  Every layer that coexists with a scroll stop takes the SAME
  `scrollPx={scroll}` — one layer left at 0 makes the page teleport on the
  layer switch.
- **A "run" action has a running state**: Run Scan / re-crawl / generate is
  never instant — show the product's real loading state (button label flips
  to "Scanning…", table becomes a skeleton) for ~2.5s before the result.
  Instant results read as fake.

## THE CLICK ENGINE (rewritten from scratch 2026-08-17, after a full day of «клики опять сломаны»)

Dmitry reported broken clicks ~20 times in one day across four guides.
Every instance traced to ONE root: click targets were resolved as bare
string ids against a DOM the scenario freely reshuffles (layers, rows,
scroll), with `querySelector` happily returning elements inside HIDDEN
layers, first-match-wins on duplicates, and nothing tying "where the
cursor flies" to "what is actually on screen". The engine was rewritten;
these are now guarantees, not habits:

1. **Resolve sees only VISIBLE layers** (`resolveTarget` in
   core/stage/objects.tsx): an element inside a PageLayer with opacity 0
   can never be a cursor target or a measurement. Duplicate ids across
   layers stopped mattering — only the visible one resolves.
2. **Ambiguity is an error**: two VISIBLE elements matching one id fail
   the render with "resolves to N elements — add a layer scope".
3. **The approach window is asserted**: for every click, the target must
   resolve (visible + unique) on EVERY frame of the cursor's last 26
   frames of approach, up to the click frame. The click frame itself may
   already show the result (our transitions fire ON the click frame).
   A layer swap, row shift, early-closing menu, or bad scope kills the
   render with the target name and frame. NEVER weaken or delete this.
4. **Stills render an approach frame + a click frame per click** — the
   eye-pass now sees drift the assert can't judge.

Every click bug of that day, as a checklist of what the engine now
catches mechanically: cursor flying to empty space (unresolvable scoped
id like `rc//nav.*` — shell elements take BARE ids), clicking a target
the scroll had pushed off-screen, rows shifting one slot under the cursor
because a resolved row was REMOVED instead of re-statused, a menu hidden
on the very frame its item was clicked, a rail section swapped on the
click frame unmounting the target, and a sheet resurrecting itself after
navigation (not a click bug but the same class: the screen must behave
like the real product).

And the button that does something must SHOW something: any click that
claims to change state flips visible state on screen (Acknowledge →
"Acknowledged" pill, Approve → "Applying" + View progress). A click with
no visible consequence reads as a broken product.

## Every click target is ASSERTED at render time (Dmitry, 2026-08-17 — «опять клики сломаны»)

A click whose target id doesn't resolve (typo, or a scoped id like
`rc//nav...` pointing at an element that lives OUTSIDE that layer — the rail
and navbar are in the SHELL, never inside a PageLayer scope) used to fail
silently: the cursor flew to a fallback point in empty space. Twice this
shipped to Dmitry before the machine caught it.

Now `ClickAssert` in the guide player measures every click target on its
click frame and THROWS — the render fails with the target name and frame
instead of producing a broken video. Rules that keep it green:
- Shell elements (rail `nav.*`, navbar) are clicked with BARE ids — never
  prefix them with a layer scope.
- A scoped click `x//id` requires the target to be mounted AND visible
  inside PageLayer scope `x` on that exact frame — check the layer's
  visibility window against the click frame when authoring acts.
- If a render dies with "click target not on screen", fix the act or the
  layer window; never delete the assert.

## Rows never move under the cursor; navigation closes overlays (Dmitry, 2026-08-17 — guide-approvals despair round)

Two more instances of one law — the SCREEN behaves like the real product,
not like a convenient layer stack:

- **A resolved list row does NOT vanish mid-scene.** Removing an
  applied/rejected row from the rows array shifts every card below it up
  one slot — the cursor visibly aims at row 2 while row 1 takes the press.
  Keep the row MOUNTED in place and flip its status pill via
  `statusOverrides` (Applied / Rejected). Row sets may only differ across
  a hard page change (tab switch), never inside a scene the cursor is
  working.
- **Leaving a page closes its overlays.** If the story navigates away (to
  a run chat) and comes back, the detail sheet must NOT re-open by itself —
  that is not how any app behaves. Continue the story from the LIST (row
  buttons like Approve exist there) instead of resurrecting the sheet.

## Case study: how guide-publishing was iterated (2026-08-17)

Watch the finished film FIRST — it is the reference for what "a lesson"
means: `scenarios/publishing/` (source), `out/guide-publishing.mp4` (render),
delivered copy in your delivery folder. The road to
it, so you do not repeat it:

1. **v1 died as "screens with narration".** The flow was technically clean
   (clicks, causality, static camera) but it showed the plan table and
   TALKED about planned/drafted/published without clicking the tabs, talked
   about the score without it being on screen, and never opened the article.
   Dmitry: «почему ты табы не жмёшь для динамики? почему статья не
   открывается в превью? твоё видео бессмысленное, пользы ноль». A guide
   where the screen does not change with every taught fact is worthless.
2. **Rebuild as a lesson.** New VO (19 lines, each line = one on-screen
   action), article-preview page ported from the product, one article
   carried through draft → preview → agent → editor → publish → republish.
   Every fact got its click: tabs filter the table, Improve opens the panel,
   Edit opens the editor, Regenerate swaps the image.
3. **Stills pass caught 6 bugs before Dmitry saw it** (the guide-stills
   gate exists for exactly this): preview opened the WRONG article (kit data
   vs plan data), rail section switched on the click frame so the cursor
   never reached SEO, a Published row sat in the Drafted filter after Back,
   the row menu hid on the frame its item was clicked, meta-card Status
   stayed Drafted after Publish, published row had no URL.
4. **Dmitry's pass caught what stills didn't: product LOGIC.** The row menu
   showed all five items on every article — the product gates them by
   status (see More pitfalls). The fix was reading
   `article-row-actions.tsx` in seo-audit, not guessing.
5. **Then the missing TEACHING, not missing footage**: planned articles
   write themselves on their scheduled day (draft without auto-publish,
   live with it) and Generate now exists on every planned row. He also
   reshaped the structure: everything about an entity ON its tab, in order
   (Planned incl. Generate now click → Drafted → Published + stats). That
   reorganization is the Lesson structure section above.
6. **The Generate now insert exposed a new clip bug** (menu cut by
   `.cp-table` overflow on a short table) — found by zooming the exact
   click frame, fixed in the kit, not the scenario.

The meta-lesson: gates (tsc, jump-check, dead-air, stills) catch MECHANICS;
only reading the product code catches LOGIC; and only asking "what does the
viewer LEARN in this second?" catches a pointless video. Run all three.

## Files

```
src/guide/
  script.ts        acts -> timeline (word anchors, states, clicks), titleHold
  player.tsx       static camera, cursor+veil, sfx, VO tracks, intro/outro
  bookends.tsx     GuideIntro (title card), GuideOutro (Ryze lockup)
  cursor-veil.tsx  cursor visible only around clicks, bridges close clicks
  page-layer.tsx   PageLayer (opacity-hidden, scoped for duplicate ids)
  panel.tsx        GUIDE_PANEL_WIDTH, usePanelSlide(open/close moves)
  guide.css        guide-thread styles shared by panel chats
  scenarios/<id>/  STORY.md, vo.json, vo-durations.json, vo-marks.json,
                   acts.ts, index.tsx, panel-chat.tsx, music.json
scripts/
  generate-vo.ts   TTS (guide- aware paths)
  vo-marks.ts      word-level transcription
  guide-timeline.ts prints the second-by-second schedule from acts.ts
```

## Cursor rects are LIVE, never first-wins (2026-08-17 — the domain chip 465px off)

First-measure-wins caching poisoned the guide cursor: a render worker whose
first frame fell inside the agent-panel-open window cached every right-side
target shifted left by the panel spacer (~465px at 1920), and the cursor
clicked a ghost position forever after. Guide cursors now measure rects live
(`useObjectRects(ids, true)`) — safe because guide clicks only happen when
layout is settled (panel fully closed before any approach starts). The class:
any element whose LAYOUT position depends on a transient state (panel slide,
collapsing spacer) lies to a first-wins cache. If a click must land while
layout is animating, that is a scenario bug, not a measurement one.

## Scroll is PER PAGE, never global (2026-08-17 — «если после переключения страницы скролл идёт вверх, это булшит»)

A page always opens at scroll 0 — switching layers must never inherit or
animate away the previous page's scroll position. `useGuideScroll(stops,
{from, until})` scopes the scroll track to one layer's visibility window:
each layer passes its own window and owns its own scroll from a 0 baseline.
The "animate scroll back to 0 before navigating" hack is banned — that is a
symptom of one global scroll value shared across pages.

## Two machine gates added 2026-08-17 (both from «так не работает поведение мышки»)

**MIN_CLICK_GAP = 30 frames.** buildTimeline throws when two consecutive
clicks land closer than a second apart: the cursor physically cannot travel
across the screen and press twice in that time, and the result reads as two
simultaneous clicks. Fix by anchoring on words further apart — or by writing
the VO line with room between the two actions ("Open the agent from the top
bar. Now click into the message box…"), never by shrinking the approach.

**Take slicing requires a FULL anchor match.** The single-take cutter matched
a line's 3-word anchor at 2-of-3 with a 3-letter prefix, so "that's it your"
falsely matched "that opens your" mid-sentence and silently truncated the
previous line's audio (the guide then failed with "word not found" — the
symptom, not the cause). Anchors now require two ADJACENT probe words to
match: that kills the false positive (matches at positions 0 and 2 with a miss
between them) while still tolerating a mangled brand name in the third slot.

## Scroll is a browser scroll, driven by targets (rewritten 2026-08-18 after three broken attempts)

The scroll primitive was rewritten from scratch after a day of overshoot and
empty-space bugs. The laws:

- **Scroll targets are ELEMENTS, never pixel distances.** An act says
  `scrollTo: "c1//dk.slide.03"` (same scoped ids as clicks). To reach the
  bottom, target the LAST element with `align: "end"` — there is no
  pixel value and no "#end" sentinel; both were tried and thrown out.
- **GuideScrollArea scrolls a REAL scroll container**: the spring value is
  written to `scrollTop` each frame in a layout effect. The browser clamps to
  the actual content edge, so overshooting into empty space is physically
  impossible — no measured "max" to get wrong.
- Target offsets are re-measured EVERY frame in the layout effect, right
  before scrollTop is written — a pure function of the current DOM. No
  caches, no delayRender, no first-measure state: a frame-0 layout (fonts
  not ready, other layers) can never poison later frames. A missing target
  THROWS at render time.
- ClickAssert also fails the render when a click target sits outside the
  viewport at click time — a scroll can never push a click off screen
  silently.
- `marginTop`/`translate` hand-scroll wrappers are banned in guide scenarios.

## Shipping guides: YouTube + docs (2026-08-18 — the publish day)

A guide is not done when it renders. It is done when it plays on the page
where a customer will meet it. The pipeline, end to end:

`bun run video -- <id>` → `bun scripts/thumbs.ts` → upload → docs page.

**Upload through the YouTube Data API, not through a browser.** A resumable
upload script with a state file (rerun skips what already landed), custom
thumbnails from `out/thumbs/` and playlist inserts beats driving YouTube
Studio by hand for a batch of eighteen. The token and uploader are not part
of this repo; keep them next to your other credentials.

**`embeddable` is NOT true by default on API uploads.** Set it in `status`
at upload time. Miss it and every docs embed renders "Playback on other
websites has been disabled by the video owner" — which is exactly how this
rule was learned, after reporting the batch as shipped.

**Verify the PLACE, not the artifact.** "18 uploaded, all public" was true
and still wrong: nobody had opened the docs page where the player lives.
Reading back a write response proves the API accepted it, not that a human
sees the thing work. Open the surface.

**Docs page shape:** one page per video — short description in frontmatter,
the embed, "In this guide" (three bullets), "Read next" (links into the real
docs). Every feature page the guide covers gets a note linking back to it,
so the two directions stay connected.

**Player:** `youtube-nocookie.com/embed/<id>?rel=0&cc_load_policy=0&iv_load_policy=3&playsinline=1`.
That kills burned-in auto-captions, annotations and off-channel suggestions.
`modestbranding` has done nothing since 2023, and the pause overlay and
YouTube chrome cannot be removed from an embed at all — a fully clean player
means self-hosting the mp4 behind a `<video poster>`. In JSX attributes use
a plain `&`; `&amp;` lands in the URL literally.

## Dialogs and overlays dissolve, they never cut (2026-08-18 — guide-mcp)

Two bugs in one video, one root: a surface that closes by unmounting.
A settings dialog living in its own PageLayer meant "closing the dialog"
was a cut between two layers — the background jumped. A popup unmounted
right after its click meant the cursor's target vanished from the DOM and
the cursor teleported to the previous click's point. Both are the same
mistake as camera jitter: state changing under something that is being
measured or watched.

The shape that cannot break: ONE layer owns the surface for the whole span,
overlays fade over it (`opacity`), and any element a cursor clicked stays
mounted until the cursor has left it. Hidden-by-opacity is safe — the click
resolver only skips layers marked with the scope attribute.
