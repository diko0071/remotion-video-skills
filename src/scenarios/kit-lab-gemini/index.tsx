import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { GradientField, RYZE_FIELD } from "../../kit/gradient-field";
import { MarkReveal } from "../../kit/mark-reveal";
import { SweepTitle } from "../../kit/sweep-title";
import { BRAND_FONT_FAMILY } from "../../kit/brand-font";

export const KIT_LAB_GEMINI_TOTAL = 150;

const SWEEP_END = 70;

export const KitLabGemini: React.FC = () => (
  <AbsoluteFill style={{ background: "#fff" }}>
    <Sequence durationInFrames={SWEEP_END + 8}>
      <GradientField blobs={RYZE_FIELD} base="#C19767" />
      <SweepTitle word="Introducing" size={520} weight={500} holdShift={-160} />
    </Sequence>
    <Sequence from={SWEEP_END}>
      <MarkReveal
        mask="ryze-sun.png"
        len={40}
        toSize={110}
        to={{ x: 760, y: 540 }}
        fill={<GradientField blobs={RYZE_FIELD} base="#C19767" />}
        wordmark={<span style={{ fontFamily: `"${BRAND_FONT_FAMILY}"`, fontSize: 108, fontWeight: 700, letterSpacing: "-0.02em", color: "#171310", whiteSpace: "nowrap" }}>Ryze AI</span>}
      />
    </Sequence>
  </AbsoluteFill>
);
