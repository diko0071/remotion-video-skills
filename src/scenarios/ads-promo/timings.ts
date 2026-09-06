export const STAGE_W = 640;
export const STAGE_H = 640;
export const CELL = 196;
export const GRID_GAP = 16;
export const GRID_X = (STAGE_W - (CELL * 3 + GRID_GAP * 2)) / 2;
export const GRID_Y = (STAGE_H - (CELL * 2 + GRID_GAP)) / 2;
export const COMPOSER_Y = 240;
export const HEADING_DROP = COMPOSER_Y - 78;
export const CHIP = { x: 36, y: COMPOSER_Y, size: 52 };
export const FULL = { x: (STAGE_W - 560) / 2, y: (STAGE_H - 560) / 2, size: 560 };

export const W = {
  gridIn: 4,
  fly1: 104,
  composerIn1: 112,
  editType: [154, 206] as const,
  editSend: 220,
  composerOut1: 232,
  reveal: 238,
  fullHold: 274,
  fly2: 344,
  composerIn2: 352,
  pubType: [392, 438] as const,
  pubSend: 452,
  composerOut2: 464,
  toolsIn: 472,
  live: 610,
};

export const INK = "#171310";
