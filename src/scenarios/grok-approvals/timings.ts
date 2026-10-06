export const GROUND = "#0A0A0B";
export const INK = "#F1F1F3";
export const MUTED = "#9A9AA1";
export const GREEN = "#3CC26A";
export const AMBER = "#E0A030";
export const APP_SCALE = 0.92;

export const INTRO_OUT = 78;
export const CARRY_LEN = 8;
export const SIG_IN = INTRO_OUT + CARRY_LEN;

export type Source = { file: string; name: string };
export const SOURCES: Source[] = [
  { file: "integrations/meta-ads.svg", name: "Meta Ads" },
  { file: "integrations/google-ads.webp", name: "Google Ads" },
  { file: "integrations/google-search-console.svg", name: "Search Console" },
  { file: "integrations/shopify-color.svg", name: "Shopify" },
  { file: "integrations/google-analytics.svg", name: "GA4" },
];
export const SRC_X = 340;
export const SRC_Y = [240, 390, 540, 690, 840];
export const SRC_SIZE = 116;
export const HUB = { x: 960, y: 540, size: 150 };
export const CARD = { x: 1180, w: 700, h: 156 };
export const CARD_Y = [356, 540, 724];

export type Approval = { source: number; title: string; meta: string; body: string };
export const APPROVALS: Approval[] = [
  { source: 0, title: "Move $40/day to Retargeting", meta: "3.1× return over 7 days", body: "Retargeting is returning 3.1× over the last 7 days. Shift $40/day from Prospecting into it." },
  { source: 1, title: "Pause ad set at 2.4× CPA", meta: "Frequency 4.2, CTR halved", body: "Search · Brand Broad is at 2.4× your average CPA with frequency 4.2. Pause it and move the budget to exact match." },
  { source: 2, title: "Fix 12 pages losing rankings", meta: "After the core update", body: "12 pages dropped after the core update. Titles and content fixes are ready to publish and resubmit." },
];

export const HUB_AT = SIG_IN + 2;
export const SRC_AT = (i: number) => SIG_IN + 34 + i * 4;
export const LINES_AT = SIG_IN + 52;
export const LINES_LEN = 16;
export const PULSE_LEN = 14;
export const CARD_PULSE = [
  { leave: SIG_IN + 66, hub: SIG_IN + 80, card: SIG_IN + 96 },
  { leave: SIG_IN + 84, hub: SIG_IN + 98, card: SIG_IN + 114 },
  { leave: SIG_IN + 102, hub: SIG_IN + 116, card: SIG_IN + 132 },
];
export const AMBIENT_FROM = LINES_AT + 20;
export const AMBIENT_EVERY = 38;

export const GRAB = { cursorFrom: SIG_IN + 132, at: SIG_IN + 162, gatherLen: 22 };
export const PILE = { x: CARD.x + CARD.w / 2, y: CARD_Y[2] };
export const CARRY = { from: GRAB.at + GRAB.gatherLen, lift: { x: PILE.x, y: PILE.y + 40 }, land: GRAB.at + GRAB.gatherLen + 54 };
export const SLIDE = { at: CARRY.from + 6, len: 40 };
export const ICON = { x: 960, y: 540, size: 300, radius: 72 };
export const CAM_SIG: readonly { at: number; zoom: number; x: number; y: number; cut?: boolean }[] = [
  { at: 0, zoom: 1.45, x: HUB.x, y: HUB.y },
  { at: SIG_IN + 26, zoom: 1.45, x: HUB.x, y: HUB.y },
  { at: SIG_IN + 56, zoom: 1, x: 960, y: 540 },
  { at: CARD_PULSE[0].card - 6, zoom: 1, x: 960, y: 540 },
  { at: CARD_PULSE[0].card + 14, zoom: 1.12, x: 1060, y: 540 },
  { at: GRAB.at + GRAB.gatherLen + 10, zoom: 1.12, x: 1060, y: 540 },
];
export const LAND = { x: ICON.x, y: ICON.y };
export const ABSORB_LEN = 3;
export const BADGE_AT = CARRY.land;
export const EXPAND = { at: CARRY.land + 8, len: 24 };
export const APP = { x: 77, y: 43, w: 1766, h: 994, radius: 22 };
export const ROW_AT = EXPAND.at + EXPAND.len + 2;
export const CARD_AT = [ROW_AT, ROW_AT + 7, ROW_AT + 14];
export const CLICKS = [
  { index: 0, at: ROW_AT + 40 },
  { index: 1, at: ROW_AT + 58 },
  { index: 2, at: ROW_AT + 74 },
];
export const FILM_END = CLICKS[2].at + 20;
export const LOCKUP_AT = FILM_END;
export const LOCKUP_LEN = 112;
export const TAIL_BLINKS = [58, 80];
export const TOTAL = LOCKUP_AT + LOCKUP_LEN;
