import React from "react";
import { SANS } from "../../kit/launch";
import { BASELINE, LINE_BOX, TRACK } from "./theme";

export const WordAt: React.FC<{
  text: string;
  x: number;
  baseline: number;
  size: number;
  color: string;
  transform?: string;
  opacity?: number;
}> = ({ text, x, baseline, size, color, transform, opacity = 1 }) => (
  <span
    style={{
      position: "absolute",
      left: x,
      top: baseline - BASELINE * size,
      fontFamily: SANS,
      fontWeight: 800,
      fontSize: size,
      lineHeight: LINE_BOX,
      letterSpacing: TRACK,
      color,
      whiteSpace: "nowrap",
      transform,
      transformOrigin: `50% ${BASELINE * 100}%`,
      opacity,
    }}
  >
    {text}
  </span>
);
