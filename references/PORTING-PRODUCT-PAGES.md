# Porting product pages into the video kit

How a Ryze app screen becomes a page in `src/kit/ryze-ui/pages/`. This is the
process that produced the platform tour; follow it every time, because the
failure mode is always the same: a page that LOOKS plausible and is wrong in
every field.

Source of truth: the Ryze product repo (internal).
Never port from memory, from a screenshot, or from another ported page.

## The one rule

**Read the real page before writing a line.** Not the route file — the whole
tree under it. A page is only done when someone who uses Ryze daily could not
tell the ported frame from a screenshot.

## Order of work (do not reorder)

1. **Find the route.** `app/(app)/[org]/[workspace]/<path>/page.tsx`.
2. **Follow every import down.** The page component, each section, each card,
   each row, each pill, each toolbar, each empty/loading/error state.
3. **Read the copy file.** `app/modules/<module>/api/content.<module>.ts` holds
   every label, button, tab, placeholder and status string. Copy them verbatim.
4. **Read the types and schema.** `api/types.*.ts`, `api/schema.*.ts` and the
   drizzle schema decide which fields EXIST. A field that is not stored cannot
   be shown.
5. **Read the table builder.** Tables are built by helpers
   (`lib/utils/**/table.ts`, `*ToTableProps`) — they define the exact column
   set, order, alignment, sortable keys and cell renderers.
6. **Read the constants.** Windows and caps are defined, not invented:
   `WINDOW_DAYS`, `ROLLING_CPA_WINDOW_DAYS`, page sizes, `*_MAX`, status
   vocabularies (`lib/utils/**/status.ts`), catalogs (`lib/utils/issues/catalog.ts`,
   `lib/utils/templates/constants.ts`, `lib/utils/general/sidebar-groups.ts`).
7. **Write the page**, then render it and look at it. Not optional.

## Cover every view, not just the first one

Dmitry's words: «у тебя только канбан, хотя там ещё и лист есть». A page is
not ported until every way of looking at it is a page:

- tab strips (Overview / Campaigns / Creatives / Portfolio; SEO / GEO / Content;
  Identity / Visual / Context; Keywords / Prompts; Pending / History)
- view toggles (board vs list, list vs calendar, cards vs table, week vs month,
  group-by-page vs group-by-issue)
- meaningful states (generating, failed, blocked, empty, paused, needs setup)

Export one component per view from the same page file, sharing a `*Shell` so
the header, tabs and KPIs are identical and the frames cut together in a video.
Register each in `src/scenarios/pages.ts`.

## What is banned

- **Invented fields.** No metric, column, badge or card the product does not
  render. If it is not in the component and not in the schema, it does not exist.
- **Invented chrome.** No page header where the product has none, no KPI row
  the product does not show, no search box, no export button, no status pill
  that lives only in a detail sheet.
- **Grey placeholder boxes.** Every image the product renders must be a real
  file (see Assets).
- **Capsule radii.** The app radius scale is tiny: `--radius-sm 1.8`,
  `--radius-md 2.4`, `--radius-lg 3`, `--radius-xl 4.2`, and `StatusPill` is
  `rounded-[2px]`. `border-radius: 9999px` belongs ONLY to things that are
  genuinely round in the product: status dots, avatars, spinners, progress and
  mini bars, switches, notification badges. Check the component before rounding.
- **Code comments.** Repo-wide ban, see CLAUDE.md.
- **Hooks and animation.** Pages are static React: no `useState`, no
  `useEffect`, no framer-motion, no Remotion animation hooks. Motion belongs to
  the scenario that renders the page.

## Assets

- Copy real files from `seo-audit/public/**` into `ryze-video/public/**` at the
  same path: `integrations/`, `templates/`, `deck-templates/`,
  `dashboard-templates/`, `home/`, `billing/`.
- Ad creatives come from Ryze's internal ad-templates library (gitignored
  here; bring your own).
- Favicons: the product's own `faviconUrl()` (Google s2, sz=64).
- Product photography for a demo workspace: the candle photos already in
  `public/` (`hero-candles.jpg`, `banner-candles.jpg`, `product-1..3.jpg`).
- Always render with Remotion `<Img>` + `staticFile()`, never a raw `<img>`.

## The demo workspace

One brand across every page so the frames cut together: **Ember & Oak**, a
hand-poured candle studio, `ember-and-oak.com`, workspace `ember-and-oak`,
competitors Yankee Candle / Brooklyn Candle Studio / P.F. Candle Co.

Numbers must be internally consistent ACROSS pages: spend and conversions in
the paid dashboard match the channels table and the campaign rows; a schedule's
last run matches the chat it produced; country clicks sum to the clicks KPI.
Pages must read full — 6-12 rows or cards, not three lonely items.

## Page skeleton

```tsx
import { Img, staticFile } from "remotion";
import { RyzeApp } from "../app-shell";
import "../pages.css";
import "./<slug>.css";

export const <Name>Page: React.FC = () => (
  <RyzeApp workspace="ember-and-oak" page="<breadcrumb>" nav="<rail label>" stretch>
    <div className="pg"><div className="pg-scroll"><div className="pg-inner wide">
      ...
    </div></div></div>
  </RyzeApp>
);
```

`nav` must match a label in `src/kit/ryze-ui/rail.tsx`, which mirrors
`lib/utils/general/sidebar-groups.ts` (Paid Ads is a flat group; SEO is a
drill-in section with Overview / On-page / Off-page).

Shared primitives live in `src/kit/ryze-ui/pages.css` (`.pg*`, `.spill`,
`.btn-*`, `.list-row`, `.switch`, `.board-*`, `.int-*`, `.setup-*`, `.phase-*`).
Reuse them; anything new goes in the page's own CSS file. Never edit
`ryze-base.css`, `screens.css`, `app.tsx`, `rail.tsx`, `navbar.tsx` or
`icons.tsx` to ship one page.

## Charts

The app's chart library is not available in the kit. Redraw as inline SVG,
mirroring the product's chart components: read `components/ui/chart*`,
`components/ui/charts/**` and the block that renders it, and copy the real
palette (`CHART_PRIMARY_SCALE`, `--chart-c1..c6`), bar radii, gridlines, axis
labels and legend shape. Same shape, same colors, same tick format.

## Verification (a page is not done without this)

1. `bunx tsc --noEmit` — clean.
2. Register the page in `src/scenarios/pages.ts`, then
   `bunx remotion still page-ryze-<slug> /tmp/<slug>.png --log=error`.
3. **Open the PNG and look at it.** Clipped text, overflowing grids, empty
   regions, broken images, capsule pills, a column cut off at the frame edge —
   all of it is found by looking, not by reading code.
4. Fix and re-render until it reads like the product.

## When the product moves

The product ships daily; a ported page is a snapshot. Before reusing a page in
a new video, re-read its source module — the chat empty state was rebuilt in
production while the kit still showed the 2026 motion-kit version, and the old
AI Visibility dashboard was replaced entirely. If a page no longer matches,
fix the page, do not fork it.

## Animating the app: lessons paid for in full (2026-08-14)

Every rule below cost Dmitry a repeat. He said the same thing up to seven
times before the real cause was found, because each time the symptom was
"fixed" without opening the thing that produced it. Read this section before
animating any app screen.

### Never position anything by coordinates

Hand-typed `{ x: 423, y: 164 }` for a cursor click is wrong the moment the
layout shifts by a pixel — and it shifts constantly, because the pages are
data-driven. The cursor then clicks the wrong tab, or clicks the rail while
the video shows a tab switching, and it reads as a lie.

**The mechanism:** clickable things declare themselves with a stable id —
`data-click="tab.brand.Visual"`, `nav.dashboard.SEO`,
`view.content-plan.calendar`. A beat says which id it clicks; `kit/click-cursor`
finds that element in the DOM, measures it, and flies to its real centre.
There are no coordinates anywhere in the repo. Keep it that way.

**The trap that follows:** the target must exist on the OUTGOING page, not the
incoming one. Entering the SEO section by clicking `nav.seo.Home` renders no
cursor at all — that rail row does not exist yet; the rail is still in
dashboard mode. You click `nav.dashboard.SEO`, exactly as a person would.

**A beat with nothing to click gets `click: null`** — a chat turn where the
user types has no cursor on screen at all. A cursor tapping empty space while
text types itself reads as a glitch.

### The cursor appears, flies, clicks, disappears

A cursor that travels continuously between clicks drifts across the whole
scene — slow on long beats, jerky on short ones ("как у пьяного"). It shows up
~0.4s before the click next to its target, presses, and fades. Between beats
it is not on screen.

### Verify every click by rendering its exact frame

Print the click frame of every beat, render those stills, and look at each
one. This is the only way the SEO-section bug was found — the code was
plausible and the video was wrong. "It probably lands right" is not a check.

### Layout jumps: look for the layout, not the scroll

Chased "the messages jump" through four different scroll rewrites. None of the
causes were the scroll:

- `.chat-messages` carries `margin: auto auto 0` — an auto TOP margin, so
  short content is pinned to the BOTTOM. A first turn (question + two tool
  rows) can never sit at the top no matter what the scroll does. The
  conversation opts out with `.chat-conv .chat-messages { margin-top: 0 }`.
- The artifact branch renders the chat through a different shell
  (`ArtifactShell` → `ChatPage`), which did not carry that class — so the
  moment a turn with an artifact became active, the whole column dropped.
  Any alternate shell must carry the same class.
- The artifact shell was swapping in at the start of the turn, before the
  panel animated, so the layout changed in a frame where nothing visibly
  happened. Swap the shell exactly when the panel opens.

**Rule:** when two adjacent frames differ and nothing was supposed to change,
diff the RENDERED MARKUP path (which shell, which classes), not the numbers
you last edited.

### Scroll must be continuous across turns

Each turn recomputing its own scroll from scratch produces a jump at every
boundary: the previous turn ended anchored to its question, the next one
started pinned to the bottom. The pre-send position of turn N+1 is exactly
where turn N left the view; after send it glides to the new question. Same
measurement basis for both, one spring between them.

### The first message is typed in the empty state

Production starts a chat in the empty state (hero phrase, draft shelf,
playbooks). Typing the first prompt into a bare thread implies a conversation
that does not exist. Switch to the thread when the message is sent, not before.

### Panels open, they do not appear

The artifact panel slides in from the right while the chat column narrows.
Anything that pops into existence fully formed reads as a cut, not a UI.
Once opened, it stays open for the rest of the conversation — it must not
vanish because the next turn did not declare it.

### Cross-fades between full pages flash

Two opaque pages cross-fading make the light background wash through: a white
blink on every transition. Cut hard, or keep the outgoing page fully opaque
underneath and fade the incoming one in on top.

### Pace states for a human, not for a machine

The first pass ran tool rows at ~0.7s each with a 4-frame gap after the
question. Unreadable. Question → first tool ~0.7s, each tool ~1.5s, then the
answer and result with real pauses. When in doubt, slow down.

### Layering

A shelf tucked under the composer needs its own stacking context, or it draws
over the input it is supposed to sit behind. Check every element that uses a
negative margin to tuck under another one.
