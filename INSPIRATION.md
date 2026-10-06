# Inspiration — demo videos worth stealing from

Outside product videos Dmitry likes. Not our work — the bar we measure against.

When he drops a link ("смотри как у них"), it goes here: download it into
`references/<slug>/`, break it down beat by beat, and write down the ONE
mechanic worth taking. Read this file before planning a new video.

Entry format: link · who · what happens · what to steal.

---

## Gumloop — "Introducing Gumball"
https://x.com/MaxBrodeurUrbas/status/2098084379474251777
Downloaded: `references/gumloop-gumball/` (46s, 3840x2160), cut list in its BREAKDOWN.md.

**What happens**
- A purple blob with eyes fills the frame, blinks, shrinks, bounces off two
  black blocks and lands as a letter in "introducing Gumball".
- Short claims rise line by line with tiny coloured strokes (tick, arc,
  underline) drawn after the words land.
- Light app windows (email, calendar, a daily brief) with a dark result panel
  sliding up; the mascot peeks over the panel edge.
- A field of grey agents, "Searching..." in a big pill, coloured agents wake
  up, cluster with rotated role labels, a task list filled in by agents.
- Model routing: a Slack request in a black pill, four model marks, one grows
  into "Routing to ...", then a price ladder down to $0.48.
- Skill chips pile, cloud logos cycle, "try at gumloop.com" types.

**What to steal**
- A face for the agent that is behind every screen, top edge only.
- Coloured strokes as punctuation for headlines.
- Routing and pricing shown as typography, no charts.
- Replica: `src/scenarios/introducing-agent/`.

## Mintlify — "200,000+ libraries via one endpoint"
https://x.com/mintlify/status/2086971724831354992
Downloaded: `references/mintlify-mcp/` (39s, 1280x720)

**What happens**
- Opens on a field of soft green dots raining down like confetti/particles —
  pure texture, no UI, and the claim "200,000+ organizations" sits inside it.
- The dots resolve into a constellation of REAL customer logos (Anthropic,
  Notion, Spotify, HubSpot, Microsoft, Cursor) orbiting the Mintlify mark.
- A tiny dark coding-agent window appears mid-frame, someone types "Our
  enterprise customers are asking…", and a single green line drops from it to
  a chip labelled "Index MCP".
- That line branches into a small tree: "Wider web" / "Mintlify hosted docs",
  and doc panels unfold on the right.
- Benchmarks type in as plain rows: "48% Faster plan generation time" with a
  green bar filling, then "Blind judge preference — 96/150 tasks" as a segmented
  bar. Numbers count up as the bars fill.
- Ends on the wordmark, a "preview release" pill, and the bare URL typing out.

**What to steal**
- **The whole film is ONE continuous zoom-out on a diagram.** No scenes — the
  camera keeps pulling back and the diagram keeps growing branches. Our
  strand-web and radar are the same instinct; this proves it can carry a full
  video, not just one beat.
- **The particle field as an opener** — texture before any interface, with the
  headline living inside the texture.
- **Benchmarks as typography, not charts**: number + label + a thin bar that
  fills. Cheap, legible, credible. Directly usable for our score/ROAS moments.
- **The agent window is tiny.** They do not show the whole IDE — just a
  postage-stamp terminal that establishes "an agent asked", then the diagram
  takes over. We keep making the UI the hero when the RESULT should be.
- **Endcard is bare**: wordmark, pill, URL typing. No CTA button.

## ElevenLabs — "Turn your chat agent into a voice agent"
https://x.com/ElevenLabsDevs/status/2057919237566407063
Downloaded: `references/elevenlabs-voice/` (54s, 1620 frames @30fps)
Dense strips: `d1.png` `d2.png` `d320.png` `d480.png` `d640.png` `d800.png`
`d960.png` `d1120.png` `d1280.png` `d1440.png` (every 8th frame, 20 per sheet)

**Beat sheet, by frame**

- **0-40 — logo assembles.** Two vertical bars fade up on warm off-white, then
  the wordmark writes itself letter by letter LEFT TO RIGHT: "IIenLabs" ->
  "IElevenLabs" -> "IIElevenLabs". No fade — letters arrive.
- **40-90 — the wordmark is REPLACED in place.** "ElevenLabs" slides out to the
  right while "Speech Engine" slides in through the same slot, mid-word
  ("Speech En|Ilbs"). One typographic line does two jobs; no cut.
- **90-140 — the customer speaks.** Huge type types a real sentence: "I need to
  resc|" — full width of the frame, caret visible. Then the same sentence
  SHRINKS into a small chat input at the top of the frame, still typing:
  "I need to reschedule my delivery - can you move it to Thursday?" The claim
  becomes UI.
- **140-190 — the toggle.** Under the input, a pill labelled "Speech Engine"
  with a switch. It flips. A round call button appears beside the input.
- **190-215 — the world inverts.** Background goes from off-white to near-black
  in one beat; the input card stays, now on black. Palette flip = the cut.
- **215-250 — birth of the sphere.** A small matte grey sphere drops in at the
  top-left, the input card slides under it, the card stretches into a bar and
  dissolves; the sphere grows to centre frame. The sentence has become an agent.
- **250-330 — the sphere listens.** Sphere sits centred, big, lit from top-left.
  Under it, TINY type replays the user line word by word: "I need" -> "I need to
  reschedule my" -> full sentence. The object is huge; the text is a whisper.
- **330-400 — the sphere answers.** The surface DEFORMS while speaking: dents
  and ripples travel across it, a soft halo blooms behind. Reply prints below in
  a small dark pill: "Done - I've moved it to Thursday between 2 and 4pm.
  You'll get a confirmation text shortly." — typed, not faded.
- **400-500 — decomposition.** The sphere shrinks upward; a dark plate slides in
  beneath it, and the plate SPLITS into stacked capsules that print one by one:
  Speech to Text, Turn Taking, Voice Activity Detection, Text to Speech,
  Interruption Detection. The sphere is now the size of a coin above them.
- **500-660 — the parts rearrange.** The capsule stack re-lays itself into a
  small dependency diagram (Speech to Text on top, Voice Activity Detection and
  Turn Taking side by side, Interruption Detection at the bottom), then folds
  back: cards collapse into one dark card and the sphere lands on top of it.
- **660-760 — travel to another world.** Cut to a soft grey cloth/smoke
  landscape, deep depth of field. The dark card with the sphere floats in it,
  labelled "Speech Engine" underneath. A thin line grows to the right and a
  second card arrives: "Your agent" with a small colour mark.
- **760-900 — the agent's anatomy.** The scene lightens back to off-white. Under
  "Your agent" panels stack in: System prompt / Knowledge base / RAG -> LLM ->
  Workflows and Routing. Then a second column: Integrations -> CRM, Ticketing,
  Billing, "Any system, API or webhook". Everything is grey-on-grey; no colour
  except the tiny agent mark.
- **900-1060 — the multilingual swarm.** The panels wipe and a single line
  "Thanks for reaching out." types centre-frame. Then it MULTIPLIES: dozens of
  pill-shaped phrases in Korean, Arabic, Greek, Polish, Vietnamese, Ukrainian,
  Italian, Portuguese fill the whole frame at different sizes.
- **1060-1120 — the sphere travels.** A tiny sphere rolls in from the left along
  a thin line that undulates like a waveform, dragging the frame with it, while
  "Industry-leading transcription" sits on the line.
- **1120-1300 — orbits.** The sphere settles centre, a thin circle draws around
  it, and feature labels dock onto the ring one at a time: "Natural
  turn-talking" (upper left), "Voice detection" (lower right), "Interruption
  handling" (left). Ring, then label, then label — never all at once.
- **1300-1400 — Secured.** The sphere darkens to near-black, a rounded-square
  outline draws around it, and the word "Secured" is set ACROSS the sphere in
  light type — the object becomes the claim.
- **1400-1620 — endcard.** Sphere shrinks away. "IIEleven API" writes on, is
  replaced in place by "IIElevenLabs" (same slot trick as the opening), and the
  bare URL "elevenlabs.io/speech-engine" fades in below. Hold. No button.

**What to steal**

1. **One object carries the whole film.** The sphere is born from the user's
   sentence at ~250 and is still on screen at 1400. It listens, speaks,
   decomposes into its own features, reassembles, travels between worlds, and
   finally becomes the security claim. Our films change metaphor every scene.
2. **Text becomes object.** The claim is typed huge, then shrinks into real UI,
   then collapses into the sphere. Three states of the same content, no cuts.
3. **Word replacement in one slot.** "ElevenLabs" -> "Speech Engine" and
   "IIEleven API" -> "IIElevenLabs" swap through the same position mid-word.
   Cheap, elegant, and it makes two lines feel like one continuous thought.
4. **Palette flip instead of a cut.** Off-white -> black -> grey cloth ->
   off-white. Each world change is a scene break without a transition.
5. **Features as capsules that fly out of the object and back into it** — and
   in between they rearrange into a real dependency diagram. Far better than a
   bulleted card. Directly stealable for "what the agent does" beats.
6. **Huge object, whisper type.** The sphere owns 40% of the frame; the dialogue
   under it is tiny. We do the opposite and it makes our frames feel like slides.
7. **Scale as a swarm of real artefacts** — dozens of real translated phrases,
   not "50+ languages" as text. Same lesson as our creative wall.
8. **Labels dock onto an orbit one at a time**, each with its own line drawn
   first. Sequencing makes three labels feel like a system.
9. **Endcard is bare**: wordmark, URL, hold. No CTA, no button, no tagline.

## Conduit — "Hospitality is changing"
https://x.com/markknd/status/2063356460822880391
Downloaded: `references/conduit-launch/`

**What happens (first 4.5s)**
- 0.0-0.5s — one small hotel photo in the centre of a white frame, growing.
- 0.5-2s — more photos stack behind it, the deck flips fast, a new hotel every
  few frames. The claim is laid out around them: "Hospitality" left,
  "is changing" right. **The text stands still; the world moves between it.**
- 2-2.5s — the last photo blows up to full frame and goes soft, becoming the
  background.
- 2.5-4.5s — on that background, a swarm of real guest messages ("Early checkin
  available?", "Heater isn't working") while "Travellers expect instant
  responses" types on word by word.
- 4.5s — the camera flies INTO the text, blurs, and the blur becomes the
  founder on camera.

**What to steal**
- **The inversion**: a still claim over moving proof. Ours animate word by word
  on an empty background, which reads as subtitles.
- **The portal**: one object from phase one grows until it stops being an object
  and becomes the ENVIRONMENT of phase two. Recursive — you can nest it.
- **Two beats before the product**: world ("the industry is changing") then pain
  ("guests expect instant answers"). Their product is not named once in the hook.
- **Zones never overlap**: photos live in the upper band, text on its own line
  below. Clean because it is zoned, not because it is sparse.

## Browserbase — "Your agents suck when using the web"
https://x.com/pk_iv/status/2041518621290266632
Downloaded: `references/browserbase-launch/`

**What to steal**
- **Pixel-art opener**: the claim types onto a lo-fi pixel landscape, then the
  film cuts to the ordinary background. A texture nobody else in SaaS uses,
  so the first second is instantly theirs.
- Opening on a problem stated bluntly ("85% of the web has no API") rather than
  on a product name.

## NYC Mayor x US Open — ball-becomes-the-endcard outro
https://www.instagram.com/reel/DceitoCxn51/
Downloaded: `references/ball-outro/` (17s, 1080x1920)

**What happens (outro, 12.3s-17s)**
- The mayor tosses a tennis ball; it flies INTO the camera — one macro-blurred
  frame of the ball — and the next frame the whole screen IS the ball's lime
  color. The object becomes the background (matter continuity, reversed:
  object carries the outro, not the intro).
- On the lime field a URL types out character by character
  ("USopen.org/NYCtickets", ~2.3s, regular weight, dark ink).
- When typing completes, the font weight JUMPS to bold — same size, same
  position, weight only.
- One-frame hard color inversion: lime -> cobalt blue, ink -> white. Same
  text, same spot.
- The partner logo drops in under the URL. Fade to black.

**What to steal**
The whole chain as our promo endcard: Ryze sun flies into camera -> screen
floods brand gold -> "get-ryze.ai" types out -> weight jump to bold -> hard
invert into dark INK with cream text -> Ryze AI lockup. Every step is
deterministic and kit-able; the weight-jump and one-frame inversion are the
two beats that make it feel expensive.

## Grok Bot — "now available on Android" (dive into the lockscreen)
https://x.com/bot/status/2095168633559462197
Downloaded: `references/bot-effect/` (10s, 1920x1080) — full shot map in
`references/bot-effect/BREAKDOWN.md`; replica: `src/scenarios/bot-effect/`.

**What happens**
- A Pixel lockscreen sits on white (green fluid wallpaper, 9:30, two
  notifications: Grok Bot on top, a Slack message from Benji below).
- The camera DIVES INTO THE SCREEN: zoom 1.5x while the screen's clip opens to
  the whole frame in two frames — the wallpaper becomes the stage. Inside,
  the Grok notification is not there yet; only Benji's card.
- The Grok Bot notification slides in from above and pushes Benji down a slot.
- The camera pulls back out; the clip shrinks with a lag (the green peels off
  the white), and the phone lands exactly on its opening framing.
- Cut to white: "Grok Bot is now available on Android" builds word by word,
  in place, an Android head pops above the last word.
- Cut: the black Grok mark pops in the centre, shrinks, slides left, and the
  wordmark pops in two words.

**What to steal**
- **Dive-into-the-screen.** One camera move makes a product still a world and
  brings it back; the UI element becomes the actor at 1.5x. No cut, no morph,
  the phone never leaves. Any of our surfaces can host it (app notification,
  Slack, Grok thread).
- **Remove-then-arrive**: the thing the video is about is absent at the dive
  and ARRIVES while we are inside, pushing the layout — the event is the film.
- **Clip lag on the way out** is what makes the return feel physical.
- **Two crisp typographic beats**: words in place (no slide), then a mark-first
  endcard (pop, shrink, slide left, wordmark pops).

## Shipper — "Introducing Claude for business-building" (the dithered texture film)
https://x.com/shipper_now/status/2094890201009275371
Downloaded: `references/shipper-2/` (16s, 1280x720) — shot map in
`references/shipper-2/BREAKDOWN.md`.

**What happens**
- "Introducing" resolves out of scrambled glyphs; a Claude chip pops in; "for"
  plus a vertical orange word roller (Design, Marketing, SaaS, Retail…).
- A pixel-corruption wipe (grey macroblocks) eats the frame; cut to "SaaS"
  split around a meme clip.
- A composer on a POSTERIZED FLUID (blurred noise quantised to bands with a
  halftone lattice); the prompt types, the camera pushes into the green send
  arrow, click.
- A feature chain: green line, check nodes, a screenshot card under each
  (interface, analytics, back-end, media, login, payments); the camera walks
  it over an ASCII/halftone dither field with green glows.
- Crowd footage payoff, then a serif "Shipper" endcard with a glitch.

**What to steal**
- **One texture engine, three skins.** Everything that looks expensive here is
  a single generator: animated noise → posterize → dither lattice (dots /
  ASCII / blocks) → palette. Build it once as a kit block and the clean UI on
  top reads premium in every film after.
- **Word roller** for audiences, **glyph scramble** for titles/endcards,
  **push-into-the-send-button** as the way out of a composer scene,
  **line-and-nodes chain** for feature tours.
- Footage moments (meme mid-film, crowd at the end) are what make it feel
  human; ours would need our own clips.

## Gemini Enterprise — "Introducing", the gradient becomes the mark
https://lnkd.in/p/dMyzNnP9
Downloaded: `references/lnkd-dMyzNnP9/` (43s) — shot map in
`references/lnkd-dMyzNnP9/BREAKDOWN.md`; kit: gradient-field, sweep-title,
mark-reveal; lab `kit-lab-gemini`.

**What happens**
- A blurred colour field drifts full-bleed. "Introducing", bigger than the
  frame, sweeps in from the right, holds a second, sweeps out left.
- The field turns into the Gemini star: a huge masked shape shrinks to a
  small mark while the ground goes white; the wordmark fades in beside it.
- "now purpose built for / your industry" settles, second line in accent.
- Later: the Plugins click, a word roller (Agents / Skills / Connectors) on
  blue, and a logo wall.

**What to steal**
- The oversized sweep title as an opener, and the gradient-becomes-the-mark
  reveal: matter continuous from texture to logo, no cut.

## Crowdreply — "Show up in AI answers" MCP launch (x.com/Crowdreply_io/status/2096285134186279113)
By Crowdreply, 44s. Capsule-with-port drag into an MCP pill, icons carried into
a tile column, tile-to-Claude morph, whip-zooms on every click, a document
carried across a page slide into Slack, text endcard that never stops moving.
Replicated 1:1 in `src/scenarios/mcp-hook/`; breakdown in
`references/crowdreply-mcp/`; the rules it produced are the CLAUDE.md section
"The measured-replica style". Dmitry: the first video that came out truly
dynamic — a house style from now on.

## Crowdreply — "Introducing SuperAgent" (x.com/Crowdreply_io/status/2089729369644417171)
By Crowdreply, 53s. Typewriter line under a magnifier, dashboard assembling into a tilted
window with a whip zoom, colour-typed words, a button that becomes a neon app icon and
then the agent orb, chat with skeleton-to-content fills and a glowing score, feature
cards and prompt chips scattering around the orb. Replicated as `src/scenarios/superagent/`.

## Meta Muse — first TV ad
https://x.com/alexandr_wang/status/2101500560050684401
Downloaded: `references/muse-ad/` (30s, 1280x720), beat sheet in BREAKDOWN.md.

**What happens**
- A woman cooks and hosts a dinner party; a tiny chip in the corner does her
  life admin: "7 new school emails, I'll sort what's most important",
  "Registering for fall sports" -> check "Registered", carpool to calendar,
  school supplies ordered. Then friends, drinks, "Introducing Muse — AI that
  hustles for you", pull-back through the window, "The future is for everyone."

**What to steal**
- Chip grammar: present-tense "Doing X" + small card -> blue check + past
  tense. One task every ~3s over continuous footage.
- The human is the hero; the agent stays a corner chip. Payoff = a life.

## Aside launch — jun (@hyojun_at), 2026

https://x.com/hyojun_at/status/2069497198879048131 — 87s, no VO, 1.7M views. Problem-comedy of incumbent AI apps (icons into the trash, "Connect App" avalanche, refusals peeled off), light-curtain reveal of the name, one long real task told as typography (prompt → tool lines → subagents → "$120 refund" → "how did you just do that?"), benchmark bars as proof, word slot machine for breadth, privacy beat, BYO-subscription close. Breakdown: `references/opus5-marketing/BREAKDOWN.md`. Taken for: "Opus 5 for Marketing".

## Outside creator for Ryze — "Introducing Muse for Marketing" and "Sell something agents want"
https://x.com/irabukht/status/2102158706041659578 · https://x.com/irabukht/status/2104653158639395139
Downloaded: `references/creator-muse-marketing/`, `references/creator-agents-checkout/`, beat lists in their BREAKDOWN.md.

**What happens**
- White ground, black ink, one blue accent, a bold grotesk at huge sizes; the Muse clay
  mascot is the actor and reacts (celebrates, sulks, points at the CTA).
- Every product moment is a floating UI object at 2-3x zoom: a pill that types and gets
  clicked, a chip that says "connected", a card with Deny / Allow, check rows that
  resolve. No app window, no chrome.
- One object carries each transition ("+" becomes the Connect pill, the photo becomes a
  card, the question mark drops a line into the checklist).
- Proof is counters and resolving statuses: 5 → 11 → 75+ tools connected, 0% → 50%,
  Checking.. → Blocked → Agent-ready.
- Short kinetic claims between work beats (Ask. Analyze. Make changes. / No freelancers.
  No agencies.), accent word blue; ends on headline + URL pill + small lockup.

**What to steal**
- The whole grammar, for any "X now connects to your marketing" launch: title with a
  "+" → partner cycler → Connect pill typed and clicked → ring of tools with a counter →
  one chat task with an approval → 24/7 notification stack → claim → CTA pill.

## Wabi — "Introducing Wabi 2.0"
https://x.com/wabi/status/2104721766690222087
Downloaded: `references/wabi-2/` (80s, 4K), beat list in its BREAKDOWN.md.

**What happens**
- Calm and premium: white ground, small regular grotesk, words appear one by one from grey
  to ink; a liquid-sphere brand world opens the film and the logo is born from it at the end.
- Every capability is a small human story with a number: the agent writes first ("Your
  Comcast bill went up $41 a month. Want me to try to renegotiate it?"), the human answers
  "yes please", the agent reports "Done. Saving you $492 a year."
- Content first, container after: chat bubbles float on white, and the phone frame only
  fades in around them once the moment has been read.
- "Life admin?" splits and emoji squeeze between its letters, then "Handled." appends.

**What to steal**
- The proactive message + "yes please" + result-with-a-number beat for any agent product.
- Word-level tricks: objects squeezed into a word, keep-the-first-word swaps.

## Grok Bot — "Introducing Team Bots"
https://x.com/bot/status/2104661562715967548
Downloaded: `references/bot-2104661562715967548/`, beat table in its BREAKDOWN.md.

**What happens**
- A single "+ Create new Team Bot" row at huge zoom gets clicked; the new bot says hi.
- Three roles, three colour worlds (peach, lavender, mint): a dark bubble with the task in
  the team's words, and a collage of that role's real artefacts (connectors marked Added,
  docs, PRs, sheets, notifications) pops in around it, then drops away.
- "Grok Bot is working" → "Rolodex is live for your team" card with Copy link / Add to Slack.
- "Bring your Team Bots into Slack", then three @mention questions answered with one
  concrete fact each, in the role colours. The bloub shrinks into the wordmark.

**What to steal**
- The anchor-plus-collage world: one message in the middle, the evidence of real work
  assembling around it, a colour per chapter.
- Answers that carry a name, a number or a ticket id, never a sentence about value.

