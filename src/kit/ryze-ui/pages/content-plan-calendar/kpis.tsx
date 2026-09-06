import React from "react";
import { StatStrip } from "../../stat-strip";
import "../content-plan/content-plan.css";
import "./content-plan-calendar.css";
import { CalendarKpi } from "./types";

export const CalendarKpis: React.FC<{
  items: CalendarKpi[];
  style?: React.CSSProperties;
}> = ({ items, style }) => (
  <StatStrip
    className="cp-kpis"
    itemClassName="cp-kpi"
    items={items}
    style={style}
  />
);
