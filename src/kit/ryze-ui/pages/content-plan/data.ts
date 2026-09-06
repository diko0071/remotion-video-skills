import { ContentPlanKpi, ContentPlanRow, ContentPlanTab } from "./types";

export const CONTENT_PLAN_ROWS: ContentPlanRow[] = [
  {
    title: "Why your candle tunnels and how to fix it",
    url: null,
    scheduled: "Aug 16, 2026",
    impressions: null,
    delta: null,
    series: null,
    status: "Drafted",
  },
  {
    title: "Soy wax vs paraffin: what actually burns cleaner",
    url: "ember-and-oak.com/blogs/journal/soy-wax-vs-paraffin-clean-burn",
    scheduled: "Aug 6, 2026",
    impressions: 7180,
    delta: 21,
    series: [6, 6, 8, 7, 9, 11, 12, 13],
    status: "Published",
  },
  {
    title: "Candle gift sets under $50 for housewarmings",
    url: "ember-and-oak.com/blogs/journal/candle-gift-sets-under-50",
    scheduled: "Aug 8, 2026",
    impressions: 5340,
    delta: 12,
    series: [5, 7, 6, 8, 8, 9, 10, 11],
    status: "Published",
  },
  {
    title: "Best soy candles for small apartments",
    url: "ember-and-oak.com/blogs/journal/best-soy-candles-small-apartments",
    scheduled: "Aug 4, 2026",
    impressions: 4610,
    delta: 8,
    series: [4, 5, 6, 6, 7, 7, 8, 9],
    status: "Published",
  },
  {
    title: "How long do hand-poured candles burn",
    url: "ember-and-oak.com/blogs/journal/how-long-do-hand-poured-candles-burn",
    scheduled: "Aug 5, 2026",
    impressions: 2980,
    delta: -6,
    series: [9, 8, 8, 7, 7, 6, 6, 5],
    status: "Published",
  },
  {
    title: "Clean burning candles: a buyer's checklist",
    url: "ember-and-oak.com/blogs/journal/clean-burning-candles-checklist",
    scheduled: "Aug 12, 2026",
    impressions: 1240,
    delta: 62,
    series: [1, 2, 2, 4, 5, 7, 9, 12],
    status: "Published",
  },
  {
    title: "Non-toxic candles: what to look for on the label",
    url: null,
    scheduled: "Aug 15, 2026",
    impressions: null,
    delta: null,
    series: null,
    status: "Drafted",
  },
  {
    title: "Wood wick vs cotton wick candles compared",
    url: null,
    scheduled: "Aug 16, 2026",
    impressions: null,
    delta: null,
    series: null,
    status: "Drafted",
  },
  {
    title: "Best candle scents for a cozy autumn living room",
    url: null,
    scheduled: "Aug 18, 2026",
    impressions: null,
    delta: null,
    series: null,
    status: "Drafted",
  },
  {
    title: "How to store candles so they keep their scent",
    url: null,
    scheduled: "Aug 19, 2026",
    impressions: null,
    delta: null,
    series: null,
    status: "Planned",
  },
  {
    title: "Beeswax vs soy: which candle lasts longer",
    url: null,
    scheduled: "Aug 21, 2026",
    impressions: null,
    delta: null,
    series: null,
    status: "Planned",
  },
  {
    title: "Candle care guide: trimming, curing and re-lighting",
    url: null,
    scheduled: "Aug 23, 2026",
    impressions: null,
    delta: null,
    series: null,
    status: "Planned",
  },
];

export const CONTENT_PLAN_KPIS: ContentPlanKpi[] = [
  { label: "Total articles", value: "150" },
  { label: "Planned", value: "100" },
  { label: "Drafted", value: "12" },
  { label: "Published", value: "38" },
];

export const CONTENT_PLAN_TABS: ContentPlanTab[] = [
  { label: "All", count: 150 },
  { label: "Planned", count: 100 },
  { label: "Drafted", count: 12 },
  { label: "Published", count: 38 },
  { label: "Warnings", count: 2 },
];

export const CONTENT_PLAN_TITLE = "Content Plan";

export const CONTENT_PLAN_SUB = "Everything planned, drafted and published for your site";

export const CONTENT_PLAN_PUBLISH_CTA = "Publish now";

export const CONTENT_PLAN_ACTIONS = {
  menuLabel: "Article actions",
  generate: "Generate now",
  edit: "Edit",
  reschedule: "Reschedule",
  republish: "Republish",
  unpublish: "Unpublish",
  delete: "Delete",
} as const;

export const REPUBLISH = {
  title: "Republish article",
  description: "Push this article again, or move it to another connected platform.",
  platformLabel: "Publish to",
  removeLabel: "Remove from {platform}",
  removeHint:
    "The current live copy is deleted before publishing. Uncheck to keep both copies live.",
  samePlatformHint: "The live copy is replaced with the latest version.",
  cancel: "Cancel",
  confirm: "Republish",
} as const;

export const REPUBLISH_PLATFORM = "Shopify";
