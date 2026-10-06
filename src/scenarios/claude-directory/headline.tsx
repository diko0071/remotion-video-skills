import React from "react";
import { AbsoluteFill, Easing, useCurrentFrame } from "remotion";
import { ramp } from "../../core/motion";
import { DirectionalBlur } from "../../kit/directional-blur";
import { RiseLetters } from "../../kit/rise-letters";
import { SANS } from "./font";
import { HEADLINE, INK } from "./timings";

const WORDS = ["Your", " marketing", " autopilot"];

export const Headline: React.FC = () => {
  const frame = useCurrentFrame();
  if (frame > HEADLINE.gone) return null;
  const shift = ramp(frame, HEADLINE.shiftAt, HEADLINE.gone, Easing.in(Easing.cubic)) * -1700;
  const shiftPrev = ramp(frame - 1, HEADLINE.shiftAt, HEADLINE.gone, Easing.in(Easing.cubic)) * -1700;
  const fade = ramp(frame, HEADLINE.shiftAt + 6, HEADLINE.gone);
  return (
    <AbsoluteFill style={{ alignItems: "center", pointerEvents: "none" }}>
      <DirectionalBlur id="cd-headline" x={Math.abs(shift - shiftPrev) * 0.28} style={{ position: "absolute", top: HEADLINE.y, transform: `translate(${shift}px, -50%)`, opacity: 1 - fade, fontFamily: SANS, fontSize: HEADLINE.size, fontWeight: 600, letterSpacing: "-0.03em", whiteSpace: "pre", lineHeight: 1 }}>
        <RiseLetters text={WORDS} from={HEADLINE.words} len={9} rise={0.4} color={INK} />
      </DirectionalBlur>
    </AbsoluteFill>
  );
};
