import { ScheduleRow, ScheduleRun } from "./types";

export const SCHEDULES: ScheduleRow[] = [
  {
    name: "Weekly performance digest",
    cadence: "Weekly on Monday at 08:00 America/Los_Angeles",
    enabled: true,
  },
  {
    name: "Daily budget check",
    cadence: "Daily at 09:00 America/Los_Angeles",
    enabled: true,
  },
  {
    name: "Competitor ad sweep — Yankee Candle, Brooklyn Candle Studio",
    cadence: "Daily at 06:30 America/Los_Angeles",
    enabled: true,
  },
  {
    name: "Content plan top-up",
    cadence: "Weekly on Wednesday at 07:00 America/Los_Angeles",
    enabled: true,
  },
  {
    name: "Backlink report",
    cadence: "Monthly on day 1 at 07:30 America/Los_Angeles",
    enabled: true,
  },
  {
    name: "Technical crawl — ember-and-oak.com",
    cadence: "Weekly on Sunday at 23:00 America/Los_Angeles",
    enabled: true,
  },
  {
    name: "Search terms & negative keyword sweep",
    cadence: "Weekly on Thursday at 10:00 America/Los_Angeles",
    enabled: false,
  },
  {
    name: "Holiday gift-guide outreach push",
    cadence: "Once on Wed, Sep 3, 09:00 AM America/Los_Angeles",
    once: true,
    enabled: true,
  },
  {
    name: "Labor Day sale readiness check",
    cadence: "Once on Fri, Aug 29, 07:00 AM America/Los_Angeles",
    once: true,
    enabled: false,
  },
];

export const SCHEDULE_RUNS: ScheduleRun[] = [
  { when: "Aug 11, 08:00 AM", status: "Done", tone: "ok" },
  { when: "Aug 4, 08:00 AM", status: "Done", tone: "ok" },
  { when: "Jul 28, 08:00 AM", status: "Done", tone: "ok" },
  { when: "Jul 21, 08:00 AM", status: "Failed", tone: "bad" },
  { when: "Jul 14, 08:00 AM", status: "Done", tone: "ok" },
  { when: "Jul 7, 08:00 AM", status: "Skipped", tone: "neutral" },
  { when: "Jun 30, 08:00 AM", status: "Done", tone: "ok" },
];

export const SCHEDULE_TASK_TEXT =
  "Build this week's performance digest. Compare the last 7 days to the previous 7 for every connected ad platform: spend, conversions, CPA. Flag the biggest mover — the campaign or channel that changed the most week over week. Close with the single highest-impact action for next week. Under 150 words, numbers first.";

export const SCHEDULE_DETAIL_NAME = "Weekly performance digest";

export const SCHEDULE_DETAIL_REPEATS = "Weekly on Monday at 08:00 America/Los_Angeles";

export const SCHEDULE_DETAIL_NEXT_RUN = "Next run: Mon, Aug 18, 08:00 AM";
