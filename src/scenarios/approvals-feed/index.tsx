import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import VO from "./vo-durations.json";
import LIB_VO from "../approvals/vo-durations.json";
import { PromoPlayer } from "../../engine/promo/player";
import { promoDuration, PromoScenario } from "../../engine/promo/scenario";
import { KineticBeats, type KineticBeat } from "../../kit/kinetic-beats";
import { DataScene, DATA_TOTAL } from "../approvals/scene-data";
import { ArrivesScene, ARRIVES_TOTAL } from "../approvals/scene-arrives";
import { ApproveScene, APPROVE_TOTAL } from "../approvals/scene-approve";
import { CampaignScene, CAMPAIGN_TOTAL } from "../approvals/scene-campaign";
import { CurveScene, CURVE_TOTAL } from "../approvals/scene-curve";

const INK = "#171310";
const CREAM = "#FDFAF3";
const F = (s: number) => Math.ceil(s * 30);

const vo = (name: string) => staticFile(`vo/approvals-feed/${name}.mp3`);
const voLib = (name: string) => staticFile(`vo/approvals/${name}.mp3`);

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
  id: "approvals-feed-tail",
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

const COLD_TOTAL = Math.max(DATA_TOTAL, F(VO["01-cold"]) + 8);
const APPROVE_AT = COLD_TOTAL;
const ARRIVES_AT = APPROVE_AT + APPROVE_TOTAL;
const CAMPAIGN_AT = ARRIVES_AT + ARRIVES_TOTAL;
const CURVE_AT = CAMPAIGN_AT + CAMPAIGN_TOTAL;
const PUNCH_AT = CURVE_AT + CURVE_TOTAL;
const PUNCH_TOTAL = F(LIB_VO["07-punch"]) + 24;
const TAIL_AT = PUNCH_AT + PUNCH_TOTAL;

export const APPROVALS_FEED_TOTAL = TAIL_AT + promoDuration(TAIL);

export const ApprovalsFeed: React.FC = () => (
  <AbsoluteFill style={{ background: "var(--background)" }}>
    <Sequence durationInFrames={COLD_TOTAL}>
      <DataScene />
      <Audio src={vo("01-cold")} />
    </Sequence>
    <Sequence from={APPROVE_AT} durationInFrames={APPROVE_TOTAL}>
      <ApproveScene />
      <Audio src={voLib("04-approve")} />
    </Sequence>
    <Sequence from={ARRIVES_AT} durationInFrames={ARRIVES_TOTAL}>
      <ArrivesScene />
      <Audio src={voLib("03-arrives")} />
    </Sequence>
    <Sequence from={CAMPAIGN_AT} durationInFrames={CAMPAIGN_TOTAL}>
      <CampaignScene />
      <Audio src={voLib("05-campaign")} />
    </Sequence>
    <Sequence from={CURVE_AT} durationInFrames={CURVE_TOTAL}>
      <CurveScene />
      <Audio src={voLib("06-curve")} />
    </Sequence>
    <Sequence from={PUNCH_AT} durationInFrames={PUNCH_TOTAL}>
      <KineticBeats beats={PUNCH_BEATS} total={PUNCH_TOTAL} sfx={false} />
      <Audio src={voLib("07-punch")} />
    </Sequence>
    <Sequence from={TAIL_AT}>
      <PromoPlayer scenario={TAIL} />
    </Sequence>
  </AbsoluteFill>
);
