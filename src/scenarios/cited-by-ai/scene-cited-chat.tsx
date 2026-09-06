import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { SPRINGS, useReveal, useSpringAt } from "../../core/motion";
import { cascade } from "../../core/schedule";
import { useObjectRects } from "../../core/stage";
import { ChatScene, chatSceneMarks } from "../../kit/chat/chat-scene";
import { CAL_FILL_SPAN, CAL_W, CalendarWidget } from "./calendar-widget";
import { PILLS } from "./scene-build";

const ANSWER =
  "On it. Writing your **PR and articles** now — and putting a month on the calendar.";
const MARKS = chatSceneMarks(ANSWER, { resultHold: 640 });

const ARTICLES: { kind: string; title: string }[] = [
  { kind: "PR Article", title: "Dusk raises the bar on sleep tracking" },
  { kind: "Blog post", title: "Sleep score vs sleep debt: which to trust" },
  { kind: "Blog post", title: "Best sleep trackers of the year" },
  { kind: "Backlink pitch", title: "Sleep app roundup — feature request" },
];

const ARTICLE_MARKS = cascade(MARKS.resultAt + 10, [16, 14, 12]);
const PREVIEW_AT = ARTICLE_MARKS[3] + 34;
const EXPAND_AT = PREVIEW_AT + 16;
const FILL_FROM = EXPAND_AT + 30;

export const CITED_CHAT_TOTAL = FILL_FROM + CAL_FILL_SPAN + 46;
export const CITED_EXPAND_AT = EXPAND_AT;

const PREVIEW_W = 640;
const PREVIEW_SCALE = PREVIEW_W / CAL_W;
const CAL_H = 640;
const FULL = { x: (1920 - CAL_W) / 2, y: 60 };

const ChipPill: React.FC<{ index: number }> = ({ index }) => {
  const { label, Icon } = PILLS[index];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        background: "#FFFFFF",
        border: "1px solid rgba(23,19,16,0.08)",
        borderRadius: 10,
        boxShadow: "0 4px 14px rgba(74,53,29,0.10)",
        padding: "8px 14px",
        fontSize: 17,
        fontWeight: 700,
        color: "#171310",
        fontFamily: "'Plus Jakarta Sans'",
      }}
    >
      <span
        style={{
          width: 26,
          height: 26,
          borderRadius: 7,
          background: "#F6EEDF",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ transform: "scale(0.62)", display: "inline-flex" }}>
          <Icon />
        </span>
      </span>
      {label}
    </span>
  );
};

const ArticleCard: React.FC<{ index: number }> = ({ index }) => {
  const { kind, title } = ARTICLES[index];
  const style = useReveal(ARTICLE_MARKS[index], 16, 18);
  return (
    <div
      style={{
        ...style,
        background: "#FFFFFF",
        border: "1px solid rgba(23,19,16,0.07)",
        borderRadius: 12,
        boxShadow: "0 8px 24px rgba(74,53,29,0.10)",
        padding: "16px 20px",
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <span
        style={{
          alignSelf: "flex-start",
          fontSize: 13,
          fontWeight: 800,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          color: "#8A6A3F",
          background: "#F6EEDF",
          borderRadius: 6,
          padding: "3px 8px",
        }}
      >
        {kind}
      </span>
      <span style={{ fontSize: 21, fontWeight: 700, color: "#171310" }}>{title}</span>
      <span style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <span style={{ height: 8, width: "92%", borderRadius: 4, background: "rgba(23,19,16,0.07)" }} />
        <span style={{ height: 8, width: "78%", borderRadius: 4, background: "rgba(23,19,16,0.07)" }} />
      </span>
    </div>
  );
};

const CalendarPreview: React.FC = () => {
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
        height: CAL_H * PREVIEW_SCALE,
        overflow: "hidden",
        borderRadius: 10,
        opacity: hide ? 0 : (style.opacity as number),
      }}
    >
      <div style={{ transform: `scale(${PREVIEW_SCALE})`, transformOrigin: "top left" }}>
        <CalendarWidget />
      </div>
    </div>
  );
};

const CalendarExpander: React.FC = () => {
  const frame = useCurrentFrame();
  const rects = useObjectRects(["chat.preview"]);
  const p = useSpringAt(EXPAND_AT, SPRINGS.panel, 30);
  const bg = interpolate(frame, [EXPAND_AT, EXPAND_AT + 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  if (frame < EXPAND_AT) return null;
  const from = rects["chat.preview"] ?? {
    x: FULL.x,
    y: FULL.y,
    width: PREVIEW_W,
    height: CAL_H * PREVIEW_SCALE,
  };
  const x = interpolate(p, [0, 1], [from.x, FULL.x]);
  const y = interpolate(p, [0, 1], [from.y, FULL.y]);
  const w = interpolate(p, [0, 1], [from.width, CAL_W]);
  return (
    <>
      <AbsoluteFill style={{ background: "var(--background)", opacity: bg }} />
      <div style={{ position: "absolute", left: x, top: y, width: w }}>
        <div style={{ transform: `scale(${w / CAL_W})`, transformOrigin: "top left" }}>
          <CalendarWidget fillFrom={FILL_FROM} />
        </div>
      </div>
    </>
  );
};

const CitedResult: React.FC = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 14 }}>
    {ARTICLES.map((_, i) => (
      <ArticleCard key={i} index={i} />
    ))}
    <CalendarPreview />
  </div>
);

export const CitedChat: React.FC = () => (
  <ChatScene
    prompt="Get my brand cited by AI."
    answer={ANSWER}
    marks={MARKS}
    drift={0}
    attachmentsNode={PILLS.map((_, i) => (
      <ChipPill key={i} index={i} />
    ))}
    result={<CitedResult />}
    overlay={<CalendarExpander />}
    shots={[
      { at: 0, zoom: 1.12 },
      { at: MARKS.resultAt + 4, target: "answer.result", zoom: 1.18, align: { y: 0.42 } },
      { at: PREVIEW_AT, target: "chat.preview", zoom: 1.2, snap: true, axis: "y" },
      { at: EXPAND_AT - 4, zoom: 1.0 },
    ]}
  />
);
