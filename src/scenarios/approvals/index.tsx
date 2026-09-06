import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import VO from "./vo-durations.json";
import { PromoPlayer } from "../../engine/promo/player";
import { promoDuration, PromoScenario } from "../../engine/promo/scenario";
import { KineticBeats, type KineticBeat } from "../../kit/kinetic-beats";
import { DataScene, DATA_TOTAL } from "./scene-data";
import { ArrivesScene, ARRIVES_TOTAL } from "./scene-arrives";
import { ApproveScene, APPROVE_TOTAL } from "./scene-approve";
import { CampaignScene, CAMPAIGN_TOTAL } from "./scene-campaign";
import { CurveScene, CURVE_TOTAL } from "./scene-curve";

const INK = "#171310";
const CREAM = "#FDFAF3";
const F = (s: number) => Math.ceil(s * 30);

const vo = (name: string) => staticFile(`vo/approvals/${name}.mp3`);

const HOOK_BEATS: KineticBeat[] = [
  {
    at: 0,
    size: 104,
    words: [
      { t: "Nobody", at: 5 },
      { t: "opened", at: 25 },
      { t: "it", at: 44 },
      { t: "in", at: 64 },
      { t: "six", at: 73, hl: true },
      { t: "days.", at: 82, hl: true },
    ],
  },
  {
    at: 108,
    size: 112,
    words: [
      { t: "It's", at: 122 },
      { t: "never", at: 133 },
      { t: "performed", at: 143 },
      { t: "better.", at: 164, hl: true, sparks: true },
    ],
  },
];

const PUNCH_BEATS: KineticBeat[] = [
  {
    at: 0,
    size: 128,
    words: [
      { t: "You", at: 3 },
      { t: "approve.", at: 10, hl: true },
      { t: "Ryze", at: 38 },
      { t: "ships.", at: 50, hl: true },
    ],
  },
];

const TAIL: PromoScenario = {
  id: "approvals-tail",
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

const HOOK_TOTAL = F(VO["01-hook"]) + 16;
const DATA_AT = HOOK_TOTAL;
const APPROVE_AT = DATA_AT + DATA_TOTAL;
const ARRIVES_AT = APPROVE_AT + APPROVE_TOTAL;
const CAMPAIGN_AT = ARRIVES_AT + ARRIVES_TOTAL;
const CURVE_AT = CAMPAIGN_AT + CAMPAIGN_TOTAL;
const PUNCH_AT = CURVE_AT + CURVE_TOTAL;
const PUNCH_TOTAL = F(VO["07-punch"]) + 24;
const TAIL_AT = PUNCH_AT + PUNCH_TOTAL;

export const APPROVALS_TOTAL = TAIL_AT + promoDuration(TAIL);

export const Approvals: React.FC = () => (
  <AbsoluteFill style={{ background: "var(--background)" }}>
    <Sequence durationInFrames={HOOK_TOTAL}>
      <KineticBeats beats={HOOK_BEATS} total={HOOK_TOTAL} sfx={false} />
      <Audio src={vo("01-hook")} />
    </Sequence>
    <Sequence from={DATA_AT} durationInFrames={DATA_TOTAL}>
      <DataScene />
      <Audio src={vo("02-data")} />
    </Sequence>
    <Sequence from={APPROVE_AT} durationInFrames={APPROVE_TOTAL}>
      <ApproveScene />
      <Audio src={vo("04-approve")} />
    </Sequence>
    <Sequence from={ARRIVES_AT} durationInFrames={ARRIVES_TOTAL}>
      <ArrivesScene />
      <Audio src={vo("03-arrives")} />
    </Sequence>
    <Sequence from={CAMPAIGN_AT} durationInFrames={CAMPAIGN_TOTAL}>
      <CampaignScene />
      <Audio src={vo("05-campaign")} />
    </Sequence>
    <Sequence from={CURVE_AT} durationInFrames={CURVE_TOTAL}>
      <CurveScene />
      <Audio src={vo("06-curve")} />
    </Sequence>
    <Sequence from={PUNCH_AT} durationInFrames={PUNCH_TOTAL}>
      <KineticBeats beats={PUNCH_BEATS} total={PUNCH_TOTAL} sfx={false} />
      <Audio src={vo("07-punch")} />
    </Sequence>
    <Sequence from={TAIL_AT}>
      <PromoPlayer scenario={TAIL} />
    </Sequence>
  </AbsoluteFill>
);
