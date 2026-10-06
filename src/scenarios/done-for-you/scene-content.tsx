import React from "react";
import { useReveal } from "../../core/motion";
import { cascade } from "../../core/schedule";
import { ChatScene, continuationMarks } from "../../kit/chat/chat-scene";
import { ArticleResult } from "../../kit/chat/results/article";
import { CONTENT_ANSWER, HistoryFixTurn, HistoryLinksTurn, HistoryPrompt } from "./history";
import { ARTICLE } from "./timings";
import { ArticlePile } from "./widgets";

const MARKS = continuationMarks(CONTENT_ANSWER);
const ARTICLE_AT = MARKS.resultAt;
const PILE = cascade(ARTICLE_AT + 30, [8, 7, 6, 5, 4, 4, 3]);

export const CONTENT_SCENE_TOTAL = PILE[PILE.length - 1] + 24;

const Article: React.FC = () => {
  const style = useReveal(ARTICLE_AT, 40, 18);
  return (
    <div data-click="content.article" style={{ ...style, width: 860 }}>
      <ArticleResult title="Blog" subtitle="Article 1 of 30 · published" heading={ARTICLE.heading} meta={ARTICLE.meta} paragraphs={[...ARTICLE.paragraphs]} />
    </div>
  );
};

export const ContentScene: React.FC = () => (
  <ChatScene
    history={
      <>
        <HistoryPrompt />
        <HistoryFixTurn />
        <HistoryLinksTurn tail />
      </>
    }
    answer={CONTENT_ANSWER}
    marks={MARKS}
    bounds={false}
    result={
      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 12 }}>
        <Article />
        <ArticlePile marks={PILE} />
      </div>
    }
    shots={[
      { at: 0, target: "history.tail", zoom: 1.26, align: { y: 0.55 } },
      { at: 12, target: "answer.result", zoom: 1.3, align: { y: 0.4 } },
      { at: ARTICLE_AT + 2, target: "content.article", zoom: 1.4, align: { y: 0.5 }, snap: true },
      { at: PILE[0] + 2, target: "content.pile", zoom: 1.4, align: { y: 0.5 }, snap: true },
    ]}
  />
);
