import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

const POOL = "{}^`~#%&*+=<>|/\\dHiMoecgxkqz";

const hash = (a: number, b: number) => {
  const n = Math.sin(a * 12.9898 + b * 78.233) * 43758.5453;
  return n - Math.floor(n);
};

export const Scramble: React.FC<{
  text: string;
  from: number;
  to: number;
  style?: React.CSSProperties;
}> = ({ text, from, to, style }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [from, to], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const chars = text.split("").map((ch, i) => {
    if (ch === " ") return " ";
    const settle = hash(i, 7) * 0.7 + 0.3;
    if (p >= settle) return ch;
    if (p < settle - 0.45 && hash(i, frame) < 0.35) return " ";
    return POOL[Math.floor(hash(i * 3 + 1, Math.floor(frame / 2)) * POOL.length)];
  });
  return <span style={{ whiteSpace: "pre", ...style }}>{chars.join("")}</span>;
};
