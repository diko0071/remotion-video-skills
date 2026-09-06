import React from "react";
import "./chat-artifact.css";

export const PLOT_W = 1180;
export const PLOT_H = 334;
export const PLOT_LEFT = 54;
export const PLOT_RIGHT = 1110;
export const PLOT_TOP = 18;
export const PLOT_BOTTOM = 286;
export const CLICKS_MAX = 1600;
export const IMPR_MAX = 44000;
export const CLICKS_TICKS = [0, 400, 800, 1200, 1600];
export const IMPR_TICKS = ["0", "11K", "22K", "33K", "44K"];
export const GRID_ROWS = [0, 0.25, 0.5, 0.75, 1];

export const TrendPlot: React.FC<{
  clicks: number[];
  impressions: number[];
  labels: string[];
  style?: React.CSSProperties;
}> = ({ clicks, impressions, labels, style }) => {
  const xAt = (i: number) =>
    PLOT_LEFT + (i / (clicks.length - 1)) * (PLOT_RIGHT - PLOT_LEFT);
  const yFor = (value: number, max: number) =>
    PLOT_BOTTOM - (value / max) * (PLOT_BOTTOM - PLOT_TOP);
  const linePath = (values: number[], max: number) =>
    values
      .map(
        (v, i) =>
          `${i === 0 ? "M" : "L"}${xAt(i).toFixed(1)} ${yFor(v, max).toFixed(1)}`,
      )
      .join(" ");

  return (
    <svg
      className="ca-chart"
      viewBox={`0 0 ${PLOT_W} ${PLOT_H}`}
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      {GRID_ROWS.map((r) => {
        const y = PLOT_BOTTOM - r * (PLOT_BOTTOM - PLOT_TOP);
        return (
          <line
            key={r}
            x1={PLOT_LEFT}
            y1={y}
            x2={PLOT_RIGHT}
            y2={y}
            stroke="var(--rd-grid)"
            strokeWidth="1"
          />
        );
      })}
      {GRID_ROWS.map((r) => {
        const y = PLOT_BOTTOM - r * (PLOT_BOTTOM - PLOT_TOP);
        return (
          <text
            key={r}
            className="ca-axis"
            x={PLOT_LEFT - 12}
            y={y + 4}
            textAnchor="end"
            fill="#77716a"
            fontSize="12"
            fontWeight="600"
          >
            {CLICKS_TICKS[GRID_ROWS.indexOf(r)]}
          </text>
        );
      })}
      {GRID_ROWS.map((r) => {
        const y = PLOT_BOTTOM - r * (PLOT_BOTTOM - PLOT_TOP);
        return (
          <text
            key={r}
            className="ca-axis"
            x={PLOT_RIGHT + 12}
            y={y + 4}
            textAnchor="start"
            fill="#9a938a"
            fontSize="12"
            fontWeight="600"
          >
            {IMPR_TICKS[GRID_ROWS.indexOf(r)]}
          </text>
        );
      })}
      <path
        d={linePath(impressions, IMPR_MAX)}
        fill="none"
        stroke="var(--rd-chart-2)"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d={linePath(clicks, CLICKS_MAX)}
        fill="none"
        stroke="var(--rd-chart-1)"
        strokeWidth="2.4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {labels.map((label, i) => (
        <text
          key={label}
          className="ca-axis"
          x={xAt(i * 2)}
          y={PLOT_BOTTOM + 26}
          textAnchor="middle"
          fill="#77716a"
          fontSize="12"
          fontWeight="600"
        >
          {label}
        </text>
      ))}
    </svg>
  );
};
