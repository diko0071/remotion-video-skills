import React from "react";
import "./usage.css";
import { USAGE_DAYS } from "./data";
import { UsageDay } from "./types";

export const CHART_W = 1368;
export const CHART_H = 220;
export const AXIS_H = 30;
export const PLOT_H = CHART_H - AXIS_H - 4;
export const Y_MAX = 340;
export const GRID = [0, 85, 170, 255, 340];

export const UsageBar: React.FC<{
  index: number;
  count: number;
  slot: number;
  barW: number;
}> = ({ index, count, slot, barW }) => {
  const h = (count / Y_MAX) * PLOT_H;
  const x = index * slot + (slot - barW) / 2;
  const y = 4 + PLOT_H - h;
  const r = Math.min(2, barW / 2, h);
  return (
    <path
      d={`M${x},${y + h}L${x},${y + r}Q${x},${y} ${x + r},${y}L${x + barW - r},${y}Q${x + barW},${y} ${x + barW},${y + r}L${x + barW},${y + h}Z`}
      fill="#334155"
    />
  );
};

export const UsageChartCard: React.FC<{
  days?: UsageDay[];
  title?: string;
  style?: React.CSSProperties;
}> = ({ days = USAGE_DAYS, title = "Credits by day", style }) => {
  const slot = CHART_W / days.length;
  const barW = slot * 0.9;
  return (
    <div className="pg-card us-chart-card" style={style}>
      <div className="us-cap">{title}</div>
      <div className="us-chart">
        <svg viewBox={`0 0 ${CHART_W} ${CHART_H}`}>
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
          {days.map((d, i) => (
            <UsageBar
              key={d.date}
              index={i}
              count={d.count}
              slot={slot}
              barW={barW}
            />
          ))}
          {days.map((d, i) => (
            <text
              key={`l-${d.date}`}
              x={i * slot + slot / 2}
              y={4 + PLOT_H + 15}
              textAnchor="middle"
              fontSize={11}
              fill="var(--muted-foreground)"
            >
              {d.date}
            </text>
          ))}
        </svg>
      </div>
    </div>
  );
};
