import type { CamKey } from "../../core/stage";

export const TOTAL = 720;
export const INK = "#171310";
export const CORAL = "#E3705A";
export const CAPSULE_BLACK = "#1A1A1A";
export const CLAUDE_BG = "#FAF9F5";
export const UI_SCALE = 1.6;
export const UI = { w: 1200, h: 675 } as const;

export const HEADLINE = { words: [2, 5, 9], size: 96, y: 540, shiftAt: 24, gone: 40 } as const;

export const CAPSULE = { cx: 960, cy: 560, w: 1560, h: 820, radius: 44, rise: 26, riseLen: 24 } as const;
export const DIR = {
  scale: 0.9,
  pageX: 110,
  pageY: 70,
  titleAt: 44,
  subAt: 47,
  searchAt: 51,
  filtersAt: 54,
  gridAt: 56,
  gridStep: 1,
  gridOut: [64, 71] as const,
  typeFrom: 62,
  typeTo: 70,
  query: "ryze",
  cardAt: 76,
  descAt: 79,
  pillAt: 81,
  checkAt: 85,
  card: { x: 0, y: 330, w: 640, h: 140 },
  connect: { w: 132, h: 48 },
  connectedAt: 108,
  cursorClick: 108,
  cut: 116,
} as const;

export const CAM_A: readonly CamKey[] = [
  { at: 0, zoom: 1, x: 960, y: 540 },
  { at: 88, zoom: 1, x: 960, y: 540 },
  { at: 100, zoom: 2.2, x: 620, y: 590 },
  { at: 116, zoom: 2.32, x: 620, y: 590 },
];

export const WELCOME = { y: 208, composerY: 292, composerW: 760 } as const;
export const CHIP = { x: 548, y: 371, w: 118, h: 30, at: 120 } as const;
export const PROMPT = "Run my marketing this week.";
export const TYPE = { click: 132, from: 134, to: 162 } as const;
export const SEND = { hover: 166, press: 180, cut: 188 } as const;
export const CAM_B: readonly CamKey[] = [
  { at: 116, zoom: 1.25, x: 1184, y: 520 },
  { at: 134, zoom: 1.5, x: 1184, y: 560 },
  { at: 162, zoom: 1.55, x: 1184, y: 560 },
  { at: 174, zoom: 2.2, x: 1560, y: 600 },
  { at: 188, zoom: 2.3, x: 1560, y: 600 },
];

export const BLOCK_LEN = 82;
export const BLOCKS_FROM = 188;
export const BLOCKS = [
  { id: "ads", title: "Paid ads", rows: [["Pulling campaigns", "meta_ads__get_account_summary"], ["Building ad sets", "google_ads__run_raw_mutate"], ["Uploading creatives", "meta_ads__upload_image_from_url"]], answer: "Two campaigns are live on Meta and Google with fresh creatives." },
  { id: "creatives", title: "Creatives", rows: [["Reading brand", "brand__get_context"], ["Generating creatives", "creatives__generate"]], answer: "Six on-brand creatives, ready for the ad sets." },
  { id: "dashboards", title: "Dashboards", rows: [["Running report", "google_analytics__run_raw_report"], ["Search analytics", "google_search_console__run_raw_search_analytics"]], answer: "Clicks are up 38% week over week. Here is the dashboard." },
  { id: "seo", title: "SEO fixes", rows: [["Reading pages", "shopify__read"], ["Fixing meta", "shopify__edit_content"], ["Fixing headings", "shopify__edit_content"]], answer: "Fixed 14 issues across your top pages." },
  { id: "audit", title: "Audits", rows: [["Crawling site", "seo__page_audit"], ["Checking indexation", "google_search_console__get_indexation_summary"]], answer: "Technical audit done. Site health 92." },
] as const;
export const BLOCK = { rowStep: 7, rowsFrom: 4, statusAt: 26, streamFrom: 30, streamTo: 58, resultAt: 40, resultLen: 30 } as const;
export const CAM_BLOCK: readonly CamKey[] = [
  { at: 0, zoom: 1.26, x: 1184, y: 440 },
  { at: BLOCK_LEN, zoom: 1.34, x: 1184, y: 452 },
];

export const ORBIT = { from: 598, rx: 640, ry: 330, tilt: -4, spin: 0.55, cardW: 380, cardH: 250, flyLen: 18, step: 3, end: 672 } as const;

export const TAIL = { from: 672, dark: [672, 676] as const, lineAt: 680, line2At: 690, pillAt: 700, urlType: [702, 716] as const, url: "claude.ai/directory", end: 720 } as const;
