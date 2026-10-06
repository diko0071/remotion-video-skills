import React from "react";
import { AbsoluteFill, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Audio } from "@remotion/media";
import { C, CornerLockup, LaunchHeadline, SANS, UrlPlateEndCard } from "../../kit/launch";
import { MotionBlurWindows } from "../../kit/motion-blur-windows";
import { AdLibraryWidget } from "./ad-library-widget";
import { ClaudeShell } from "./claude-shell";
import { useLayout } from "./layout";
import { SceneAsk } from "./scene-ask";
import { SceneConnect } from "./scene-connect";
import { SceneRebuild } from "./scene-rebuild";
import { stageOrigin, stageScale } from "./stage";
import { HEADLINE_ENDS, HEADLINE_STARTS, HEADLINES, URL, URL_LEAD } from "./story";
import { ACCENT } from "./theme";
import { AD_LIBRARY_TOTAL, T } from "./timeline";
import { Winners } from "./winners";

export { AD_LIBRARY_TOTAL } from "./timeline";

const BLUR: Array<[number, number]> = [
  [T.morph, T.morph + 18],
  [T.bubble, T.bubble + 12],
  [T.lift, T.lift + 24],
  [T.winnerMove, T.winnerMove + 20],
  [T.absorb, T.absorb + 22],
];

const Stage: React.FC = () => {
  const f = useCurrentFrame();
  const l = useLayout();
  const o = stageOrigin(l);
  return (
    <AbsoluteFill style={{ transformOrigin: `${o.x}px ${o.y}px`, transform: `scale(${stageScale(f)})` }}>
      <SceneConnect />
      <ClaudeShell />
      <SceneAsk />
      <AdLibraryWidget />
      <Winners />
      <SceneRebuild />
    </AbsoluteFill>
  );
};

export const AdLibrary: React.FC = () => (
  <AbsoluteFill style={{ background: C.cream, fontFamily: SANS, overflow: "hidden" }}>
    <MotionBlurWindows windows={BLUR} samples={12}>
      <Stage />
    </MotionBlurWindows>
    <UrlPlateEndCard lead={URL_LEAD.trim()} url={URL} at={T.url} total={AD_LIBRARY_TOTAL} plate={ACCENT} />
    <LaunchHeadline lines={HEADLINES} starts={HEADLINE_STARTS} ends={HEADLINE_ENDS} plate={ACCENT} />
    <CornerLockup pulseAt={T.absorb + 10} />
    <Audio src={staticFile("music/ad-library.mp3")} volume={0.62} />
    <Sequence from={T.send - 1} durationInFrames={20} layout="none">
      <Audio src={staticFile("sfx/mouse-click.wav")} volume={0.8} />
    </Sequence>
  </AbsoluteFill>
);
