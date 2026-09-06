# crowdreply-superagent — "Introducing CrowdReply SuperAgent" (x.com/Crowdreply_io/status/2089729369644417171)

Source: 1280x720 @25fps, 53s, music only. Replicated as `src/scenarios/superagent/`
(Ryze skin: Ryze sun as the app icon, warm orb as the agent avatar, Brightland vs Graza
as the client data). Maps: `map-*.png`.

## Shot map (seconds)

| s           | what happens                                                                                     |
| ----------- | ------------------------------------------------------------------------------------------------ |
| 0.0-1.0     | "What if getting found" types letter by letter (170px Poppins-class), growing from centre         |
| 0.9-2.4     | the line drifts left at constant speed; "in", then "AI" in a coral serif 2x with chromatic pop     |
| 1.8-2.5     | a magnifier rises from below onto "AI"; the line locks with "AI" at x=960                          |
| 2.85-3.65   | inside the glass "AI" swaps: Gemini, Claude, Perplexity, OpenAI tiles                              |
| 3.8-4.2     | the lens drops down-left; the line whips left; "was as simple as asking?" lands centred (124px)     |
| 5.25-6.9    | big card "LLM Visibility Score &" pops (1000x706), counter 0→10%, chip, rank, thick line draws       |
| 5.9-7.3     | "Visibility over time" (two bells) and "Sentiment Distribution" (semicircle gauge 82) pop            |
| 7.5-8.0     | everything scales 0.72 into a browser window; more cards pop (bars, tiles, leaderboard, tables)     |
| 9.0-10.4    | the window tilts in 3D (rotateX 6, rotateY -9)                                                    |
| 10.4-10.8   | whip zoom 2.3x into the top-left; "Top sources citing …" card pops; cursor to the red close        |
| 11.66       | click (audio transient) → white/pink                                                              |
| 11.9-14.3   | "Now / You / Just / Ask" letters in the blob's colour then ink, blob colour per word               |
| 14.25-14.55 | small ↑ button beside "Ask", cursor, click (audio 14.55)                                          |
| 14.97-16.9  | dark; the button becomes a 280px neon-outlined app icon, settles to 150, neon cools                |
| 17.0-17.45  | a dark circle shrinks onto the icon revealing the light scene; icon → orb                          |
| 17.1-19.5   | gradient "Introducing" / "SuperAgent" letters; hold                                               |
| 19.6-20.7   | "How may I help you?" bubble with dashed connector; orb shrinks up; greeting, composer, chips     |
| 21.3-25.2   | push 1.35 onto the composer; cursor click 22.0; typing 22.2-24.9; send                            |
| 25.35-28.3  | thread: question chip top-right, orb + two serif lines stream                                     |
| 28.3-30.6   | scroll; "Three gaps are keeping you invisible:"; 3 cards skeleton → filled one by one             |
| 31.0-32.2   | scroll; "Want me to fix these gaps for you?", "Yess pls", "Initiating Actions ..." (96px serif)     |
| 32.8-35.5   | 4 skeleton rows (gradient bars) → filled with purple checks                                       |
| 35.6-37.3   | push 1.3; "Your visibility is already moving: 15% → 70%" with a glow flash at 70                   |
| 39.3-42.6   | lavender gradient; 3 feature cards fly in (bars, credit card + plus, sparkles)                     |
| 43.0-44.6   | "Your AI visibility" letters                                                                     |
| 44.7-46.35  | prompt chips fly in from every edge; "One prompt away"; the orb appears; slow push 1.35           |
| 46.4-49.3   | dark: pill types get-ryze.ai/agent, letters coral → white, neon border cools                       |
| 49.5-50.3   | white: "Try it free"                                                                              |
| 50.45-53    | brand lockup (kit/lockup)                                                                         |

Audio transients (clicks): 11.66, 14.55, 14.97, 16.05, 21.33, 32.11, 33.82, 34.19.

## Mechanics worth keeping
Typewriter line that drifts and locks under a lens (`type-line.tsx` + `lens.tsx`), dashboard
assembled from popping widgets and scaled into a window with a 3D tilt and a whip zoom
(`dashboard.tsx`, `widgets.tsx`), word-per-blob colour typing, button → neon app icon → orb
with a circular reveal (`scene-intro.tsx`), skeleton → content fills with tinted streaming
text (`scene-chat.tsx`), glass feature cards and prompt chips scattering around an orb
(`scene-end.tsx`).
