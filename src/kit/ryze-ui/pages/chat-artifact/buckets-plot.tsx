import React from "react";
import "./chat-artifact.css";

export const BUCKET_COLORS = [
  "var(--rd-chart-1)",
  "var(--rd-chart-2)",
  "var(--rd-chart-3)",
  "var(--rd-chart-4)",
];
export const BUCKET_W = 548;
export const BUCKET_H = 470;
export const BUCKET_BASE = 440;
export const BUCKET_TOP = 16;
export const BUCKET_MAX = 900;
export const BUCKET_LABELS = [
  "W1",
  "W2",
  "W3",
  "W4",
  "W5",
  "W6",
  "W7",
  "W8",
  "W9",
  "W10",
  "W11",
  "W12",
];

export const BucketBar: React.FC<{
  week: number[];
  index: number;
  count: number;
}> = ({ week, index, count }) => {
  const barWidth = 28;
  const step = (BUCKET_W - 24) / count;
  const x = 12 + index * step + (step - barWidth) / 2;
  const total = week.reduce((a, b) => a + b, 0);
  const height = (total / BUCKET_MAX) * (BUCKET_BASE - BUCKET_TOP);
  let cursor = BUCKET_BASE - height;
  const rects = week.map((value, k) => {
    const h = (value / total) * height;
    const y = cursor;
    cursor += h;
    return (
      <rect
        key={k}
        x={x}
        y={y}
        width={barWidth}
        height={h}
        fill={BUCKET_COLORS[k]}
      />
    );
  });
  return (
    <g>
      {rects}
      <text
        x={x + barWidth / 2}
        y={BUCKET_BASE + 24}
        textAnchor="middle"
        fill="#77716a"
        fontSize="11"
        fontWeight="600"
      >
        {BUCKET_LABELS[index]}
      </text>
    </g>
  );
};

export const BucketsPlot: React.FC<{
  weeks: number[][];
  style?: React.CSSProperties;
}> = ({ weeks, style }) => (
  <svg
    className="ca-chart"
    viewBox={`0 0 ${BUCKET_W} ${BUCKET_H}`}
    xmlns="http://www.w3.org/2000/svg"
    style={style}
  >
    {weeks.map((week, i) => (
      <BucketBar
        key={BUCKET_LABELS[i]}
        week={week}
        index={i}
        count={weeks.length}
      />
    ))}
    <line
      x1="0"
      y1={BUCKET_BASE}
      x2={BUCKET_W}
      y2={BUCKET_BASE}
      stroke="var(--rd-axis-line)"
      strokeWidth="1"
    />
  </svg>
);
