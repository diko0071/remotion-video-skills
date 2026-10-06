import React from "react";
import { Easing, useCurrentFrame, useVideoConfig } from "remotion";
import { clamp01, springAt } from "../../core/motion";
import { DirectionalBlur } from "../../kit/directional-blur";

const POP = { damping: 13, stiffness: 170, mass: 0.7 };
const eIn = Easing.in(Easing.cubic);

export const Piece: React.FC<{
  id: string;
  at: number;
  exit?: number;
  x: number;
  y: number;
  z?: number;
  rise?: number;
  from?: number;
  children: React.ReactNode;
}> = ({ id, at, exit, x, y, z = 1, rise = 36, from = 0.86, children }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = springAt(f, fps, at, POP);
  const sPrev = springAt(f - 1, fps, at, POP);
  const out = exit === undefined ? 0 : eIn(clamp01((f - exit) / 10));
  const outPrev = exit === undefined ? 0 : eIn(clamp01((f - 1 - exit) / 10));
  if (f < at || out >= 1) return null;
  const dy = (1 - s) * rise + out * 70;
  const speed = Math.abs(s - sPrev) * rise + Math.abs(out - outPrev) * 70;
  return (
    <DirectionalBlur
      id={id}
      x={0}
      y={speed * 0.45}
      style={{
        position: "absolute",
        left: x,
        top: y,
        zIndex: z,
        opacity: clamp01((f - at) / 4) * (1 - out),
        transform: `translateY(${dy}px) scale(${from + (1 - from) * s})`,
        transformOrigin: "50% 60%",
      }}
    >
      {children}
    </DirectionalBlur>
  );
};
