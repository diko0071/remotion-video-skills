import React from "react";
import "./paid-ads-dashboard.css";

export const StatusPill: React.FC<{
  active: boolean;
  labels: [string, string];
  style?: React.CSSProperties;
}> = ({ active, labels, style }) => (
  <span className="pa-pill" style={style}>
    <i className={active ? "on" : "off"} />
    {active ? labels[0] : labels[1]}
  </span>
);
