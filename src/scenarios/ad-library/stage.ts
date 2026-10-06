import { Easing } from "remotion";
import { Layout } from "./layout";
import { AD_LIBRARY_TOTAL, ramp } from "./timeline";

export const stageScale = (f: number) => 1 + 0.04 * ramp(f, 0, AD_LIBRARY_TOTAL, Easing.linear);

export const stageOrigin = (l: Layout) => ({ x: l.vis.cx, y: l.vis.cy });

export const screenToStage = (l: Layout, f: number, p: { x: number; y: number }) => {
  const o = stageOrigin(l);
  const s = stageScale(f);
  return { x: o.x + (p.x - o.x) / s, y: o.y + (p.y - o.y) / s };
};
