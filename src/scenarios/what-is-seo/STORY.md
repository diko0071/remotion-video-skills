# what-is-seo — "What is Ryze SEO?" (explainer, 2 of 3)

Wide 1920x1080, 30fps, 1:43. Voice River (eleven_v3), vo.json is the script Dmitry approved on
2026-10-04, with his two notes: SEO = a healthy website + relevant content on keywords you can
rank for, keep it up for three months; and the close says "Start today", not "now available".
Same format as what-is-managed (kit/explainer + kit/product-ui). Sample store: Ember & Oak
(ember-and-oak.com), the candle brand every ported SEO page in kit/ryze-ui already uses.

## Laws
- Every object is a kit/ryze-ui product component at 1x, scaled about 2x: IntegrationCard,
  AuditScoreRing + AuditIssuePill + CheckBox, KeywordsTableHead + KeywordRow, PromptRow,
  CalendarHead + CalendarEventCard. Product components get their natural width: 2026-10-04
  Dmitry caught the GSC card wrapping its Connected pill (button out of the card), dates wrapping
  in a squeezed prompt grid, and a hand-measured column highlight that missed the table.
- A highlight over a grid is the same grid (ColumnOverlay reuses `.gq-krow`), never coordinates.
- No per-row scale bumps on tables: rows of different scale read as misaligned columns.

## Click script
0. Title: "What is / Ryze SEO?", plate under "Ryze SEO?".
1. "SEO comes down to three things" (Dmitry, round 2: site, content, backlinks). On "three"
   three cards pop: A healthy website, Relevant content, Backlinks. The health ring counts to 94
   on "healthy"; three articles with keyword + KD pop on "relevant"; three linking sites with DR
   pop on "backlinks". On "Ryze" the title becomes "Ryze does all three", a Ryze pill pops, the
   cards tick on "does", "all", "three".
2. Step 1 "Connect your site": Shopify and Google Search Console cards. The cursor clicks Connect
   on "website" and on "console"; each flips to Connected / View. Cursor fades out.
3. Step 2 "Ryze audits your site every week": Technical Audit card, ring scans to 62; "Top 300
   pages · checked every week" on "hundred"; five issues pop as they are named (broken links,
   page speed, titles, schema, sitemap). Title becomes "It fixes what's broken"; the cursor
   clicks Approve on "approve"; the issues check off one by one, the ring climbs to 94.
4. Step 3 "It picks keywords you can win" (Dmitry round 3: say HOW we pick): keywords table; three
   criteria chips pop in the card header as named, each lighting its column: "Real searches"
   (Volume), "Matches what you sell" (Keyword), "Low competition" (Difficulty). Source:
   pick-keywords-global (volume bar, buyer fit, commercial intent, KD <= 50). Then "And searches you
   already show up for": a Search Console card, three queries with impressions and position, each
   flagged "No page yet" (pseo-topics GSC impression mining: >= 10 impressions, no dedicated page).
5. Step 4 "It finds what people ask AI": competitor chips first, then the four assistant tiles as
   named, then the prompts table; rows light up on "refresh". Then "Who gets named, and from which
   sources": answer card for "best candle gift sets under $50": three competitors and Ember & Oak
   (#4, matching the prompt row), the first competitor flagged on "competitor", sources cited as
   chips on "sources". Source: queries-research-guidelines (competitors first, asked on ChatGPT,
   Claude, Gemini and Perplexity every GEO refresh, who is named instead, which sources are cited).
6. Step 5 "It writes the articles": archetype chips as named (Best-N listicle, Vs comparison,
   Alternatives, Question page, product labels); the article card's title swaps to an example of
   each kind; its TL;DR, FAQ, image and "Links to your pages" blocks wait as skeletons and fill on
   their words (write-pseo-body: ryze-tldr, ryze-faq, ryze-image, internal links from target pages).
7. Step 6 "It scores every article": the product Article score card. Nine checks tick in from
   "scored"; the ring adds each check's real weight (score.ts CHECK_WEIGHTS) and lands on 95/100,
   "8 of 9 checks passed" (external links left open, weight 5).
8. Step 7 "It publishes them on schedule": the week calendar, Drafted -> Published card by card,
   "Up to 90 articles / month" in the header. On "approve" the title becomes "Or you approve each
   one" and the header shows "Publishing mode" switching Automatic -> Manual (product settings).
9. Step 8 "Backlinks from the exchange": four sites in a chain, "Non-competing sites" chip on
   "compete" (product hint), arrows one direction on "chains", then the incoming backlinks card on
   "new". No numbers anywhere in this scene (Dmitry round 3). The Scale scene was removed.
10. "Do this for three months": clicks chart draws Month 1 to Month 3, the number counts
   380 -> 2,680 / mo. Then the Lockup: "Rank higher on autopilot. Start today."

## Files
timings.ts, data.ts, scene-title / scene-three / scene-connect / scene-audit / scene-keywords /
scene-prompts / scene-write / scene-score / scene-publish / scene-links / scene-growth, three/, write/, articles/.
Pacing (Dmitry, round 2: "слишком быстро"): 20-28 frame gaps between lines, results held.
Table rows get more vertical padding than the app (Dmitry: "всё прижато"); horizontal padding
stays the app's so headers, rows and overlays share one grid.
