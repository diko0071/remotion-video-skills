import React from "react";
import "./report-detail.css";
import { ReportKpi } from "./types";

export const KpiCard: React.FC<{
  item: ReportKpi;
  style?: React.CSSProperties;
}> = ({ item, style }) => (
  <div className="rd-kpi" style={style}>
    <div className="lbl">{item.label}</div>
    <div className="val">
      <b>{item.value}</b>
      {item.change === undefined ? null : (
        <span className={item.change > 0 ? "up" : "down"}>
          {item.change > 0 ? "+" : ""}
          {Math.round(item.change * 100)}%
        </span>
      )}
    </div>
    {item.sub ? <div className="sub">{item.sub}</div> : null}
    {item.peer ? <div className="peer">{item.peer}</div> : null}
  </div>
);
