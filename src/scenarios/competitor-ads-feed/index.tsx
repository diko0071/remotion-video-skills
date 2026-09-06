import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import VO from "./vo-durations.json";
import LIB_VO from "../competitor-ads/vo-durations.json";
import { PromoPlayer } from "../../engine/promo/player";
import { promoDuration, PromoScenario } from "../../engine/promo/scenario";
import { KineticBeats, type KineticBeat } from "../../kit/kinetic-beats";
import { NOTIFY_TOTAL } from "../competitor-ads/scene-notify";
import { WallNotifyStage } from "../competitor-ads/scene-wall";
import { LibraryScene, LIBRARY_TOTAL } from "../competitor-ads/scene-library";
import { CopyInput, CopyChat, COPY_INPUT_TOTAL, COPY_CHAT_TOTAL } from "../competitor-ads/scene-copy";

const INK = "#171310";
const CREAM = "#FDFAF3";
const F = (s: number) => Math.ceil(s * 30);

const vo = (name: string) => staticFile(`vo/competitor-ads-feed/${name}.mp3`);
const voLib = (name: string) => staticFile(`vo/competitor-ads/${name}.mp3`);

const PUNCH_BEATS: KineticBeat[] = [
  {
    at: 0,
    size: 116,
    words: [
      { t: "Their", at: 4 },
      { t: "best", at: 10, hl: true },
      { t: "ads", at: 21, hl: true },
      { t: "are", at: 42 },
      { t: "your", at: 47 },
      { t: "starting", at: 52, hl: true },
      { t: "point.", at: 64, hl: true },
    ],
  },
];

const TAIL: PromoScenario = {
  id: "competitor-ads-feed-tail",
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

const COLD_TOTAL = F(VO["01-radar"]) + 24;
const STAGE_TOTAL = COLD_TOTAL + NOTIFY_TOTAL;
const LIBRARY_AT = STAGE_TOTAL;
const COPY_AT = LIBRARY_AT + LIBRARY_TOTAL;
const COPY_TOTAL = COPY_INPUT_TOTAL + COPY_CHAT_TOTAL;
const PUNCH_AT = COPY_AT + COPY_TOTAL;
const PUNCH_TOTAL = F(LIB_VO["07-punch"]) + 24;
const TAIL_AT = PUNCH_AT + PUNCH_TOTAL;

export const COMPETITOR_ADS_FEED_TOTAL = TAIL_AT + promoDuration(TAIL);

export const CompetitorAdsFeed: React.FC = () => (
  <AbsoluteFill style={{ background: "var(--background)" }}>
    <Sequence durationInFrames={STAGE_TOTAL}>
      <WallNotifyStage preRoll={COLD_TOTAL} />
      <Audio src={vo("01-radar")} />
    </Sequence>
    <Sequence from={COLD_TOTAL} layout="none">
      <Audio src={voLib("04-notify")} />
    </Sequence>
    <Sequence from={LIBRARY_AT} durationInFrames={LIBRARY_TOTAL}>
      <LibraryScene />
      <Audio src={voLib("05-library")} />
    </Sequence>
    <Sequence from={COPY_AT} durationInFrames={COPY_TOTAL}>
      <Sequence durationInFrames={COPY_INPUT_TOTAL}>
        <CopyInput />
      </Sequence>
      <Sequence from={COPY_INPUT_TOTAL}>
        <CopyChat />
      </Sequence>
      <Audio src={voLib("06-copy")} />
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
