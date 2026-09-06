import React from "react";
import "./seo-dashboard.css";
import { CH, CW, PB, PL, PR, PT, gridLines } from "./chart-frame";

export const GroupedBars: React.FC<{
  labels: string[];
  left: number[];
  right: number[];
  leftColor: string;
  rightColor: string;
  leftTicks: string[];
  rightTicks: string[];
  height: number;
  style?: React.CSSProperties;
}> = ({
  labels,
  left,
  right,
  leftColor,
  rightColor,
  leftTicks,
  rightTicks,
  style,
}) => {
  const leftMax =
    Number(leftTicks[0].replace(/[^0-9.]/g, "")) *
    (leftTicks[0].includes("k") ? 1000 : 1);
  const rightMax =
    Number(rightTicks[0].replace(/[^0-9.]/g, "")) *
    (rightTicks[0].includes("k") ? 1000 : 1);
  const slot = (CW - PL - PR) / labels.length;
  const bw = Math.min(18, slot * 0.32);
  return (
    <svg
      width="100%"
      viewBox={`0 0 ${CW} ${CH}`}
      style={{ display: "block", width: "100%", height: "auto", ...style }}
    >
      {gridLines(leftTicks, rightTicks)}
      {labels.map((label, i) => {
        const x = PL + i * slot + slot / 2;
        const lh = (left[i] / leftMax) * (CH - PT - PB);
        const rh = (right[i] / rightMax) * (CH - PT - PB);
        return (
          <g key={label}>
            <rect
              x={x - bw - 1.5}
              y={CH - PB - lh}
              width={bw}
              height={lh}
              rx={6}
              fill={leftColor}
            />
            <rect
              x={x + 1.5}
              y={CH - PB - rh}
              width={bw}
              height={rh}
              rx={6}
              fill={rightColor}
            />
            <text x={x} y={CH - 8} className="sd-axis" textAnchor="middle">
              {label}
            </text>
          </g>
        );
      })}
    </svg>
  );
};
