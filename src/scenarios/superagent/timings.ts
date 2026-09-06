import { refFrame } from "../../core/measure";

const REF_FPS = 25;
export const at = (t: number) => refFrame(t * REF_FPS, REF_FPS);

export const BG = "#F2F0E0";
export const INK = "#1A1A1A";
export const CORAL = "#EE6A54";

export const LINE = {
  y: 530,
  size: 186,
  sizeSmall: 136,
  stretch: 1.06,
  rightPin: 1870,
  drift: { from: at(0.9), v: 24, lockX: 960 },
  segments: [
    { text: "What if getting found ", from: at(0.06), step: 0.85 },
    { text: "in ", from: at(1.4), step: 1.4 },
    { text: "AI", from: at(1.62), step: 0, ai: true },
    { text: " answers", from: at(2.2), step: 1.5 },
    { text: " was as simple as asking?", from: at(3.82), step: 0.42 },
  ],
  aiSize: 380,
  whip: [at(3.8), at(4.2)] as const,
} as const;

export const LENS = {
  r: 265,
  cy: 530,
  enter: [at(1.8), at(2.5)] as const,
  exit: [at(3.78), at(4.2)] as const,
  magnify: 1.55,
  cycle: [
    { id: "gemini", from: at(2.85), to: at(3.18) },
    { id: "claude", from: at(3.18), to: at(3.3) },
    { id: "perplexity", from: at(3.3), to: at(3.5) },
    { id: "openai", from: at(3.5), to: at(3.66) },
  ],
} as const;

export const PART1_END = at(5.4);
export const TOTAL = at(53.0);
