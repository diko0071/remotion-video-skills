# what-is-managed — "What is Managed Campaigns?" (explainer, 1 of 3)

Wide 1920x1080, 30fps, 49.9s. Voice River (eleven_v3), script approved by Dmitry on 2026-10-04
(vo.json is that table word for word). First of three "What is X?" explainers: Managed Campaigns,
then SEO, then Paid Ads in the same format.

Replaces managed-campaigns v2, which Dmitry rejected for being cramped, small, pushed to the edges,
and for using a lockup that differs from the rest of the project. That scenario is left untouched.

## Laws
- Dmitry's font and styles: Plus Jakarta Sans and the product tokens (cream #FDFAF3, ink #0f172a,
  brand #C19767, 3px radius, 1.5px option-card borders, `.pg-card`, `.spill`). No launch-kit cards
  with 22px radius and heavy shadows. No characters (stick figures were rejected on 2026-10-04).
- Every object is the product's own markup at 1x (OptionCard, StatusPill, campaign card,
  budget block, select, primary button), shown through a scale wrapper of about 2x. Nothing is
  drawn bigger by hand, so it stays 1:1 with the app.
- One idea per screen: a centred title at the top, one object centred below it, at least 140px from
  the left and right edges. No corner logo.
- Every product string is product copy (content.campaigns.ts, CAMPAIGN_PLATFORM_LABEL,
  CAMPAIGN_GOAL_FRIENDLY, campaignMetaLine, buildCampaignAutoName, campaignBudgetBreakdown).
  Numbers add up: $50/day = $20 + $20 + $10 across three ad sets; pausing the $10 ad set moves
  $10 (20%) to the best one. The fee figures come from the product bracket formula:
  $50 = 5% ($1,517 / $76 a month), $1,000 = 4.9%, $10,000 = 4.57%, $100,000 = 3.7%.
- Hard cuts on VO lines; each scene opens with its title already settling (no empty frame 0).

## Click script
Scene 0, title (00-title). "What is / Managed Campaigns?" settles word by word on the VO marks;
the plate draws under "Managed Campaigns?".

Scene 1, team (01-team + 02-agent).
1. Title "Imagine a team of marketers". On "team", three role cards pop left to right:
   Media buyer / Designer / Analyst, each with its task line.
2. On "set up": the Media buyer card builds its mini tree (Campaign -> 3 ad sets).
3. On "creatives": three creatives pop into the Designer card.
4. On "check ... every day": the Analyst card ticks seven day cells, Mon to Sun.
5. 02-agent starts: the title swaps to "That team, as one AI agent". 8 frames later the side
   cards slide under the centre card with horizontal blur; the agent card (Ryze sun,
   "Managed Campaigns", "One AI agent") replaces the pile at full opacity in one frame.
6. On "is", "one", "AI": the three tasks check in one by one inside the agent card.

Scene 2, step 1 (03-platforms). Title "1 Pick where your ads run".
1. Eight OptionCards (minimal, checkbox) pop in a 2x4 grid: Meta, Google / TikTok, LinkedIn /
   Microsoft, Snapchat / Reddit, OpenAI.
2. On "pick": the cursor clicks Meta's checkbox; it fills, the border goes to emphasis, the card
   opens its account row (the connected ad account select). Only the left column moves down.
3. On "run": the cursor clicks Google's checkbox; same, the right column moves down. The cursor
   then leaves to the right and fades out.
4. On "Meta", "Google", "TikTok", "LinkedIn": that card pulses. On "four more" the last four pulse
   together.

Scene 3, step 2 (04-budget). Title "2 Set a budget and a goal". One card: the budget block, the
goal field and the primary button.
1. Before "budget" the cursor clicks the budget field, a caret blinks after the "$"; on
   "budget" "50" types; the breakdown line appears under it.
2. On "goal": the cursor clicks the goal select; the list opens downward by height with three
   goals (opaque, clear of the frame bottom).
3. On "sales": the cursor clicks "More sales"; the list closes and the trigger shows it.
4. After the line: the cursor clicks "Create campaign". Cut.

Scene 4, steps 3 and 4 (05-build + 06-run), ONE scene with ONE card (scene-campaign.tsx).
The campaign card "Meta & Google | Purchase", meta "$50 / day · Meta, Google · Purchase", pill
Setting up, the setting-up strip. The card is centred on its live height and grows or shrinks
with a spring; its body is clipped under the header, so outgoing content never touches it.
1. Title "3 The agent builds it". On "studies": row "Read 90 days of your ad account history"
   spins, checks on "history". The card grows by one row each time a row appears.
2. On "builds": row "Built the campaign and 3 ad sets" spins, checks on "campaign".
3. On "makes": row "Made 18 ads for your brand" spins; six creatives and a "+12" tile pop under
   it; it checks. The finished card holds for about 0.8s.
4. 06-run starts: title "4 It launches and checks every day" (the Step 4 label stays put through
   the next swap). The build body slides up out of the clip, the card shrinks to the week row.
5. On "launches": the pill flips Setting up -> Live.
2. On "checks ... every day": seven day cells tick Checked in an accelerating run.
3. On "it pauses": the title swaps to "Cuts losers, feeds winners"; the body becomes three ad set
   rows (Broad $20 CPA $12.40, Lookalike 1% $20 CPA $14.80, Retargeting $10 CPA $61.20).
4. On "pauses": Retargeting's switch turns off, its pill goes Paused, the row dims.
5. On "moves budget": a "+$10 / day" chip flies from Retargeting to Broad; Broad ticks $20 -> $30.
6. On "sells": Broad gets "Best CPA".

Scene 6, step 5 (07-fee). Title "5% only on what the agent manages" (Dmitry 2026-10-04: the fee applies ONLY to
campaigns the agent manages, nothing else; VO says so). One card, two halves; on "only" a chip
"Only on managed campaigns · nothing else" pops; the fee sub reads "only on managed campaigns".
1. Left: "$50 / day", "Ad spend, paid to" with the Meta and Google logos. Right: "5%", "Ryze fee".
   Under both: the product breakdown line and fee note.
2. On "pay"/"platforms" the left half washes gold; on "fee"/"five percent" the right half does.
3. Just before "more" the title swaps to "The more you spend, the lower the rate". On "more",
   "spend", "lower" the budget steps $1,000 -> $10,000 -> $100,000 a day and the rate and the
   breakdown line step with it (4.9% -> 4.57% -> 3.7%), each as a clipped vertical roll with
   the width tweened so "/ day" slides along. The final state holds about 1.7s.

Scene 7, close (08-close). The project Lockup on the cream ground: sun, "Ryze AI", tagline
"Start your first managed campaign today" (VO: "That's it. Start your first managed campaign today.", Dmitry 2026-10-04).

## Files
timings.ts (VO marks to frames, scene starts, clicks), theme.ts (product tokens, zoneTop),
data.ts (product copy, fee steps), scene-title / scene-team / scene-platforms / scene-budget /
scene-campaign / scene-fee, ui/ (product primitives at 1x: OptionCard, StatusPill, select,
primary button, setting-up strip, switch, done icon, step title, Zoom), team/, campaign/, fee/.
Creatives: public/managed-campaigns/ads (gitignored).
