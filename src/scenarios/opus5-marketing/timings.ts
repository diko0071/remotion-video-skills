import type { CamKey } from "../../core/stage";

export const DARK = "#141413";
export const CREAM = "#F4F1EA";
export const MUTED = "#8C8A83";
export const CLAUDE_BG = "#FAF9F5";
export const PAPER = "#FDFAF3";
export const INK = "#171310";
export const GOLD = "#C19767";
export const CORAL = "#D97757";
export const GREEN = "#2FA36B";
export const UI_SCALE = 1.6;
export const UI = { w: 1200, h: 675 } as const;
export const FAVICON = "claude/favicon-ryze.png";

export const HOOK = { words: [2, 6, 10, 14], line2: [30, 34, 38], out: [60, 70] as const } as const;

export const CHAT = {
  from: 66,
  top: 80,
  w: 1400,
  h: 800,
  userAt: 68,
  userText: "Launch my spring campaign on Meta.",
  refusals: ["I can't access your ad account.", "Please paste this into Ads Manager.", "I can't see your sales data.", "I can't launch campaigns."],
  refusalFrom: 84,
  refusalStep: 9,
  rowTop: 150,
  rowStep: 94,
  rowH: 76,
  whyAt: 126,
  whyText: "Why did you stop?",
  trashAt: 138,
  trash: { x: 960, y: 972, size: 120 },
  flyFrom: 150,
  flyStep: 5,
  flyLen: 13,
  out: [184, 212] as const,
} as const;

export const REVEAL = {
  from: 212,
  introAt: 208,
  introOut: [240, 250] as const,
  curtainFrom: 244,
  bars: 30,
  titleAt: 254,
  subAt: 274,
  withAt: 290,
  cut: 330,
} as const;

export const WELCOME = { from: 330, y: 208, composerY: 292, composerW: 760 } as const;
export const PROMPT = "Launch a spring campaign on Meta for our best sellers. $3k budget.";
export const TYPE = { click: 370, from: 372, to: 432 } as const;
export const SEND = { hover: 434, press: 446, cut: 454 } as const;
export const CAM_W: readonly CamKey[] = [
  { at: 330, zoom: 1.25, x: 1184, y: 540 },
  { at: 336, zoom: 1.25, x: 1184, y: 540 },
  { at: 348, zoom: 2.9, x: 1588, y: 618 },
  { at: 368, zoom: 3.05, x: 1588, y: 618 },
  { at: 369, zoom: 1.45, x: 1184, y: 566, cut: true },
  { at: 432, zoom: 1.52, x: 1184, y: 566 },
  { at: 442, zoom: 2.2, x: 1754, y: 660 },
  { at: SEND.cut, zoom: 2.3, x: 1754, y: 660 },
];

export const THREAD = {
  from: SEND.cut,
  rows: [
    ["Reading store", "shopify__read_products"],
    ["Checking sales", "google_analytics__run_raw_report"],
    ["Studying winning ads", "meta_ads__search_ad_library"],
    ["Generating creatives", "creatives__generate"],
    ["Building ad sets", "meta_ads__create_campaign"],
  ] as const,
  rowsFrom: 2,
  rowStep: 6,
  statusAt: 46,
  status: "Campaign ready",
  streamFrom: 50,
  streamTo: 86,
  answer: "Your two best sellers bring 64% of revenue. I built three ad sets around them and made five creatives from what already sells.",
  creativesAt: 70,
  panelAt: 104,
  clickAt: 142,
  liveAt: 144,
  askAt: 170,
  ask: "Wait, it actually launched it?",
  replyFrom: 184,
  replyTo: 222,
  reply: "Yes. It's live on Meta. I'll check it every morning and move budget to the ads that sell.",
  len: 240,
} as const;

export const CREATIVES: string[] = [
  "ad-templates/crown-affair_top-1-11d.jpg",
  "ad-templates/crown-affair_top-9-3d.jpg",
  "ad-templates/crown-affair_top-7-8d.jpg",
  "ad-templates/crown-affair_top-10-2d.jpg",
  "ad-templates/crown-affair_top-8-7d.jpg",
];

export const CAM_T: readonly CamKey[] = [
  { at: 0, zoom: 1.75, x: 1184, y: 250 },
  { at: 24, zoom: 1.75, x: 1184, y: 290 },
  { at: 50, zoom: 1.76, x: 1184, y: 420 },
  { at: 72, zoom: 1.78, x: 1184, y: 600 },
  { at: 106, zoom: 1.8, x: 1184, y: 800 },
  { at: 150, zoom: 1.82, x: 1184, y: 900 },
  { at: 180, zoom: 1.83, x: 1184, y: 1060 },
  { at: THREAD.len, zoom: 1.85, x: 1184, y: 1100 },
];

export const CASES_FROM = THREAD.from + THREAD.len;
export const CASES = [
  { label: "Ad spend spike", logo: "integrations/meta-ads.svg", msg: "Meta spend is 2.3x your daily cap and ROAS fell to 1.4. Pause the two weakest ad sets?", reply: "Pause them", done: "Paused 2 ad sets. Saved $1,840 today.", len: 96 },
  { label: "Competitor launch", logo: "integrations/meta-ads.svg", msg: "Your top competitor started 12 new ads this morning, all on free shipping.", reply: "Answer it", done: "3 free-shipping creatives are live.", len: 84 },
  { label: "Traffic drop", logo: "integrations/google-search-console.svg", msg: "Clicks on /collections/linen fell 31% after a title change.", reply: "Fix it", done: "Title restored. Recrawl requested.", len: 74 },
];
export const CASE = { labelAt: -4, cardAt: -2, msgFrom: 8, msgSpan: 22, replyAt: 0.46, doneAt: 0.62 } as const;
export const CASES_LEN = CASES.reduce((s, c) => s + c.len, 0);

export const PROOF_FROM = CASES_FROM + CASES_LEN;
export const PROOF = { countStart: 800, countFrom: 4, countTo: 30, subAt: 16, beat2: 62, len: 124 } as const;

export const CLOSE_FROM = PROOF_FROM + PROOF.len;
export const CLOSE_LEN = 112;
export const TOTAL = CLOSE_FROM + CLOSE_LEN;
