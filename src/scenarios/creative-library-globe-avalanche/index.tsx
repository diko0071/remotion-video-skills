import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { PromoPlayer } from "../../engine/promo/player";
import { GLOBE_TAIL } from "../creative-library-globe";
import { SceneGlobe } from "../creative-library-globe/scene-globe";
import { SceneStack, STACK_TOTAL } from "../creative-library-globe/scene-stack";
import { SceneText, TEXT_TOTAL } from "../creative-library-globe/scene-text";
import { GLOBE_TOTAL, INK_DARK } from "../creative-library-globe/timings";

const STACK_AT = GLOBE_TOTAL - 16;
const TEXT_AT = STACK_AT + STACK_TOTAL - 8;
const TAIL_AT = TEXT_AT + TEXT_TOTAL - 12;

export const CREATIVE_LIBRARY_GLOBE_AVALANCHE_TOTAL = TAIL_AT + 80;

export const CreativeLibraryGlobeAvalanche: React.FC = () => (
  <AbsoluteFill style={{ background: INK_DARK }}>
    <Sequence durationInFrames={GLOBE_TOTAL}>
      <SceneGlobe />
    </Sequence>
    <Sequence from={STACK_AT} durationInFrames={STACK_TOTAL}>
      <SceneStack />
    </Sequence>
    <Sequence from={TEXT_AT} durationInFrames={TEXT_TOTAL}>
      <SceneText />
    </Sequence>
    <Sequence from={TAIL_AT} durationInFrames={80}>
      <PromoPlayer scenario={GLOBE_TAIL} />
    </Sequence>
  </AbsoluteFill>
);
