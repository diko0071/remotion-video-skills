import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { ContentScene, CONTENT_SCENE_TOTAL } from "./scene-content";
import { FinalScene, FINAL_SCENE_TOTAL } from "./scene-final";
import { FixScene, FIX_SCENE_TOTAL } from "./scene-fix";
import { InputScene, INPUT_SCENE_TOTAL } from "./scene-input";
import { LinksScene, LINKS_SCENE_TOTAL } from "./scene-links";
import { ScanScene, SCAN_SCENE_TOTAL } from "./scene-scan";
import { TailScene, TAIL_TOTAL } from "./tail";

const INPUT_AT = SCAN_SCENE_TOTAL;
const FIX_AT = INPUT_AT + INPUT_SCENE_TOTAL;
const LINKS_AT = FIX_AT + FIX_SCENE_TOTAL;
const CONTENT_AT = LINKS_AT + LINKS_SCENE_TOTAL;
const FINAL_AT = CONTENT_AT + CONTENT_SCENE_TOTAL;
const TAIL_AT = FINAL_AT + FINAL_SCENE_TOTAL;

export const DONE_FOR_YOU_TOTAL = TAIL_AT + TAIL_TOTAL;

export const DoneForYou: React.FC = () => (
  <AbsoluteFill style={{ background: "var(--background)" }}>
    <Sequence durationInFrames={SCAN_SCENE_TOTAL}>
      <ScanScene />
    </Sequence>
    <Sequence from={INPUT_AT} durationInFrames={INPUT_SCENE_TOTAL}>
      <InputScene />
    </Sequence>
    <Sequence from={FIX_AT} durationInFrames={FIX_SCENE_TOTAL}>
      <FixScene />
    </Sequence>
    <Sequence from={LINKS_AT} durationInFrames={LINKS_SCENE_TOTAL}>
      <LinksScene />
    </Sequence>
    <Sequence from={CONTENT_AT} durationInFrames={CONTENT_SCENE_TOTAL}>
      <ContentScene />
    </Sequence>
    <Sequence from={FINAL_AT} durationInFrames={FINAL_SCENE_TOTAL}>
      <FinalScene />
    </Sequence>
    <Sequence from={TAIL_AT}>
      <TailScene />
    </Sequence>
  </AbsoluteFill>
);
