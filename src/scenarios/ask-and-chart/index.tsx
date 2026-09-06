import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { PromoPlayer } from "../../engine/promo/player";
import { promoDuration, PromoScenario } from "../../engine/promo/scenario";
import { AskChat, ASK_CHAT_TOTAL } from "./scene-chat";
import { AskOpen, ASK_OPEN_TOTAL } from "./scene-open";

const INK = "#171310";
const CREAM = "#F2F0EB";

const TAIL: PromoScenario = {
  id: "ask-and-chart-tail",
  format: "wide",
  background: CREAM,
  ink: INK,
  transition: "cut",
  caption: "Ryze checks every campaign, every morning.",
  scenes: [
    {
      kind: "statement",
      background: INK,
      left: "you asked\none",
      image: "product-1.jpg",
      right: "question",
    },
    {
      kind: "statement",
      background: CREAM,
      ink: INK,
      left: "the agent found\nthe wasted",
      image: "product-2.jpg",
      right: "spend",
    },
    {
      kind: "statement",
      background: INK,
      left: "before your\nfirst",
      image: "product-3.jpg",
      right: "coffee",
    },
    {
      kind: "lockup",
      mark: "ryze-sun.png",
      word: "Ryze AI",
      tagline: "Put your marketing on autopilot at ryze.ai",
    },
  ],
};

const TAIL_AT = ASK_OPEN_TOTAL + ASK_CHAT_TOTAL;

export const ASK_AND_CHART_TOTAL = TAIL_AT + promoDuration(TAIL);

export const AskAndChart: React.FC = () => (
  <AbsoluteFill style={{ background: "var(--background)" }}>
    <Sequence durationInFrames={ASK_OPEN_TOTAL}>
      <AskOpen />
    </Sequence>
    <Sequence from={ASK_OPEN_TOTAL} durationInFrames={ASK_CHAT_TOTAL}>
      <AskChat />
    </Sequence>
    <Sequence from={TAIL_AT}>
      <PromoPlayer scenario={TAIL} />
    </Sequence>
  </AbsoluteFill>
);
