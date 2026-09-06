import React from "react";
import { AbsoluteFill } from "remotion";
import { SPRINGS, useSpringAt } from "../../core/motion";
import { KineticLine } from "../../kit/kinetic-text";

export const CTA_TOTAL = 74;
export const CTA_EXIT_AT = CTA_TOTAL - 12;

export const SceneCta: React.FC = () => {
  const exitOut = useSpringAt(CTA_EXIT_AT, SPRINGS.panel, 14);
  return (
    <AbsoluteFill style={{ background: "var(--background)" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          scale: String(1 - exitOut * 0.96),
          opacity: 1 - exitOut * 0.55,
          filter: exitOut > 0.1 ? `blur(${exitOut * 6}px)` : undefined,
        }}
      >
        <KineticLine
          at={4}
          span={26}
          size={110}
          maxWidth={1600}
          parts={[
            { word: "Check" },
            { word: "if" },
            {
              group: [
                { word: "your", at: 20 },
                { word: "website", at: 25 },
              ],
              sparks: true,
            },
            { br: true },
            { word: "is" },
            { word: "affected." },
          ]}
        />
      </div>
    </AbsoluteFill>
  );
};
