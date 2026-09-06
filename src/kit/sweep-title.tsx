import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";

export const SweepTitle: React.FC<{
  word: string;
  enterAt?: number;
  enterLen?: number;
  holdLen?: number;
  exitLen?: number;
  size?: number;
  ink?: string;
  fontFamily?: string;
  weight?: number;
  holdShift?: number;
}> = ({ word, enterAt = 0, enterLen = 26, holdLen = 22, exitLen = 22, size = 560, ink = "#FFFFFF", fontFamily = "'Plus Jakarta Sans'", weight = 500, holdShift = 0 }) => {
  const frame = useCurrentFrame();
  const enter = interpolate(frame, [enterAt, enterAt + enterLen], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const exitAt = enterAt + enterLen + holdLen;
  const exit = interpolate(frame, [exitAt, exitAt + exitLen], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.cubic) });
  const x = interpolate(enter, [0, 1], [1920, holdShift]) + interpolate(exit, [0, 1], [0, -2400]);
  const enterPrev = interpolate(frame - 1, [enterAt, enterAt + enterLen], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const exitPrev = interpolate(frame - 1, [exitAt, exitAt + exitLen], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.cubic) });
  const v = Math.abs((enter - enterPrev) * 1920 + (exit - exitPrev) * 2400);
  const blur = Math.min(18, v * 0.14);
  if (frame < enterAt || frame > exitAt + exitLen) return null;
  return (
    <AbsoluteFill style={{ overflow: "hidden", alignItems: "center" }}>
      <div
        style={{
          position: "absolute",
          left: x,
          top: "50%",
          transform: "translateY(-50%)",
          fontFamily,
          fontSize: size,
          fontWeight: weight,
          letterSpacing: "-0.03em",
          color: ink,
          whiteSpace: "nowrap",
          lineHeight: 1,
          filter: blur > 0.6 ? `blur(${blur.toFixed(1)}px)` : undefined,
        }}
      >
        {word}
      </div>
    </AbsoluteFill>
  );
};
