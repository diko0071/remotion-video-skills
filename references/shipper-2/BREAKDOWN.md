# Shipper — "Introducing Claude Mythos 5.1 for business-building" (x.com/shipper_now, 2026-09-02)

Source: https://x.com/shipper_now/status/2094890201009275371
`source.mp4` (16.3s, 1280x720, 30fps). 8fps map in `frames/`, key stills
`full_*.png`, tiles `keyA/B/C.png`. Scene-detect cuts (s): 0.37, 0.43, 0.5,
4.63, 4.77, 5.67, 7.3-7.73 (burst), 12.3, 13.87.

## Shot map

| s          | what happens |
| ---------- | ------------ |
| 0-0.5      | Character scramble: "Introducing" resolves out of random glyphs (Int{ dHiM → Int oeccing → Introducing), pale on white; a black flash frame at 0.4. |
| 0.5-1.2    | Word goes green-tinted with a chromatic-aberration smear, soft orange/green colour blobs bloom behind (blurred radial fields). A speech-bubble chip with the Claude starburst + "Claude" pops in, then "for". |
| 1.2-2.6    | Right of "for": a vertical WORD ROLLER in orange (Design / Marketing / Business / E-commerce / SaaS / Air-bnb / Retail / Advertising) scrolling through a mask, the active word inline with the sentence. |
| 1.6-2.6    | PIXEL CORRUPTION wipes in from the left: blocky grey macroblocks (datamosh look) eat the frame, colour blobs dither into green/blue, the word list keeps rolling underneath. |
| 2.6-3.6    | Cut to "SaaS" split wide in orange with a MEME CLIP (confused-face press interview, pixel "?" drawn over the head) punched in between the letters inside a thin grid; the clip shrinks to a thumbnail and vanishes. |
| 3.6-4.6    | White with a POSTERIZED FLUID: blurred noise quantised to 4-5 bands (cream/orange/brown) with a halftone dot lattice riding on it, drifting. A composer card sits on top; the prompt "Build me an Airbnb-style car rental app users can book and pay for" types in; suggestion chips (Kanban Board, Bill Splitter, Explore Recipes, More Ideas, Import Project) below; a soft green glow on the composer edge. |
| 4.6-7.3    | The fluid turns grey/black posterized; the cursor travels to the green send arrow, the camera pushes INTO the arrow (fills 40% of frame), click, "Import Project" pill visible bottom-left. |
| 7.3-12.3   | FEATURE CHAIN on cream with an ASCII/halftone dither field (dot/letter lattice following blurred blobs) and green glow blobs: a green horizontal line with check nodes and labels — Beautiful Interface (Elova car-rental storefront card) → Analytics (stats card) → Back-End (table card) → Media Library → Login → Payments (Stripe key form, Submit). Camera pans right node by node with slight zoom; each card pops under its node, previous drifts off left. Pink/yellow spark scribbles flash near new nodes. |
| 12.3-13.9  | Real footage payoff: fisheye crowd of kids screaming at a phone, the phone screen shows the same crowd (inset), glow blown out. |
| 13.9-16.3  | White endcard: "Shipper" serif wordmark with a glitch bar/scramble on the letters, settles, holds. |

## Why it lands

- ONE texture carries the film: posterized blurred noise + dither lattice
  (halftone dots, ASCII glyphs, macroblocks). Same generator, three skins.
  Clean UI sits on top and reads expensive because the ground is alive.
- Cuts are hard and on the beat; the only long take is the chain pan.
- Real emotion at the payoff (meme clip mid-film, crowd at the end) breaks
  the UI monotony — Conduit/batch3 lesson: footage payoffs.
- Type does the work: scramble in, roller for the audience list, serif
  endcard with a glitch.

## What to steal (in order of value)

1. **A dither-field primitive** (kit): animated noise → posterize N bands →
   optional lattice (dots / ASCII / blocks) → palette. Deterministic per
   frame, WebGL/canvas. Every "expensive" look in this film is that one block.
2. **Word roller** for "for [audience]" — a masked vertical list, active word
   inline with the sentence.
3. **Character scramble** in/out for titles and the endcard.
4. **Push into the send button** as the transition out of the composer.
5. **Feature chain**: line + check nodes + cards, camera walks it.
6. **Pixel-corruption wipe** as a cut (macroblock mask growing from an edge).

Not reproducible: the meme clip and the crowd footage. Replace with our own
footage or drop to a UI payoff.
