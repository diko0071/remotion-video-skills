import React from "react";
import { BotKey, BOTS, Eye, EyeMood } from "./bots";

export type Gaze = { x: number; y: number };

const EyeShape: React.FC<{ eye: Eye; mood: EyeMood; blink: number; gaze: Gaze; fill: string }> = ({ eye, mood, blink, gaze, fill }) => {
  const dx = gaze.x * 9;
  const dy = gaze.y * 7;
  const sy = 1 - blink * 0.92;
  const happy = eye.happy || mood === "happy";
  if (happy) {
    const w = eye.rx;
    const h = eye.ry;
    return <path d={`M${eye.cx - w + dx} ${eye.cy + h * 0.45 + dy}Q${eye.cx + dx} ${eye.cy - h * 1.2 + dy} ${eye.cx + w + dx} ${eye.cy + h * 0.45 + dy}`} fill="none" stroke={fill} strokeWidth={Math.max(6, h * 0.7)} strokeLinecap="round" transform={`translate(0 ${eye.cy}) scale(1 ${sy}) translate(0 ${-eye.cy})`} />;
  }
  return <ellipse cx={eye.cx + dx} cy={eye.cy + dy} rx={eye.rx} ry={eye.ry} fill={fill} transform={`translate(0 ${eye.cy + dy}) scale(1 ${sy}) translate(0 ${-eye.cy - dy})`} />;
};

export const Bot: React.FC<{
  kind: BotKey;
  size: number;
  color?: string;
  eyeColor?: string;
  mood?: EyeMood;
  blink?: number;
  gaze?: Gaze;
  rotate?: number;
  squash?: number;
  style?: React.CSSProperties;
}> = ({ kind, size, color, eyeColor = "#FFFFFF", mood = "open", blink = 0, gaze = { x: 0, y: 0 }, rotate = 0, squash = 0, style }) => {
  const spec = BOTS[kind];
  const w = size * (spec.aspect >= 1 ? 1 : spec.aspect);
  const h = size * (spec.aspect >= 1 ? 1 / spec.aspect : 1);
  return (
    <svg width={w} height={h} viewBox="-100 -100 200 200" style={{ display: "block", overflow: "visible", transform: `rotate(${rotate}deg) scale(${1 + squash * 0.18}, ${1 - squash * 0.22})`, transformOrigin: "50% 100%", ...style }}>
      <path d={spec.path} fill={color ?? spec.color} />
      {spec.eyes.map((e, i) => (
        <EyeShape key={i} eye={e} mood={mood} blink={blink} gaze={gaze} fill={eyeColor} />
      ))}
    </svg>
  );
};

export const blinkAt = (frame: number, at: number, span = 7) => {
  const t = frame - at;
  if (t <= 0 || t >= span) return 0;
  const h = span / 2;
  return t < h ? t / h : (span - t) / h;
};

export const blinkTrack = (frame: number, ats: readonly number[], span = 7) => ats.reduce((m, at) => Math.max(m, blinkAt(frame, at, span)), 0);
