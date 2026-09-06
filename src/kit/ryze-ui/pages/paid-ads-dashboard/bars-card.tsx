import React from "react";
import "./paid-ads-dashboard.css";
import { BarRow } from "./bar-row";
import type { BarsCardRow } from "./types";

export const BarsCard: React.FC<{
  title: string;
  sub: string;
  rows: BarsCardRow[];
  max: number;
  style?: React.CSSProperties;
}> = ({ title, sub, rows, max, style }) => (
  <div className="pa-card" style={style}>
    <div className="pa-card-head">
      <div>
        <div className="pa-card-title">{title}</div>
        <div className="pa-card-sub">{sub}</div>
      </div>
    </div>
    <div className="pa-hbars">
      {rows.map((row) => (
        <BarRow
          key={row.label}
          label={row.label}
          value={row.value}
          max={max}
          text={row.text}
        />
      ))}
    </div>
  </div>
);
