import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { Plates } from "./plates";
import { Ring } from "./ring";
import { CLOSE, COMPOSE, HEAD, PHONE, PLATES, TEMPLATE, TOTAL, TYPE, WELCOME, WHITE } from "./timings";
import { HeadScene } from "./scene-head";
import { PhoneScene } from "./scene-phone";
import { CloseScene } from "./scene-close";
import { ComposeScene } from "./scene-compose";
import { Dissolve } from "./dissolve";
import { Template } from "./template";
import { TypeScene } from "./type";
import { Welcome } from "./welcome";

export const VEED_LAUNCH_TOTAL = TOTAL;

export const VeedLaunch: React.FC = () => (
  <AbsoluteFill style={{ background: WHITE }}>
    <Sequence durationInFrames={PLATES.from}>
      <Ring />
    </Sequence>
    <Sequence from={PLATES.from} durationInFrames={WELCOME.dark - PLATES.from}>
      <Sequence from={-PLATES.from} layout="none">
        <Plates />
      </Sequence>
    </Sequence>
    <Sequence from={WELCOME.dark} durationInFrames={TEMPLATE.from - WELCOME.dark}>
      <Sequence from={-WELCOME.dark} layout="none">
        <Welcome />
      </Sequence>
    </Sequence>
    <Sequence from={TEMPLATE.from} durationInFrames={TEMPLATE.end - TEMPLATE.from}>
      <Sequence from={-TEMPLATE.from} layout="none">
        <Template />
      </Sequence>
    </Sequence>
    <Sequence from={TYPE.from} durationInFrames={TYPE.end - TYPE.from}>
      <Sequence from={-TYPE.from} layout="none">
        <TypeScene />
      </Sequence>
    </Sequence>
    <Sequence from={COMPOSE.from} durationInFrames={COMPOSE.dissolve.from - COMPOSE.from}>
      <Sequence from={-COMPOSE.from} layout="none">
        <ComposeScene />
      </Sequence>
    </Sequence>
    <Sequence from={COMPOSE.dissolve.from} durationInFrames={COMPOSE.end - COMPOSE.dissolve.from}>
      <Sequence from={-COMPOSE.dissolve.from} layout="none">
        <Dissolve />
      </Sequence>
    </Sequence>
    <Sequence from={HEAD.from} durationInFrames={HEAD.end - HEAD.from}>
      <Sequence from={-HEAD.from} layout="none">
        <HeadScene />
      </Sequence>
    </Sequence>
    <Sequence from={PHONE.from} durationInFrames={PHONE.end - PHONE.from}>
      <Sequence from={-PHONE.from} layout="none">
        <PhoneScene />
      </Sequence>
    </Sequence>
    <Sequence from={CLOSE.from} durationInFrames={CLOSE.end - CLOSE.from}>
      <Sequence from={-CLOSE.from} layout="none">
        <CloseScene />
      </Sequence>
    </Sequence>
  </AbsoluteFill>
);
