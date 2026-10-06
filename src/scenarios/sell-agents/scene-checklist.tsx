import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { ramp, SPRINGS, useSpringAt } from "../../core/motion";
import { cascade } from "../../core/schedule";
import { DirectionalBlur } from "../../kit/directional-blur";
import { HEADLINE_FONT } from "../../kit/headline";
import { RiseLetters } from "../../kit/rise-letters";
import { CHECK, CORAL, GROUND, INK, ITEMS } from "./timings";

const seed = (i: number, k: number) => {
  const s = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453;
  return s - Math.floor(s);
};

const gaps = ITEMS.slice(1).map((_, i) => Math.max(CHECK.last, Math.round(CHECK.first - (CHECK.first - CHECK.last) * (i / (ITEMS.length - 2)) ** 0.6)));
const ORDER = ITEMS.map((_, i) => i).sort((a, b) => seed(a, 7) - seed(b, 7));
const MARKS = ORDER.reduce<number[]>((acc, item, k) => {
  acc[item] = cascade(CHECK.from, gaps)[k];
  return acc;
}, []);
const PILL_AT = Math.max(CHECK.pillAt, Math.max(...MARKS) + 4);
const COLS = 5;
const CHIP = { w: 420, h: 76, gx: 24, gy: 24 };
const FLY = 12;
const slot = (i: number) => {
  const col = i % COLS;
  const row = Math.floor(i / COLS);
  const rows = Math.ceil(ITEMS.length / COLS);
  const width = COLS * CHIP.w + (COLS - 1) * CHIP.gx;
  const height = rows * CHIP.h + (rows - 1) * CHIP.gy;
  return { x: 960 - width / 2 + col * (CHIP.w + CHIP.gx) + (row % 2 === 1 ? 130 : -40) + CHIP.w / 2, y: 560 - height / 2 + row * (CHIP.h + CHIP.gy) + CHIP.h / 2 };
};

const Chip: React.FC<{ i: number; text: string }> = ({ i, text }) => {
  const frame = useCurrentFrame();
  const at = MARKS[i];
  const p = ramp(frame, at - FLY, at, Easing.out(Easing.cubic));
  const prev = ramp(frame - 1, at - FLY, at, Easing.out(Easing.cubic));
  const suck = ramp(frame, CHECK.suck[0] + (i % 7), CHECK.suck[1], Easing.in(Easing.cubic));
  const suckPrev = ramp(frame - 1, CHECK.suck[0] + (i % 7), CHECK.suck[1], Easing.in(Easing.cubic));
  const dim = ramp(frame, PILL_AT - 2, PILL_AT + 10);
  const s = slot(i);
  const ang = seed(i, 1) * Math.PI * 2;
  const from = { x: 960 + Math.cos(ang) * 1400, y: 540 + Math.sin(ang) * 900 };
  const x0 = from.x + (s.x - from.x) * p;
  const y0 = from.y + (s.y - from.y) * p;
  const x = x0 + (960 - x0) * suck;
  const y = y0 + (560 - y0) * suck;
  const speed = Math.hypot(s.x - from.x, s.y - from.y) * Math.abs(p - prev) + Math.hypot(960 - s.x, 560 - s.y) * Math.abs(suck - suckPrev);
  if (p <= 0 || suck >= 1) return null;
  return (
    <DirectionalBlur id={`sa-chip-${i}`} x={speed * 0.22} y={speed * 0.22} style={{ position: "absolute", left: x - CHIP.w / 2, top: y - CHIP.h / 2, width: CHIP.w, height: CHIP.h, display: "flex", alignItems: "center", gap: 16, padding: "0 24px", borderRadius: 18, background: "#FFFFFF", boxShadow: "0 12px 30px rgba(15,23,42,0.10), 0 0 0 1px rgba(15,23,42,0.07)", fontFamily: HEADLINE_FONT, fontSize: 30, fontWeight: 500, color: INK, whiteSpace: "nowrap", opacity: 1 - 0.6 * dim, transform: `scale(${1 - 0.8 * suck}) rotate(${(seed(i, 2) - 0.5) * 6 * (1 - p)}deg)` }}>
      <span style={{ fontSize: 22, fontWeight: 600, color: CORAL, fontVariantNumeric: "tabular-nums" }}>{String(i + 1).padStart(2, "0")}</span>
      <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{text}</span>
    </DirectionalBlur>
  );
};

export const ChecklistScene: React.FC = () => {
  const frame = useCurrentFrame();
  const out = ramp(frame, CHECK.headOut[0], CHECK.headOut[1], Easing.in(Easing.cubic));
  const outPrev = ramp(frame - 1, CHECK.headOut[0], CHECK.headOut[1], Easing.in(Easing.cubic));
  const pill = useSpringAt(PILL_AT, SPRINGS.pop, 16);
  const swallow = ramp(frame, CHECK.suck[0] + 4, CHECK.suck[1] + 4);
  const tilt = interpolate(frame, [CHECK.from, PILL_AT], [0, -5], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const zoom = interpolate(frame, [CHECK.from, CHECK.len], [1.08, 0.94], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const h = CHECK.head;
  return (
    <AbsoluteFill style={{ background: GROUND, fontFamily: HEADLINE_FONT, color: INK }}>
      {frame < CHECK.headOut[1] ? (
        <DirectionalBlur id="sa-check-head" x={Math.abs(out - outPrev) * 1900 * 0.28} style={{ position: "absolute", left: 0, right: 0, top: 540, transform: `translate(${-out * 1900}px, -50%)`, textAlign: "center", fontSize: 118, fontWeight: 500, letterSpacing: "-0.02em", whiteSpace: "pre" }}>
          <RiseLetters text={["But", " how", " do", " you", " sell", " to", " an", " agent?"]} from={[h, h + 2, h + 4, h + 6, h + 9, h + 11, h + 13, h + 15]} len={7} rise={0.35} blur={12} letterStyle={(_, i) => (i >= 4 ? { color: CORAL } : {})} />
        </DirectionalBlur>
      ) : null}
      <AbsoluteFill style={{ transform: `rotate(${tilt}deg) scale(${zoom})`, transformOrigin: "50% 52%" }}>
        {ITEMS.map((text, i) => (
          <Chip key={text} i={i} text={text} />
        ))}
      </AbsoluteFill>
      {frame >= PILL_AT - 1 ? (
        <div style={{ position: "absolute", left: 0, right: 0, top: 560, display: "flex", justifyContent: "center", transform: "translateY(-50%)" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 22, padding: "30px 56px", borderRadius: 34, background: INK, color: "#FFFFFF", fontSize: 84, fontWeight: 500, letterSpacing: "-0.02em", boxShadow: "0 36px 90px rgba(15,23,42,0.35)", opacity: Math.min(1, pill * 1.6), transform: `scale(${(0.55 + 0.45 * pill) * (1 + 0.06 * swallow)}) rotate(${-3 * (1 - pill)}deg)`, whiteSpace: "nowrap" }}>
            <span style={{ color: "#F2B8A2", fontWeight: 600 }}>100+</span>
            things agents look for.
          </div>
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
