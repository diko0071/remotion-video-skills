import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { STAGE_ATTR } from "../../core/stage";
import { SfxTrack } from "../../kit/sfx";
import { AskLayer } from "./app";
import { HeadlineLayer } from "./headline";
import { StageLayer } from "./stage";
import { TailScene } from "./tail";
import { WorkLayer } from "./work";
import { ALLOW_AT, GROUND, SEND, TAIL_LEN, TOTAL, WORK_OUT } from "./timings";

export const MUSE_RYZE_TOTAL = TOTAL;

export const MuseRyze: React.FC = () => (
  <AbsoluteFill style={{ background: GROUND }} {...{ [STAGE_ATTR]: "" }}>
    <AskLayer />
    <StageLayer />
    <HeadlineLayer />
    <WorkLayer />
    <Sequence from={WORK_OUT} durationInFrames={TAIL_LEN}>
      <TailScene />
    </Sequence>
    <SfxTrack hits={[{ name: "mouse-click", at: SEND }, { name: "mouse-click", at: ALLOW_AT }]} />
  </AbsoluteFill>
);
