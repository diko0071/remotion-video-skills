import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { PromoPlayer } from "../../engine/promo/player";
import { promoDuration, PromoScenario } from "../../engine/promo/scenario";
import { KineticLine } from "../../kit/kinetic-text";
import { AdsChat, ADS_CHAT_TOTAL } from "./scene-chat";
import { AdsInput, ADS_INPUT_TOTAL } from "./scene-input";

const INK = "#171310";
const CREAM = "#FDFAF3";

const LaunchHook: React.FC = () => (
  <KineticLine
    at={4}
    span={22}
    size={92}
    parts={[
      { word: "Launch" },
      { word: "ads" },
      { word: "in" },
      { image: "ai/chatgpt.png", tilt: -4 },
      { word: "with" },
      { word: "Ryze AI" },
    ]}
  />
);

const FirstHook: React.FC = () => (
  <KineticLine
    at={4}
    span={26}
    size={92}
    parts={[
      { word: "The" },
      { word: "first" },
      { word: "AI" },
      { word: "ad" },
      { word: "manager" },
      { word: "for" },
      { image: "ai/chatgpt.png", tilt: 4 },
      { word: "ChatGPT" },
    ]}
  />
);

const HOOK: PromoScenario = {
  id: "ads-chatgpt-hook",
  format: "wide",
  background: CREAM,
  ink: INK,
  transition: "cut",
  scenes: [{ kind: "custom", render: LaunchHook, duration: 52 }],
};

const TAIL: PromoScenario = {
  id: "ads-chatgpt-tail",
  format: "wide",
  background: CREAM,
  ink: INK,
  transition: "cut",
  scenes: [
    { kind: "custom", render: FirstHook, duration: 62 },
    {
      kind: "lockup",
      background: CREAM,
      mark: "ryze-sun.png",
      word: "Ryze AI",
      tagline: "Put your marketing on autopilot at ryze.ai",
    },
  ],
};

const HOOK_TOTAL = promoDuration(HOOK);
const INPUT_AT = HOOK_TOTAL;
const CHAT_AT = INPUT_AT + ADS_INPUT_TOTAL;
const TAIL_AT = CHAT_AT + ADS_CHAT_TOTAL;

export const ADS_CHATGPT_TOTAL = TAIL_AT + promoDuration(TAIL);

export const AdsChatgpt: React.FC = () => (
  <AbsoluteFill style={{ background: "var(--background)" }}>
    <Sequence durationInFrames={HOOK_TOTAL}>
      <PromoPlayer scenario={HOOK} />
    </Sequence>
    <Sequence from={INPUT_AT} durationInFrames={ADS_INPUT_TOTAL}>
      <AdsInput />
    </Sequence>
    <Sequence from={CHAT_AT} durationInFrames={ADS_CHAT_TOTAL}>
      <AdsChat />
    </Sequence>
    <Sequence from={TAIL_AT}>
      <PromoPlayer scenario={TAIL} />
    </Sequence>
  </AbsoluteFill>
);
