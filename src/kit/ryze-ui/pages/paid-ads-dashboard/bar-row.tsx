import React from "react";
import "./paid-ads-dashboard.css";

export const BarRow: React.FC<{
  label: string;
  value: number;
  max: number;
  text: string;
  style?: React.CSSProperties;
}> = ({ label, value, max, text, style }) => (
  <div className="pa-hbar" style={style}>
    <span className="pa-hbar-l">{label}</span>
    <span className="pa-hbar-t">
      <u style={{ width: `${Math.max(2, (value / max) * 100)}%` }} />
    </span>
    <span className="pa-hbar-v">{text}</span>
  </div>
);
