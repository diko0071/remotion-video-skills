import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { SPRINGS, useReveal, useSpringAt } from "../../core/motion";

const DRAW_FROM = 6;
const DRAW_TO = 96;
export const CURVE_TOTAL = 128;

const LEFT = 240;
const RIGHT = 1680;
const TOP = 250;
const BOTTOM = 760;

const POINTS = [1.0, 1.15, 1.4, 1.35, 1.8, 2.1, 2.05, 2.5, 2.9, 2.85, 3.4, 3.9];
const MIN = 0.85;
const MAX = 4.1;

const px = (i: number) => LEFT + ((RIGHT - LEFT) * i) / (POINTS.length - 1);
const py = (v: number) => BOTTOM - ((v - MIN) / (MAX - MIN)) * (BOTTOM - TOP);

const path = POINTS.map((v, i) => `${i === 0 ? "M" : "L"} ${px(i)} ${py(v)}`).join(" ");

const NoLogin: React.FC<{ index: number }> = ({ index }) => {
  const at = DRAW_FROM + 8 + index * 12;
  const inn = useSpringAt(at, SPRINGS.pop, 16);
  return (
    <span
      style={{
        position: "absolute",
        left: px(index * 3) - 60,
        top: BOTTOM + 34,
        width: 120,
        textAlign: "center",
        fontSize: 17,
        fontWeight: 500,
        color: "rgba(23,19,16,0.32)",
        opacity: inn,
      }}
    >
      no login
    </span>
  );
};

export const CurveScene: React.FC = () => {
  const frame = useCurrentFrame();
  const draw = interpolate(frame, [DRAW_FROM, DRAW_TO], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const capIn = useReveal(-6, 20, 18);
  const headIndex = Math.min(draw * (POINTS.length - 1), POINTS.length - 1);
  const headX = LEFT + ((RIGHT - LEFT) * headIndex) / (POINTS.length - 1);
  const seg = Math.floor(headIndex);
  const t = headIndex - seg;
  const headV =
    POINTS[Math.min(seg, POINTS.length - 1)] * (1 - t) + POINTS[Math.min(seg + 1, POINTS.length - 1)] * t;
  return (
    <AbsoluteFill style={{ background: "var(--background)", fontFamily: "'Plus Jakarta Sans'" }}>
      <div
        style={{
          ...capIn,
          position: "absolute",
          left: LEFT,
          top: 128,
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        <span style={{ fontSize: 17, fontWeight: 500, color: "rgba(23,19,16,0.42)" }}>
          Account ROAS · last 12 weeks
        </span>
        <span
          style={{
            fontSize: 62,
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: "#171310",
          }}
        >
          {headV.toFixed(1)}×
        </span>
      </div>
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
        <line x1={LEFT} y1={BOTTOM} x2={RIGHT} y2={BOTTOM} stroke="rgba(23,19,16,0.1)" strokeWidth={2} />
        <path
          d={path}
          stroke="#C19767"
          strokeWidth={5}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - draw}
        />
        {draw > 0.02 ? <circle cx={headX} cy={py(headV)} r={9} fill="#C19767" /> : null}
      </svg>
      {[0, 1, 2, 3].map((i) => (
        <NoLogin key={i} index={i} />
      ))}
    </AbsoluteFill>
  );
};
