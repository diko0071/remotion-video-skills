# YouTube long-form reference: "Claude Code SEO: How I Got 50,000 Clicks Per Month" (4IyJm1i__ag, 1:08:15)

The benchmark Dmitry named for our full YouTube videos ("прям просто показатель
того, как нужно делать"). Frames: rf_120.png (HTML slide), rf_1940.png (real
SERP walkthrough). Contact grids in the session scratchpad.

## The formula (three surfaces, one browser)

1. **Talking head PiP, ALWAYS on.** ~340x195 card, bottom-LEFT corner, small
   radius, no border. It stays over everything: slides, screens, code. Full-frame
   talking head appears rarely; the video lives in screens with PiP.
2. **HTML slides opened in the same Chrome** — the killer trick. The "motion
   design" is a local HTML slideshow (file:///.../slideshow/index.html#N),
   generated with Claude, scrolled/stepped in the browser between real screens.
   Slide style: cream background, huge black headline with ONE yellow-marker
   highlighted word ("SEO is [4 buckets]."), one-line grey subtitle, 3-4 white
   cards with pastel borders (blue/green/purple/orange), tiny icon, bold card
   title, muted description, pastel tag pills at card bottoms.
3. **Real screen recordings** — Chrome with real tabs visible (GSC, Ahrefs,
   Google SERP, the client site, code editor, Claude Code in terminal). Nothing
   mocked, everything is the actual work.

## Effects vocabulary (steal all of these)

- **Black caption pill** bottom-center: one sentence summarizing the current
  point, key phrase highlighted with a yellow marker chip ("Claude Code handles
  95%"). Lives on screen for the whole beat. This is his subtitle system — not
  transcript captions, but ONE takeaway line.
- **Hand-drawn arrows** (blue, purple) drawn over slides/screens pointing at the
  thing being discussed. Slight curve, thick stroke, arrowhead — marker style.
- **Spotlight dim**: page darkens except a bright circle around the discussed
  element (seen on slides and SERP rows). Used sparingly at "look here" moments.
- **Word-level yellow marker highlights** inside slide headlines and captions.
- **Zoom-punch** into screen regions during walkthroughs; camera parks while he
  talks, moves when attention should move.

## Editing grammar

- Angle changes NEVER cut directly: talking head -> B-ROLL (slide / screen /
  insert) -> other angle. Dmitry's law for our videos comes from this video.
- Long stretches of real work (SERP reading, code) carry the video; slides
  punctuate as chapter openers and mental models.
- Pacing is calm (it is a tutorial), but every screen moment has a cursor
  doing something real — the cursor IS the narrative pointer.

## What we replicate in ryze-video

- PiP card bottom-left as a kit block (host video prop).
- Slide scenes: our KineticBeats/promo cards already match the vibe; add the
  cream slide-card scene kind with pastel category cards.
- Caption pill with marker highlight as a kit block (CaptionBar).
- Arrow/spotlight overlay primitives (SVG hand-drawn arrow, dim-with-hole).
- Browserbase recordings MUST show a cursor (inject fake cursor overlay in the
  recording driver) — no cursor reads as fake instantly.
