# what-is-paid-ads — "What is Ryze for Paid Ads?" (explainer, 3 of 3)

Wide 1920x1080, 30fps, 1:10. Voice River (eleven_v3), vo.json. Same format as what-is-managed and
what-is-seo (kit/explainer + kit/product-ui, Plus Jakarta, product tokens, no characters).
Scope from Dmitry, 2026-10-04: Creatives / Competitor Ads / Schedules / Reports / Custom Dashboards.
Sample store: Ember & Oak candles, the brand the ported paid-ads pages in kit/ryze-ui already use.

## Laws
- Every object is a kit/ryze-ui product component at 1x inside `Zoom` (1.1x to 1.8x): ApprovalCard,
  CreativeTile, CompetitorChips + CompetitorAdCard, report slides (CoverSlide, RevenueSlide,
  AcquisitionSlide), KpiRow + ComboChart.
- Every object clears the frame bottom (content ends at or above y 1030). The competitor cards and the
  dashboard were cut at the bottom edge in the first pass.
- The first content element of each scene is on screen by frame ~10. Anything waiting for its VO word
  stands as a skeleton (kit/product-ui Skeleton) or a generating tile, never as an empty card.
- Competitor ads come only from the tracked brands in the chips, and their images show no other brand.
- Every button press has the kit cursor, its target measured from a render (Send via Email at
  1072,766; Refresh data at 1335,412), and the result appears only after the click.

## Click script
0. Title: "What is Ryze for / Paid Ads?", plate under "Paid Ads?".
1. "An AI media buyer on your accounts": the agent card, three rows (Google Ads, Meta Ads, TikTok Ads)
   pop at frames 2/6/10; each row washes gold as its platform is named. On "watches" the
   "Watching 24/7" pill shows and 24 hour cells per row fill green through "clock". Title becomes
   "Every fix comes to you as an approval"; the product ApprovalCard pops under the card on "approval".
2. Step 1 "Creatives on request": the prompt bubble at frame 2, a generating CreativeTile at 8, the meta
   card with skeleton values at 10. The tile completes after "makes"; Hook / Type / Size fill on their
   words. Then "Or start from a winning ad": a winning candle ad, an arrow, and "Your version" generating
   and completing on "yours".
3. Step 2 "See every ad your competitors run": tracked-brand chips at 2, platform tiles (Google, Meta,
   LinkedIn) at 6/8/10 glowing on their words, four ad cards at 10+, each with "Running N days".
   On "sort" the chip reads "Sort: Running longest", the title becomes "See what actually works" and the
   row crossfades to the longest-running ads (green badges). Title "Know when they launch something
   new": a Ryze new-ad alert card slides in, the alerted brand's bell turns on.
4. Step 3 "Tasks that run on their own": Instructions card at 2, the weekly digest instructions type from
   frame 12; Repeats card at 8. The task name highlights on "check"; Repeats steps Daily, Weekly,
   Monthly on the words and settles on Weekly. Title "Results in a new chat, and an email": Recent runs
   pop as Done; on "email" each run reads "Chat · emailed".
5. Step 4 "Reports from your live data": the prompt bubble at 2, three slide skeletons at 10/13/16
   that fill one by one between "report" and "deck". Download PDF / Send via Email appear; the cursor
   comes in and clicks Send via Email, then the To row opens, team@ember-and-oak.com types, and only
   after the address is complete the row's Send reads "Sent ✓".
6. Step 5 "Custom dashboards, live": the prompt bubble at 2, the dashboard card at 8 with four KPI
   skeletons and an empty plot. On "builds" the KPIs fill left to right and the chart sweeps in
   through "dashboard". On "refresh" the cursor clicks Refresh data, "Updated just now", the card pulses gold.
7. Close: the project Lockup, tagline "Make every ad dollar count. Start today."

## Files
timings.ts (VO marks, scene starts, clicks), data.ts (kit data picks), scene-title / scene-agent /
scene-creatives / scene-competitors / scene-schedules / scene-reports / scene-dashboards, index.tsx.
