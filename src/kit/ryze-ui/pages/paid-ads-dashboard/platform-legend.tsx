import React from "react";
import "./paid-ads-dashboard.css";
import { PLATFORM_LEGEND } from "./data";
import { PlatformLegendItem } from "./types";

export const PlatformLegend: React.FC<{
  items?: PlatformLegendItem[];
  style?: React.CSSProperties;
}> = ({ items = PLATFORM_LEGEND, style }) => (
  <div className="pa-legend" style={style}>
    {items.map((l) => (
      <span key={l.label}>
        <i className="sq" style={{ backgroundColor: l.color }} />
        {l.label}
      </span>
    ))}
  </div>
);
