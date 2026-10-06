import React from "react";
import { Img, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { clamp01, springAt } from "../../core/motion";
import { AD_GREEN, AD_RED, Card, CARD_SHADOW_SOFT, Toggle } from "../../kit/ad-objects";
import { C, SANS } from "../../kit/launch";
import { AD_SETS, BAR, barTop, CARD, CHART_BASE, CHART_BOX, CHART_CARD, CHART_VALUES, chartNumber, SPIKE, toggleBox, TOGGLE_SCALE } from "./stage";
import { BASELINE } from "./theme";
import { CHART } from "./timings";

const LOGO = staticFile("integrations/meta-ads.svg");
const ENTER = { damping: 14, stiffness: 160, mass: 0.8 };
const BAR_IDLE = "#D5DCE5";

const sinceLast = (f: number, marks: readonly number[]) => {
  const hit = [...marks].reverse().find((t) => f >= t);
  return hit === undefined ? 99 : f - hit;
};

const Bar: React.FC<{ i: number; f: number }> = ({ i, f }) => {
  const k = SPIKE.indexOf(i);
  const at = k < 0 ? Infinity : CHART.stomps[k];
  const q = clamp01((f - at) / 7);
  const top = barTop(i, q);
  const d = f - at;
  const bulge = d >= 0 && d < 12 ? 0.16 * Math.exp(-d / 2.6) : 0;
  const w = BAR.w * (1 + bulge);
  return (
    <div
      style={{
        position: "absolute",
        left: top.x - w / 2,
        top: top.y,
        width: w,
        height: CHART_BOX.bottom - top.y,
        borderRadius: `${BAR.r}px ${BAR.r}px 4px 4px`,
        background: k < 0 ? BAR_IDLE : f > at ? AD_GREEN : AD_RED,
      }}
    />
  );
};

export const ChartScene: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = springAt(f, fps, CHART.enter, ENTER);
  const hits = CHART.punches.filter((t) => f >= t).length;
  const good = hits >= CHART.punches.length;
  const d = sinceLast(f, CHART.punches);
  const shake = d < 16 ? 26 * Math.exp(-d / 3.2) * Math.cos(d * 1.25) : 0;
  const crush = d < 12 ? 0.16 * Math.exp(-d / 2.6) : 0;
  const num = chartNumber();
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 1,
        height: 1,
        opacity: clamp01(enter * 2),
        transform: `translateY(${(1 - enter) * 80}px)`,
      }}
    >
      <div style={{ position: "absolute", left: CHART_CARD.x, top: CHART_CARD.y }}>
        <Card w={CARD.w} h={CHART_CARD.h} pad="0" shadow={CARD_SHADOW_SOFT}>
          <div style={{ position: "relative", width: CARD.w, height: CHART_CARD.h }}>
            <Img src={LOGO} style={{ position: "absolute", left: 40, top: 40, width: 52, height: 52, objectFit: "contain" }} />
            <span style={{ position: "absolute", left: 108, top: 34, fontSize: 36, fontWeight: 800, letterSpacing: "-0.025em" }}>Cost per purchase</span>
            <span style={{ position: "absolute", left: 108, top: 80, fontSize: 24, fontWeight: 600, color: C.mutedFg }}>Meta Ads · last 7 days</span>
            <span
              style={{
                position: "absolute",
                right: 44,
                top: 42,
                padding: "6px 14px 8px",
                borderRadius: 10,
                background: good ? AD_GREEN : AD_RED,
                color: C.white,
                fontSize: 26,
                fontWeight: 800,
              }}
            >
              {good ? "▼ 61%" : "▲ 38%"}
            </span>
            <div style={{ position: "absolute", left: 40, right: 40, top: 420, height: 2, background: C.border }} />
            {AD_SETS.map((name, i) => {
              const p = clamp01((f - CHART.toggles[i]) / 7);
              const box = toggleBox(i);
              return (
                <React.Fragment key={name}>
                  <span
                    style={{
                      position: "absolute",
                      left: 44 + i * 330,
                      top: 462,
                      fontSize: 27,
                      fontWeight: 700,
                      letterSpacing: "-0.02em",
                      opacity: 1 - 0.5 * p,
                    }}
                  >
                    {name}
                  </span>
                  <div style={{ position: "absolute", left: box.x - CHART_CARD.x, top: box.y - CHART_CARD.y }}>
                    <Toggle p={p} scale={TOGGLE_SCALE} />
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </Card>
      </div>
      <svg style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }} width={1} height={1}>
        {[0.25, 0.5, 0.75].map((g) => (
          <line
            key={g}
            x1={CHART_BOX.x0}
            x2={CHART_BOX.x1}
            y1={CHART_BOX.top + g * (CHART_BOX.bottom - CHART_BOX.top)}
            y2={CHART_BOX.top + g * (CHART_BOX.bottom - CHART_BOX.top)}
            stroke={C.border}
            strokeWidth={2}
            strokeDasharray="6 10"
          />
        ))}
        <line x1={CHART_BOX.x0} x2={CHART_BOX.x1} y1={CHART_BOX.bottom} y2={CHART_BOX.bottom} stroke={C.border} strokeWidth={2} />
      </svg>
      {CHART_BASE.map((_, i) => (
        <Bar key={i} i={i} f={f} />
      ))}
      <span
        style={{
          position: "absolute",
          left: num.left,
          top: num.baseline - BASELINE * num.size,
          width: num.w,
          textAlign: "right",
          fontFamily: SANS,
          fontWeight: 800,
          fontSize: num.size,
          lineHeight: 1.08,
          letterSpacing: "-0.04em",
          fontVariantNumeric: "tabular-nums",
          color: good ? C.ink : AD_RED,
          whiteSpace: "nowrap",
          transform: `translateX(${shake}px) scaleX(${1 - crush})`,
          transformOrigin: "100% 86%",
        }}
      >
        {CHART_VALUES[hits]}
      </span>
    </div>
  );
};
