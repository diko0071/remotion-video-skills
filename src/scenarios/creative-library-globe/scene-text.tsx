import React from "react";
import { AbsoluteFill } from "remotion";
import { SPRINGS, useSpringAt } from "../../core/motion";
import { SettleBeats, type SettleBeat } from "../../kit/settle-text";
import { CREAM, INK_DARK, TEXT_BEAT_2_AT, TEXT_TOTAL } from "./timings";

export { TEXT_TOTAL };

const EXIT_AT = TEXT_TOTAL - 14;
const B2 = TEXT_BEAT_2_AT;

const BEATS: SettleBeat[] = [
  {
    at: 0,
    size: 104,
    parts: [
      { word: "100,000", at: 4 },
      { word: "winning", at: 9 },
      { word: "ads", at: 13 },
      { br: true },
      { word: "for", at: 18 },
      { word: "your", at: 22 },
      { word: "brand.", at: 27 },
    ],
  },
  {
    at: B2,
    size: 108,
    parts: [
      { word: "Recreate", at: B2 + 4 },
      { word: "in", at: B2 + 9 },
      { word: "1", at: B2 + 13, hl: true },
      { word: "click.", at: B2 + 17, hl: true, sparks: true },
    ],
  },
];

export const SceneText: React.FC = () => {
  const exit = useSpringAt(EXIT_AT, SPRINGS.panel, 14);
  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          inset: 0,
          scale: String(1 - exit * 0.94),
          opacity: 1 - exit * 0.55,
          filter: exit > 0.08 ? `blur(${exit * 6}px)` : undefined,
        }}
      >
        <SettleBeats
          beats={BEATS}
          total={TEXT_TOTAL}
          background="transparent"
          ink={CREAM}
          hlInk={INK_DARK}
        />
      </div>
    </AbsoluteFill>
  );
};
