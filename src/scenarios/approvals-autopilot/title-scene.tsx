import React from "react";
import { AbsoluteFill, interpolate } from "remotion";
import { SPRINGS, useSpringAt, useVelocityBlur } from "../../core/motion";
import { UnderlineAccent } from "../../kit/underline-accent";

const Word: React.FC<{ at: number; children: React.ReactNode }> = ({ at, children }) => {
  const p = useSpringAt(at, SPRINGS.card, 16);
  const blur = useVelocityBlur(at, SPRINGS.card, 16);
  return (
    <span
      style={{
        display: "inline-block",
        opacity: Math.min(1, p * 1.4),
        transform: `translateX(${interpolate(p, [0, 1], [70, 0])}px)`,
        filter: blur,
      }}
    >
      {children}
    </span>
  );
};

export const TitleScene: React.FC = () => {
  const sub = useSpringAt(26, SPRINGS.smooth, 22);
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", gap: 30 }}>
      <div
        style={{
          display: "flex",
          gap: 26,
          fontSize: 108,
          fontWeight: 800,
          letterSpacing: "-0.035em",
          color: "#171310",
          whiteSpace: "nowrap",
        }}
      >
        <Word at={0}>Meet</Word>
        <Word at={5}>
          <UnderlineAccent color="#C19767" drawAt={16}>
            Approvals.
          </UnderlineAccent>
        </Word>
      </div>
      <div
        style={{
          fontSize: 40,
          fontWeight: 500,
          color: "rgba(23,19,16,0.55)",
          opacity: sub,
          transform: `translateY(${interpolate(sub, [0, 1], [14, 0])}px)`,
        }}
      >
        Ryze researches your ad accounts 24/7.
      </div>
    </AbsoluteFill>
  );
};
