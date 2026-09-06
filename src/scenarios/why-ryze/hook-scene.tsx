import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { typing } from "../../core/motion";
import { usePromoTheme } from "../../engine/promo/theme";
import { HOOK_LINE_SPLIT, HOOK_TEXT, T } from "./timings";

export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const theme = usePromoTheme();
  const typed = typing(frame, HOOK_TEXT, T.hookTypeFrom, T.hookTypeTo);
  const lineOne = typed.slice(0, HOOK_LINE_SPLIT);
  const lineTwo = typed.slice(HOOK_LINE_SPLIT + 1);
  return (
    <AbsoluteFill
      style={{
        background: theme.accent,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          color: "#FFFFFF",
          fontSize: 96,
          fontWeight: 800,
          lineHeight: 1.3,
          textAlign: "center",
          letterSpacing: -1,
        }}
      >
        <div style={{ minHeight: 125 }}>{lineOne}</div>
        <div style={{ minHeight: 125 }}>{lineTwo}</div>
      </div>
    </AbsoluteFill>
  );
};
