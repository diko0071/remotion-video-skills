import React from "react";
import "../../pages.css";
import { StatStrip } from "../../stat-strip";
import "./content-plan.css";
import { ContentPlanKpi } from "./types";

export const ContentPlanKpis: React.FC<{
  items: ContentPlanKpi[];
  style?: React.CSSProperties;
}> = ({ items, style }) => (
  <StatStrip
    className="cp-kpis"
    itemClassName="cp-kpi"
    items={items}
    style={style}
  />
);
