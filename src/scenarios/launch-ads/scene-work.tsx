import React from "react";
import { useCurrentFrame } from "remotion";
import { useReveal } from "../../core/motion";
import { cascade } from "../../core/schedule";
import { ChatScene, continuationMarks } from "../../kit/chat/chat-scene";
import { CreativeGridResult } from "../../kit/chat/results/creatives";
import { ToolFlow, type ToolSpec } from "../../kit/tool-flow";
import { HistoryFormTurn, HistoryPrompt, WORK_ITEMS } from "./history";

const ANSWER = "Building everything for **Dusk** —";
const MARKS = continuationMarks(ANSWER);

const LABELS: [string, string][] = [
  ["Reading your store", "Bestsellers · palette · voice"],
  ["Generating creatives", "3 ads in your brand style"],
  ["Writing ad copy", "Headlines + CTAs · conversion intent"],
];

const STARTS = cascade(14, [24, 22]);
const TOOLS: ToolSpec[] = LABELS.map(([label, detail], i) => ({
  label,
  detail,
  start: STARTS[i],
  done: STARTS[i] + 26 - i * 2,
}));

const GRID_AT = MARKS.resultAt + TOOLS[TOOLS.length - 1].done + 12;

export const LAUNCH_WORK_TOTAL = GRID_AT + 52;

const WorkResult: React.FC = () => {
  const frame = useCurrentFrame();
  const gridIn = useReveal(GRID_AT, 60, 24);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 10 }}>
      <ToolFlow
        tools={TOOLS.map((t) => ({
          ...t,
          start: t.start + MARKS.resultAt,
          done: t.done + MARKS.resultAt,
        }))}
        size={22}
      />
      {frame >= GRID_AT - 2 ? (
        <div style={{ ...gridIn, width: 860 }} data-click="answer.grid">
          <CreativeGridResult
            title="New creatives — Dusk"
            subtitle="Generated in your brand style"
            items={WORK_ITEMS}
          />
        </div>
      ) : null}
    </div>
  );
};

export const LaunchWork: React.FC = () => (
  <ChatScene
    history={
      <>
        <HistoryPrompt />
        <HistoryFormTurn tail />
      </>
    }
    answer={ANSWER}
    marks={MARKS}
    result={<WorkResult />}
    bounds={false}
    shots={[
      { at: 0, target: "history.tail", zoom: 1.26, align: { y: 0.5 } },
      { at: 12, target: "answer.result", zoom: 1.3, align: { y: 0.4 } },
      { at: GRID_AT + 2, target: "answer.grid", zoom: 1.32, snap: true },
    ]}
  />
);
