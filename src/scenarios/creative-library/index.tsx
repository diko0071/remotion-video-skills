import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { PromoPlayer } from "../../engine/promo/player";
import { promoDuration, PromoScenario } from "../../engine/promo/scenario";
import { CreativeWall } from "./creative-wall";
import { BrowseScene } from "./scene-browse";
import { LibraryChat, LIBRARY_CHAT_RESULT_AT, LIBRARY_CHAT_TOTAL } from "./scene-chat";
import { KineticGuess, KineticHook, KineticTurn, MoodboardHook } from "./scene-kinetic";
import { BROWSE_TOTAL, K1_TOTAL, K2_TOTAL, K3_TOTAL, WALL_TOTAL } from "./timings";

const INK = "#171310";
const CREAM = "#FDFAF3";

const vo = (name: string) => staticFile(`vo/creative-library/${name}.mp3`);

const TAIL: PromoScenario = {
  id: "creative-library-tail",
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

const K2_AT = K1_TOTAL;
const K3_AT = K2_AT + K2_TOTAL;
const WALL_AT = K3_AT + K3_TOTAL;
const BROWSE_AT = WALL_AT + WALL_TOTAL;
const CHAT_AT = BROWSE_AT + BROWSE_TOTAL;
const TAIL_AT = CHAT_AT + LIBRARY_CHAT_TOTAL;

export const CREATIVE_LIBRARY_TOTAL = TAIL_AT + promoDuration(TAIL);

export const CreativeLibrary: React.FC = () => (
  <AbsoluteFill style={{ background: "var(--background)" }}>
    <Sequence durationInFrames={K1_TOTAL}>
      <KineticHook total={K1_TOTAL} />
      <Audio src={vo("01-hook")} />
    </Sequence>
    <Sequence from={K2_AT} durationInFrames={K2_TOTAL}>
      <KineticGuess total={K2_TOTAL} />
      <Audio src={vo("02-guess")} />
    </Sequence>
    <Sequence from={K3_AT} durationInFrames={K3_TOTAL}>
      <KineticTurn total={K3_TOTAL} />
      <Audio src={vo("03-turn")} />
    </Sequence>
    <Sequence from={WALL_AT} durationInFrames={WALL_TOTAL}>
      <CreativeWall />
    </Sequence>
    <Sequence from={WALL_AT} layout="none">
      <Audio src={vo("04-library")} />
    </Sequence>
    <Sequence from={BROWSE_AT} durationInFrames={BROWSE_TOTAL}>
      <BrowseScene />
    </Sequence>
    <Sequence from={BROWSE_AT + 58} layout="none">
      <Audio src={vo("05-use")} />
    </Sequence>
    <Sequence from={CHAT_AT} durationInFrames={LIBRARY_CHAT_TOTAL}>
      <LibraryChat />
    </Sequence>
    <Sequence from={CHAT_AT + 6} durationInFrames={LIBRARY_CHAT_RESULT_AT}>
      <Audio src={vo("06-agent")} />
    </Sequence>
    <Sequence from={CHAT_AT + LIBRARY_CHAT_RESULT_AT} durationInFrames={200}>
      <Audio src={vo("06-result")} />
    </Sequence>
    <Sequence from={TAIL_AT}>
      <PromoPlayer scenario={TAIL} />
    </Sequence>
  </AbsoluteFill>
);
