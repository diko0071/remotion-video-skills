import React from "react";
import { AbsoluteFill } from "remotion";
import { KineticLine } from "./kinetic-text";

export const GROK_CTA_LEN = 80;

export const GrokCta: React.FC<{ background: string; ink: string; size?: number; maxWidth?: number }> = ({ background, ink, size = 84, maxWidth = 1000 }) => (
  <AbsoluteFill style={{ background }}>
    <KineticLine
      at={0}
      span={24}
      size={size}
      maxWidth={maxWidth}
      ink={ink}
      hlInk="#171310"
      parts={[{ word: "Comment" }, { word: "“Grok”", highlight: true }, { br: true }, { word: "to" }, { word: "get" }, { word: "the" }, { word: "guide." }]}
    />
  </AbsoluteFill>
);

export const GrokCtaPill: React.FC<{ size?: number; bottom?: number }> = ({ size = 32, bottom = 44 }) => (
  <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-end", paddingBottom: bottom, fontFamily: "'Plus Jakarta Sans'" }}>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: size * 0.32,
        padding: `${size * 0.42}px ${size * 0.85}px`,
        borderRadius: 999,
        background: "rgba(23,19,16,0.92)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.18)",
        color: "#FDFAF3",
        fontSize: size,
        fontWeight: 800,
        letterSpacing: "-0.02em",
        whiteSpace: "nowrap",
      }}
    >
      <span>Comment</span>
      <span style={{ background: "#EFD3A4", color: "#171310", borderRadius: size * 0.28, padding: `${size * 0.04}px ${size * 0.22}px`, transform: "rotate(-0.8deg)" }}>“Grok”</span>
      <span>to get the guide</span>
    </div>
  </AbsoluteFill>
);

export const GrokCtaPillStill: React.FC<{ size?: number; bottom?: number }> = (props) => (
  <>
    <style>{"html, body { background: transparent !important; }"}</style>
    <GrokCtaPill {...props} />
  </>
);
