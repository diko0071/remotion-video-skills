import React from "react";
import { useCurrentFrame } from "remotion";
import { SPRINGS, useSpringAt } from "../../core/motion";
import { CalendarHead } from "../../kit/ryze-ui/pages/content-plan-calendar/calendar-head";
import { CalendarEventCard } from "../../kit/ryze-ui/pages/content-plan-calendar/event-card";
import type { CalendarEvent } from "../../kit/ryze-ui/pages/content-plan-calendar/types";
import "../../kit/ryze-ui/pages.css";
import "../../kit/ryze-ui/pages/content-plan/content-plan.css";
import "../../kit/ryze-ui/pages/content-plan-calendar/content-plan-calendar.css";

type Slot = { event: CalendarEvent; at: number };
type Day = { weekday: string; date: number; today?: boolean; slots: Slot[] };

export const CAL_W = 1760;
export const CAL_FILL_SPAN = 100;

const WEEK: Day[] = [
  {
    weekday: "Mon",
    date: 17,
    slots: [
      {
        at: 0,
        event: {
          title: "PR: Dusk raises the bar on sleep tracking",
          status: "Published",
          image: "dusk/content/post-01.png",
        },
      },
      {
        at: 16,
        event: {
          title: "Sleep score vs sleep debt: which to trust",
          status: "Drafted",
          image: "dusk/content/post-02.png",
        },
      },
      { at: 84, event: { title: "Backlink: Wired feature pitch", status: "Planned" } },
    ],
  },
  {
    weekday: "Tue",
    date: 18,
    slots: [
      {
        at: 25,
        event: {
          title: "How sleep staging actually works",
          status: "Drafted",
          image: "dusk/content/post-03.png",
        },
      },
      {
        at: 32,
        event: {
          title: "What deep sleep actually does",
          status: "Planned",
          image: "dusk/content/post-04.png",
        },
      },
      { at: 87, event: { title: "PR: New research partnership on jet lag", status: "Planned" } },
    ],
  },
  {
    weekday: "Wed",
    date: 19,
    slots: [
      {
        at: 38,
        event: {
          title: "Best sleep trackers of the year",
          status: "Drafted",
          image: "dusk/content/post-05.png",
        },
      },
      {
        at: 45,
        event: {
          title: "PR: Dusk lands on the App Store charts",
          status: "Planned",
          image: "dusk/content/post-06.png",
        },
      },
      { at: 90, event: { title: "Backlink: sleep gear guide swap", status: "Planned" } },
    ],
  },
  {
    weekday: "Thu",
    date: 20,
    slots: [
      {
        at: 50,
        event: {
          title: "Sleep stages, explained simply",
          status: "Planned",
          image: "dusk/content/post-07.png",
        },
      },
      {
        at: 55,
        event: {
          title: "Backlink: sleep app roundup pitch",
          status: "Planned",
          image: "dusk/content/post-08.png",
        },
      },
      { at: 93, event: { title: "PR: Summer sleep report", status: "Planned" } },
    ],
  },
  {
    weekday: "Fri",
    date: 21,
    today: true,
    slots: [
      {
        at: 60,
        event: {
          title: "A wind-down routine for beginners",
          status: "Planned",
          image: "dusk/content/post-09.png",
        },
      },
      {
        at: 64,
        event: {
          title: "Why bedtime consistency changes recovery",
          status: "Planned",
          image: "dusk/content/post-10.png",
        },
      },
      { at: 96, event: { title: "Backlink: SF health blog roundup", status: "Planned" } },
    ],
  },
  {
    weekday: "Sat",
    date: 22,
    slots: [
      {
        at: 68,
        event: {
          title: "Backlink: sleep gift guide pitch",
          status: "Planned",
          image: "dusk/content/post-11.png",
        },
      },
      {
        at: 71,
        event: {
          title: "Pairing caffeine timing with sleep, properly",
          status: "Planned",
          image: "dusk/content/post-12.png",
        },
      },
    ],
  },
  {
    weekday: "Sun",
    date: 23,
    slots: [
      {
        at: 75,
        event: {
          title: "The story behind our sleep model",
          status: "Planned",
          image: "dusk/content/post-01.png",
        },
      },
      {
        at: 78,
        event: {
          title: "PR: Holiday travel sleep guide",
          status: "Planned",
          image: "dusk/content/post-02.png",
        },
      },
    ],
  },
];

const RevealCard: React.FC<{ slot: Slot; fillFrom: number }> = ({ slot, fillFrom }) => {
  const frame = useCurrentFrame();
  const at = fillFrom + slot.at;
  const p = useSpringAt(at, SPRINGS.pop, 20);
  if (frame < at) return null;
  return (
    <div
      style={{
        opacity: p,
        transform: `translateY(${(1 - p) * 18}px) scale(${0.9 + p * 0.1})`,
      }}
    >
      <CalendarEventCard event={slot.event} />
    </div>
  );
};

const DayColumn: React.FC<{ day: Day; fillFrom: number }> = ({ day, fillFrom }) => {
  const frame = useCurrentFrame();
  const visible = day.slots.filter((s) => frame >= fillFrom + s.at).length;
  return (
    <div className="cal-col">
      <div className={`cal-colhead${day.today ? " today" : ""}`}>
        {day.weekday} {day.date}
        <span className="n">· {visible}</span>
      </div>
      {day.slots.map((slot) => (
        <RevealCard key={slot.event.title} slot={slot} fillFrom={fillFrom} />
      ))}
      {Array.from({ length: Math.max(0, 3 - visible) }, (_, i) => (
        <div key={i} className="cal-slot" />
      ))}
    </div>
  );
};

export const CalendarWidget: React.FC<{ fillFrom?: number }> = ({ fillFrom = 1e9 }) => (
  <div
    className="cal-shell"
    style={{ width: CAL_W, fontFamily: "'Plus Jakarta Sans'", background: "#FFFFFF" }}
  >
    <CalendarHead
      month="August 2026"
      range="Aug 17 – Aug 23, 2026"
      chip={{ month: "Aug", day: "21" }}
    />
    <div className="cal-week">
      {WEEK.map((d) => (
        <DayColumn key={d.date} day={d} fillFrom={fillFrom} />
      ))}
    </div>
  </div>
);
