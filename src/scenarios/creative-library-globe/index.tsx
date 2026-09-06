import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { PromoPlayer } from "../../engine/promo/player";
import { PromoScenario } from "../../engine/promo/scenario";
import { SceneGlobe } from "./scene-globe";
import { SceneText, TEXT_TOTAL } from "./scene-text";
import { CREAM, GLOBE_TOTAL, INK_DARK } from "./timings";

export const GLOBE_TAIL: PromoScenario = {
  id: "creative-library-globe-tail",
  format: "wide",
  background: INK_DARK,
  ink: CREAM,
  transition: "cut",
  scenes: [
    {
      kind: "lockup",
      background: INK_DARK,
      ink: CREAM,
      mark: "ryze-sun-light.png",
      word: "Ryze AI",
      tagline: "The world's largest creative library, inside Ryze.",
    },
  ],
};

const TEXT_AT = GLOBE_TOTAL - 16;
const TAIL_AT = TEXT_AT + TEXT_TOTAL - 12;

export const CREATIVE_LIBRARY_GLOBE_TOTAL = TAIL_AT + 80;

export const CreativeLibraryGlobe: React.FC = () => (
  <AbsoluteFill style={{ background: INK_DARK }}>
    <Sequence durationInFrames={GLOBE_TOTAL}>
      <SceneGlobe />
    </Sequence>
    <Sequence from={TEXT_AT} durationInFrames={TEXT_TOTAL}>
      <SceneText />
    </Sequence>
    <Sequence from={TAIL_AT} durationInFrames={80}>
      <PromoPlayer scenario={GLOBE_TAIL} />
    </Sequence>
  </AbsoluteFill>
);
