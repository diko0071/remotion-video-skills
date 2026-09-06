# Grok Bot references (2026-09-01)

Context: Ryze shipped a Grok Bot connector ("Grok for SEO, GEO, paid ads and
Shopify"). Ira's launch posts: x.com/irabukht/status/2094540040441397439 and
x.com/irabukht/status/2094562614051246430 (36 tools, 7 SEO/GEO providers,
Google/Meta Ads, Ad Library, GSC, Shopify, PostHog, GA, ChatGPT Ads, 16 image
and video models, site edits via Framer/Webflow/WordPress).

## Files
- `ira-post.jpg` — the real "Add to Grok Bot" card (cover cropped into
  `public/grok/card-cover.jpg`).
- `bloub-cercle-neutre-encre.svg` / `bloub-triangle-neutre-encre.svg` — the
  official bot avatar ("bloub") exported from the Grok Bot app: body path +
  two capsule eyes with matrix transforms. Ported into
  `src/kit/grok-ui/bloub-shapes.ts`; the kit `Bloub` adds a rounded-square
  body, colour, gaze and blink.
- `bot-page.png` — full x.ai/bot landing page (Browserbase capture; x.ai is
  behind Cloudflare, curl and headless Chrome are blocked). Their copy: "AI
  teammates that finish the work", "Grok Bot works while you work" (Computer
  panel), "Bots get smarter over time" (routines).
- `grok-bot-mark-*.svg` — the animated `grok-bot-mark` from x.ai with five
  data-states: idle, working, thinking, notifying, searching.
- `cloud-agents-*.webp` — their product shots.
- `roman-gojiberry.mp4` + `roman-strip.png` — the Gojiberry "Sales OS for Grok
  Bot" promo (44s, square). Studied as the COUNTER-example.

## Roman / Gojiberry — what NOT to do
- Opens on a Grok Bot logo with agent icons orbiting, then confetti — the
  only alive beat; everything after is a slide deck.
- Black terminal window with a `>` prompt (terminal aesthetics — banned here).
- "Meet the team" as coloured balls, then a parade of 13 near-identical cards
  each with a badge label, then a bullet list "and they hand work to each
  other", then "…and eight more" chips. No continuous flow, no object carrying
  the story, no product UI.
- Endcard: "Comment BOT → it's yours".

## What we took
- The orbit hook (tools around the bot) — but with the bot's eyes tracking
  the ring, and the ring being swallowed into the bot instead of confetti.
- The real Grok Bot UI (sidebar of bots, chat, computer panel, routines) as a
  ported kit, `src/kit/grok-ui`, sibling of claude-ui and slack-ui.
