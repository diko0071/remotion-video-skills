import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { SPRINGS, useSpringAt } from "../../../core/motion";
import { LiquidLime } from "./liquid";
import { UI_FONT } from "../ui/composer";

const Line: React.FC<{ words: string[]; from: number; out: number }> = ({ words, from, out }) => {
  const frame = useCurrentFrame();
  const fade = interpolate(frame, [out, out + 7], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  if (frame < from - 2 || fade <= 0) return null;

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity: fade }}>
      <div style={{ display: "flex", gap: 18, fontFamily: UI_FONT }}>
        {words.map((w, i) => (
          <Word key={w + i} at={from + i * 4}>
            {w}
          </Word>
        ))}
      </div>
    </AbsoluteFill>
  );
};

const Word: React.FC<{ at: number; children: React.ReactNode }> = ({ at, children }) => {
  const p = useSpringAt(at, SPRINGS.pop, 14);
  return (
    <span
      style={{
        display: "inline-block",
        fontSize: 66,
        fontWeight: 500,
        color: "#FFFFFF",
        letterSpacing: "-0.01em",
        opacity: Math.min(1, p * 2),
        transform: `translateY(${interpolate(p, [0, 1], [16, 0])}px)`,
        textShadow: "0 4px 26px rgba(0,0,0,0.28)",
      }}
    >
      {children}
    </span>
  );
};

export const KineticShot: React.FC = () => (
  <AbsoluteFill>
    <LiquidLime />
    <Line words={["send", "a", "prompt"]} from={2} out={26} />
    <Line words={["ad", "shown", "only", "while", "you", "wait"]} from={22} out={48} />
    <Line words={["get", "paid", "by", "advertisers"]} from={50} out={80} />
  </AbsoluteFill>
);
