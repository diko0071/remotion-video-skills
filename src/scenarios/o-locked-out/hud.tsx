import React from "react";
import { Img, useCurrentFrame, useVideoConfig } from "remotion";
import { clamp01, ramp, springAt } from "../../core/motion";
import { SANS } from "../../kit/launch";
import { SettleLine } from "../../kit/settle-text";
import { toScreen } from "./camera";
import { Check, Padlock } from "./icons";
import { BLOCK, DOOR_FACE, HOOP, HOOP_Y, STAMP, stampBottom } from "./level";
import { G, INK, LOGOS, OK_GREEN } from "./theme";
import { DROP, END, LIFT, SMASHES, STATIONS } from "./timings";

const POP = { damping: 12, stiffness: 190, mass: 0.7 };
const NAMES = [
  { name: "Meta Ads", logo: LOGOS.meta },
  { name: "Google Ads", logo: LOGOS.google },
  { name: "Shopify", logo: LOGOS.shopify },
  { name: "Analytics", logo: LOGOS.ga4 },
] as const;
const RUN_ORDER = [3, 2, 1, 0] as const;

const PANEL = { top: 38, label: 158, slot: 64, gap: 12, count: 70, pad: 16 } as const;
const PANEL_W = PANEL.pad * 2 + PANEL.label + 4 * PANEL.slot + 3 * PANEL.gap + PANEL.gap + PANEL.count;
const slotCenter = (i: number) => ({
  x: 960 - PANEL_W / 2 + PANEL.pad + PANEL.label + i * (PANEL.slot + PANEL.gap) + PANEL.slot / 2,
  y: PANEL.top + PANEL.pad + PANEL.slot / 2,
});

export const CHIP = { fly: 10, land: 24 } as const;
const SOURCES = [
  { x: STAMP.x, y: stampBottom(1) - 260 },
  { x: HOOP.x, y: HOOP_Y - HOOP.r - 80 },
  { x: BLOCK.x, y: G - 330 },
  { x: DOOR_FACE.x, y: DOOR_FACE.y - 120 },
] as const;

const tile = (logo: string, size: number, grey = false) => (
  <div style={{ width: size, height: size, borderRadius: size * 0.26, background: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
    <Img src={logo} style={{ width: size * 0.62, height: size * 0.62, objectFit: "contain", filter: grey ? "grayscale(1)" : undefined, opacity: grey ? 0.35 : 1 }} />
  </div>
);

export const LevelChip: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const k = STATIONS.findIndex((l) => f >= l.from && f < l.to);
  if (k < 0) return null;
  const p = springAt(f, fps, STATIONS[k].from - 3, POP);
  return (
    <div
      style={{
        position: "absolute",
        left: 960,
        top: PANEL.top,
        transform: `translateX(-50%) scale(${0.75 + 0.25 * p})`,
        transformOrigin: "50% 0%",
        opacity: clamp01(p * 3),
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "12px 22px 12px 16px",
        borderRadius: 16,
        background: "#1C2230",
        fontFamily: SANS,
        whiteSpace: "nowrap",
        boxShadow: "0 14px 34px rgba(15,23,42,0.22)",
      }}
    >
      <Padlock size={26} color="#FFFFFF" hole="#1C2230" />
      <span style={{ fontSize: 19, fontWeight: 800, letterSpacing: "0.16em", color: "#8E97A4" }}>LEVEL 1-{k + 1}</span>
      <div style={{ width: 2, height: 30, background: "#3A4252" }} />
      <div style={{ filter: "grayscale(1)" }}>{tile(NAMES[k].logo, 40)}</div>
      <span style={{ fontSize: 27, fontWeight: 800, letterSpacing: "-0.01em", color: "#FFFFFF" }}>{NAMES[k].name}</span>
    </div>
  );
};

const landed = (f: number, i: number) => f >= SMASHES[i] + CHIP.land;

export const Tracker: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (f < DROP || f >= LIFT.sky) return null;
  const enter = springAt(f, fps, DROP + 3, POP);
  const leave = ramp(f, LIFT.launch + 4, LIFT.sky - 6);
  const count = SMASHES.filter((_, i) => landed(f, i)).length;
  return (
    <div
      style={{
        position: "absolute",
        left: 960 - PANEL_W / 2,
        top: PANEL.top,
        width: PANEL_W,
        boxSizing: "border-box",
        transform: `translateY(${(1 - enter) * -50 - leave * 50}px)`,
        opacity: clamp01(enter * 2) * (1 - leave),
        display: "flex",
        alignItems: "center",
        padding: PANEL.pad,
        gap: PANEL.gap,
        borderRadius: 22,
        background: "#FFFFFF",
        boxShadow: "0 16px 40px rgba(15,23,42,0.18)",
        fontFamily: SANS,
      }}
    >
      <span style={{ width: PANEL.label - PANEL.gap, fontSize: 26, fontWeight: 800, color: INK, letterSpacing: "-0.01em" }}>Connected</span>
      {RUN_ORDER.map((idx, i) => {
        const n = NAMES[idx];
        const on = landed(f, i);
        const pop = springAt(f, fps, SMASHES[i] + CHIP.land, POP);
        return (
          <div key={n.name} style={{ position: "relative", width: PANEL.slot, height: PANEL.slot, borderRadius: 18, background: on ? "#EAF8EE" : "#F1F3F6", display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${on ? 0.85 + 0.15 * Math.min(1.12, pop) : 1})` }}>
            {tile(n.logo, 50, !on)}
            {on ? (
              <div style={{ position: "absolute", right: -6, bottom: -6 }}>
                <Check size={24} color="#FFFFFF" bg={OK_GREEN} />
              </div>
            ) : null}
          </div>
        );
      })}
      <span style={{ width: PANEL.count, textAlign: "right", fontSize: 30, fontWeight: 800, color: count === 4 ? OK_GREEN : INK, fontVariantNumeric: "tabular-nums" }}>{count}/4</span>
    </div>
  );
};

export const Chips: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <>
      {SMASHES.map((at, i) => {
        const t = f - at;
        if (t < 0 || t >= CHIP.land) return null;
        const src = toScreen(f, SOURCES[i].x, SOURCES[i].y);
        const dst = slotCenter(i);
        const k = ramp(f, at + CHIP.fly, at + CHIP.land);
        const e = k * k * (3 - 2 * k);
        const pop = springAt(f, fps, at, POP);
        const x = src.x + (dst.x - src.x) * e;
        const y = src.y + (dst.y - src.y) * e;
        const scale = (0.6 + 0.4 * Math.min(1.1, pop)) * (1 - 0.7 * e);
        return (
          <div
            key={at}
            style={{
              position: "absolute",
              left: x,
              top: y,
              transform: `translate(-50%, -50%) scale(${scale})`,
              opacity: clamp01(pop * 3),
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 20px 12px 12px",
              borderRadius: 18,
              background: "#FFFFFF",
              boxShadow: "0 16px 36px rgba(15,23,42,0.22)",
              fontFamily: SANS,
              whiteSpace: "nowrap",
            }}
          >
            {tile(NAMES[RUN_ORDER[i]].logo, 48)}
            <span style={{ fontSize: 27, fontWeight: 800, color: INK }}>Connected</span>
            <Check size={30} color="#FFFFFF" bg={OK_GREEN} />
          </div>
        );
      })}
    </>
  );
};

const LINE = ["Give", "your", "dot", "the", "keys."] as const;

export const EndCard: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (f < END.text - 2) return null;
  const p = springAt(f, fps, END.plate, POP);
  return (
    <>
      <div style={{ position: "absolute", left: 0, top: 250, width: 1920, height: 200, textShadow: "0 6px 26px rgba(10,60,120,0.28)" }}>
        <SettleLine parts={LINE.map((word, i) => ({ word, at: END.text + i * 3 }))} size={112} ink="#FFFFFF" fontFamily={SANS} lineHeight={1.1} />
      </div>
      <div
        style={{
          position: "absolute",
          left: 960,
          top: 520,
          transform: `translateX(-50%) translateY(${(1 - p) * 40}px) scale(${0.8 + 0.2 * p})`,
          opacity: clamp01(p * 2.5),
          padding: "26px 54px 30px",
          borderRadius: 30,
          background: "#FFFFFF",
          boxShadow: "0 24px 60px rgba(10,50,110,0.25)",
          fontFamily: SANS,
          fontSize: 96,
          fontWeight: 800,
          letterSpacing: "-0.035em",
          color: INK,
          whiteSpace: "nowrap",
        }}
      >
        ryze.ai/gpt
      </div>
    </>
  );
};
