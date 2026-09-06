import React from "react";
import { Easing, useCurrentFrame } from "remotion";
import { ramp } from "../../core/motion";
import { DirectionalBlur } from "../directional-blur";

const slideP = (frame: number, from: number, len: number) => ramp(frame, from, from + len, Easing.inOut(Easing.cubic));

export const SlidePage: React.FC<{ id: string; at: number; len: number; direction: "out" | "in"; distance?: number; children: React.ReactNode }> = ({ id, at, len, direction, distance = 1080, children }) => {
  const frame = useCurrentFrame();
  const p = slideP(frame, at, len);
  const prev = slideP(frame - 1, at, len);
  const y = direction === "out" ? -p * distance : (1 - p) * distance;
  return (
    <DirectionalBlur id={id} y={Math.abs(p - prev) * distance * 0.35} style={{ position: "absolute", inset: 0, transform: `translateY(${y}px)` }}>
      {children}
    </DirectionalBlur>
  );
};
