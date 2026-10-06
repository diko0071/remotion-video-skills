import { G } from "./theme";

export const START = 300;
export const DOOR = { x: 1250, w: 520, h: 620 } as const;
export const DOOR_FACE = { x: DOOR.x, y: G - 330 } as const;
export const BLOCK = { x: 2150, w: 440, h: 210, pressed: 118 } as const;
export const HOOP = { x: 3050, r: 190, stroke: 40 } as const;
export const HOOP_Y = G - 430;
export const STAMP = { x: 3950, w: 380, base: 150, handle: 170, hang: 300 } as const;
export const SKY = { x: 1150, y: -700 } as const;
export const SUN_PERCH = { x: 1670, y: -1000 } as const;
export const LEVEL_END = 6000;
export const TUFT_GAP = 230;

export const doorLeft = DOOR.x - DOOR.w / 2;
export const blockTop = (h: number) => G - h;
export const stampBottom = (drop: number) => G - STAMP.hang * (1 - drop);
