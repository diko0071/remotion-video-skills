import React from "react";
import "./content-plan.css";

export const sparkPath = (series: number[]) => {
  const max = Math.max(...series);
  const min = Math.min(...series);
  const span = max - min || 1;
  return series
    .map((v, i) => {
      const x = (i / (series.length - 1)) * 96 + 2;
      const y = 24 - ((v - min) / span) * 20;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
};

export const Spark: React.FC<{
  series: number[];
  up: boolean;
  style?: React.CSSProperties;
}> = ({ series, up, style }) => (
  <svg
    viewBox="0 0 100 26"
    className={`cp-spark ${up ? "up" : "down"}`}
    style={style}
  >
    <path
      d={sparkPath(series)}
      fill="none"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
