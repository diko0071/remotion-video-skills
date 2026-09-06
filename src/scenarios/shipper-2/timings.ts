export const TOTAL = 490;

export const SCRAMBLE = { from: 0, to: 15 } as const;
export const FLASH = { at: 11, len: 2 } as const;
export const TINT = { from: 15, to: 27 } as const;
export const CHIP_AT = 22;
export const CHIP = { fly: 8, settle: 14 } as const;
export const FOR_AT = 33;
export const ROLLER = { from: 38, step: 7, words: ["Design", "Marketing", "Business", "E-commerce", "SaaS", "Air-bnb", "Retail", "Advertising"] } as const;
export const BLOCKS = { from: 48, to: 84 } as const;
export const CUT_SAAS = 98;
export const MEME = { from: 100, shrinkAt: 131, to: 139 } as const;
export const CUT_COMPOSER = 139;
export const REVEAL = { from: 143, to: 158 } as const;
export const STROBE: ReadonlyArray<readonly [number, number]> = [[0, 4], [12, 16], [20, 24]];
export const TYPE = { from: 143, to: 180 } as const;
export const GREY_AT = 170;
export const CURSOR = { from: 146, park: 178, at: 204 } as const;
export const PUSH = { from: 180, to: 214 } as const;
export const FLIP = { at: 205, len: 14 } as const;
export const CUT_CHAIN = 219;
export const NODES = [
  { label: "Beautiful Interface", at: 219, w: 520, h: 560 },
  { label: "Analytics", at: 250, w: 620, h: 520 },
  { label: "Back-End", at: 278, w: 620, h: 520 },
  { label: "Media Library", at: 304, w: 440, h: 520 },
  { label: "Login", at: 328, w: 440, h: 520 },
  { label: "Payments", at: 350, w: 620, h: 340 },
] as const;
export const NODE_GAP = 820;
export const CUT_CROWD = 369;
export const CUT_END = 416;
export const END_SCRAMBLE = { from: 416, to: 434 } as const;

export const ORANGE = "#DA6B4F";
export const GREEN = "#1FA971";
export const INK = "#141414";
export const FLUID_ORANGE = ["#F3E4C9", "#E9A649", "#B5552B", "#6B4636", "#3D3A38"];
export const FLUID_GREY = ["#F2F2F2", "#A8A8A8", "#5A5A5A", "#262626", "#080808"];
export const ASCII_INK = ["#D9BE93", "#C6A063", "#AE8140", "#8E6529", "#6A481C", "#3E2A10"];
export const BLOCK_GREYS = ["#1C1C1C", "#7C7C7C", "#B9B9B9", "#E2E2E2"];
