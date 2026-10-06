import React from "react";
import { AbsoluteFill, Easing, useCurrentFrame } from "remotion";
import { ramp } from "../../core/motion";
import { INTER } from "./font";
import { IconCopy } from "./icons";
import { Roller } from "./roller";
import { CARD, INK, LIGHT, LINE, NUMBER } from "./timings";

const CIRCLES = [
  { x: -120, r: 130, v: 1.1 },
  { x: 2040, r: 130, v: -1.1 },
  { x: 640, r: 60, v: 0.6, y: 279 },
  { x: 1400, r: 60, v: -0.6, y: 798 },
] as const;

export const CardScene: React.FC = () => {
  const frame = useCurrentFrame();
  const R = CARD.rect;
  const exit = ramp(frame, CARD.exit[0], CARD.exit[1], Easing.in(Easing.cubic));
  const guides = ramp(frame, CARD.from + 2, CARD.from + 12);
  return (
    <AbsoluteFill style={{ background: LIGHT, overflow: "hidden" }}>
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0, opacity: guides * (1 - exit) }}>
        {CARD.guides.map((y) => (
          <line key={y} x1={0} x2={1920} y1={y} y2={y} stroke={LINE} strokeWidth={1.4} strokeDasharray="10 12" strokeDashoffset={-frame * 1.5} opacity={0.55} />
        ))}
        {CIRCLES.map((c, i) => {
          const cy = "y" in c ? c.y : 540;
          const cx = c.x + (frame - CARD.from) * c.v * 1.6;
          return <circle key={i} cx={cx} cy={cy} r={"y" in c ? 9 : c.r} fill={LIGHT} stroke={LINE} strokeWidth={1.4} />;
        })}
      </svg>
      <div
        style={{
          position: "absolute",
          left: R.x,
          top: R.y - exit * 80,
          width: R.w,
          height: R.h,
          borderRadius: 26,
          background: "#FBFBFB",
          boxShadow: "0 14px 40px rgba(0,0,0,0.07)",
          border: "1px solid rgba(0,0,0,0.04)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: INTER,
          opacity: 1 - exit,
        }}
      >
        <Roller value={NUMBER} rollFrom={CARD.rollFrom} settleFrom={CARD.settleFrom} settleStep={CARD.settleStep} size={CARD.digitSize} color={INK} gap={0.62} />
        <div style={{ position: "absolute", right: 56, top: R.h / 2 - 28, color: "#9A9A9A", opacity: ramp(frame, CARD.settleFrom + 10, CARD.settleFrom + 18) }}>
          <IconCopy size={56} stroke={1.5} />
        </div>
      </div>
    </AbsoluteFill>
  );
};
