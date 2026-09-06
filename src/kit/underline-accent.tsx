import React from "react";
import { useSpringAt, SPRINGS } from "../core/motion";

export const UnderlineAccent: React.FC<{
  children: React.ReactNode;
  color?: string;
  drawAt?: number;
  thickness?: number;
}> = ({ children, color = "#C15F3C", drawAt = 18, thickness = 5 }) => {
  const p = useSpringAt(drawAt, SPRINGS.smooth, 26);
  return (
    <span style={{ position: "relative", display: "inline-block", color }}>
      {children}
      <svg
        viewBox="0 0 200 14"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          left: "-2%",
          bottom: -10,
          width: "104%",
          height: 14,
          overflow: "visible",
        }}
      >
        <path
          d="M4 9 C 40 5, 90 4, 130 6 C 160 7.5, 182 8.5, 196 7"
          fill="none"
          stroke={color}
          strokeWidth={thickness}
          strokeLinecap="round"
          strokeDasharray={200}
          strokeDashoffset={200 - 200 * p}
        />
      </svg>
    </span>
  );
};
