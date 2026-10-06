import React from "react";
import { AbsoluteFill, Easing, useCurrentFrame, useVideoConfig } from "remotion";
import { ramp, springAt } from "../../core/motion";
import { useLaunchFrame } from "./frame";
import { C, SANS } from "./tokens";

const PLATE_PAD = "0.04em 0.16em 0.08em";
const LEAD_SPRING = { damping: 15, stiffness: 180, mass: 0.9 };
const PLATE_SPRING = { damping: 16, stiffness: 200, mass: 0.9 };
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

const Caret: React.FC<{ on: boolean }> = ({ on }) => (
  <span
    style={{
      display: "inline-block",
      width: "0.07em",
      height: "0.9em",
      marginLeft: "0.04em",
      verticalAlign: "-0.1em",
      background: C.ink,
      opacity: on ? 1 : 0,
    }}
  />
);

export const UrlPlateEndCard: React.FC<{
  lead: string;
  url: string;
  at: number;
  total: number;
  speed?: number;
  plate?: string;
}> = ({
  lead,
  url,
  at,
  total,
  speed = 0.6,
  plate = C.brandLight,
}) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fr = useLaunchFrame();
  if (f < at - 2) return null;
  const leadIn = springAt(f, fps, at, LEAD_SPRING);
  const plateIn = springAt(f, fps, at + 2, PLATE_SPRING);
  const start = at + 2;
  const typed = url.slice(0, Math.max(0, Math.floor((f - start) * speed)));
  const doneAt = start + url.length / speed;
  const caretOn = f < doneAt + 2 || Math.floor((f - doneAt) / 9) % 2 === 0;
  const push = 1 + 0.1 * ramp(f, at, total, Easing.linear);
  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          top: fr.url.cy,
          left: 0,
          width: fr.w,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: fr.url.size * 0.1,
          fontFamily: SANS,
          fontWeight: 800,
          letterSpacing: "-0.035em",
          color: C.ink,
          transform: `translateY(-50%) scale(${push})`,
          transformOrigin: "50% 50%",
          whiteSpace: "nowrap",
        }}
      >
        <span
          style={{
            fontSize: fr.url.lead,
            lineHeight: 1.05,
            opacity: clamp01(leadIn * 2),
            transform: `translateY(${(1 - leadIn) * 0.4}em)`,
            filter: `blur(${(1 - clamp01(leadIn)) * 8}px)`,
          }}
        >
          {lead}
        </span>
        <span style={{ position: "relative", display: "inline-block", fontSize: fr.url.size, lineHeight: 1.1 }}>
          <span style={{ visibility: "hidden", display: "inline-block", padding: PLATE_PAD }}>
            {url}
            <Caret on={false} />
          </span>
          <span
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              display: "inline-block",
              padding: PLATE_PAD,
              background: plate,
              opacity: clamp01(plateIn * 2),
              transform: `scaleY(${clamp01(plateIn)})`,
              transformOrigin: "50% 60%",
            }}
          >
            {typed}
            <Caret on={caretOn} />
          </span>
        </span>
      </div>
    </AbsoluteFill>
  );
};
