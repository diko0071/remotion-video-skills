export const f = (t: number) => Math.round(t * 30);

export const WHITE = "#FFFFFF";
export const INK = "#121212";
export const DARK = "#121212";
export const GREEN = "#A6FF00";
export const GREY = "#9A9A9A";

export const RING = {
  rings: [
    { count: 18, r: 480, w: 300, h: 200 },
    { count: 14, r: 365, w: 270, h: 180 },
  ],
  ry: 0.74,
  cx: 960,
  cy: 540,
  spin: 1.6,
  frontScale: 1.35,
  backScale: 0.7,
  growFrom: 3,
  growWidth: [0, 151, 291, 431, 571, 615, 659, 703, 747, 792, 836, 857, 878, 899, 923, 947, 971, 983, 996, 1008, 1024, 1040, 1056, 1064, 1073, 1081, 1092, 1102, 1113, 1119, 1125, 1131, 1138, 1146, 1153, 1156, 1160, 1163, 1167, 1172, 1176, 1178, 1181, 1183, 1186, 1188, 1191, 1192, 1193, 1193],
  fullWidth: 1193,
  push: [60, 67] as const,
  pushZoom: 2.2,
  creepZoom: 2.32,
  collapse: [126, 131] as const,
} as const;

export const HOLE_WORDS = [
  { text: "The", at: 64 },
  { text: "future", at: 77, boldAt: 91 },
  { text: "of", at: 96 },
  { text: "video creation", at: 105, greyUntil: 107 },
] as const;
export const HOLE_WORDS_END = 126;
export const HOLE_FONT = 110;
export const HOLE_Y = 529;

export const PLATES = {
  from: 130,
  popLen: 7,
  bgIn: [132, 137] as const,
  crossfade: [148, 154] as const,
  bgWhite: [164, 168] as const,
  shrink: [166, 171] as const,
  dotted: { x: 115, y: 65, w: 845, h: 945, dots: { x: 235, y: 180, w: 705, h: 720 } },
  right: { x: 960, y: 180, w: 845, h: 720 },
  green: { x: 596, y: 328, w: 854, h: 422, split: 364 },
  box: { x: 683, y: 408, w: 637, h: 262 },
  text: "IS HERE",
  fontSize: 115,
} as const;

export const WELCOME = {
  dark: 171,
  welcome: { at: 171, flashUntil: 173, thinUntil: 176, until: 193, flashSize: 210, thinSize: 150, size: 112 },
  to: { at: 193, until: 209 },
  veed: { at: 216, size: 132 },
  mosaic: { at: 209, step: 3, collapse: [240, 244] as const },
  grid: { at: 232 },
  matrix: { at: 236 },
} as const;

export const PART1_END = 248;
export const PART2_END = 478;
export const PART3_END = 704;
export const TOTAL = 1410;

export const TEMPLATE = {
  from: 244,
  bigUntil: 247,
  bigSize: 300,
  size: 112,
  states: [
    { from: 247, start: { x: 0, y: 529, color: "#fff", center: true } },
    { from: 254, start: { x: 0, y: 529, color: "#A6FF00", center: true } },
    { from: 259, start: { x: 624, y: 500, color: "#A6FF00" }, second: { text: "with", x: 700, y: 612, color: "#9A9A9A", italic: true, size: 96 } },
    { from: 264, start: { x: 624, y: 500, color: "#fff" }, second: { text: "with a", x: 700, y: 612, color: "#A6FF00", size: 96 } },
    { from: 269, second: { text: "with a", x: 518, y: 452, color: "#A6FF00", size: 96 }, third: { text: "template", x: 700, y: 562, color: "#fff", italic: true, size: 100 } },
    { from: 274, second: { text: "with a", x: 518, y: 452, color: "#fff", size: 96 }, third: { text: "template", x: 700, y: 565, color: "#A6FF00", weight: 700, size: 120 } },
    { from: 284, third: { text: "template", x: 0, y: 529, color: "#fff", size: 112, center: true } },
  ],
  fanAt: 288,
  fanOut: [370, 379] as const,
  end: 379,
  cursor: [
    { x: 1560, y: 900, at: 262 },
    { x: 1200, y: 596, at: 275 },
    { x: 1200, y: 596, at: 283, click: true },
    { x: 1200, y: 596, at: 290 },
    { x: 1560, y: 560, at: 297 },
    { x: 1250, y: 620, at: 318 },
    { x: 1330, y: 600, at: 342 },
    { x: 1180, y: 610, at: 366 },
    { x: 1180, y: 610, at: 379 },
  ],
} as const;

export const FAN = {
  count: 26,
  cardW: 380,
  cardH: 680,
  radius: 40,
  perspective: 1500,
  stepX: 190,
  stepY: -28,
  stepZ: -75,
  originX: 200,
  originY: 700,
  drift: -10,
  born: 288,
  spreadLen: 9,
  stagger: 0.4,
  seed: { x: 1490, y: 400 },
  camera: { from: { x: 800, y: -120, z: -900 }, to: { x: 0, y: 0, z: 300 } },
  focusZ: 160,
  focusLift: 30,
} as const;

export const TYPE = {
  from: 379,
  or: { bigUntil: 381, bigSize: 200, size: 112, until: 393 },
  just: { at: 393, blackAt: 405 },
  typed: [
    { t: "just t", at: 408 },
    { t: "just ty", at: 411 },
    { t: "just typ", at: 414 },
    { t: "just type", at: 420 },
  ],
  caretUntil: 428,
  lineUntil: 438,
  bigCaret: { at: 440, growTo: 444, offAt: 452, onAt: 460, h0: 360, h1: 468, w: 22 },
  prompt: { at: 462, left: 552, size0: 200, sizeMin: 120, cps: 0.55, text: "An ad for a design course, highlighting how it helps students present their thinking and land job offers." },
  end: 478,
} as const;

export const PROMPT_TEXT = "An ad for a design course, highlighting how it helps students present their thinking and land job offers.";
export const SCRIPT_TEXT =
  "You're not losing job offers because your portfolio isn't pretty enough. You're losing them because you can't explain the thinking behind it. Our design course teaches you to present your process, defend your choices, and show how you solve problems. That's what hiring managers actually want to see.";

export const COMPOSE = {
  from: 478,
  card: [
    { at: 478, x: 110, y: 345, w: 1701, h: 381 },
    { at: 496, x: 110, y: 345, w: 1701, h: 381 },
    { at: 506, x: 136, y: 383, w: 1648, h: 369 },
    { at: 508, x: 136, y: 383, w: 1648, h: 369 },
    { at: 512, x: 524, y: 765, w: 876, h: 270 },
    { at: 598, x: 524, y: 765, w: 876, h: 270 },
    { at: 606, x: 326, y: 353, w: 1272, h: 390 },
    { at: 612, x: 326, y: 353, w: 1272, h: 390 },
    { at: 620, x: 131, y: 252, w: 1656, h: 581 },
  ],
  promptTyping: { from: 478, charsAt478: 20, cps: 3.2, until: 506 },
  labelUntil: 508,
  pick: { from: 508, gridIn: [508, 514] as const, gridOut: [596, 602] as const },
  tabs: { x: 738, y: 655, w: 445, h: 87, items: ["Character", "Music", "Subtitles"] },
  picks: [
    { tab: 0, at: 508, tile: { col: 3, row: 1 }, hover: 516, click: 522, chip: [523, 533] as const },
    { tab: 1, at: 536, tile: { col: 1, row: 1 }, hover: 548, click: 554, chip: [555, 565] as const },
    { tab: 2, at: 568, tile: { col: 4, row: 1 }, hover: 580, click: 586, chip: [587, 597] as const },
  ],
  grid: { x: 8, y: 8, size: 304, gap: 16, cols: 6, rows: 4, dim: 0.32 },
  slots: { size: 100, gap: 10, inset: 40 },
  arrow: { size: 84, inset: 24 },
  send: { hover: 606, click: 612 },
  script: { from: 612, streamFrom: 618, streamTo: 640, buttonsAt: 614 },
  generate: { pillW: 330, pillH: 121, zoomFrom: 644, zoomTo: 656, zoom: 3.27, hover: 640, click: 668, dotsFrom: 648, dotsFull: 672 },
  dissolve: { from: 676, to: 700, card: { x: 703, y: 85, w: 513, h: 910, radius: 40 } },
  fromWordAt: 704,
  end: 704,
} as const;

export const HEAD = {
  from: 704,
  card: { x: 703, y: 85, w: 513, h: 910, radius: 40 },
  wordX: 365,
  wordY: 538,
  words: [
    { text: "From", at: 704, until: 740, greyUntil: 710 },
    { text: "your", at: 740, until: 776, boldAt: 770 },
    { text: "head", at: 776, until: 846, boldAt: 800 },
    { text: "to", at: 846, until: 860 },
    { text: "the", at: 860, until: 878, boldAt: 872 },
    { text: "feed", at: 878, until: 900, boldAt: 892 },
  ],
  subtitles: [
    { text: "not losing", at: 704 },
    { text: "offers", at: 736 },
    { text: "because", at: 758 },
    { text: "your portfolio", at: 780 },
    { text: "isn't", at: 810 },
    { text: "pretty", at: 826 },
    { text: "enough.", at: 838 },
    { text: "You're", at: 856 },
    { text: "losing", at: 868 },
    { text: "them", at: 880 },
    { text: "because", at: 892 },
  ],
  panel: { x: 1135, y: 450, w: 455, h: 465, subsAt: 776, charsAt: 830, closeAt: 875, thumb: { w: 130, h: 175, gap: 10, cols: 3 } },
  stylePick: { hover: 792, click: 800 },
  charPick: { hover: 850, click: 858, swap: [862, 870] as const },
  feed: { overlayAt: 870, tilt: [874, 890] as const, exit: [894, 903] as const },
  cursor: [
    { x: 1560, y: 900, at: 780 },
    { x: 1500, y: 700, at: 792 },
    { x: 1500, y: 700, at: 800, click: true },
    { x: 1500, y: 700, at: 836 },
    { x: 1360, y: 800, at: 850 },
    { x: 1360, y: 800, at: 858, click: true },
    { x: 1360, y: 800, at: 870 },
    { x: 1700, y: 980, at: 890 },
  ],
  end: 906,
} as const;

export const PHONE = {
  from: 906,
  rect: { x: 733, y: 59, w: 445, h: 961, radius: 64 },
  drop: [908, 924] as const,
  flash: [968, 971] as const,
  split: [972, 980] as const,
  photo: { x: 740, y: 335, w: 423, h: 431 },
  scatter: [982, 1000] as const,
  clones: [
    { x: 0, y: 147, w: 410, h: 520 },
    { x: 438, y: 100, w: 340, h: 340 },
    { x: 985, y: 0, w: 460, h: 180 },
    { x: 1440, y: 50, w: 390, h: 420 },
    { x: 1180, y: 435, w: 300, h: 300 },
    { x: 60, y: 720, w: 400, h: 360 },
    { x: 735, y: 535, w: 300, h: 310 },
    { x: 880, y: 880, w: 340, h: 200 },
    { x: 1355, y: 700, w: 560, h: 380 },
    { x: 1760, y: 270, w: 160, h: 110 },
    { x: 1034, y: 0, w: 120, h: 80 },
    { x: 420, y: 470, w: 240, h: 220 },
  ],
  pickIndex: 6,
  words: [
    { text: "Make", at: 1002, until: 1014 },
    { text: "it", at: 1014, until: 1026 },
    { text: "yours", at: 1026, until: 1042 },
  ],
  cursor: [
    { x: 1230, y: 1040, at: 990 },
    { x: 880, y: 700, at: 1030 },
    { x: 880, y: 700, at: 1040, click: true },
    { x: 880, y: 700, at: 1050 },
  ],
  pick: { greenAt: 1040, others: [1040, 1052] as const, grow: [1044, 1060] as const, big: { x: 624, y: 206, w: 657, h: 657 }, dissolve: [1048, 1078] as const },
  morph: [1076, 1096] as const,
  row: { cardW: 525, cardH: 930, gap: 26, y: 70, firstX: 700, from: 1096, entries: [1100, 1116, 1126, 1132], shift: [1096, 1142] as const, shiftTo: 106 },
  end: 1146,
} as const;

export const CLOSE = {
  from: 1146,
  veedBig: [1146, 1157] as const,
  beats: [
    { at: 1158, top: { text: "VEED", color: "#fff", weight: 900 } },
    { at: 1161, top: { text: "VEED", color: "#A6FF00", weight: 900 }, low: { text: "just", color: "#9A9A9A", italic: true } },
    { at: 1164, top: { text: "VEED", color: "#A6FF00", weight: 900 }, low: { text: "just", color: "#A6FF00" } },
    { at: 1170, top: { text: "VEED", color: "#fff", weight: 900 }, low: { text: "just ", color: "#fff", accent: "got", accentColor: "#A6FF00" } },
    { at: 1173, top: { text: "VEED", color: "#9A9A9A", weight: 900 }, low: { text: "just ", color: "#fff", accent: "got", accentColor: "#A6FF00" } },
    { at: 1179, low: { text: "just ", color: "#fff", accent: "got", accentColor: "#A6FF00", accentItalic: true } },
    { at: 1188, low: { text: "a", color: "#A6FF00" } },
    { at: 1191, low: { text: "a ", color: "#fff", accent: "whole", accentColor: "#A6FF00", accentWeight: 700 } },
    { at: 1194, low: { text: "a ", color: "#9A9A9A", italic: true, accent: "whole", accentColor: "#A6FF00" } },
    { at: 1206, top: { text: "a whole", color: "#9A9A9A", italic: true }, low: { text: "lot", color: "#A6FF00", italic: true, offsetX: 140 } },
    { at: 1209, top: { text: "a whole", color: "#9A9A9A", italic: true }, low: { text: "lot", color: "#A6FF00", weight: 700, offsetX: 140 } },
    { at: 1215, top: { text: "whole", color: "#fff" }, low: { text: "lot", color: "#A6FF00", weight: 700, offsetX: 60 } },
    { at: 1218, low: { text: "lot", color: "#A6FF00", weight: 700 } },
    { at: 1221, low: { text: "lot ", color: "#fff", accent: "more", accentColor: "#A6FF00", accentWeight: 700 } },
    { at: 1224, low: { text: "more", color: "#A6FF00", weight: 700 } },
    { at: 1233, low: { text: "powerful", color: "#fff" } },
    { at: 1236, low: { text: "powerful", color: "#A6FF00", weight: 700 } },
    { at: 1254, low: { text: "and", color: "#fff" } },
    { at: 1266, low: { text: "so", color: "#fff" } },
    { at: 1275, low: { text: "did", color: "#fff" } },
    { at: 1284, low: { text: "you", color: "#fff" } },
  ],
  endcard: { at: 1296, glitchUntil: 1312, taglineAt: 1318 },
  end: 1410,
} as const;

export const VEED_TOTAL = 1410;
