import React from "react";
import { useCurrentFrame } from "remotion";
import { useReveal } from "../../core/motion";
import { cascade } from "../../core/schedule";
import { SceneCursor } from "../../core/stage";
import { ChatScene, continuationMarks } from "../../kit/chat/chat-scene";
import { SubmitButton } from "../../kit/ryze-ui/question";
import { WidgetCard } from "../../kit/ryze-ui/widget-card";
import { SfxTrack } from "../../kit/sfx";
import { HistoryFixTurn, HistoryPrompt, LINKS_ANSWER } from "./history";
import { PlacementsGrid } from "./widgets";

const MARKS = continuationMarks(LINKS_ANSWER);
const CARD_AT = MARKS.resultAt;
export const FIND_AT = CARD_AT + 34;
const GRID_AT = FIND_AT + 8;
const ARROWS = [GRID_AT + 34, GRID_AT + 40, GRID_AT + 46] as const;
const CHECKS = cascade(GRID_AT + 50, [5, 5, 4, 4, 4, 3, 3, 3, 2, 2, 2]);

export const LINKS_SCENE_TOTAL = CHECKS[CHECKS.length - 1] + 16;

const ExchangeCard: React.FC = () => {
  const frame = useCurrentFrame();
  const style = useReveal(CARD_AT, 40, 18);
  return (
    <div data-click="links.card" style={{ ...style, width: 860 }}>
      <WidgetCard title="Backlink Exchange" subtitle="Do-follow links from websites in your niche" footer={<SubmitButton submitted={frame >= FIND_AT + 2} label="Find placements" />}>
        <div style={{ fontSize: 15, color: "var(--muted-foreground)", lineHeight: 1.5 }}>12 publications with DR 47–78 write about sleep, habits and health tech. I can place one contextual link on each.</div>
      </WidgetCard>
    </div>
  );
};

export const LinksScene: React.FC = () => (
  <ChatScene
    history={
      <>
        <HistoryPrompt />
        <HistoryFixTurn tail />
      </>
    }
    answer={LINKS_ANSWER}
    marks={MARKS}
    bounds={false}
    result={
      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 12 }}>
        <ExchangeCard />
        <PlacementsGrid at={GRID_AT} popStep={2} arrowsAt={ARROWS} checks={CHECKS} />
      </div>
    }
    overlay={
      <>
        <SceneCursor from={{ x: 1640, y: 1150 }} moves={[{ target: "widget.submit", at: FIND_AT, travel: 40 }]} />
        <SfxTrack hits={[{ name: "mouse-click", at: FIND_AT }]} />
      </>
    }
    shots={[
      { at: 0, target: "history.tail", zoom: 1.26, align: { y: 0.55 } },
      { at: 12, target: "answer.result", zoom: 1.3, align: { y: 0.4 } },
      { at: CARD_AT + 2, target: "links.card", zoom: 1.4, align: { y: 0.5 }, snap: true },
      { at: GRID_AT + 2, target: "links.grid", zoom: 1.4, align: { y: 0.5 }, snap: true },
    ]}
  />
);
