import React from "react";
import { interpolateColors, useCurrentFrame } from "remotion";
import { AD_RED } from "../../kit/ad-objects";
import { DirectionalBlur } from "../../kit/directional-blur";
import { CLAUSES, HOT, TOKENS } from "./copy";
import { Line, spaceW, textW } from "./measure";
import { F, FOG, INK, X0, Y0 } from "./theme";
import { STORM } from "./timings";
import { WordAt } from "./word";

type Tone = "ink" | "fog";
type RowSpec = { dy: number; size: number; tone: Tone; dir: 1 | -1; v0: number; clause: number; shift: number };
type RowWord = { text: string; u: number; w: number; k: number; hot: boolean; seed: number };
type Row = RowSpec & { p: number[]; D: number; lo: number; hi: number; words: RowWord[]; baseline: number };

const ROWS: RowSpec[] = [
  { dy: -560, size: 96, tone: "ink", dir: -1, v0: 9, clause: 3, shift: -420 },
  { dy: -400, size: 62, tone: "fog", dir: 1, v0: 4.5, clause: 1, shift: 260 },
  { dy: -262, size: 150, tone: "ink", dir: -1, v0: 13, clause: 2, shift: -180 },
  { dy: -140, size: 56, tone: "fog", dir: 1, v0: 4, clause: 4, shift: 520 },
  { dy: 0, size: F, tone: "ink", dir: -1, v0: 10, clause: 0, shift: 0 },
  { dy: 132, size: 74, tone: "fog", dir: 1, v0: 6, clause: 2, shift: -300 },
  { dy: 330, size: 210, tone: "ink", dir: -1, v0: 19, clause: 1, shift: 140 },
  { dy: 452, size: 52, tone: "fog", dir: 1, v0: 4, clause: 3, shift: 60 },
  { dy: 600, size: 120, tone: "ink", dir: -1, v0: 12, clause: 4, shift: -520 },
  { dy: 730, size: 64, tone: "fog", dir: 1, v0: 5, clause: 0, shift: 380 },
];

const HERO = 4;
const KEEP = 4;
const L = -560;
const R = 2500;
const GONE = STORM.land + 50;

const speed = (v0: number, t: number) => {
  if (t >= STORM.freeze) return 0;
  if (t < STORM.brakeFrom) return v0 * (1 + 2.4 * (t / STORM.brakeFrom) ** 2);
  const k = (t - STORM.brakeFrom) / (STORM.freeze - STORM.brakeFrom);
  return v0 * 3.4 * (1 - k) ** 2;
};

const travel = (v0: number) => {
  const p = [0];
  for (let t = 1; t <= STORM.freeze; t++) p.push(p[t - 1] + speed(v0, t));
  return p;
};

const hash = (a: number, b: number) => {
  const s = Math.sin(a * 127.1 + b * 311.7) * 43758.5453;
  return s - Math.floor(s);
};

const buildRow = (spec: RowSpec, ri: number): Row => {
  const p = travel(spec.v0);
  const D = p[p.length - 1];
  const sp = spaceW(spec.size);
  const anchor = ri === HERO ? X0 : X0 + spec.shift;
  const lo = (spec.dir === -1 ? L - D : L) - 240;
  const hi = (spec.dir === -1 ? R : R + D) + 240;
  const n = TOKENS.length;
  const words: RowWord[] = [];
  let u = anchor;
  for (let i = CLAUSES[spec.clause], k = 0; u < hi; i++, k++) {
    const text = TOKENS[i % n];
    const w = textW(text, spec.size);
    words.push({ text, u, w, k, hot: HOT.has(text), seed: hash(ri + 1, k) });
    u += w + sp;
  }
  u = anchor;
  for (let i = CLAUSES[spec.clause] - 1, k = -1; u > lo; i--, k--) {
    const text = TOKENS[((i % n) + n) % n];
    const w = textW(text, spec.size);
    u -= w + sp;
    words.push({ text, u, w, k, hot: HOT.has(text), seed: hash(ri + 1, k) });
  }
  return { ...spec, p, D, lo, hi, words, baseline: Y0 + spec.dy };
};

let rows: Row[] | null = null;
const stormRows = () => (rows ??= ROWS.map(buildRow));

const kept = (ri: number, w: RowWord) => ri === HERO && w.k >= 0 && w.k < KEEP;

const fallStart = (row: Row, ri: number, w: RowWord, slotX: number) => {
  if (ri === HERO) return w.k >= KEEP ? STORM.land + 1 + (w.k - KEEP) * 0.7 : STORM.land + 2 + (-w.k - 1) * 0.7;
  const dist = Math.hypot(w.u + w.w / 2 - slotX, row.dy);
  return STORM.land + 1 + dist / 320 + w.seed * 2;
};

const colorOf = (row: Row, ri: number, w: RowWord, f: number) => {
  const base = row.tone === "ink" ? INK : FOG;
  if (!w.hot) return base;
  const hot = AD_RED;
  if (kept(ri, w)) return f < STORM.land ? hot : interpolateColors(f, [STORM.land, STORM.calm], [AD_RED, INK]);
  if (f >= STORM.freeze) return hot;
  return Math.floor((f + w.seed * 8) / 4) % 2 === 0 ? hot : base;
};

const StormRow: React.FC<{ row: Row; ri: number; f: number; slotX: number }> = ({ row, ri, f, slotX }) => {
  const off = -row.dir * (row.D - row.p[Math.max(0, Math.min(f, STORM.freeze))]);
  const v = speed(row.v0, f);
  const top = row.baseline - 1.3 * row.size;
  return (
    <DirectionalBlur
      id={`fs-row-${ri}`}
      x={Math.min(15, v * 0.3)}
      y={0}
      style={{ position: "absolute", left: row.lo, top, width: row.hi - row.lo, height: 1.8 * row.size, transform: `translateX(${off}px)` }}
    >
      {row.words.map((w, i) => {
        const stay = kept(ri, w);
        if (!stay && f > GONE) return null;
        const t0 = fallStart(row, ri, w, slotX);
        const d = stay ? 0 : Math.max(0, f - t0);
        const fy = d > 0 ? -4.5 * d + 1.9 * d * d : 0;
        if (fy > 1400) return null;
        const fx = d > 0 ? (w.u + w.w / 2 - slotX) * 0.0045 * d : 0;
        const x = w.u + off + fx;
        if (x + w.w < L - 120 || x > R + 120) return null;
        const rot = d > 0 ? (w.seed - 0.5) * 6 * d : 0;
        return (
          <WordAt
            key={i}
            text={w.text}
            x={w.u - row.lo}
            baseline={1.3 * row.size}
            size={row.size}
            color={colorOf(row, ri, w, f)}
            transform={d > 0 ? `translate(${fx}px, ${fy}px) rotate(${rot}deg)` : undefined}
          />
        );
      })}
    </DirectionalBlur>
  );
};

export const Storm: React.FC<{ statement: Line }> = ({ statement }) => {
  const f = useCurrentFrame();
  const rs = stormRows();
  return (
    <>
      {rs.map((row, ri) =>
        f > GONE && ri !== HERO ? null : <StormRow key={ri} row={row} ri={ri} f={f} slotX={statement.slotX} />,
      )}
    </>
  );
};
