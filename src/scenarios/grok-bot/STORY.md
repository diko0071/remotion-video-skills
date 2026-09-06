# grok-bot

Square 1080, 120 BPM (15f/beat, 60f/bar), ~33s. One continuous stage until the
endcard: no engine scenes, one object carries the intro.

Hook: an ink Grok Bot bloub pops into an empty white frame and blinks twice.
Nothing else. Eyes are the only character in the film.
Setup: marketing tools (GSC, Google Ads, Meta, Shopify, GA, PostHog, Ahrefs,
Semrush, ChatGPT Ads, WordPress, Webflow, Framer, Klaviyo, TikTok, LinkedIn,
HubSpot) pop into an orbit around the bot and start circling; the bot's eyes
track the ring right, then left. The ring accelerates, contracts and is
swallowed by the bot: a squash and a blink.
Work-on-screen: the bot shrinks into the first sidebar row while the Grok Bot
interface unfolds around it; four Ryze bots drop into the sidebar, then the
"Marketing" group thread row. The cursor clicks it (Members panel on the
right) and the composer LIFTS out of the interface to the top of a white
stage while the interface dissolves (one object carries the transition).
"Run my marketing" is typed in the lifted composer; on send the composer
morphs into the black user bubble top-right. All four bots appear under it
with typing dots, eyes darting.
Wow: THE RELAY, one continuous feed, ONE BOT PER VIEWPORT (Dmitry's rule):
the SEO Optimizer's dots become its bubble, the other three typing rows
collapse, its result card expands below ("Website optimization · Done", five
fixes checking in, "Site is ready for ads.", View report / Open site), then
"Messaged ● Creatives". The camera snaps down: only Creatives is in view,
dots → bubble → card with three ads popping in → "Messaged ● Paid Ads
Optimizer". Snap: only Paid Ads, bubble → the real "The Bot wants to run a
task · Approval required" card, the cursor clicks Approve (the only human
action) → Approved → Live. Then GEO speaks and the camera pulls back on the
same feed: more bots keep landing below (Content Writer, Google Ads Manager,
Backlink Exchange, Meta Ads Manager, Email, Shopify Optimizer, Reports,
Landing Pages, Competitor Watch, Reviews…) and eight neighbouring threads
fade in around it: nine straight columns, no tilt, past every edge.
Close: hard cut to a kinetic line on the golden cream ("Your marketing
team. / Now in [bloub] Grok."), then the Ryze lockup with "×" and a big Grok
bloub that blinks twice before the end.

Look: the whole film sits on the app's golden cream (#FDFAF3); the Grok
window floats on it as a mockup (scaled 0.92, rounded, shadowed). The first
bot is "Ryze AI" with one line, "How can I help you with marketing?" — no bot
card. Stage blocks are natural height with a zero-height top anchor the
camera aligns to the viewport top, so the previous bot is never in view and
the wall has no holes. The pull-back is ONE shot (zoom 0.09, a slower
per-shot chase) so the camera is still moving at the cut; fifteen columns of
84 messages keep the frame full at every scale.

Decisions with Dmitry (2026-09-01): no avalanche pile over the interface
(«набросано»); no camera cuts between zoom levels on the dense UI
(«скринкаст, на котором дрыгается камера»); no "Created routine" beat;
results the way Grok shows them: bubble first, card second, approvals as the
task card; native transitions only (a feed the camera walks, never a screen
swap); one bot per viewport; the zoom-out reveals many rows of threads, no
tilt, more bots.

## Camera

App phase: no rig, zoom 1. Stage phase: ONE CameraRig over the whole feed,
its own clock (`Sequence from={STAGE_IN}` around the rig, `from={-STAGE_IN}`
inside so content keeps global time). Each bot's block is `minHeight` 1000
and gets one snap shot on its mount frame (align y 0.5), so the viewport
holds exactly one bot. The SEO block mounts first and the other typing rows
live INSIDE it (collapsing when SEO speaks) so nothing above a camera target
ever changes layout — first-measure-wins stays true. The last shot pulls back
to 0.42 on the GEO block (`bounds={false}`). Cursor targets are DOM ids
(`row.marketing`, `relay.approve`, `tail.add`), never coordinates.

## Bars (frames at 30fps)

| beat                              | from | to  | bars |
| --------------------------------- | ---- | --- | ---- |
| bot in + blinks                   | 0    | 45  | 0.75 |
| tools orbit, eyes track           | 45   | 112 | 1.1  |
| ring swallowed, morph at once     | 112  | 176 | 1.1  |
| four bots + Marketing thread drop | 186  | 248 | 1.0  |
| click thread, composer lifts      | 272  | 302 | 0.5  |
| type, send, morph to bubble       | 298  | 362 | 1.1  |
| four bots typing                  | 364  | 394 | 0.5  |
| SEO block                         | 394  | 478 | 1.4  |
| Creatives block                   | 478  | 556 | 1.3  |
| Paid Ads block + Approve          | 556  | 660 | 1.7  |
| GEO + wall pull-back              | 660  | 800 | 2.3  |
| kinetic hook                      | 842  | 922 | 1.3  |
| lockup, bloub blinks twice        | 922  | 1022| 1.7  |

Total 34s.
