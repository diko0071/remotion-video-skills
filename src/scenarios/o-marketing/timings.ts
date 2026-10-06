export const FPS = 30;
export const O_TOTAL = 660;

export const SHOTS = {
  metaPanic: { from: 0, len: 30 },
  gadsPanic: { from: 30, len: 26 },
  shopPanic: { from: 56, len: 24 },
  gaPanic: { from: 80, len: 20 },
  chaos: { from: 100, len: 125 },
  oClose: { from: 225, len: 45 },
  lines: { from: 270, len: 60 },
  metaFix: { from: 330, len: 35 },
  gadsFix: { from: 365, len: 30 },
  shopFix: { from: 395, len: 25 },
  cascade: { from: 420, len: 150 },
  end: { from: 570, len: 90 },
} as const;

export const T = {
  oFall: 150,
  oLand: 162,
  look: 176,
  gazeCut: 195,
  slap: 244,
  linesFrom: 274,
  linesStep: 5,
  metaFix: 344,
  gadsFix: 376,
  shopFix: 404,
  cascadeFix: [426, 432, 438],
  oHappy: 442,
  ringFrom: 480,
  ringTo: 516,
  hops: [522, 536],
  wink: 548,
  url: 569,
} as const;

export const HEAD_STARTS = [-8, 150, 270, 330, 480] as const;
export const HEAD_ENDS = [150, 270, 330, 480, 570] as const;
