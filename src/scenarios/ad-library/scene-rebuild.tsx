import React from "react";
import { AbsoluteFill, Easing, Img, useCurrentFrame } from "remotion";
import { BrandPanel } from "./brand-panel";
import { useLayout } from "./layout";
import { screenToStage } from "./stage";
import { REBUILDS } from "./story";
import { C, logoCenter, SANS, useLaunchFrame } from "../../kit/launch";
import { ACCENT_SHADE, asset, liftShadow } from "./theme";
import { clamp01, lerp, pop, ramp, T } from "./timeline";
import { absorbProgress } from "./winners";

const ASPECT = 1.25;
const LEVELS = 5;
const LEVEL_FRAMES = 3;
const TILT = [-3, 2, -2, 3, -1];

const panelPush = (f: number) => 1 + 0.05 * ramp(f, T.rebuild, T.absorb - T.rebuild, Easing.linear);

const NorthwindMark: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path d="M6 18L18 6M9 6h9v9" fill="none" stroke={C.ink} strokeWidth={3.2} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Rebuild: React.FC<{ k: number; f: number }> = ({ k, f }) => {
  const l = useLayout();
  const fr = useLaunchFrame();
  const spec = REBUILDS[k];
  const start = T.rebuild + k * T.rebuildStep;
  const p = pop(f, start, 13, 190);
  const level = Math.floor((f - start) / LEVEL_FRAMES);
  const copy = ramp(f, start + LEVELS * LEVEL_FRAMES + 2, 8);
  const push = panelPush(f);
  const pc = { x: l.panel.x + l.panel.w / 2, y: l.panel.y + l.panel.h / 2 };
  const at = { x: pc.x + (l.rebuild.at[k].x - pc.x) * push, y: pc.y + (l.rebuild.at[k].y - pc.y) * push };
  const bob = Math.sin((f - start) / 17 + k * 1.3) * 4 * clamp01(p);
  const absorb = absorbProgress(f, k + 1);
  const logo = screenToStage(l, f, logoCenter(fr));
  if (f < start || absorb >= 1) return null;
  const width = lerp(l.rebuild.w * push * lerp(0.7, 1, p), 8, absorb);
  const height = width * ASPECT;
  const cx = lerp(at.x, logo.x, absorb);
  const cy = lerp(at.y + bob, logo.y, absorb);
  const src = level >= LEVELS ? `rebuild/${spec.id}.jpg` : `rebuild/${spec.id}_m${Math.max(0, level)}.jpg`;
  const u = width / 100;
  return (
    <div
      style={{
        position: "absolute",
        left: cx - width / 2,
        top: cy - height / 2,
        width,
        height,
        opacity: clamp01(p * 3),
        transform: `rotate(${TILT[k] * (1 - absorb) + absorb * 30}deg)`,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 12,
          overflow: "hidden",
          boxShadow: liftShadow(clamp01(p) * Math.min(1, width / l.rebuild.w), ACCENT_SHADE),
          background: C.white,
        }}
      >
        <Img src={asset(src)} style={{ width: "100%", height: "100%", objectFit: "cover", imageRendering: level < LEVELS ? "pixelated" : "auto" }} />
        <div
          style={{
            position: "absolute",
            left: 7 * u,
            top: 7 * u,
            right: 12 * u,
            fontFamily: SANS,
            fontWeight: 800,
            fontSize: 9.2 * u,
            lineHeight: 1,
            letterSpacing: "-0.035em",
            color: C.ink,
            opacity: copy,
            transform: `translateY(${(1 - copy) * 3 * u}px)`,
          }}
        >
          {spec.headline}
        </div>
        <div
          style={{
            position: "absolute",
            right: 6 * u,
            bottom: 5 * u,
            display: "flex",
            alignItems: "center",
            gap: 1.2 * u,
            fontFamily: SANS,
            fontWeight: 800,
            fontSize: 6 * u,
            letterSpacing: "-0.02em",
            color: C.ink,
            opacity: copy,
          }}
        >
          <NorthwindMark size={6.4 * u} />
          Northwind
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 0,
          transform: `translate(-50%, -50%) scale(${clamp01(p)})`,
          padding: `${2.2 * u}px ${4 * u}px`,
          background: C.ink,
          color: C.white,
          fontFamily: SANS,
          fontWeight: 700,
          fontSize: 6.4 * u,
          lineHeight: 1,
        }}
      >
        {spec.id}
      </div>
    </div>
  );
};

const Arrow: React.FC<{ f: number }> = ({ f }) => {
  const l = useLayout();
  const draw = ramp(f, T.arrow, 10, Easing.out(Easing.cubic));
  const out = ramp(f, T.absorb - 2, 8, Easing.linear);
  if (f < T.arrow || out >= 1) return null;
  const { from, to } = l.arrow;
  const len = Math.hypot(to.x - from.x, to.y - from.y);
  const angle = (Math.atan2(to.y - from.y, to.x - from.x) * 180) / Math.PI;
  const head = 34;
  const shaft = Math.max(0, len * draw - head * 0.6);
  return (
    <div
      style={{
        position: "absolute",
        left: from.x,
        top: from.y,
        transformOrigin: "0 0",
        transform: `rotate(${angle}deg)`,
        opacity: 1 - out,
      }}
    >
      <div style={{ position: "absolute", left: 0, top: -9, width: shaft, height: 18, background: C.ink }} />
      <svg
        width={head * 1.4}
        height={head * 1.6}
        viewBox="0 0 14 16"
        style={{ position: "absolute", left: shaft - 4, top: -head * 0.8, opacity: draw > 0.2 ? 1 : 0 }}
      >
        <path d="M0 0L14 8L0 16Z" fill={C.ink} />
      </svg>
    </div>
  );
};

export const SceneRebuild: React.FC = () => {
  const f = useCurrentFrame();
  const reveal = ramp(f, T.panel, 14, Easing.out(Easing.cubic));
  const hide = ramp(f, T.absorb + 2, 14, Easing.in(Easing.quad));
  if (f < T.arrow || f > T.absorb + 30) return null;
  return (
    <AbsoluteFill>
      <BrandPanel reveal={reveal} hide={hide} scale={panelPush(f)} />
      <Arrow f={f} />
      {REBUILDS.map((_, k) => (
        <Rebuild key={k} k={k} f={f} />
      ))}
    </AbsoluteFill>
  );
};
