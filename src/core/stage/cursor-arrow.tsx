import React from "react";

export const CursorArrow: React.FC<{ width?: number; height?: number; fill?: string; stroke?: string }> = ({ width = 22, height = 30, fill = "#FFFFFF", stroke = "#141413" }) => (
  <svg width={width} height={height} viewBox="0 0 22 30" fill="none">
    <path
      d="M2 2 L2 24 L8.2 18.6 L12 27.4 L15.6 25.8 L11.8 17.2 L20 16.4 Z"
      fill={fill}
      stroke={stroke}
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </svg>
);
