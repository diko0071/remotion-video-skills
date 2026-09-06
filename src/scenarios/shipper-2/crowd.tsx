import React from "react";
import { AbsoluteFill, staticFile } from "remotion";
import { Video } from "@remotion/media";

export const CrowdScene: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Video src={staticFile("shipper-2/crowd.mp4")} objectFit="cover" style={{ width: "100%", height: "100%", filter: "brightness(1.15) contrast(0.95)" }} />
  </AbsoluteFill>
);
