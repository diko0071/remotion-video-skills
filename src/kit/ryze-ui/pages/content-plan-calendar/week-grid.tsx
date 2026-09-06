import React from "react";
import "./content-plan-calendar.css";
import { CalendarHead } from "./calendar-head";
import { CalendarDayColumn } from "./day-column";
import { CalendarDay } from "./types";

export const CalendarWeekGrid: React.FC<{
  week: CalendarDay[];
  month: string;
  range: string;
  chip: { month: string; day: string };
  style?: React.CSSProperties;
}> = ({ week, month, range, chip, style }) => (
  <div className="cal-shell" style={style}>
    <CalendarHead month={month} range={range} chip={chip} />
    <div className="cal-week">
      {week.map((d) => (
        <CalendarDayColumn key={d.date} day={d} />
      ))}
    </div>
  </div>
);
