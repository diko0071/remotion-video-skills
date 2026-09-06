import React from "react";
import { useCurrentFrame } from "remotion";
import { ramp, SPRINGS, useSpringAt } from "../core/motion";
import { DirectionalBlur } from "./directional-blur";

export type PopBlur = { id: string; scale: number; style?: React.CSSProperties };

export const Pop: React.FC<{ at: number; from?: number; rise?: number; blur?: PopBlur; style?: React.CSSProperties; children: React.ReactNode }> = ({ at, from = 0.6, rise = 12, blur, style, children }) => {
  const frame = useCurrentFrame();
  const s = useSpringAt(at, SPRINGS.pop, 20);
  const sPrev = useSpringAt(at - 1, SPRINGS.pop, 20);
  const o = ramp(frame, at, at + 4);
  const scale = `scale(${from + (1 - from) * s})`;
  const body = (
    <span style={{ display: "inline-flex", opacity: o, transform: rise === 0 ? scale : `translateY(${(1 - s) * rise}px) ${scale}`, ...style }}>
      {children}
    </span>
  );
  if (!blur) return body;
  const smear = Math.abs(s - sPrev) * blur.scale;
  return (
    <DirectionalBlur id={blur.id} x={smear} y={smear} style={blur.style}>
      {body}
    </DirectionalBlur>
  );
};
