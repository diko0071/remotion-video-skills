import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { ramp } from "../../core/motion";

export const StreamText: React.FC<{
  text: string;
  from: number;
  to: number;
  color: string;
  tint?: string;
  tintAt?: readonly [number, number];
  reveal?: number;
  blur?: number;
  blurUntil?: number;
  weight?: readonly [number, number];
  hidden?: string;
}> = ({ text, from, to, color, tint, tintAt = [0, 6], reveal, blur, blurUntil = 0.9, weight, hidden }) => {
  const frame = useCurrentFrame();
  const words = text.split(" ");
  const shown = hidden === undefined ? words.length : Math.floor(interpolate(frame, [from, to], [0, words.length], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  return (
    <span>
      {words.map((w, i) => {
        const at = from + (i / words.length) * (to - from);
        const p = reveal ? ramp(frame, at, at + reveal) : 1;
        const settled = ramp(frame, at + tintAt[0], at + tintAt[1]) >= 1;
        return (
          <span
            key={i}
            style={{
              opacity: reveal ? p : undefined,
              color: i < shown ? (settled ? color : tint) : hidden,
              fontWeight: weight ? (i < shown && !settled ? weight[0] : weight[1]) : undefined,
              filter: blur && p < blurUntil ? `blur(${(1 - p) * blur}px)` : undefined,
            }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </span>
  );
};
