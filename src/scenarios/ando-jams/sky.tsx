import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";

export const Sky: React.FC<{ dim?: number }> = ({ dim = 0 }) => {
  const frame = useCurrentFrame();
  const drift = interpolate(frame, [0, 1600], [0, -60]);
  return (
    <AbsoluteFill style={{ background: "#dfe9f5", overflow: "hidden" }}>
      <Img
        src={staticFile("ando/sky.jpg")}
        style={{
          position: "absolute",
          left: -120,
          top: -120,
          width: 2160,
          height: 1320,
          objectFit: "cover",
          transform: `translateX(${drift}px)`,
          filter: "blur(5px) saturate(0.95)",
        }}
      />
      <AbsoluteFill style={{ background: `rgba(255,255,255,${0.06 + dim})` }} />
    </AbsoluteFill>
  );
};
