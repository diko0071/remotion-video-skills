import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { PromoPlayer } from "../../engine/promo/player";
import { promoDuration, PromoScenario } from "../../engine/promo/scenario";
import { AbsoluteFill as Fill } from "remotion";
import { useReveal } from "../../core/motion";
import { HighlightWord, InlineTile } from "../../kit/kinetic-text";
import { BuildScene, BUILD_TOTAL } from "../cited-by-ai/scene-build";
import { CitedChat, CITED_CHAT_TOTAL, CITED_EXPAND_AT } from "../cited-by-ai/scene-cited-chat";
import { PrScene, PR_TOTAL } from "../cited-by-ai/scene-pr";
import { ValidateScene, VALIDATE_TOTAL } from "../cited-by-ai/scene-validate";
import { GridScene, GRID_SCENE_TOTAL } from "../cited-by-ai/scene-grid";
import { GRID_VO_AT } from "../cited-by-ai/timings";

const vo = (name: string) => staticFile(`vo/cited-by-ai/${name}.mp3`);

const INK = "#171310";
const CREAM = "#FDFAF3";

const CitedHook: React.FC = () => {
  const style = useReveal(4, 40, 20);
  return (
    <Fill
      style={{
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Plus Jakarta Sans'",
      }}
    >
      <div
        style={{
          ...style,
          maxWidth: 1640,
          textAlign: "center",
          fontSize: 100,
          fontWeight: 800,
          letterSpacing: "-0.03em",
          lineHeight: 1.35,
          color: INK,
        }}
      >
        Be <HighlightWord at={14}>cited</HighlightWord> in
        <br />
        <InlineTile src="ai/chatgpt.png" at={20} tilt={-5} />
        <InlineTile src="ai/claude.png" at={24} tilt={4} />
        <InlineTile src="ai/perplexity.webp" at={28} tilt={-3} />
        <InlineTile src="ai/gemini.png" at={32} tilt={5} />
      </div>
    </Fill>
  );
};

const TAIL: PromoScenario = {
  id: "cited-by-ai-feed-tail",
  format: "wide",
  background: CREAM,
  ink: INK,
  transition: "cut",
  scenes: [
    { kind: "custom", render: CitedHook, duration: 130 },
    {
      kind: "lockup",
      background: CREAM,
      mark: "ryze-sun.png",
      word: "Ryze AI",
      tagline: "Put your marketing on autopilot at ryze.ai",
    },
  ],
};

const BUILD_AT = GRID_SCENE_TOTAL;
const CAL_AT = BUILD_AT + BUILD_TOTAL;
const CAL_VO2_AT = CAL_AT + CITED_EXPAND_AT + 24;
const VALIDATE_AT = CAL_AT + CITED_CHAT_TOTAL;
const PR_AT = VALIDATE_AT + VALIDATE_TOTAL;
const TAIL_AT = PR_AT + PR_TOTAL;

export const CITED_BY_AI_FEED_TOTAL = TAIL_AT + promoDuration(TAIL);

export const CitedByAiFeed: React.FC = () => (
  <AbsoluteFill style={{ background: "var(--background)" }}>
    <Sequence durationInFrames={GRID_SCENE_TOTAL}>
      <GridScene />
      <Audio src={vo("01-ask")} />
    </Sequence>
    <Sequence from={GRID_VO_AT} layout="none">
      <Audio src={vo("02-others")} />
    </Sequence>
    <Sequence from={BUILD_AT} durationInFrames={BUILD_TOTAL}>
      <BuildScene />
      <Audio src={vo("03-build")} />
    </Sequence>
    <Sequence from={CAL_AT} durationInFrames={CITED_CHAT_TOTAL}>
      <CitedChat />
      <Audio src={vo("04-write")} />
    </Sequence>
    <Sequence from={CAL_VO2_AT} layout="none">
      <Audio src={vo("06-calendar")} />
    </Sequence>
    <Sequence from={VALIDATE_AT} durationInFrames={VALIDATE_TOTAL}>
      <ValidateScene />
      <Audio src={vo("07-validate")} />
    </Sequence>
    <Sequence from={PR_AT} durationInFrames={PR_TOTAL}>
      <PrScene />
      <Audio src={vo("08-pr")} />
    </Sequence>
    <Sequence from={TAIL_AT}>
      <PromoPlayer scenario={TAIL} />
    </Sequence>
    <Sequence from={TAIL_AT + 4} layout="none">
      <Audio src={vo("09-cited")} />
    </Sequence>
  </AbsoluteFill>
);
