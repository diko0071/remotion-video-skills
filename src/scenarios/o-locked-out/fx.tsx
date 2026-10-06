import React from "react";
import { clamp01 } from "../../core/motion";
import { G } from "./theme";

const hash = (i: number, k: number) => {
  const s = Math.sin(i * 127.1 + k * 311.7) * 43758.5453;
  return s - Math.floor(s);
};

type Rect = { x: number; y: number; w: number; h: number };
type Pt = { x: number; y: number };

export const Shards: React.FC<{ f: number; at: number; rect: Rect; impact: Pt; fill: string; stroke: string; cols?: number; rows?: number; push?: number; life?: number }> = ({
  f,
  at,
  rect,
  impact,
  fill,
  stroke,
  cols = 4,
  rows = 6,
  push = 12,
  life = 22,
}) => {
  const t = f - at;
  if (t < 0 || t > life) return null;
  const v = (i: number, j: number): Pt => {
    const jx = i === 0 || i === cols ? 0 : (hash(i * 31 + j, 4) - 0.5) * 0.7;
    const jy = j === 0 || j === rows ? 0 : (hash(i * 17 + j, 5) - 0.5) * 0.7;
    return { x: rect.x + ((i + jx) / cols) * rect.w, y: rect.y + ((j + jy) / rows) * rect.h };
  };
  const tris: Pt[][] = [];
  for (let i = 0; i < cols; i++)
    for (let j = 0; j < rows; j++) {
      const a = v(i, j);
      const b = v(i + 1, j);
      const c = v(i + 1, j + 1);
      const d = v(i, j + 1);
      if (hash(i, j + 9) > 0.5) tris.push([a, b, c], [a, c, d]);
      else tris.push([a, b, d], [b, c, d]);
    }
  const reach = Math.hypot(rect.w, rect.h);
  return (
    <svg style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }} width={1} height={1}>
      {tris.map((tri, k) => {
        const c = { x: (tri[0].x + tri[1].x + tri[2].x) / 3, y: (tri[0].y + tri[1].y + tri[2].y) / 3 };
        const len = Math.hypot(c.x - impact.x, c.y - impact.y) || 1;
        const near = 1 - Math.min(1, len / reach);
        const speed = 5 + 13 * near + 6 * hash(k, 2);
        const vx = ((c.x - impact.x) / len) * speed + push * (0.5 + hash(k, 6));
        const vy = ((c.y - impact.y) / len) * speed - 7 - 7 * hash(k, 8);
        const dx = vx * t;
        const dy = vy * t + 1.5 * t * t;
        const rot = (hash(k, 3) - 0.5) * 30 * t;
        const shrink = 1 - 0.35 * (t / life);
        const op = 1 - clamp01((t - life * 0.6) / (life * 0.4));
        return (
          <polygon
            key={k}
            points={tri.map((p) => `${p.x},${p.y}`).join(" ")}
            transform={`translate(${dx} ${dy}) rotate(${rot} ${c.x} ${c.y}) translate(${c.x * (1 - shrink)} ${c.y * (1 - shrink)}) scale(${shrink})`}
            fill={fill}
            stroke={stroke}
            strokeWidth={3}
            strokeLinejoin="round"
            opacity={op}
          />
        );
      })}
    </svg>
  );
};

export const Dust: React.FC<{ f: number; at: number; x: number; spread: number }> = ({ f, at, x, spread }) => {
  const t = f - at;
  if (t < 0 || t > 24) return null;
  const out = 1 - Math.exp(-t / 5);
  return (
    <svg style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }} width={1} height={1}>
      {[-1, 1].flatMap((side) =>
        [0, 1, 2].map((i) => {
          const r = (18 + i * 9) * (0.55 + 0.7 * (1 - Math.exp(-t / 4)));
          return (
            <circle
              key={`${side}-${i}`}
              cx={x + side * (spread * 0.35 + i * spread * 0.22) * out}
              cy={G - 14 - i * 10 - t * 0.7}
              r={r}
              fill="#FFFFFF"
              opacity={0.92 * (1 - t / 24)}
            />
          );
        }),
      )}
    </svg>
  );
};

export const Tufts: React.FC<{ from: number; to: number; gap: number; color: string; clear: readonly (readonly [number, number])[] }> = ({ from, to, gap, color, clear }) => {
  const xs: number[] = [];
  for (let x = from, i = 0; x < to; x += gap, i++) xs.push(x + (hash(i, 7) - 0.5) * gap * 0.5);
  const free = xs.filter((x) => !clear.some(([a, b]) => x > a - 30 && x < b + 30));
  return (
    <svg style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }} width={1} height={1}>
      {free.map((x, i) => {
        const s = 0.8 + hash(i, 9) * 0.5;
        return (
          <path
            key={i}
            d={`M ${x - 16 * s} ${G + 6} L ${x - 9 * s} ${G - 22 * s} L ${x - 2 * s} ${G + 6} M ${x - 5 * s} ${G + 6} L ${x + 2 * s} ${G - 32 * s} L ${x + 9 * s} ${G + 6} M ${x + 6 * s} ${G + 6} L ${x + 14 * s} ${G - 18 * s} L ${x + 20 * s} ${G + 6}`}
            fill={color}
            stroke={color}
            strokeWidth={5}
            strokeLinejoin="round"
          />
        );
      })}
    </svg>
  );
};

export const GroundShadow: React.FC<{ x: number; width: number; opacity: number }> = ({ x, width, opacity }) => (
  <div
    style={{
      position: "absolute",
      left: x - width / 2,
      top: G - width * 0.09,
      width,
      height: width * 0.18,
      borderRadius: "50%",
      background: `rgba(20, 40, 30, ${opacity})`,
      filter: `blur(${width * 0.06}px)`,
    }}
  />
);

export const Cloud: React.FC<{ x: number; y: number; s: number }> = ({ x, y, s }) => (
  <svg style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }} width={1} height={1}>
    <g transform={`translate(${x} ${y}) scale(${s})`} fill="#FFFFFF">
      <rect x={-150} y={-10} width={300} height={70} rx={35} />
      <circle cx={-70} cy={-4} r={56} />
      <circle cx={18} cy={-34} r={76} />
      <circle cx={96} cy={4} r={48} />
    </g>
  </svg>
);
