# The replica process (1:1 video copy)

Proven on shipper-adwait (references/shipper-adwait/, scenario
src/scenarios/shipper-adwait/). This is the process for copying a reference
film frame-by-frame. Follow it in order; every step gates the next. The
failure modes listed per step all actually happened — do not repeat them.

## 0. Download and store

```
yt-dlp -f "bv*[height<=1080]+ba/b[height<=1080]" --merge-output-format mp4 \
  -o references/<id>/source.mp4 "<url>"
```

mp4s are gitignored; the breakdown and maps are committed.

## 1. Dense map — 8fps minimum, look at ALL of it

```
ffmpeg -i source.mp4 -vf "fps=8,scale=480:-1" frames/f%03d.png
```

Tile into sheets of ~42 and READ EVERY SHEET. A 2fps map missed entire
scenes (toggle cascade, endcard) and shifted every boundary by up to 3s.
6% of the frames is not a map, it is a guess.

## 2. Exact cut list — measured, never eyeballed

Two sources, cross-checked:
- `select='gt(scene,0.08)'` scene-detect (low threshold; 0.25 misses morphs)
- luminance jump between consecutive extracted frames (catches what
  scene-detect misses)

Convert to target-fps frame numbers. These become `timings.ts` SHOTS —
one entry per shot, `from` + `duration`, nothing computed by feel.
Expect MORE shots than it looks: shipper "settings scene" was three
separate cuts (wide → macro on the toggle → cascade), not one camera move.

## 3. Breakdown file

references/<id>/BREAKDOWN.md: measured shot map (frame ranges + what
happens), why the film lands, what to steal. Write it before code.

## 4. Assets — real, never redrawn

Anything that exists in the real world is copied, not drawn from memory:
brand marks (favicon: `https://www.google.com/s2/favicons?domain=X&sz=256`,
or /favicon.ico), mascots (find the official SVG on GitHub), OS UI
(iOS notification = SF via `-apple-system`, frosted rgba(250,252,250,0.82),
radius 26, 40px icon, bold title + regular body + gray "now"). Drawing a
"close enough" Chase icon or toggle from memory reads as fake instantly.

## 5. Build scenario against timings.ts

One scene component per shot. Camera = zoom/x/y keyframes (scenario-local
Camera). UI surfaces get their own ui/ files. Standard OS/product motion is
copied exactly: iOS toggle = pill tints FIRST, knob slides after (~30%
progress); a second notification slides out from UNDER the first as a
separate card; cursor sits ON the control it clicks.

## 5b. Anchors — one coordinate system per scene (Amplitude, the cursor day)

A click is a RELATIONSHIP: hotspot on the button, button reacting, dialog
growing out of the button. Independent absolute coordinates for cursor,
target and dialog WILL drift apart — a 40px composer shift silently broke
every interaction and stayed invisible on 300px tiles.

- Declare a LAYOUT block in timings.ts: positions of every clickable target
  (composer, its + button, each panel row button, send). Every cursor stop,
  tooltip and panel position derives from LAYOUT — hardcoded stop numbers
  are banned.
- A continuous product take (open panel → connect → type → send) is ONE shot
  component with ONE camera path — never split into shots that each rebuild
  the layout; that is where width jumps and teleporting dialogs come from.
- When a camera zooms, the cursor must be PROJECTED through the same camera
  transform (screen = (world + t - c) * zoom + c), not hand-placed in screen
  space.
- Gate before delivering: full-resolution crop of every click frame (the dip
  moment) — hotspot on the button, reaction in the same frame, dialog
  anchored to its source. All clicks pass or nothing ships.

## 6. The measurement loop — every change is scored, no exceptions

```
python3 scripts/frame-score.py <id> references/<id>/source.mp4
```

Extracts both videos at 30fps 320x180, prints mean abs luminance diff per
frame + worst seconds. Rules learned the hard way:
- Extract BOTH at the same fps with no duration rescaling — rescaling
  accumulated a 1.5-frame drift and half the "fixes" chased a broken ruler.
- A change that worsens the number gets REVERTED, even if it felt right
  (SVG-turbulence liquid v1, "denser site" — both looked plausible, both
  measured worse, both rolled back).
- For one hot scene, render only its frame range (`--frames=a-b`) and score
  just that slice — 30s per iteration instead of 5min.

## 7. The eye loop — per second, then per frame where it moves

The metric misses texture, mechanics and "fake" feel. After the number
plateaus:
- Per-second pairs (mid-second frame, ref | ours side by side, 21 rows) —
  read all of them, write a defect list, fix in batches.
- For any interaction moment (click, toggle, notification arrival, morph):
  extract a zoomed strip at full frame rate around the moment and compare
  the MECHANICS, not the pose. This is where "close but not the same" lives:
  ref tinted the pill before sliding the knob; ref slid a second card from
  under the first; ref framed the camera ON the toggle during the click.
- `bun scripts/frame-diff.mjs <id> <ref> [fps]` builds side-by-side pair
  sheets for a quick full-film read.

## 8. Verify every programmatic edit landed

String-replace edits MUST assert the needle was found. Two cursor fixes
no-op'd silently (old string didn't match) and shipped as "fixed" — the
frame proved otherwise. `assert a in s` before every replace, and confirm
the visual with a rendered still, not with the diff of the source file.

## 9. Sound

For a study replica, mux the reference's own track:
```
ffmpeg -i ours.mp4 -i source.mp4 -map 0:v -map 1:a -c:v copy -c:a aac -shortest out.mp4
```
For a shippable Ryze video, generate music per CLAUDE.md and place SFX at
the measured hit frames from step 2.

## 10. Deliverables

`out/<id>.mp4` (with audio) + side-by-side
(`ref | ours`, blue/red border) to the delivery folder. The side-by-side IS the
review surface for the human pass.
