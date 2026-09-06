import React from "react";
import "./technical-audit.css";

const SIZE = 112;
const STROKE_WIDTH = 9;
const RADIUS = SIZE / 2 - STROKE_WIDTH - 1;
const TRACK = "#EEF1F5";

export const AuditScoreRing: React.FC<{
  value: number;
  tone: string;
  stroke?: string;
  label: string;
  sub: string;
  progress?: number;
  displayValue?: number;
}> = ({ value, tone, stroke, label, sub, progress = 1, displayValue }) => {
  const c = 2 * Math.PI * RADIUS;
  const shown = displayValue ?? value;
  return (
    <div className="ta-score">
      <span className="ta-score-label">{label}</span>
      <div className="ta-ring-wrap">
        <div className="ta-ring-box">
          <svg viewBox={`0 0 ${SIZE} ${SIZE}`} width={SIZE} height={SIZE} className="ta-ring">
            <circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              fill="none"
              stroke={TRACK}
              strokeWidth={STROKE_WIDTH}
            />
            <circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              fill="none"
              stroke={stroke ?? tone}
              strokeWidth={STROKE_WIDTH}
              strokeLinecap="round"
              strokeDasharray={c}
              strokeDashoffset={c - (c * value * progress) / 100}
            />
          </svg>
          <span className="ta-ring-num" style={{ color: tone }}>
            {shown}
          </span>
        </div>
      </div>
      <span className="ta-score-sub">{sub}</span>
    </div>
  );
};
