export type CalendarStatus = "Published" | "Drafted" | "Planned";

export type CalendarEvent = { title: string; status: CalendarStatus; image?: string };

export type CalendarDay = { weekday: string; date: number; today?: boolean; events: CalendarEvent[] };

export type CalendarKpi = { label: string; value: string };

export const CALENDAR_STATUS_CLASS: Record<CalendarStatus, string> = {
  Published: "published",
  Drafted: "drafted",
  Planned: "planned",
};
