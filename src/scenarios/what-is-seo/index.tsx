import React from "react";
import { AbsoluteFill, Sequence, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import { Lockup } from "../../kit/lockup";
import { P } from "../../kit/product-ui";
import { Sfx } from "../../kit/sfx";
import { PublishScene } from "./scene-publish";
import { ScoreScene } from "./scene-score";
import { WriteScene } from "./scene-write";
import { AuditScene } from "./scene-audit";
import { ConnectScene } from "./scene-connect";
import { GrowthScene } from "./scene-growth";
import { KeywordsScene } from "./scene-keywords";
import { PromptsScene } from "./scene-prompts";
import { TitleScene } from "./scene-title";
import { ThreeScene } from "./scene-three";
import { LinksScene } from "./scene-links";
import { CLICKS, SCENE, TOTAL, VO_LINES } from "./timings";

export const WHAT_IS_SEO_TOTAL = TOTAL;

const ORDER = [
  { key: "title", from: SCENE.title, node: <TitleScene /> },
  { key: "three", from: SCENE.three, node: <ThreeScene /> },
  { key: "connect", from: SCENE.connect, node: <ConnectScene /> },
  { key: "audit", from: SCENE.audit, node: <AuditScene /> },
  { key: "keywords", from: SCENE.keywords, node: <KeywordsScene /> },
  { key: "prompts", from: SCENE.prompts, node: <PromptsScene /> },
  { key: "write", from: SCENE.write, node: <WriteScene /> },
  { key: "score", from: SCENE.score, node: <ScoreScene /> },
  { key: "publish", from: SCENE.publish, node: <PublishScene /> },
  { key: "links", from: SCENE.links, node: <LinksScene /> },
  { key: "growth", from: SCENE.growth, node: <GrowthScene /> },
  { key: "close", from: SCENE.close, node: <Lockup mark="ryze-sun.png" word="Ryze AI" background={P.bg} ink={P.fg} tagline="Rank higher on autopilot. Start today." /> },
] as const;

export const WhatIsSeo: React.FC = () => (
  <AbsoluteFill style={{ background: P.bg }}>
    {ORDER.map((s, i) => (
      <Sequence key={s.key} from={s.from} durationInFrames={(i < ORDER.length - 1 ? ORDER[i + 1].from : TOTAL) - s.from}>
        {s.node}
      </Sequence>
    ))}
    {VO_LINES.map((l) => (
      <Sequence key={l.key} from={l.at} layout="none">
        <Audio src={staticFile(`vo/what-is-seo/${l.key}.mp3`)} />
      </Sequence>
    ))}
    {CLICKS.map((at) => (
      <Sfx key={at} name="mouse-click" at={at - 1} />
    ))}
  </AbsoluteFill>
);
