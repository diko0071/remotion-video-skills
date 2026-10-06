import React from "react";
import { AbsoluteFill, Easing, useCurrentFrame } from "remotion";
import { ramp, SPRINGS, useSpringAt } from "../../core/motion";
import { StepTitle, Zoom, zoneTop } from "../../kit/explainer";
import { Pop } from "../../kit/pop";
import { FONT, P } from "../../kit/product-ui";
import { SCORE_CHECKS } from "./data";
import { K_SCORE as K } from "./timings";

const S = 2.05;
const W = 640;
const ROW = 30;
const H = 20 * 2 + 18 + 12 + SCORE_CHECKS.length * ROW;
const TOP = zoneTop(H * S);
const RING = { size: 132, stroke: 11 } as const;
const R = RING.size / 2 - RING.stroke / 2 - 1;
const C = 2 * Math.PI * R;
const TICK_FROM = K.scored + 8;
const TICK = (i: number) => TICK_FROM + Math.round(((K.schema + 6 - TICK_FROM) * i) / (SCORE_CHECKS.length - 1));

const CheckRow: React.FC<{ i: number }> = ({ i }) => {
  const c = SCORE_CHECKS[i];
  const p = useSpringAt(TICK(i), SPRINGS.pop, 14);
  const done = c.pass ? p : 0;
  return (
    <div style={{ height: ROW, display: "flex", alignItems: "center", gap: 10, borderTop: i === 0 ? "none" : `1px solid ${P.border}`, fontFamily: FONT }}>
      <span style={{ position: "relative", width: 18, height: 18, flex: "none" }}>
        <svg width={18} height={18} viewBox="0 0 24 24" fill="none" style={{ position: "absolute", inset: 0, opacity: 1 - done }}>
          <circle cx={12} cy={12} r={10} stroke="rgba(122,114,106,0.3)" strokeWidth={2} />
        </svg>
        <span style={{ position: "absolute", inset: 0, borderRadius: 9999, background: "#d1fae5", display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${done})` }}>
          <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
      </span>
      <span style={{ fontSize: 13.5, color: done > 0.5 ? P.fg : P.mutedFg }}>{c.label}</span>
    </div>
  );
};

export const ScoreScene: React.FC = () => {
  const f = useCurrentFrame();
  let score = 0;
  let passed = 0;
  SCORE_CHECKS.forEach((c, i) => {
    if (c.pass) {
      const p = ramp(f, TICK(i), TICK(i) + 8, Easing.out(Easing.cubic));
      score += c.weight * p;
      if (f >= TICK(i)) passed += 1;
    }
  });
  const shown = Math.round(score);
  return (
    <AbsoluteFill style={{ background: P.bg }}>
      <AbsoluteFill>
        <StepTitle step={6} text="It scores every article" at={-8} />
        <Zoom w={W} s={S} top={TOP}>
          <Pop at={-6} from={0.92} rise={10}>
            <div className="pg-card" style={{ width: W, height: H, boxSizing: "border-box", padding: 20, fontFamily: FONT, boxShadow: "0 0 0 1px rgba(15,23,42,0.1), 0 12px 32px rgba(15,23,42,0.06)" }}>
              <div style={{ height: 18, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase", color: P.mutedFg }}>Article score</span>
                <span style={{ fontSize: 12, color: P.mutedFg }}>Soy wax vs paraffin: what actually burns cleaner</span>
              </div>
              <div style={{ marginTop: 12, display: "flex", gap: 32 }}>
                <div style={{ width: 200, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}>
                  <div style={{ position: "relative", width: RING.size, height: RING.size }}>
                    <svg width={RING.size} height={RING.size} style={{ transform: "rotate(-90deg)" }}>
                      <circle cx={RING.size / 2} cy={RING.size / 2} r={R} fill="none" stroke="rgba(15,23,42,0.06)" strokeWidth={RING.stroke} />
                      <circle cx={RING.size / 2} cy={RING.size / 2} r={R} fill="none" stroke="#10b981" strokeWidth={RING.stroke} strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C - (C * score) / 100} />
                    </svg>
                    <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "baseline", justifyContent: "center", paddingTop: 46 }}>
                      <b style={{ fontSize: 32, fontWeight: 800, letterSpacing: "-0.03em", color: P.fg, fontVariantNumeric: "tabular-nums" }}>{shown}</b>
                      <span style={{ marginLeft: 2, fontSize: 12, fontWeight: 500, color: P.mutedFg }}>/100</span>
                    </span>
                  </div>
                  <span style={{ fontSize: 11, color: P.mutedFg }}>
                    {passed} of {SCORE_CHECKS.length} checks passed
                  </span>
                </div>
                <div style={{ flex: 1 }}>
                  {SCORE_CHECKS.map((c, i) => (
                    <CheckRow key={c.label} i={i} />
                  ))}
                </div>
              </div>
            </div>
          </Pop>
        </Zoom>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
