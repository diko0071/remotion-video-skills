# o-locked-out — "Locked out" (launch #4 for ChatGPT dots, ryze.ai/gpt)

Wide 1920x1080, 30fps, 24.5s (735 frames), 120 BPM. Dmitry's idea (2026-10-01): a dot tries to
do things and is blocked everywhere, no access; the Ryze dot arrives in the shape of our
ryze-sun mark and smashes through everything. Nothing repeated from the three earlier dots
films, so the grammar is new for the series: a side-view platformer level shot as ONE
continuous take, no cuts at all.

v2 after his review: act one no longer cuts to a new scene after each fail (the momentum
dropped), the sun's closed eyes read as a unibrow (two flat bars too close together), and
the ending is new: after the run the sun lifts the dot into the sky, feeds it integrations
until it is huge, it falls and the end text is behind it. Then: the Meta login was a
stretched narrow card (now a real Meta login card), and the Shopify beat was unclear (now
the dot jumps into the connection ring and gets bounced: "Connection blocked").

## Arc
- Hook (0-1.2s): the lime dot runs at the Meta Ads login and splats on it like a window.
- Problem: it keeps walking and every tool refuses it. The world is grey; only the dot has
  colour.
- Turn: the Ryze sun rises over the level and colour floods out of it in a circle.
- Wow: the two run back through the same level and break every lock, then the sun lifts the
  dot into the sky and shoots integrations into it until it is huge.
- Close: the fat dot falls back onto the level; the landing sends a shockwave and every metric
  grows out of the ground (CPA, ROAS, orders, revenue, "New order" coins); straight away the
  camera flies up into the sky to "Give your dot the keys." / ryze.ai/gpt.

## Laws
- Every block is a real product refusal shown as an object: a Meta Ads login, a disabled
  Google Ads "Apply changes" with "You don't have permission", a Shopify connection ring that
  answers "Connection blocked", a 403 Access Denied stamp.
- Every unlock has a cause on screen: the sun pounds, flies through, stomps, punches.
- Locked = grey (GREY_FILTER, grey palette); unlocked = bright natural colours: sky #5CC2FF,
  grass #45C463, sun #FF9F1C, OK green #1DB954, Meta blue #0866FF, Google blue, red #FF3B30.
- One camera over one world from the first frame to the last.
- The sun is ours: a plush render of the exact ryze-sun silhouette; its eyes sit wide apart
  and it never uses the flat or squint glyphs (they merged into a brow).
- Music never stops in act one; it dips on each fail. Silence only after the stamp.

## Click script
1. 0-34 The dot is already running right. 34 it jumps at the Meta Ads login card and splats
   on it (music dips), slides down the glass, drops at 52, looks up at the padlock badge.
2. 62-120 It hops on to the Google Ads block, stomps at 84, 96, 108; "You don't have
   permission" pops at 98 (dip); it hops off the far side at 120.
3. 120-186 Under the floating Shopify ring ("Connecting to your store..."), it jumps into the
   ring at 150 and is thrown back at 158: the ring flashes red, a red shockwave, "Connection
   blocked" with a cross (dip). It lands dizzy at 172 and walks on under the ring at 186.
4. 186-262 It stops under the hanging 403 stamp, looks up; the stamp slams at 222 and
   flattens it; the stamp lifts, the dot peels up with x x eyes. Music stops at 222.
5. 262-360 The Ryze sun rises behind the hills, eyes closed as arcs; eyes open at 300; colour
   spreads out of it 304-330; it jumps down beside the dot at 340 (shake) and winks.
6. 360 Drop. The sun jumps onto the stamp's handle and drives it into the ground: it shatters
   at 376. Then back left: both dive through the ring at 392-402 (it turns green "Connected"),
   the sun stomps the Apply block at 414 (blue "Applied"), punches the Meta login at 442 (it
   shatters). Each lock sends a "Connected" chip into the tracker, 0/4 -> 4/4.
7. 454-482 The sun grabs the dot and they rocket up; the camera tilts into the sky.
8. 486-542 The sun shoots twelve integration tiles into the dot (Analytics, Shopify, Google
   Ads, Meta, TikTok, Klaviyo, Search Console, LinkedIn, HubSpot, Pinterest, Slack,
   WordPress), faster and faster; every tile makes it 17% bigger with a pop and a ring.
9. 548-568 The huge dot falls; the camera dives with it and lands at 568 (squash, shake, brass
   hit, a white shockwave along the ground). It deflates to a chubby size with a bounce; the
   sun drops in beside it.
10. 568-606 As the wave passes, results grow out of the ground: green bar charts, stat cards on
   stems counting up (CPA -61%, ROAS 4.1x, Orders +312, Revenue +$12,480), "New order" coins.
11. 606-628 The camera flies straight up into the sky: "Give your dot the keys." settles in
   from 614 and the ryze.ai/gpt plate pops at 632. Ryze AI stays in the corner. Music ends
   naturally on the last frame.

## Assets
- `public/plush-dots/sun.png`: scripts/gen-plush-dots.ts (SHAPED.sun), an image edit of
  `references/ryze-sun/silhouette.png` (the ryze-sun mark on white) on gpt-image-2.5-sunburst.
- `public/plush-dots/hero.png`: the lime dot from o-full-stop.
- `public/music/o-locked-out-sneak.mp3`: ElevenLabs music, "comedic sneaky cartoon underscore
  ... pizzicato strings, bouncy tuba, muted trumpet, woodblock, 120 BPM", -15 LUFS.
- `public/music/o-locked-out-rise.mp3`: ElevenLabs music, "warm cinematic sunrise swell ...
  strings and french horns into a bright major chord", window 1.3-4.7s, -16 LUFS.
- `public/music/o-locked-out-run.mp3`: ElevenLabs music, "energetic funk breakbeat ... slap
  bass, wah guitar, horn riff, 120 BPM", from 2.09s (a bar start) so its own ending lands on the
  last frame, -13 LUFS. The stinger plays on the drop (360) and on the landing (568).
- `public/music/o-locked-out-hit.mp3`: ElevenLabs music, "ending stinger ... one huge
  triumphant brass section and drum hit", first 2s, fade out, -13 LUFS.
- Audio lives in the composition (`soundtrack.tsx`): render with `bun run video -- o-locked-out`.
