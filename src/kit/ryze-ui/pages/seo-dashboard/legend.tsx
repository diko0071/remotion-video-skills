import React from "react";
import "./seo-dashboard.css";
import { LegendItem } from "./types";

export const Legend: React.FC<{
  items: LegendItem[];
  style?: React.CSSProperties;
}> = ({ items, style }) => (
  <div className="sd-legend" style={style}>
    {items.map((it) => (
      <span key={it.label}>
        <i style={{ background: it.color }} />
        {it.label}
      </span>
    ))}
  </div>
);
