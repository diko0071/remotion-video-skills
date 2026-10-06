# muse-timelapse

Wide 1920x1080, 30fps, ~52s, no music. A plain screen recording of the Muse
Mac app: zoom 1, no cuts, no camera, no approval, no artifact, no "Done". The
only human action is typing the prompt and clicking send. Everything after
that is the agent working for a long time, the way the real app shows it
(references/muse-ad/live/run.mp4, 2026-09-21).

What the real app does, and what this film copies exactly:
- One time divider ("6:34 PM") above the user's message. It never changes.
- The label under the avatar cycles: "is working" (tools glyph) -> "Checking
  Ryze" (chart emoji) -> "is responding" (list glyph) -> plain "Muse" with the
  idle head (no laptop) when the turn ends. While working the avatar wears
  headphones at the laptop.
- Typing dots (one dark dot cycling) for as long as it works. Then a small
  empty grey bubble appears and the text streams into it word by word; the
  bubble grows with the text.
- The composer shows the blue stop square while the agent is working.

Hook: "Why did our purchases drop this week?" typed and sent.
Run: it works. Checking Ryze for a long time. Then it responds: spend, clicks
and CTR are flat, purchases fell 38% since Tuesday. Then it works again,
longer. "Interesting." Pixel purchases went to zero Tuesday 3:40 PM while Meta
still attributes some. "Let me check the landing page." Checking landing page.
Page loads, add to cart works, checkout works. "Hmm. Let me check GitHub."
Checking GitHub, long. Found it: a deploy Tuesday 3:31 PM moved the thank-you
page to a new template and the Purchase pixel call is not in it. Orders did
not drop, the tracking did. It offers to restore the event via Ryze and
backfill four days. The label goes back to plain "Muse", the avatar to the
idle head, the composer to the arrow. End there.

## Clicks
1. Composer: typed prompt, cursor to send, click -> blue bubble under the
   "6:34 PM" divider, composer clears, dots appear, label "is working".
Nothing else is clicked.
