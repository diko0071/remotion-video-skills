import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { SettleLine } from "../../kit/settle-text";
import { GROUND, HEADLINE_AT, HEADLINE_LEN } from "./timings";

export const HeadlineLayer: React.FC = () => {
  const frame = useCurrentFrame();
  const inn = interpolate(frame, [HEADLINE_AT, HEADLINE_AT + 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  if (frame < HEADLINE_AT || frame >= HEADLINE_AT + HEADLINE_LEN) return null;
  return (
    <AbsoluteFill style={{ background: GROUND, opacity: inn }}>
      <SettleLine
        size={104}
        parts={[
          { word: "Manage", at: HEADLINE_AT + 2 },
          { word: "your", at: HEADLINE_AT + 7 },
          { word: "marketing", at: HEADLINE_AT + 12 },
          { br: true },
          { word: "in", at: HEADLINE_AT + 20 },
          { image: "muse/muse-icon.png", at: HEADLINE_AT + 23, size: 112, radius: 26 },
          { word: "Muse", at: HEADLINE_AT + 26 },
        ]}
      />
    </AbsoluteFill>
  );
};
