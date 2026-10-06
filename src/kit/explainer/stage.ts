export const STAGE = { w: 1920, h: 1080, titleTop: 112, zoneTop: 250, zoneBottom: 990 } as const;

export const zoneTop = (h: number) => Math.round(STAGE.zoneTop + (STAGE.zoneBottom - STAGE.zoneTop - h) / 2);
