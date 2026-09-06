import React from "react";
import { AbsoluteFill, interpolate } from "remotion";

export const PageCurl: React.FC<{
  progress: number;
  front: React.ReactNode;
  back: React.ReactNode;
}> = ({ progress, front, back }) => {
  const bend = interpolate(progress, [0, 0.55, 1], [0, 74, 104]);
  const lift = interpolate(progress, [0, 0.55, 1], [0, -150, -300]);
  const squash = interpolate(progress, [0, 0.5, 1], [1, 0.6, 0.2]);
  const shade = interpolate(progress, [0, 0.45, 1], [0, 0.2, 0.45], {
    extrapolateRight: "clamp",
  });
  const rim = interpolate(progress, [0, 0.35, 1], [0, 0.7, 0.1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ perspective: 1800, perspectiveOrigin: "50% 0%" }}>
      <AbsoluteFill>{back}</AbsoluteFill>
      <AbsoluteFill
        style={{
          transformStyle: "preserve-3d",
          transformOrigin: "50% 0%",
          transform: `translateY(${lift}px) rotateX(${bend}deg) scaleY(${squash})`,
          overflow: "hidden",
          backfaceVisibility: "hidden",
          boxShadow: progress > 0.02 ? "0 40px 90px rgba(0,0,0,0.5)" : undefined,
        }}
      >
        {front}
        <AbsoluteFill
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 12%, rgba(0,0,0,0.35) 62%, rgba(0,0,0,0.8) 100%)",
            opacity: shade,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 26,
            background:
              "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.85) 100%)",
            opacity: rim,
          }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
