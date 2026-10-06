export const LO_TOTAL = 735;
export const BEAT = 15;

export const DOOR_T = { jump: 26, splat: 34, slide: 46, drop: 52, look: 56, leave: 62 } as const;
export const BLOCK_T = { arrive: 62, on: 84, stomps: [96, 108] as const, tip: 98, off: 120 } as const;
export const RING_T = { arrive: 120, under: 144, jump: 150, hit: 158, back: 172, wake: 186 } as const;
export const STAMP_T = { arrive: 186, under: 212, look: 214, slam: 222, hit: 226, lift: 236, peel: 246, up: 258 } as const;
export const STATIONS = [
  { from: 0, to: DOOR_T.leave },
  { from: BLOCK_T.arrive, to: BLOCK_T.off },
  { from: RING_T.arrive, to: RING_T.wake },
  { from: STAMP_T.arrive, to: 262 },
] as const;
export const FAILS = [DOOR_T.splat, BLOCK_T.tip, RING_T.hit] as const;

export const RISE = { from: 262, top: 300, eyes: 300, wave: [304, 330] as const, jump: 322, land: 340, wink: 344, ready: 352 } as const;

export const DROP = 360;
export const SMASH = { stamp: 376, ring: 392, block: 414, door: 442 } as const;
export const SMASHES = [SMASH.stamp, SMASH.ring, SMASH.block, SMASH.door] as const;

export const LIFT = { grab: 454, launch: 456, sky: 482 } as const;
export const FEED = [486, 494, 501, 507, 512, 516, 520, 523, 526, 529, 532, 535] as const;
export const FEED_FLY = 7;
export const FALL = { from: 548, land: 568 } as const;
export const WAVE = { speed: 64 } as const;
export const UP = { from: 606, to: 628 } as const;
export const END = { text: 614, plate: 632 } as const;
