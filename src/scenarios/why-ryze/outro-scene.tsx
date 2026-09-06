import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { typing, useReveal } from "../../core/motion";
import { usePromoTheme } from "../../engine/promo/theme";
import { T } from "./timings";

export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const theme = usePromoTheme();
  const reveal = useReveal(-6, 18, 20);
  const today = typing(frame, "Today.", T.outroTodayFrom, T.outroTodayFrom + 13);
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <div
        style={{
          ...reveal,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
          color: theme.ink,
        }}
      >
        <div style={{ fontSize: 64, fontWeight: 800 }}>Try</div>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <Img src={staticFile("ryze-sun.png")} style={{ width: 76, height: 76 }} />
          <div style={{ fontSize: 84, fontWeight: 800, letterSpacing: -1 }}>ryze.ai</div>
        </div>
        <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.3, minHeight: 84 }}>
          {today}
        </div>
      </div>
    </AbsoluteFill>
  );
};
