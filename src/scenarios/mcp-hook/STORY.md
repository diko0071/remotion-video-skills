# mcp-hook (replica of Crowdreply "Show up in AI answers" MCP launch, Ryze skin)

Wide 1920x1080, 30fps, 1320 frames = the full 44s of
`references/crowdreply-mcp/source.mp4`. Study replica in Ryze skin: every beat,
camera move and click is measured from the reference (see CLAUDE.md, "The
measured-replica style"); the reference audio is muxed on delivery.

Hook (0-3.2s): "Show up in AI answers" rises word by word; "By just talking to
it" types in oversized while sliding left, smears out, retypes small.
Setup (3.2-7.1s): a black capsule rises from below with y-blur and lands with
an overshoot; OpenAI, Perplexity, Claude, Gemini, G pop in one by one under an
"AI Platforms" chip; three bars are the port. Whip-zoom onto the port, the
cursor grabs, a knob and cable come out, cut to wide, the bars ride the cursor
into a coral MCP pill that pops empty and fills in layers.
Work (7.1-36.7s): icons scatter and fly into a tile column, the pill becomes
the Ryze app icon, "Ryze MCP", strands with pulses; the cursor carries the
Claude tile into Claude's star. Real claude.ai kit at 1.6x: type, whip to the
glowing send button, chat with cards and "Initiating Actions" rows, score
34 -> 71%, camera pushes into the same composer for the second prompt, report
card replaces the pulling line, "Ready to drop in Slack", the document is
carried across a page slide onto the Slack tile, badge, notification card.
Close (36.7-44s): Talk / to your / data. with background inversion and glow,
exit left, Build, Build with it., a pill typing get-ryze.ai/mcp.

## Cut list (reference seconds -> our frames via cl()/at30())

| beat                                          | s            |
| --------------------------------------------- | ------------ |
| line 1 rises / big type slides and smears     | 0.0 - 1.9    |
| line 2 types, lifts out                       | 2.1 - 3.2    |
| capsule rises, icons + chip + bars pop        | 3.24 - 3.6   |
| cursor in, whip-zoom 1.95 -> 1.74 -> 1.61     | 3.92 - 5.2   |
| grab (click 4.97), knob + cable, cut to wide  | 4.97 - 5.56  |
| pill pops, bars land, MCP mark, chip          | 5.84 - 6.4   |
| scatter, cut, tiles, icon, wordmark, strands  | 7.0 - 8.0    |
| push to Claude tile, click (9.93), morph      | 8.88 - 10.9  |
| type (11.8-13.5), whip to send, press 14.73   | 11.7 - 15.3  |
| answer, cards, Initiating rows                | 15.4 - 21.6  |
| score 34 -> 71 (green at 24.34)               | 22.7 - 24.7  |
| push into composer, prompt 2 (click 26.13)    | 25.5 - 28.4  |
| bubble, answer, pulling, report replaces it   | 28.6 - 31.5  |
| doc grab (33.3), slide, drop (34.34), badge   | 33.0 - 34.6  |
| notification card, hold                       | 35.0 - 36.7  |
| Talk / data. / Build / with it. / pill        | 36.75 - 44.0 |

Files: `timings.ts` (scene A/B), `claude-timings.ts` (Claude, Slack, tail),
`curves.ts` (reference samples), `cam.ts` (camera keys with cuts), `blur.tsx`,
`pop.tsx`, `cursor-path.ts`, `capsule.tsx`, `web.tsx`, `scene-claude.tsx`,
`report-card.tsx`, `scene-slack.tsx`, `scene-tail.tsx`, `index.tsx` (rigs,
slide, carry and morph layers).
