import { spring } from "remotion";
import { SPRINGS } from "../motion";

export type Stop = { x: number; y: number; at: number; click?: boolean };

export const cursorAt = (stops: readonly Stop[], frame: number, fps: number) => {
  let x = stops[0].x;
  let y = stops[0].y;
  for (let i = 1; i < stops.length; i++) {
    const prev = stops[i - 1];
    const next = stops[i];
    const p = spring({ frame: frame - prev.at, fps, config: SPRINGS.smooth, durationInFrames: Math.max(10, next.at - prev.at - 4) });
    x += (next.x - prev.x) * p;
    y += (next.y - prev.y) * p;
  }
  return { x, y };
};
