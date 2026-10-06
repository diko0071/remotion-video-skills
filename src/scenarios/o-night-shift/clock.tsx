import React from "react";
import { Easing, useCurrentFrame } from "remotion";
import { measureText } from "@remotion/layout-utils";
import { clamp01, ramp } from "../../core/motion";
import { DirectionalBlur } from "../../kit/directional-blur";
import { GlyphBall } from "../../kit/glyph-ball";
import { C, SANS } from "../../kit/launch";
import { PLATE } from "./theme";
import { BALL_SLOT, CLOCK, END, NS_TOTAL } from "./timings";

export const CLOCK_FONT = 96;
const LINE = 1.08;
const PAD_X = 0.16;
const PAD_TOP = 0.04;
const PAD_BOTTOM = 0.08;
const ROLL = 8;
const STAGGER = 1;
const HUD = { x: 72, y: 122 };
export const FINAL = { cx: 960, cy: 640, scale: 1.8 };
const SLOT = 0.5;
const BALL = 0.42;

const eio = Easing.inOut(Easing.cubic);
const eo = Easing.out(Easing.cubic);

const widths = new Map<string, number>();
const charW = (ch: string) => {
  if (!ch) return 0;
  if (ch === BALL_SLOT) return SLOT * CLOCK_FONT;
  const hit = widths.get(ch);
  if (hit !== undefined) return hit;
  const w = measureText({ text: ch, fontFamily: SANS, fontSize: CLOCK_FONT, fontWeight: "800", letterSpacing: "-0.035em", fontVariantNumeric: "tabular-nums" }).width;
  const v = w > 0 ? w : CLOCK_FONT * 0.26;
  widths.set(ch, v);
  return v;
};

const padLeft = (s: string, n: number) => [...Array(Math.max(0, n - s.length)).fill(""), ...s.split("")];

type Column = { old: string; next: string; p: number; speed: number; width: number };

const columnsAt = (f: number): Column[] => {
  let k = -1;
  for (let i = 0; i < CLOCK.length; i++) if (CLOCK[i].at <= f) k = i;
  if (k < 0) return [];
  const prev = k > 0 ? CLOCK[k - 1].text : "";
  const next = CLOCK[k].text;
  const n = Math.max(prev.length, next.length);
  const a = padLeft(prev, n);
  const b = padLeft(next, n);
  return b.map((ch, j) => {
    const start = CLOCK[k].at + j * STAGGER;
    const changed = a[j] !== ch;
    const p = changed ? eo(clamp01((f - start) / ROLL)) : 1;
    const pPrev = changed ? eo(clamp01((f - 1 - start) / ROLL)) : 1;
    return { old: changed ? a[j] : "", next: ch, p, speed: Math.abs(p - pPrev), width: charW(a[j]) + (charW(ch) - charW(a[j])) * eio(p) };
  });
};

const Glyph: React.FC<{ ch: string; y: number; width: number; opacity: number }> = ({ ch, y, width, opacity }) =>
  ch && ch !== BALL_SLOT ? (
    <span
      style={{
        position: "absolute",
        left: (width - charW(ch)) / 2,
        top: 0,
        width: charW(ch),
        textAlign: "center",
        transform: `translateY(${y}em)`,
        opacity,
      }}
    >
      {ch}
    </span>
  ) : null;

const Col: React.FC<{ col: Column; index: number; f: number }> = ({ col, index, f }) =>
  col.next === BALL_SLOT ? (
    <BallSlot f={f} width={col.width} />
  ) : (
  <DirectionalBlur id={`ns-clock-${index}`} x={0} y={col.speed * 70} style={{ position: "relative", width: col.width, height: `${LINE}em`, overflow: "hidden", flex: "none" }}>
    <Glyph ch={col.old} y={-col.p * LINE} width={col.width} opacity={1 - col.p} />
    <Glyph ch={col.next} y={(1 - col.p) * LINE} width={col.width} opacity={clamp01(col.p * 1.6)} />
  </DirectionalBlur>
  );

const plateWidth = (text: string) => [...text].reduce((s, ch) => s + charW(ch), 0) + 2 * PAD_X * CLOCK_FONT;
const plateHeight = () => (LINE + PAD_TOP + PAD_BOTTOM) * CLOCK_FONT;

const moveAt = (f: number) => eio(ramp(f, END.plateFrom, END.plateFrom + END.plateLen));
const pushAt = (f: number) => 1 + 0.07 * ramp(f, END.plateFrom + END.plateLen, NS_TOTAL);

const BallSlot: React.FC<{ f: number; width: number }> = ({ f, width }) => {
  const size = BALL * CLOCK_FONT;
  const rise = clamp01((f - END.drop) / (END.land - END.drop));
  const y = f < END.land ? (1 - eo(rise)) * CLOCK_FONT * 1.7 : 0;
  const d = f - END.land;
  const squash = d >= 0 && d < 24 ? 0.22 * Math.exp(-d / 4) * Math.cos(d * 0.9) : 0;
  if (f < END.drop) return <div style={{ width, flex: "none" }} />;
  return (
    <div style={{ position: "relative", width, height: `${LINE}em`, flex: "none" }}>
      <div style={{ position: "absolute", left: (width - size) / 2, top: LINE * CLOCK_FONT * 0.86 - size + y, opacity: clamp01((f - END.drop) / 3) }}>
        <GlyphBall
          f={f}
          size={size}
          ball="o"
          track={[{ at: -99, eyes: "happy" }, { at: END.wink, eyes: "wink" }, { at: END.wink + 16, eyes: "happy" }]}
          squash={squash}
          shadow={0}
          blinks={[END.land + 34]}
        />
      </div>
    </div>
  );
};

export const ClockPlate: React.FC = () => {
  const f = useCurrentFrame();
  const cols = columnsAt(f);
  if (cols.length === 0) return null;
  const enter = eo(ramp(f, CLOCK[0].at, CLOCK[0].at + 8));
  const m = moveAt(f);
  const finalW = plateWidth(CLOCK[CLOCK.length - 1].text);
  const endScale = FINAL.scale * pushAt(f);
  const fx = FINAL.cx - (finalW * endScale) / 2;
  const fy = FINAL.cy - (plateHeight() * endScale) / 2;
  const x = HUD.x + (fx - HUD.x) * m;
  const y = HUD.y + (fy - HUD.y) * m;
  const s = 1 + (endScale - 1) * m;
  const mPrev = moveAt(f - 1);
  const v = Math.hypot((fx - HUD.x) * (m - mPrev), (fy - HUD.y) * (m - mPrev));
  return (
    <DirectionalBlur id="ns-clock-move" x={v * 0.18} y={v * 0.1} style={{ position: "absolute", left: x, top: y, transform: `scale(${s})`, transformOrigin: "0 0", zIndex: 30 }}>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          padding: `${PAD_TOP}em ${PAD_X * enter}em ${PAD_BOTTOM}em`,
          background: PLATE,
          opacity: clamp01(enter * 2),
          fontFamily: SANS,
          fontWeight: 800,
          fontSize: CLOCK_FONT,
          lineHeight: LINE,
          letterSpacing: "-0.035em",
          fontVariantNumeric: "tabular-nums",
          color: C.ink,
          whiteSpace: "nowrap",
        }}
      >
        {cols.map((col, j) => (
          <Col key={j} col={col} index={j} f={f} />
        ))}
      </div>
    </DirectionalBlur>
  );
};
