import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

const LEAD_IN = 16;
const FADE_IN = 6;
const HOLD = 8;
const FADE_OUT = 6;
const TRAVEL = 26;

const BRIDGE = 60;

const windows = (clicks: { at: number }[]) => {
  const sorted = [...clicks].sort((a, b) => a.at - b.at);
  const out: { from: number; to: number }[] = [];
  for (const click of sorted) {
    const from = click.at - TRAVEL - LEAD_IN;
    const to = click.at + HOLD;
    const last = out[out.length - 1];
    if (last && from - last.to <= BRIDGE) last.to = to;
    else out.push({ from, to });
  }
  return out;
};

export const CursorVeil: React.FC<{
  clicks: { at: number }[];
  children: React.ReactNode;
}> = ({ clicks, children }) => {
  const frame = useCurrentFrame();
  let opacity = 0;
  for (const span of windows(clicks)) {
    const appear = span.from;
    const leave = span.to;
    const value = Math.min(
      interpolate(frame, [appear, appear + FADE_IN], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }),
      interpolate(frame, [leave, leave + FADE_OUT], [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }),
    );
    if (value > opacity) opacity = value;
  }
  if (opacity <= 0.001) return null;
  return <div style={{ opacity }}>{children}</div>;
};
