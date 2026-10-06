import React from "react";
import { AbsoluteFill, interpolate, Sequence, useCurrentFrame } from "remotion";
import { STAGE_ATTR } from "../../core/stage";
import { Bloub, blinkTrack } from "../../kit/grok-ui/bloub";
import { GROK_CTA_LEN, GrokCta } from "../../kit/grok-cta";
import { Lockup } from "../../kit/lockup";
import { SettleLine } from "../../kit/settle-text";
import { CarriedObject } from "../../kit/transitions/carry";
import { projectThroughKeys } from "../../kit/keyed-rig";
import { SlidePage } from "../../kit/transitions/slide";
import { DropLayer, GrokPhase } from "./app";
import { Pile, SignalsStage } from "./signals";
import { CAM_SIG, CARD, CARRY, CARRY_LEN, FILM_END, GROUND, INK, INTRO_OUT, LAND, LOCKUP_AT, LOCKUP_LEN, PILE, SIG_IN, SLIDE, TAIL_BLINKS, TOTAL } from "./timings";

export const GROK_APPROVALS_TOTAL = TOTAL;
export const GROK_APPROVALS_CTA_TOTAL = TOTAL + GROK_CTA_LEN;

const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const out = interpolate(frame, [INTRO_OUT, INTRO_OUT + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  if (frame >= INTRO_OUT + CARRY_LEN) return null;
  return (
    <AbsoluteFill style={{ opacity: 1 - out, filter: out > 0.02 ? `blur(${out * 10}px)` : undefined }}>
      <SettleLine
        size={96}
        ink={INK}
        weight={700}
        maxWidth={1700}
        parts={[
          { word: "Let", at: 2 },
          { word: "Grok", at: 6 },
          { image: "grok/bloub-ink.png", at: 10, size: 112, radius: 26, background: "#F1F1F3" },
          { word: "Bot", at: 14 },
          { word: "run", at: 16 },
          { word: "your", at: 19 },
          { word: "ads.", at: 22 },
          { br: true },
          { word: "You", at: 32 },
          { word: "approve", at: 36 },
          { word: "every", at: 40 },
          { word: "change.", at: 44 },
        ]}
      />
    </AbsoluteFill>
  );
};

const CarryLayer: React.FC = () => {
  const start = projectThroughKeys(CAM_SIG, CARRY.from, PILE.x, PILE.y);
  const zoom = CAM_SIG[CAM_SIG.length - 1].zoom;
  const stops = [
    { x: start.x, y: start.y, at: CARRY.from },
    { x: start.x, y: start.y + 40, at: CARRY.from + 10 },
    { x: LAND.x, y: LAND.y, at: CARRY.land },
  ];
  return (
    <CarriedObject
      stops={stops}
      from={CARRY.from}
      until={CARRY.land}
      size={[CARD.w * zoom, 340]}
      grow={[CARRY.from + 16, CARRY.land]}
      aspect={CARD.h / CARD.w}
      anchor={{ x: 0.5, y: 0.5 }}
      cursorScale={2.2}
      render={(w) => <Pile width={w} />}
    />
  );
};

const BlinkingGrok: React.FC = () => {
  const frame = useCurrentFrame();
  return <Bloub size={140} color={INK} eyeColor={GROUND} blink={blinkTrack(frame, TAIL_BLINKS, 16)} gaze={{ x: 0.15, y: 0.1 }} />;
};

const Approvals: React.FC<{ cta?: boolean }> = ({ cta }) => (
  <AbsoluteFill style={{ background: GROUND }} {...{ [STAGE_ATTR]: "" }}>
    <Sequence durationInFrames={SIG_IN} layout="none">
      <Intro />
    </Sequence>
    <Sequence durationInFrames={SLIDE.at + SLIDE.len + 4} layout="none">
      <SlidePage id="ga-out" at={SLIDE.at} len={SLIDE.len} direction="out">
        <SignalsStage />
      </SlidePage>
    </Sequence>
    <Sequence durationInFrames={FILM_END} layout="none">
      <SlidePage id="ga-in" at={SLIDE.at} len={SLIDE.len} direction="in">
        <GrokPhase />
      </SlidePage>
    </Sequence>
    <Sequence durationInFrames={FILM_END} layout="none">
      <CarryLayer />
      <DropLayer />
    </Sequence>
    <Sequence from={LOCKUP_AT} durationInFrames={LOCKUP_LEN}>
      <Lockup mark="ryze-sun-white.png" word="Ryze AI" background={GROUND} ink={INK} partnerNode={<BlinkingGrok />} tagline="Your marketing team, now available in Grok Bot" />
    </Sequence>
    {cta ? (
      <Sequence from={TOTAL}>
        <GrokCta background={GROUND} ink={INK} size={104} maxWidth={1600} />
      </Sequence>
    ) : null}
  </AbsoluteFill>
);

export const GrokApprovals: React.FC = () => <Approvals />;

export const GrokApprovalsCta: React.FC = () => <Approvals cta />;
