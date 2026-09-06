import React from "react";
import { AbsoluteFill, interpolate, Sequence, useCurrentFrame } from "remotion";
import { loadFont } from "@remotion/google-fonts/PlusJakartaSans";
import { useReveal } from "../core/motion";
import { Lockup } from "../kit/lockup";
import { UnderlineAccent } from "../kit/underline-accent";

const { fontFamily } = loadFont();

const CREAM = "#F2F0EB";
const INK = "#171310";

export type GuideTitle = {
  title: string;
  accent?: string;
};

export const GuideIntro: React.FC<{ title: GuideTitle; outAt: number }> = ({ title, outAt }) => {
  const frame = useCurrentFrame();
  const heading = useReveal(10, 20, 26);
  const out = interpolate(frame, [outAt, outAt + 10], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  if (out <= 0.001) return null;
  const [before, after] = title.accent ? title.title.split(title.accent) : [title.title, ""];
  return (
    <AbsoluteFill
      style={{
        background: CREAM,
        fontFamily,
        alignItems: "center",
        justifyContent: "center",
        opacity: out,
      }}
    >
      <div
        style={{
          ...heading,
          textAlign: "center",
          padding: "0 160px",
          fontSize: 96,
          fontWeight: 700,
          lineHeight: 1.08,
          letterSpacing: "-0.03em",
          color: INK,
        }}
      >
        {before}
        {title.accent ? (
          <UnderlineAccent color="var(--brand)" drawAt={28}>
            {title.accent}
          </UnderlineAccent>
        ) : null}
        {after}
      </div>
    </AbsoluteFill>
  );
};

export const GuideOutro: React.FC<{ at: number; tagline?: string }> = ({
  at,
  tagline = "Put your marketing on autopilot at get-ryze.ai",
}) => {
  const frame = useCurrentFrame();
  if (frame < at) return null;
  return (
    <AbsoluteFill
      style={{
        opacity: interpolate(frame, [at, at + 6], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
      }}
    >
      <Sequence from={at} layout="none">
        <Lockup mark="ryze-sun.png" word="Ryze AI" tagline={tagline} background={CREAM} ink={INK} />
      </Sequence>
    </AbsoluteFill>
  );
};
