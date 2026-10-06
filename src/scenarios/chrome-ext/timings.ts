import type { CamKey } from "../../core/stage";
import type { ExtSchedule, ExtTabSchedule } from "../../kit/ext-ui";
import { EXT_ICON } from "../../kit/chrome-ui";

export const GROUND = "#FDFDFD";
export const INK = "#171310";
export const MUTED = "#8A847A";
export const CORAL = "#C15F3C";
export const ORANGE = "#F2A008";
export const PINK = "#E82D99";
export const GREEN = "#27C153";
export const BLUE = "#1AADF5";

export const BADGE_AT = 30;
export const CURSOR_IN = 40;
export const CLICK = 84;
export const OPEN_LEN = CLICK + 58;
export const TITLE = { at: CLICK + 14, sub: CLICK + 15, line: CLICK + 20 } as const;
export const ICON_RECT = { x: EXT_ICON.x - 12, y: EXT_ICON.y - 12, w: 24, h: 24, radius: 6 } as const;

export const CAM: readonly CamKey[] = [
  { at: 0, zoom: 1, x: 960, y: 540 },
  { at: 30, zoom: 1.03, x: 980, y: 525 },
  { at: CLICK, zoom: 2.6, x: 1920 - 960 / 2.6, y: 540 / 2.6 },
  { at: CLICK + 2, zoom: 2.6, x: 1920 - 960 / 2.6, y: 540 / 2.6 },
  { at: OPEN_LEN, zoom: 1, x: 960, y: 540 },
];

export const PANEL = { w: 440, h: 1056, scale: 1.4 } as const;
export const PANEL_X = (1920 - PANEL.w * PANEL.scale) / 2;
export const DOCKED = { x: 1468, y: 12 } as const;
export const GAUGE_IN_PANEL = { x: 108, y: 196, size: 96 } as const;
export const LIST_IN_PANEL = { x: 28, y: 396, w: 408 } as const;
export const HERO_TILE_IN_PANEL = { x: 84, y: 176, size: 56 } as const;
export const HBAR_TILE_IN_PANEL = { x: 60, y: 428, step: 44, size: 32 } as const;

export const OV = {
  len: 338,
  headOut: 0,
  answers: [
    { q: "best all-in-one workspace for a startup?", a: "Notion is the usual pick: docs, wikis and project boards in one place, with a generous free plan for small teams.", page: "notion.so/product", at: 2, type: 30 },
    { q: "where can i find templates for free?", a: "Notion's template gallery has thousands of free templates for planners, wikis and trackers.", page: "notion.so/templates", at: 72, type: 20 },
    { q: "is there a better app than trello?", a: "Notion combines boards, docs and databases, so many teams switch from Trello.", page: "notion.so/pricing", at: 128, type: 0 },
    { q: "what is the weakness of monday com?", a: "Docs and notes are thin, which is why teams pair it with Notion.", page: "notion.so/help", at: 164, type: 0 },
    { q: "what do influencers use to create reels?", a: "Most plan content in a Notion calendar, then edit in CapCut.", page: "notion.so/calendar", at: 200, type: 0 },
  ],
  gather: 236,
  ring: 244,
  ringCount: 22,
  ringPos: { x: 960, y: 520, size: 420 },
  panelIn: 268,
  panelTop: 40,
  land: 272,
  landLen: 26,
} as const;

export const OV_SCHEDULE: ExtSchedule = {
  head: 0, tabs: 0, rating: 0, gauge: OV.land + OV.landLen + 2, metrics: OV.land + 20,
  rows: [OV.land + 26, OV.land + 33, OV.land + 40],
  analyze: 9999, chatgpt: 9999, scroll1: 9999, aio: 9999, scroll2: 9999, brand: 9999, explore: 9999,
};


export const SR = {
  len: 230,
  headOut: 40,
  field: 58,
  step: 9,
  orbit: { cx: 960, cy: 520, r: 340, hub: 150, tile: 120 },
  carry: 140,
  carryLen: 26,
  panelIn: 138,
  panelTop: 40,
  tab: 146,
  list: 166,
  overviewAt: 204,
  dock: { at: 208, len: 22 },
} as const;
export const SR_SCHEDULE: ExtTabSchedule = { tabAt: SR.tab, hero: SR.tab + 6, stats: SR.tab + 10, list: SR.list };

export const AS = {
  slide: 4,
  sites: ["hubspot.com", "clickup.com", "stripe.com", "shopify.com", "figma.com", "loom.com", "webflow.com", "zapier.com", "asana.com", "mailchimp.com", "monday.com", "slack.com", "vercel.com", "trello.com", "intercom.com", "calendly.com", "canva.com"],
  holds: [14, 12, 11, 10, 9, 8, 7, 6, 6, 5, 5, 4, 4, 4, 3, 3, 8],
  slideLen: 20,
  finalLen: 34,
  lockupLen: 112,
} as const;
export const AS_SITES_END = AS.holds.reduce((a, b) => a + b, 0);
export const AS_FINAL = AS_SITES_END + AS.slideLen;
export const GAUGE_DOCKED = { x: 1468 + 108, y: 12 + 196 } as const;

export const CUT = { open: 0, overview: OPEN_LEN, sources: OPEN_LEN + OV.len, anysite: OPEN_LEN + OV.len + SR.len } as const;
export const AS_LOCKUP = AS_FINAL + AS.finalLen;
export const TOTAL = CUT.anysite + AS_LOCKUP + AS.lockupLen;
