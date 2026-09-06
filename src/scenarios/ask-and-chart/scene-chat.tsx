import React from "react";
import { ChatScene, chatSceneMarks } from "../../kit/chat/chat-scene";
import { ChartResult } from "../../kit/chat/results/chart";
import { SceneCursor } from "../../core/stage";
import type { BarChartSpec } from "../../kit/chat/types";
import { PROMPT } from "./timings";

const ANSWER =
  "Three campaigns burned **$4,180** last week with nothing to show for it. Spark Ads is the worst — $940 for a single sale.";
const MARKS = chatSceneMarks(ANSWER);
const GROW_FROM = MARKS.resultAt + 12;
const TOOLTIP_AT = MARKS.resultAt + 82;

export const ASK_CHAT_TOTAL = MARKS.total;

const CHART: BarChartSpec = {
  kind: "bar",
  max: 2200,
  format: "usd",
  valueLabels: true,
  growFrom: GROW_FROM,
  tooltip: {
    index: 2,
    at: TOOLTIP_AT,
    label: "Spark Ads — ASMR",
    value: "$940 spent · 1 purchase",
  },
  series: [{ key: "spend", label: "Spend" }],
  data: [
    { label: "Retargeting — 90d", spend: 1980 },
    { label: "Candle Gifts — Broad", spend: 1260 },
    { label: "Spark Ads — ASMR", spend: 940 },
  ],
};

export const AskChat: React.FC = () => (
  <ChatScene
    prompt={PROMPT}
    answer={ANSWER}
    marks={MARKS}
    resultZoom={1.2}
    result={
      <ChartResult
        title="Wasted spend by campaign"
        subtitle="Last 7 days · no purchases attributed"
        spec={CHART}
      />
    }
    overlay={
      <SceneCursor
        from={{ x: 1720, y: 1150 }}
        moves={[
          {
            target: "answer.result",
            at: TOOLTIP_AT,
            press: false,
            travel: 34,
            nudge: { x: -10, y: 72 },
          },
        ]}
      />
    }
  />
);
