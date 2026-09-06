export const TOTAL = 300;

export const PHONE = { x: 544, y: 108, w: 832, h: 1300, radius: 44 } as const;
export const CARD = { x: 584, w: 750, h: 171, slot0: 636, step: 186, radius: 34 } as const;
export const WORLD = { w: 1920, h: 1080 } as const;

export const FOCUS = { x: 958, y: 721 } as const;
export const ZOOM_IN = 1.51;

export const DIVE = { at: 17, len: 17 } as const;
export const CLIP_OPEN = { at: 16, len: 2 } as const;
export const ARRIVE = { at: 33, len: 6, drop: 520 } as const;
export const PUSH = { at: 34, len: 22 } as const;
export const FOCUS_BACK = { at: 60, len: 20 } as const;
export const CHROME_BACK = { at: 66, len: 12 } as const;
export const PULL = { at: 62, len: 26 } as const;
export const CLIP_CLOSE: ReadonlyArray<readonly [number, number]> = [
  [68, 1],
  [72, 0.434],
  [76, 0.18],
  [80, 0.094],
  [84, 0.072],
  [88, 0.05],
  [92, 0.03],
  [96, 0.018],
  [100, 0.011],
  [108, 0.004],
  [112, 0],
];

export const CUT_HEADLINE = 159;
export const CUT_ENDCARD = 232;

export const WORDS: ReadonlyArray<readonly [string, number]> = [
  ["Grok", 159],
  ["Bot", 165],
  ["is", 171],
  ["now", 175],
  ["available", 179],
  ["on", 185],
  ["Android", 189],
];
export const ROBOT_AT = 191;

export const BALL = { popAt: 232, popLen: 8, big: 205, small: 96, shrinkAt: 253, shrinkLen: 13 } as const;
export const BALL_CENTER = { x: 982, y: 536 } as const;
export const LOCKUP = { markX: 709, gap: 22, fontSize: 124, wordAt: [266, 270] as const } as const;
