# kit/ryze-ui — the product UI contract

How to add or consume a product page in videos. Porting process (what to read
in the seo-audit repo, banned inventions, assets, verification) lives in
`references/PORTING-PRODUCT-PAGES.md`; this file is the code contract.

## Page module anatomy (`pages/<slug>/`)

One folder per product screen. Inside it:

- `page.tsx` / `<view>-page.tsx` — COMPOSITION ONLY. A page file imports the
  module's own components + data and lays them out; it contains no chart
  math, no rows, no SVG. Every tab / view toggle of the real screen is its
  own exported page component sharing one `*Shell` (`DashboardShell`,
  `PaidAdsShell`, `BrandShell`, `ArtifactPage`) so header, tabs and KPIs are
  identical across cuts.
- one component per file, kebab-case (`kpi-card.tsx`, `movers-table.tsx`).
- `data.ts` — ALL content: copy, rows, series, chart specs, tab lists,
  titles. Components render what data.ts feeds them; a number or label
  hardcoded in a component is a bug. (Known deviation: chat-artifact pages
  keep long chat prose inline in the page JSX; heads/tools/rows are in
  data.ts.)
- `types.ts` — the module's row/spec types, plus tiny shared formatters
  (`fmtNumber`-style) when they belong to the types.
- `<slug>.css` — page-scoped styles. Shared page primitives (`.pg*`,
  `.btn-*`, `.list-row`, `.spill`, `.switch`, `.board-*`) come from
  `../pages.css`; anything new goes in the page's own file.
- `index.tsx` — barrel re-exporting THIS module's files only (`./file`).
  Never re-export another module or core through a barrel, never leave a
  forwarding shim behind after a refactor — fix the consumers' imports.
  New pages are also exported from `pages/index.tsx`.

Pages are static React: no hooks for state (`useState`/`useEffect` banned),
no CSS transitions. Motion is frame-driven and arrives via props (below).

## The `<Feature>Body` convention

A `*Page` export mounts its own `RyzeApp` shell. A `*Body` export is the
same content WITHOUT the shell, so a guide session can mount `RyzeApp` once
and swap bodies as layers (`src/guide/page-layer.tsx`).

Exists today: `SchedulesBody`, `ScheduleDetailBody` (pages/schedules),
`TemplatesBody` (pages/templates). Every other module exports `*Page` only —
when a guide needs one of those screens, add the Body export first (shell-
less, same content, same props), keeping the `*Page` as the shell-mounted
composition of it.

## Shared primitives (kit/ryze-ui root)

The module root holds cross-page building blocks: `app-shell.tsx` (`RyzeApp`,
`AgentPanel`, `ShellOverrideProvider`), `navbar`, `rail`, `icons`, chat pieces
(`message`, `chat-page`, `tool-group`, `composer`, `attachment-chip`),
widgets (`widget-card`, `question` — `QuestionSection`/`SubmitButton`,
`charts`, `proposal`, aggregated by `widgets.tsx`), and layout primitives
`PageNav` (page-nav.tsx: tab/pager strip — caller passes `className`/
`itemClassName`, active gets `"on"`) and `StatStrip` (stat-strip.tsx: KPI
strip rendering `.k-label`/`.k-val` — the page's CSS styles them).

**Promotion rule (repo law, see CLAUDE.md):** first use lives inside the page
module; the moment a SECOND page needs the same mechanic, stop — promote it
to the kit root as a generic props-driven component, refactor the FIRST
consumer to use it, then continue. Never copy a component between page
folders and never re-implement a mechanic that already exists at the root.
Physics (springs, reveal, press, typing) is imported from `src/core/` —
never re-implemented in a page.

Never edit `ryze-base.css`, `screens.css`, `app.tsx`, `rail.tsx`,
`navbar.tsx` or `icons.tsx` to ship one page.

## data-click ids (cursor / camera targets)

Every interactive element the cursor may click carries `data-click="<id>"`.
The stage system (`src/core/stage/objects.tsx`) measures these ids; cursor
moves and camera shots reference them — never coordinates.

Naming patterns in use:

- `nav.<section>.<label>` — rail items
- `tab.<t>` — templates filter tabs; page-prefixed variants exist:
  `tab.seo-dashboard.<name>`, `tab.paid-ads.<t>`, `tab.brand.<t>`,
  `tab.queries.<label>`
- `tpl.<title>` — template cards; `report.<name>`, `schedule.<name>`,
  `run.<when>`, `connector.<label>` — list rows
- `dlg.*` (`dlg.close`, `dlg.use`, `dlg.build`), `dialog.*`
  (`dialog.emails`, `dialog.save`) — dialog controls
- `schedule.*` (`schedule.dots`, `schedule.edit`, `schedule.run-now`,
  `schedule.back`), `schedules.create` — schedules controls
- `q.*` (`q.task`, `q.freq`, `q.dest`) + `widget.submit` — question-widget
  options (ids passed via the `options[].id` prop)
- `agent.*` (`agent.close`, `agent.expand`, `agent.panel`) — panel chrome
- `composer*`, `msg.*`, `view.*` — composer, messages, view toggles

Duplicate ids across simultaneously mounted layers are disambiguated by
scoping: wrap the layer in an element with `SCOPE_ATTR`
(`data-stage-layer="<scope>"` — `PageLayer scope=` does this) and reference
the target as `"<scope>//<id>"` (`scopedId(scope, id)`, separator
`SCOPE_SEP`). Example: `"m//tpl.Organic Traffic Overview"`.

Rules that keep measurement sane:
- Targets must stay MOUNTED for the whole span any shot or cursor move
  references them — hide with `opacity` (PageLayer, `visible={false}`
  dialogs), never unmount. Geometry is frozen at first measure; a target
  must not later move in layout.
- Ids must be stable strings derived from data (`tpl.${item.title}`), so a
  scenario can address them without touching the component.

## Props conventions

- **Timings arrive via props, named `<event>At` / `<run>From`:** `revealAt`,
  `cascadeFrom`, `pressAt`, `at` (dialogs), `scrollAt`, `runRevealAt`,
  `addedEmailAt`. A page component NEVER hardcodes a scenario frame; the
  scenario computes frames (guide: from `buildTimeline`) and passes them
  down. Undefined timing = settled/static rendering.
- **Data arrives via typed props with data.ts defaults:** `rows = SCHEDULES`,
  `tabs = PAID_ADS_TABS`. Scenarios override to stage a state (created row
  prepended, run prepended) — reusing the exported data constants, never
  re-declaring them.
- **State is boolean props computed by the caller** (`visible`, `saved`,
  `running`, `selected`) — pages hold no state of their own.
- **Slots are ReactNode props** (`panel`, `overlay`, `firstMenu`, `actions`,
  `chat`) bound in scenario closures. NEVER pass a component through
  Remotion `defaultProps` — props are serialized to JSON and the component
  dies. Composition-to-scenario binding is always a closure.

## CSS

- Tokens come from `src/ryze-base.css` (`--background`, `--card`, `--brand`,
  `--border`, `--muted*`, `--chart-c1..c6`, `--emerald-*`, `--rose-600`).
  Never restyle or fork them.
- Radius scale is tiny and locked: `--radius-sm 1.8px`, `--radius-md 2.4px`,
  `--radius-lg 3px`, `--radius-xl 4.2px`. `border-radius: 9999px` (capsules)
  is banned except things genuinely round in the product: dots, avatars,
  spinners, mini bars, switches, badges — and question-widget option pills,
  which the real product renders as capsules.
- Load order per page file: `import "../pages.css"` then
  `import "./<slug>.css"`. Charts are inline SVG mirroring the product's
  chart components and palette — no chart library.

## Consuming from a guide scenario

Guides mount `RyzeApp` ONCE and swap `*Body` layers, anchor clicks to VO
words, and target the data-click ids above (scoped per layer). The full
process — product truth, VO, acts.ts, verification gates, pitfalls — is
`src/guide/README.md`; read it before touching any guide. Reference
implementations: `src/guide/scenarios/schedules`, `src/guide/scenarios/
templates`.
