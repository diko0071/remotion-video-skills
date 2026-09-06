import React from "react";
import { useCurrentFrame } from "remotion";

export const Ellipsis: React.FC<{ width: number; letterSpacing: number; period?: number; count?: number }> = ({ width, letterSpacing, period = 8, count = 4 }) => {
  const frame = useCurrentFrame();
  return <span style={{ display: "inline-block", width, letterSpacing }}>{".".repeat(Math.floor(frame / period) % count)}</span>;
};
