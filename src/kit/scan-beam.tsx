import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";

const beamPos = (frame: number, at: number, span: number, len: number) =>
  interpolate(frame, [at, at + len], [-60, span + 60], {
    easing: Easing.bezier(0.45, 0, 0.55, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

export const ScanBeam: React.FC<{ axis: "x" | "y"; at: number; span: number; len?: number; color?: string }> = ({
  axis,
  at,
  span,
  len = 52,
  color = "193,151,103",
}) => {
  const frame = useCurrentFrame();
  const pos = beamPos(frame, at, span, len);
  const alive = frame >= at && frame <= at + len + 6;
  const fade = interpolate(frame, [at, at + 6, at + len, at + len + 6], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  if (!alive) return null;
  const across = axis === "x";
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: across ? pos : 0,
          top: across ? 0 : pos,
          width: across ? 3 : "100%",
          height: across ? "100%" : 3,
          background: "rgba(255,255,255,0.95)",
          boxShadow: `0 0 18px 6px rgba(${color},0.85), 0 0 60px 22px rgba(${color},0.35)`,
          opacity: fade,
          zIndex: 4,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: across ? pos - 190 : 0,
          top: across ? 0 : pos - 190,
          width: across ? 190 : "100%",
          height: across ? "100%" : 190,
          background: `linear-gradient(${across ? "90deg" : "180deg"}, rgba(${color},0), rgba(${color},0.22))`,
          opacity: fade,
          zIndex: 3,
        }}
      />
    </>
  );
};
