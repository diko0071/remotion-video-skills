import React from "react";
import { useCurrentFrame } from "remotion";
import { CampaignPanel } from "../../kit/campaign-panel";
import { useReveal } from "../../core/motion";
import { cascade } from "../../core/schedule";
import { SceneCursor } from "../../core/stage";
import { ChatScene, chatSceneMarks } from "../../kit/chat/chat-scene";
import { CreativeGridResult } from "../../kit/chat/results/creatives";
import { SfxTrack } from "../../kit/sfx";
import { ToolFlow, type ToolSpec } from "../../kit/tool-flow";
import { AWAY_PHOTOS, PROMPT } from "./timings";

const ANSWER =
  "On it — **3 new creatives** and your campaign, coming up —";
const MARKS = chatSceneMarks(ANSWER, { resultHold: 700 });

const P1_LABELS: [string, string][] = [
  ["Reading brand photos", "3 images · palette + product extracted"],
  ["Generating creatives", "3 ads in your brand style"],
];
const P2_LABELS: [string, string][] = [
  ["Setting up campaign", "ChatGPT Ads · fitness & recovery intent"],
  ["Creating ad sets", "2 audiences · athletes & wearable owners"],
  ["Creating ads", "3 ads linked to creatives"],
  ["Setting budget & schedule", "$120/day · starts today"],
];

const P1_STARTS = cascade(14, [24]);
const P1: ToolSpec[] = P1_LABELS.map(([label, detail], i) => ({
  label,
  detail,
  start: P1_STARTS[i],
  done: P1_STARTS[i] + 26,
}));

const GRID_AT = MARKS.resultAt + P1[P1.length - 1].done + 12;

const P2_STARTS = cascade(P1[1].done + 66, [24, 22, 20]);
const P2: ToolSpec[] = P2_LABELS.map(([label, detail], i) => ({
  label,
  detail,
  start: P2_STARTS[i],
  done: P2_STARTS[i] + 28 - i * 2,
}));

const P2_AT = MARKS.resultAt + P2[0].start;
const PANEL_AT = MARKS.resultAt + P2[P2.length - 1].done + 24;
const LAUNCH_AT = PANEL_AT + 60;
const LIVE_AT = LAUNCH_AT + 10;

export const ADS_CHAT_TOTAL = LIVE_AT + 70;

const GENERATED = [
  { name: "Recovery, measured", caption: "Hero · readiness", file: "vela/chatgpt/g1.png" },
  { name: "Know before you train", caption: "Score · readiness", file: "vela/chatgpt/g2.png" },
  { name: "Waterproof to 100 m", caption: "Feature · sleep score", file: "vela/chatgpt/g3.png" },
];

const LaunchPanel: React.FC = () => (
  <CampaignPanel
    appearAt={PANEL_AT}
    clickAt={LAUNCH_AT}
    liveAt={LIVE_AT}
    title="ChatGPT campaign — Vela"
    meta="2 ad sets · 3 ads · $120/day"
    liveMeta="Live — first impressions within the hour"
    logos={["ai/chatgpt.png"]}
    thumbs={GENERATED.map((g) => g.file)}
  />
);

const AdsResult: React.FC = () => {
  const frame = useCurrentFrame();
  const gridIn = useReveal(GRID_AT, 60, 24);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 10 }}>
      <ToolFlow
        tools={P1.map((t) => ({
          ...t,
          start: t.start + MARKS.resultAt,
          done: t.done + MARKS.resultAt,
        }))}
        size={22}
      />
      {frame >= GRID_AT - 2 ? (
        <div style={{ ...gridIn, width: 860 }} data-click="answer.grid">
          <CreativeGridResult
            title="New creatives — Vela"
            subtitle="Generated from your 3 brand photos"
            items={GENERATED}
          />
        </div>
      ) : null}
      {frame >= P2_AT - 4 ? (
        <div data-click="answer.p2">
          <ToolFlow
            tools={P2.map((t) => ({
              ...t,
              start: t.start + MARKS.resultAt,
              done: t.done + MARKS.resultAt,
            }))}
            size={22}
          />
        </div>
      ) : null}
      {frame >= PANEL_AT - 2 ? <LaunchPanel /> : null}
    </div>
  );
};

export const AdsChat: React.FC = () => (
  <ChatScene
    prompt={PROMPT}
    answer={ANSWER}
    marks={MARKS}
    attachments={AWAY_PHOTOS}
    attachmentSize={84}
    result={<AdsResult />}
    bounds={false}
    overlay={
      <>
        <SceneCursor
          from={{ x: 1660, y: 1160 }}
          moves={[{ target: "campaign.launch", at: LAUNCH_AT, travel: 40 }]}
        />
        <SfxTrack hits={[{ name: "mouse-click", at: LAUNCH_AT }]} />
      </>
    }
    shots={[
      { at: 0, target: "msg.user", zoom: 1.25, align: { y: 0.26 } },
      { at: MARKS.resultAt + 4, target: "answer.result", zoom: 1.26, align: { y: 0.42 } },
      { at: GRID_AT + 2, target: "answer.grid", zoom: 1.28, snap: true },
      { at: P2_AT + 2, target: "answer.p2", zoom: 1.3, snap: true },
      { at: PANEL_AT + 2, target: "campaign.ready", zoom: 1.32, snap: true },
    ]}
  />
);
