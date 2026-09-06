import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { CursorArrow } from "../core/stage/cursor-arrow";
import { resolveTarget } from "../core/stage/objects";

export type GuideClick = { target: string; at: number; press?: boolean };

export const CURSOR_TRAVEL = 30;
export const CURSOR_REST = 12;
const DIP_FRAMES = 4;
const QUANT = 2;

const clamp01 = (t: number): number => Math.min(1, Math.max(0, t));
const smoothstep = (t: number): number => {
  const x = clamp01(t);
  return x * x * (3 - 2 * x);
};
const easeOutQuint = (t: number): number => 1 - Math.pow(1 - clamp01(t), 5);
const quant = (v: number): number => Math.round(v / QUANT) * QUANT;

type Point = { x: number; y: number };

export const guideCursorPath = (
  clicks: GuideClick[],
  points: Record<string, Point>,
  from: Point,
  frame: number,
): Point => {
  let prev = from;
  let prevBusyUntil = -1e9;
  for (const click of clicks) {
    const point = points[click.target] ?? prev;
    const arrive = click.at - CURSOR_REST;
    const depart = Math.max(arrive - CURSOR_TRAVEL, prevBusyUntil);
    if (frame < depart) return prev;
    if (frame < arrive) {
      const t = easeOutQuint((frame - depart) / Math.max(1, arrive - depart));
      return {
        x: prev.x + (point.x - prev.x) * t,
        y: prev.y + (point.y - prev.y) * t,
      };
    }
    prev = point;
    prevBusyUntil = click.at + DIP_FRAMES + 2;
  }
  return prev;
};

export const GuideCursor: React.FC<{
  from: Point;
  clicks: GuideClick[];
  appearAt?: number;
  scale?: number;
}> = ({ from, clicks, appearAt = 0, scale = 1.5 }) => {
  const frame = useCurrentFrame();
  const ref = React.useRef<HTMLDivElement>(null);

  let dip = 1;
  for (const click of clicks) {
    if (click.press === false) continue;
    const phase = interpolate(
      frame,
      [click.at - DIP_FRAMES, click.at, click.at + DIP_FRAMES],
      [0, 1, 0],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
    );
    dip = Math.min(dip, 1 - 0.2 * smoothstep(phase));
  }

  React.useLayoutEffect(() => {
    if (!ref.current) return;
    const points: Record<string, Point> = {};
    for (const click of clicks) {
      if (points[click.target]) continue;
      const { el } = resolveTarget(click.target);
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      points[click.target] = {
        x: quant(rect.x + rect.width / 2),
        y: quant(rect.y + rect.height / 2),
      };
    }
    const pos = guideCursorPath(clicks, points, from, frame);
    ref.current.style.left = `${pos.x}px`;
    ref.current.style.top = `${pos.y}px`;
  });

  if (frame < appearAt) return null;

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        left: -100,
        top: -100,
        zIndex: 60,
        pointerEvents: "none",
        transform: `scale(${scale * dip})`,
        transformOrigin: "top left",
        filter: "drop-shadow(0 2px 5px rgba(0,0,0,0.28))",
      }}
    >
      <CursorArrow />
    </div>
  );
};
