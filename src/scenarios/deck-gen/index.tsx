import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { PromoPlayer } from "../../engine/promo/player";
import { promoDuration, PromoScenario } from "../../engine/promo/scenario";
import { KineticBeats, type KineticBeat } from "../../kit/kinetic-beats";
import { DeckChat, DECK_CHAT_TOTAL } from "./scene-chat";
import { DeckInput, DECK_INPUT_TOTAL } from "./scene-input";
import { DeckScheduleForm, DECK_FORM_TOTAL } from "./scene-schedule";
import { DeckTemplate, DECK_TEMPLATE_TOTAL } from "./scene-template";

const INK = "#171310";
const CREAM = "#FDFAF3";

const HOOK_BEATS: KineticBeat[] = [
  {
    at: 0,
    size: 104,
    words: [
      { t: "Client", at: 6 },
      { t: "decks", at: 12, hl: true },
      { t: "take", at: 24 },
      { t: "days.", at: 30 },
    ],
  },
  {
    at: 52,
    size: 104,
    words: [
      { t: "Yours", at: 58 },
      { t: "takes", at: 64 },
      { t: "one", at: 70, hl: true, sparks: true },
      { t: "prompt.", at: 76, hl: true },
    ],
  },
];
const HOOK_TOTAL = 104;

const PUNCH_BEATS: KineticBeat[] = [
  {
    at: 0,
    size: 116,
    words: [
      { t: "Proposals.", at: 4, hl: true },
      { t: "Audits.", at: 14, hl: true },
      { t: "Reviews.", at: 26, hl: true },
    ],
  },
];
const PUNCH_TOTAL = 58;

const HOOK2_BEATS: KineticBeat[] = [
  {
    at: 0,
    size: 108,
    words: [
      { t: "Same", at: 4 },
      { t: "deck.", at: 10, hl: true },
      { t: "Every", at: 22 },
      { t: "Monday.", at: 28, hl: true, sparks: true },
    ],
  },
];
const HOOK2_TOTAL = 62;

const PUNCH2_BEATS: KineticBeat[] = [
  {
    at: 0,
    size: 116,
    words: [
      { t: "You", at: 4 },
      { t: "ask", at: 10 },
      { t: "once.", at: 16, hl: true, sparks: true },
    ],
  },
];
const PUNCH2_TOTAL = 52;

const TAIL: PromoScenario = {
  id: "deck-gen-tail",
  format: "wide",
  background: CREAM,
  ink: INK,
  transition: "cut",
  scenes: [
    {
      kind: "lockup",
      background: CREAM,
      mark: "ryze-sun.png",
      word: "Ryze AI",
      tagline: "Put your marketing on autopilot at ryze.ai",
    },
  ],
};

const INPUT_AT = HOOK_TOTAL;
const CHAT_AT = INPUT_AT + DECK_INPUT_TOTAL;
const PUNCH_AT = CHAT_AT + DECK_CHAT_TOTAL;
const HOOK2_AT = PUNCH_AT + PUNCH_TOTAL;
const TEMPLATE_AT = HOOK2_AT + HOOK2_TOTAL;
const SCHEDULE_AT = TEMPLATE_AT + DECK_TEMPLATE_TOTAL;
const PUNCH2_AT = SCHEDULE_AT + DECK_FORM_TOTAL;
const TAIL_AT = PUNCH2_AT + PUNCH2_TOTAL;

export const DECK_GEN_TOTAL = TAIL_AT + promoDuration(TAIL);

export const DeckGen: React.FC = () => (
  <AbsoluteFill style={{ background: "var(--background)" }}>
    <Sequence durationInFrames={HOOK_TOTAL}>
      <KineticBeats beats={HOOK_BEATS} total={HOOK_TOTAL} sfx={false} />
    </Sequence>
    <Sequence from={INPUT_AT} durationInFrames={DECK_INPUT_TOTAL}>
      <DeckInput />
    </Sequence>
    <Sequence from={CHAT_AT} durationInFrames={DECK_CHAT_TOTAL}>
      <DeckChat />
    </Sequence>
    <Sequence from={PUNCH_AT} durationInFrames={PUNCH_TOTAL}>
      <KineticBeats beats={PUNCH_BEATS} total={PUNCH_TOTAL} sfx={false} />
    </Sequence>
    <Sequence from={HOOK2_AT} durationInFrames={HOOK2_TOTAL}>
      <KineticBeats beats={HOOK2_BEATS} total={HOOK2_TOTAL} sfx={false} />
    </Sequence>
    <Sequence from={TEMPLATE_AT} durationInFrames={DECK_TEMPLATE_TOTAL}>
      <DeckTemplate />
    </Sequence>
    <Sequence from={SCHEDULE_AT} durationInFrames={DECK_FORM_TOTAL}>
      <DeckScheduleForm />
    </Sequence>
    <Sequence from={PUNCH2_AT} durationInFrames={PUNCH2_TOTAL}>
      <KineticBeats beats={PUNCH2_BEATS} total={PUNCH2_TOTAL} sfx={false} />
    </Sequence>
    <Sequence from={TAIL_AT}>
      <PromoPlayer scenario={TAIL} />
    </Sequence>
  </AbsoluteFill>
);
