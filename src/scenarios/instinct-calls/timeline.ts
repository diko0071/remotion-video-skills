import { springAt } from "../../core/motion";

export const FPS = 30;
export const INSTINCT_TOTAL = 750;

export const T = {
  s2: 150,
  s3: 300,
  s4: 450,
  s5: 600,
  toRight: 128,
  chartIn: 146,
  draw: 154,
  spike: 194,
  spikeEnd: 208,
  plus: 206,
  link: 212,
  spikeLabel: 222,
  tap: 232,
  answer: 236,
  caption: 242,
  endTap: 292,
  msgs: 298,
  typeStart: 304,
  send: 331,
  dots: 338,
  reply: 350,
  island: 360,
  panel: 318,
  arc: 368,
  pickup: 388,
  ask: 392,
  talk: 408,
  hangup: 446,
  sleep: 450,
  wake: 460,
  banner: 462,
  cpaIn: 452,
  cpaDraw: 458,
  cpaEnd: 512,
  exit: 572,
  url: 590,
} as const;

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const pop = (f: number, at: number, damping = 14, stiffness = 180) =>
  springAt(f, FPS, at, { damping, stiffness, mass: 0.9 });

export const glide = (f: number, at: number, stiffness = 120) => springAt(f, FPS, at, { damping: 200, stiffness, mass: 1 });

export const RING_BURSTS = [0, 30, 60, 90, 120, 150, 180, 210] as const;
