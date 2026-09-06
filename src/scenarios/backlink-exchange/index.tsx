import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import VO from "./vo-durations.json";
import { PromoPlayer } from "../../engine/promo/player";
import { promoDuration, PromoScenario } from "../../engine/promo/scenario";
import { useReveal } from "../../core/motion";
import { KineticBeats, type KineticBeat } from "../../kit/kinetic-beats";
import { UnderlineAccent } from "../../kit/underline-accent";
import { EmailsScene, EMAILS_TOTAL } from "./scene-emails";
import { NetworkScene, NETWORK_TOTAL } from "./scene-network";
import { SwapScene, SWAP_TOTAL } from "./scene-swap";

const INK = "#171310";
const CREAM = "#FDFAF3";
const F = (s: number) => Math.ceil(s * 30);

const vo = (name: string) => staticFile(`vo/backlink-exchange/${name}.mp3`);

const HOOK_BEATS: KineticBeat[] = [
  {
    at: 0,
    size: 120,
    words: [
      { t: "Where", at: 8 },
      { t: "do", at: 35 },
      { t: "backlinks", at: 41, hl: true },
      { t: "come", at: 68 },
      { t: "from?", at: 75 },
    ],
  },
];

const SCALE_BEATS: KineticBeat[] = [
  {
    at: 0,
    size: 120,
    words: [
      { t: "And", at: 4 },
      { t: "you?", at: 10, hl: true },
    ],
  },
  {
    at: 44,
    size: 116,
    words: [
      { t: "up", at: 51 },
      { t: "to", at: 55 },
      { t: "50", at: 60, hl: true, sparks: true },
      { t: "backlinks", at: 70 },
      { t: "a", at: 83, hl: true },
      { t: "month", at: 87, hl: true },
    ],
  },
];

const PUNCH_BEATS: KineticBeat[] = [
  {
    at: 0,
    size: 124,
    words: [
      { t: "$10,000", at: 18, hl: true },
      { t: "in", at: 56 },
      { t: "links,", at: 62 },
      { t: "monthly.", at: 86 },
    ],
  },
];

const TitleBeat: React.FC = () => {
  const style = useReveal(4, 36, 20);
  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Plus Jakarta Sans'",
      }}
    >
      <div
        style={{
          ...style,
          fontSize: 108,
          fontWeight: 800,
          letterSpacing: "-0.03em",
          color: INK,
          whiteSpace: "nowrap",
        }}
      >
        <UnderlineAccent drawAt={20} color="#C19767">
          <span style={{ color: INK }}>Try Backlink Exchange</span>
        </UnderlineAccent>
      </div>
    </AbsoluteFill>
  );
};

const TAIL: PromoScenario = {
  id: "backlink-exchange-tail",
  format: "wide",
  background: CREAM,
  ink: INK,
  transition: "cut",
  scenes: [
    { kind: "custom", render: TitleBeat, duration: 66 },
    {
      kind: "lockup",
      background: CREAM,
      mark: "ryze-sun.png",
      word: "Ryze AI",
      tagline: "Put your marketing on autopilot at ryze.ai",
    },
  ],
};

const HOOK_TOTAL = F(VO["01-hook"]) + 14;
const PROBLEM_AT = HOOK_TOTAL;
const PROBLEM_TOTAL = EMAILS_TOTAL;
const NETWORK_AT = PROBLEM_AT + PROBLEM_TOTAL;
const SWAP_AT = NETWORK_AT + NETWORK_TOTAL;
const SCALE_AT = SWAP_AT + SWAP_TOTAL;
const SCALE_TOTAL = F(VO["05-scale"]) + 18;
const PUNCH_AT = SCALE_AT + SCALE_TOTAL;
const PUNCH_TOTAL = F(VO["06-punch"]) + 24;
const TAIL_AT = PUNCH_AT + PUNCH_TOTAL;

export const BACKLINK_EXCHANGE_TOTAL = TAIL_AT + promoDuration(TAIL);

export const BacklinkExchange: React.FC = () => (
  <AbsoluteFill style={{ background: "var(--background)" }}>
    <Sequence durationInFrames={HOOK_TOTAL}>
      <KineticBeats beats={HOOK_BEATS} total={HOOK_TOTAL} sfx={false} />
      <Audio src={vo("01-hook")} />
    </Sequence>
    <Sequence from={PROBLEM_AT} durationInFrames={PROBLEM_TOTAL}>
      <EmailsScene />
      <Audio src={vo("02-problem")} />
    </Sequence>
    <Sequence from={NETWORK_AT} durationInFrames={NETWORK_TOTAL}>
      <NetworkScene />
      <Audio src={vo("03-network")} />
    </Sequence>
    <Sequence from={SWAP_AT} durationInFrames={SWAP_TOTAL}>
      <SwapScene />
      <Audio src={vo("04-swap")} />
    </Sequence>
    <Sequence from={SCALE_AT} durationInFrames={SCALE_TOTAL}>
      <KineticBeats beats={SCALE_BEATS} total={SCALE_TOTAL} sfx={false} />
      <Audio src={vo("05-scale")} />
    </Sequence>
    <Sequence from={PUNCH_AT} durationInFrames={PUNCH_TOTAL}>
      <KineticBeats beats={PUNCH_BEATS} total={PUNCH_TOTAL} sfx={false} />
      <Audio src={vo("06-punch")} />
    </Sequence>
    <Sequence from={TAIL_AT}>
      <PromoPlayer scenario={TAIL} />
    </Sequence>
  </AbsoluteFill>
);
