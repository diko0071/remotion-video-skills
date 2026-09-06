import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { IntroScene } from "./intro";
import { SaasScene } from "./saas";
import { ComposerScene } from "./composer";
import { ChainScene } from "./chain";
import { CrowdScene } from "./crowd";
import { EndcardScene } from "./endcard";
import { CUT_CHAIN, CUT_COMPOSER, CUT_CROWD, CUT_END, CUT_SAAS, TOTAL } from "./timings";

export const SHIPPER_2_TOTAL = TOTAL;

export const Shipper2: React.FC = () => (
  <AbsoluteFill style={{ background: "#fff" }}>
    <Sequence durationInFrames={CUT_SAAS}>
      <IntroScene />
    </Sequence>
    <Sequence from={CUT_SAAS} durationInFrames={CUT_COMPOSER - CUT_SAAS}>
      <SaasScene />
    </Sequence>
    <Sequence from={CUT_COMPOSER} durationInFrames={CUT_CHAIN - CUT_COMPOSER}>
      <ComposerScene />
    </Sequence>
    <Sequence from={CUT_CHAIN} durationInFrames={CUT_CROWD - CUT_CHAIN}>
      <ChainScene />
    </Sequence>
    <Sequence from={CUT_CROWD} durationInFrames={CUT_END - CUT_CROWD}>
      <CrowdScene />
    </Sequence>
    <Sequence from={CUT_END}>
      <EndcardScene />
    </Sequence>
  </AbsoluteFill>
);
