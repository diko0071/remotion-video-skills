import React from "react";
import "./paid-ads-dashboard.css";
import {
  AXIS_STOPS,
  AXIS_TICK_INDEXES,
  STACK_B,
  STACK_H,
  STACK_L,
  STACK_R,
  STACK_T,
  STACK_W,
} from "./chart-geometry";
import { DATE_LABELS, PLATFORM_COLORS, PLATFORM_LEGEND } from "./data";
import { PlatformLegend } from "./platform-legend";

export const StackedBars: React.FC<{
  title: string;
  data: number[][];
  axis: string[];
  labels?: string[];
  style?: React.CSSProperties;
}> = ({ title, data, axis, labels = DATE_LABELS, style }) => {
  const max = Math.max(...data.map((d) => d[0] + d[1] + d[2])) * 1.15;
  const slot = (STACK_W - STACK_L - STACK_R) / data.length;
  return (
    <div className="pa-card" style={style}>
      <div className="pa-card-head">
        <div className="pa-card-title">{title}</div>
        <PlatformLegend />
      </div>
      <div className="pa-chart">
        <svg
          width="100%"
          viewBox={`0 0 ${STACK_W} ${STACK_H}`}
          style={{ display: "block" }}
        >
          {AXIS_STOPS.map((t) => {
            const y = STACK_T + t * (STACK_H - STACK_T - STACK_B);
            return (
              <g key={t}>
                <line
                  x1={STACK_L}
                  y1={y}
                  x2={STACK_W - STACK_R}
                  y2={y}
                  stroke="var(--border)"
                  strokeOpacity={0.6}
                />
                <text
                  x={STACK_L - 8}
                  y={y + 3}
                  className="pa-axis-t"
                  textAnchor="end"
                >
                  {axis[Math.round(t * 4)]}
                </text>
              </g>
            );
          })}
          {data.map((day, i) => {
            const w = Math.min(10, slot * 0.5);
            const x = STACK_L + i * slot + (slot - w) / 2;
            let acc = 0;
            return (
              <g key={labels[i]}>
                {day.map((v, si) => {
                  const h = (v / max) * (STACK_H - STACK_T - STACK_B);
                  const y = STACK_H - STACK_B - acc - h;
                  acc += h;
                  return (
                    <rect
                      key={PLATFORM_LEGEND[si].label}
                      x={x}
                      y={y}
                      width={w}
                      height={h}
                      fill={PLATFORM_COLORS[si]}
                      opacity={0.85}
                    />
                  );
                })}
              </g>
            );
          })}
          {AXIS_TICK_INDEXES.map((i) => (
            <text
              key={labels[i]}
              x={STACK_L + i * slot + slot / 2}
              y={STACK_H - 7}
              className="pa-axis-t"
              textAnchor="middle"
            >
              {labels[i]}
            </text>
          ))}
        </svg>
      </div>
    </div>
  );
};
