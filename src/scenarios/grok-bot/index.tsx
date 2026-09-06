import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { PromoPlayer } from "../../engine/promo/player";
import { promoDuration, PromoScenario } from "../../engine/promo/scenario";
import { GrokBotFilm } from "./scene-film";
import { CtaScene, HookScene, LockupScene } from "./tail";
import { CREAM, FILM_TOTAL, TAIL_HOOK, TAIL_LOCKUP } from "./timings";

const INK = "#171310";

const TAIL: PromoScenario = {
  id: "grok-bot-tail",
  format: "square",
  background: CREAM,
  ink: INK,
  transition: "cut",
  scenes: [
    { kind: "custom", render: HookScene, duration: TAIL_HOOK },
    { kind: "custom", render: LockupScene, duration: TAIL_LOCKUP },
  ],
};

export const GROK_BOT_TOTAL = FILM_TOTAL + promoDuration(TAIL);

export const GrokBot: React.FC = () => (
  <AbsoluteFill style={{ background: CREAM }}>
    <Sequence durationInFrames={FILM_TOTAL}>
      <GrokBotFilm />
    </Sequence>
    <Sequence from={FILM_TOTAL}>
      <PromoPlayer scenario={TAIL} />
    </Sequence>
  </AbsoluteFill>
);

const TAIL_CTA: PromoScenario = {
  ...TAIL,
  id: "grok-bot-tail-cta",
  scenes: [...TAIL.scenes, { kind: "custom", render: CtaScene, duration: 80 }],
};

export const GROK_BOT_CTA_TOTAL = FILM_TOTAL + promoDuration(TAIL_CTA);

export const GrokBotCta: React.FC = () => (
  <AbsoluteFill style={{ background: CREAM }}>
    <Sequence durationInFrames={FILM_TOTAL}>
      <GrokBotFilm />
    </Sequence>
    <Sequence from={FILM_TOTAL}>
      <PromoPlayer scenario={TAIL_CTA} />
    </Sequence>
  </AbsoluteFill>
);
