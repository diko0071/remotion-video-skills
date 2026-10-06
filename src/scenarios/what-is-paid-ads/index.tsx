import React from "react";
import { AbsoluteFill, Sequence, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import { Lockup } from "../../kit/lockup";
import { P } from "../../kit/product-ui";
import { Sfx } from "../../kit/sfx";
import { AgentScene } from "./scene-agent";
import { CompetitorsScene } from "./scene-competitors";
import { CreativesScene } from "./scene-creatives";
import { DashboardsScene } from "./scene-dashboards";
import { ReportsScene } from "./scene-reports";
import { SchedulesScene } from "./scene-schedules";
import { TitleScene } from "./scene-title";
import { CLICKS, SCENE, TOTAL, VO_LINES } from "./timings";

export const WHAT_IS_PAID_ADS_TOTAL = TOTAL;

const ORDER = [
  { key: "title", from: SCENE.title, node: <TitleScene /> },
  { key: "agent", from: SCENE.agent, node: <AgentScene /> },
  { key: "creatives", from: SCENE.creatives, node: <CreativesScene /> },
  { key: "competitors", from: SCENE.competitors, node: <CompetitorsScene /> },
  { key: "schedules", from: SCENE.schedules, node: <SchedulesScene /> },
  { key: "reports", from: SCENE.reports, node: <ReportsScene /> },
  { key: "dashboards", from: SCENE.dashboards, node: <DashboardsScene /> },
  { key: "close", from: SCENE.close, node: <Lockup mark="ryze-sun.png" word="Ryze AI" background={P.bg} ink={P.fg} tagline="Make every ad dollar count. Start today." /> },
] as const;

export const WhatIsPaidAds: React.FC = () => (
  <AbsoluteFill style={{ background: P.bg }}>
    {ORDER.map((s, i) => (
      <Sequence key={s.key} from={s.from} durationInFrames={(i < ORDER.length - 1 ? ORDER[i + 1].from : TOTAL) - s.from}>
        {s.node}
      </Sequence>
    ))}
    {VO_LINES.map((l) => (
      <Sequence key={l.key} from={l.at} layout="none">
        <Audio src={staticFile(`vo/what-is-paid-ads/${l.key}.mp3`)} />
      </Sequence>
    ))}
    {CLICKS.map((at) => (
      <Sfx key={at} name="mouse-click" at={at - 1} />
    ))}
  </AbsoluteFill>
);
