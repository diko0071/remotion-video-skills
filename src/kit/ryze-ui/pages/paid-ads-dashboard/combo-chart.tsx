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
import { DATE_LABELS } from "./data";

export const ComboChart: React.FC<{
  title: string;
  barLabel: string;
  lineLabel: string;
  bars: number[];
  line: number[];
  axis: string[];
  labels?: string[];
  style?: React.CSSProperties;
}> = ({
  title,
  barLabel,
  lineLabel,
  bars,
  line,
  axis,
  labels = DATE_LABELS,
  style,
}) => {
  const barMax = Math.max(...bars) * 1.12;
  const lineMin = Math.min(...line) * 0.9;
  const lineMax = Math.max(...line) * 1.08;
  const slot = (CHART_W - PLOT_L - PLOT_R) / bars.length;
  return (
    <div className="pa-card" style={style}>
      <div className="pa-card-head">
        <div className="pa-card-title">{title}</div>
        <div className="pa-legend">
          <span>
            <i className="soft" />
            {barLabel}
          </span>
          <span>
            <i className="line" />
            {lineLabel}
          </span>
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
                  {axis[Math.round(t * 4)]}
                </text>
              </g>
            );
          })}
          {bars.map((v, i) => {
            const h = (v / barMax) * (CHART_H - PLOT_T - PLOT_B);
            const w = Math.min(44, slot * 0.76);
            const x = PLOT_L + i * slot + (slot - w) / 2;
            const y = CHART_H - PLOT_B - h;
            const r = Math.min(7, w / 2, h);
            return (
              <path
                key={labels[i]}
                d={`M${x},${y + h} L${x},${y + r} Q${x},${y} ${x + r},${y} L${x + w - r},${y} Q${x + w},${y} ${x + w},${y + r} L${x + w},${y + h} Z`}
                fill="#94A3B8"
              />
            );
          })}
          <path
            d={linePath(line, lineMin, lineMax)}
            fill="none"
            stroke="#0F172A"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {AXIS_TICK_INDEXES.map((i) => (
            <text
              key={labels[i]}
              x={PLOT_L + i * slot + slot / 2}
              y={CHART_H - 6}
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
