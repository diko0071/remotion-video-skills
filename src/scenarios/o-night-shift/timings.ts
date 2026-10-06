export const FPS = 30;
export const NS_TOTAL = 636;

export const SCENES = {
  tonight: { from: 0, len: 90 },
  meta: { from: 90, len: 105 },
  google: { from: 195, len: 90 },
  shopify: { from: 285, len: 75 },
  ga: { from: 360, len: 20 },
  tiktok: { from: 380, len: 20 },
  gsc: { from: 400, len: 20 },
  sunrise: { from: 420, len: 126 },
  end: { from: 546, len: 90 },
} as const;

export const BALL_SLOT = "•";

export const CLOCK = [
  { at: 2, text: "11:52 PM" },
  { at: 90, text: "1:14 AM" },
  { at: 195, text: "3:40 AM" },
  { at: 285, text: "5:05 AM" },
  { at: 360, text: "5:41 AM" },
  { at: 380, text: "6:12 AM" },
  { at: 400, text: "6:55 AM" },
  { at: 420, text: "7:58 AM" },
  { at: 544, text: `ryze${BALL_SLOT}ai/gpt` },
] as const;

export const TONIGHT = {
  typeFrom: 6,
  charsPerFrame: 1.2,
  send: 38,
  userBubble: 40,
  oHappy: 48,
  oReply: 52,
  blinks: [20, 70],
} as const;

export const META = { switches: [34, 39, 44], happy: 50, exit: 92 } as const;
export const GOOGLE = { strikes: [26, 30, 34, 38], tweenFrom: 42, tweenTo: 56, happy: 48, exit: 78 } as const;
export const SHOPIFY = { flips: [24, 27, 30, 33], more: 38, happy: 38, exit: 63 } as const;

export const SUNRISE = {
  sunFrom: 424,
  sunCover: 456,
  cream: 458,
  lockupFrom: 444,
  oLook: 430,
  oHappy: 444,
  oToCard: 452,
  oToCardLen: 14,
  card: 456,
  stats: [466, 470, 474],
  approval: 478,
  cursorIn: 478,
  click: 504,
  wink: 518,
} as const;

export const END = {
  plateFrom: 538,
  plateLen: 20,
  lead: 556,
  drop: 564,
  land: 576,
  wink: 600,
} as const;
