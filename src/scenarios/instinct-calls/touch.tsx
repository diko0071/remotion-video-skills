import React from "react";
import { ramp } from "../../core/motion";
import { pop } from "./timeline";

export const Touch: React.FC<{ f: number; at: number; x: number; y: number }> = ({ f, at, x, y }) => {
  if (f < at - 6 || f > at + 10) return null;
  const inP = pop(f, at - 6, 16, 260);
  const press = ramp(f, at - 1, at + 2) - ramp(f, at + 2, at + 6);
  const out = ramp(f, at + 4, at + 10);
  const size = 58 * (0.7 + 0.3 * inP) * (1 - 0.15 * press);
  return (
    <div
      style={{
        position: "absolute",
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
        borderRadius: size,
        background: "rgba(40,40,45,0.28)",
        border: "2px solid rgba(255,255,255,0.7)",
        opacity: Math.min(1, inP * 1.5) * (1 - out),
        zIndex: 8,
      }}
    />
  );
};
