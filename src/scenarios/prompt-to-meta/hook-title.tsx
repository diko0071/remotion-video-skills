import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C } from "./theme";
import { clamp01, lerp, pop, ramp, T } from "./timeline";

const LINES = [
  { words: ["every", "pixel", "here"], at: T.title1 },
  { words: ["is", "a", "live", "Meta", "ad."], at: T.title2 },
];

const Word: React.FC<{ text: string; at: number; f: number }> = ({ text, at, f }) => {
  const p = pop(f, at, 15, 160);
  return (
    <span
      style={{
        display: "inline-block",
        opacity: clamp01(p * 1.7),
        transform: `translateY(${(1 - p) * 0.4}em)`,
        filter: `blur(${(1 - clamp01(p)) * 12}px)`,
      }}
    >
      {text}
    </span>
  );
};

export const HookTitle: React.FC = () => {
  const f = useCurrentFrame();
  if (f > T.titleOut + 14) return null;
  const out = ramp(f, T.titleOut, 12);
  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        opacity: 1 - out,
        transform: `scale(${lerp(1, 0.9, out)})`,
        filter: `blur(${out * 10}px)`,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 60% 45% at 50% 50%, rgba(5,10,30,0.42) 0%, rgba(5,10,30,0) 70%)",
        }}
      />
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          fontSize: 118,
          fontWeight: 700,
          letterSpacing: "-0.035em",
          lineHeight: 1.05,
          color: C.paper,
          textShadow: "0 6px 34px rgba(0,0,0,0.5)",
          whiteSpace: "nowrap",
        }}
      >
        {LINES.map((line) => (
          <div key={line.at} style={{ display: "flex", gap: "0.24em" }}>
            {line.words.map((w, i) => (
              <Word key={w + i} text={w} at={line.at + i * 4} f={f} />
            ))}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
