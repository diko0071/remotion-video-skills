import React from "react";
import "./content-plan-calendar.css";
import { ChevronLeftIcon, ChevronRightIcon } from "./icons";

export const CalendarHead: React.FC<{
  month: string;
  range: string;
  chip: { month: string; day: string };
  style?: React.CSSProperties;
}> = ({ month, range, chip, style }) => (
  <div className="cal-head" style={style}>
    <div className="cal-headleft">
      <div className="cal-chip">
        <div className="m">{chip.month}</div>
        <div className="d">{chip.day}</div>
      </div>
      <div>
        <div className="cal-title">{month}</div>
        <div className="cal-range">{range}</div>
      </div>
    </div>
    <div className="cal-headright">
      <span className="cal-tabs">
        <span className="t on">Week</span>
        <span className="t">Month</span>
      </span>
      <span className="cal-nav">
        <span className="nb icon">
          <ChevronLeftIcon />
        </span>
        <span className="nb">Today</span>
        <span className="nb icon">
          <ChevronRightIcon />
        </span>
      </span>
    </div>
  </div>
);
