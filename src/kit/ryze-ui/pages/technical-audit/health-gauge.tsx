import React from "react";
import "./technical-audit.css";

const TICKS = 44;
const RADIUS = 70;
const TICK_LENGTH = 16;
const TICK_WIDTH = 3.2;
const CENTER_X = 90;
const CENTER_Y = 88;
const INACTIVE_OPACITY = 0.18;

export const HealthGauge: React.FC<{ value: number; progress?: number }> = ({
  value,
  progress = 1,
}) => {
  const shown = Math.round(value * progress);
  const active = Math.round((shown / 100) * TICKS);
  return (
    <svg
      viewBox="0 0 180 100"
      width={180}
      height={100}
      preserveAspectRatio="xMidYMid meet"
      className="ta-gauge"
      style={{ height: "auto" }}
    >
      {Array.from({ length: TICKS }, (_, i) => {
        const angle = Math.PI * (1 - i / (TICKS - 1));
        const inner = RADIUS - TICK_LENGTH;
        const fraction = i / (TICKS - 1);
        return (
          <line
            key={i}
            x1={CENTER_X + inner * Math.cos(angle)}
            y1={CENTER_Y - inner * Math.sin(angle)}
            x2={CENTER_X + RADIUS * Math.cos(angle)}
            y2={CENTER_Y - RADIUS * Math.sin(angle)}
            stroke={`hsl(${Math.round(fraction * 130)} 80% 48%)`}
            strokeWidth={TICK_WIDTH}
            strokeLinecap="round"
            opacity={i < active ? 1 : INACTIVE_OPACITY}
          />
        );
      })}
      <text x="90" y="86" textAnchor="middle" className="ta-gauge-num">
        <tspan className="big">{shown}</tspan>
        <tspan className="small">/100</tspan>
      </text>
    </svg>
  );
};
