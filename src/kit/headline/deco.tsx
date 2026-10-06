import React from "react";
import { useCurrentFrame } from "remotion";

export type DecoKind = "tick" | "arc" | "under";

const PATH: Record<DecoKind, { d: string; w: number; h: number; len: number }> = {
  tick: { d: "M2 26 L2 2 L26 2", w: 28, h: 28, len: 48 },
  arc: { d: "M2 26 C 6 10, 18 4, 30 2", w: 32, h: 28, len: 40 },
  under: { d: "M2 4 C 40 2, 90 1, 140 3", w: 142, h: 6, len: 140 },
};

export const Deco: React.FC<{ kind: DecoKind; color: string; at: number; x: number; y: number; scale?: number; rotate?: number; width?: number }> = ({ kind, color, at, x, y, scale = 1, rotate = 0, width }) => {
  const frame = useCurrentFrame();
  const p = 1 - Math.pow(1 - Math.min(1, Math.max(0, (frame - at) / 9)), 3);
  const g = PATH[kind];
  const w = width ?? g.w;
  return (
    <svg viewBox={`0 0 ${g.w} ${g.h}`} preserveAspectRatio="none" width={w * scale} height={g.h * scale} style={{ position: "absolute", left: x, top: y, overflow: "visible", transform: `rotate(${rotate}deg)`, opacity: frame >= at ? 1 : 0 }}>
      <path d={g.d} fill="none" stroke={color} strokeWidth={kind === "under" ? 4 : 5} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={g.len} strokeDashoffset={g.len * (1 - p)} vectorEffect="non-scaling-stroke" />
    </svg>
  );
};
