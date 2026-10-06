import React from "react";
import { useCurrentFrame } from "remotion";
import { SPRINGS, useSpringAt } from "../core/motion";

export const ChainArrow: React.FC<{
  at: number;
  fromX: number;
  toX: number;
  y: number;
  lift?: number;
  color?: string;
  width?: number;
  head?: number;
  stage?: { w: number; h: number };
}> = ({ at, fromX, toX, y, lift = 96, color = "#C19767", width = 4, head = 20, stage = { w: 1920, h: 1080 } }) => {
  const frame = useCurrentFrame();
  const p = useSpringAt(at, SPRINGS.card, 26);
  if (frame < at) return null;
  const cx = (fromX + toX) / 2;
  const cy = y - lift;
  const tx = 2 * (toX - cx);
  const ty = 2 * (y - cy);
  const ang = Math.atan2(ty, tx);
  const a1 = ang + Math.PI - 0.5;
  const a2 = ang + Math.PI + 0.5;
  return (
    <svg width={stage.w} height={stage.h} style={{ position: "absolute", left: 0, top: 0, pointerEvents: "none" }}>
      <path
        d={`M ${fromX} ${y} Q ${cx} ${cy} ${toX} ${y}`}
        stroke={color}
        strokeWidth={width}
        fill="none"
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1 - p}
        opacity={0.9}
      />
      {p > 0.92 ? (
        <path
          d={`M ${toX + Math.cos(a1) * head} ${y + Math.sin(a1) * head} L ${toX} ${y} L ${toX + Math.cos(a2) * head} ${y + Math.sin(a2) * head}`}
          stroke={color}
          strokeWidth={width}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : null}
    </svg>
  );
};
