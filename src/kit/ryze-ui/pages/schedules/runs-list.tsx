import React from "react";
import { interpolate } from "remotion";
import { SPRINGS, useSpringAt } from "../../../../core/motion";
import { useClickPress } from "../../../../core/press-context";
import "./schedules.css";
import { ScheduleRun } from "./types";

const RunRow: React.FC<{
  run: ScheduleRun;
  name: string;
  style?: React.CSSProperties;
}> = ({ run, name, style }) => {
  const scale = useClickPress(`run.${run.when}`);
  return (
    <div
      className="sch-run"
      data-click={`run.${run.when}`}
      style={{ ...style, scale: String(scale) }}
    >
      <div className="r-left">
        <span className="r-name">{name}</span>
        <span className={`sch-pill2 ${run.tone}`}>
          <i />
          {run.status}
        </span>
      </div>
      <span className="r-when">{run.when}</span>
    </div>
  );
};

export const ScheduleRuns: React.FC<{
  runs: ScheduleRun[];
  name: string;
  style?: React.CSSProperties;
  revealAt?: number;
}> = ({ runs, name, style, revealAt }) => {
  const p = useSpringAt(revealAt ?? -1e6, SPRINGS.card, 20);
  return (
    <div className="sch-runs" style={style}>
      {runs.map((r, i) => (
        <RunRow
          key={r.when}
          run={r}
          name={name}
          style={
            i === 0 && revealAt !== undefined
              ? {
                  opacity: p,
                  maxHeight: interpolate(p, [0, 1], [0, 80]),
                  overflow: "hidden",
                }
              : undefined
          }
        />
      ))}
    </div>
  );
};
