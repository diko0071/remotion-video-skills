import React from "react";
import "./seo-dashboard.css";
import { Delta } from "./delta";

export const KpiCard: React.FC<{
  label: string;
  value: string;
  sub?: string;
  unit?: string;
  delta?: number;
  tone?: string;
  style?: React.CSSProperties;
}> = ({ label, value, sub, unit, delta, tone, style }) => (
  <div className="sd-kpi" style={style}>
    <div className="sd-kpi-top">
      <span className="sd-kpi-label">{label}</span>
      {delta === undefined ? null : <Delta value={delta} />}
    </div>
    <div className={`sd-kpi-val${tone ? ` ${tone}` : ""}`}>
      {value}
      {unit ? <span className="unit">{unit}</span> : null}
    </div>
    {sub ? <div className="sd-kpi-sub">{sub}</div> : null}
  </div>
);
