import React from "react";
import { useCurrentFrame } from "remotion";

export const CheckGlyph: React.FC<{ size: number; color: string; stroke?: number }> = ({ size, color, stroke = 3 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M20 6 9 17l-5-5" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ChevronDown: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="m6 9 6 6 6-6" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Spinner: React.FC<{ size: number; color: string }> = ({ size, color }) => {
  const f = useCurrentFrame();
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ transform: `rotate(${f * 14}deg)`, flex: "none" }}>
      <path d="M21 12a9 9 0 1 1-6.219-8.56" stroke={color} strokeWidth={2.4} strokeLinecap="round" />
    </svg>
  );
};
