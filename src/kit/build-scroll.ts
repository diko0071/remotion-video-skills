import { interpolate } from "remotion";

export type ScrollStop = { f: number; y: number };

const easeInOut = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

export const buildScrollAt = (
  frame: number,
  scrollStart: number,
  scrollEnd: number,
  stops: ScrollStop[],
  distance: number,
): number => {
  if (scrollEnd <= scrollStart) return 0;
  const dur = scrollEnd - scrollStart;
  const frames = stops.map((s) => scrollStart + s.f * dur);
  const ys = stops.map((s, i) => (i === stops.length - 1 ? distance : s.y));
  return interpolate(frame, frames, ys, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeInOut,
  });
};

export const travelBlur = (speed: number): number =>
  speed > 7 ? Math.min(9, (speed - 7) * 0.12) : 0;

export const buildFrame = (scrollStart: number, scrollEnd: number, frac: number): number =>
  scrollStart + frac * Math.max(1, scrollEnd - scrollStart);
