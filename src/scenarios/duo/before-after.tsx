import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { loadFont } from "@remotion/google-fonts/PlusJakartaSans";
import { ScoreRing } from "../../kit/score-ring";
import { CANVAS, DuoScreen, DUO_TOTAL, foldAt } from "./screen";

const { fontFamily } = loadFont();
const INK = "#171310";
const RED = "#D6362B";
const GREEN = "#059669";

const clamp = (frame: number, a: number, b: number, easing = Easing.out(Easing.cubic)) => interpolate(frame, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing });

const Row: React.FC<{ at: number; ok: boolean; children: string }> = ({ at, ok, children }) => {
  const frame = useCurrentFrame();
  const p = clamp(frame, at, at + 8);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 30, marginTop: 18, opacity: p, transform: `translateX(${(1 - p) * -10}px)` }}>
      <svg width={30} height={30} viewBox="0 0 24 24">
        <circle cx={12} cy={12} r={11} fill={ok ? GREEN : RED} />
        {ok ? <path d="M7 12.5l3 3 7-7" stroke="#FFF" strokeWidth={2.5} fill="none" strokeLinecap="round" /> : <path d="M8 8l8 8M16 8l-8 8" stroke="#FFF" strokeWidth={2.5} strokeLinecap="round" />}
      </svg>
      {children}
    </div>
  );
};

const Report: React.FC<{ score: number; ok: boolean; label: string; at: number; rows: string[]; x: number; width: number; dim?: number }> = ({ score, ok, label, at, rows, x, width, dim = 0 }) => (
  <div style={{ position: "absolute", left: x, top: 0, width, height: CANVAS.h, fontFamily, color: INK, padding: "60px 56px", opacity: 1 - dim * 0.55 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 30, color: "#6B6560" }}>
      <Img src={staticFile("ryze-sun.png")} style={{ width: 34, height: 34 }} />
      yourstore.com
    </div>
    <div style={{ marginTop: 24, fontSize: 40, fontWeight: 700, letterSpacing: "-0.02em", color: ok ? GREEN : RED }}>{label}</div>
    <div style={{ marginTop: 40, display: "flex", justifyContent: "center" }}>
      <ScoreRing score={score} size={300} appearAt={at} color={ok ? GREEN : RED} />
    </div>
    <div style={{ marginTop: 40 }}>
      {rows.map((r, i) => (
        <Row key={i} at={at + 20 + i * 8} ok={ok}>{r}</Row>
      ))}
    </div>
  </div>
);

const BEFORE = ["14 pages missing meta titles", "No blog. 0 articles indexed", "Ads ROAS 1.8, creative fatigued"];
const AFTER = ["All meta titles fixed", "38 articles published, page 1", "Ads ROAS 3.4, 3 new creatives"];

export const DUO_BEFORE_AFTER_TOTAL = DUO_TOTAL;

export const DuoBeforeAfter: React.FC = () => {
  const frame = useCurrentFrame();
  const f = foldAt(frame);
  const swap = interpolate(f, [0.25, 0.6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill>
      <DuoScreen>
        <div style={{ position: "absolute", inset: 0, background: "#FDFAF3", opacity: 1 - swap }}>
          <Report score={34} ok={false} label="Site health: poor" at={10} rows={BEFORE} x={CANVAS.w / 2} width={CANVAS.w / 2} />
        </div>
        {swap > 0 ? (
          <div style={{ position: "absolute", inset: 0, background: "#FDFAF3", opacity: swap }}>
            <Report score={34} ok={false} label="Before Ryze" at={-100} rows={BEFORE} x={0} width={CANVAS.w / 2} dim={swap} />
            <div style={{ position: "absolute", left: CANVAS.w / 2 - 1, top: 60, width: 2, height: CANVAS.h - 120, background: "#E6DFD0" }} />
            <Report score={98} ok label="After Ryze" at={88} rows={AFTER} x={CANVAS.w / 2} width={CANVAS.w / 2} />
          </div>
        ) : null}
      </DuoScreen>
      <div style={{ position: "absolute", left: 0, right: 0, top: 80, textAlign: "center", fontFamily, fontSize: 48, fontWeight: 600, letterSpacing: "-0.02em", color: INK, opacity: clamp(frame, 104, 114) }}>Unfold what Ryze did to your site.</div>
    </AbsoluteFill>
  );
};
