import React from "react";
import { SparkIcon } from "../../icons";
import "../../pages.css";
import "../content-plan/content-plan.css";
import "./content-plan-calendar.css";
import {
  CalendarViewIcon,
  HelpIcon,
  ListViewIcon,
  RefreshIcon,
  SettingsIcon,
} from "./icons";

export const CalendarPageHead: React.FC<{
  title?: string;
  sub?: string;
  action?: string;
  style?: React.CSSProperties;
}> = ({
  title = "Content Plan",
  sub = "Everything planned, drafted and published for your site",
  action = "Improve Articles",
  style,
}) => (
  <div className="pg-head" style={style}>
    <div>
      <div className="pg-h1">{title}</div>
      <div className="pg-sub">{sub}</div>
    </div>
    <div className="pg-actions">
      <span className="cp-iconbtn">
        <SettingsIcon />
      </span>
      <span className="cp-iconbtn">
        <ListViewIcon />
      </span>
      <span data-click="view.content-plan.calendar" className="cp-iconbtn on">
        <CalendarViewIcon />
      </span>
      <span className="cp-iconbtn">
        <RefreshIcon />
      </span>
      <span className="cp-iconbtn">
        <HelpIcon />
      </span>
      <span className="btn-primary">
        <SparkIcon />
        {action}
      </span>
    </div>
  </div>
);
