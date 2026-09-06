import React from "react";
import "./seo-dashboard.css";

export const Donut: React.FC<{
  size: number;
  thickness: number;
  data: { label: string; value: number; color: string }[];
  center: string;
  sub: string;
  style?: React.CSSProperties;
}> = ({ size, thickness, data, center, sub, style }) => {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  let offset = 0;
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={style}
    >
      <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
        {data.map((d) => {
          const len = (d.value / total) * c;
          const dash = `${Math.max(len - 2, 0)} ${c - Math.max(len - 2, 0)}`;
          const el = (
            <circle
              key={d.label}
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={d.color}
              strokeWidth={thickness}
              strokeDasharray={dash}
              strokeDashoffset={-offset}
            />
          );
          offset += len;
          return el;
        })}
      </g>
      <text
        x={size / 2}
        y={size / 2 + 2}
        textAnchor="middle"
        className="sd-donut-center"
      >
        {center}
      </text>
      <text
        x={size / 2}
        y={size / 2 + 22}
        textAnchor="middle"
        className="sd-donut-sub"
      >
        {sub}
      </text>
    </svg>
  );
};
