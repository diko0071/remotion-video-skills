import React from "react";
import { Easing, staticFile, useCurrentFrame } from "remotion";
import { ramp } from "../../core/motion";
import { C, LaunchCard, pointAt, polyline, Pt, SANS } from "../../kit/launch";
import { CARD, phoneExit } from "./geometry";
import { cardSlide } from "./spend-card";
import { CPA_DAYS, CPA_POINTS } from "./story";
import { clamp01, pop, T } from "./timeline";

const CHART = { left: 40, top: 150, w: 780, h: 270, max: 140 } as const;
const RED = "#e11d48";

const px = (i: number) => CHART.left + (i * CHART.w) / (CPA_POINTS.length - 1);
const py = (v: number) => CHART.top + CHART.h * (1 - v / CHART.max);
const PTS: Pt[] = CPA_POINTS.map((v, i) => ({ x: px(i), y: py(v) }));
const PAUSE_X = (px(3) + px(4)) / 2;
const progressAt = (f: number) => ramp(f, T.cpaDraw, T.cpaEnd, Easing.inOut(Easing.quad));
const firstFrame = (test: (t: number) => boolean) => {
  for (let fr = T.cpaDraw; fr <= T.cpaEnd; fr++) if (test(progressAt(fr))) return fr;
  return T.cpaEnd;
};
const SPIKE_AT = firstFrame((t) => pointAt(PTS, t).seg >= 3);
const PAUSE_AT = firstFrame((t) => pointAt(PTS, t).x >= PAUSE_X);

const Chip: React.FC<{ x: number; y: number; at: number; f: number; dark?: boolean; children: React.ReactNode }> = ({ x, y, at, f, dark, children }) => {
  const p = pop(f, at, 14, 210);
  if (f < at - 1) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `translate(-50%, -100%) scale(${0.8 + 0.2 * clamp01(p)})`,
        transformOrigin: "50% 100%",
        padding: "5px 12px 7px",
        borderRadius: 8,
        background: dark ? C.primary : RED,
        color: C.white,
        fontFamily: SANS,
        fontSize: 18,
        fontWeight: 700,
        whiteSpace: "nowrap",
        opacity: clamp01(p * 2),
      }}
    >
      {children}
    </div>
  );
};

export const CpaCard: React.FC = () => {
  const f = useCurrentFrame();
  const enter = cardSlide(f, T.cpaIn);
  if (f < T.cpaIn - 2) return null;
  const t = progressAt(f);
  const tip = pointAt(PTS, t);
  const value = CPA_POINTS[tip.seg] + (CPA_POINTS[tip.seg + 1] - CPA_POINTS[tip.seg]) * tip.u;
  const plate = pop(f, T.cpaEnd + 2, 13, 210);
  const drop = phoneExit(f) * 1150;
  const passedPause = f >= PAUSE_AT;
  const spiked = f >= SPIKE_AT;
  return (
    <LaunchCard
      w={CARD.w}
      h={CARD.h}
      logo={staticFile("integrations/google-ads.webp")}
      title="Google Ads"
      sub="CPA this week"
      value={`$${Math.round(value)}`}
      x={CARD.x + (1 - enter) * -90}
      y={CARD.y + drop}
      opacity={clamp01(enter * 2)}
    >
      <svg width={CARD.w} height={CARD.h} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
        {[0, 1, 2, 3].map((k) => (
          <line key={k} x1={CHART.left} x2={CHART.left + CHART.w} y1={CHART.top + (k * CHART.h) / 3} y2={CHART.top + (k * CHART.h) / 3} stroke={C.border} strokeWidth={1.5} />
        ))}
        {passedPause ? (
          <line x1={PAUSE_X} x2={PAUSE_X} y1={CHART.top - 6} y2={CHART.top + CHART.h} stroke={C.primary} strokeWidth={2.5} strokeDasharray="7 7" opacity={0.7} />
        ) : null}
        <path d={polyline(PTS)} fill="none" stroke={C.brand} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - t} />
        {spiked ? <circle cx={PTS[3].x} cy={PTS[3].y} r={9} fill={RED} stroke={C.white} strokeWidth={3} /> : null}
        {t > 0 ? <circle cx={tip.x} cy={tip.y} r={9} fill={C.brand} stroke={C.white} strokeWidth={3} /> : null}
      </svg>
      {spiked ? (
        <Chip x={PTS[3].x} y={PTS[3].y - 16} at={SPIKE_AT} f={f}>
          2× CPA
        </Chip>
      ) : null}
      {passedPause ? (
        <Chip x={PAUSE_X + 96} y={CHART.top + CHART.h - 20} at={PAUSE_AT} f={f} dark>
          Ryze paused it
        </Chip>
      ) : null}
      <div
        style={{
          position: "absolute",
          left: PTS[PTS.length - 1].x - 128,
          top: PTS[PTS.length - 1].y - 78,
          padding: "2px 12px 4px",
          background: C.brandLight,
          fontFamily: SANS,
          fontSize: 32,
          fontWeight: 800,
          letterSpacing: "-0.03em",
          color: C.ink,
          whiteSpace: "nowrap",
          transform: `scale(${clamp01(plate)})`,
          transformOrigin: "100% 100%",
          opacity: clamp01(plate * 2),
        }}
      >
        back to $58
      </div>
      <div style={{ position: "absolute", left: CHART.left - 14, top: CHART.top + CHART.h + 16, width: CHART.w + 28, display: "flex", justifyContent: "space-between", fontFamily: SANS, fontSize: 17, fontWeight: 500, color: C.mutedFg }}>
        {CPA_DAYS.map((d) => (
          <span key={d} style={{ width: 40, textAlign: "center" }}>
            {d}
          </span>
        ))}
      </div>
    </LaunchCard>
  );
};
