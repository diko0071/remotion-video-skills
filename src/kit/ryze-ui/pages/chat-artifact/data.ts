import { Kpi, Mover, Product, ScoreCat, Striking } from "./types";

export const KPIS: Kpi[] = [
  { label: "Clicks", value: "9,880", delta: "+12.4%", dir: "up", hero: true },
  { label: "Impressions", value: "412,600", delta: "+6.1%", dir: "up", hero: false },
  { label: "Average CTR", value: "2.4%", delta: "+0.2pp", dir: "up", hero: false },
  { label: "Average position", value: "18.2", delta: "-1.4", dir: "up", hero: false },
];

export const TREND_LABELS = [
  "Apr 20",
  "May 4",
  "May 18",
  "Jun 1",
  "Jun 15",
  "Jun 29",
  "Jul 13",
];

export const CLICKS = [620, 668, 704, 690, 736, 782, 758, 824, 866, 902, 944, 986, 1012];

export const IMPRESSIONS = [
  26400, 27200, 28600, 28100, 29600, 31100, 30400, 32600, 34100, 35600, 37000, 38600, 40100,
];

export const BUCKET_WEEKS = [
  [42, 118, 210, 486],
  [45, 124, 216, 470],
  [48, 129, 221, 462],
  [51, 133, 224, 455],
  [54, 140, 228, 442],
  [58, 146, 231, 430],
  [61, 151, 234, 421],
  [65, 158, 236, 412],
  [68, 164, 238, 402],
  [72, 171, 241, 392],
  [76, 178, 243, 381],
  [81, 186, 246, 370],
];

export const MOVERS: Mover[] = [
  { q: "soy candles", clicks: "1,204", dc: "+186", dp: "+1.4" },
  { q: "hand poured candle gift set", clicks: "742", dc: "+128", dp: "+2.1" },
  { q: "wooden wick candles", clicks: "618", dc: "+94", dp: "+0.8" },
  { q: "amber jar candle", clicks: "486", dc: "+61", dp: "+1.2" },
  { q: "candle refill kit", clicks: "312", dc: "-74", dp: "-2.6" },
  { q: "wax melts uk", clicks: "268", dc: "-58", dp: "-3.1" },
  { q: "beeswax candle", clicks: "204", dc: "-41", dp: "-1.9" },
];

export const STRIKING: Striking[] = [
  { q: "cedar and oak candle", pos: "5.2", impr: "18,400", clicks: "410", left: "620" },
  { q: "luxury soy candle gift", pos: "6.1", impr: "14,900", clicks: "296", left: "540" },
  { q: "non toxic candles", pos: "7.4", impr: "12,600", clicks: "214", left: "480" },
  { q: "candle subscription box", pos: "8.8", impr: "9,800", clicks: "142", left: "360" },
  { q: "smoke free candles", pos: "9.3", impr: "8,200", clicks: "108", left: "310" },
];

export const SCORE_CATS: ScoreCat[] = [
  { name: "Indexing health", weight: "20%", score: 82 },
  { name: "Query opportunity capture", weight: "20%", score: 38 },
  { name: "On-page quality", weight: "20%", score: 61 },
  { name: "Site performance", weight: "15%", score: 74 },
  { name: "Off-page authority", weight: "15%", score: 52 },
  { name: "AI visibility", weight: "10%", score: 44 },
];

export const NAV = ["Candles", "Gift Sets", "Wax Melts", "Refills", "Our Story"];

export const PRODUCTS: Product[] = [
  { name: "Ember No. 4 — Cedar & Oak", price: "$38.00", note: "Wooden wick · 60 hr", img: "product-1.jpg" },
  { name: "Amber Jar — Fig & Smoke", price: "$34.00", note: "Cotton wick · 48 hr", img: "product-2.jpg" },
  { name: "Hearthstone — Vetiver", price: "$42.00", note: "Wooden wick · 60 hr", img: "product-3.jpg" },
  { name: "Oak Grove — Bergamot", price: "$36.00", note: "Cotton wick · 52 hr", img: "banner-candles.jpg" },
];

export const DASHBOARD_TOOL_SUMMARY = "Checked Google Search Console 3 times, wrote a report";

export const DASHBOARD_TOOL_ROWS = [
  "Ran Google search console run raw search analytics",
  "Ran Google search console get indexation summary",
  "Ran Google search console list queries",
  "Ran Write report",
];

export const DECK_TOOL_SUMMARY = "Loaded Skill: SEO audit, checked 4 sources, wrote a report";

export const DECK_TOOL_ROWS = [
  "Uploading Skill: seo-audit",
  "Ran Google search console run raw search analytics",
  "Ran Google analytics run report",
  "Ran Shopify get shop summary",
  "Ran Dataforseo get backlinks summary",
  "Ran Write report",
];

export const SITE_TOOL_SUMMARY = "Loaded Skill: Shopify editing, checked Shopify, updated a collection";

export const SITE_TOOL_ROWS = [
  "Uploading Skill: shopify-editing",
  "Ran Shopify get collection",
  "Ran Google search console list queries",
  "Ran Shopify update collection seo",
  "Ran Open artifact",
];

export const ARTIFACT_WORKSPACE = "ember-and-oak";

export const DASHBOARD_ARTIFACT_HEAD = {
  chatTitle: "Organic traffic dashboard",
  name: "Organic Traffic Overview",
  typeLabel: "Dashboard",
};

export const DECK_ARTIFACT_HEAD = {
  chatTitle: "SEO audit deck",
  name: "Ember & Oak — SEO audit, July 2026",
  typeLabel: "Deck",
};

export const SITE_ARTIFACT_HEAD = {
  chatTitle: "Fix the soy candles collection page",
  name: "ember-and-oak.com/collections/soy-candles",
};
