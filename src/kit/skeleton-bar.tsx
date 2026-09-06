import React from "react";
import { useCurrentFrame } from "remotion";
import { shimmerBackground } from "../core/motion";

export const SkeletonBar: React.FC<{ w: number | string; h: number; radius: number; base: string; highlight: string; speed?: number; delay?: number }> = ({ w, h, radius, base, highlight, speed, delay }) => {
  const frame = useCurrentFrame();
  return <div style={{ height: h, width: w, borderRadius: radius, ...shimmerBackground(frame, { base, highlight, speed, delay }) }} />;
};
