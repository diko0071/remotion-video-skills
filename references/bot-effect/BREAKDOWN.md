# Grok Bot — "now available on Android" (x.com/bot, 2026-09-02)

Source: https://x.com/bot/status/2095168633559462197
`source.mp4` (10s, 1920x1080, 30fps). Frames measured at 30fps with a
light-pixel mask (cards) and a green mask (phone / wallpaper bounds).

## Shot map (frames at 30fps)

| frames  | what happens |
| ------- | ------------ |
| 0-16    | Pixel lockscreen on white: green fluid wallpaper, "Starlink", 9:30, "Tues Sep 1", "Good morning, Luke", two notifications (Grok Bot 1m on top, Benji Taylor 3m below). Phone x 544-1376, top 108, cut by the frame bottom, soft shadow. Cards x 584-1333, h 171, at y 636 and 822. |
| 17-34   | THE DIVE. The camera zooms 1 -> 1.51 (expo-out) with focus at world (958, 721) = the top card slot. The phone's clip opens to the whole frame in two frames (16 -> 18): the wallpaper becomes the stage. Inside, the Grok card does not exist yet: Benji sits alone in the top slot. |
| 33-54   | The Grok Bot notification drops in from above almost instantly (in place by ~f36, expo-out over ~6f) BEHIND Benji, and Benji is pushed down one slot (186 world px) with a lag (expo-out ~22f from f34, 74% at f38). The camera does not move. |
| 54-60   | Hold. |
| 60-94   | PULL-BACK. Zoom 1.51 -> 1 (cubic in-out, 60-92). The clip shrinks back to the phone with a lag: world left edge 0 @68, 308 @72, 446 @76, 493 @80, 517 @88, 534 @96, 544 @112. The phone lands exactly where it started (same 544/108, same cards at 636/822). |
| 94-156  | Phone holds, static. |
| 157-232 | Hard cut to white. "Grok Bot is now available on Android" builds word by word at its final position (Inter-like, ~92px, centred, x 247-1673): Grok 157, Bot 163, is 169, now 173, available 177, on 183, Android 187; the green Android head pops above "Android" at 189. Words appear crisp, no slide. |
| 232-253 | Hard cut to white. The black Grok Bot mark (eyes read as a specular highlight) pops in at the centre (982, 536) to 205px over ~8 frames, holds. |
| 253-266 | The mark shrinks to ~96px while sliding left to x 709. |
| 266-300 | "Grok" pops at 266, "Bot" at 270 (Inter semibold ~124px), lockup holds to the end. |

## Why it lands

- **The screen is the stage.** One camera move turns a product still into a
  world: dive into the lockscreen, the wallpaper fills the frame, the UI
  element (a notification) becomes the actor, then the camera returns and
  the still is a still again. No cut, no morph; the viewer never loses the
  phone.
- **The event happens INSIDE the zoom.** The Grok card is removed before the
  dive and arrives while zoomed in, so the arrival is seen at 1.5x and
  pushes the neighbour down: the notification IS the story.
- **Symmetry.** The pull-back lands on the exact opening framing (measured:
  identical bounds), so the film reads as one breath in, one breath out.
- **Clip lag on the way out.** The wallpaper edge shrinks slower than the
  zoom, so the green "peels" off the white ground instead of snapping.
- **Two typographic beats, both crisp.** Words appear in place with no
  slide; the mascot mark does the only motion of the endcard (pop, shrink,
  slide left, wordmark pops in two words).

## What to steal

1. **Dive-into-the-screen** as a kit primitive: a device still whose screen
   clip opens to the full frame under an expo-out zoom, an event plays at
   1.5x, cubic in-out pull-back, clip closes with lag. Works for any of our
   surfaces (Ryze app notification, Slack, Grok thread).
2. **Remove-then-arrive**: whatever the video is about is absent when the
   camera dives and arrives while we watch, pushing the layout.
3. **Word-in-place headline**: no slide, no blur, 4-6 frame cadence, one
   inline icon pops over the last word.
4. **Mark-first endcard**: mark pops centre, shrinks and slides left,
   wordmark words pop after it.

Replica: `src/scenarios/bot-effect/`, composition `bot-effect`.
