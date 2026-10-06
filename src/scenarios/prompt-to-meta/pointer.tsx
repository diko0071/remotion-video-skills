import React from "react";
import { C } from "./theme";
import { clamp01, glide, lerp, ramp } from "./timeline";

type Point = { x: number; y: number };

export const pointerPath = (f: number, from: Point, to: Point, start: number, arc = 60) => {
  const t = glide(f, start, 70);
  const bend = Math.sin(Math.PI * t) * arc;
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const len = Math.max(1, Math.hypot(dx, dy));
  return {
    x: lerp(from.x, to.x, t) + (-dy / len) * bend,
    y: lerp(from.y, to.y, t) + (dx / len) * bend,
  };
};

export const clickDip = (f: number, at: number) => ramp(f, at - 3, 3) - ramp(f, at, 6);

export const Pointer: React.FC<{ x: number; y: number; dip: number; opacity: number }> = ({ x, y, dip, opacity }) => (
  <div
    style={{
      position: "absolute",
      left: x - 5,
      top: y - 3,
      opacity: clamp01(opacity),
      transform: `scale(${1 - 0.16 * dip})`,
      transformOrigin: "5px 3px",
      filter: "drop-shadow(0 6px 10px rgba(0,0,0,0.28))",
    }}
  >
    <svg width={38} height={44} viewBox="0 0 24 28">
      <path
        d="M2 1.5 L2 21 L7.2 16.4 L10.6 24.2 L14 22.7 L10.7 15.1 L17.6 15.1 Z"
        fill={C.ink}
        stroke={C.paper}
        strokeWidth={1.7}
        strokeLinejoin="round"
      />
    </svg>
  </div>
);
