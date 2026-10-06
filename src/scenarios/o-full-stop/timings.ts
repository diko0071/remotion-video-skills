export const BEAT = 15;
export const FS_TOTAL = 600;

export const STORM = { brakeFrom: 58, freeze: 70, dropFrom: 62, land: 75, calm: 95, tiltFrom: 80, tiltTo: 110 } as const;

export const GROOVE = 105;

export const SPLIT = { swell: 105, pop: 110, land: 120, bounce: 127.5, leave: 135 } as const;

export const PAN = { a: [135, 160], b: [248, 268], c: [342, 362] } as const;

export const CHART = {
  enter: 140,
  stomps: [165, 180, 195],
  punches: [172.5, 187.5, 202.5],
  toggles: [210, 217.5, 225],
  period: 232.5,
  cheer: 240,
  leave: 246,
} as const;

export const TERMS = {
  enter: 252,
  rows: [270, 285, 300, 315],
  skate: 6,
  kick: 8,
  period: 330,
  pill: 333,
  cheer: 337.5,
  leave: 341,
} as const;

export const STORE = {
  enter: 346,
  badges: [375, 382.5, 390, 397.5, 405, 412.5],
  more: 418,
  line: 435,
  on: [450, 465],
  off: [442.5, 457.5],
  merge: 480,
} as const;

export const PUSH = { from: 420, to: 495, zoom: 1.4 } as const;

export const END = { cut: 495, lead: 497, dot: 510, land: 525, wink: 543, blinks: [560, 584] } as const;

export const THUNKS = [STORM.land, END.land] as const;

export const kick = (f: number) => {
  if (f < GROOVE) return 0;
  const d = (f - GROOVE) % BEAT;
  return Math.exp(-d / 3);
};
export const STORM_TRIM = 0;
