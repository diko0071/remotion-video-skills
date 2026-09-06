import React from "react";
import { interpolate } from "remotion";
import { SPRINGS, useReveal, useSpringAt } from "../../../../core/motion";
import "../../pages.css";
import "./schedules.css";
import { ScheduleListRow } from "./schedule-row";
import { ScheduleRow } from "./types";

const CASCADE_GAP = 4;

const RevealRow: React.FC<{ row: ScheduleRow; at: number }> = ({ row, at }) => (
  <div style={useReveal(at, 16, 20)}>
    <ScheduleListRow row={row} />
  </div>
);

const GrowRow: React.FC<{
  row: ScheduleRow;
  at: number;
  dotsId?: string;
  menu?: React.ReactNode;
}> = ({ row, at, dotsId, menu }) => {
  const p = useSpringAt(at, SPRINGS.card, 22);
  const settled = p > 0.995;
  return (
    <div
      style={
        settled
          ? undefined
          : {
              opacity: p,
              maxHeight: interpolate(p, [0, 1], [0, 140]),
              transform: `translateY(${interpolate(p, [0, 1], [-8, 0])}px)`,
            }
      }
    >
      <ScheduleListRow row={row} dotsId={dotsId} menu={menu} />
    </div>
  );
};

export const ScheduleList: React.FC<{
  rows: ScheduleRow[];
  style?: React.CSSProperties;
  revealAt?: number;
  cascadeFrom?: number;
  firstDotsId?: string;
  hoveredRow?: string;
  firstMenu?: React.ReactNode;
}> = ({
  rows,
  style,
  revealAt,
  cascadeFrom,
  firstDotsId,
  hoveredRow,
  firstMenu,
}) => (
  <div className="pg-row-list" style={style}>
    {rows.map((s, i) => {
      if (i === 0 && revealAt !== undefined)
        return (
          <GrowRow
            key={s.name}
            row={s}
            at={revealAt}
            dotsId={firstDotsId}
            menu={firstMenu}
          />
        );
      if (cascadeFrom !== undefined)
        return (
          <RevealRow key={s.name} row={s} at={cascadeFrom + i * CASCADE_GAP} />
        );
      return (
        <ScheduleListRow
          key={s.name}
          row={s}
          dotsId={i === 0 ? firstDotsId : undefined}
          hovered={hoveredRow === s.name}
          menu={i === 0 ? firstMenu : undefined}
        />
      );
    })}
  </div>
);
