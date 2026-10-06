import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { clamp01, springAt } from "../../core/motion";
import { C, SANS } from "../../kit/launch";
import { AD_GREEN } from "../../kit/ad-objects";
import { PLATE } from "./theme";

export const CARD = { x: 470, y: 330, w: 980, h: 448 };
export const AVATAR = { cx: CARD.x + 125, cy: CARD.y + 125, size: 170 };
export const APPROVE = { x: CARD.x + 250, y: CARD.y + 344, w: 200, h: 64 };

const STATS = ["3 ad sets paused", "$410/day saved", "37 pages fixed"] as const;
const POP = { damping: 13, stiffness: 180, mass: 0.6 };

const Stat: React.FC<{ text: string; at: number }> = ({ text, at }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = springAt(f, fps, at, POP);
  return (
    <span
      style={{
        padding: "7px 14px 9px",
        borderRadius: 10,
        background: PLATE,
        fontSize: 24,
        fontWeight: 800,
        letterSpacing: "-0.02em",
        opacity: clamp01((f - at) / 3),
        transform: `translateY(${(1 - s) * 14}px) scale(${0.8 + 0.2 * s})`,
        whiteSpace: "nowrap",
      }}
    >
      {text}
    </span>
  );
};

export const MorningCard: React.FC<{ popAt: number; stats: readonly number[]; approvalAt: number; clickAt: number }> = ({ popAt, stats, approvalAt, clickAt }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = springAt(f, fps, popAt, { damping: 15, stiffness: 150, mass: 0.8 });
  const ap = clamp01((f - approvalAt) / 5);
  const done = f >= clickAt + 1;
  const flip = springAt(f, fps, clickAt + 1, { damping: 11, stiffness: 240, mass: 0.5 });
  const dip = f >= clickAt - 2 && f < clickAt + 6 ? 1 - 0.1 * Math.sin(Math.PI * clamp01((f - clickAt + 2) / 8)) : 1;
  if (f < popAt) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: CARD.x,
        top: CARD.y,
        width: CARD.w,
        height: CARD.h,
        borderRadius: 30,
        background: C.white,
        border: `1.5px solid ${C.border}`,
        boxShadow: "0 30px 70px rgba(60,44,20,0.14), 0 2px 6px rgba(60,44,20,0.06)",
        fontFamily: SANS,
        color: C.ink,
        opacity: clamp01((f - popAt) / 4),
        transform: `translateY(${(1 - s) * 50}px) scale(${0.92 + 0.08 * s})`,
        transformOrigin: "20% 30%",
        zIndex: 4,
      }}
    >
      <div style={{ position: "absolute", left: 250, top: 50, fontSize: 42, fontWeight: 800, letterSpacing: "-0.03em", whiteSpace: "nowrap" }}>Good morning. Here's your night.</div>
      <div style={{ position: "absolute", left: 250, top: 128, display: "flex", gap: 12 }}>
        {STATS.map((t, i) => (
          <Stat key={t} text={t} at={stats[i]} />
        ))}
      </div>
      <div style={{ position: "absolute", left: 44, right: 44, top: 222, height: 1.5, background: C.border }} />
      <div style={{ position: "absolute", left: 250, top: 250, opacity: ap, transform: `translateY(${(1 - ap) * 12}px)` }}>
        <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>Move $200/day to Retarget · 7 days?</div>
        <div style={{ marginTop: 8, fontSize: 22, fontWeight: 500, color: C.mutedFg }}>ROAS 4.1 over the last 14 days</div>
      </div>
      <div
        style={{
          position: "absolute",
          left: APPROVE.x - CARD.x,
          top: APPROVE.y - CARD.y,
          width: APPROVE.w,
          height: APPROVE.h,
          borderRadius: 12,
          background: done ? AD_GREEN : C.ink,
          color: C.white,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          fontSize: 26,
          fontWeight: 700,
          opacity: ap,
          transform: `scale(${dip * (done ? 0.9 + 0.1 * Math.min(1.12, flip) : 1)})`,
        }}
      >
        {done ? (
          <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={C.white} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        ) : null}
        {done ? "Approved" : "Approve"}
      </div>
      <div
        style={{
          position: "absolute",
          left: APPROVE.x - CARD.x + APPROVE.w + 16,
          top: APPROVE.y - CARD.y,
          width: 170,
          height: APPROVE.h,
          borderRadius: 12,
          background: "#F1ECE3",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 26,
          fontWeight: 600,
          opacity: ap * (done ? 0.5 : 1),
        }}
      >
        Not now
      </div>
    </div>
  );
};
