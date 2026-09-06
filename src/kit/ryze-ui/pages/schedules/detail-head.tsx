import React from "react";
import { useClickPress } from "../../../../core/press-context";
import { MenuDotsIcon, SparkIcon } from "../../icons";
import "../../pages.css";
import "./schedules.css";
import { ArrowLeftIcon, PlayIcon } from "./icons";
import { ScheduleSwitch } from "./switch";

export const ScheduleBackLink: React.FC<{ label?: string }> = ({
  label = "Scheduled tasks",
}) => {
  const scale = useClickPress("schedule.back");
  return (
    <span
      className="sch-back"
      data-click="schedule.back"
      style={{ scale: String(scale) }}
    >
      <ArrowLeftIcon />
      {label}
    </span>
  );
};

export const ScheduleDetailHead: React.FC<{
  name: string;
  style?: React.CSSProperties;
  running?: boolean;
}> = ({ name, style, running }) => {
  const runScale = useClickPress("schedule.run-now");
  return (
    <div className="sch-detail-head" style={style}>
      <h1 className="pg-h1">{name}</h1>
      <div className="pg-actions">
        <ScheduleSwitch on />
        <span
          className="btn-outline"
          data-click="schedule.run-now"
          style={{ scale: String(runScale) }}
        >
          <PlayIcon />
          {running ? "Running..." : "Run now"}
        </span>
        <span className="btn-primary">
          <SparkIcon />
          Refine with Agent
        </span>
        <span className="sch-dots">
          <MenuDotsIcon />
        </span>
      </div>
    </div>
  );
};
