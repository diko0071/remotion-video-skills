import React from "react";

export const OrbitMark: React.FC<{ size: number; color?: string; style?: React.CSSProperties }> = ({ size, color = "#111", style }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{ display: "block", ...style }}>
    <circle cx={46} cy={50} r={30} fill="none" stroke={color} strokeWidth={13} />
    <circle cx={80} cy={22} r={11} fill={color} />
  </svg>
);
