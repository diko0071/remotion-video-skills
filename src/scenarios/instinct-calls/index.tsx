import React from "react";
import { AbsoluteFill, Easing, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Audio } from "@remotion/media";
import { ramp } from "../../core/motion";
import { C, CornerLockup, LaunchHeadline, UrlPlateEndCard } from "../../kit/launch";
import { MotionBlurWindows } from "../../kit/motion-blur-windows";
import { AgencyScene } from "./agency-scene";
import { CpaCard } from "./cpa-card";
import { PhoneRig } from "./phone-rig";
import { Ripples } from "./ripples";
import { SpendCard } from "./spend-card";
import { SpikeLink } from "./spike-link";
import { HEADLINE_ENDS, HEADLINE_STARTS, HEADLINES, URL, URL_LEAD } from "./story";
import { INSTINCT_TOTAL, T } from "./timeline";

export { INSTINCT_TOTAL } from "./timeline";

const BLUR: Array<[number, number]> = [
  [T.toRight, T.toRight + 22],
  [T.exit, T.exit + 26],
];

const TAPS = [T.tap, T.endTap, T.send] as const;

const Stage: React.FC = () => {
  const f = useCurrentFrame();
  const s = 1 + 0.04 * ramp(f, 0, INSTINCT_TOTAL, Easing.linear);
  return (
    <AbsoluteFill style={{ transformOrigin: "960px 620px", transform: `scale(${s})` }}>
      <Ripples />
      <AgencyScene />
      <SpendCard />
      <CpaCard />
      <SpikeLink />
      <PhoneRig />
    </AbsoluteFill>
  );
};

export const InstinctCalls: React.FC = () => (
  <AbsoluteFill style={{ background: C.cream, overflow: "hidden" }}>
    <MotionBlurWindows windows={BLUR} samples={12}>
      <Stage />
    </MotionBlurWindows>
    <UrlPlateEndCard lead={URL_LEAD} url={URL} at={T.url} total={INSTINCT_TOTAL} />
    <LaunchHeadline lines={HEADLINES} starts={HEADLINE_STARTS} ends={HEADLINE_ENDS} />
    <CornerLockup pulseAt={T.url + 8} />
    {TAPS.map((at) => (
      <Sequence key={at} from={at - 1} durationInFrames={20} layout="none">
        <Audio src={staticFile("sfx/mouse-click.wav")} volume={0.7} />
      </Sequence>
    ))}
  </AbsoluteFill>
);
