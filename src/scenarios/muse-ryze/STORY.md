# muse-ryze

Wide 1920x1080, 128 BPM (14f/beat, 56f/bar), ~36s. The Muse Mac app on its
own white ground; one stage phase in the middle where the app dissolves and
the character carries the transition.

Hook (0-3s): the Muse window, Polly idle at the top. "Can you manage my
marketing?" is typed into the composer and sent; the blue bubble lands.
Setup (3-6s): Polly thinks. Typing dots under the bubble, the head tilts and
bobs, the label reads "Muse · thinking".
Work-on-screen (6-12s): the app dissolves (blur + fade, grok-bot mechanic)
and the small avatar grows into a 300px hero at centre. The Ryze sun flies in
from the right and parks beside her; sixteen marketing tools pop into an orbit
around the pair (OrbitRing, promoted from grok-bot), the ring accelerates,
contracts and is swallowed: squash, and on the bounce the head crossfades to
the headphones pose. She says "Yes." in a grey bubble under the label
"Muse · Working with Ryze".
Headline (12-15s): SettleLine on the ground: "Manage your marketing / in
[Muse]" with the app icon inline.
Wow (15-30s): hard cut back into the app. The artifact panel slides open on
the right: "Meta Ads Audit" with four stat tiles counting up and four spend
leaks landing one per beat, status pill "Auditing Meta Ads". Then the
approval card mounts in the thread: "Muse found 4 opportunities", four ad
sets, "Weekly savings $1,430", Deny / Allow. The cursor travels to Allow and
clicks (the only human action). The card's buttons give way to a green
"Approved", the pill flips to "Pausing 4 ad sets", then a grey bubble "Yes!
Paused 4 ad sets, $1,430 a week back." and the big "Done!" check.
Close (30-36s): Ryze lockup with "×" and Polly's head beside the wordmark,
tagline "Your marketing team, now in Muse".

Wow: the character puts on headphones the moment Ryze arrives — the whole
product claim in one gesture.
New mechanic: `kit/orbit-ring` (the tool ring, promoted from grok-bot) and
`MuseFloat` mood crossfade on the swallow.

## Clicks
1. Composer: typed text, caret, send button turns solid on first character,
   cursor clicks send -> blue user bubble, composer empties.
2. Allow on the approval card -> Approved state, pill status changes, bubble
   and Done follow. Nothing else changes by itself: the artifact panel opens
   because the status says Muse is auditing, the card mounts after the audit
   lands.
