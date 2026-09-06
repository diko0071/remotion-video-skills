import React from "react";
import "./content-plan-calendar.css";
import { CALENDAR_SLOTS } from "./data";
import { CalendarEventCard } from "./event-card";
import { CalendarDay } from "./types";

export const CalendarDayColumn: React.FC<{
  day: CalendarDay;
  slots?: number;
  style?: React.CSSProperties;
}> = ({ day, slots = CALENDAR_SLOTS, style }) => (
  <div className="cal-col" style={style}>
    <div className={`cal-colhead${day.today ? " today" : ""}`}>
      {day.weekday} {day.date}
      {day.events.length > 0 ? (
        <span className="n">· {day.events.length}</span>
      ) : null}
    </div>
    {day.events.map((e) => (
      <CalendarEventCard key={e.title} event={e} />
    ))}
    {Array.from({ length: Math.max(0, slots - day.events.length) }, (_, i) => (
      <div key={i} className="cal-slot" />
    ))}
  </div>
);
