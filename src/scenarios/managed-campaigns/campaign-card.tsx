import React from "react";
import { AbsoluteFill, Easing, Img, interpolateColors, useCurrentFrame, useVideoConfig } from "remotion";
import { clamp01, ramp, springAt } from "../../core/motion";
import { AD_GREEN, CARD_SHADOW_SOFT } from "../../kit/ad-objects";
import { C, SANS } from "../../kit/launch";
import { AskBody } from "./body-ask";
import { ReviewBody } from "./body-review";
import { SetupBody } from "./body-setup";
import { POP } from "./parts";
import { AMBER, BLUE, BODY_H, CARD, LOGOS } from "./theme";
import { T } from "./timings";

export const HEADER_H = 128;
export const ASK_SEND = T.asks.asks - 8;
export const LIVE_AGAIN = ASK_SEND + 6;

const STATES = [
  { at: -Infinity, label: "Setting up", fg: "#1D4ED8", bg: "#DBEAFE", dot: BLUE },
  { at: T.step3.launches, label: "Live", fg: "#0F7A3A", bg: "#E7F7EC", dot: AD_GREEN },
  { at: T.asks.needs, label: "Needs your input", fg: "#92400E", bg: "#FEF3C7", dot: AMBER },
  { at: LIVE_AGAIN, label: "Live", fg: "#0F7A3A", bg: "#E7F7EC", dot: AD_GREEN },
] as const;

const StatusPill: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  let i = 0;
  for (let k = 0; k < STATES.length; k++) if (f >= STATES[k].at) i = k;
  const s = STATES[i];
  const prev = i > 0 ? STATES[i - 1] : s;
  const t = i > 0 ? clamp01((f - s.at) / 6) : 1;
  const pop = i > 0 ? springAt(f, fps, s.at, { damping: 9, stiffness: 220, mass: 0.6 }) : 1;
  const pulse = 0.5 + 0.5 * Math.sin(f / 5);
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: "9px 18px 11px",
        borderRadius: 12,
        background: interpolateColors(t, [0, 1], [prev.bg, s.bg]),
        color: interpolateColors(t, [0, 1], [prev.fg, s.fg]),
        fontSize: 26,
        fontWeight: 800,
        whiteSpace: "nowrap",
        transform: `scale(${0.85 + 0.15 * pop})`,
      }}
    >
      <span style={{ position: "relative", width: 13, height: 13 }}>
        <span style={{ position: "absolute", inset: 0, borderRadius: 7, background: s.dot }} />
        <span style={{ position: "absolute", inset: -8 * pulse, borderRadius: "50%", border: `2px solid ${s.dot}`, opacity: 1 - pulse }} />
      </span>
      {s.label}
    </span>
  );
};

const Layer: React.FC<{ from: number; to: number; children: React.ReactNode }> = ({ from, to, children }) => {
  const f = useCurrentFrame();
  if (f < from - 1 || f > to + 8) return null;
  const inn = ramp(f, from + 5, from + 13, Easing.out(Easing.cubic));
  const out = ramp(f, to - 2, to + 5, Easing.in(Easing.cubic));
  return (
    <div style={{ position: "absolute", left: 0, top: HEADER_H, width: CARD.w, height: BODY_H, opacity: inn * (1 - out), transform: `translateY(${(1 - inn) * 24 - out * 16}px)` }}>
      {children}
    </div>
  );
};

export const CampaignCard: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (f < T.step2.at - 2 || f >= T.close.cut) return null;
  const enter = springAt(f, fps, T.step2.at, POP);
  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: CARD.x - CARD.w / 2,
          top: CARD.top,
          width: CARD.w,
          height: HEADER_H + BODY_H,
          borderRadius: 28,
          background: C.white,
          boxShadow: CARD_SHADOW_SOFT,
          fontFamily: SANS,
          color: C.ink,
          overflow: "hidden",
          opacity: clamp01(enter * 2),
          transform: `translateY(${(1 - enter) * 70}px) scale(${0.94 + 0.06 * enter})`,
        }}
      >
        <div style={{ position: "absolute", left: 0, top: 0, width: CARD.w, height: HEADER_H, display: "flex", alignItems: "center", gap: 16, padding: "0 40px", boxSizing: "border-box", borderBottom: `1.5px solid ${C.border}` }}>
          <Img src={LOGOS.meta} style={{ width: 46, height: 46, objectFit: "contain" }} />
          <Img src={LOGOS.google} style={{ width: 40, height: 40, objectFit: "contain" }} />
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.15, marginLeft: 8 }}>
            <span style={{ fontSize: 38, fontWeight: 800, letterSpacing: "-0.03em" }}>Fishwife | More sales</span>
            <span style={{ fontSize: 22, fontWeight: 600, color: C.mutedFg }}>$50 / day · Meta, Google · More sales</span>
          </div>
          <span style={{ marginLeft: "auto" }}>
            <StatusPill />
          </span>
        </div>
        <Layer from={T.step2.at} to={T.step4.at}>
          <SetupBody />
        </Layer>
        <Layer from={T.step4.at} to={T.asks.at}>
          <ReviewBody />
        </Layer>
        <Layer from={T.asks.at} to={T.close.cut + 20}>
          <AskBody />
        </Layer>
      </div>
    </AbsoluteFill>
  );
};
