import React from "react";
import "./seo-dashboard.css";

export const HeadMetric: React.FC<{
  label: string;
  value: string;
  style?: React.CSSProperties;
}> = ({ label, value, style }) => (
  <div className="sd-head-metric" style={style}>
    <div className="l">{label}</div>
    <div className="v">{value}</div>
  </div>
);
