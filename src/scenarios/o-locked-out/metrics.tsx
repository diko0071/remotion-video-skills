import React from "react";
import { Easing } from "remotion";
import { clamp01, ramp, springAt } from "../../core/motion";
import { SANS } from "../../kit/launch";
import { SKY } from "./level";
import { G, INK, OK_GREEN } from "./theme";
import { FALL, WAVE } from "./timings";

const POP = { damping: 11, stiffness: 170, mass: 0.7 };
const out = Easing.out(Easing.cubic);

export const waveAt = (x: number) => FALL.land + Math.abs(x - SKY.x) / WAVE.speed;

const CARDS = [
  { x: 260, w: 360, stem: 200, label: "CPA", to: 61, format: (v: number) => `−${Math.round(v)}%`, down: true },
  { x: 940, w: 340, stem: 430, label: "ROAS", to: 4.1, format: (v: number) => `${v.toFixed(1)}x`, down: false },
  { x: 1420, w: 340, stem: 430, label: "Orders", to: 312, format: (v: number) => `+${Math.round(v)}`, down: false },
  { x: 1860, w: 400, stem: 200, label: "Revenue", to: 12480, format: (v: number) => `+$${Math.round(v).toLocaleString("en-US")}`, down: false },
] as const;

const BARS = [
  { x: 600, heights: [150, 220, 300, 390, 480] },
  { x: 2160, heights: [170, 250, 340, 440] },
] as const;

const COINS = [
  { x: 420, value: "+$84" },
  { x: 760, value: "+$129" },
  { x: 1120, value: "+$62" },
  { x: 1360, value: "+$210" },
  { x: 1640, value: "+$96" },
  { x: 2000, value: "+$148" },
] as const;

const CARD_H = 150;
const BAR = { w: 56, gap: 14 } as const;

const Arrow: React.FC<{ down: boolean }> = ({ down }) => (
  <svg width={44} height={44} viewBox="0 0 44 44" style={{ display: "block" }}>
    <rect width={44} height={44} rx={12} fill="#E7F8EC" />
    <path d={down ? "M22 31 L13 19 H31 Z" : "M22 13 L31 25 H13 Z"} fill={OK_GREEN} />
  </svg>
);

const StatCard: React.FC<{ f: number; fps: number; card: (typeof CARDS)[number] }> = ({ f, fps, card }) => {
  const at = waveAt(card.x);
  const p = springAt(f, fps, at, POP);
  if (f < at) return null;
  const count = card.to * out(ramp(f, at + 4, at + 22));
  return (
    <>
      <div style={{ position: "absolute", left: card.x - 6, top: G - card.stem * Math.min(1, p), width: 12, height: card.stem * Math.min(1, p), borderRadius: 6, background: "#2B3240" }} />
      <div
        style={{
          position: "absolute",
          left: card.x - card.w / 2,
          top: G - card.stem * Math.min(1, p) - CARD_H,
          width: card.w,
          height: CARD_H,
          boxSizing: "border-box",
          padding: "22px 26px",
          borderRadius: 24,
          background: "#FFFFFF",
          boxShadow: "0 22px 46px rgba(10,50,30,0.22)",
          transform: `scale(${0.55 + 0.45 * p})`,
          transformOrigin: "50% 100%",
          opacity: clamp01(p * 2.5),
          fontFamily: SANS,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{ fontSize: 26, fontWeight: 700, color: "#65676B" }}>{card.label}</span>
          <span style={{ fontSize: 58, fontWeight: 800, letterSpacing: "-0.03em", color: INK, fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }}>{card.format(count)}</span>
        </div>
        <Arrow down={card.down} />
      </div>
    </>
  );
};

const Bars: React.FC<{ f: number; fps: number; bars: (typeof BARS)[number] }> = ({ f, fps, bars }) => {
  const at = waveAt(bars.x);
  if (f < at) return null;
  const width = bars.heights.length * BAR.w + (bars.heights.length - 1) * BAR.gap;
  return (
    <>
      {bars.heights.map((h, i) => {
        const p = springAt(f, fps, at + i * 2, POP);
        const height = h * p;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: bars.x - width / 2 + i * (BAR.w + BAR.gap),
              top: G - height,
              width: BAR.w,
              height,
              borderRadius: "14px 14px 4px 4px",
              background: OK_GREEN,
              boxShadow: "inset 0 10px 0 rgba(255,255,255,0.22)",
            }}
          />
        );
      })}
    </>
  );
};

const Coin: React.FC<{ f: number; coin: (typeof COINS)[number] }> = ({ f, coin }) => {
  const at = waveAt(coin.x) + 3;
  const t = f - at;
  if (t < 0 || t > 30) return null;
  const rise = 460 * out(clamp01(t / 26));
  return (
    <div
      style={{
        position: "absolute",
        left: coin.x,
        top: G - 70 - rise,
        transform: `translateX(-50%) scale(${0.6 + 0.4 * clamp01(t / 5)})`,
        opacity: clamp01(t / 3) * (1 - clamp01((t - 20) / 10)),
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 18px 10px 10px",
        borderRadius: 18,
        background: "#FFFFFF",
        boxShadow: "0 14px 30px rgba(10,50,30,0.2)",
        fontFamily: SANS,
        whiteSpace: "nowrap",
      }}
    >
      <div style={{ width: 38, height: 38, borderRadius: 19, background: OK_GREEN, color: "#FFFFFF", fontSize: 24, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>$</div>
      <span style={{ fontSize: 23, fontWeight: 700, color: INK }}>New order</span>
      <span style={{ fontSize: 23, fontWeight: 800, color: OK_GREEN }}>{coin.value}</span>
    </div>
  );
};

const Shockwave: React.FC<{ f: number }> = ({ f }) => {
  const t = f - FALL.land;
  if (t < 0 || t > 30) return null;
  const rx = 120 + WAVE.speed * t;
  return (
    <svg style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }} width={1} height={1}>
      <ellipse cx={SKY.x} cy={G} rx={rx} ry={rx * 0.07} fill="none" stroke="#FFFFFF" strokeWidth={Math.max(3, 16 - t * 0.45)} opacity={1 - t / 30} />
    </svg>
  );
};

export const Metrics: React.FC<{ f: number; fps: number }> = ({ f, fps }) => {
  if (f < FALL.land) return null;
  return (
    <>
      <Shockwave f={f} />
      {BARS.map((b) => (
        <Bars key={b.x} f={f} fps={fps} bars={b} />
      ))}
      {CARDS.map((c) => (
        <StatCard key={c.label} f={f} fps={fps} card={c} />
      ))}
      {COINS.map((c) => (
        <Coin key={c.x} f={f} coin={c} />
      ))}
    </>
  );
};
