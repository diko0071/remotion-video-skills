import React from "react";
import "./seo-dashboard.css";
import { CH, CW, PB, PL, PR, PT, gridLines, linePath } from "./chart-frame";
import { SCALE } from "./data";

export const ComboChart: React.FC<{
  labels: string[];
  bars: number[];
  line: number[];
  barTicks: string[];
  lineTicks: string[];
  height: number;
  style?: React.CSSProperties;
}> = ({ labels, bars, line, barTicks, lineTicks, style }) => {
  const barMax =
    Number(barTicks[0].replace(/[^0-9.]/g, "")) *
    (barTicks[0].includes("k") ? 1000 : 1);
  const lineMax = Number(lineTicks[0].replace(/[^0-9.]/g, ""));
  const slot = (CW - PL - PR) / labels.length;
  const bw = Math.min(20, slot * 0.55);
  return (
    <svg
      width="100%"
      viewBox={`0 0 ${CW} ${CH}`}
      style={{ display: "block", width: "100%", height: "auto", ...style }}
    >
      {gridLines(barTicks, lineTicks)}
      {labels.map((label, i) => {
        const h = (bars[i] / barMax) * (CH - PT - PB);
        return (
          <rect
            key={label}
            x={PL + i * slot + (slot - bw) / 2}
            y={CH - PB - h}
            width={bw}
            height={h}
            rx={3}
            fill={SCALE[3]}
          />
        );
      })}
      <path
        d={linePath(line, 0, lineMax, CH)}
        fill="none"
        stroke={SCALE[0]}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {labels.map((label, i) =>
        i % 2 === 0 ? (
          <text
            key={label}
            x={PL + i * slot + slot / 2}
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
