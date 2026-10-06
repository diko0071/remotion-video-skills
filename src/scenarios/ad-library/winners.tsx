import React from "react";
import { AbsoluteFill, Easing, Img, useCurrentFrame } from "remotion";
import { winnerLiftFrom } from "./geometry";
import { useLayout } from "./layout";
import { screenToStage } from "./stage";
import { WINNERS } from "./story";
import { C, logoCenter, SANS, useLaunchFrame } from "../../kit/launch";
import { ACCENT, asset, liftShadow } from "./theme";
import { clamp01, glide, lerp, ramp, T } from "./timeline";

const ASPECT = 1.25;

export const absorbProgress = (f: number, order: number) => ramp(f, T.absorb + order * 1.5, 14, Easing.in(Easing.cubic));

export const DayPlate: React.FC<{ days: number; progress: number; size: number }> = ({ days, progress, size }) => (
  <div
    style={{
      display: "inline-flex",
      alignItems: "baseline",
      gap: size * 0.18,
      padding: `${size * 0.12}px ${size * 0.3}px ${size * 0.08}px`,
      background: ACCENT,
      fontFamily: SANS,
      fontWeight: 800,
      fontSize: size,
      lineHeight: 1,
      letterSpacing: "-0.04em",
      color: C.ink,
      whiteSpace: "nowrap",
      fontVariantNumeric: "tabular-nums",
    }}
  >
    {Math.round(days * progress)}
    <span style={{ fontSize: size * 0.55, fontWeight: 700, letterSpacing: "-0.01em" }}>days</span>
  </div>
);

const Winner: React.FC<{ k: number; f: number }> = ({ k, f }) => {
  const l = useLayout();
  const fr = useLaunchFrame();
  const w = WINNERS[k];
  const from = winnerLiftFrom(l, k);
  const lift = glide(f, T.lift + k * 3, 150);
  const count = ramp(f, T.lift + k * 3 + 4, 56, Easing.out(Easing.cubic));
  const push = 1 + 0.07 * ramp(f, T.lift + 10, T.winnerMove - T.lift - 10, Easing.linear);
  const to = {
    x: l.vis.cx + (l.winners.at[k].x - l.vis.cx) * push,
    y: l.vis.cy + (l.winners.at[k].y - l.vis.cy) * push,
  };
  let cx = lerp(from.cx, to.x, lift);
  let cy = lerp(from.cy, to.y, lift);
  let width = lerp(from.w, l.winners.w * push, lift);
  let rot = lerp(0, [-3, 2, -2, 3][k], lift);
  const drift = Math.sin((f - T.lift) / 18 + k) * 5 * lift;
  cy += drift;
  if (k === 0) {
    const move = glide(f, T.winnerMove, 130);
    cx = lerp(cx, l.source.at.x, move);
    cy = lerp(cy, l.source.at.y, move);
    width = lerp(width, l.source.w, move);
    rot = lerp(rot, -2, move);
  } else {
    const out = ramp(f, T.winnerMove - 2 + (k - 1) * 2, 10, Easing.in(Easing.cubic));
    cx += out * (l.w * 0.6);
    cy -= out * 120;
    rot += out * 20;
    if (out >= 1) return null;
  }
  const absorb = absorbProgress(f, 0);
  const logo = screenToStage(l, f, logoCenter(fr));
  if (k === 0 && absorb > 0) {
    cx = lerp(cx, logo.x, absorb);
    cy = lerp(cy, logo.y, absorb);
    width = lerp(width, 8, absorb);
    rot += absorb * 30;
  }
  if (f < T.lift + k * 3 || absorb >= 1) return null;
  const height = width * ASPECT;
  return (
    <div
      style={{
        position: "absolute",
        left: cx - width / 2,
        top: cy - height / 2,
        width,
        height,
        transform: `rotate(${rot}deg)`,
        zIndex: 10 - k,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: lerp(4, 12, lift),
          overflow: "hidden",
          boxShadow: liftShadow(lift * Math.min(1, width / l.winners.w)),
          background: C.white,
        }}
      >
        <Img src={asset(w.src)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 0,
          transform: `translate(-50%, -55%) scale(${clamp01(lift * 1.4)}) rotate(${-rot * 0.5}deg)`,
          opacity: clamp01(lift * 2),
        }}
      >
        <DayPlate days={w.days} progress={count} size={l.winners.plate * lerp(1, width / (l.winners.w * push), 0.6)} />
      </div>
    </div>
  );
};

export const Winners: React.FC = () => {
  const f = useCurrentFrame();
  if (f < T.lift || f > T.absorb + 20) return null;
  return (
    <AbsoluteFill>
      {WINNERS.map((_, k) => (
        <Winner key={k} k={k} f={f} />
      ))}
    </AbsoluteFill>
  );
};
