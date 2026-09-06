import { BacklinkKpi, BacklinkRow, BacklinkTab, RefBacklinkRow } from "./types";

export const BACKLINK_ROWS: BacklinkRow[] = [
  {
    text: '"Small-batch candle maker Ember & Oak launches three autumn scents"',
    url: "https://www.digitaljournal.com/pr/news/ember-and-oak-autumn-collection",
    extra: 6,
    published: "Aug 11, 2026",
    status: "published",
  },
  {
    text: '"hand-poured soy candles"',
    url: "https://www.apartmenttherapy.com/hand-poured-soy-candles-guide",
    published: "Aug 9, 2026",
    status: "published",
  },
  {
    text: '"Why wood wicks crackle: a maker\'s guide to slow evenings at home"',
    url: "https://www.hunker.com/13789021/why-wood-wick-candles-crackle",
    published: "Aug 7, 2026",
    status: "published",
  },
  {
    text: '"clean-burning candle guide"',
    url: "https://www.thespruce.com/clean-burning-candles-8402117",
    published: "Aug 4, 2026",
    status: "published",
  },
  {
    text: '"Ember & Oak reports a third straight year of small-batch growth"',
    url: "https://www.benzinga.com/pressreleases/ember-and-oak-growth-2026",
    extra: 4,
    published: "Jul 30, 2026",
    status: "published",
  },
  {
    text: '"candle gift sets under $50"',
    url: "https://www.brit.co/best-candle-gift-sets-under-50",
    published: "Jul 26, 2026",
    status: "published",
  },
  {
    text: '"The five-minute candle care ritual that doubles burn time"',
    url: "",
    published: "",
    status: "scheduled",
  },
  {
    text: '"How to scent a 500 sq ft apartment without overwhelming it"',
    url: "",
    published: "",
    status: "in_progress",
  },
  {
    text: '"Soy wax vs paraffin: what clean burn actually means"',
    url: "",
    published: "",
    status: "drafted",
  },
  {
    text: '"Ember & Oak opens its Portland studio to workshop nights"',
    url: "",
    published: "",
    status: "planned",
  },
];

export const BACKLINK_KPIS: BacklinkKpi[] = [
  { label: "This month", value: "6" },
  { label: "Press", value: "4" },
  { label: "Guest Post", value: "6" },
  { label: "Backlinks", value: "34" },
];

export const BACKLINK_TABS: BacklinkTab[] = [
  { label: "All", count: 10, active: true },
  { label: "Press", count: 4 },
  { label: "Guest Post", count: 6 },
  { label: "Backlinks", count: 34 },
];

export const BACKLINKS_TITLE = "Mentions";

export const BACKLINKS_SUB = "Press placements and guest posts";

export const PLACEMENT_DOMAINS = [
  "digitaljournal.com",
  "benzinga.com",
  "streetinsider.com",
  "marketersmedia.com",
  "menafn.com",
  "wicz.com",
  "wboc.com",
];

export const REF_BACKLINK_ROWS: RefBacklinkRow[] = [
  {
    url: "apartmenttherapy.com/hand-poured-soy-candles-guide",
    page: "/blogs/journal/best-soy-candles-small-apartments",
    product: "Amber Jar Trio",
    keyword: "hand-poured soy candles",
    anchor: "hand-poured soy candles",
    status: "published",
  },
  {
    url: "thespruce.com/clean-burning-candles-8402117",
    page: "/blogs/journal/clean-burning-candles-checklist",
    product: "Signature Soy Collection",
    keyword: "clean burning candles",
    anchor: "clean-burning candle guide",
    status: "published",
  },
  {
    url: "hunker.com/13789021/why-wood-wick-candles-crackle",
    page: "/blogs/journal/wood-wick-vs-cotton-wick",
    product: "Wood Wick Series",
    keyword: "wood wick candles",
    anchor: "why wood wicks crackle",
    status: "published",
  },
  {
    url: "brit.co/best-candle-gift-sets-under-50",
    page: "/blogs/journal/candle-gift-sets-under-50",
    product: "Gift Sets",
    keyword: "candle gift sets",
    anchor: "candle gift sets under $50",
    status: "published",
  },
  {
    url: "bobvila.com/articles/how-long-do-candles-burn",
    page: "/blogs/journal/how-long-do-hand-poured-candles-burn",
    product: "Amber Jar Trio",
    keyword: "candle burn time",
    anchor: "how long hand-poured candles burn",
    status: "published",
  },
  {
    url: "mydomaine.com/cozy-autumn-living-room-scents",
    page: "/blogs/journal/best-candle-scents-autumn",
    product: "Autumn Collection",
    keyword: "autumn candle scents",
    anchor: "cozy autumn scents",
    status: "lost",
  },
];
