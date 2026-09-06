import React from "react";
import "./seo-dashboard.css";
import { CH, CW, PB, PL, PR, gridLines, linePath } from "./chart-frame";
import { NamedSeries } from "./types";

export const AreaTrend: React.FC<{
  labels: string[];
  left: NamedSeries;
  right: NamedSeries;
  leftTicks: string[];
  rightTicks: string[];
  height: number;
  style?: React.CSSProperties;
}> = ({ labels, left, right, leftTicks, rightTicks, style }) => {
  const lMax = Number(leftTicks[0].replace(/[^0-9.]/g, ""));
  const rMax = Number(rightTicks[0].replace(/[^0-9.]/g, ""));
  const area = (values: number[], max: number) => {
    const d = linePath(values, 0, max, CH);
    return `${d} L${CW - PR},${CH - PB} L${PL},${CH - PB} Z`;
  };
  return (
    <svg
      width="100%"
      viewBox={`0 0 ${CW} ${CH}`}
      style={{ display: "block", width: "100%", height: "auto", ...style }}
    >
      {gridLines(leftTicks, rightTicks)}
      <path
        d={area(right.values, rMax)}
        fill={right.color}
        fillOpacity={0.14}
      />
      <path d={area(left.values, lMax)} fill={left.color} fillOpacity={0.16} />
      <path
        d={linePath(right.values, 0, rMax, CH)}
        fill="none"
        stroke={right.color}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <path
        d={linePath(left.values, 0, lMax, CH)}
        fill="none"
        stroke={left.color}
        strokeWidth={2}
        strokeLinecap="round"
      />
      {labels.map((label, i) =>
        i % 2 === 0 ? (
          <text
            key={label}
            x={PL + (i / (labels.length - 1)) * (CW - PL - PR)}
            y={CH - 8}
            className="sd-axis"
            textAnchor="middle"
          >
            {label}
          </text>
        ) : null,
      )}
    </svg>
  );
};
