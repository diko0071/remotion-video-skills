import React from "react";
import "./chat-thread.css";
import { ChartBar, ChartBarGeometry } from "./types";

export const CHART_TOP = 18;
export const CHART_BOTTOM = 186;
export const CHART_MAX = 2000;
export const BAR_WIDTH = 20;
export const FIRST_X = 88.5;
export const STEP_X = 105;

export const barGeometry = (bars: ChartBar[]): ChartBarGeometry[] =>
  bars.map((bar, i) => {
    const height = (bar.value / CHART_MAX) * (CHART_BOTTOM - CHART_TOP);
    return {
      ...bar,
      x: FIRST_X + i * STEP_X,
      y: CHART_BOTTOM - height,
      h: height,
    };
  });

export const ClicksChart: React.FC<{
  bars: ChartBar[];
  style?: React.CSSProperties;
}> = ({ bars, style }) => {
  const geometry = barGeometry(bars);
  return (
    <svg
      className="chart-svg ct-chart"
      viewBox="0 0 688 214"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <g stroke="oklch(0.91 0.015 80)" strokeOpacity="0.6">
        {[186, 144, 102, 60, 18].map((y) => (
          <line key={y} x1="46" y1={y} x2="676" y2={y} />
        ))}
      </g>
      <g textAnchor="end">
        {[
          [148, "500"],
          [106, "1K"],
          [64, "1.5K"],
          [22, "2K"],
        ].map(([y, label]) => (
          <text key={label} className="axis-label" x="40" y={y}>
            {label}
          </text>
        ))}
      </g>
      <g fill="oklch(0.96 0.012 80)" fillOpacity="0.55">
        {geometry.map((b) => (
          <rect
            key={b.label}
            x={b.x}
            y={CHART_TOP}
            width={BAR_WIDTH}
            height={CHART_BOTTOM - CHART_TOP}
            rx="2"
          />
        ))}
      </g>
      <g>
        {geometry.map((b) => (
          <rect
            key={b.label}
            x={b.x}
            y={b.y}
            width={BAR_WIDTH}
            height={b.h}
            rx="2"
            fill={b.color}
          />
        ))}
      </g>
      <g textAnchor="middle">
        {geometry.map((b) => (
          <text
            key={b.label}
            className="value-label"
            x={b.x + BAR_WIDTH / 2}
            y={b.y - 8}
          >
            {b.display}
          </text>
        ))}
      </g>
      <g textAnchor="middle">
        {geometry.map((b) => (
          <text
            key={b.label}
            className="axis-label"
            x={b.x + BAR_WIDTH / 2}
            y="206"
          >
            {b.label}
          </text>
        ))}
      </g>
    </svg>
  );
};
