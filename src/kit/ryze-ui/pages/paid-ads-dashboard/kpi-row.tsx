import React from "react";
import "./paid-ads-dashboard.css";
import { Delta } from "./delta";
import { PaidAdsKpi } from "./types";

export const KpiRow: React.FC<{
  items: PaidAdsKpi[];
  style?: React.CSSProperties;
}> = ({ items, style }) => (
  <div className="pa-kpis" style={style}>
    {items.map((kpi) => (
      <div className="pa-kpi" key={kpi.label}>
        <div className="pa-kpi-top">
          <span className="pa-kpi-label">{kpi.label}</span>
          {kpi.delta === undefined ? null : (
            <Delta value={kpi.delta} goodWhenDown={kpi.goodWhenDown} />
          )}
        </div>
        <div className="pa-kpi-val">{kpi.value}</div>
        <div className="pa-kpi-sub">{kpi.sub}</div>
      </div>
    ))}
  </div>
);
