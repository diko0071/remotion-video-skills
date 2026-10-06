import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { STAGE_ATTR } from "../../core/stage";
import { FilterDefs } from "../../kit/directional-blur";
import { HEADLINE_FONT } from "../../kit/headline";
import { SfxTrack } from "../../kit/sfx";
import { UrlEndcard } from "../../kit/url-endcard";
import { AuditScene } from "./scene-audit";
import { ChecklistScene } from "./scene-checklist";
import { ConnectScene } from "./scene-connect";
import { HookScene } from "./scene-hook";
import { ShareScene } from "./scene-share";
import { SwarmScene } from "./scene-swarm";
import { CORAL, FIX, GROUND, STARTS, TAIL, TOTAL } from "./timings";

export const SELL_AGENTS_TOTAL = TOTAL;

const SCENES = [HookScene, SwarmScene, ShareScene, ChecklistScene, ConnectScene, AuditScene];

const Tail: React.FC = () => <UrlEndcard t={TAIL} title="Ryze." line={["Sell", " what", " AI", " agents", " want."]} url={TAIL.url} fontFamily={HEADLINE_FONT} accent={CORAL} />;

export const SellAgents: React.FC = () => (
  <AbsoluteFill style={{ background: GROUND }} {...{ [STAGE_ATTR]: "" }}>
    <FilterDefs />
    {SCENES.map((Scene, i) => (
      <Sequence key={i} from={STARTS[i]} durationInFrames={STARTS[i + 1] - STARTS[i]} layout="none">
        <Scene />
      </Sequence>
    ))}
    <Sequence from={STARTS[6]} layout="none">
      <Tail />
    </Sequence>
    <SfxTrack hits={[{ name: "mouse-click", at: STARTS[5] + FIX.click }]} />
  </AbsoluteFill>
);
