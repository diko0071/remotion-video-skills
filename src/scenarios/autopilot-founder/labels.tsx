import React from "react";
import { Sequence } from "remotion";
import { Pop } from "../../kit/pop";
import { FONT, INK } from "./theme";

export type LabelSpec = {
  text: string;
  from: number;
  until: number;
  x: number;
  y: number;
  size?: number;
  align?: "left" | "center" | "right";
  arrow?: { x1: number; y1: number; x2: number; y2: number; curve?: number };
};

const Arrow: React.FC<{ x1: number; y1: number; x2: number; y2: number; curve?: number }> = ({ x1, y1, x2, y2, curve = 0 }) => {
  const mx = (x1 + x2) / 2 + curve;
  const my = (y1 + y2) / 2;
  const ang = Math.atan2(y2 - my, x2 - mx);
  const head = 22;
  const hx1 = x2 - head * Math.cos(ang - 0.5);
  const hy1 = y2 - head * Math.sin(ang - 0.5);
  const hx2 = x2 - head * Math.cos(ang + 0.5);
  const hy2 = y2 - head * Math.sin(ang + 0.5);
  return (
    <svg style={{ position: "absolute", inset: 0, overflow: "visible" }} width={1080} height={1920}>
      <path d={`M${x1} ${y1} Q${mx} ${my} ${x2} ${y2}`} stroke={INK} strokeWidth={4} fill="none" strokeLinecap="round" />
      <path d={`M${hx1} ${hy1} L${x2} ${y2} L${hx2} ${hy2}`} stroke={INK} strokeWidth={4} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export const Labels: React.FC<{ labels: LabelSpec[] }> = ({ labels }) => (
  <>
    {labels.map((l) => (
      <Sequence key={`${l.text}-${l.from}`} from={l.from} durationInFrames={l.until - l.from} layout="none">
        <div
          style={{
            position: "absolute",
            left: l.align === "center" ? 0 : l.align === "right" ? undefined : l.x,
            right: l.align === "right" ? 1080 - l.x : undefined,
            width: l.align === "center" ? 1080 : undefined,
            top: l.y,
            textAlign: l.align ?? "left",
            fontFamily: FONT,
            fontWeight: 600,
            fontSize: l.size ?? 44,
            lineHeight: 1.25,
            color: INK,
            whiteSpace: "pre-line",
          }}
        >
          <Pop at={0} from={0.85} rise={10}>
            <span style={{ display: "block", textAlign: l.align ?? "left" }}>{l.text}</span>
          </Pop>
        </div>
        {l.arrow ? (
          <Pop at={4} from={1} rise={0} style={{ position: "absolute", inset: 0 }}>
            <Arrow {...l.arrow} />
          </Pop>
        ) : null}
      </Sequence>
    ))}
  </>
);

export const Check: React.FC<{ at: number; x: number; y: number }> = ({ at, x, y }) => (
  <div style={{ position: "absolute", left: x, top: y }}>
    <Pop at={at} from={0.4} rise={0}>
      <svg width={92} height={92} viewBox="0 0 92 92">
        <circle cx={46} cy={46} r={40} stroke={INK} strokeWidth={4.5} fill="none" />
        <path d="M28 47 L41 60 L66 33" stroke={INK} strokeWidth={5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Pop>
  </div>
);
