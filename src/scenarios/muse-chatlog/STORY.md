# muse-chatlog

Wide 1920x1080, 30fps, ~40s, no music, no camera, no cursor. A finished Muse
conversation, already on screen, and the film is one thing: scrolling down it.
The real app writes one answer per question and narrates its work inside that
answer (bold "Done:", "Hit one snag:", "Interesting wrinkle I'm digging into:",
code spans for field names, bullets). So the conversation is authored as
question -> long narrated answer pairs, twelve of them, and the viewer reads
it the way you read a long thread: quick scroll snaps, short holds, quicker
snaps, until the last answer and the idle avatar. No typing, no dots, no
status pill: Polly is quiet at the top the whole time.

Hook: the top of the thread, "hey! can you check my ad spend for the last
week via Ryze?" and the first spend answer.
Scroll: deeper analytics, "and comment your work during analytics, please",
the narrated answers, the wrinkle (trial event missing, a lead family
instead), pixel purchases vs Meta vs GA4 disagreeing, thank-you refresh
double-fire, test orders, the GitHub deploy that dropped the Purchase call,
the fix through Ryze, the backfill, sources reconciled, ROAS corrected.
Close: "thank you, this is insane" and Muse's last line. Hold on the bottom.

## Clicks
None. The scroll is the only motion: snaps of ~520px every ~1.4s, faster
toward the end, a longer hold on the two key answers (the wrinkle and the
GitHub finding), and the bottom of the thread lands with the last message
just above the composer.
