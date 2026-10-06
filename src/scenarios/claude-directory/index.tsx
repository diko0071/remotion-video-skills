import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { FilterDefs } from "../../kit/directional-blur";
import { KeyedRig } from "../../kit/keyed-rig";
import { Block } from "./blocks";
import { CapsuleScene } from "./directory";
import { Headline } from "./headline";
import { OrbitScene } from "./orbit";
import { WelcomeScene } from "./scene-claude";
import { TailScene } from "./tail";
import { BLOCK_LEN, BLOCKS, BLOCKS_FROM, CAM_A, CAM_B, CAM_BLOCK, DIR, ORBIT, TAIL, TOTAL } from "./timings";

export const CLAUDE_DIRECTORY_TOTAL = TOTAL;

export const ClaudeDirectory: React.FC = () => (
  <AbsoluteFill style={{ background: "#FDFDFD" }}>
    <FilterDefs />
    <Sequence durationInFrames={DIR.cut}>
      <KeyedRig id="cd-rig-a" keys={CAM_A} bg="#FDFDFD">
        <CapsuleScene />
      </KeyedRig>
      <Headline />
    </Sequence>
    <Sequence from={DIR.cut} durationInFrames={BLOCKS_FROM - DIR.cut}>
      <Sequence from={-DIR.cut} layout="none">
        <KeyedRig id="cd-rig-b" keys={CAM_B} bg="#FAF9F5">
          <WelcomeScene />
        </KeyedRig>
      </Sequence>
    </Sequence>
    {BLOCKS.map((b, i) => (
      <Sequence key={b.id} from={BLOCKS_FROM + i * BLOCK_LEN} durationInFrames={BLOCK_LEN}>
        <KeyedRig id={`cd-rig-${b.id}`} keys={CAM_BLOCK} bg="#FAF9F5">
          <Block index={i} />
        </KeyedRig>
      </Sequence>
    ))}
    <Sequence from={ORBIT.from} durationInFrames={TAIL.from - ORBIT.from}>
      <Sequence from={-ORBIT.from} layout="none">
        <OrbitScene />
      </Sequence>
    </Sequence>
    <Sequence from={TAIL.from}>
      <Sequence from={-TAIL.from} layout="none">
        <TailScene />
      </Sequence>
    </Sequence>
  </AbsoluteFill>
);
