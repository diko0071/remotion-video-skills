import React from "react";
import { AbsoluteFill, interpolate, Sequence, useCurrentFrame } from "remotion";
import { STAGE_ATTR } from "../../core/stage";
import { Bloub, blinkTrack } from "../../kit/grok-ui/bloub";
import { GROK_CTA_LEN, GrokCta } from "../../kit/grok-cta";
import { Lockup } from "../../kit/lockup";
import { SettleLine } from "../../kit/settle-text";
import { AppLayer } from "./app";
import { HeroLayer } from "./hero";
import { RelayStage } from "./stage";
import { CARRY_LEN, FILM_TOTAL, GROUND, INK, INTRO_OUT, LOCKUP_LEN, TAIL_BLINKS, TOTAL } from "./timings";

export const GROK_PLUGINS_TOTAL = TOTAL;
export const GROK_PLUGINS_CTA_TOTAL = TOTAL + GROK_CTA_LEN;

const TILE = 124;

const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const out = interpolate(frame, [INTRO_OUT, INTRO_OUT + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  if (frame >= INTRO_OUT + CARRY_LEN) return null;
  return (
    <AbsoluteFill style={{ background: "transparent" }}>
      <AbsoluteFill style={{ opacity: 1 - out, filter: out > 0.02 ? `blur(${out * 10}px)` : undefined }}>
        <SettleLine
          size={104}
          ink={INK}
          weight={700}
          maxWidth={1840}
          parts={[
            { image: "ryze-sun.png", at: 2, size: TILE, radius: 28, background: "#F1F1F3" },
            { word: "Ryze", at: 8 },
            { word: "AI", at: 13 },
            { word: "×", at: 19 },
            { image: "grok/bloub-ink.png", at: 25, size: TILE, radius: 28, background: "#F1F1F3" },
            { word: "Grok", at: 31 },
            { word: "Bot", at: 36 },
          ]}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const Film: React.FC = () => (
  <AbsoluteFill style={{ background: "transparent" }}>
    <AppLayer />
    <HeroLayer />
    <RelayStage />
  </AbsoluteFill>
);

const BlinkingGrok: React.FC = () => {
  const frame = useCurrentFrame();
  return <Bloub size={140} color={INK} eyeColor={GROUND} blink={blinkTrack(frame, TAIL_BLINKS, 16)} gaze={{ x: 0.15, y: 0.1 }} />;
};

const Plugins: React.FC<{ cta?: boolean }> = ({ cta }) => (
  <AbsoluteFill style={{ background: GROUND }} {...{ [STAGE_ATTR]: "" }}>
    <Sequence from={INTRO_OUT + CARRY_LEN} durationInFrames={FILM_TOTAL} layout="none">
      <Film />
    </Sequence>
    <Sequence durationInFrames={INTRO_OUT + CARRY_LEN} layout="none">
      <Intro />
    </Sequence>
    <Sequence from={INTRO_OUT + CARRY_LEN + FILM_TOTAL} durationInFrames={LOCKUP_LEN}>
      <Lockup mark="ryze-sun-white.png" word="Ryze AI" background={GROUND} ink={INK} partnerNode={<BlinkingGrok />} tagline="Your marketing team, now available in Grok Bot" />
    </Sequence>
    {cta ? (
      <Sequence from={TOTAL}>
        <GrokCta background={GROUND} ink={INK} size={104} maxWidth={1600} />
      </Sequence>
    ) : null}
  </AbsoluteFill>
);

export const GrokPlugins: React.FC = () => <Plugins />;

export const GrokPluginsCta: React.FC = () => <Plugins cta />;
