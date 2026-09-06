import React from "react";
import { SearchIcon } from "../../icons";
import "./schedules.css";

export const SchedulesSearch: React.FC<{
  label?: string;
  style?: React.CSSProperties;
}> = ({ label = "Search scheduled tasks", style }) => (
  <div className="sch-search" style={style}>
    <SearchIcon />
    <span>{label}</span>
  </div>
);
