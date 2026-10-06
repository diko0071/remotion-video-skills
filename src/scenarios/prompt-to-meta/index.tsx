import React from "react";
import { AbsoluteFill, Sequence, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import { AdWall, ScanBeam } from "./ad-wall";
import { ApproveCursor } from "./approve-cursor";
import { Backdrop } from "./backdrop";
import { CampaignPanel } from "./campaign-panel";
import { Composer } from "./composer";
import { Finale } from "./finale";
import { GeneratedAds } from "./generated-ads";
import { HookTitle } from "./hook-title";
import { Flash, MergeFx } from "./merge-fx";
import { MotionBlurWindows } from "../../kit/motion-blur-windows";
import { Phone } from "./phone";
import { ProductCard } from "./product-card";
import { SANS } from "./theme";
import { HUD_BLUR, MOSAIC_BLUR, PUSH_BLUR, T, WORLD_BLUR } from "./timeline";
import { PushCamera } from "./push-camera";
import { Winners } from "./winners";

export { PROMPT_TO_META_TOTAL } from "./timeline";

const CLICKS = [T.send, T.approve];

export const PromptToMeta: React.FC = () => (
  <AbsoluteFill style={{ fontFamily: SANS, overflow: "hidden", background: "#0b1d4a" }}>
    <MotionBlurWindows windows={[...MOSAIC_BLUR, PUSH_BLUR]} shutterAngle={110}>
      <PushCamera>
        <Backdrop />
      </PushCamera>
    </MotionBlurWindows>
    <MotionBlurWindows windows={[...WORLD_BLUR, PUSH_BLUR]}>
      <PushCamera>
        <AdWall />
        <Winners />
        <ProductCard />
        <CampaignPanel />
        <GeneratedAds />
        <MergeFx />
        <Phone />
      </PushCamera>
    </MotionBlurWindows>
    <ScanBeam />
    <MotionBlurWindows windows={MOSAIC_BLUR} shutterAngle={110}>
      <Finale />
    </MotionBlurWindows>
    <HookTitle />
    <MotionBlurWindows windows={HUD_BLUR}>
      <Composer />
    </MotionBlurWindows>
    <ApproveCursor />
    <Flash />
    <Audio src={staticFile("music/prompt-to-meta.mp3")} volume={0.62} />
    {CLICKS.map((at) => (
      <Sequence key={at} from={at - 1} durationInFrames={20} layout="none">
        <Audio src={staticFile("sfx/mouse-click.wav")} volume={0.8} />
      </Sequence>
    ))}
  </AbsoluteFill>
);
