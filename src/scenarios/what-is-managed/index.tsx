import React from "react";
import { AbsoluteFill, Sequence, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import { Lockup } from "../../kit/lockup";
import { Sfx } from "../../kit/sfx";
import { BudgetScene } from "./scene-budget";
import { CampaignScene } from "./scene-campaign";
import { FeeScene } from "./scene-fee";
import { PlatformsScene } from "./scene-platforms";
import { TeamScene } from "./scene-team";
import { TitleScene } from "./scene-title";
import { CLICKS, SCENE, TOTAL, VO_LINES } from "./timings";
import { P } from "../../kit/product-ui";

export const WHAT_IS_MANAGED_TOTAL = TOTAL;

const ORDER = [
  { key: "title", from: SCENE.title, node: <TitleScene /> },
  { key: "team", from: SCENE.team, node: <TeamScene /> },
  { key: "platforms", from: SCENE.platforms, node: <PlatformsScene /> },
  { key: "budget", from: SCENE.budget, node: <BudgetScene /> },
  { key: "campaign", from: SCENE.build, node: <CampaignScene /> },
  { key: "fee", from: SCENE.fee, node: <FeeScene /> },
  {
    key: "close",
    from: SCENE.close,
    node: <Lockup mark="ryze-sun.png" word="Ryze AI" background={P.bg} ink={P.fg} tagline="Start your first managed campaign today" />,
  },
] as const;

export const WhatIsManaged: React.FC = () => (
  <AbsoluteFill style={{ background: P.bg }}>
    {ORDER.map((s, i) => (
      <Sequence key={s.key} from={s.from} durationInFrames={(i < ORDER.length - 1 ? ORDER[i + 1].from : TOTAL) - s.from}>
        {s.node}
      </Sequence>
    ))}
    {VO_LINES.map((l) => (
      <Sequence key={l.key} from={l.at} layout="none">
        <Audio src={staticFile(`vo/what-is-managed/${l.key}.mp3`)} />
      </Sequence>
    ))}
    {CLICKS.map((at) => (
      <Sfx key={at} name="mouse-click" at={at - 1} />
    ))}
  </AbsoluteFill>
);
