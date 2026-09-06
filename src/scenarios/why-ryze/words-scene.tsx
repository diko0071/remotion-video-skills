import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { SfxTrack } from "../../kit/sfx";
import { usePromoTheme } from "../../engine/promo/theme";
import { WORDS, WORD_MARKS } from "./timings";

export const WordsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const theme = usePromoTheme();
  let active = 0;
  WORD_MARKS.forEach((mark, i) => {
    if (frame >= mark) active = i;
  });
  const entry = WORDS[active];
  const stripe: React.CSSProperties =
    entry.side === "ink" ? { left: 0, width: "50%" } : { left: "50%", right: 0 };
  return (
    <AbsoluteFill>
      <SfxTrack hits={WORD_MARKS.map((at) => ({ name: "mouse-click", at }))} />
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          width: "50%",
          background: theme.ink,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          ...stripe,
        }}
      >
        <div
          style={{
            fontSize: 68,
            fontWeight: 800,
            letterSpacing: -0.5,
            whiteSpace: "nowrap",
            color: entry.side === "ink" ? theme.background : theme.ink,
          }}
        >
          {entry.word}
        </div>
      </div>
    </AbsoluteFill>
  );
};
