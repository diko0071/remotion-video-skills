import React from "react";
import "./seo-dashboard.css";
import { KpiCard } from "./kpi-card";
import type { KpiSpec } from "./types";

export const KpiGrid: React.FC<{
  items: KpiSpec[];
  style?: React.CSSProperties;
}> = ({ items, style }) => (
  <div className="sd-kpis" style={style}>
    {items.map((k) => (
      <KpiCard
        key={k.label}
        label={k.label}
        value={k.value}
        sub={k.sub}
        unit={k.unit}
        delta={k.delta}
        tone={k.tone}
      />
    ))}
  </div>
);
