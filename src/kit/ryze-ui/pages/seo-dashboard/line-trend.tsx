import React from "react";
import "./seo-dashboard.css";
import { CH, CW, PB, PL, PR, PT, gridLines, linePath } from "./chart-frame";
import { NamedSeries } from "./types";

export const LineTrend: React.FC<{
  labels: string[];
  series: NamedSeries[];
  max: number;
  height: number;
  style?: React.CSSProperties;
}> = ({ labels, series, max, style }) => {
  const ticks = [max, max * 0.75, max * 0.5, max * 0.25, 0].map(
    (v) => `${Math.round(v)}%`,
  );
  return (
    <svg
      width="100%"
      viewBox={`0 0 ${CW} ${CH}`}
      style={{ display: "block", width: "100%", height: "auto", ...style }}
    >
      {gridLines(ticks)}
      {series.map((s) => (
        <g key={s.name}>
          <path
            d={linePath(s.values, 0, max, CH)}
            fill="none"
            stroke={s.color}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {s.values.map((v, i) => (
            <circle
              key={labels[i]}
              cx={PL + (i / (s.values.length - 1)) * (CW - PL - PR)}
              cy={CH - PB - (v / max) * (CH - PT - PB)}
              r={2.6}
              fill={s.color}
            />
          ))}
        </g>
      ))}
      {labels.map((label, i) => (
        <text
          key={label}
          x={PL + (i / (labels.length - 1)) * (CW - PL - PR)}
          y={CH - 8}
          className="sd-axis"
          textAnchor="middle"
        >
          {label}
        </text>
      ))}
    </svg>
  );
};
