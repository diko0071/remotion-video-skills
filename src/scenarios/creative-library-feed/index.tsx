import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { PromoPlayer } from "../../engine/promo/player";
import { promoDuration, PromoScenario } from "../../engine/promo/scenario";
import { CreativeWall } from "../creative-library/creative-wall";
import { BrowseScene } from "../creative-library/scene-browse";
import {
  LibraryChat,
  LIBRARY_CHAT_RESULT_AT,
  LIBRARY_CHAT_TOTAL,
} from "../creative-library/scene-chat";
import { KineticBeats, type KineticBeat } from "../../kit/kinetic-beats";
import { MoodboardHook } from "../creative-library/scene-kinetic";
import { BROWSE_TOTAL, WALL_TOTAL } from "../creative-library/timings";
import VO from "./vo-durations.json";

const INK = "#171310";
const CREAM = "#FDFAF3";
const F = (s: number) => Math.ceil(s * 30);

const vo = (name: string) => staticFile(`vo/creative-library-feed/${name}.mp3`);

const COLD_TOTAL = WALL_TOTAL;
const WALL_SKIP = Math.max(0, WALL_TOTAL - COLD_TOTAL);

const END_BEATS: KineticBeat[] = [
  {
    at: 0,
    size: 100,
    words: [
      { t: "Your", at: 6 },
      { t: "next", at: 12 },
      { t: "ad", at: 18 },
      { t: "doesn\u2019t", at: 26 },
      { t: "start", at: 33 },
      { t: "from", at: 40 },
      { t: "scratch.", at: 46 },
    ],
  },
  {
    at: 62,
    size: 108,
    words: [
      { t: "It", at: 66 },
      { t: "starts", at: 72, hl: true },
      { t: "from", at: 80 },
      { t: "a", at: 86 },
      { t: "winner.", at: 92, hl: true, sparks: true },
    ],
  },
];
const END_TOTAL = F(VO["05-end"]) + 14;

const ColdOpen: React.FC = () => (
  <AbsoluteFill style={{ background: "var(--background)" }}>
    <Sequence from={-WALL_SKIP} layout="none">
      <CreativeWall />
    </Sequence>
  </AbsoluteFill>
);

const TAIL: PromoScenario = {
  id: "creative-library-feed-tail",
  format: "wide",
  background: CREAM,
  ink: INK,
  transition: "cut",
  caption: "The world's largest creative library, inside Ryze.",
  scenes: [
    { kind: "custom", render: MoodboardHook, duration: 110 },
    {
      kind: "lockup",
      background: CREAM,
      mark: "ryze-sun.png",
      word: "Ryze AI",
      tagline: "Put your marketing on autopilot at ryze.ai",
    },
  ],
};

const BROWSE_AT = COLD_TOTAL;
const CHAT_AT = BROWSE_AT + BROWSE_TOTAL;
const END_AT = CHAT_AT + LIBRARY_CHAT_TOTAL;
const TAIL_AT = END_AT + END_TOTAL;

export const CREATIVE_LIBRARY_FEED_TOTAL = TAIL_AT + promoDuration(TAIL);

export const CreativeLibraryFeed: React.FC = () => (
  <AbsoluteFill style={{ background: "var(--background)" }}>
    <Sequence durationInFrames={COLD_TOTAL}>
      <ColdOpen />
    </Sequence>
    <Sequence layout="none">
      <Audio src={vo("01-collected")} />
    </Sequence>
    <Sequence from={BROWSE_AT} durationInFrames={BROWSE_TOTAL}>
      <BrowseScene />
    </Sequence>
    <Sequence from={BROWSE_AT + 58} layout="none">
      <Audio src={vo("02-use")} />
    </Sequence>
    <Sequence from={CHAT_AT} durationInFrames={LIBRARY_CHAT_TOTAL}>
      <LibraryChat />
    </Sequence>
    <Sequence from={CHAT_AT + 6} durationInFrames={LIBRARY_CHAT_RESULT_AT}>
      <Audio src={vo("03-agent")} />
    </Sequence>
    <Sequence from={CHAT_AT + LIBRARY_CHAT_RESULT_AT} durationInFrames={200}>
      <Audio src={vo("04-result")} />
    </Sequence>
    <Sequence from={END_AT} durationInFrames={END_TOTAL}>
      <KineticBeats beats={END_BEATS} total={END_TOTAL} sfx={false} />
      <Audio src={vo("05-end")} />
    </Sequence>
    <Sequence from={TAIL_AT}>
      <PromoPlayer scenario={TAIL} />
    </Sequence>
  </AbsoluteFill>
);
