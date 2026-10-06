import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { clamp01, ramp, springAt } from "../../core/motion";
import { C, SANS } from "../../kit/launch";
import { CLOCK_FONT, FINAL } from "./clock";
import { END, NS_TOTAL } from "./timings";

const LEAD = "Let your dot run your marketing:";
const WORD = { damping: 15, stiffness: 190, mass: 0.9 };
const PLATE_H = CLOCK_FONT * 1.2 * FINAL.scale;

export const EndLead: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = LEAD.split(" ");
  if (f < END.plateFrom) return null;
  const push = 1 + 0.07 * ramp(f, END.plateFrom + END.plateLen, NS_TOTAL);
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        width: 1920,
        top: FINAL.cy - PLATE_H / 2 - 150,
        display: "flex",
        justifyContent: "center",
        columnGap: "0.24em",
        fontFamily: SANS,
        fontWeight: 800,
        fontSize: 100,
        letterSpacing: "-0.035em",
        lineHeight: 1.05,
        color: C.ink,
        zIndex: 25,
        transform: `scale(${push})`,
        transformOrigin: `960px ${PLATE_H / 2 + 150}px`,
      }}
    >
      {words.map((w, i) => {
        const p = springAt(f, fps, END.lead + i * 2, WORD);
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              opacity: clamp01(p * 2),
              transform: `translateY(${(1 - p) * 0.42}em)`,
              filter: `blur(${(1 - clamp01(p)) * 8}px)`,
            }}
          >
            {w}
          </span>
        );
      })}
    </div>
  );
};
