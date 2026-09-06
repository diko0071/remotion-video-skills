import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { SPRINGS, useSpringAt } from "../core/motion";

export const PhaseHeading: React.FC<{
  visibleFrom: number;
  visibleTo?: number;
  y?: number;
  ink?: string;
  children: React.ReactNode;
}> = ({ visibleFrom, visibleTo = Infinity, y = 0, ink = "#171310", children }) => {
  const frame = useCurrentFrame();
  const inP = useSpringAt(visibleFrom, SPRINGS.smooth, 20);
  const out = Number.isFinite(visibleTo)
    ? interpolate(frame, [visibleTo - 10, visibleTo], [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 1;
  if (frame < visibleFrom || frame > visibleTo + 4) return null;
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        fontSize: 54,
        fontWeight: 700,
        letterSpacing: "-0.025em",
        color: ink,
        opacity: Math.min(inP, out),
        transform: `translateY(${interpolate(inP, [0, 1], [16, 0]) + y}px)`,
      }}
    >
      {children}
    </div>
  );
};
