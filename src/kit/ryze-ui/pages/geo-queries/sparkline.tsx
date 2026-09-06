import React from "react";
import "./geo-queries.css";

export const SPARK_W = 100;
export const SPARK_H = 26;

type Pt = { x: number; y: number };

const sign = (x: number) => (x < 0 ? -1 : 1);

const slope3 = (a: Pt, b: Pt, c: Pt) => {
  const h0 = b.x - a.x;
  const h1 = c.x - b.x;
  const s0 = (b.y - a.y) / (h0 || (h1 < 0 ? -0 : 0));
  const s1 = (c.y - b.y) / (h1 || (h0 < 0 ? -0 : 0));
  const p = (s0 * h1 + s1 * h0) / (h0 + h1);
  return (
    (sign(s0) + sign(s1)) *
      Math.min(Math.abs(s0), Math.abs(s1), 0.5 * Math.abs(p)) || 0
  );
};

const slope2 = (a: Pt, b: Pt, t: number) => {
  const h = b.x - a.x;
  return h ? ((3 * (b.y - a.y)) / h - t) / 2 : t;
};

const monotonePath = (pts: Pt[]) => {
  if (pts.length < 3) {
    return pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join("");
  }
  const n = pts.length;
  const t: number[] = new Array(n).fill(0);
  for (let i = 1; i < n - 1; i += 1) {
    t[i] = slope3(pts[i - 1], pts[i], pts[i + 1]);
  }
  t[0] = slope2(pts[0], pts[1], t[1]);
  t[n - 1] = slope2(pts[n - 2], pts[n - 1], t[n - 2]);
  let d = `M${pts[0].x},${pts[0].y}`;
  for (let i = 1; i < n; i += 1) {
    const a = pts[i - 1];
    const b = pts[i];
    const dx = (b.x - a.x) / 3;
    d += `C${a.x + dx},${a.y + dx * t[i - 1]} ${b.x - dx},${b.y - dx * t[i]} ${b.x},${b.y}`;
  }
  return d;
};

export const Sparkline: React.FC<{ values: number[]; color: string }> = ({
  values,
  color,
}) => {
  const inverted = values.map((v) => -v);
  const min = Math.min(...inverted);
  const max = Math.max(...inverted);
  const span = max - min || 1;
  const pts: Pt[] = inverted.map((v, i) => ({
    x: 2 + (i * (SPARK_W - 4)) / (inverted.length - 1),
    y: SPARK_H - 2 - ((v - min) / span) * (SPARK_H - 4),
  }));
  return (
    <svg
      className="gq-spark"
      viewBox={`0 0 ${SPARK_W} ${SPARK_H}`}
      width={SPARK_W}
      height={SPARK_H}
      fill="none"
    >
      <path
        d={monotonePath(pts)}
        stroke={color}
        strokeWidth={1.25}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
};
