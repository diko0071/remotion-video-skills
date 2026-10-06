import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C, SANS } from "../../kit/launch";
import { BigLines } from "./scene-intro";
import { T } from "./timings";

const TITLES = [
  { words: ["1.", "You", "set", "the", "goal."], plate: [0, 0] as const, at: T.step1.at, end: T.step2.at },
  { words: ["2.", "The", "agent", "sets", "it", "up."], plate: [0, 0] as const, at: T.step2.at, end: T.step3.at },
  { words: ["3.", "It", "launches", "on", "its", "own."], plate: [0, 0] as const, at: T.step3.at, end: T.step4.at },
  { words: ["4.", "It", "keeps", "optimizing."], plate: [0, 0] as const, at: T.step4.at, end: T.asks.at },
  { words: ["It", "asks", "when", "it", "needs", "you."], plate: [1, 1] as const, at: T.asks.at, end: T.close.cut },
];

export const StepTitle: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: SANS, color: C.ink, pointerEvents: "none" }}>
      {TITLES.map((t) =>
        f >= t.at - 2 && f < t.end + 6 ? (
          <div key={t.at} style={{ position: "absolute", left: 0, right: 0, top: 66, display: "flex", justifyContent: "center" }}>
            <BigLines size={96} step={2} exit={t.end - 10} rows={[{ words: t.words, plate: t.plate, at: t.at }]} />
          </div>
        ) : null,
      )}
    </AbsoluteFill>
  );
};
