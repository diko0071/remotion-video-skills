import React from "react";
import { Pop } from "../../../kit/pop";
import { CalendarEventCard, CalendarHead } from "../../../kit/ryze-ui/pages/content-plan-calendar";
import { CALENDAR } from "../data";

export const CAL = { w: 900 } as const;

export const WeekCalendar: React.FC<{ cardAt: (day: number, slot: number) => number; published: (day: number, slot: number) => boolean }> = ({ cardAt, published }) => (
  <div className="cal-shell" style={{ width: CAL.w, boxShadow: "0 12px 32px rgba(15,23,42,0.06)" }}>
    <CalendarHead month={CALENDAR.month} range={CALENDAR.range} chip={CALENDAR.chip} />
    <div className="cal-week" style={{ minHeight: 0, gridTemplateColumns: `repeat(${CALENDAR.days.length}, 1fr)` }}>
      {CALENDAR.days.map((d, di) => (
        <div key={d.date} className="cal-col">
          <div className="cal-colhead">
            {d.weekday} {d.date}
            <span className="n">· {d.events.length}</span>
          </div>
          {d.events.map((e, si) => (
            <Pop key={e.title} at={cardAt(di, si)} from={0.9} rise={12}>
              <div style={{ width: "100%" }}>
                <CalendarEventCard event={{ title: e.title, image: e.image, status: published(di, si) ? "Published" : "Drafted" }} />
              </div>
            </Pop>
          ))}
        </div>
      ))}
    </div>
  </div>
);
