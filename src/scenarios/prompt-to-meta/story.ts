export const PROMPT = ["Find what's winning in my niche.", "Make 6 new ads.", "Launch them on Meta."] as const;

export const PROMPT_TRACK = -0.005;

export const PROMPT_EM = [
  14.722 + PROMPT_TRACK * 32,
  7.687 + PROMPT_TRACK * 15,
  10.331 + PROMPT_TRACK * 20,
] as const;

export const HERO = { verb: "Refresh", rest: "your Meta ads", verbEm: 3.7377, restEm: 6.8097, fontSize: 64, top: 290 } as const;

export const WINNERS = [
  {
    src: "winners/w1.jpg",
    brand: "Liquid Death",
    domain: "liquiddeath.com",
    host: "amazon.com",
    days: 150,
    headline: "You won't believe it's not soda.",
    body: "90% less sugar than top sodas (non-diet)*",
  },
  {
    src: "winners/w2.jpg",
    brand: "Poppi",
    domain: "drinkpoppi.com",
    host: "drinkpoppi.com",
    days: 142,
    headline: "",
    body: "the best way to relax and unwind? with poppi of course",
  },
  {
    src: "winners/w3.jpg",
    brand: "Graza",
    domain: "graza.co",
    host: "graza.co",
    days: 114,
    headline: "Crazy Fresh Extra Virgin Olive Oil",
    body: "It's official, we're the OFFICIAL Olive Oil of NASCAR!",
  },
  {
    src: "winners/w4.jpg",
    brand: "Brightland",
    domain: "brightland.co",
    host: "brightland.co",
    days: 101,
    headline: "Shop before it sells out",
    body: "After selling out 2x, Castelvetrano Olive Oil is joined by Kalamata.",
  },
] as const;

export const CREATIVES = [
  { id: "c1", copy: "Picnic upgrade: unlocked." },
  { id: "c2", copy: "Smoked salmon, but make it gold." },
  { id: "c3", copy: "POV: you finally tried tinned fish." },
  { id: "c4", copy: "Back in stock. Not for long." },
  { id: "c5", copy: "Lunch in Lisbon. No flight needed." },
  { id: "c6", copy: "Date night, sorted." },
] as const;

export const MOSAIC_LEVELS = 6;

export const CAMPAIGN_FIELDS = [
  { label: "Campaign name", value: "Fishwife · Summer tins" },
  { label: "Objective", value: "Sales" },
  { label: "Daily budget", value: "$150" },
  { label: "Audience", value: "Advantage+ · United States" },
  { label: "Placements", value: "placements" },
] as const;

export const BAR = {
  top: 26,
  height: 72,
  fontSize: 24,
  iconSize: 22,
  iconGap: 10,
  segGap: 36,
  padX: 30,
  headSize: 24,
  headEm: 2.6405,
  countSize: 20,
  countW: 40,
  headGap: 12,
  divGap: 24,
} as const;

const segWidths = PROMPT_EM.map((em) => BAR.iconSize + BAR.iconGap + em * BAR.fontSize);
const headWidth = BAR.headEm * BAR.headSize + BAR.headGap + BAR.countW + BAR.divGap * 2 + 1.5;
const barContent = headWidth + segWidths.reduce((a, b) => a + b, 0) + BAR.segGap * (PROMPT.length - 1);
export const BAR_WIDTH = Math.round(barContent + BAR.padX * 2);
export const BAR_LEFT = 960 - BAR_WIDTH / 2;
export const BAR_DIVIDER_X = BAR_LEFT + BAR.padX + headWidth - BAR.divGap - 1.5;

export const barSegments = segWidths.map((_, i) => {
  const before = segWidths.slice(0, i).reduce((a, b) => a + b, 0) + BAR.segGap * i;
  const iconLeft = BAR_LEFT + BAR.padX + headWidth + before;
  return { iconLeft, textLeft: iconLeft + BAR.iconSize + BAR.iconGap };
});

export const COMPOSER = {
  left: 440,
  top: 400,
  width: 1040,
  height: 330,
  padX: 52,
  padTop: 46,
  fontSize: 44,
  lineStep: 60,
  radius: 36,
  button: 58,
} as const;

export const WALL = {
  cols: 12,
  rows: 8,
  w: 200,
  h: 250,
  pitchX: 220,
  pitchY: 270,
  cx: 960,
  cy: 560,
  scroll: 1000,
} as const;

export const CARD = {
  w: 316,
  mediaH: 395,
  pad: 19,
  headline: 21.6,
  body: 17.6,
  footer: 50,
  pitch: 334,
  mediaY: 520,
} as const;

export const GRID = { w: 316, h: 395, colX: [616, 960, 1304], rowY: [398, 822] } as const;

export const PANEL = { left: 240, top: 150, width: 1440, height: 716, header: 80 } as const;

export const THUMB = { w: 180, h: 225, colX: [1002, 1226, 1450], rowY: [398, 676] } as const;

export const APPROVAL = { cx: 960, top: 892, width: 940, height: 78 } as const;

export const PHONE = { cx: 1060, cy: 648, w: 430, h: 872, bezel: 14 } as const;
