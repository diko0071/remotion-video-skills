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

export const StackedAreas: React.FC<{
  title: string;
  data: number[][];
  axis: string[];
  labels?: string[];
  style?: React.CSSProperties;
}> = ({ title, data, axis, labels = DATE_LABELS, style }) => {
  const max = Math.max(...data.map((d) => d[0] + d[1] + d[2])) * 1.12;
  const px = (i: number) =>
    STACK_L + (i / (data.length - 1)) * (STACK_W - STACK_L - STACK_R);
  const py = (v: number) =>
    STACK_H - STACK_B - (v / max) * (STACK_H - STACK_T - STACK_B);
  const cumulative = data.map((d) => [d[0], d[0] + d[1], d[0] + d[1] + d[2]]);
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
          {[2, 1, 0].map((band) => {
            const upper = cumulative.map(
              (c, i) => `${px(i).toFixed(1)},${py(c[band]).toFixed(1)}`,
            );
            const base = `${px(data.length - 1).toFixed(1)},${(STACK_H - STACK_B).toFixed(1)} ${px(0).toFixed(1)},${(STACK_H - STACK_B).toFixed(1)}`;
            return (
              <polygon
                key={PLATFORM_LEGEND[band].label}
                points={`${upper.join(" ")} ${base}`}
                fill={PLATFORM_COLORS[band]}
                fillOpacity={0.45}
                stroke={PLATFORM_COLORS[band]}
                strokeWidth={1.2}
              />
            );
          })}
          {AXIS_TICK_INDEXES.map((i) => (
            <text
              key={labels[i]}
              x={px(i)}
              y={STACK_H - 7}
              className="pa-axis-t"
              textAnchor={i === 29 ? "end" : "middle"}
            >
              {labels[i]}
            </text>
          ))}
        </svg>
      </div>
    </div>
  );
};
