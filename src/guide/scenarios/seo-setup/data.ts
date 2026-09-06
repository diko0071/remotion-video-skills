import type { ContentPlanRow, ContentPlanKpi, ContentPlanTab } from "../../../kit/ryze-ui/pages/content-plan/types";
import type { BacklinkRow, BacklinkKpi, BacklinkTab } from "../../../kit/ryze-ui/pages/backlinks/types";
import type { Keyword, QueriesKpi, QueriesTab } from "../../../kit/ryze-ui/pages/geo-queries/types";

export const EMPTY_QUERY_KPIS: QueriesKpi[] = [
  { label: "Keywords", value: "0" },
  { label: "Avg search volume", value: "—" },
  { label: "AI prompts", value: "0/50" },
  { label: "AI visibility", value: "—" },
];

export const EMPTY_QUERY_TABS: QueriesTab[] = [
  { label: "Keywords", count: 0, active: true },
  { label: "Prompts", count: 0, active: false },
];

export const PLAN_ROWS_FRESH: ContentPlanRow[] = [
  { title: "Why your candle tunnels and how to fix it", url: null, scheduled: "Aug 18, 2026", impressions: null, delta: null, series: null, status: "Drafted" },
  { title: "Soy wax vs paraffin: what actually burns cleaner", url: null, scheduled: "Aug 18, 2026", impressions: null, delta: null, series: null, status: "Drafted" },
  { title: "Candle gift sets under $50 for housewarmings", url: null, scheduled: "Aug 19, 2026", impressions: null, delta: null, series: null, status: "Drafted" },
  { title: "How to make a candle last twice as long", url: null, scheduled: "Aug 19, 2026", impressions: null, delta: null, series: null, status: "Drafted" },
  { title: "Best fall candle scents for small apartments", url: null, scheduled: "Aug 20, 2026", impressions: null, delta: null, series: null, status: "Drafted" },
  { title: "Wood wicks vs cotton wicks: which crackle is for you", url: null, scheduled: "Aug 20, 2026", impressions: null, delta: null, series: null, status: "Planned" },
  { title: "What clean burning actually means, tested", url: null, scheduled: "Aug 21, 2026", impressions: null, delta: null, series: null, status: "Planned" },
  { title: "A maker's guide to candle care rituals", url: null, scheduled: "Aug 21, 2026", impressions: null, delta: null, series: null, status: "Planned" },
];

export const PLAN_KPIS_FRESH: ContentPlanKpi[] = [
  { label: "Total articles", value: "150" },
  { label: "Planned", value: "145" },
  { label: "Drafted", value: "5" },
  { label: "Published", value: "0" },
];

export const PLAN_TABS_FRESH: ContentPlanTab[] = [
  { label: "All", count: 150 },
  { label: "Planned", count: 145 },
  { label: "Drafted", count: 5 },
  { label: "Published", count: 0 },
];

export const PLAN_ROWS_LIVE: ContentPlanRow[] = [
  { title: "Why your candle tunnels and how to fix it", url: "ember-and-oak.com/blogs/journal/candle-tunneling-fix", scheduled: "Aug 18, 2026", impressions: null, delta: null, series: null, status: "Published" },
  { title: "Soy wax vs paraffin: what actually burns cleaner", url: "ember-and-oak.com/blogs/journal/soy-wax-vs-paraffin", scheduled: "Aug 18, 2026", impressions: null, delta: null, series: null, status: "Published" },
  { title: "Candle gift sets under $50 for housewarmings", url: "ember-and-oak.com/blogs/journal/candle-gift-sets-under-50", scheduled: "Aug 19, 2026", impressions: null, delta: null, series: null, status: "Published" },
  { title: "How to make a candle last twice as long", url: "ember-and-oak.com/blogs/journal/make-a-candle-last-longer", scheduled: "Aug 19, 2026", impressions: null, delta: null, series: null, status: "Published" },
  { title: "Best fall candle scents for small apartments", url: "ember-and-oak.com/blogs/journal/fall-candle-scents-apartments", scheduled: "Aug 20, 2026", impressions: null, delta: null, series: null, status: "Published" },
  { title: "Wood wicks vs cotton wicks: which crackle is for you", url: null, scheduled: "Aug 20, 2026", impressions: null, delta: null, series: null, status: "Drafted" },
  { title: "What clean burning actually means, tested", url: null, scheduled: "Aug 21, 2026", impressions: null, delta: null, series: null, status: "Drafted" },
  { title: "A maker's guide to candle care rituals", url: null, scheduled: "Aug 21, 2026", impressions: null, delta: null, series: null, status: "Planned" },
];

export const PLAN_KPIS_LIVE: ContentPlanKpi[] = [
  { label: "Total articles", value: "150" },
  { label: "Planned", value: "138" },
  { label: "Drafted", value: "7" },
  { label: "Published", value: "5" },
];

export const PLAN_TABS_LIVE: ContentPlanTab[] = [
  { label: "All", count: 150 },
  { label: "Planned", count: 138 },
  { label: "Drafted", count: 7 },
  { label: "Published", count: 5 },
];

export const MENTION_ROWS_FRESH: BacklinkRow[] = [
  { text: '"Small-batch candle maker Ember & Oak launches three autumn scents"', url: "", published: "", status: "scheduled" },
  { text: '"Why wood wicks crackle: a maker\'s guide to slow evenings at home"', url: "", published: "", status: "drafted" },
  { text: '"The five-minute candle care ritual that doubles burn time"', url: "", published: "", status: "drafted" },
  { text: '"How to scent a 500 sq ft apartment without overwhelming it"', url: "", published: "", status: "in_progress" },
];

export const MENTION_KPIS_FRESH: BacklinkKpi[] = [
  { label: "This month", value: "4" },
  { label: "Press", value: "1" },
  { label: "Guest Post", value: "3" },
  { label: "Backlinks", value: "0" },
];

export const MENTION_TABS_FRESH: BacklinkTab[] = [
  { label: "All", count: 4, active: true },
  { label: "Press", count: 1 },
  { label: "Guest Post", count: 3 },
  { label: "Backlinks", count: 0 },
];

export const FOCUS_KEYWORDS: Keyword[] = [
  { text: "hand poured candles", volume: 8100, difficulty: 41, position: 7, delta: -3, trend: [14, 13, 11, 11, 9, 8, 7] },
  { text: "wood wick candles", volume: 6600, difficulty: 38, position: 9, delta: -2, trend: [15, 14, 14, 12, 11, 10, 9] },
  { text: "candle gift set", volume: 4400, difficulty: 47, position: 14, delta: -4, trend: [22, 21, 19, 17, 16, 15, 14] },
  { text: "coconut wax candles", volume: 3600, difficulty: 29, position: 5, delta: -1, trend: [8, 8, 7, 7, 6, 6, 5] },
  { text: "how to trim a wooden wick", volume: 1600, difficulty: 15, position: 2, delta: -1, trend: [5, 4, 4, 3, 3, 2, 2] },
];

export const FOCUS_KPIS: QueriesKpi[] = [
  { label: "Keywords", value: "5" },
  { label: "Avg search volume", value: "4860" },
  { label: "AI prompts", value: "24/50" },
  { label: "AI visibility", value: "34%" },
];

export const FOCUS_KEYWORD_TABS: QueriesTab[] = [
  { label: "Keywords", count: 5, active: true },
  { label: "Prompts", count: 24, active: false },
];

export const FOCUS_PROMPT_TABS: QueriesTab[] = [
  { label: "Keywords", count: 5, active: false },
  { label: "Prompts", count: 24, active: true },
];
