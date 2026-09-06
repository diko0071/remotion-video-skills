import React from "react";
import "./seo-dashboard.css";
import { CardHead } from "./card-head";
import { Legend } from "./legend";
import { LineTrend } from "./line-trend";
import { NamedSeries } from "./types";

export const VisibilityTrendCard: React.FC<{
  title?: string;
  subtitle?: string;
  labels: string[];
  series: NamedSeries[];
  max: number;
  style?: React.CSSProperties;
}> = ({
  title = "Visibility Over Time",
  subtitle = "Share of answers naming each brand, per run day.",
  labels,
  series,
  max,
  style,
}) => (
  <div className="sd-card" style={style}>
    <CardHead
      title={title}
      subtitle={subtitle}
      right={
        <Legend
          items={series
            .map((s) => ({ label: s.name, color: s.color }))
            .reverse()}
        />
      }
    />
    <div className="sd-card-body">
      <LineTrend labels={labels} series={series} max={max} height={260} />
    </div>
  </div>
);
