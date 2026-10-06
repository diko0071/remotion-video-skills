import React from "react";
import { useCurrentFrame } from "remotion";
import { useReveal } from "../../core/motion";
import { ChatScene, continuationMarks } from "../../kit/chat/chat-scene";
import { ExpandToStage } from "../../kit/expand-to-stage";
import { ScoreCard } from "../../kit/score-card";
import { FINAL_ANSWER, HistoryContentTurn, HistoryFixTurn, HistoryLinksTurn, HistoryPrompt } from "./history";
import { SiteCard } from "./site-card";
import { SCAN_SITE, SCORE_COL, SCORES_AFTER, SITE } from "./timings";

const MARKS = continuationMarks(FINAL_ANSWER);
const PREVIEW_AT = MARKS.resultAt;
const EXPAND_AT = PREVIEW_AT + 26;
const SCORES_AT = [EXPAND_AT + 28, EXPAND_AT + 36, EXPAND_AT + 44] as const;

export const FINAL_SCENE_TOTAL = SCORES_AT[2] + 50;

const PREVIEW_W = 620;
const PREVIEW_SCALE = PREVIEW_W / SCAN_SITE.w;

const SitePreview: React.FC = () => {
  const frame = useCurrentFrame();
  const style = useReveal(PREVIEW_AT, 150, 24);
  const hide = frame >= EXPAND_AT;
  if (frame < PREVIEW_AT - 2) return null;
  return (
    <div data-click="chat.preview" style={{ ...style, width: PREVIEW_W, height: SCAN_SITE.h * PREVIEW_SCALE, opacity: hide ? 0 : (style.opacity as number) }}>
      <div style={{ transform: `scale(${PREVIEW_SCALE})`, transformOrigin: "top left" }}>
        <SiteCard image={SITE.after} />
      </div>
    </div>
  );
};

const Expander: React.FC = () => (
  <ExpandToStage fromId="chat.preview" to={{ x: SCAN_SITE.x, y: SCAN_SITE.y, w: SCAN_SITE.w, h: SCAN_SITE.h }} at={EXPAND_AT} render={() => <SiteCard image={SITE.after} />}>
    <div style={{ position: "absolute", left: SCORE_COL.x, top: SCORE_COL.y, width: SCORE_COL.w, display: "flex", flexDirection: "column", gap: SCORE_COL.gap }}>
      {SCORES_AFTER.map((s, i) => (
        <ScoreCard key={s.label} label={s.label} value={s.value} color={s.color} at={SCORES_AT[i]} />
      ))}
    </div>
  </ExpandToStage>
);

export const FinalScene: React.FC = () => (
  <ChatScene
    history={
      <>
        <HistoryPrompt />
        <HistoryFixTurn />
        <HistoryLinksTurn />
        <HistoryContentTurn tail />
      </>
    }
    answer={FINAL_ANSWER}
    marks={MARKS}
    bounds={false}
    result={
      <div style={{ marginTop: 12 }}>
        <SitePreview />
      </div>
    }
    overlay={<Expander />}
    shots={[
      { at: 0, target: "history.tail", zoom: 1.26, align: { y: 0.55 } },
      { at: 12, target: "answer.result", zoom: 1.3, align: { y: 0.4 } },
      { at: PREVIEW_AT + 2, target: "chat.preview", zoom: 1.3, snap: true },
      { at: EXPAND_AT + 4, zoom: 1.0 },
    ]}
  />
);
