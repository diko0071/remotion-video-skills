import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame } from "remotion";
import { FilterDefs } from "../../kit/directional-blur";
import { KeyedRig, projectThroughKeys } from "../../kit/keyed-rig";
import { SlidePage } from "../../kit/transitions/slide";
import { CarriedObject } from "../../kit/transitions/carry";
import { CapsuleScene } from "./capsule";
import { ClaudeScene, TileMorph } from "./scene-claude";
import { CARRY, CAM_C, DRAG, SLACK, TAIL, WELCOME } from "./claude-timings";
import { Img, staticFile } from "remotion";
import { SlackScene } from "./scene-slack";
import { TailScene } from "./scene-tail";
import { Headlines } from "./headline";
import { CAM_A, CAM_B, CUT_CLAUDE, CUT_WEB, TOTAL } from "./timings";
import { WebScene } from "./web";

export const MCP_HOOK_TOTAL = TOTAL;

const CarryLayer: React.FC = () => {
  const tc = { x: SLACK.tile.x + SLACK.tile.size / 2 + 44, y: SLACK.tile.y + SLACK.tile.size / 2 + 46 };
  const stops = [
    { x: CARRY.from.x, y: CARRY.from.y, at: DRAG.grab, click: true },
    { x: CARRY.lift.x, y: CARRY.lift.y, at: CARRY.liftAt },
    { x: CARRY.lift.x, y: CARRY.lift.y, at: SLACK.from + SLACK.slide },
    { x: tc.x, y: tc.y, at: SLACK.land },
  ];
  return (
    <CarriedObject
      stops={stops}
      from={DRAG.grab}
      until={SLACK.land}
      size={[CARRY.size[0], CARRY.size[1]]}
      grow={[CARRY.grow[0], CARRY.grow[1]]}
      aspect={1.34}
      render={(w, h) => <Img src={staticFile("integrations/google-docs.svg")} style={{ width: w, height: h, display: "block" }} />}
    />
  );
};

const MorphLayer: React.FC = () => {
  const frame = useCurrentFrame();
  return <TileMorph star={projectThroughKeys(CAM_C, frame, WELCOME.star.x, WELCOME.star.y)} />;
};

export const McpHook: React.FC = () => (
  <AbsoluteFill style={{ background: "#FDFDFD" }}>
    <FilterDefs />
    <Sequence durationInFrames={CUT_WEB}>
      <KeyedRig id="mh-rig-a" keys={CAM_A} bg="#FDFDFD">
        <CapsuleScene />
      </KeyedRig>
      <Headlines />
    </Sequence>
    <Sequence from={CUT_WEB} durationInFrames={CUT_CLAUDE - CUT_WEB}>
      <KeyedRig id="mh-rig-b" keys={CAM_B} bg="#FDFDFD">
        <WebScene />
      </KeyedRig>
    </Sequence>
    <Sequence from={CUT_CLAUDE + SLACK.from - SLACK.slide} durationInFrames={TAIL.from - SLACK.from + SLACK.slide}>
      <SlidePage id="mh-slide-in" at={0} len={SLACK.slide * 2} direction="in">
        <SlackScene />
      </SlidePage>
    </Sequence>
    <Sequence from={CUT_CLAUDE + TAIL.from}>
      <TailScene />
    </Sequence>
    <Sequence from={CUT_CLAUDE} durationInFrames={SLACK.from + SLACK.slide}>
      <SlidePage id="mh-slide-out" at={SLACK.from - SLACK.slide} len={SLACK.slide * 2} direction="out">
        <KeyedRig id="mh-rig-c" keys={CAM_C} bg="#FAF9F5">
          <ClaudeScene />
        </KeyedRig>
        <MorphLayer />
      </SlidePage>
    </Sequence>
    <Sequence from={CUT_CLAUDE}>
      <CarryLayer />
    </Sequence>
  </AbsoluteFill>
);
