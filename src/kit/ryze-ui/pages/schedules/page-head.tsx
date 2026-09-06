import React from "react";
import { useClickPress } from "../../../../core/press-context";
import { SparkIcon } from "../../icons";
import "../../pages.css";
import "./schedules.css";
import { GridIcon } from "./icons";

export const SchedulesHead: React.FC<{
  title?: string;
  sub?: string;
  style?: React.CSSProperties;
}> = ({
  title = "Scheduled tasks",
  sub = "Run agent tasks on a schedule. Results land in a new chat and we email you when each run finishes.",
  style,
}) => {
  const scale = useClickPress("schedules.create");
  return (
    <div className="pg-head" style={style}>
      <div>
        <h1 className="pg-h1">{title}</h1>
        <p className="pg-sub">{sub}</p>
      </div>
      <div className="pg-actions">
        <span className="btn-outline">
          <GridIcon />
          View templates
        </span>
        <span
          className="btn-primary"
          data-click="schedules.create"
          style={{ scale: String(scale) }}
        >
          <SparkIcon />
          Create with Agent
        </span>
      </div>
    </div>
  );
};
