import React from "react";
import { AbsoluteFill } from "remotion";
import { useReveal } from "../core/motion";
import { InlineTile } from "./kinetic-text";

const INK = "#171310";

const Line: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const style = useReveal(4, 40, 20);
  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Plus Jakarta Sans'",
      }}
    >
      <div
        style={{
          ...style,
          maxWidth: 1640,
          textAlign: "center",
          fontSize: 92,
          fontWeight: 800,
          letterSpacing: "-0.03em",
          lineHeight: 1.35,
          color: INK,
        }}
      >
        {children}
      </div>
    </AbsoluteFill>
  );
};

export const GoogleReadyHook: React.FC = () => (
  <Line>
    Rank first on
    <InlineTile src="ai/google.svg" at={10} tilt={-4} />
  </Line>
);

export const GeoReadyHook: React.FC = () => (
  <Line>
    Be the answer in
    <br />
    <InlineTile src="ai/chatgpt.png" at={8} tilt={-5} />
    <InlineTile src="ai/claude.png" at={12} tilt={4} />
    <InlineTile src="ai/perplexity.webp" at={16} tilt={-3} />
    <InlineTile src="ai/gemini.png" at={20} tilt={5} />
  </Line>
);
