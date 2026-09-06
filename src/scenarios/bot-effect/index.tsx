import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { DiveScene } from "./dive";
import { HeadlineScene } from "./headline";
import { EndcardScene } from "./endcard";
import { CUT_ENDCARD, CUT_HEADLINE, TOTAL } from "./timings";

export const BOT_EFFECT_TOTAL = TOTAL;

export const BotEffect: React.FC = () => (
  <AbsoluteFill style={{ background: "#fff" }}>
    <Sequence durationInFrames={CUT_HEADLINE}>
      <DiveScene />
    </Sequence>
    <Sequence from={CUT_HEADLINE} durationInFrames={CUT_ENDCARD - CUT_HEADLINE}>
      <HeadlineScene />
    </Sequence>
    <Sequence from={CUT_ENDCARD}>
      <EndcardScene />
    </Sequence>
  </AbsoluteFill>
);
