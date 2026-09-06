import React from "react";
import "./paid-ads-dashboard.css";
import { FunnelCard } from "./funnel-card";
import { AccountRow } from "./types";

export const FunnelsSection: React.FC<{
  rows: AccountRow[];
  title?: string;
  sub?: string;
  style?: React.CSSProperties;
}> = ({
  rows,
  title = "Account funnels",
  sub = "Impressions → clicks → conversions · 30 days",
  style,
}) => (
  <>
    <div className="pa-fn-head" style={style}>
      <div className="pa-card-title">{title}</div>
      <div className="pa-card-sub">{sub}</div>
    </div>
    <div className="pa-fn-grid">
      {rows.map((a) => (
        <FunnelCard key={a.account} row={a} />
      ))}
    </div>
  </>
);
