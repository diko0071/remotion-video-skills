import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { FilterDefs } from "../../kit/directional-blur";
import { Headline } from "./headline";
import { BriefScene } from "./scene-brief";
import { AdsScene, SearchScene } from "./scene-cards";
import { HookScene } from "./scene-hook";
import { OrgLine, OrgStage, TasksScene } from "./scene-org";
import { ReachScene } from "./scene-reach";
import { LadderScene, RoutesLine, RoutingScene } from "./scene-routing";
import { SkillsScene } from "./scene-skills";
import { LockupScene, TryScene, WithinScene } from "./scene-tail";
import { BLUE, CUT, GREEN, GROUND, ORANGE, PINK, r, TOTAL } from "./timings";

export const INTRODUCING_AGENT_TOTAL = TOTAL;

const LinesScene: React.FC = () => {
  const b = CUT.lines;
  return (
    <Headline
      size={150}
      zoom={{ at: 10, to: 1.03, len: r(40) }}
      lines={[
        { at: 0, words: [{ text: "your" }, { text: "always-on" }], decos: [{ kind: "tick", color: ORANGE, at: r(83) - b, word: 0, rotate: 90, dx: 6 }] },
        { at: r(77) - b, words: [{ text: "always-active" }], decos: [{ kind: "under", color: BLUE, at: r(86) - b, word: 0, chars: [0, 6] }, { kind: "arc", color: PINK, at: r(89) - b, word: 0, rotate: 60 }] },
        { at: r(80) - b, words: [{ text: "marketing" }, { text: "agent" }], decos: [{ kind: "under", color: GREEN, at: r(92) - b, word: 1, chars: [1, 5] }] },
      ]}
    />
  );
};

const cut = (from: keyof typeof CUT, to: keyof typeof CUT) => ({ from: CUT[from], durationInFrames: CUT[to] - CUT[from] });

export const IntroducingAgent: React.FC = () => (
  <AbsoluteFill style={{ background: GROUND }}>
    <FilterDefs />
    <Sequence {...cut("hook", "lines")}><HookScene /></Sequence>
    <Sequence {...cut("lines", "email")}><LinesScene /></Sequence>
    <Sequence {...cut("email", "meeting")}><SearchScene /></Sequence>
    <Sequence {...cut("meeting", "brief")}><AdsScene /></Sequence>
    <Sequence {...cut("brief", "org")}><BriefScene /></Sequence>
    <Sequence {...cut("org", "chips")}><OrgLine /></Sequence>
    <Sequence {...cut("chips", "tasks")}><OrgStage /></Sequence>
    <Sequence {...cut("tasks", "reach")}><TasksScene /></Sequence>
    <Sequence {...cut("reach", "routes")}><ReachScene /></Sequence>
    <Sequence {...cut("routes", "routing")}><RoutesLine /></Sequence>
    <Sequence {...cut("routing", "ladder")}><RoutingScene /></Sequence>
    <Sequence {...cut("ladder", "skills")}><LadderScene /></Sequence>
    <Sequence {...cut("skills", "within")}><SkillsScene /></Sequence>
    <Sequence {...cut("within", "tryAt")}><WithinScene /></Sequence>
    <Sequence {...cut("tryAt", "lockup")}><TryScene /></Sequence>
    <Sequence {...cut("lockup", "end")}><LockupScene /></Sequence>
  </AbsoluteFill>
);
