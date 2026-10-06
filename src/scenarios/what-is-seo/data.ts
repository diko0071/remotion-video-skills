import type { IntegrationItem } from "../../kit/ryze-ui/pages/integrations/types";
import type { AuditSeverity } from "../../kit/ryze-ui/pages/technical-audit/types";
import type { Keyword } from "../../kit/ryze-ui/pages/geo-queries/types";
import { KEYWORDS, TOPICS } from "../../kit/ryze-ui/pages/geo-queries";

export const SITE = "ember-and-oak.com";

export const INTEGRATIONS: IntegrationItem[] = [
  { name: "Shopify", icon: "integrations/shopify.svg", iconBg: "#95BF47", description: "Products, collections, pages, and store-wide SEO settings.", state: "none" },
  { name: "Google Search Console", icon: "integrations/google-search-console.svg", description: "Queries, impressions, clicks, CTR, position, and indexation.", state: "none" },
];

export const ISSUES: { name: string; severity: AuditSeverity }[] = [
  { name: "Broken links on 4 pages", severity: "critical" },
  { name: "Slow page speed on mobile", severity: "warning" },
  { name: "12 titles over 60 characters", severity: "warning" },
  { name: "Product schema missing", severity: "warning" },
  { name: "26 pages missing from sitemap", severity: "notice" },
];

export const HEALTH = { before: 62, after: 94 } as const;

const PICKED = ["hand poured candles", "wood wick candles", "candle gift set", "coconut wax candles", "candle refill jars"];
export const PICKED_KEYWORDS: Keyword[] = PICKED.map((t) => KEYWORDS.find((k) => k.text === t)).filter((k): k is Keyword => Boolean(k));

export const PROMPTS = TOPICS.flatMap((t) => t.prompts).slice(0, 4);

export const ARTICLES = [
  { title: "Soy wax vs paraffin: what actually burns cleaner", url: "/blogs/journal/soy-vs-paraffin" },
  { title: "Candle gift sets under $50 for housewarmings", url: "/blogs/journal/candle-gift-sets-under-50" },
  { title: "Wood wick vs cotton wick candles compared", url: "/blogs/journal/wood-vs-cotton-wick" },
  { title: "How long do hand-poured candles burn", url: "/blogs/journal/hand-poured-burn-time" },
] as const;

export const CALENDAR = {
  month: "October 2026",
  range: "Oct 5 – Oct 9, 2026",
  chip: { month: "OCT", day: "5" },
  days: [
    { weekday: "Mon", date: 5, events: [
      { title: "Soy wax vs paraffin: what actually burns cleaner", image: "hero-candles.jpg" },
      { title: "Why your candle tunnels and how to fix it", image: "product-1.jpg" },
    ] },
    { weekday: "Tue", date: 6, events: [
      { title: "Candle gift sets under $50 for housewarmings", image: "product-2.jpg" },
      { title: "How we test every scent before launch", image: "banner-candles.jpg" },
    ] },
    { weekday: "Wed", date: 7, events: [
      { title: "Wood wick vs cotton wick candles compared", image: "product-3.jpg" },
      { title: "Clean burning candles: a buyer's checklist", image: "hero-candles.jpg" },
    ] },
    { weekday: "Thu", date: 8, events: [
      { title: "How long do hand-poured candles burn", image: "product-1.jpg" },
      { title: "Best candle scents for a cozy autumn", image: "product-2.jpg" },
    ] },
    { weekday: "Fri", date: 9, events: [
      { title: "Non-toxic candles: what to look for on the label", image: "banner-candles.jpg" },
      { title: "How to store candles so they keep their scent", image: "product-3.jpg" },
    ] },
  ],
} as const;

export const BACKLINKS = [
  { site: "cozyhomejournal.com", dr: 58, page: "/best-candles-for-fall" },
  { site: "giftguidedaily.com", dr: 52, page: "/housewarming-gifts" },
  { site: "homescentguide.com", dr: 44, page: "/candle-gift-ideas" },
] as const;

export const CHAIN = [
  { site: "giftguidedaily.com", dr: 52 },
  { site: "cozyhomejournal.com", dr: 58 },
  { site: "ember-and-oak.com", dr: 31, you: true },
  { site: "slowlivingmag.com", dr: 47 },
] as const;

export const GSC_QUERIES = [
  { query: "how long should a candle burn", impressions: "1,240", position: 18 },
  { query: "candle gift box ideas", impressions: "860", position: 23 },
  { query: "soy candle vs beeswax", impressions: "610", position: 27 },
] as const;

export const COMPETITORS = ["wickandpour.com", "hearthcandleco.com", "smallbatchwax.com"] as const;

export const NAMED = [
  { site: "wickandpour.com" },
  { site: "hearthcandleco.com" },
  { site: "smallbatchwax.com" },
  { site: "Ember & Oak", you: true },
] as const;

export const SOURCES = ["cozyhomejournal.com", "giftguidedaily.com", "candlecareguide.org"] as const;

export const KINDS = ["Best-N listicle", "Vs comparison", "Alternatives", "Question page"] as const;

export const SCORE_CHECKS = [
  { label: "Optimal content structure", weight: 14, pass: true },
  { label: "Internal links", weight: 12, pass: true },
  { label: "External links", weight: 5, pass: false },
  { label: "Statistics data points", weight: 12, pass: true },
  { label: "Image alt texts", weight: 9, pass: true },
  { label: "Semantic keywords", weight: 11, pass: true },
  { label: "FAQ section", weight: 13, pass: true },
  { label: "Optimized meta tags", weight: 13, pass: true },
  { label: "JSON-LD schema", weight: 11, pass: true },
] as const;

export const TRAFFIC = {
  months: ["Month 1", "Month 2", "Month 3"],
  clicks: [380, 420, 510, 640, 790, 980, 1180, 1420, 1690, 1980, 2310, 2680],
  start: "380",
  end: "2,680",
} as const;
