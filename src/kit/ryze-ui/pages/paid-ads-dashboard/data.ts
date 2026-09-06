import {
  AccountRow,
  CampaignRow,
  Channel,
  Creative,
  Mover,
  PaidAdsKpi,
  PlatformLegendItem,
  BarsCardRow,
} from "./types";

export const GOOGLE_LOGO = "integrations/google-ads.webp";
export const META_LOGO = "integrations/meta-ads.svg";
export const TIKTOK_LOGO = "integrations/tiktok-ads.svg";

export const PAID_ADS_TABS = ["Overview", "Campaigns", "Creatives", "Portfolio View"];

export const PAID_ADS_PAGE_TITLE = "Dashboard";
export const PAID_ADS_PAGE_SUB =
  "Spend, results and what to do next across your ad platforms · Jul 14 – Aug 12 · updated 2 hours ago";

export const DAILY_SPEND = [
  498, 524, 530, 567, 574, 588, 540, 561, 608, 626, 584, 571, 597, 638, 660, 594,
  582, 626, 650, 668, 622, 588, 634, 676, 698, 628, 616, 662, 684, 718,
];
export const DAILY_CONV = [
  8, 9, 9, 11, 10, 12, 9, 10, 12, 13, 11, 10, 12, 13, 14, 11, 11, 12, 13, 14, 12,
  11, 12, 14, 15, 12, 12, 13, 14, 15,
];
export const DAILY_CLICKS = [
  672, 706, 714, 764, 774, 792, 728, 756, 820, 844, 788, 770, 806, 860, 890, 800,
  784, 844, 876, 900, 838, 792, 854, 912, 940, 846, 830, 892, 922, 968,
];
export const DAILY_IMPR = DAILY_CLICKS.map((c, i) => Math.round(c * (52 + (i % 7) * 1.4)));
export const DAILY_VALUE = DAILY_SPEND.map((s, i) =>
  Math.round(s * (3.02 + i * 0.028 + ((i % 3) - 1) * 0.06)),
);

export const DATE_LABELS = [
  "07/14", "07/15", "07/16", "07/17", "07/18", "07/19", "07/20", "07/21", "07/22",
  "07/23", "07/24", "07/25", "07/26", "07/27", "07/28", "07/29", "07/30", "07/31",
  "08/01", "08/02", "08/03", "08/04", "08/05", "08/06", "08/07", "08/08", "08/09",
  "08/10", "08/11", "08/12",
];

export const ROAS_SERIES = DAILY_SPEND.map(
  (s, i) => Math.round((DAILY_VALUE[i] / s) * 100) / 100,
);
export const CONV_RATE_SERIES = DAILY_CONV.map(
  (c, i) => Math.round((c / DAILY_CLICKS[i]) * 1000) / 10,
);
export const CTR_SERIES = DAILY_CLICKS.map(
  (c, i) => Math.round((c / DAILY_IMPR[i]) * 1000) / 10,
);
export const ROLLING_CPA = DAILY_SPEND.map((unused, i) => {
  const from = Math.max(0, i - 6);
  let spend = 0;
  let conv = 0;
  for (let j = from; j <= i; j += 1) {
    spend += DAILY_SPEND[j];
    conv += DAILY_CONV[j];
  }
  return Math.round((spend / conv) * 100) / 100;
});

export const SPEND_AXIS = ["$800", "$600", "$400", "$200", "$0"];
export const CONV_AXIS = ["18", "13", "9", "4", "0"];
export const CLICKS_AXIS = ["1.1K", "810", "540", "270", "0"];
export const SPLIT_CONV_AXIS = ["16", "12", "8", "4", "0"];

export const HOUR_LABELS = ["12a", "2a", "4a", "6a", "8a", "10a", "12p", "2p", "4p", "6p", "8p", "10p"];
export const DAY_LABELS = ["M", "T", "W", "T", "F", "S", "S"];

export const OVERVIEW_KPIS: PaidAdsKpi[] = [
  { label: "Spend", value: "$18,400.00", sub: "30-day total", delta: 12, goodWhenDown: true },
  { label: "Results", value: "312", sub: "194 Google · 101 Meta · 17 TikTok", delta: 19 },
  { label: "Best CPA", value: "$46.08", sub: "Google Ads" },
  { label: "Clicks", value: "24.2K", sub: "1.82% CTR" },
];

export const CAMPAIGNS_KPIS: PaidAdsKpi[] = [
  { label: "Active campaigns", value: "24 of 31", sub: "7 currently paused" },
  { label: "Best CPA", value: "$46.08", sub: "Google Ads" },
  { label: "Conversion rate", value: "1.4%", sub: "Google Ads · 194 of 13540 clicks" },
  { label: "Avg CPC", value: "$0.76", sub: "across all platforms" },
];

export const CHANNELS: Channel[] = [
  {
    name: "Google Ads",
    logo: GOOGLE_LOGO,
    spend: "$8,940.00",
    spendShare: 1,
    roas: "4.12x",
    roasShare: 1,
    convRate: "1.4%",
    convRateShare: 1,
    conversions: "194",
    conversionsShare: 1,
  },
  {
    name: "Meta",
    logo: META_LOGO,
    spend: "$7,120.00",
    spendShare: 0.8,
    roas: "3.05x",
    roasShare: 0.74,
    convRate: "1.1%",
    convRateShare: 0.79,
    conversions: "101",
    conversionsShare: 0.52,
  },
  {
    name: "TikTok",
    logo: TIKTOK_LOGO,
    spend: "$2,340.00",
    spendShare: 0.26,
    roas: "1.62x",
    roasShare: 0.39,
    convRate: "1.0%",
    convRateShare: 0.71,
    conversions: "17",
    conversionsShare: 0.09,
  },
];

export const MOVERS: Mover[] = [
  {
    campaign: "PMax — Signature Wicks (Prospecting)",
    logo: GOOGLE_LOGO,
    spend: "$3,140.00",
    dSpend: 31,
    conversions: 78,
    dCpa: -18,
  },
  {
    campaign: "Advantage+ Shopping — Autumn Collection",
    logo: META_LOGO,
    spend: "$2,480.00",
    dSpend: 22,
    conversions: 41,
    dCpa: -11,
  },
  {
    campaign: "Spark Ads — Candle pour ASMR",
    logo: TIKTOK_LOGO,
    spend: "$940.00",
    dSpend: null,
    isNew: true,
    conversions: 9,
    dCpa: null,
  },
  {
    campaign: "Search — Soy candle gift sets",
    logo: GOOGLE_LOGO,
    spend: "$860.00",
    dSpend: -21,
    conversions: 19,
    dCpa: -9,
  },
];

export const PLATFORM_COLORS = ["#CBD5E1", "#94A3B8", "#334155"];
export const PLATFORM_LEGEND: PlatformLegendItem[] = [
  { label: "Google Ads", color: PLATFORM_COLORS[0] },
  { label: "Meta", color: PLATFORM_COLORS[1] },
  { label: "TikTok", color: PLATFORM_COLORS[2] },
];

export const SPLIT_SPEND = DAILY_SPEND.map((s) => {
  const g = Math.round(s * 0.486);
  const m = Math.round(s * 0.387);
  return [g, m, s - g - m];
});
export const SPLIT_CONV = DAILY_CONV.map((c) => {
  const g = Math.round(c * 0.62);
  const m = Math.round(c * 0.32);
  return [g, m, Math.max(0, c - g - m)];
});

export const CAMPAIGNS: CampaignRow[] = [
  {
    campaign: "PMax — Signature Wicks (Prospecting)",
    logo: GOOGLE_LOGO,
    account: "Ember & Oak — Google Ads",
    active: true,
    spend: "$3,140.00",
    spendShare: 1,
    impressions: "214.8K",
    clicks: "4,120",
    ctr: "1.92%",
    cpc: "$0.76",
    conversions: 78,
    cpa: "$40.26",
  },
  {
    campaign: "Advantage+ Shopping — Autumn Collection",
    logo: META_LOGO,
    account: "Ember & Oak — Meta",
    active: true,
    spend: "$2,480.00",
    spendShare: 0.79,
    impressions: "268.4K",
    clicks: "3,540",
    ctr: "1.32%",
    cpc: "$0.70",
    conversions: 41,
    cpa: "$60.49",
  },
  {
    campaign: "Search — Soy candle gift sets",
    logo: GOOGLE_LOGO,
    account: "Ember & Oak — Google Ads",
    active: true,
    spend: "$2,210.00",
    spendShare: 0.7,
    impressions: "96.2K",
    clicks: "2,480",
    ctr: "2.58%",
    cpc: "$0.89",
    conversions: 52,
    cpa: "$42.50",
  },
  {
    campaign: "Meta Retargeting — Cart abandoners 7d",
    logo: META_LOGO,
    account: "Ember & Oak — Meta",
    active: true,
    spend: "$1,640.00",
    spendShare: 0.52,
    impressions: "122.5K",
    clicks: "1,880",
    ctr: "1.53%",
    cpc: "$0.87",
    conversions: 33,
    cpa: "$49.70",
  },
  {
    campaign: "Meta Prospecting — Lookalike 2% purchasers",
    logo: META_LOGO,
    account: "Ember & Oak — Meta",
    active: false,
    spend: "$1,640.00",
    spendShare: 0.52,
    impressions: "100.2K",
    clicks: "1,700",
    ctr: "1.70%",
    cpc: "$0.96",
    conversions: 8,
    cpa: "$205.00",
  },
  {
    campaign: "TikTok — Gift set collection",
    logo: TIKTOK_LOGO,
    account: "Ember & Oak — TikTok",
    active: false,
    spend: "$1,400.00",
    spendShare: 0.45,
    impressions: "75.0K",
    clicks: "640",
    ctr: "0.85%",
    cpc: "$2.19",
    conversions: 8,
    cpa: "$175.00",
  },
  {
    campaign: "Advantage+ — Holiday Gifting Broad",
    logo: META_LOGO,
    account: "Ember & Oak — Meta",
    active: true,
    spend: "$1,360.00",
    spendShare: 0.43,
    impressions: "118.9K",
    clicks: "1,420",
    ctr: "1.19%",
    cpc: "$0.96",
    conversions: 19,
    cpa: "$71.58",
  },
  {
    campaign: "Shopping — Candle accessories",
    logo: GOOGLE_LOGO,
    account: "Ember & Oak — Google Ads",
    active: true,
    spend: "$1,290.00",
    spendShare: 0.41,
    impressions: "88.4K",
    clicks: "1,510",
    ctr: "1.71%",
    cpc: "$0.85",
    conversions: 14,
    cpa: "$92.14",
  },
  {
    campaign: "Search — Brand | Ember & Oak",
    logo: GOOGLE_LOGO,
    account: "Ember & Oak — Google Ads",
    active: true,
    spend: "$1,180.00",
    spendShare: 0.38,
    impressions: "41.6K",
    clicks: "2,060",
    ctr: "4.95%",
    cpc: "$0.57",
    conversions: 44,
    cpa: "$26.82",
  },
  {
    campaign: "Demand Gen — Cozy Home Audiences",
    logo: GOOGLE_LOGO,
    account: "Ember & Oak — Google Ads",
    active: false,
    spend: "$1,120.00",
    spendShare: 0.36,
    impressions: "79.0K",
    clicks: "1,660",
    ctr: "2.10%",
    cpc: "$0.67",
    conversions: 6,
    cpa: "$186.67",
  },
  {
    campaign: "Spark Ads — Candle pour ASMR",
    logo: TIKTOK_LOGO,
    account: "Ember & Oak — TikTok",
    active: true,
    spend: "$940.00",
    spendShare: 0.3,
    impressions: "124.0K",
    clicks: "1,060",
    ctr: "0.85%",
    cpc: "$0.89",
    conversions: 9,
    cpa: "$104.44",
  },
];

export const CREATIVES: Creative[] = [
  {
    id: "c1",
    image: "ad-templates/p-f-candle-co_top-1-57d.jpg",
    platform: META_LOGO,
    title: "Autumn Collection — Signature Wicks",
    body: "Hand-poured soy candles, 60-hour burn. Free shipping over $60.",
    active: true,
    spend: "$1,240.00",
    ctr: "2.41%",
    cpc: "$0.68",
    results: "38",
  },
  {
    id: "c2",
    image: "ad-templates/otherland_top-2-107d.jpg",
    platform: META_LOGO,
    title: "Gift sets they actually keep",
    body: "Three scents, one box. Ships in 24 hours.",
    active: true,
    spend: "$980.00",
    ctr: "1.86%",
    cpc: "$0.74",
    results: "24",
  },
  {
    id: "c3",
    image: "ad-templates/boy-smells_top-5-32d.jpg",
    platform: META_LOGO,
    title: "Ember & Oak — Cedar + Smoke",
    body: "The scent our customers reorder most.",
    active: true,
    spend: "$860.00",
    ctr: "1.72%",
    cpc: "$0.81",
    results: "19",
  },
  {
    id: "c4",
    image: "ad-templates/homesick_top-1-22d.jpg",
    platform: META_LOGO,
    title: "Cozy season starts here",
    body: "Small-batch candles poured in Portland.",
    active: true,
    spend: "$720.00",
    ctr: "1.54%",
    cpc: "$0.79",
    results: "15",
  },
  {
    id: "c5",
    image: "ad-templates/crown-affair_top-1-11d.jpg",
    platform: TIKTOK_LOGO,
    title: "Candle pour ASMR",
    body: "Watch 200 candles get poured by hand.",
    active: true,
    spend: "$540.00",
    ctr: "0.94%",
    cpc: "$0.89",
    results: "6",
  },
  {
    id: "c6",
    image: "ad-templates/salt-stone_top-2-135d.jpg",
    platform: META_LOGO,
    title: "Cart abandoners — 10% back",
    body: "Still thinking it over? Your set is waiting.",
    active: true,
    spend: "$610.00",
    ctr: "2.08%",
    cpc: "$0.72",
    results: "17",
  },
  {
    id: "c7",
    image: "ad-templates/hem_top-2-39d.jpg",
    platform: META_LOGO,
    title: "The Wick Trimmer Bundle",
    body: "Everything you need to make a candle last.",
    active: false,
    spend: "$430.00",
    ctr: "1.12%",
    cpc: "$0.94",
    results: "7",
  },
  {
    id: "c8",
    image: "ad-templates/dedcool_top-8-29d.jpg",
    platform: TIKTOK_LOGO,
    title: "Gift set collection",
    body: "Three candles, wrapped and ready.",
    active: false,
    spend: "$380.00",
    ctr: "0.71%",
    cpc: "$2.19",
    results: "—",
  },
  {
    id: "c9",
    image: "ad-templates/blueland_top-1-78d.jpg",
    platform: META_LOGO,
    title: "Refill, don't rebuy",
    body: "Reusable vessels, refill packs at half price.",
    active: false,
    spend: "$290.00",
    ctr: "1.03%",
    cpc: "$1.02",
    results: "4",
  },
  {
    id: "c10",
    image: "ad-templates/caraway_top-7-52d.jpg",
    platform: META_LOGO,
    title: "Holiday Gifting Broad",
    body: "Sets from $38. Shipped before December 20.",
    active: false,
    spend: "$260.00",
    ctr: "0.96%",
    cpc: "$1.08",
    results: "3",
  },
];

export const TOP_HOOK_CREATIVE_ID = "c1";

export const ACCOUNTS: AccountRow[] = [
  {
    account: "Ember & Oak — Google Ads",
    logo: GOOGLE_LOGO,
    spend: "$8,940.00",
    spendValue: 8940,
    impressions: 520000,
    impressionsLabel: "520.0K",
    clicks: 13540,
    clicksLabel: "13,540",
    conversions: 194,
    cpa: "$46.08",
    cpaValue: 46,
    roas: "4.12x",
    roasValue: 4.12,
  },
  {
    account: "Ember & Oak — Meta",
    logo: META_LOGO,
    spend: "$7,120.00",
    spendValue: 7120,
    impressions: 610000,
    impressionsLabel: "610.0K",
    clicks: 8940,
    clicksLabel: "8,940",
    conversions: 101,
    cpa: "$70.50",
    cpaValue: 71,
    roas: "3.05x",
    roasValue: 3.05,
  },
  {
    account: "Ember & Oak — TikTok",
    logo: TIKTOK_LOGO,
    spend: "$2,340.00",
    spendValue: 2340,
    impressions: 199000,
    impressionsLabel: "199.0K",
    clicks: 1700,
    clicksLabel: "1,700",
    conversions: 17,
    cpa: "$137.65",
    cpaValue: 138,
    roas: "1.62x",
    roasValue: 1.62,
  },
  {
    account: "Ember & Oak Wholesale — Google Ads",
    logo: GOOGLE_LOGO,
    spend: "$0.00",
    spendValue: 0,
    impressions: 0,
    impressionsLabel: "0",
    clicks: 0,
    clicksLabel: "0",
    conversions: 0,
    cpa: "—",
    cpaValue: null,
    roas: "—",
    roasValue: null,
  },
];

export const SPEND_ROWS = ACCOUNTS.filter((a) => a.spendValue > 0);
export const ROAS_ROWS = [...ACCOUNTS]
  .filter((a) => a.roasValue !== null)
  .sort((a, b) => (b.roasValue ?? 0) - (a.roasValue ?? 0));
export const CPA_ROWS = [...ACCOUNTS]
  .filter((a) => a.cpaValue !== null)
  .sort((a, b) => (a.cpaValue ?? 0) - (b.cpaValue ?? 0));

export const SPEND_BAR_MAX = 8940;
export const ROAS_BAR_MAX = 4.12;
export const CPA_BAR_MAX = 138;

export const SPEND_BAR_ROWS: BarsCardRow[] = SPEND_ROWS.map((a) => ({
  label: a.account,
  value: a.spendValue,
  text: `$${a.spendValue.toLocaleString("en-US")}`,
}));

export const ROAS_BAR_ROWS: BarsCardRow[] = ROAS_ROWS.map((a) => ({
  label: a.account,
  value: a.roasValue ?? 0,
  text: `${a.roasValue}`,
}));

export const CPA_BAR_ROWS: BarsCardRow[] = CPA_ROWS.map((a) => ({
  label: a.account,
  value: a.cpaValue ?? 0,
  text: `$${a.cpaValue}`,
}));

export const OVERVIEW_COMBO_CHARTS = [
  { key: "spend", title: "Spend & ROAS", barLabel: "Cost", lineLabel: "ROAS" },
  {
    key: "conversions",
    title: "Conversions & rate",
    barLabel: "Conversions",
    lineLabel: "Conv. rate",
  },
  { key: "clicks", title: "Clicks & CTR", barLabel: "Clicks", lineLabel: "CTR" },
];

export const OVERVIEW_HEATMAPS = [
  { title: "ROAS by day & hour", note: "Last 30d", tone: "positive" as const },
  { title: "Spend by day & hour", note: "Last 30d", tone: "negative" as const },
];

export const CAMPAIGNS_CHART_TITLES = {
  conversions: "Daily conversions by platform",
  spend: "Daily spend by platform",
};

export const PORTFOLIO_BARS_HEADS = {
  spend: { title: "Spend by account", sub: "Top 20 · last 30 days" },
  roas: { title: "ROAS by account", sub: "Top 20 · conversion value / spend" },
  cpa: { title: "CPA by account", sub: "vs blended average · │ avg $58.97" },
};
