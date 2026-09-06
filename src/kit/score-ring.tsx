import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { SPRINGS, useSpringAt } from "../core/motion";

export const ScoreRing: React.FC<{
  score: number;
  max?: number;
  size?: number;
  appearAt?: number;
  color?: string;
}> = ({ score, max = 100, size = 240, appearAt = 0, color = "#059669" }) => {
  const frame = useCurrentFrame();
  const p = useSpringAt(appearAt, SPRINGS.smooth, 50);
  if (frame < appearAt) return null;
  const r = size / 2 - 16;
  const circumference = 2 * Math.PI * r;
  const fraction = (score / max) * p;
  const current = Math.round(score * p);
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="rgba(23,19,16,0.08)"
          strokeWidth={18}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={18}
          strokeLinecap="round"
          strokeDasharray={`${circumference * fraction} ${circumference}`}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          opacity: interpolate(p, [0, 0.3], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <span style={{ fontSize: size * 0.3, fontWeight: 800, letterSpacing: "-0.03em", color: "#171310", lineHeight: 1 }}>
          {current}
        </span>
        <span style={{ fontSize: size * 0.08, fontWeight: 600, color: "rgba(23,19,16,0.45)" }}>
          / {max}
        </span>
      </div>
    </div>
  );
};
