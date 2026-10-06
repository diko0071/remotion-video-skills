import { measureText } from "@remotion/layout-utils";
import { toggleKnob, TOGGLE } from "../../kit/ad-objects";
import { SANS } from "../../kit/launch";
import { STATEMENT } from "./copy";
import { layoutLine, Line, textW } from "./measure";
import { CAP, X0, Y0 } from "./theme";

export const CARD = { w: 1040, r: 26 } as const;

export const CREW = { b: 104, p: 92, s: 76, t1: 76, t2: 74 } as const;

export const NUM = { size: 128, gap: 44 } as const;

const numW = (text: string, size: number) =>
  measureText({ text, fontFamily: SANS, fontSize: size, fontWeight: "800", letterSpacing: "-0.04em", fontVariantNumeric: "tabular-nums" }).width;

export const statement = (): Line => layoutLine(STATEMENT, X0, Y0);

export const CHART_CARD = { x: 2380, y: 300, h: 550 } as const;
export const CHART_VALUES = ["$80", "$64", "$47", "$31"] as const;
export const CHART_BASE = [0.3, 0.34, 0.29, 0.36, 0.55, 0.72, 0.86] as const;
export const CHART_FIXED = [0.3, 0.34, 0.29, 0.36, 0.26, 0.22, 0.19] as const;
export const SPIKE: readonly number[] = [4, 5, 6];
export const CHART_BOX = { x0: CHART_CARD.x + 44, x1: CHART_CARD.x + CARD.w - 44, top: CHART_CARD.y + 150, bottom: CHART_CARD.y + 380 } as const;
const SLOT = (CHART_BOX.x1 - CHART_BOX.x0) / CHART_BASE.length;
export const BAR = { w: SLOT * 0.58, r: 12 } as const;
export const TOGGLE_SCALE = 1.5;
export const AD_SETS = ["Fall scents", "Gift guide", "Lookalike 3%"] as const;

export const barTop = (i: number, q: number) => ({
  x: CHART_BOX.x0 + SLOT * (i + 0.5),
  y: CHART_BOX.bottom - (CHART_BASE[i] + (CHART_FIXED[i] - CHART_BASE[i]) * q) * (CHART_BOX.bottom - CHART_BOX.top),
});

export const chartNumber = () => {
  const right = CHART_CARD.x + CARD.w - 30;
  const w = numW("$80", NUM.size);
  return { right, left: right - w, w, baseline: CHART_CARD.y - NUM.gap, size: NUM.size };
};

export const toggleBox = (i: number) => ({ x: CHART_CARD.x + 44 + i * 330 + 196, y: CHART_CARD.y + 456 });

export const toggleSeat = (i: number, p: number, size: number) => {
  const box = toggleBox(i);
  const k = toggleKnob(p, TOGGLE_SCALE);
  return { x: box.x + k.x, y: box.y + k.y - (TOGGLE.knob * TOGGLE_SCALE) / 2 - size / 2 + 8 };
};

export const TERMS_CARD = { x: 4480, y: 300, h: 504 } as const;
export const TERM_ROWS = [
  { term: "candle making class", spend: "$118" },
  { term: "free candle samples", spend: "$104" },
  { term: "candlelight dinner near me", spend: "$97" },
  { term: "how to fix candle tunneling", spend: "$91" },
] as const;
export const TERM_SIZE = 34;
export const ROW = { top: TERMS_CARD.y + 130, h: 84, mid: 40 } as const;
export const TERMS_PILL_Y = (ROW.top + TERMS_CARD.y + TERMS_CARD.h) / 2;
export const WASTED = ["$410/day", "$308/day", "$205/day", "$103/day", "$0/day"] as const;
export const WASTED_SIZE = 112;

export const termW = (i: number) => textW(TERM_ROWS[i].term, TERM_SIZE);

export const wastedNumber = (k: number) => {
  const right = TERMS_CARD.x + CARD.w - 30;
  const w = numW(WASTED[k], WASTED_SIZE);
  return { right, left: right - w, w, baseline: TERMS_CARD.y - NUM.gap, size: WASTED_SIZE };
};

export const STORE_CENTER = { x: 7100, y: 555 } as const;
export const TILE = { scale: 0.85, w: 214, h: 271, gap: 24, count: 6 } as const;
export const PRODUCTS = [
  { name: "Amber Linen", img: "product-1.jpg" },
  { name: "Black Fig", img: "product-2.jpg" },
  { name: "Winter Pine", img: "product-3.jpg" },
  { name: "Fireside Trio", img: "hero-candles.jpg" },
  { name: "Cedar Smoke", img: "banner-candles.jpg" },
] as const;

const tileW = TILE.w * TILE.scale;
const tileH = TILE.h * TILE.scale;
const rowW = TILE.count * tileW + (TILE.count - 1) * TILE.gap;
export const GRID = {
  x: STORE_CENTER.x - rowW / 2,
  y: STORE_CENTER.y - tileH / 2,
  tw: tileW,
  th: tileH,
  w: rowW,
} as const;

export const tileBox = (i: number) => ({ x: GRID.x + i * (tileW + TILE.gap), y: GRID.y });

export const MERGE = 120;
export const mergeSeat = (size: number) => ({ x: STORE_CENTER.x, y: GRID.y - size / 2 - 40 });

export const badgeSeat = (i: number, size: number) => {
  const t = tileBox(i);
  return { x: t.x + 42 * TILE.scale, y: t.y + 230 * TILE.scale - size / 2 + 6 };
};

export const capTop = (baseline: number, size: number) => baseline - CAP * size;
