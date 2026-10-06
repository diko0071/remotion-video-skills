import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { SPRINGS, useSpringAt } from "../core/motion";
import { useObjectRects } from "../core/stage";

export type StageRect = { x: number; y: number; w: number; h: number };

export const ExpandToStage: React.FC<{
  fromId: string;
  to: StageRect;
  at: number;
  render: (width: number) => React.ReactNode;
  bg?: string;
  fadeLen?: number;
  children?: React.ReactNode;
}> = ({ fromId, to, at, render, bg = "var(--background)", fadeLen = 16, children }) => {
  const frame = useCurrentFrame();
  const rects = useObjectRects([fromId]);
  const p = useSpringAt(at, SPRINGS.card, 44);
  const fade = interpolate(frame, [at, at + fadeLen], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  if (frame < at) return null;
  const from = rects[fromId] ?? { x: to.x, y: to.y, width: to.w, height: to.h };
  const x = interpolate(p, [0, 1], [from.x, to.x]);
  const y = interpolate(p, [0, 1], [from.y, to.y]);
  const w = interpolate(p, [0, 1], [from.width, to.w]);
  return (
    <>
      <AbsoluteFill style={{ background: bg, opacity: fade }} />
      <div style={{ position: "absolute", left: x, top: y, width: w, height: (w / to.w) * to.h }}>
        <div style={{ transform: `scale(${w / to.w})`, transformOrigin: "top left" }}>{render(to.w)}</div>
      </div>
      {children}
    </>
  );
};
