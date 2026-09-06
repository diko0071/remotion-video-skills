import React from "react";
import { Img, staticFile } from "remotion";
import "./content-plan-calendar.css";
import { CALENDAR_STATUS_CLASS, CalendarEvent } from "./types";

export const CalendarEventCard: React.FC<{
  event: CalendarEvent;
  style?: React.CSSProperties;
}> = ({ event, style }) => (
  <div className="cal-card" style={style}>
    {event.image ? (
      <div className="cal-card-img">
        <Img src={staticFile(event.image)} />
        <span className={`cal-badge ${CALENDAR_STATUS_CLASS[event.status]}`}>
          <i />
          {event.status}
        </span>
      </div>
    ) : null}
    <div className="cal-card-body">
      <span className="cal-card-title">{event.title}</span>
      {event.image ? null : (
        <span
          className={`cal-card-status ${CALENDAR_STATUS_CLASS[event.status]}`}
        >
          <i />
          {event.status}
        </span>
      )}
    </div>
  </div>
);
