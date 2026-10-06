import React from "react";
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { clamp01, ramp, springAt } from "../../core/motion";
import { cursorAt, CursorArrow, Stop } from "../../core/stage";
import { AD_GREEN } from "../../kit/ad-objects";
import { C } from "../../kit/launch";

export const POP = { damping: 14, stiffness: 190, mass: 0.8 };

export const useIn = (at: number, rise = 26) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = f < at ? 0 : springAt(f, fps, at, POP);
  return { opacity: clamp01(p * 2), transform: `translateY(${(1 - p) * rise}px)` } as React.CSSProperties;
};

export const Caret: React.FC<{ on: boolean; h?: string }> = ({ on, h = "0.85em" }) => (
  <span style={{ display: "inline-block", width: 4, height: h, marginLeft: 4, background: C.ink, opacity: on ? 1 : 0, verticalAlign: "-0.08em" }} />
);

export const blinkOn = (f: number, from: number, to: number) => f >= from && f < to && Math.floor(f / 8) % 2 === 0;

export const CheckIcon: React.FC<{ size: number; color?: string }> = ({ size, color = "#fff" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path d="M5 12.5l4.2 4.2L19 7" fill="none" stroke={color} strokeWidth={3.2} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const StepIcon: React.FC<{ start: number; done: number; size?: number }> = ({ start, done, size = 40 }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fin = f < done ? 0 : springAt(f, fps, done, POP);
  const spin = ((f - start) * 14) % 360;
  return (
    <div style={{ position: "relative", width: size, height: size, flex: "none" }}>
      <svg width={size} height={size} viewBox="0 0 40 40" style={{ position: "absolute", inset: 0, opacity: 1 - clamp01(fin * 2), transform: `rotate(${spin}deg)` }}>
        <circle cx={20} cy={20} r={16} fill="none" stroke={C.border} strokeWidth={4} />
        <path d="M20 4 a16 16 0 0 1 16 16" fill="none" stroke={C.brand} strokeWidth={4} strokeLinecap="round" />
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background: AD_GREEN,
          transform: `scale(${fin})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CheckIcon size={size * 0.62} />
      </div>
    </div>
  );
};

export const Pointer: React.FC<{ stops: readonly Stop[]; click: number; from: number; until: number }> = ({ stops, click, from, until }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (f < from || f > until) return null;
  const p = cursorAt(stops, f, fps);
  const dip = interpolate(f, [click - 3, click, click + 5], [1, 0.78, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const o = ramp(f, from, from + 5) * (1 - ramp(f, until - 5, until));
  return (
    <div
      style={{
        position: "absolute",
        left: p.x,
        top: p.y,
        zIndex: 40,
        opacity: o,
        transform: `scale(${1.5 * dip})`,
        transformOrigin: "top left",
        filter: "drop-shadow(0 2px 5px rgba(0,0,0,0.28))",
      }}
    >
      <CursorArrow />
    </div>
  );
};

export const pressScale = (f: number, at: number) => interpolate(f, [at - 3, at, at + 6], [1, 0.95, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad) });
