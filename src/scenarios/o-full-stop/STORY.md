# o-full-stop — "Full stop." (launch #3 for ChatGPT dots, ryze.ai/gpt)

Wide 1920x1080, 30fps, 20s (600 frames), 120 BPM. No phone, no app pages (Dmitry's pick of
five scenarios, 2026-10-01). v1 was pure typography and got "too much text, no visuals, one
dot jumping instead of a team". v2: the storm opener stays, then a team of plush dots in the
style of OpenAI's dots does the work with their hands on real ad objects, and it has to be
funny.

## Arc
- Hook (0-2.5s): a run-on sentence that cannot end ("Your CPA jumped 38% and 14 search terms
  burned $410 and 37 pages went 404 and ..."), rows rushing across a tilted frame.
- Problem: everything freezes, a lime dot drops in as the full stop after "38%".
- Work on screen: the dot swells and pops into a crew of five, and the crew fixes three ad
  objects one after another: they hammer CPA bars down, punch the number smaller, flip ad
  sets off, strike and kick out wasted search terms, stomp 404 badges to Live.
- Wow: the crew dances on top of the store, then merges back into one dot.
- Close: the dot carries over the cut, hops onto "dot" in "Let your dot run your marketing",
  then drops into ryze.ai/gpt as its dot.

## Laws
- Every change on screen has a dot causing it: a stomp, a punch, a flip, a skate, a kick.
  Nothing changes by itself.
- Every fix ends with the hero dot landing as the period after the fixed number.
- Landings sit on the groove grid: beat = 15 frames from frame 105, 8ths at 7.5.
- UI appears only as objects on white (kit/ad-objects: cards, toggles, term rows, product
  tiles), never as a page.
- Colours are natural and bright: red #FF3B30, green #1DB954 (kit/ad-objects tokens). No pink
  anywhere: a struck amount turns grey, not faded red (Dmitry, v2 review).
- Big numbers float above their card with air (baseline 44px above the card top), never
  pressed onto it (Dmitry, v2 review).
- Charts are bar charts, no line with a filled area under it (Dmitry, v2 review).
- One world, one camera: the three cards sit side by side and the camera pans between them
  (zoom 1.32), so there is no cut until the end card, and the hero dot carries that one.
- The crew: hero (lime, eyes drawn in code), boxer, builder, skater, star. Plush in the
  spirit of OpenAI's dots, our own characters, no faces in the images: the eyes are code.

## Click script
1. 0-70 Storm. Ten rows of the run-on sentence, ink and fog grey, opposite directions,
   accelerating with motion blur, red numbers. Camera tilted -4deg. Storm stem cuts at 70.
2. 62-75 The lime dot falls in and lands after "38%" as the period (thunk, shake). The other
   words fall away; the tilt straightens by 110.
3. 105-135 Groove in. The dot swells, pops at 110 into five dots that land on the words of
   "Your CPA jumped 38%" at 120 and bounce at 127.5. Camera pushes 1.12 -> 1.28.
4. 135-160 Pan right to the Meta card "Cost per purchase": seven daily bars, the last three
   a red spike, $80 above the card, chip +38%.
5. 165-195 The builder hops along the spike and hammers each red bar down (165, 180, 195): the
   bar turns green on impact, bulges and sinks with the builder on top. Between hammers the
   boxer punches the number: $80 -> $64 -> $47 -> $31.
6. 210-225 Skater, hero and star flip the three ad-set toggles off. 232.5 the hero lands as
   the period after "$31", the chip turns green -61%, cheer at 240.
7. 248-268 Pan to the Google Ads card "Search terms" with four wasted rows and "$410/day".
8. 270-323 For each row: the skater rides along it and strikes it, "Negative" pops, the boxer
   kicks the row off the card, the builder stomps the counter: $308, $205, $103, $0/day.
9. 330-341 The hero lands as the period after "$0/day", the pill "14 negative keywords
   added" pops at 333, cheer at 337.5.
10. 342-362 Pan to the store: five product tiles and "+31 More products" in one row, all with
    red 404 badges, "Product pages" with the Shopify logo under the row.
11. 375-412.5 Each dot stomps one badge to Live, then all five pile onto "+31" and it flips.
12. 435-465 The crew lines up on top of the row and dances in alternating hops. Camera creeps
    1.32 -> 1.4 from 420 to the cut.
13. 480 Four dots shrink into the hero, which lands above the row, grown, and blinks at 487.
14. 495 Hard white cut. The hero stays where it was on screen. "Let your dot run your
    marketing" rises word by word from 497, the hero hops onto "dot" at 510 and into the gap
    of "ryze  ai/gpt" at 525 (thunk), winks at 543, blinks at 560 and 584. Slow push to 600.

## Assets
- `public/plush-dots/{hero,boxer,builder,skater,star}.png` (scripts/gen-plush-dots.ts,
  gpt-image-2.5-sunburst, transparent, no faces).
- `references/openai-dots/`: the OpenAI dots launch videos and contact sheets.
- `public/music/o-full-stop-storm.mp3`: ElevenLabs music, "tense frantic intro for a
  typography promo: racing clock ticks, nervous staccato strings and glitch synth stabs,
  rising riser", window 5.49-7.86s, compressor + loudnorm -11 LUFS + 3.5dB, limiter.
- `public/music/o-full-stop-groove.mp3`: ElevenLabs music, "main beat for a bold kinetic
  typography launch film: deep punchy kick like a rubber stamp, claps on two and four,
  plucked synth bass, 120 BPM", window 8.029-24.6s, atempo 0.997755, -15 LUFS.
- `public/sfx/thunk.wav`: ElevenLabs sound generation, "one soft heavy thump, a weighted
  ball landing on a thick felt table, low and round, very short, dry". The thunk is the one
  sound beyond mouse-click, part of the pitch Dmitry picked.
- Audio lives in the composition (`soundtrack.tsx`), so there is no music.json: render with
  `bun run video -- o-full-stop`.
