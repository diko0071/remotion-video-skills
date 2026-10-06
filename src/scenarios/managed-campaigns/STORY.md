# managed-campaigns — "What is Managed Campaigns?" (explainer)

Wide 1920x1080, 30fps, 40.8s. Voiced explainer (River, eleven_v3, vo.json). v1 (a dynamic promo
with a mascot and a creative wall) was rejected by Dmitry on 2026-10-03: «ты рекламу сделал а не
объяснение», «всё слиплось: панель, текст». This version explains how the feature works, one idea
per screen, with air between the step title and the object.

## Arc
- Full screen: "What is Managed Campaigns?"
- Answer: "An AI media buyer that runs your ads for you." with the eight platform logos, then
  "How it works": four step cards.
- 1. You set the goal: the create form (budget per day with the fee line, platforms, goal),
  the cursor clicks Create campaign.
- 2. The agent sets it up: one campaign card, status "Setting up", progress rows check in one by
  one (tracking, 90 days of history, campaign and 3 ad sets, 18 ads with thumbnails).
- 3. It launches on its own: status flips to Live, the ad toggles switch on.
- 4. It keeps optimizing: KPI row, Progress entries (checked results, paused 2 ads, moved $4/day),
  "Next check · Thursday".
- It asks when it needs you: "Needs your input", the question, the typed answer, Send answer,
  back to Live.
- End: "Managed Campaigns." with the four steps checked, then "Your marketer, on autopilot."
  and get-ryze.ai.

## Laws
- One idea per screen. Step title top-left, one object centred below it with at least 100px of air.
- No mascot, no tracker panel next to the logo, no zoom on the stage.
- Every on-screen string about the product is the product's copy (content.campaigns.ts) or a
  number that adds up with the others ($50/day x 3 days = $142, 10 sales, $14.20 per sale).
- Voice and screen agree with the agents' prompts: 8 platforms, the agent sets its own check
  schedule, pauses losers, moves up to ~20% of budget per review, asks only for what no tool knows.

## Files
timings.ts (VO marks to frames), scene-intro.tsx (title, answer, How it works, recap),
scene-form.tsx (step 1), campaign-card.tsx + body-setup / body-review / body-ask (steps 2-4 and
the question), parts.tsx (icons, caret, cursor path). Creatives: public/managed-campaigns/ads
(gitignored), scripts/gen-managed-creatives.ts.
