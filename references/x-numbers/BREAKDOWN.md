# X Numbers launch (benjitaylor, 2026-09)

Source: https://x.com/benjitaylor/status/2102443951898992825 — 31.25s, 1920x1080.
Map: frames/ at 8fps (f001 = 0.000s, fN = (N-1)/8 s), sheets sheet1..6 (42 tiles each).
Scene-detect at 0.08 finds ONE hard cut (16.23s). Everything else is a morph or a
circle wipe: one object always carries the transition.

## Shot map (seconds, from the 8fps map; refine with 25fps bboxes before timings.ts)

| # | t | what happens |
|---|---|---|
| 1 | 0.00-1.00 | Light grey ground (#F0F0F0). Word types in letter by letter at centre ("Introducing"), no caret. Concentric rings draw in around it: one solid inner circle, 2-3 dashed rings, tiny black squares and small outlined icon chips (video, phone, chat) riding the rings, a thin diagonal line through the centre. Rings rotate slowly the whole time. |
| 2 | 1.00-1.75 | Hold, rings keep turning. |
| 3 | 1.75-2.25 | Word deletes letter by letter (backspace, right to left). |
| 4 | 2.25-3.00 | Product mark + name type in ("<mark> Numbers"). Rings now wider, line tilts. |
| 5 | 3.00-4.00 | Hold, the camera creeps in (rings grow). |
| 6 | 4.00-4.50 | A small circle appears in the middle of the name, expands (double outline) and eats the text; everything collapses into a single thin circle that swells to fill the frame. |
| 7 | 4.50-5.60 | Out of the circle: three dots, then dots pop one by one into a 3x4 keypad grid (last row = one dot). |
| 8 | 5.60-6.10 | The grid morphs: middle row stretches into a grey pill, outer dots swell into grey circles on both sides. |
| 9 | 6.10-7.00 | The pill becomes a white number card (radius ~10, whisper shadow, copy icon at the right). Digits ROLL vertically like a slot machine, each column its own speed, settling left to right into "3555-0162". Thin dotted guide lines run horizontally through the frame; outlined circles slide past behind the card. |
| 10 | 7.00-8.00 | Hold on the settled card, circles keep sliding. |
| 11 | 8.00-8.50 | A big circle with digits written along its arc (numeric dial) rises from the bottom; the phone rises inside it. |
| 12 | 8.50-9.50 | iPhone mock (white UI, chat list) rises and settles centre; dial ring keeps turning behind. |
| 13 | 9.50-10.50 | The "All" dropdown in the header opens (menu grows from the chip); camera pushes in on the menu, a magnifier circle frames it. |
| 14 | 10.50-11.25 | Menu fills the frame at ~3x: rows Unread / Direct / Groups / Requests / Settings / Mark All Read. |
| 15 | 11.25-12.00 | A new row inserts between Requests and Settings: icon first (the dot grid), then its label types in. |
| 16 | 12.00-12.60 | The new row gets a press highlight (grey band sweeps across). |
| 17 | 12.60-13.40 | Camera pulls down/out through the menu into a bottom sheet on the phone ("Your <mark> Number"): copy, number field, Enabled toggle, Refresh / Share buttons. |
| 18 | 13.40-14.25 | The number rolls again inside the sheet and settles. |
| 19 | 14.25-15.00 | Toggle switches on (pill tints green first, knob slides). |
| 20 | 15.00-16.23 | A black dot appears over the number field and grows into a circle (ringed), white background around it: the circle wipe to dark. |
| 21 | 16.23 (CUT) | Dark mode, the OTHER person's phone: profile header (avatar, name, joined, followers, View profile). |
| 22 | 16.25-17.40 | Phone pushes in, the empty chat scrolls to the bottom: "<user> doesn't follow you. If you know their Number…" + white pill button "Enter Number", composer below. |
| 23 | 17.40-18.10 | Button press, a dark sheet slides up: "Enter Number", masked field, full keypad 1-9 . 0 <, Enter button. Camera tight on the sheet. |
| 24 | 18.10-22.50 | Digits entered one per ~0.4s: each keypad key flashes a grey circle, the digit lands in the field, caret moves; the dash is inserted automatically. |
| 25 | 22.50-23.25 | Sheet slides down and away. |
| 26 | 23.25-24.25 | System line: "You used <user>'s Number. You can now message and call them." Composer now says "Encrypted". |
| 27 | 24.25-25.00 | Scroll up to the profile header; camera widens to the full phone. |
| 28 | 25.00-26.00 | Blue outgoing bubble "Love your work", then a grey reply "Yoooo! Thank you". |
| 29 | 26.00-26.90 | Hold, slow pull back. |
| 30 | 26.90-27.40 | A WHITE dot appears centre and grows into a white disc covering the frame (reverse circle wipe back to light). |
| 31 | 27.40-29.50 | Light grey ground: brand mark inside a white disc with a thin outline; a black dot orbits the disc on an ellipse with a short trail; dashed outer ellipses. Everything shrinks toward the mark. |
| 32 | 29.50-30.30 | Disc and orbits vanish, bare mark holds. |
| 33 | 30.30-30.90 | Mark wipes out diagonally (gradient mask sweeping through the strokes). |
| 34 | 30.90-31.25 | Empty grey, last frame black. |

## Why it lands

- Grammar is two circle wipes: light (the owner sets it up) -> dark (the stranger
  uses it) -> light (brand). The palette switch IS the story switch between the two
  sides of the feature.
- One motif everywhere: the circle. Title rings, the collapse, the dial around
  the phone, the magnifier on the menu, the wipes, the orbit around the logo.
- The feature's object (a number) is shown three times with the same slot-roll
  mechanic: abstract card, inside the product sheet, typed on the keypad.
- Almost no text on screen outside the product UI: the title and the UI copy carry it.
- Sound: minimal (check the audio track before building).

## What to take for Ryze

- The skeleton: typed title in rotating rings -> collapse into the feature's glyph ->
  the feature object rolling on a card -> app appears in a dial ring -> menu
  push-in, new item inserts -> sheet with the object + toggle -> black circle wipe
  -> the other side of the feature in dark -> success -> white circle wipe ->
  mark in orbit -> mark wipe.
- Content must be ours: Ryze mark, Ryze UI (kit/ryze-ui), our feature, our copy.
  Nothing of X is reused (no mark, no UI, no copy, no profile).
