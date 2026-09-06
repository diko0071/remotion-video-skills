# Reference: chddaniel / Shipper — "Claude pays me to wait"

Source: https://x.com/chddaniel/status/2087564673562649010 (source.mp4)
20.8s, 24fps, 3840x2160 master. Contact sheet: contact-2fps.png.
Copy: "BREAKING: Today we've ended unemployment. I just watched Claude pay me
$1,548.33 to wait for its replies. This is so absurd."

## Why it lands

The claim is absurd and specific, and the video's whole job is to prove the
absurd claim is literally true. Hook (a joke) -> mechanism (you see the ad
render inside the composer) -> proof (a real bank push on a real phone) ->
rule stated in three words. Nothing is explained; everything is shown.

## Measured shot map (30fps frames, verified frame-by-frame)

    0-26     composer types "hi claude, pls make me $10k/mo," over lime pixel rain
    26-90    pull back to the app: Clawd mascot, then code panel, Neon ad docks
    90-121   whole UI defocuses, "+ $158,43" blooms, lime floor glow
    121-180  hard cut: new Cursor session, wide, "clone cluely and make it better."
    180-210  camera pushes in 1.0 -> 2.5 while the Higgsfield ad card slides in
    210-246  hold at 2.5 -> 2.8, cursor travels to the headline and clicks
    246-262  page curl -> advertiser site
    262-297  site full-bleed, then curls away
    297-352  real iPhone, Chase Bank push, "+$158.43 Deposit received"
    352-436  kinetic type, 3 lines on the lime liquid bed
    436-543  settings sheet: master toggle, then 10 app toggles cascade while scrolling
    543-623  endcard "The Idle Attention Company" on a blocky lime mosaic

The first pass of this breakdown mapped the film at 2fps and got the shot
boundaries wrong by up to 3 seconds, and missed the toggle cascade and the
endcard entirely. Map at 8fps or finer, confirm every boundary with
`select='gt(scene,0.08)'` plus sampled stills, and never trust a coarse map.

## Cut list (scene-detect, threshold 0.25)

    0.0   green pixel-particle field, product composer types "hi claude,"
    0.0-9.5  ONE 9.5-SECOND TAKE of the real app. Camera does the work:
             pushes into the composer, pulls back to the full window,
             re-frames to the response, the "+ $158.43" counter blooms over
             a defocused screen. Zero cuts, never boring.
    9.5   cut: fresh session, prompt "clone cluely and make it better"
    11.75 the sponsored ad slides into the composer (Higgsfield card), then a
          page-curl/whip morph carries the laptop screen into the advertiser's
          full site — physical transition, not a crossfade
    14.5  hard cut to a REAL iPhone in the real world, Chase Bank push:
          "+$158.43 Deposit received"
    15.3 / 16.5 / 18.0  kinetic type on a lime liquid-gradient bed, three
          beats, word-by-word: "send a prompt" / "ad shown only while you
          wait" / "get paid by advertisers"
    ~19.5 endcard: settings sheet, "Enable monetization" toggles per tool

Seven hard cuts in twenty seconds. This is NOT machine-gun editing. It is
long takes that move internally plus two physical transitions.

## What we can steal (rules, not vibes)

1. **The raw material is a real screen recording, not a rebuilt UI.** Real
   cursor, real typing latency, real macOS chrome, real advertiser website.
   That single fact is most of the production value. Editing is the craft
   layer; the UI is not redrawn.
2. **Pace from inside the take.** A 9.5s single shot works because a virtual
   camera pushes/pulls/reframes continuously and the numbers bloom on top.
   Cutting more would have made it worse.
3. **Physical transitions.** Page-curl / whip that carries one surface into
   the next. Screen -> world (laptop cut to phone in hand) is the money shot:
   the proof happens OUTSIDE the product.
4. **One motif, everywhere.** Lime green: particles, glow behind the counter,
   ad card, liquid gradient bed, endcard. Nothing else is colored.
5. **Numbers are the star.** $158.43 blooms huge over a defocused screen; the
   bank push repeats the same number. Specific > round.
6. **Kinetic type is the explainer.** Three lines, word-by-word on beat, over
   an abstract bed — no narrator, no bullet list. The mechanism is explained
   in nine words total.
7. **Defocus as emphasis.** The UI goes soft while the number is on top; it
   snaps back sharp when the UI matters again.

## What blocks us from doing this today

We render the product in React instead of capturing it. That caps us at
"clean mock" and makes shots 4 and the world-proof shot impossible. See the
"Capture-first videos" section in CLAUDE.md.
