import React from "react";
import { AbsoluteFill, Easing, useCurrentFrame } from "remotion";
import { ramp } from "../../core/motion";
import { toScreen } from "./camera";
import { SUN_SKY_POS } from "./cast";
import { RISE } from "./timings";

const grow = Easing.bezier(0.45, 0, 0.2, 1);

export const waveDone = (f: number) => f >= RISE.wave[1];

export const Wave: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const f = useCurrentFrame();
  if (f < RISE.wave[0]) return null;
  if (waveDone(f)) return <AbsoluteFill>{children}</AbsoluteFill>;
  const c = toScreen(f, SUN_SKY_POS.x, SUN_SKY_POS.y);
  const r = 2600 * ramp(f, RISE.wave[0], RISE.wave[1], grow);
  return <AbsoluteFill style={{ clipPath: `circle(${r}px at ${c.x}px ${c.y}px)` }}>{children}</AbsoluteFill>;
};
