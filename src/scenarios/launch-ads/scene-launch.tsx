import React from "react";
import { CampaignPanel } from "../../kit/campaign-panel";
import { SceneCursor } from "../../core/stage";
import { cascade } from "../../core/schedule";
import { ChatScene, continuationMarks } from "../../kit/chat/chat-scene";
import { SfxTrack } from "../../kit/sfx";
import { ToolFlow, type ToolSpec } from "../../kit/tool-flow";
import { HistoryFormTurn, HistoryPrompt, HistoryWorkTurn } from "./history";
import { KACHAVA } from "./timings";

const ANSWER = "Creating the campaign — approve and it's live:";
const MARKS = continuationMarks(ANSWER);

const STARTS = cascade(MARKS.resultAt + 8, [22, 20]);
const TOOLS: ToolSpec[] = [
  {
    label: "Creating campaign",
    detail: "Conversions · Meta + Google",
    logos: ["integrations/meta-ads.svg", "integrations/google-ads.webp"],
    start: STARTS[0],
    done: STARTS[0] + 24,
  },
  {
    label: "Creating 2 ad sets",
    detail: "Wellness intent · lookalikes",
    start: STARTS[1],
    done: STARTS[1] + 22,
  },
  {
    label: "Publishing 3 ads",
    detail: "Creatives + copy linked",
    start: STARTS[2],
    done: STARTS[2] + 20,
  },
];

const PANEL_AT = TOOLS[TOOLS.length - 1].done + 10;
const LAUNCH_AT = PANEL_AT + 50;
const LIVE_AT = LAUNCH_AT + 10;

export const LAUNCH_LAUNCH_TOTAL = LIVE_AT + 56;

export const LaunchLaunch: React.FC = () => (
  <ChatScene
    history={
      <>
        <HistoryPrompt />
        <HistoryFormTurn />
        <HistoryWorkTurn tail />
      </>
    }
    answer={ANSWER}
    marks={MARKS}
    bounds={false}
    result={
      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 10 }}>
        <ToolFlow tools={TOOLS} size={22} />
        <CampaignPanel
          appearAt={PANEL_AT}
          clickAt={LAUNCH_AT}
          liveAt={LIVE_AT}
          title="Conversions campaign — Dusk"
          meta="Meta + Google · 2 ad sets · 3 ads · $150/day"
          liveMeta="Live — first impressions within the hour"
          logos={["integrations/meta-ads.svg", "integrations/google-ads.webp"]}
          thumbs={KACHAVA}
        />
      </div>
    }
    overlay={
      <>
        <SceneCursor
          from={{ x: 1640, y: 1150 }}
          moves={[{ target: "campaign.launch", at: LAUNCH_AT, travel: 40 }]}
        />
        <SfxTrack hits={[{ name: "mouse-click", at: LAUNCH_AT }]} />
      </>
    }
    shots={[
      { at: 0, target: "history.tail", zoom: 1.28, align: { y: 0.55 } },
      { at: 12, target: "answer.result", zoom: 1.3, align: { y: 0.4 } },
      { at: PANEL_AT + 2, target: "campaign.ready", zoom: 1.34, snap: true },
    ]}
  />
);
