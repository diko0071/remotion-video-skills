# introducing-agent (replica of Gumloop "Introducing Gumball", Ryze skin)

Wide 1920x1080, 30fps, 48.6s. Every cut is at the reference second
(`references/gumloop-gumball/BREAKDOWN.md`); no camera moves, hard cuts only,
white ground, Outfit.

Hook (0-2.6s): the Ryze sun with a face fills the frame, blinks happy, shrinks
and bounces off two black blocks down into "introducing Ryze AI" as the mark;
four coloured mini-agents pop onto the letters.
Setup (2.6-5.6s): "your always-on / always-active / marketing agent" rises
line by line with tick, underline and arc strokes.
Work (5.6-15.7s): "every search" (Search Console page, "Reading your search
data", an auto-drafted article panel lands, the hero peeks over it), "every ad
account" (Meta campaign timeline, budget brief), "all the context." (the Daily
Ryze brief with inline integration names and a checklist).
Org (15.7-26.2s): "Ryze manages agents across your entire organization", four
notification chips, a field of grey agents with the hero "Searching…" in a
pill while coloured agents wake up, the cluster with role labels hops,
"today's tasks" fill in with the owning agent.
Reach (26.2-28.4s): ryze@get-ryze.ai, @ryze in Slack, Ryze MCP in Claude,
@ryze in Grok Bot.
Routing (28.4-40.5s): "Ryze routes to the best model for the task" with model
marks inline; a Slack request types into a black pill under the hero, four
models wait, Grok grows into "Routing to Grok 4…", a content-calendar update
routes to GPT-5; the price ladder Opus 5 $4.38 -> GPT-5 $3.17 -> Grok 4 $2.49
-> Gemini Flash $0.48, "bringing your cost per task all the way down".
Skills (40.5-43s): "Ryze has access to all brand knowledge and skills" lifts
and a pile of skill chips lands.
Close (43-48.6s): "all inside your own Slack / Claude / Grok Bot / Gmail"
cycling, "try at get-ryze.ai" types, Ryze AI lockup.

Wow: the agent has a face and it is behind every screen.
New mechanic: `face.tsx` SunFace (the Ryze mark as a CSS mask with blinking,
gazing eyes) + `deco.tsx` coloured strokes that draw next to words.
