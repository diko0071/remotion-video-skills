import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { FilterDefs } from "../../kit/directional-blur";
import { DASH } from "./dash-timings";
import { Dashboard } from "./dashboard";
import { INTRO } from "./intro-timings";
import { Lens } from "./lens";
import { IntroScene } from "./scene-intro";
import { CHATX } from "./chat-timings";
import { ChatScene } from "./scene-chat";
import { END } from "./end-timings";
import { EndScene } from "./scene-end";
import { BG, TOTAL } from "./timings";
import { TypeLine } from "./type-line";

export const SUPERAGENT_TOTAL = TOTAL;

export const SuperAgent: React.FC = () => (
  <AbsoluteFill style={{ background: BG }}>
    <FilterDefs />
    <Sequence durationInFrames={DASH.from - 2}>
      <TypeLine />
      <Lens />
    </Sequence>
    <Sequence durationInFrames={DASH.end}>
      <Dashboard />
    </Sequence>
    <Sequence from={INTRO.from} durationInFrames={CHATX.from - INTRO.from}>
      <Sequence from={-INTRO.from} layout="none">
        <IntroScene />
      </Sequence>
    </Sequence>
    <Sequence from={CHATX.from} durationInFrames={END.from - CHATX.from}>
      <ChatScene />
    </Sequence>
    <Sequence from={END.from}>
      <EndScene />
    </Sequence>
  </AbsoluteFill>
);
