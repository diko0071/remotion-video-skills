import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { PromoPlayer } from "../../engine/promo/player";
import { PromoScenario } from "../../engine/promo/scenario";
import { SceneDive, DIVE_TOTAL } from "./dive";
import { SceneRadial, RADIAL_TOTAL, RADIAL_EXIT_AT } from "./radial-scene";
import { SceneCta, CTA_TOTAL, CTA_EXIT_AT } from "./cta-scene";

const INK = "#171310";
const CREAM = "#FDFAF3";



const TAIL: PromoScenario = {
  id: "scan-algo-tail",
  format: "wide",
  background: CREAM,
  ink: INK,
  transition: "cut",
  scenes: [
    {
      kind: "lockup",
      background: CREAM,
      mark: "ryze-sun.png",
      word: "Ryze AI",
      tagline: "Put your marketing on autopilot at ryze.ai",
    },
  ],
};

const RADIAL_AT = DIVE_TOTAL - 12;
const CTA_AT = RADIAL_AT + RADIAL_EXIT_AT - 2;
const TAIL_AT = CTA_AT + CTA_EXIT_AT - 2;

export const SCAN_ALGO_TOTAL = TAIL_AT + 80;

export const ScanAlgo: React.FC = () => (
  <AbsoluteFill style={{ background: "var(--background)" }}>
    <Sequence durationInFrames={DIVE_TOTAL}>
      <SceneDive />
    </Sequence>
    <Sequence from={RADIAL_AT} durationInFrames={RADIAL_TOTAL}>
      <SceneRadial />
    </Sequence>
    <Sequence from={CTA_AT} durationInFrames={CTA_TOTAL}>
      <SceneCta />
    </Sequence>
    <Sequence from={TAIL_AT} durationInFrames={80}>
      <PromoPlayer scenario={TAIL} />
    </Sequence>

  </AbsoluteFill>
);
