import React from "react";
import { AbsoluteFill, Easing, Img, interpolateColors, useCurrentFrame, useVideoConfig } from "remotion";
import { clamp01, ramp, springAt, typing } from "../../core/motion";
import { AD_GREEN, CARD_SHADOW_SOFT } from "../../kit/ad-objects";
import { C, SANS } from "../../kit/launch";
import { blinkOn, Caret, CheckIcon, POP, Pointer, pressScale } from "./parts";
import { PLATFORMS, SOFT } from "./theme";
import { T } from "./timings";

const FORM = { w: 1240, top: 330, h: 594, pad: 48 } as const;
const COL2 = 660;
const LEFT = 960 - FORM.w / 2;
const BUTTON = { y: 462, h: 84 } as const;
const PRESS = T.step1.create - 4;
const PICKS = [T.step1.pick, T.step1.run] as const;

const Label: React.FC<{ y: number; x?: number; children: React.ReactNode }> = ({ y, x = FORM.pad, children }) => (
  <div style={{ position: "absolute", left: x, top: y, fontSize: 25, fontWeight: 700, color: C.mutedFg }}>{children}</div>
);

const Rule: React.FC<{ y: number }> = ({ y }) => <div style={{ position: "absolute", left: FORM.pad, right: FORM.pad, top: y, height: 1.5, background: C.border }} />;

export const FormScene: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (f < T.step1.at - 2 || f >= T.step2.at + 8) return null;
  const enter = springAt(f, fps, T.step1.at, POP);
  const leave = ramp(f, T.step2.at - 2, T.step2.at + 8, Easing.in(Easing.cubic));
  const budget = typing(f, "50", T.step1.budget - 4, T.step1.budget + 2);
  const goal = typing(f, "More sales", T.step1.goal - 4, T.step1.goal + 10);
  const breakdown = ramp(f, T.step1.budget + 4, T.step1.budget + 10);
  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: LEFT,
          top: FORM.top,
          width: FORM.w,
          height: FORM.h,
          borderRadius: 26,
          background: C.white,
          boxShadow: CARD_SHADOW_SOFT,
          fontFamily: SANS,
          color: C.ink,
          opacity: clamp01(enter * 2) * (1 - leave),
          transform: `translateY(${(1 - enter) * 60}px) scale(${(0.94 + 0.06 * enter) * (1 - 0.06 * leave)})`,
        }}
      >
        <Label y={40}>How much per day?</Label>
        <div style={{ position: "absolute", left: FORM.pad, top: 66, display: "flex", alignItems: "baseline", gap: 8, fontWeight: 800, letterSpacing: "-0.04em" }}>
          <span style={{ fontSize: 104, color: budget ? C.ink : "rgba(15,23,42,0.25)" }}>$</span>
          <span style={{ fontSize: 104, fontVariantNumeric: "tabular-nums" }}>
            {budget}
            <Caret on={blinkOn(f, T.step1.budget - 8, T.step1.budget + 16)} />
          </span>
          <span style={{ fontSize: 34, fontWeight: 700, color: C.mutedFg, marginLeft: 6 }}>/ day</span>
        </div>
        <div style={{ position: "absolute", left: FORM.pad, top: 196, fontSize: 22, fontWeight: 600, color: "rgba(15,23,42,0.75)", opacity: breakdown }}>
          ≈ $1,517/mo ad spend · Ryze fee 5% ≈ $76/mo
        </div>
        <Rule y={256} />
        <Label y={282}>Where should it run?</Label>
        <div style={{ position: "absolute", left: FORM.pad, top: 324, display: "flex", gap: 11 }}>
          {PLATFORMS.map((p, i) => {
            const k = i < 2 ? PICKS[i] : Infinity;
            const on = f < k ? 0 : springAt(f, fps, k, POP);
            return (
              <div
                key={p.name}
                style={{
                  position: "relative",
                  width: 132,
                  height: 100,
                  borderRadius: 16,
                  boxSizing: "border-box",
                  border: `2.5px solid ${interpolateColors(clamp01(on), [0, 1], [C.border, C.ink])}`,
                  background: interpolateColors(clamp01(on), [0, 1], ["#FFFFFF", SOFT]),
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  transform: `scale(${1 + 0.06 * Math.sin(Math.PI * clamp01(on))})`,
                }}
              >
                <Img src={p.logo} style={{ width: 40, height: 40, objectFit: "contain" }} />
                <span style={{ fontSize: 17, fontWeight: 700 }}>{p.name}</span>
                <div style={{ position: "absolute", right: -9, top: -9, width: 28, height: 28, borderRadius: 14, background: AD_GREEN, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${on})`, boxShadow: "0 0 0 3px #fff" }}>
                  <CheckIcon size={18} />
                </div>
              </div>
            );
          })}
        </div>
        <Label y={40} x={COL2}>What should it drive?</Label>
        <div
          style={{
            position: "absolute",
            left: COL2,
            right: FORM.pad,
            top: 84,
            height: 88,
            borderRadius: 14,
            border: `2px solid ${C.border}`,
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
            padding: "0 26px",
            fontSize: 38,
            fontWeight: 800,
            letterSpacing: "-0.03em",
          }}
        >
          {goal ? goal : <span style={{ color: "rgba(15,23,42,0.28)", fontWeight: 700 }}>Select a goal</span>}
          <Caret on={blinkOn(f, T.step1.goal - 6, T.step1.goal + 18)} />
          <svg width={26} height={26} viewBox="0 0 24 24" style={{ marginLeft: "auto" }}>
            <path d="M6 9l6 6 6-6" fill="none" stroke={C.mutedFg} strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div
          style={{
            position: "absolute",
            left: FORM.pad,
            right: FORM.pad,
            top: BUTTON.y,
            height: BUTTON.h,
            borderRadius: 14,
            background: C.ink,
            color: C.white,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 32,
            fontWeight: 800,
            transform: `scale(${pressScale(f, PRESS)})`,
          }}
        >
          Create campaign
        </div>
      </div>
      <Pointer
        from={PRESS - 24}
        until={PRESS + 10}
        click={PRESS}
        stops={[
          { x: 1560, y: 1040, at: PRESS - 24 },
          { x: 1010, y: FORM.top + BUTTON.y + BUTTON.h / 2 - 6, at: PRESS - 6 },
        ]}
      />
    </AbsoluteFill>
  );
};
