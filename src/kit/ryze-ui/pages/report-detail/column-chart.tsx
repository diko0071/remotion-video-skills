import React from "react";
import "./report-detail.css";
import { ReportMonth } from "./types";

const CHART_W = 1136;
const CHART_H = 240;
const AXIS_H = 30;
const PLOT_H = CHART_H - AXIS_H - 4;
const Y_MAX = 200;
const GRID = [0, 50, 100, 150, 200];

export const ColumnChart: React.FC<{
  months: ReportMonth[];
  style?: React.CSSProperties;
}> = ({ months, style }) => {
  const slot = CHART_W / months.length;
  const barW = slot * 0.9;
  return (
    <svg
      viewBox={`0 0 ${CHART_W} ${CHART_H}`}
      className="rd-chart-svg"
      style={style}
    >
      {GRID.map((g) => {
        const y = 4 + PLOT_H - (g / Y_MAX) * PLOT_H;
        return (
          <line
            key={g}
            x1={0}
            x2={CHART_W}
            y1={y}
            y2={y}
            stroke="var(--border)"
            strokeWidth={1}
          />
        );
      })}
      {months.map((m, i) => {
        const h = (m.value / Y_MAX) * PLOT_H;
        const x = i * slot + (slot - barW) / 2;
        const y = 4 + PLOT_H - h;
        const r = Math.min(2, barW / 2, h);
        return (
          <path
            key={m.label}
            d={`M${x},${y + h}L${x},${y + r}Q${x},${y} ${x + r},${y}L${x + barW - r},${y}Q${x + barW},${y} ${x + barW},${y + r}L${x + barW},${y + h}Z`}
            fill="#334155"
          />
        );
      })}
      {months.map((m, i) => (
        <text
          key={m.label}
          x={i * slot + slot / 2}
          y={4 + PLOT_H + 15}
          textAnchor="middle"
          fontSize={11}
          fill="var(--muted-foreground)"
        >
          {m.label}
        </text>
      ))}
    </svg>
  );
};
