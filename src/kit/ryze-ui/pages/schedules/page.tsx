import React from "react";
import { RyzeApp } from "../../app-shell";
import "../../pages.css";
import "./schedules.css";
import { SCHEDULES } from "./data";
import { SchedulesHead } from "./page-head";
import { ScheduleList } from "./schedule-list";
import { SchedulesSearch } from "./search-bar";
import type { ScheduleRow as ScheduleRowData } from "./types";

export const SchedulesBody: React.FC<{
  rows?: ScheduleRowData[];
  listStyle?: React.CSSProperties;
  revealAt?: number;
  cascadeFrom?: number;
  overlay?: React.ReactNode;
  hoveredRow?: string;
  firstMenu?: React.ReactNode;
}> = ({
  rows = SCHEDULES,
  listStyle,
  revealAt,
  cascadeFrom,
  overlay,
  hoveredRow,
  firstMenu,
}) => (
  <div className="pg">
    <div className="pg-scroll">
      <div className="pg-inner wide" style={{ position: "relative" }}>
        {overlay}
        <SchedulesHead />
        <SchedulesSearch />
        <ScheduleList
          rows={rows}
          style={listStyle}
          revealAt={revealAt}
          cascadeFrom={cascadeFrom}
          firstDotsId="schedule.dots"
          hoveredRow={hoveredRow}
          firstMenu={firstMenu}
        />
      </div>
    </div>
  </div>
);

export const SchedulesPage: React.FC<{
  rows?: ScheduleRowData[];
  panel?: React.ReactNode;
  listStyle?: React.CSSProperties;
  revealAt?: number;
  cascadeFrom?: number;
}> = ({ rows = SCHEDULES, panel, listStyle, revealAt, cascadeFrom }) => (
  <RyzeApp
    workspace="ember-and-oak"
    page="Scheduled tasks"
    nav="Schedules"
    credits="4,180"
    panel={panel}
    stretch
  >
    <div className="pg">
      <div className="pg-scroll">
        <div className="pg-inner wide">
          <SchedulesHead />
          <SchedulesSearch />
          <ScheduleList
            rows={rows}
            style={listStyle}
            revealAt={revealAt}
            cascadeFrom={cascadeFrom}
          />
        </div>
      </div>
    </div>
  </RyzeApp>
);
