import React from "react";
import { StatStrip } from "../../stat-strip";
import "./backlinks.css";
import { BacklinkKpi } from "./types";

export const BacklinksKpis: React.FC<{
  items: BacklinkKpi[];
  style?: React.CSSProperties;
}> = ({ items, style }) => (
  <StatStrip
    className="mn-kpis"
    itemClassName="mn-kpi"
    items={items}
    style={style}
  />
);
