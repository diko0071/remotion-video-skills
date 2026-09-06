import React from "react";
import { Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { SPRINGS, useSpringAt } from "../../core/motion";
import { PromptComposer } from "../../kit/prompt-composer";

const StyleChip: React.FC<{ image: string; start: number }> = ({ image, start }) => {
  const frame = useCurrentFrame();
  const p = useSpringAt(start, SPRINGS.pop);
  if (frame < start) return null;
  return (
    <Img
      src={staticFile(image)}
      style={{
        width: 52,
        height: 52,
        borderRadius: 9,
        objectFit: "cover",
        border: "1px solid var(--border)",
        opacity: Math.min(1, p * 1.4),
        transform: `scale(${interpolate(p, [0, 1], [0.6, 1])})`,
      }}
    />
  );
};

export const ComposerCard: React.FC = () => (
  <PromptComposer
    prompts={[
      {
        text: "Create 6 ad creatives for my brand — match this style",
        typeWindow: [14, 96],
        sendAt: 130,
      },
    ]}
    attachment={
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <StyleChip image="showcase/ad-2.jpg" start={100} />
        <StyleChip image="showcase/ad-3.jpg" start={106} />
        <StyleChip image="showcase/ad-6.jpg" start={112} />
      </div>
    }
  />
);
