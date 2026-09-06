import { projectThroughKeys } from "../../kit/keyed-rig";
import { at30 } from "./curves";

export const TOTAL = 1320;

export const INK = "#171310";
export const INK_SOFT = "#C4C0B8";
export const CORAL = "#E3705A";
export const CAPSULE_BLACK = "#1A1A1A";
export const TILE_BLACK = "#141414";

export const LINE = { y: 540, size: 92 } as const;
export const LINE1 = { words: [2, 4, 6, 7, 8], shiftFrom: at30(15), gone: at30(26) } as const;
export const BIG = { from: at30(30), size: 420, y: 565, charsPerFrame: 1.25, fade: at30(45), gone: at30(48) } as const;
export const LINE2 = { from: at30(54), charsPerFrame: 1.9, softUntil: at30(66), lift: at30(72), gone: at30(80) } as const;

export const CAPSULE = { cx: 955, cy: 557, w: 938, h: 291, radius: 125, rise: at30(81) } as const;
export const ICONS = { at: [at30(86), at30(87), at30(88), at30(89), at30(90)], size: 50, gap: 90, x: 70, y: 74 } as const;
export const CHIP = { at: at30(88), x: 40, y: 164 } as const;
export const PORT = { at: at30(86), x: 692, y: 66, w: 210, h: 150 } as const;

export const CURSOR1 = {
  appear: at30(98),
  from: { x: 1800, y: 1085 },
  mid: { x: 1274, y: 736, at: at30(107) },
  hover: { x: 1372, y: 596, at: at30(114) },
  grab: 149,
} as const;
export const KNOB = { out: at30(131), to: at30(138), r: 22, travel: 40 } as const;
export const CUT_WIDE = at30(139);
export const DRAG = { from: at30(139), to: at30(148), xFrom: 1660, xTo: 1815 } as const;
export const CABLE = { h: 20, color: "#B2B2B2" } as const;
export const MCP = { cx: 2025, w: 540, h: 205, appear: at30(146), content: at30(151) } as const;
export const CURSOR1_EXIT = { at: at30(167), to: { x: 2400, y: 980 }, end: at30(178) } as const;

export const CAM_A = [
  { at: 0, zoom: 1, x: 960, y: 540 },
  { at: at30(107), zoom: 1, x: 960, y: 540 },
  { at: at30(108), zoom: 1.95, x: 1100, y: 557, cut: true },
  { at: at30(112), zoom: 1.74, x: 1190, y: 557 },
  { at: at30(121), zoom: 1.74, x: 1304, y: 557 },
  { at: at30(130), zoom: 1.61, x: 1361, y: 557 },
  { at: at30(138), zoom: 1.61, x: 1361, y: 557 },
  { at: at30(139), zoom: 0.82, x: 1175, y: 558, cut: true },
  { at: at30(160), zoom: 0.82, x: 1402, y: 558 },
  { at: at30(179), zoom: 0.82, x: 1402, y: 558 },
] as const;

export const SCATTER = { from: at30(175), to: at30(179) } as const;
export const CUT_WEB = at30(179);

export const screenOfA = (x: number, y: number) => projectThroughKeys(CAM_A, CAM_A[CAM_A.length - 1].at, x, y);

export const TILES = [
  { key: "google", x: 301, y: 202 },
  { key: "claude", x: 441, y: 376 },
  { key: "openai", x: 301, y: 539 },
  { key: "perplexity", x: 449, y: 714 },
  { key: "gemini", x: 302, y: 875 },
] as const;
export const TILE = { size: 134, radius: 28, spreadAt: 0 } as const;
export const CLUSTER = { cx: 619, cy: 500 } as const;
export const HUB = { x: 920, y: 540 } as const;
export const APP_ICON = { x: 1026, y: 539, size: 159, radius: 36, from: { x: 1042, y: 540, size: 50 }, grow: [at30(180) - CUT_WEB, at30(185) - CUT_WEB] as const, darken: [at30(183) - CUT_WEB, at30(186) - CUT_WEB] as const } as const;
export const WORDMARK = { x: 1135, y: 539, size: 66, from: at30(183) - CUT_WEB, charsPerFrame: 0.83, mcpAt: at30(191) - CUT_WEB } as const;
export const STRANDS = { at: [at30(190) - CUT_WEB, at30(191) - CUT_WEB, at30(192) - CUT_WEB, at30(193) - CUT_WEB, at30(194) - CUT_WEB], len: 8, pulseFrom: at30(192) - CUT_WEB, period: 26 } as const;
export const STRAND_COLORS = ["#4C7DFF", "#4C7DFF", "#F0402E", "#F5D021", "#F5D021"] as const;
export const GROUND_IN = [0, 4] as const;

export const CAM_B = [
  { at: 0, zoom: 1, x: 960, y: 540 },
  { at: at30(222) - CUT_WEB, zoom: 1, x: 960, y: 540 },
  { at: at30(240) - CUT_WEB, zoom: 1.35, x: 700, y: 412 },
  { at: at30(252) - CUT_WEB, zoom: 1.35, x: 700, y: 412 },
  { at: at30(261) - CUT_WEB, zoom: 1.62, x: 720, y: 300 },
] as const;
export const CURSOR2 = { appear: at30(230) - CUT_WEB, from: { x: 640, y: 1000 }, arrive: at30(240) - CUT_WEB, click: at30(248) - CUT_WEB } as const;

export const CUT_CLAUDE = at30(261);
