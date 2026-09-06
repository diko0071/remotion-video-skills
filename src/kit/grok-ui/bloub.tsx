import React from "react";
import { BLOUB_BODY, BLOUB_EYE, BLOUB_EYES, BloubShape } from "./bloub-shapes";

export const BLOUB_INK = "#0a0a0c";

export type Gaze = { x: number; y: number };

export type BloubForm = BloubShape | "square";

const SQUARE =
  "M-100 -36A64 64 0 0 1 -36 -100L36 -100A64 64 0 0 1 100 -36L100 36A64 64 0 0 1 36 100L-36 100A64 64 0 0 1 -100 36Z";

const EYE_CENTER: Record<BloubShape, { x: number; y: number }> = {
  circle: { x: 34.2, y: -45.7 },
  triangle: { x: 31.4, y: -40 },
};

const NEUTRAL: Record<BloubShape, { x: number; y: number }> = {
  circle: { x: 0, y: -34 },
  triangle: { x: 0, y: -26 },
};

const GAZE_RANGE = { x: 44, y: 26 };

const eyeMatrix = (m: string, center: { x: number; y: number }) => {
  const [a, b, c, d, e, f] = m.slice(7, -1).split(",").map(Number);
  return { linear: `matrix(${a},${b},${c},${d},0,0)`, dx: e - center.x, dy: f - center.y };
};

export const blinkAt = (frame: number, at: number, span = 9) => {
  const t = frame - at;
  if (t <= 0 || t >= span) return 0;
  const h = span / 2;
  return t < h ? t / h : (span - t) / h;
};

export const blinkTrack = (frame: number, ats: number[], span = 9) =>
  ats.reduce((m, at) => Math.max(m, blinkAt(frame, at, span)), 0);

export const Bloub: React.FC<{
  size: number;
  shape?: BloubForm;
  color?: string;
  eyeColor?: string;
  gaze?: Gaze;
  blink?: number;
  style?: React.CSSProperties;
}> = ({ size, shape = "circle", color = BLOUB_INK, eyeColor = "#f9f9f9", gaze = { x: 0, y: 0 }, blink = 0, style }) => {
  const base: BloubShape = shape === "square" ? "circle" : shape;
  const body = shape === "square" ? SQUARE : BLOUB_BODY[shape];
  const eyes = BLOUB_EYES[base].map((m) => eyeMatrix(m, EYE_CENTER[base]));
  const n = NEUTRAL[base];
  const cx = n.x + gaze.x * GAZE_RANGE.x;
  const cy = n.y + gaze.y * GAZE_RANGE.y;
  const sy = 1 - blink * 0.92;
  return (
    <svg
      width={size}
      height={size}
      viewBox="-125 -125 250 250"
      style={{ display: "block", overflow: "visible", ...style }}
    >
      <path d={body} fill={color} />
      {eyes.map((e, i) => (
        <path
          key={i}
          d={BLOUB_EYE}
          fill={eyeColor}
          transform={`translate(${cx + e.dx} ${cy + e.dy}) ${e.linear} scale(1 ${sy})`}
        />
      ))}
    </svg>
  );
};
