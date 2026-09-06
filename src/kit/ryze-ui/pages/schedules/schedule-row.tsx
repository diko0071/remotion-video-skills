import React from "react";
import { useClickPress } from "../../../../core/press-context";
import { ClockIcon, MenuDotsIcon } from "../../icons";
import "./schedules.css";
import { RepeatIcon } from "./icons";
import { ScheduleSwitch } from "./switch";
import { ScheduleRow } from "./types";

export const ScheduleListRow: React.FC<{
  row: ScheduleRow;
  style?: React.CSSProperties;
  dotsId?: string;
  hovered?: boolean;
  menu?: React.ReactNode;
}> = ({ row, style, dotsId, hovered, menu }) => {
  const rowScale = useClickPress(`schedule.${row.name}`);
  const dotsScale = useClickPress(dotsId);
  return (
    <div
      className={`list-row${hovered ? " hovered" : ""}`}
      data-click={`schedule.${row.name}`}
      style={{ ...style, scale: String(rowScale) }}
    >
      <div className="list-main">
        <div className="sch-row-name">
          <span className="list-name">{row.name}</span>
          {!row.enabled ? (
            <span className="sch-pill">
              {row.once ? "Completed" : "Paused"}
            </span>
          ) : null}
        </div>
        <div className="list-desc">
          {row.once ? <ClockIcon /> : <RepeatIcon />}
          <span>{row.cadence}</span>
        </div>
      </div>
      <div className="list-right">
        {row.once ? null : <ScheduleSwitch on={row.enabled} />}
        <span
          className="sch-dots"
          data-click={dotsId}
          style={{ scale: String(dotsScale) }}
        >
          <MenuDotsIcon />
          {menu}
        </span>
      </div>
    </div>
  );
};
