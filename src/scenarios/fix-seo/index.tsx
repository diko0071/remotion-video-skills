import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { PromoPlayer } from "../../engine/promo/player";
import { promoDuration, PromoScenario } from "../../engine/promo/scenario";
import { UnderlineAccent } from "../../kit/underline-accent";
import { GeoReadyHook, GoogleReadyHook } from "../../kit/ready-hooks";
import { FixSeoChat, FIX_SEO_CHAT_TOTAL } from "./scene-chat";
import { FixSeoInput, FIX_SEO_INPUT_TOTAL } from "./scene-input";
import { FixSeoScan, FIX_SEO_SCAN_TOTAL } from "./scene-scan";

const INK = "#171310";
const CREAM = "#FDFAF3";

const HOOK: PromoScenario = {
  id: "fix-seo-hook",
  format: "wide",
  background: CREAM,
  ink: INK,
  transition: "cut",
  scenes: [
    {
      kind: "title",
      heading: "Fix SEO in 1 prompt.",
      headingNode: (
        <>
          Fix SEO in <UnderlineAccent drawAt={26}>1 prompt</UnderlineAccent>.
        </>
      ),
      duration: 52,
    },
  ],
};

const TAIL: PromoScenario = {
  id: "fix-seo-tail",
  format: "wide",
  background: CREAM,
  ink: INK,
  transition: "cut",
  scenes: [
    { kind: "custom", render: GoogleReadyHook, duration: 58 },
    { kind: "custom", render: GeoReadyHook, duration: 64 },
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
const SCAN_AT = HOOK_TOTAL;
const INPUT_AT = SCAN_AT + FIX_SEO_SCAN_TOTAL;
const CHAT_AT = INPUT_AT + FIX_SEO_INPUT_TOTAL;
const TAIL_AT = CHAT_AT + FIX_SEO_CHAT_TOTAL;

export const FIX_SEO_TOTAL = TAIL_AT + promoDuration(TAIL);

export const FixSeo: React.FC = () => (
  <AbsoluteFill style={{ background: "var(--background)" }}>
    <Sequence durationInFrames={HOOK_TOTAL}>
      <PromoPlayer scenario={HOOK} />
    </Sequence>
    <Sequence from={SCAN_AT} durationInFrames={FIX_SEO_SCAN_TOTAL}>
      <FixSeoScan />
    </Sequence>
    <Sequence from={INPUT_AT} durationInFrames={FIX_SEO_INPUT_TOTAL}>
      <FixSeoInput />
    </Sequence>
    <Sequence from={CHAT_AT} durationInFrames={FIX_SEO_CHAT_TOTAL}>
      <FixSeoChat />
    </Sequence>
    <Sequence from={TAIL_AT}>
      <PromoPlayer scenario={TAIL} />
    </Sequence>
  </AbsoluteFill>
);
