import { Easing, interpolate, spring } from "remotion";

export const FPS = 30;
export const AD_LIBRARY_TOTAL = 750;

export const T = {
  s2: 150,
  s3: 300,
  s4: 450,
  s5: 600,
  streamStart: -34,
  morph: 124,
  typeStart: 150,
  slotStart: 156,
  slotStep: 7,
  typeRest: 186,
  cursorIn: 198,
  send: 222,
  bubble: 226,
  toolDone: 240,
  widget: 240,
  scroll: 252,
  push: 268,
  chipsHot: 318,
  lift: 348,
  winnerMove: 452,
  panel: 463,
  arrow: 457,
  rebuild: 468,
  rebuildStep: 12,
  absorb: 578,
  url: 597,
} as const;

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const ramp = (f: number, start: number, dur: number, easing = Easing.inOut(Easing.cubic)) =>
  interpolate(f, [start, start + dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing,
  });

export const pop = (f: number, start: number, damping = 13, stiffness = 180) =>
  spring({ frame: Math.max(0, f - start), fps: FPS, config: { damping, stiffness, mass: 0.9 } });

export const glide = (f: number, start: number, stiffness = 120) =>
  spring({ frame: Math.max(0, f - start), fps: FPS, config: { damping: 200, stiffness, mass: 1 } });

export const sceneOf = (f: number) => (f < T.s2 ? 0 : f < T.s3 ? 1 : f < T.s4 ? 2 : f < T.s5 ? 3 : 4);
