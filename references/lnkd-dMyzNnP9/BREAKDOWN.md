# Gemini Enterprise — "Introducing … now purpose built for your industry" (Karthik Narain, LinkedIn, 2026-09)

Source: https://lnkd.in/p/dMyzNnP9 (43s, 1280x720). Sheets at 4fps, intro
strip at 12fps (`intro_strip.png`).

## The opening (0-4.2s), measured

- Ground: a full-bleed blurred colour field (blue base, green / yellow / red
  blobs) that drifts slowly. It stays under everything until the mark.
- "Introducing" is set LARGER than the frame. It enters from the right edge
  as one rigid word (no letter stagger), decelerates into a hold where the
  word almost fills the width (~1s), then accelerates off the left edge.
  Motion blur on both moves.
- The field then BECOMES the mark: the four-point star appears as a huge
  mask filled with the same gradient, and shrinks to a small logo while the
  ground outside turns white. Matter is continuous: gradient → mark.
- "Gemini Enterprise" fades in beside the small mark, dim to ink.
- "now purpose built for" settles first, "your industry" arrives on the
  second line in the accent colour.

## Kit (added 2026-09-04)

- `kit/gradient-field` — GradientField: the drifting blob field (blobs as
  data, `GEMINI_FIELD` / `RYZE_FIELD` presets).
- `kit/sweep-title` — SweepTitle: oversized word, enter from right → hold →
  exit left, velocity blur.
- `kit/mark-reveal` — MarkReveal: any alpha image as a mask (ryze-sun.png)
  filled with any node (the field), shrinks from full-bleed to a mark while
  the ground fades to `ground`, wordmark fades in beside it.
- The two-line claim with the accent second line is SettleLine with `br`.
Lab: composition `kit-lab-gemini`.
