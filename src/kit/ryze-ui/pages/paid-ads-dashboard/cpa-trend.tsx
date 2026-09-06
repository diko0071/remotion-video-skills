import React from "react";
import "./paid-ads-dashboard.css";
import {
  AXIS_STOPS,
  AXIS_TICK_INDEXES,
  CHART_H,
  CHART_W,
  PLOT_B,
  PLOT_L,
  PLOT_R,
  PLOT_T,
  linePath,
} from "./chart-geometry";
import { DATE_LABELS, ROLLING_CPA } from "./data";

export const CpaTrend: React.FC<{
  title?: string;
  sub?: string;
  series?: number[];
  labels?: string[];
  style?: React.CSSProperties;
}> = ({
  title = "Cost per conversion",
  sub = "Rolling 7-day CPA · 30 days",
  series = ROLLING_CPA,
  labels = DATE_LABELS,
  style,
}) => {
  const min = Math.min(...series) * 0.92;
  const max = Math.max(...series) * 1.06;
  return (
    <div className="pa-card" style={style}>
      <div className="pa-card-head">
        <div>
          <div className="pa-card-title">{title}</div>
          <div className="pa-card-sub">{sub}</div>
        </div>
      </div>
      <div className="pa-chart">
        <svg
          width="100%"
          viewBox={`0 0 ${CHART_W} ${CHART_H}`}
          style={{ display: "block" }}
        >
          {AXIS_STOPS.map((t) => {
            const y = PLOT_T + t * (CHART_H - PLOT_T - PLOT_B);
            return (
              <g key={t}>
                <line
                  x1={PLOT_L}
                  y1={y}
                  x2={CHART_W - PLOT_R}
                  y2={y}
                  stroke="var(--border)"
                  strokeOpacity={0.6}
                />
                <text
                  x={PLOT_L - 8}
                  y={y + 3}
                  className="pa-axis-t"
                  textAnchor="end"
                >
                  {`$${Math.round(max - t * (max - min))}`}
                </text>
              </g>
            );
          })}
          <path
            d={linePath(series, min, max)}
            fill="none"
            stroke="#0F172A"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {AXIS_TICK_INDEXES.map((i) => (
            <text
              key={labels[i]}
              x={PLOT_L + (i / 29) * (CHART_W - PLOT_L - PLOT_R)}
              y={CHART_H - 6}
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
