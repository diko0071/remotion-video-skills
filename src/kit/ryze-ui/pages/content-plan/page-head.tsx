import React from "react";
import { useClickPress } from "../../../../core/press-context";
import { SparkIcon } from "../../icons";
import "../../pages.css";
import "./content-plan.css";
import {
  CalendarViewIcon,
  HelpIcon,
  ListViewIcon,
  RefreshIcon,
  SettingsIcon,
} from "./icons";

export const ContentPlanHead: React.FC<{
  title?: string;
  sub?: string;
  view?: "list" | "calendar";
  action?: string;
  style?: React.CSSProperties;
}> = ({
  title = "Content Plan",
  sub = "Everything planned, drafted and published for your site",
  view = "list",
  action = "Improve Articles",
  style,
}) => {
  const listScale = useClickPress("view.content-plan.list");
  const calScale = useClickPress("view.content-plan.calendar");
  return (
    <div className="pg-head" style={style}>
      <div>
        <div className="pg-h1">{title}</div>
        <div className="pg-sub">{sub}</div>
      </div>
      <div className="pg-actions">
        <span className="cp-iconbtn">
          <SettingsIcon />
        </span>
        <span
          data-click="view.content-plan.list"
          className={`cp-iconbtn${view === "list" ? " on" : ""}`}
          style={{ scale: String(listScale) }}
        >
          <ListViewIcon />
        </span>
        <span
          data-click="view.content-plan.calendar"
          className={`cp-iconbtn${view === "calendar" ? " on" : ""}`}
          style={{ scale: String(calScale) }}
        >
          <CalendarViewIcon />
        </span>
        <span className="cp-iconbtn" data-click="cp.refresh">
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
};
