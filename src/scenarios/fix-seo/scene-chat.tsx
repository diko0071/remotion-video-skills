import React from "react";
import { useCurrentFrame } from "remotion";
import { useReveal } from "../../core/motion";
import { cascade } from "../../core/schedule";
import { ChatScene, chatSceneMarks } from "../../kit/chat/chat-scene";
import { ExpandToStage } from "../../kit/expand-to-stage";
import { ToolFlow, type ToolSpec } from "../../kit/tool-flow";
import { ScoreCard } from "../../kit/score-card";
import { SiteCard } from "./site-card";
import { PROMPT, SCAN_SITE, SCORE_COL } from "./timings";

const ANSWER =
  "Found **23 issues** across your site. Fixing all of them now —";
const MARKS = chatSceneMarks(ANSWER, { resultHold: 600 });

const FIX_LABELS: [string, string][] = [
  ["Rewriting meta titles", "18 pages · target keywords added"],
  ["Fixing broken links", "6 dead links redirected"],
  ["Adding schema markup", "Product + Organization JSON-LD"],
  ["Compressing images", "31 images · 4.2 MB saved"],
  ["Fixing duplicate content", "3 canonical tags set"],
  ["Restoring missing alt text", "24 images described"],
  ["Rebuilding the storefront", "New design · mobile-first"],
];

const STARTS = cascade(14, [22, 20, 18, 16, 14, 12]);
const TOOLS: ToolSpec[] = FIX_LABELS.map(([label, detail], i) => ({
  label,
  detail,
  start: STARTS[i],
  done: STARTS[i] + 26 - i * 2,
}));

const LAST_DONE = TOOLS[TOOLS.length - 1].done;
const PREVIEW_AT = MARKS.resultAt + LAST_DONE + 2;
const EXPAND_AT = PREVIEW_AT + 36;
const SCORES_AT = [EXPAND_AT + 34, EXPAND_AT + 42, EXPAND_AT + 50];

export const FIX_SEO_CHAT_TOTAL = EXPAND_AT + 150;

const PREVIEW_W = 620;
const PREVIEW_SCALE = PREVIEW_W / SCAN_SITE.w;

const SitePreview: React.FC = () => {
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
        height: SCAN_SITE.h * PREVIEW_SCALE,
        opacity: hide ? 0 : (style.opacity as number),
      }}
    >
      <div style={{ transform: `scale(${PREVIEW_SCALE})`, transformOrigin: "top left" }}>
        <SiteCard />
      </div>
    </div>
  );
};

const GREEN: { label: string; value: number; color: string }[] = [
  { label: "SEO score", value: 92, color: "#059669" },
  { label: "GEO score", value: 88, color: "#059669" },
  { label: "Site health", value: 96, color: "#059669" },
];

const PreviewExpander: React.FC = () => (
  <ExpandToStage fromId="chat.preview" to={{ x: SCAN_SITE.x, y: SCAN_SITE.y, w: SCAN_SITE.w, h: SCAN_SITE.h }} at={EXPAND_AT} render={() => <SiteCard />}>
    <div
      style={{
        position: "absolute",
        left: SCORE_COL.x,
        top: SCORE_COL.y,
        width: SCORE_COL.w,
        display: "flex",
        flexDirection: "column",
        gap: SCORE_COL.gap,
      }}
    >
      {GREEN.map((s, i) => (
        <ScoreCard key={s.label} {...s} at={SCORES_AT[i]} />
      ))}
    </div>
  </ExpandToStage>
);

const FixResult: React.FC = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 14 }}>
    <div style={{ height: 470, overflow: "hidden" }}>
      <ToolFlow
        tools={TOOLS.map((t) => ({
          ...t,
          start: t.start + MARKS.resultAt,
          done: t.done + MARKS.resultAt,
        }))}
        size={22}
      />
    </div>
    <SitePreview />
  </div>
);

export const FixSeoChat: React.FC = () => (
  <ChatScene
    prompt={PROMPT}
    answer={ANSWER}
    marks={MARKS}
    attachments={["fix-seo-2/before.png"]}
    attachmentSize={132}
    result={<FixResult />}
    overlay={<PreviewExpander />}
    shots={[
      { at: 0, target: "msg.user", zoom: 1.25, align: { y: 0.45 } },
      { at: MARKS.streamFrom - 6, target: "msg.user", zoom: 1.25, align: { y: 0.28 } },
      { at: MARKS.resultAt + 4, target: "answer.result", zoom: 1.28, align: { y: 0.42 } },
      { at: PREVIEW_AT, target: "chat.preview", zoom: 1.3, snap: true },
      { at: EXPAND_AT + 4, zoom: 1.0 },
    ]}
  />
);
