export const TOTAL = 938;

export const LIGHT = "#F2F2F2";
export const INK = "#111111";
export const MUTED = "#8A8A8A";
export const LINE = "#2A2A2A";
export const GREEN = "#34C759";
export const BLUE = "#1D9BF0";

export const BRAND = "Numbers";
export const NUMBER = "3555-0162";
export const TYPED = "3545-0169";

export const TITLE = {
  end: 135,
  firstWord: "Say hello to",
  typeFrom: 1,
  typeTo: 26,
  deleteFrom: 49,
  deleteTo: 66,
  markAt: 68,
  nameFrom: 70,
  nameTo: 86,
  fontSize: 92,
  creep: [0, 120, 1, 1.1] as const,
  tilt: [30, 68, 86, -38, -6] as const,
  collapse: { at: 120, eat: 128, swell: [127, 135] as const },
  rings: [
    { r: 195, dash: false, spin: 0 },
    { r: 345, dash: true, spin: 0.25 },
    { r: 520, dash: true, spin: -0.16 },
    { r: 740, dash: true, spin: 0.1 },
  ],
} as const;

export const DOTS = {
  from: 131,
  end: 187,
  cx: 960,
  pitchX: 154,
  pitchY: 135,
  top: 344,
  size: 79,
  popFrom: 129,
  popStep: 1.3,
  morph: [168, 180] as const,
  grow: [178, 187] as const,
} as const;

export const CARD = {
  from: 180,
  end: 252,
  rect: { x: 321, y: 420, w: 1281, h: 231 },
  digitSize: 82,
  rollFrom: 183,
  settleFrom: 190,
  settleStep: 2,
  guides: [279, 798],
  exit: [242, 252] as const,
} as const;

export const PHONE_LIGHT = {
  from: 250,
  end: 487,
  rise: [246, 264] as const,
  chipGlow: 276,
  menuOpen: [283, 292] as const,
  lens: [300, 318] as const,
  rowInsert: 336,
  labelFrom: 338,
  labelTo: 348,
  press: [360, 372] as const,
  menuExit: [374, 384] as const,
  sheetUp: [372, 380] as const,
  rollFrom: 388,
  settleFrom: 398,
  toggle: [426, 440] as const,
  dot: { at: 458, grow: [462, 487] as const },
} as const;

export const PHONE_DARK = {
  from: 487,
  end: 822,
  enterPress: 518,
  sheetUp: [520, 534] as const,
  presses: [566, 580, 605, 617, 630, 641, 652, 662] as const,
  sheetDown: [668, 688] as const,
  success: 690,
  scrollUp: [712, 748] as const,
  sent: 754,
  reply: 776,
  whiteDot: { at: 800, grow: [802, 822] as const },
} as const;

export const END = {
  from: 821,
  shrink: [818, 880] as const,
  bare: 881,
  wipe: [900, 916] as const,
  disc: { r0: 330, r1: 220 },
  mark0: 140,
  mark1: 228,
  black: 937,
} as const;
