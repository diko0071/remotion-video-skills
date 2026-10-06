import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { KineticLine } from "../../kit/kinetic-text";
import { GrokCta } from "../../kit/grok-cta";
import { Lockup } from "../../kit/lockup";
import { Bloub, blinkTrack } from "../../kit/grok-ui";
import { CREAM, TAIL_BLINKS } from "./timings";

const INK = "#171310";

export const HookScene: React.FC = () => (
  <AbsoluteFill style={{ background: CREAM }}>
    <KineticLine
      at={0}
      span={30}
      size={92}
      maxWidth={960}
      parts={[
        { word: "Your" },
        { word: "marketing" },
        { word: "team." },
        { br: true },
        { word: "Now" },
        { word: "in" },
        { image: "grok/bloub-ink.png", tilt: -4, imgHeight: 66 },
        { word: "Grok" },
        { word: "Bot." },
      ]}
    />
  </AbsoluteFill>
);

const BlinkingGrok: React.FC = () => {
  const frame = useCurrentFrame();
  return <Bloub size={140} blink={blinkTrack(frame, TAIL_BLINKS, 16)} gaze={{ x: 0.15, y: 0.1 }} />;
};

export const LockupScene: React.FC = () => (
  <Lockup
    mark="ryze-sun.png"
    word="Ryze AI"
    background={CREAM}
    ink={INK}
    partnerNode={<BlinkingGrok />}
    tagline="Your marketing team, now available in Grok Bot"
  />
);

export const CtaScene: React.FC = () => <GrokCta background={CREAM} ink={INK} />;
