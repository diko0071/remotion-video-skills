import React from "react";
import { AbsoluteFill, Easing, useCurrentFrame } from "remotion";
import { ramp } from "../../core/motion";
import { StepTitle, Zoom, zoneTop } from "../../kit/explainer";
import { Pop } from "../../kit/pop";
import { FONT, P } from "../../kit/product-ui";
import { TRAFFIC } from "./data";
import { K_GROWTH as K } from "./timings";

const S = 2.1;
const W = 600;
const H = 300;
const TOP = zoneTop(H * S);
const CH = { x: 16, y: 92, w: 568, h: 150 } as const;
const MAX = 3000;

const point = (i: number) => {
  const n = TRAFFIC.clicks.length - 1;
  return { x: CH.x + (CH.w * i) / n, y: CH.y + CH.h - (CH.h * TRAFFIC.clicks[i]) / MAX };
};
const LINE = TRAFFIC.clicks.map((_, i) => `${i === 0 ? "M" : "L"}${point(i).x},${point(i).y}`).join(" ");
const AREA = `${LINE} L${CH.x + CH.w},${CH.y + CH.h} L${CH.x},${CH.y + CH.h} Z`;

export const GrowthScene: React.FC = () => {
  const f = useCurrentFrame();
  const draw = ramp(f, K.three - 6, K.grows + 6, Easing.inOut(Easing.cubic));
  const pos = draw * (TRAFFIC.clicks.length - 1);
  const lo = Math.min(TRAFFIC.clicks.length - 2, Math.floor(pos));
  const t = pos - lo;
  const value = Math.round(TRAFFIC.clicks[lo] + (TRAFFIC.clicks[lo + 1] - TRAFFIC.clicks[lo]) * t);
  const tip = { x: point(lo).x + (point(lo + 1).x - point(lo).x) * t, y: point(lo).y + (point(lo + 1).y - point(lo).y) * t };
  return (
    <AbsoluteFill style={{ background: P.bg }}>
      <AbsoluteFill>
        <StepTitle text="Do this for three months" at={-8} />
        <Zoom w={W} s={S} top={TOP}>
          <Pop at={-6} from={0.92} rise={10}>
            <div className="pg-card" style={{ position: "relative", width: W, height: H, boxSizing: "border-box", fontFamily: FONT, boxShadow: "0 0 0 1px rgba(15,23,42,0.1), 0 12px 32px rgba(15,23,42,0.06)" }}>
              <div style={{ position: "absolute", left: 16, top: 16 }}>
                <div style={{ fontSize: 12, color: P.mutedFg }}>Clicks from Google</div>
                <div style={{ marginTop: 4, fontSize: 34, fontWeight: 800, letterSpacing: "-0.03em", color: P.fg, fontVariantNumeric: "tabular-nums" }}>
                  {value.toLocaleString("en-US")}
                  <span style={{ marginLeft: 6, fontSize: 14, fontWeight: 600, color: P.mutedFg }}>/ mo</span>
                </div>
              </div>
              <svg width={W} height={H} style={{ position: "absolute", inset: 0 }}>
                <defs>
                  <clipPath id="wis-growth-clip">
                    <rect x={0} y={0} width={CH.x + CH.w * draw} height={H} />
                  </clipPath>
                </defs>
                {[0, 0.5, 1].map((t) => (
                  <line key={t} x1={CH.x} x2={CH.x + CH.w} y1={CH.y + CH.h * t} y2={CH.y + CH.h * t} stroke={P.border} strokeWidth={1} strokeDasharray={t === 1 ? undefined : "3 4"} />
                ))}
                <g clipPath="url(#wis-growth-clip)">
                  <path d={AREA} fill={`color-mix(in srgb, ${P.brand} 16%, transparent)`} />
                  <path d={LINE} fill="none" stroke={P.brand} strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />
                </g>
                <circle cx={tip.x} cy={tip.y} r={4.5} fill={P.card} stroke={P.brand} strokeWidth={2.5} opacity={draw > 0.02 ? 1 : 0} />
                {TRAFFIC.months.map((m, i) => (
                  <text key={m} x={CH.x + (CH.w * (i + 0.5)) / 3} y={CH.y + CH.h + 26} textAnchor="middle" fontFamily={FONT} fontSize={12} fill={P.mutedFg}>
                    {m}
                  </text>
                ))}
              </svg>
            </div>
          </Pop>
        </Zoom>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
