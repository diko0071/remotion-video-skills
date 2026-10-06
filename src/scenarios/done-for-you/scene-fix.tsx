import React from "react";
import { cascade } from "../../core/schedule";
import { ChatScene, chatSceneMarks } from "../../kit/chat/chat-scene";
import { ToolFlow, type ToolSpec } from "../../kit/tool-flow";
import { ATTACHMENT, FIX_ANSWER } from "./history";
import { FIX_LABELS, PROMPT } from "./timings";
import { FixPreview } from "./widgets";

const MARKS = chatSceneMarks(FIX_ANSWER, { resultHold: 600 });

const STARTS = cascade(8, [12, 10, 9, 8]);
const TOOLS: ToolSpec[] = FIX_LABELS.map(([label, detail, logo], i) => ({
  label,
  detail,
  logos: [logo],
  start: MARKS.resultAt + STARTS[i],
  done: MARKS.resultAt + STARTS[i] + 18 - i * 2,
}));

const LAST_DONE = TOOLS[TOOLS.length - 1].done;
const PREVIEW_AT = LAST_DONE + 4;
const WIPE: readonly [number, number] = [PREVIEW_AT + 12, PREVIEW_AT + 36];
const RING: readonly [number, number] = [PREVIEW_AT + 14, PREVIEW_AT + 42];

export const FIX_SCENE_TOTAL = RING[1] + 12;

export const FixScene: React.FC = () => (
  <ChatScene
    prompt={PROMPT}
    attachments={[...ATTACHMENT.files]}
    attachmentSize={ATTACHMENT.size}
    answer={FIX_ANSWER}
    marks={MARKS}
    bounds={false}
    result={
      <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 14 }}>
        <ToolFlow tools={TOOLS} size={22} />
        <div data-click="fix.preview">
          <FixPreview at={PREVIEW_AT} wipe={WIPE} ring={RING} from={23} to={71} />
        </div>
      </div>
    }
    shots={[
      { at: 0, target: "msg.user", zoom: 1.25, align: { y: 0.4 } },
      { at: MARKS.streamFrom - 6, target: "msg.user", zoom: 1.25, align: { y: 0.26 } },
      { at: MARKS.resultAt + 4, target: "answer.result", zoom: 1.28, align: { y: 0.4 } },
      { at: PREVIEW_AT + 2, target: "fix.preview", zoom: 1.32, align: { y: 0.5 }, snap: true },
    ]}
  />
);
