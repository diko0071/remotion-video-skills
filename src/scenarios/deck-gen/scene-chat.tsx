import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { SPRINGS, useReveal, useSpringAt } from "../../core/motion";
import { cascade } from "../../core/schedule";
import { useObjectRects } from "../../core/stage";
import { ChatScene, chatSceneMarks } from "../../kit/chat/chat-scene";
import { DeckRunLayer, DeckRunSfx, DeckWallLayer, runMarks } from "./scene-run";
import { ToolFlow, type ToolSpec } from "../../kit/tool-flow";
import { PROMPT, SLIDE_H, SLIDE_W, STAGE_SLIDE } from "./timings";

const ANSWER = "On it — pulling your numbers and designing the deck —";
const MARKS = chatSceneMarks(ANSWER, { resultHold: 2600 });

const TOOL_LABELS: [string, string][] = [
  ["Reading revenue & channels", "GA4 · 90 days · $1.42M traced"],
  ["Pulling search performance", "GSC · decay + striking distance"],
  ["Designing the deck", "10 slides · editorial theme"],
];

const STARTS = cascade(14, [24, 22]);
const TOOLS: ToolSpec[] = TOOL_LABELS.map(([label, detail], i) => ({
  label,
  detail,
  start: STARTS[i],
  done: STARTS[i] + 26 - i * 2,
}));

const LAST_DONE = TOOLS[TOOLS.length - 1].done;
const PREVIEW_AT = MARKS.resultAt + LAST_DONE + 2;
const EXPAND_AT = PREVIEW_AT + 34;

const COVER = "deck-gen/slides/quarterly-review-00.png";

const RUN_VIS = EXPAND_AT + 44;
const RUN_FROM = EXPAND_AT + 52;
export const DECK_CHAT_TOTAL = runMarks(RUN_FROM).total;

const PREVIEW_W = 560;
const PREVIEW_SCALE = PREVIEW_W / SLIDE_W;

const DeckPreview: React.FC = () => {
  const frame = useCurrentFrame();
  const style = useReveal(PREVIEW_AT, 150, 24);
  const hide = frame >= EXPAND_AT;
  if (frame < PREVIEW_AT - 2) return null;
  return (
    <div
      data-click="chat.preview"
      style={{
        ...style,
        width: PREVIEW_W,
        height: SLIDE_H * PREVIEW_SCALE,
        opacity: hide ? 0 : (style.opacity as number),
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: "0 1px 2px rgba(23,19,16,0.12)",
      }}
    >
      <Img src={staticFile(COVER)} style={{ width: "100%", display: "block" }} />
    </div>
  );
};

const DeckExpander: React.FC = () => {
  const frame = useCurrentFrame();
  const rects = useObjectRects(["chat.preview"]);
  const p = useSpringAt(EXPAND_AT, SPRINGS.card, 44);
  const bg = interpolate(frame, [EXPAND_AT, EXPAND_AT + 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  if (frame < EXPAND_AT) return null;
  if (frame >= RUN_VIS) {
    return (
      <>
        <AbsoluteFill style={{ background: "var(--background)" }} />
        <DeckRunLayer from={RUN_FROM} />
        <DeckWallLayer from={RUN_FROM} />
        <DeckRunSfx from={RUN_FROM} />
      </>
    );
  }
  const from = rects["chat.preview"] ?? {
    x: STAGE_SLIDE.x,
    y: STAGE_SLIDE.y,
    width: PREVIEW_W,
    height: SLIDE_H * PREVIEW_SCALE,
  };
  const x = interpolate(p, [0, 1], [from.x, STAGE_SLIDE.x]);
  const y = interpolate(p, [0, 1], [from.y, STAGE_SLIDE.y]);
  const w = interpolate(p, [0, 1], [from.width, STAGE_SLIDE.w]);
  return (
    <>
      <AbsoluteFill style={{ background: "var(--background)", opacity: bg }} />
      <div
        style={{
          position: "absolute",
          left: x,
          top: y,
          width: w,
          height: (w / SLIDE_W) * SLIDE_H,
          borderRadius: 14,
          overflow: "hidden",
          boxShadow: "0 18px 60px rgba(23,19,16,0.18)",
        }}
      >
        <Img src={staticFile(COVER)} style={{ width: "100%", display: "block" }} />
      </div>
    </>
  );
};

const DeckResult: React.FC = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 14 }}>
    <ToolFlow
      tools={TOOLS.map((t) => ({
        ...t,
        start: t.start + MARKS.resultAt,
        done: t.done + MARKS.resultAt,
      }))}
      size={22}
    />
    <DeckPreview />
  </div>
);

export const DeckChat: React.FC = () => (
  <ChatScene
    prompt={PROMPT}
    answer={ANSWER}
    marks={MARKS}
    result={<DeckResult />}
    overlay={<DeckExpander />}
    shots={[
      { at: 0, target: "msg.user", zoom: 1.25, align: { y: 0.45 } },
      { at: MARKS.streamFrom - 6, target: "msg.user", zoom: 1.25, align: { y: 0.28 } },
      { at: MARKS.resultAt + 4, target: "answer.result", zoom: 1.28, align: { y: 0.42 } },
      { at: PREVIEW_AT, target: "chat.preview", zoom: 1.3, snap: true },
      { at: EXPAND_AT, zoom: 1.0, snap: true },
    ]}
  />
);
