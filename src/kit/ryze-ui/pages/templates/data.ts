import { Item, Source } from "./types";

export const SOURCE_LABEL: Record<Source, string> = {
  google_ads: "Google Ads",
  meta_ads: "Meta Ads",
  google_analytics: "Google Analytics",
  google_search_console: "Search Console",
  tiktok_ads: "TikTok Ads",
  shopify: "Shopify",
};

export const SOURCE_LOGO: Record<Source, string> = {
  google_ads: "integrations/google-ads.webp",
  meta_ads: "integrations/meta-ads.svg",
  google_analytics: "integrations/google-analytics.svg",
  google_search_console: "integrations/google-search-console.svg",
  tiktok_ads: "integrations/tiktok-ads.svg",
  shopify: "integrations/shopify-color.svg",
};

export const FILTER_ORDER: Source[] = [
  "google_ads",
  "meta_ads",
  "google_analytics",
  "google_search_console",
  "shopify",
  "tiktok_ads",
];

export const TABS: string[] = ["All", "Monitor", "Create", "Optimize", "Automate", "Report"];

export const DASHBOARDS: Item[] = [
  {
    title: "Organic Traffic Overview",
    description:
      "The Monday screen for organic search: weekday-aligned KPI deltas, clicks and impressions trend, position buckets, top movers and the striking-distance list with clicks left on the table.",
    image: "dashboard-templates/previews/organic-pulse.webp",
    sources: ["google_search_console"],
    imageAlign: "top",
  },
  {
    title: "AI Traffic Overview",
    description:
      "What AI-assistant traffic is worth: sessions by engine, conversion against organic and direct, the pages models cite that Google never sends, honestly measured.",
    image: "dashboard-templates/previews/ai-traffic.webp",
    sources: ["google_analytics", "google_search_console"],
    imageAlign: "top",
  },
  {
    title: "Product Winners & Losers",
    description:
      "SKU-level truth across Shopify, GA4, Google Ads and Merchant Center: which products carry the store, which quietly died, and which burn ad spend while the feed refuses to serve them.",
    image: "dashboard-templates/previews/product-movers.webp",
    sources: ["shopify", "google_analytics", "google_ads"],
    imageAlign: "top",
  },
  {
    title: "Paid Ads Overview",
    description:
      "The core paid dashboard: spend, conversions, CPA, ROAS and CTR, daily trend, platform split, top campaigns and the per-platform funnel with the worst leak named.",
    image: "dashboard-templates/previews/paid-performance.webp",
    sources: ["google_ads", "meta_ads", "tiktok_ads"],
    imageAlign: "top",
  },
  {
    title: "All Accounts Overview",
    description:
      "The agency 9am screen across every ad account: severity-ranked table with recoverable dollars, pacing and target micro-bars, the waste Pareto and week-over-week spend moves.",
    image: "dashboard-templates/previews/portfolio-triage.webp",
    sources: ["google_ads", "meta_ads"],
    imageAlign: "top",
  },
];

export const CREATE: Item[] = [
  {
    title: "Create Meta ad creatives",
    description:
      "3 ready static creatives from your product page: hook, visual direction and copy per angle, sized for feed and Stories.",
    image: "templates/61-card.webp",
    sources: ["meta_ads"],
  },
  {
    title: "Create Google RSA copy",
    description:
      "15 headlines + 4 descriptions from your landing page, grouped by angle, pin recommendations included.",
    image: "templates/62-card.webp",
    sources: ["google_ads"],
  },
  {
    title: "Create ad angles",
    description:
      "10 ad angles mined from real customer reviews: pain, desired outcome, objection and the hook line for each.",
    image: "templates/63-card.webp",
    sources: ["meta_ads", "google_ads"],
  },
  {
    title: "Create competitor-inspired creatives",
    description:
      "Top competitor angles from the Meta Ad Library turned into your own creatives — same jobs, your proof.",
    image: "templates/64-card.webp",
    sources: ["meta_ads"],
  },
  {
    title: "Launch my first campaign",
    description:
      "Your first campaign end to end: the right platform, a starter budget, targeting and ads — every choice explained in one line.",
    image: "templates/74-card.webp",
    sources: [],
    allPlatforms: true,
  },
  {
    title: "Create Google Search campaign",
    description:
      "A launch-ready Search campaign: ad groups, keywords with match types, RSAs, negatives and budget — built as a draft.",
    image: "templates/65-card.webp",
    sources: ["google_ads"],
  },
  {
    title: "Create Meta prospecting campaign",
    description:
      "A cold-traffic Meta campaign: audience plan, 3 creatives, copy variants and budget split — created paused for review.",
    image: "templates/66-card.webp",
    sources: ["meta_ads"],
  },
  {
    title: "Create PMax campaign",
    description:
      "A Performance Max campaign with asset groups per product theme, audience signals and full asset coverage.",
    image: "templates/67-card.webp",
    sources: ["google_ads"],
  },
  {
    title: "Create retargeting campaign",
    description:
      "A funnel-staged retargeting setup: audiences by intent level, matched message per stage, frequency caps.",
    image: "templates/68-card.webp",
    sources: ["meta_ads", "google_ads"],
  },
  {
    title: "Create promo campaign",
    description:
      "A complete sale launch: promo creatives, copy, audiences, budget plan and the switch-back plan for after.",
    image: "templates/69-card.webp",
    sources: ["meta_ads", "google_ads"],
  },
  {
    title: "Scale my winning campaign",
    description:
      "Your best performer found and scaled: bigger budget, wider audiences and the creative variations scaling needs.",
    image: "templates/75-card.webp",
    sources: [],
    allPlatforms: true,
  },
  {
    title: "Launch on a new channel",
    description:
      "The next channel picked from your data: why it fits, the test budget, and the first campaign built to try it.",
    image: "templates/78-card.webp",
    sources: [],
    allPlatforms: true,
  },
  {
    title: "Get more leads",
    description:
      "A lead campaign on the platform that fits: qualifying form, audience, budget — and the follow-up plan so leads hear back fast.",
    image: "templates/77-card.webp",
    sources: [],
    allPlatforms: true,
  },
  {
    title: "Launch a new product",
    description:
      "A full product launch in phases: teaser, launch day and follow-through — audiences, creatives and budget per phase.",
    image: "templates/76-card.webp",
    sources: [],
    allPlatforms: true,
  },
  {
    title: "Create keyword plan",
    description:
      "A campaign-ready keyword plan: seed expansion with volumes and CPCs, grouped by intent, negatives included.",
    image: "templates/70-card.webp",
    sources: ["google_ads"],
  },
  {
    title: "Create audience plan",
    description:
      "A Meta audience plan from your pixel: lookalike sources ranked, interest stacks, exclusions and test order.",
    image: "templates/71-card.webp",
    sources: ["meta_ads"],
  },
  {
    title: "Create SEO article",
    description:
      "A publish-ready article for a keyword you pick: outline from the live SERP, internal links, meta title and description.",
    image: "templates/72-card.webp",
    sources: ["google_search_console"],
  },
  {
    title: "Create product descriptions",
    description:
      "Rewritten descriptions for your top products: benefit-led, objection-aware, with search terms worked in.",
    image: "templates/73-card.webp",
    sources: ["google_analytics"],
  },
];

export const OPTIMIZE: Item[] = [
  {
    title: "Account health audit",
    description:
      "Top 5 issues ranked by $ impact: IS lost to budget, QS underperformers, tracking gaps, ad strength, broad-match waste.",
    image: "templates/01-card.webp",
    sources: ["google_ads"],
  },
  {
    title: "Find Google Ads waste",
    description:
      "Campaigns >$500/wk with ROAS <2. Top wasted terms, Smart Bidding check, pause/cut recommendation.",
    image: "templates/08-card.webp",
    sources: ["google_ads"],
  },
  {
    title: "Negative keyword sweep",
    description:
      "20 high-impression, low-converting queries from last 30d. Wasted spend per term + recommended match type.",
    image: "templates/04-card.webp",
    sources: ["google_ads"],
  },
  {
    title: "Search-term goldmine",
    description:
      "Converting queries last 90d not yet keywords. Promote to exact/phrase, grouped into the right ad groups.",
    image: "templates/05-card.webp",
    sources: ["google_ads"],
  },
  {
    title: "Quality Score audit",
    description:
      "Low-QS keywords by spend. Component diagnosis (CTR, ad relevance, LP) + the one fix per keyword.",
    image: "templates/06-card.webp",
    sources: ["google_ads"],
  },
  {
    title: "Geo performance map",
    description:
      "Bottom 10 + top 10 locations by ROAS last 30d. Geo bid adjustments and zero-converting regions to exclude.",
    image: "templates/27-card.webp",
    sources: ["google_ads"],
  },
  {
    title: "Dayparting analysis",
    description:
      "Hour-of-day + day-of-week conversion heatmap last 90d. Ad-schedule bid adjustments for dead hours and peaks.",
    image: "templates/28-card.webp",
    sources: ["google_ads"],
  },
  {
    title: "Device split audit",
    description:
      "Mobile vs desktop vs tablet CPA/ROAS last 60d. Device bid adjustments where performance diverges >20%.",
    image: "templates/24-card.webp",
    sources: ["google_ads"],
  },
  {
    title: "Conversion tracking check",
    description:
      "Audit all conversion actions for status, double-counting, and stale tracking before they wreck bidding.",
    image: "templates/26-card.webp",
    sources: ["google_ads"],
  },
  {
    title: "PMax channel x-ray",
    description:
      "Break PMax/Shopping by listing group + asset group last 30d. Products and channels eating budget with no return.",
    image: "templates/31-card.webp",
    sources: ["google_ads"],
  },
  {
    title: "Meta ad set deep-dive",
    description:
      "Across age, gender, placement, device, creative. Scale candidates, winning pairings, audience overlap.",
    image: "templates/10-card.webp",
    sources: ["meta_ads"],
  },
  {
    title: "Creative fatigue audit",
    description:
      "Hook rate, frequency, CPM drift, CTR decline last 14d. Fatigued ads ranked by spend at risk.",
    image: "templates/35-card.webp",
    sources: ["meta_ads"],
  },
  {
    title: "Audience overlap audit",
    description:
      "Active ad sets bidding against each other. Overlap >25% to consolidate, with the merge plan.",
    image: "templates/29-card.webp",
    sources: ["meta_ads"],
  },
  {
    title: "Landing page CRO",
    description:
      "GA4 landing pages by entrances + conv rate last 28d. High-traffic low-converting pages costing the most.",
    image: "templates/39-card.webp",
    sources: ["google_analytics"],
  },
  {
    title: "Checkout dropoff",
    description:
      "GA4 funnel from product view to purchase last 28d. Exact step + dropoff % bleeding revenue.",
    image: "templates/37-card.webp",
    sources: ["google_analytics"],
  },
  {
    title: "Traffic quality audit",
    description:
      "Sources where engagement or conv rate dropped >10% WoW. Tracking break vs paid-quality drop.",
    image: "templates/15-card.webp",
    sources: ["google_analytics"],
  },
  {
    title: "Keyword cannibalization",
    description:
      "GSC queries where multiple URLs compete for the same term. Consolidation map to stop splitting rankings.",
    image: "templates/40-card.webp",
    sources: ["google_search_console"],
  },
  {
    title: "Content decay audit",
    description:
      "Pages steadily losing clicks/position over 90d. Decliners + suspected cause, ranked by lost clicks.",
    image: "templates/18-card.webp",
    sources: ["google_search_console"],
  },
  {
    title: "Indexation audit",
    description:
      "GSC coverage: indexed vs excluded, crawl errors, and high-value pages missing from the index.",
    image: "templates/41-card.webp",
    sources: ["google_search_console"],
  },
  {
    title: "Ad copy audit",
    description:
      "Every live RSA + Meta ad scored for weak CTAs, missing USPs, thin messaging, LP mismatch. The rewrite list.",
    image: "templates/34-card.webp",
    sources: [],
    allPlatforms: true,
  },
];

export const AUTOMATE: Item[] = [
  {
    title: "Weekly auto-pause rule",
    description:
      "Every Monday review all active campaigns. Pause ROAS <2 (10+ conv) and frequency >4 with CTR dropping. Slack summary.",
    image: "templates/21-card.webp",
    sources: ["google_ads", "meta_ads"],
  },
  {
    title: "Spend pacing alert",
    description:
      "Alert when daily spend exceeds threshold OR 7-day pacing >15% above plan. Top cost driver + one-line recommendation.",
    image: "templates/22-card.webp",
    sources: ["google_ads", "meta_ads"],
  },
  {
    title: "Friday weekly recap",
    description:
      "Every Friday 5pm: spend, revenue, ROAS, CAC, wins, issues, 3 prioritized things for next week ranked by impact.",
    image: "templates/23-card.webp",
    sources: ["google_ads", "meta_ads"],
  },
  {
    title: "Daily morning brief",
    description:
      "Scheduled 7am brief: yesterday's spend, conv, CPA/ROAS vs 7d avg across Google + Meta, plus anomalies.",
    image: "templates/43-card.webp",
    sources: ["google_ads", "meta_ads"],
  },
  {
    title: "Daily anomaly alert",
    description:
      "Catch the spikes: CPC up >25%, CPA up >30%, conv crash, spend pacing >120%. Cause + fix, emailed same day.",
    image: "templates/52-card.webp",
    sources: [],
    allPlatforms: true,
  },
  {
    title: "Ad disapproval watch",
    description:
      "Daily check for disapproved ads AND sitelinks/extensions (which don't always alert). What's down + why.",
    image: "templates/53-card.webp",
    sources: ["google_ads"],
  },
  {
    title: "Weekly fatigue alert",
    description:
      "Every Monday: Meta ads with dropping hook rate/CTR and rising frequency. Pause / refresh / scale verdict, emailed.",
    image: "templates/54-card.webp",
    sources: ["meta_ads"],
  },
  {
    title: "Weekly retargeting check",
    description:
      "Every Monday: Meta funnel coverage — prospecting vs retargeting split, missing warm audiences, frequency.",
    image: "templates/33-card.webp",
    sources: ["meta_ads"],
  },
  {
    title: "Weekly search-term cleanup",
    description:
      "Every Monday: new high-spend non-converting search terms + cross-campaign overlap. Negatives to add, emailed.",
    image: "templates/55-card.webp",
    sources: ["google_ads"],
  },
  {
    title: "Weekly Meta waste alert",
    description:
      "Every Monday: Meta ad sets with CPA >30% over target. Pause / cut / refresh call per ad set, emailed.",
    image: "templates/13-card.webp",
    sources: ["meta_ads"],
  },
  {
    title: "Weekly ranking-drop alert",
    description:
      "Weekly GSC scan for pages losing impressions/position. Top 10 decliners + suspected cause, emailed.",
    image: "templates/56-card.webp",
    sources: ["google_search_console"],
  },
  {
    title: "Weekly scaling check",
    description:
      "Every Monday: campaigns ready for a 20-30% budget bump — ROAS 2x target, IS lost to budget >10%, conv up.",
    image: "templates/09-card.webp",
    sources: ["google_ads"],
  },
  {
    title: "Budget pacing guard",
    description:
      "Daily check that no account is racing ahead or lagging its monthly budget. Pace status + correction.",
    image: "templates/57-card.webp",
    sources: [],
    allPlatforms: true,
  },
  {
    title: "New leads digest",
    description:
      "Daily pull of new Meta lead-form leads with cost per lead by form/ad set. Quality flags included.",
    image: "templates/30-card.webp",
    sources: ["meta_ads"],
  },
  {
    title: "Weekly keyword harvest",
    description:
      "Every Monday: converting search terms not yet keywords. Promote to exact/phrase in the right ad group.",
    image: "templates/58-card.webp",
    sources: ["google_ads"],
  },
  {
    title: "Creative rotation reminder",
    description:
      "Every 7-10 days: which ad sets are due for fresh creative based on frequency and days-since-launch.",
    image: "templates/36-card.webp",
    sources: ["meta_ads"],
  },
  {
    title: "Weekly asset coverage check",
    description:
      "Every Monday: campaigns missing sitelinks, callouts, snippets, images vs best-practice minimums, ranked by spend.",
    image: "templates/25-card.webp",
    sources: ["google_ads"],
  },
  {
    title: "Conversion tracking heartbeat",
    description:
      "Weekly check that conversions are still firing. Catch zero-count actions and broken tags before bidding breaks.",
    image: "templates/59-card.webp",
    sources: ["google_ads"],
  },
  {
    title: "Weekly ad strength check",
    description:
      "Every Monday: RSAs below 'Good' ad strength. The missing headlines/assets to push each to 'Excellent'.",
    image: "templates/07-card.webp",
    sources: ["google_ads"],
  },
  {
    title: "Monthly report auto-send",
    description:
      "On the 1st: build the client monthly recap and email it as a branded report. Reporting day, gone.",
    image: "templates/60-card.webp",
    sources: [],
    allPlatforms: true,
  },
];

export const DECKS: Item[] = [
  {
    title: "Monthly Client Report",
    description:
      "The month in one story: hero results versus prior, revenue trend, channel split, what shipped, the honest underperformer and next month's plan.",
    image: "deck-templates/previews/monthly-report.webp",
    sources: [],
  },
  {
    title: "Marketing Audit",
    description:
      "Findings ranked by dollar impact: where spend leaks, what tracking misses, the budget-starved winner, and the fix roadmap with expected return.",
    image: "deck-templates/previews/marketing-audit.webp",
    sources: [],
  },
  {
    title: "Quarterly Business Review",
    description:
      "The quarter in one number, monthly trend, channel mix evolution, wins shipped, one honest miss with the lesson, and the next quarter's roadmap.",
    image: "deck-templates/previews/quarterly-review.webp",
    sources: [],
  },
  {
    title: "Creative Performance Review",
    description:
      "Which angles win and why: the angle leaderboard, the winner dissected, fatigue watch, top hooks and the next shoot brief.",
    image: "deck-templates/previews/creative-review.webp",
    sources: [],
  },
  {
    title: "SEO Audit",
    description:
      "The site scored 0-100: where the organic money leaks, which queries sit one position from page one, what decayed, and the fix plan ranked by dollars.",
    image: "deck-templates/previews/seo-audit.webp",
    sources: [],
  },
  {
    title: "Post-Click Teardown",
    description:
      "Where paid traffic dies after the click: the funnel with the leak located, page speed and message match in dollars, the worst page dissected, and the fix list with expected lift.",
    image: "deck-templates/previews/landing-teardown.webp",
    sources: [],
  },
  {
    title: "Competitor Landscape",
    description:
      "The field mapped: who actually shows up in your auctions, which message each rival owns, the gap nobody is buying and the plays worth stealing.",
    image: "deck-templates/previews/competitor-landscape.webp",
    sources: [],
  },
  {
    title: "Media Plan & Forecast",
    description:
      "Next period's budget in one plan: where every dollar goes, what it should return, the assumptions holding the forecast up and the tripwires that move money without a meeting.",
    image: "deck-templates/previews/media-plan.webp",
    sources: [],
  },
  {
    title: "New Client Proposal",
    description:
      "The pitch after an account analysis: the money on the table, the biggest leak with evidence, the plan, the projection and the engagement.",
    image: "deck-templates/previews/client-proposal.webp",
    sources: [],
  },
];

export const REPORTS: Item[] = [
  {
    title: "Top 10 opportunities",
    description:
      "Ranked by $/month impact across Google + Meta. Each with lever, evidence, expected lift, effort, risk.",
    image: "templates/03-card.webp",
    sources: ["google_ads", "meta_ads"],
  },
  {
    title: "Week-over-week diagnostic",
    description:
      "Biggest deltas in ROAS, CPA, IS, avg CPC across all campaigns. Primary driver per shift, brand vs non-brand.",
    image: "templates/02-card.webp",
    sources: ["google_ads"],
  },
  {
    title: "Weekly performance recap",
    description:
      "This week's actions, metrics, and next steps for your account. The weekly write-up, done for you.",
    image: "templates/44-card.webp",
    sources: [],
    allPlatforms: true,
  },
  {
    title: "Weekly Meta report",
    description:
      "Spend, revenue, ROAS, CPA, top 3 ads, decliners, WoW trend. Creative fatigue flags. 3 prioritized next actions.",
    image: "templates/12-card.webp",
    sources: ["meta_ads"],
  },
  {
    title: "Client monthly recap",
    description:
      "Exec-ready: headline metrics, wins, tests, learnings, next month plan. Spend->revenue waterfall, plain English.",
    image: "templates/20-card.webp",
    sources: ["google_ads", "meta_ads"],
  },
  {
    title: "Monthly trend analysis",
    description:
      "3-6 month trends across channels: spend, ROAS, CAC, conv. Where the line is bending and why.",
    image: "templates/45-card.webp",
    sources: [],
    allPlatforms: true,
  },
  {
    title: "Top traffic sources (GA4)",
    description:
      "15 source/medium combos by sessions, engaged users, conv rate, revenue/session. New vs returning segmented.",
    image: "templates/14-card.webp",
    sources: ["google_analytics"],
  },
  {
    title: "Channel attribution compare",
    description:
      "Data-driven vs last-click last 30d. Channels where blended CAC looks misleading due to attribution divergence.",
    image: "templates/16-card.webp",
    sources: ["google_analytics"],
  },
  {
    title: "AI traffic report",
    description:
      "LLM referral traffic from ChatGPT, Perplexity, Gemini etc. last 90d. Volume, trend, top landing pages, conversions.",
    image: "templates/38-card.webp",
    sources: ["google_analytics"],
  },
  {
    title: "Budget reallocation plan",
    description:
      "Move spend from losers to budget-capped winners. Net-zero shift with projected conv lift.",
    image: "templates/32-card.webp",
    sources: ["google_ads"],
  },
  {
    title: "Recommendations digest",
    description:
      "Google's Recommendations + Insights, filtered to what's actually worth doing — and what to ignore.",
    image: "templates/46-card.webp",
    sources: ["google_ads"],
  },
  {
    title: "Easy-win queries (pos 5-15)",
    description:
      "Queries ranking 5-15 with >500 impressions and CTR >1%. One on-page recommendation per query to push to top 3.",
    image: "templates/17-card.webp",
    sources: ["google_search_console"],
  },
  {
    title: "High-CTR, low-rank queries",
    description:
      "Queries with CTR >10% NOT in positions 1-3. Strong intent, weak rank. Content-depth recommendation per query.",
    image: "templates/19-card.webp",
    sources: ["google_search_console"],
  },
  {
    title: "Creative performance report",
    description:
      "Top and bottom Meta ads last 30d by ROAS + hook rate. What's working, what's tired, what to make next.",
    image: "templates/11-card.webp",
    sources: ["meta_ads"],
  },
  {
    title: "Spend & pacing summary",
    description:
      "MTD spend vs plan per account. On pace, over, or under — with the projected end-of-month landing.",
    image: "templates/47-card.webp",
    sources: [],
    allPlatforms: true,
  },
  {
    title: "New vs returning report",
    description:
      "GA4 new vs returning last 30d: traffic mix, conv rate, AOV, revenue share. Where growth is really coming from.",
    image: "templates/48-card.webp",
    sources: ["google_analytics"],
  },
  {
    title: "Promo post-mortem",
    description:
      "Sale/launch recap: spend, revenue, ROAS, best creatives + offers, vs a normal week. What to repeat next time.",
    image: "templates/42-card.webp",
    sources: ["google_ads", "meta_ads"],
  },
  {
    title: "SEO visibility report",
    description:
      "GSC clicks, impressions, avg position WoW. Biggest query + page movers, up and down.",
    image: "templates/49-card.webp",
    sources: ["google_search_console"],
  },
  {
    title: "Blended ROAS report",
    description:
      "Spend->revenue by channel + blended ROAS and CAC. The true cross-channel efficiency picture.",
    image: "templates/50-card.webp",
    sources: [],
    allPlatforms: true,
  },
  {
    title: "Account snapshot",
    description:
      "One-page state of the account: structure, spend, top campaigns, key metrics, open issues. Audit-ready.",
    image: "templates/51-card.webp",
    sources: [],
    allPlatforms: true,
  },
];

