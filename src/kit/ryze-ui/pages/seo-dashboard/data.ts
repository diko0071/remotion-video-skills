import {
  ArticleRow,
  Brand,
  BucketRow,
  ChartSeries,
  CountryRow,
  CoverageRow,
  DualAxisChartSpec,
  EngineSpec,
  KpiSpec,
  LandingPageRow,
  MatrixRow,
  NamedSeries,
  PromptRow,
  TopDomainRow,
  TrafficEngine,
  TrafficRow,
} from "./types";
import { fmtCompact, fmtNumber } from "./types";

export const SCALE = ["#0F172A", "#334155", "#64748B", "#94A3B8", "#CBD5E1", "#E2E8F0"];

export const ENGINES: EngineSpec[] = [
  { key: "chat_gpt", label: "ChatGPT", icon: "ai/chatgpt.png", color: SCALE[0] },
  { key: "claude", label: "Claude", icon: "ai/claude.png", color: SCALE[3] },
  { key: "gemini", label: "Gemini", icon: "ai/gemini.png", color: SCALE[2] },
  { key: "perplexity", label: "Perplexity", icon: "ai/perplexity.webp", color: SCALE[4] },
];

export const AI_TRAFFIC_ENGINES: TrafficEngine[] = [
  { label: "ChatGPT", icon: "ai/chatgpt.png", color: SCALE[0] },
  { label: "Gemini", icon: "ai/gemini.png", color: SCALE[2] },
  { label: "Claude", icon: "ai/claude.png", color: SCALE[3] },
  { label: "Perplexity", icon: "ai/perplexity.webp", color: SCALE[4] },
];

export const FAVICONS: Record<string, string> = {
  "yankeecandle.com": "favicons/yankeecandle.com.png",
  "brooklyncandle.com": "favicons/brooklyncandle.com.png",
  "diptyqueparis.com": "favicons/diptyqueparis.com.png",
  "pfcandleco.com": "favicons/pfcandleco.com.jpg",
  "voluspa.com": "favicons/voluspa.com.png",
  "otherland.com": "favicons/otherland.com.png",
  "boysmells.com": "favicons/boysmells.com.jpg",
  "reddit.com": "favicons/reddit.com.png",
  "goodhousekeeping.com": "favicons/goodhousekeeping.com.png",
  "nytimes.com": "favicons/nytimes.com.png",
  "thespruce.com": "favicons/thespruce.com.png",
  "apartmenttherapy.com": "favicons/apartmenttherapy.com.png",
  "bhg.com": "favicons/bhg.com.png",
};

export const HEAD_SUB =
  "Live SEO performance across Search, Analytics, and connected stores. · Last synced 2 hours ago";

export const WEEK_LABELS = [
  "05-18", "05-25", "06-01", "06-08", "06-15", "06-22", "06-29", "07-06", "07-13",
  "07-20", "07-27", "08-03", "08-10",
];
export const WEEK_CLICKS = [2960, 3080, 3140, 3020, 3260, 3410, 3380, 3520, 3690, 3740, 3880, 4020, 4160];
export const WEEK_IMPR = [
  74200, 76800, 78100, 75600, 81200, 84400, 84000, 87500, 91800, 93400, 96900, 100400, 104200,
];

export const COUNTRIES: CountryRow[] = [
  { name: "United States", clicks: 8420 },
  { name: "United Kingdom", clicks: 2410 },
  { name: "Canada", clicks: 1690 },
  { name: "Australia", clicks: 1240 },
  { name: "Germany", clicks: 690 },
];
export const COUNTRY_TOTAL = 15671;

export const BUCKETS: BucketRow[] = [
  { label: "Top 3", count: 184, color: SCALE[0] },
  { label: "4-10", count: 421, color: SCALE[1] },
  { label: "11-20", count: 508, color: SCALE[2] },
  { label: "21+", count: 729, color: SCALE[4] },
];
export const BUCKET_TOTAL = 1842;

export const BRANDED = 3918;
export const NON_BRANDED = 11753;

export const BL_LABELS = [
  "25-09", "25-10", "25-11", "25-12", "26-01", "26-02", "26-03", "26-04", "26-05", "26-06",
  "26-07", "26-08",
];
export const BL_REF_DOMAINS = [118, 124, 131, 140, 149, 158, 166, 178, 189, 197, 206, 214];
export const BL_BACKLINKS = [640, 688, 731, 796, 848, 902, 966, 1058, 1147, 1244, 1372, 1480];

export const ANSWERS = 480;

export const BRANDS: Brand[] = [
  { domain: "yankeecandle.com", initials: "YC", pct: 41.5, sovPct: 32.6, answers: 199 },
  { domain: "brooklyncandle.com", initials: "BC", pct: 24.2, sovPct: 19.8, answers: 116 },
  { domain: "ember-and-oak.com", initials: "EO", pct: 22.9, sovPct: 18.4, answers: 110, own: true },
  { domain: "diptyqueparis.com", initials: "DP", pct: 16.5, sovPct: 12.1, answers: 79 },
  { domain: "pfcandleco.com", initials: "PF", pct: 13.3, sovPct: 8.4, answers: 64 },
  { domain: "voluspa.com", initials: "VO", pct: 10.2, sovPct: 5.9, answers: 49 },
  { domain: "otherland.com", initials: "OT", pct: 8.1, sovPct: 4.6, answers: 39 },
  { domain: "boysmells.com", initials: "BS", pct: 5.4, sovPct: 3.1, answers: 26 },
];

export const RUN_DATES = ["Jun 22", "Jun 29", "Jul 6", "Jul 13", "Jul 20", "Jul 27", "Aug 3", "Aug 10"];

export const VISIBILITY_SERIES: NamedSeries[] = [
  { name: "yankeecandle.com", color: "#94A3B8", values: [44.2, 43.8, 42.9, 43.5, 42.1, 41.9, 41.7, 41.5] },
  { name: "brooklyncandle.com", color: "#CBD5E1", values: [27.9, 27.1, 26.4, 26.8, 25.9, 25.2, 24.6, 24.2] },
  { name: "ember-and-oak.com", color: "#0F172A", values: [9.4, 11.2, 13.8, 15.1, 17.6, 19.4, 21.5, 22.9] },
];

export const MATRIX: MatrixRow[] = [
  { domain: "ember-and-oak.com", initials: "EO", own: true, values: [18, 34, 16, 23] },
  { domain: "yankeecandle.com", initials: "YC", values: [46, 38, 44, 38] },
  { domain: "brooklyncandle.com", initials: "BC", values: [27, 21, 24, 25] },
  { domain: "diptyqueparis.com", initials: "DP", values: [19, 14, 18, 15] },
  { domain: "pfcandleco.com", initials: "PF", values: [11, 16, null, 14] },
  { domain: "voluspa.com", initials: "VO", values: [9, 12, 8, 12] },
  { domain: "otherland.com", initials: "OT", values: [6, 9, 7, 11] },
];

export const TOP_DOMAINS: TopDomainRow[] = [
  { domain: "reddit.com", initials: "RE", usedPct: 34.6, avg: 2.4 },
  { domain: "yankeecandle.com", initials: "YC", usedPct: 28.1, avg: 1.8 },
  { domain: "goodhousekeeping.com", initials: "GH", usedPct: 21.7, avg: 1.5 },
  { domain: "nytimes.com", initials: "NY", usedPct: 18.3, avg: 1.3 },
  { domain: "thespruce.com", initials: "TS", usedPct: 16.9, avg: 1.6 },
  { domain: "brooklyncandle.com", initials: "BC", usedPct: 14.4, avg: 1.2 },
  { domain: "ember-and-oak.com", initials: "EO", usedPct: 12.5, avg: 1.4, own: true },
  { domain: "apartmenttherapy.com", initials: "AT", usedPct: 10.8, avg: 1.1 },
  { domain: "bhg.com", initials: "BH", usedPct: 9.2, avg: 1.2 },
  { domain: "diptyqueparis.com", initials: "DP", usedPct: 7.7, avg: 1.0 },
];

export const COVERAGE: CoverageRow[] = [
  { engine: ENGINES[0], named: 22, total: 120 },
  { engine: ENGINES[1], named: 41, total: 120 },
  { engine: ENGINES[2], named: 19, total: 120 },
  { engine: ENGINES[3], named: 28, total: 120 },
];

export const PROMPTS: PromptRow[] = [
  {
    text: "best hand poured soy candles for a living room",
    engines: [true, true, false, true],
    named: 3,
    total: 4,
    cited: 2,
    topBrand: "Ember & Oak",
  },
  {
    text: "which candle brands use clean fragrance oils",
    engines: [false, true, true, true],
    named: 2,
    total: 4,
    cited: 1,
    topBrand: "Yankee Candle",
  },
  {
    text: "candle gift sets under $50 that feel premium",
    engines: [true, true, null, true],
    named: 2,
    total: 3,
    cited: 1,
    topBrand: "Brooklyn Candle Studio",
  },
  {
    text: "are soy candles better than paraffin candles",
    engines: [false, true, false, false],
    named: 1,
    total: 4,
    cited: 0,
    topBrand: "Yankee Candle",
  },
  {
    text: "best non toxic candles for a nursery",
    engines: [false, true, false, true],
    named: 2,
    total: 4,
    cited: 1,
    topBrand: "Ember & Oak",
  },
  {
    text: "where to buy small batch candles online",
    engines: [true, true, true, true],
    named: 4,
    total: 4,
    cited: 3,
    topBrand: "Ember & Oak",
  },
  {
    text: "how long should a 8oz soy candle burn",
    engines: [false, false, false, false],
    named: 0,
    total: 4,
    cited: 0,
    topBrand: null,
  },
  {
    text: "luxury candle brands for a housewarming gift",
    engines: [false, true, false, true],
    named: 2,
    total: 4,
    cited: 1,
    topBrand: "Diptyque",
  },
  {
    text: "candle subscription boxes worth the money",
    engines: [false, false, null, true],
    named: 1,
    total: 3,
    cited: 0,
    topBrand: "Brooklyn Candle Studio",
  },
  {
    text: "wood wick vs cotton wick candles which burns cleaner",
    engines: [true, false, false, false],
    named: 1,
    total: 4,
    cited: 1,
    topBrand: "P.F. Candle Co.",
  },
];

export const AI_WEEKS = [
  "05-18", "05-25", "06-01", "06-08", "06-15", "06-22", "06-29", "07-06", "07-13", "07-20",
  "07-27", "08-03", "08-10",
];
export const AI_SERIES: ChartSeries[] = [
  { label: "ChatGPT", color: SCALE[0], values: [55, 64, 74, 84, 96, 107, 119, 139, 157, 176, 194, 186, 186] },
  { label: "Gemini", color: SCALE[2], values: [13, 14, 16, 17, 19, 22, 23, 26, 29, 32, 35, 41, 56] },
  { label: "Claude", color: SCALE[3], values: [7, 9, 10, 10, 12, 13, 14, 16, 17, 20, 22, 27, 41] },
  { label: "Perplexity", color: SCALE[4], values: [20, 22, 25, 26, 29, 32, 35, 39, 43, 48, 52, 67, 101] },
];

export const AI_TRAFFIC: TrafficRow[] = [
  { label: "ChatGPT", sessions: 742, icon: "ai/chatgpt.png", color: SCALE[0] },
  { label: "Perplexity", sessions: 268, icon: "ai/perplexity.webp", color: SCALE[4] },
  { label: "Gemini", sessions: 164, icon: "ai/gemini.png", color: SCALE[2] },
  { label: "Claude", sessions: 110, icon: "ai/claude.png", color: SCALE[3] },
];
export const AI_SESSIONS_TOTAL = 1284;

export const LANDING_PAGES: LandingPageRow[] = [
  { url: "/collections/gift-sets", byEngine: [118, 22, 41, 12] },
  { url: "/blog/soy-vs-paraffin-candles", byEngine: [96, 19, 32, 10] },
  { url: "/products/ember-signature-trio", byEngine: [74, 14, 26, 9] },
  { url: "/collections/non-toxic-candles", byEngine: [62, 12, 21, 8] },
  { url: "/blog/how-to-make-a-candle-last-longer", byEngine: [54, 11, 18, 7] },
  { url: "/", byEngine: [48, 9, 16, 7] },
  { url: "/collections/best-sellers", byEngine: [41, 8, 14, 6] },
  { url: "/blog/candle-care-guide", byEngine: [36, 7, 12, 5] },
  { url: "/products/oak-moss-amber-8oz", byEngine: [31, 6, 11, 5] },
  { url: "/pages/our-story", byEngine: [27, 6, 9, 4] },
  { url: "/blog/wood-wick-vs-cotton-wick", byEngine: [24, 5, 8, 4] },
  { url: "/collections/holiday", byEngine: [21, 4, 7, 3] },
  { url: "/products/cedar-vanilla-candle", byEngine: [18, 4, 6, 3] },
  { url: "/blog/housewarming-gift-ideas", byEngine: [16, 3, 5, 3] },
  { url: "/pages/scent-guide", byEngine: [14, 3, 5, 2] },
];
export const LP_ENGINE_COLORS = [SCALE[0], SCALE[3], SCALE[4], SCALE[2]];

export const PIPE_LABELS = [
  "05-26", "06-02", "06-09", "06-16", "06-23", "06-30", "07-07", "07-14", "07-21", "07-28",
  "08-04", "08-11",
];
export const PIPE_GENERATED = [4, 3, 5, 4, 6, 5, 6, 4, 7, 5, 6, 4];
export const PIPE_PUBLISHED = [2, 3, 3, 4, 4, 5, 4, 5, 5, 6, 5, 4];

export const ART_TRAFFIC_BARS = [
  4120, 4680, 5240, 5910, 6480, 7020, 7640, 8210, 8760, 9340, 9880, 10420,
];
export const ART_TRAFFIC_LINE = [96, 118, 142, 168, 194, 221, 248, 276, 302, 331, 358, 386];

export const ARTICLES: ArticleRow[] = [
  {
    title: "Soy vs paraffin candles: which burns cleaner",
    published: "06-04",
    clicks: "412",
    impressions: "11.4k",
    ctr: "3.6%",
    position: "8.2",
    delta: 84,
  },
  {
    title: "How to make a candle last longer (7 habits)",
    published: "06-11",
    clicks: "368",
    impressions: "9.8k",
    ctr: "3.8%",
    position: "9.1",
    delta: 61,
  },
  {
    title: "Candle care guide for hand poured soy candles",
    published: "06-18",
    clicks: "294",
    impressions: "8.6k",
    ctr: "3.4%",
    position: "11.4",
    delta: 42,
  },
  {
    title: "Wood wick vs cotton wick: the honest comparison",
    published: "06-25",
    clicks: "271",
    impressions: "7.9k",
    ctr: "3.4%",
    position: "12.0",
    delta: -18,
  },
  {
    title: "Housewarming gift ideas for candle lovers",
    published: "07-02",
    clicks: "246",
    impressions: "7.2k",
    ctr: "3.4%",
    position: "10.8",
    delta: 37,
  },
  {
    title: "Are non-toxic candles actually safer to burn",
    published: "07-09",
    clicks: "218",
    impressions: "6.4k",
    ctr: "3.4%",
    position: "13.6",
    delta: 24,
  },
  {
    title: "Scent guide: pairing candles with every room",
    published: "07-16",
    clicks: "184",
    impressions: "5.8k",
    ctr: "3.2%",
    position: "14.2",
    delta: 19,
  },
  {
    title: "Best candle gift sets under $50 in 2026",
    published: "07-23",
    clicks: "146",
    impressions: "4.9k",
    ctr: "3.0%",
    position: "15.7",
    delta: -9,
  },
  {
    title: "What burn time really tells you about a candle",
    published: "07-30",
    clicks: "98",
    impressions: "3.4k",
    ctr: "2.9%",
    position: "18.3",
    delta: 12,
  },
  {
    title: "Small batch candles: why pour size matters",
    published: "08-06",
    clicks: "54",
    impressions: "2.1k",
    ctr: "2.6%",
    position: "21.5",
    delta: 8,
  },
  {
    title: "Cedar and amber: building a warm autumn scent",
    published: "08-11",
    clicks: "Pending",
    pending: true,
    impressions: "—",
    ctr: "—",
    position: "—",
    delta: 0,
  },
];

export const COUNTRY_MAP_SRC = "analytics/clicks-by-country.svg";

export const SEO_KPIS: KpiSpec[] = [
  {
    label: "Impressions · 28 D",
    value: fmtCompact(406000),
    sub: "Times your site appeared in search",
    delta: 18.4,
  },
  {
    label: "Organic Clicks · 28 D",
    value: fmtCompact(15671),
    sub: "3.86% CTR",
    delta: 24.1,
  },
  { label: "Domain Rating", value: "41", sub: "Backlink authority (0-100)", delta: 12.5 },
  {
    label: "Health Score",
    value: "86",
    unit: "/100",
    sub: "From your latest technical audit",
    tone: "good",
  },
];

export const GEO_KPIS: KpiSpec[] = [
  { label: "AI answers naming you", value: "110 / 480" },
  { label: "AI Sessions · 28 D", value: fmtNumber(AI_SESSIONS_TOTAL), delta: 32.4 },
  { label: "Your site cited", value: "96 / 480" },
  { label: "LLM Optimization Score", value: "74", unit: "/100", tone: "good" },
];

export const CONTENT_KPIS: KpiSpec[] = [
  { label: "Published", value: "42" },
  { label: "Clicks · 30 D", value: fmtNumber(3180), delta: 41.2 },
  { label: "Impressions · 30 D", value: fmtCompact(96400), delta: 28.4 },
  { label: "Indexed & Ranking", value: "76%" },
];

export const SEARCH_PERFORMANCE_CHART: DualAxisChartSpec & {
  clicksColor: string;
  impressionsColor: string;
} = {
  clicksColor: SCALE[0],
  impressionsColor: SCALE[4],
  leftTicks: ["5.0k", "3.8k", "2.5k", "1.3k", "0"],
  rightTicks: ["120k", "90k", "60k", "30k", "0"],
  legend: [
    { label: "Clicks", color: SCALE[0] },
    { label: "Imps", color: SCALE[4] },
  ],
};

export const BRANDED_SPLIT_COLORS = { branded: SCALE[4], nonBranded: SCALE[1] };

export const AUTHORITY_BACKLINKS_CHART: DualAxisChartSpec & {
  left: NamedSeries;
  right: NamedSeries;
} = {
  left: { name: "Referring domains", color: SCALE[0], values: BL_REF_DOMAINS },
  right: { name: "Backlinks", color: SCALE[2], values: BL_BACKLINKS },
  leftTicks: ["240", "180", "120", "60", "0"],
  rightTicks: ["1600", "1200", "800", "400", "0"],
  legend: [
    { label: "Referring domains", color: SCALE[0] },
    { label: "Backlinks", color: SCALE[2] },
  ],
};

export const GEO_HERO_SPEC = {
  value: "18.4%",
  rank: "#3 of 24",
  rankSub: "brands named · 110 of 480 answers",
  brandCount: 7,
};

export const VISIBILITY_TREND_MAX = 50;

export const AI_CHATS_CHART = {
  ticks: ["400", "300", "200", "100", "0"],
  vw: 1240,
};

export const CONTENT_PIPELINE_CHART: DualAxisChartSpec & {
  generatedColor: string;
  publishedColor: string;
} = {
  generatedColor: SCALE[3],
  publishedColor: SCALE[0],
  leftTicks: ["8", "6", "4", "2", "0"],
  rightTicks: ["8", "6", "4", "2", "0"],
  legend: [
    { label: "Generated", color: SCALE[3] },
    { label: "Published", color: SCALE[0] },
  ],
};

export const ARTICLES_TRAFFIC_CHART: DualAxisChartSpec = {
  leftTicks: ["12k", "9k", "6k", "3k", "0"],
  rightTicks: ["400", "300", "200", "100", "0"],
  legend: [
    { label: "Impressions", color: SCALE[3] },
    { label: "Clicks", color: SCALE[0] },
  ],
};
