import React from "react";
import "./seo-dashboard.css";
import { CH, PB, PL, PR, PT, gridLines } from "./chart-frame";
import { ChartSeries } from "./types";

export const StackedBars: React.FC<{
  labels: string[];
  series: ChartSeries[];
  ticks: string[];
  height: number;
  vw: number;
  style?: React.CSSProperties;
}> = ({ labels, series, ticks, vw, style }) => {
  const max = Number(ticks[0].replace(/[^0-9.]/g, ""));
  const slot = (vw - PL - PR) / labels.length;
  const bw = Math.min(30, slot * 0.6);
  return (
    <svg
      width="100%"
      viewBox={`0 0 ${vw} ${CH}`}
      style={{ display: "block", width: "100%", height: "auto", ...style }}
    >
      {gridLines(ticks, undefined, vw)}
      {labels.map((label, i) => {
        const x = PL + i * slot + (slot - bw) / 2;
        let acc = 0;
        return (
          <g key={label}>
            {series.map((s) => {
              const h = (s.values[i] / max) * (CH - PT - PB);
              const y = CH - PB - acc - h;
              acc += h + 1;
              return (
                <rect
                  key={s.label}
                  x={x}
                  y={y}
                  width={bw}
                  height={Math.max(h - 1, 0)}
                  rx={3}
                  fill={s.color}
                />
              );
            })}
            <text
              x={x + bw / 2}
              y={CH - 8}
              className="sd-axis"
              textAnchor="middle"
            >
              {label}
            </text>
          </g>
        );
      })}
    </svg>
  );
};
