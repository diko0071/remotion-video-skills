import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import VO from "./vo-durations.json";
import { PromoPlayer } from "../../engine/promo/player";
import { promoDuration, PromoScenario } from "../../engine/promo/scenario";
import { KineticBeats, type KineticBeat } from "../../kit/kinetic-beats";
import { TrackInput, TrackChat, TRACK_INPUT_TOTAL, TRACK_CHAT_TOTAL } from "./scene-track";
import { RADAR_TOTAL } from "./scene-radar";
import { WallNotifyStage } from "./scene-wall";
import { NOTIFY_TOTAL } from "./scene-notify";
import { LibraryScene, LIBRARY_TOTAL } from "./scene-library";
import { CopyInput, CopyChat, COPY_INPUT_TOTAL, COPY_CHAT_TOTAL } from "./scene-copy";

const INK = "#171310";
const CREAM = "#FDFAF3";
const F = (s: number) => Math.ceil(s * 30);

const vo = (name: string) => staticFile(`vo/competitor-ads/${name}.mp3`);

const HOOK_BEATS: KineticBeat[] = [
  {
    at: 0,
    size: 104,
    words: [
      { t: "running", at: 8 },
      { t: "ads", at: 20, hl: true },
      { t: "right", at: 40 },
      { t: "now.", at: 50 },
    ],
  },
  {
    at: 64,
    size: 104,
    words: [
      { t: "Have", at: 70 },
      { t: "you", at: 76 },
      { t: "seen", at: 78, hl: true, sparks: true },
      { t: "them?", at: 83 },
    ],
  },
];

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
  id: "competitor-ads-tail",
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
const TRACK_AT = HOOK_TOTAL;
const TRACK_TOTAL = TRACK_INPUT_TOTAL + TRACK_CHAT_TOTAL;
const RADAR_AT = TRACK_AT + TRACK_TOTAL;
const STAGE_TOTAL = RADAR_TOTAL + NOTIFY_TOTAL;
const NOTIFY_AT = RADAR_AT + RADAR_TOTAL;
const LIBRARY_AT = RADAR_AT + STAGE_TOTAL;
const COPY_AT = LIBRARY_AT + LIBRARY_TOTAL;
const COPY_TOTAL = COPY_INPUT_TOTAL + COPY_CHAT_TOTAL;
const PUNCH_AT = COPY_AT + COPY_TOTAL;
const PUNCH_TOTAL = F(VO["07-punch"]) + 24;
const TAIL_AT = PUNCH_AT + PUNCH_TOTAL;

export const COMPETITOR_ADS_TOTAL = TAIL_AT + promoDuration(TAIL);

export const CompetitorAds: React.FC = () => (
  <AbsoluteFill style={{ background: "var(--background)" }}>
    <Sequence durationInFrames={HOOK_TOTAL}>
      <KineticBeats beats={HOOK_BEATS} total={HOOK_TOTAL} sfx={false} />
      <Audio src={vo("01-hook")} />
    </Sequence>
    <Sequence from={TRACK_AT} durationInFrames={TRACK_TOTAL}>
      <Sequence durationInFrames={TRACK_INPUT_TOTAL}>
        <TrackInput />
      </Sequence>
      <Sequence from={TRACK_INPUT_TOTAL}>
        <TrackChat />
      </Sequence>
      <Audio src={vo("02-track")} />
    </Sequence>
    <Sequence from={RADAR_AT} durationInFrames={STAGE_TOTAL}>
      <WallNotifyStage preRoll={RADAR_TOTAL} />
      <Audio src={vo("03-radar")} />
    </Sequence>
    <Sequence from={NOTIFY_AT} layout="none">
      <Audio src={vo("04-notify")} />
    </Sequence>
    <Sequence from={LIBRARY_AT} durationInFrames={LIBRARY_TOTAL}>
      <LibraryScene />
      <Audio src={vo("05-library")} />
    </Sequence>
    <Sequence from={COPY_AT} durationInFrames={COPY_TOTAL}>
      <Sequence durationInFrames={COPY_INPUT_TOTAL}>
        <CopyInput />
      </Sequence>
      <Sequence from={COPY_INPUT_TOTAL}>
        <CopyChat />
      </Sequence>
      <Audio src={vo("06-copy")} />
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
