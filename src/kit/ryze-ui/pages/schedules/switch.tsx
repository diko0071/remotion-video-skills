import React from "react";
import "./schedules.css";

export const ScheduleSwitch: React.FC<{
  on?: boolean;
  style?: React.CSSProperties;
}> = ({ on, style }) => (
  <span className={`switch${on ? " on" : ""}`} style={style}>
    <i />
  </span>
);
