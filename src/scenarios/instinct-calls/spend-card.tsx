import React from "react";
import { Easing, staticFile, useCurrentFrame } from "remotion";
import { ramp } from "../../core/motion";
import { C, LaunchCard, pointAt, polyline, Pt, SANS } from "../../kit/launch";
import { CARD } from "./geometry";
import { SPEND_LABELS, SPEND_POINTS } from "./story";
import { clamp01, pop, T } from "./timeline";

const CHART = { left: 40, top: 140, w: 780, h: 290, max: 1600 } as const;
const RED = "#e11d48";
const USUAL = 1180;

const px = (i: number) => CHART.left + (i * CHART.w) / (SPEND_POINTS.length - 1);
const py = (v: number) => CHART.top + CHART.h * (1 - v / CHART.max);
const PTS: Pt[] = SPEND_POINTS.map((v, i) => ({ x: px(i), y: py(v) }));
const BASE = PTS.slice(0, -1);
const SPIKE = PTS.slice(-2);

export const spikeTip = () => ({ x: CARD.x + PTS[PTS.length - 1].x, y: CARD.y + PTS[PTS.length - 1].y });

export const cardSlide = (f: number, at: number) => pop(f, at, 16, 150);

export const SpendCard: React.FC = () => {
  const f = useCurrentFrame();
  const enter = cardSlide(f, T.chartIn);
  const exit = ramp(f, T.s3, T.s3 + 14, Easing.in(Easing.cubic));
  if (f < T.chartIn - 2 || exit >= 1) return null;
  const a = ramp(f, T.draw, T.spike, Easing.inOut(Easing.quad));
  const b = ramp(f, T.spike, T.spikeEnd, Easing.in(Easing.quad));
  const tip = b > 0 ? pointAt(SPIKE, b) : pointAt(BASE, a);
  const value =
    b > 0 ? SPEND_POINTS[SPEND_POINTS.length - 2] + (SPEND_POINTS[SPEND_POINTS.length - 1] - SPEND_POINTS[SPEND_POINTS.length - 2]) * b : CHART.max * (1 - (tip.y - CHART.top) / CHART.h);
  const plus = pop(f, T.plus, 12, 220);
  const pulse = ramp(f, T.spikeEnd, T.spikeEnd + 16);
  return (
    <LaunchCard
      w={CARD.w}
      h={CARD.h}
      logo={staticFile("integrations/meta-ads.svg")}
      title="Meta Ads"
      sub="Spend today"
      value={`$${Math.round(value).toLocaleString("en-US")}`}
      x={CARD.x + (1 - enter) * -90 - exit * 140}
      y={CARD.y}
      opacity={clamp01(enter * 2) * (1 - exit)}
    >
      <svg width={CARD.w} height={CARD.h} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
        {[0, 1, 2, 3].map((k) => (
          <line key={k} x1={CHART.left} x2={CHART.left + CHART.w} y1={CHART.top + (k * CHART.h) / 3} y2={CHART.top + (k * CHART.h) / 3} stroke={C.border} strokeWidth={1.5} />
        ))}
        <line x1={PTS[0].x} y1={PTS[0].y} x2={px(SPEND_POINTS.length - 1)} y2={py(USUAL)} stroke={C.mutedFg} strokeWidth={2.5} strokeDasharray="8 9" opacity={0.55 * clamp01(a * 3)} />
        <path d={polyline(BASE)} fill="none" stroke={C.brand} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - a} />
        <path d={polyline(SPIKE)} fill="none" stroke={RED} strokeWidth={6} strokeLinecap="round" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - b} />
        {pulse > 0 && pulse < 1 ? <circle cx={tip.x} cy={tip.y} r={10 + 40 * pulse} fill="none" stroke={RED} strokeWidth={3} opacity={1 - pulse} /> : null}
        {a > 0 ? <circle cx={tip.x} cy={tip.y} r={9} fill={b > 0 ? RED : C.brand} stroke={C.white} strokeWidth={3} /> : null}
      </svg>
      <div
        style={{
          position: "absolute",
          left: PTS[PTS.length - 1].x - 150,
          top: PTS[PTS.length - 1].y - 24,
          padding: "2px 12px 4px",
          background: C.brandLight,
          fontSize: 34,
          fontWeight: 800,
          letterSpacing: "-0.03em",
          color: C.ink,
          transform: `scale(${clamp01(plus)})`,
          transformOrigin: "100% 50%",
          opacity: clamp01(plus * 2),
        }}
      >
        +30%
      </div>
      <div style={{ position: "absolute", left: CHART.left, top: CHART.top + CHART.h + 16, width: CHART.w, display: "flex", justifyContent: "space-between", fontFamily: SANS, fontSize: 17, fontWeight: 500, color: C.mutedFg }}>
        {SPEND_LABELS.map((l) => (
          <span key={l}>{l}</span>
        ))}
      </div>
    </LaunchCard>
  );
};
