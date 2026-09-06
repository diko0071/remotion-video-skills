import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { PromoPlayer } from "../../engine/promo/player";
import { promoDuration, PromoScenario } from "../../engine/promo/scenario";
import { CreativesChat, CREATIVES_CHAT_TOTAL } from "./scene-chat";
import { CreativesInput, CREATIVES_INPUT_TOTAL } from "./scene-input";

const INK = "#171310";
const CREAM = "#F2F0EB";

const TAIL: PromoScenario = {
  id: "ask-creatives-tail",
  format: "wide",
  background: CREAM,
  ink: INK,
  transition: "cut",
  caption: "Ryze turns your winners into new creatives.",
  scenes: [
    {
      kind: "statement",
      background: INK,
      left: "your best ads\nbecome",
      image: "apps/wispr-flow_top-s1-23d.jpg",
      right: "the brief",
    },
    {
      kind: "statement",
      background: CREAM,
      ink: INK,
      left: "new creatives\nin your",
      image: "dusk/dusk-sq-1.png",
      right: "brand style",
    },
    {
      kind: "statement",
      background: INK,
      left: "ready before\nthe",
      image: "dusk/dusk-sq-3.png",
      right: "launch",
    },
    {
      kind: "lockup",
      mark: "ryze-sun.png",
      word: "Ryze AI",
      tagline: "Put your marketing on autopilot at ryze.ai",
    },
  ],
};

const CHAT_AT = CREATIVES_INPUT_TOTAL;
const TAIL_AT = CHAT_AT + CREATIVES_CHAT_TOTAL;

export const ASK_CREATIVES_TOTAL = TAIL_AT + promoDuration(TAIL);

export const AskCreatives: React.FC = () => (
  <AbsoluteFill style={{ background: "var(--background)" }}>
    <Sequence durationInFrames={CREATIVES_INPUT_TOTAL}>
      <CreativesInput />
    </Sequence>
    <Sequence from={CHAT_AT} durationInFrames={CREATIVES_CHAT_TOTAL}>
      <CreativesChat />
    </Sequence>
    <Sequence from={TAIL_AT}>
      <PromoPlayer scenario={TAIL} />
    </Sequence>
  </AbsoluteFill>
);
