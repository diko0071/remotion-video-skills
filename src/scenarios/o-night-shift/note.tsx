import React from "react";
import { Img, useCurrentFrame, useVideoConfig } from "remotion";
import { clamp01, springAt } from "../../core/motion";
import { EyeKey, GlyphBall } from "../../kit/glyph-ball";
import { C, SANS } from "../../kit/launch";
import { CARD_SHADOW } from "../../kit/ad-objects";
import { RYZE_SUN, SUN_ASPECT } from "./theme";

export const NOTE = { cx: 960, cy: 516, w: 830 };

export const ONote: React.FC<{ time: string; text: string; eyes?: readonly EyeKey[]; popAt?: number; size?: number }> = ({
  time,
  text,
  eyes = [{ at: -99, eyes: "star" }],
  popAt,
  size = 36,
}) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = popAt === undefined ? 1 : springAt(f, fps, popAt, { damping: 13, stiffness: 170, mass: 0.7 });
  const o = popAt === undefined ? 1 : clamp01((f - popAt) / 4);
  return (
    <div
      style={{
        position: "absolute",
        left: NOTE.cx - NOTE.w / 2,
        top: NOTE.cy,
        width: NOTE.w,
        transform: `translateY(-50%) translateY(${(1 - s) * 30}px) scale(${0.9 + 0.1 * s})`,
        opacity: o,
        zIndex: 10,
        boxSizing: "border-box",
        padding: "26px 34px 32px",
        borderRadius: 26,
        background: C.white,
        boxShadow: CARD_SHADOW,
        fontFamily: SANS,
        color: C.ink,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
        <GlyphBall f={f} size={56} ball="o" track={eyes} shadow={0} blinks={[18, 64]} />
        <span style={{ fontSize: 27, fontWeight: 800, letterSpacing: "-0.02em" }}>Your dot</span>
        <span style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 20, fontWeight: 600, color: C.mutedFg }}>
          via
          <Img src={RYZE_SUN} style={{ width: 18, height: 18 * SUN_ASPECT }} />
          Ryze
        </span>
        <span style={{ marginLeft: "auto", fontSize: 20, fontWeight: 600, color: C.mutedFg, fontVariantNumeric: "tabular-nums" }}>{time}</span>
      </div>
      <div style={{ fontSize: size, fontWeight: 700, lineHeight: 1.24, letterSpacing: "-0.022em" }}>{text}</div>
    </div>
  );
};
