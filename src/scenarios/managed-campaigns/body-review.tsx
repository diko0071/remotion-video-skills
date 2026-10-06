import React from "react";
import { Easing, useCurrentFrame, useVideoConfig } from "remotion";
import { clamp01, ramp, springAt } from "../../core/motion";
import { AD_GREEN, AD_RED } from "../../kit/ad-objects";
import { C } from "../../kit/launch";
import { POP, useIn } from "./parts";
import { SOFT } from "./theme";
import { T } from "./timings";

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const Kpi: React.FC<{ label: string; value: string; delta?: string; good?: boolean }> = ({ label, value, delta, good }) => (
  <div style={{ flex: 1, padding: "20px 26px", borderRadius: 18, background: SOFT }}>
    <div style={{ fontSize: 21, fontWeight: 700, color: C.mutedFg }}>{label}</div>
    <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
      <span style={{ fontSize: 46, fontWeight: 800, letterSpacing: "-0.035em", fontVariantNumeric: "tabular-nums" }}>{value}</span>
      {delta ? <span style={{ fontSize: 20, fontWeight: 800, color: good ? AD_GREEN : AD_RED }}>{delta}</span> : null}
    </div>
  </div>
);

const Glyph: React.FC<{ kind: "check" | "pause" | "shift" | "live" }> = ({ kind }) => {
  const bg = kind === "pause" ? "#FDE8E7" : kind === "shift" || kind === "live" ? "#E7F7EC" : "#EEF2F7";
  const fg = kind === "pause" ? AD_RED : kind === "shift" || kind === "live" ? AD_GREEN : C.ink;
  return (
    <div style={{ width: 46, height: 46, borderRadius: 13, background: bg, display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
      <svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke={fg} strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round">
        {kind === "check" ? <path d="M3 12h4l3 7 4-14 3 7h4" /> : null}
        {kind === "live" ? <path d="M5 12.5l4.2 4.2L19 7" /> : null}
        {kind === "pause" ? (
          <>
            <path d="M9 6v12" />
            <path d="M15 6v12" />
          </>
        ) : null}
        {kind === "shift" ? (
          <>
            <path d="M4 12h14" />
            <path d="M13 6l6 6-6 6" />
          </>
        ) : null}
      </svg>
    </div>
  );
};

const ENTRIES = [
  { at: T.step4.checking, day: "Day 3", kind: "check", title: "Checked the results", sub: "10 sales so far, $14.20 per sale", agent: "Review" },
  { at: T.step4.pauses, day: "Day 3", kind: "pause", title: "Paused 2 ads", sub: "Over $40 per sale after a full test", agent: "Review" },
  { at: T.step4.moves, day: "Day 3", kind: "shift", title: "Moved $4/day to Lookalike 1%", sub: "Best cost per sale in the campaign: $11", agent: "Review" },
] as const;

const Entry: React.FC<{ i: number }> = ({ i }) => {
  const e = ENTRIES[i];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 18, height: 84, borderTop: i === 0 ? "none" : `1.5px solid ${C.border}`, ...useIn(Number.isFinite(e.at) ? e.at : -999) }}>
      <Glyph kind={e.kind} />
      <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.15 }}>
        <span style={{ fontSize: 31, fontWeight: 800, letterSpacing: "-0.02em" }}>{e.title}</span>
        <span style={{ fontSize: 22, fontWeight: 600, color: C.mutedFg }}>{e.sub}</span>
      </div>
      <span style={{ marginLeft: "auto", fontSize: 20, fontWeight: 700, color: C.mutedFg }}>{e.agent} · {e.day}</span>
    </div>
  );
};

export const ReviewBody: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const grow = ramp(f, T.step4.at, T.asks.at, Easing.linear);
  const fix = ramp(f, T.step4.pauses + 6, T.step4.moves + 20, Easing.inOut(Easing.cubic));
  const next = f < T.step4.schedule ? 0 : springAt(f, fps, T.step4.schedule, POP);
  const cpa = lerp(14.2, 13.0, fix);
  const roas = lerp(3.1, 3.4, fix);
  return (
    <div style={{ padding: "30px 44px 0" }}>
      <div style={{ display: "flex", gap: 16, ...useIn(T.step4.at + 4) }}>
        <Kpi label="Spend" value={`$${Math.round(lerp(142, 156, grow))}`} />
        <Kpi label="Results" value={`${Math.round(lerp(10, 12, grow))}`} />
        <Kpi label="CPA" value={`$${cpa.toFixed(2)}`} delta={fix > 0.05 ? `−${Math.round(((14.2 - cpa) / 14.2) * 100)}%` : undefined} good />
        <Kpi label="ROAS" value={`${roas.toFixed(1)}x`} />
      </div>
      <div style={{ display: "flex", alignItems: "center", marginTop: 30, marginBottom: 4 }}>
        <span style={{ fontSize: 26, fontWeight: 800 }}>Progress</span>
        <span
          style={{
            marginLeft: "auto",
            padding: "7px 16px 9px",
            borderRadius: 11,
            background: C.ink,
            color: C.white,
            fontSize: 21,
            fontWeight: 800,
            opacity: clamp01(next * 2),
            transform: `scale(${0.7 + 0.3 * next})`,
            transformOrigin: "100% 50%",
          }}
        >
          Next check · Thursday
        </span>
      </div>
      {ENTRIES.map((_, i) => (
        <Entry key={i} i={i} />
      ))}
    </div>
  );
};
