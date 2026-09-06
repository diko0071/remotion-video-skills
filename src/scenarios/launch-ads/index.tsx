import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { PromoPlayer } from "../../engine/promo/player";
import { promoDuration, PromoScenario } from "../../engine/promo/scenario";
import { KineticLine } from "../../kit/kinetic-text";
import { UnderlineAccent } from "../../kit/underline-accent";
import { LaunchForm, LAUNCH_FORM_TOTAL } from "./scene-form";
import { LaunchInput, LAUNCH_INPUT_TOTAL } from "./scene-input";
import { LaunchLaunch, LAUNCH_LAUNCH_TOTAL } from "./scene-launch";
import { LaunchWork, LAUNCH_WORK_TOTAL } from "./scene-work";

const INK = "#171310";
const CREAM = "#FDFAF3";

const HookTabs: React.FC = () => (
  <KineticLine
    at={2}
    span={20}
    size={100}
    parts={[
      { word: "No" },
      { word: "ad" },
      { word: "manager." },
      { word: "No", accent: true },
      { word: "40", accent: true },
      { word: "tabs.", accent: true },
    ]}
  />
);

const HookApproval: React.FC = () => (
  <KineticLine
    at={2}
    span={20}
    size={100}
    parts={[
      { word: "Your" },
      { word: "approval" },
      { word: "is" },
      { word: "the" },
      { word: "only", accent: true },
      { word: "step.", accent: true },
    ]}
  />
);

const HookLive: React.FC = () => (
  <KineticLine
    at={2}
    span={24}
    size={100}
    parts={[
      { word: "One" },
      { word: "prompt." },
      { image: "integrations/meta-ads.svg", tilt: -4, size: 96, imgHeight: 44 },
      { image: "integrations/google-ads.webp", tilt: 4, size: 96, imgHeight: 48 },
      { word: "Ads", accent: true },
      { word: "live.", accent: true },
    ]}
  />
);

const promoScene = (id: string, render: React.ComponentType, duration: number): PromoScenario => ({
  id,
  format: "wide",
  background: CREAM,
  ink: INK,
  transition: "cut",
  scenes: [{ kind: "custom", render, duration }],
});

const HOOK: PromoScenario = {
  id: "launch-ads-hook",
  format: "wide",
  background: CREAM,
  ink: INK,
  transition: "cut",
  scenes: [
    {
      kind: "title",
      heading: "Launch ads from 1 prompt.",
      headingNode: (
        <>
          Launch ads from <UnderlineAccent drawAt={24}>1 prompt</UnderlineAccent>.
        </>
      ),
      duration: 52,
    },
  ],
};

const HOOK_TABS = promoScene("launch-ads-hook-tabs", HookTabs, 46);
const HOOK_APPROVAL = promoScene("launch-ads-hook-approval", HookApproval, 46);

const HookPlatforms: React.FC = () => (
  <KineticLine
    at={2}
    span={30}
    size={84}
    maxWidth={1400}
    parts={[
      { word: "Available" },
      { word: "on" },
      { word: "50+", accent: true },
      { word: "platforms" },
      { br: true },
      { image: "integrations/tiktok-ads.svg", tilt: -5, size: 88, imgHeight: 44 },
      { image: "integrations/instagram.svg", tilt: 4, size: 88, imgHeight: 44 },
      { image: "integrations/linkedin-ads.svg", tilt: -3, size: 88, imgHeight: 44 },
      { image: "integrations/pinterest-ads.svg", tilt: 5, size: 88, imgHeight: 44 },
      { image: "integrations/snapchat-ads.svg", tilt: -4, size: 88, imgHeight: 44 },
      { image: "integrations/reddit-ads.svg", tilt: 3, size: 88, imgHeight: 44 },
      { image: "integrations/microsoft-ads.svg", tilt: -5, size: 88, imgHeight: 44 },
    ]}
  />
);

const TAIL: PromoScenario = {
  id: "launch-ads-tail",
  format: "wide",
  background: CREAM,
  ink: INK,
  transition: "cut",
  scenes: [
    { kind: "custom", render: HookLive, duration: 52 },
    { kind: "custom", render: HookPlatforms, duration: 64 },
    {
      kind: "lockup",
      background: CREAM,
      mark: "ryze-sun.png",
      word: "Ryze AI",
      tagline: "Put your marketing on autopilot at ryze.ai",
    },
  ],
};

const HOOK_TOTAL = promoDuration(HOOK);
const INPUT_AT = HOOK_TOTAL;
const FORM_AT = INPUT_AT + LAUNCH_INPUT_TOTAL;
const H2_AT = FORM_AT + LAUNCH_FORM_TOTAL;
const WORK_AT = H2_AT + promoDuration(HOOK_TABS);
const H3_AT = WORK_AT + LAUNCH_WORK_TOTAL;
const LAUNCH_AT = H3_AT + promoDuration(HOOK_APPROVAL);
const TAIL_AT = LAUNCH_AT + LAUNCH_LAUNCH_TOTAL;

export const LAUNCH_ADS_TOTAL = TAIL_AT + promoDuration(TAIL);

export const LaunchAds: React.FC = () => (
  <AbsoluteFill style={{ background: "var(--background)" }}>
    <Sequence durationInFrames={HOOK_TOTAL}>
      <PromoPlayer scenario={HOOK} />
    </Sequence>
    <Sequence from={INPUT_AT} durationInFrames={LAUNCH_INPUT_TOTAL}>
      <LaunchInput />
    </Sequence>
    <Sequence from={FORM_AT} durationInFrames={LAUNCH_FORM_TOTAL}>
      <LaunchForm />
    </Sequence>
    <Sequence from={H2_AT} durationInFrames={promoDuration(HOOK_TABS)}>
      <PromoPlayer scenario={HOOK_TABS} />
    </Sequence>
    <Sequence from={WORK_AT} durationInFrames={LAUNCH_WORK_TOTAL}>
      <LaunchWork />
    </Sequence>
    <Sequence from={H3_AT} durationInFrames={promoDuration(HOOK_APPROVAL)}>
      <PromoPlayer scenario={HOOK_APPROVAL} />
    </Sequence>
    <Sequence from={LAUNCH_AT} durationInFrames={LAUNCH_LAUNCH_TOTAL}>
      <LaunchLaunch />
    </Sequence>
    <Sequence from={TAIL_AT}>
      <PromoPlayer scenario={TAIL} />
    </Sequence>
  </AbsoluteFill>
);
