import type { GuideAct } from "../../script";

export const CREATED_NAME = "Weekly performance digest";

export const ACTS: GuideAct[] = [
  { vo: "01-intro" },
  {
    vo: "02-press",
    actions: [{ on: "press", after: 6, click: "schedules.create", set: "panel" }],
    hold: 22,
  },
  { vo: "03-asks" },
  {
    vo: "04-pick",
    actions: [
      { on: "answer", after: 6, click: "q.task" },
      { on: "person", after: 14, click: "q.freq" },
    ],
  },
  {
    vo: "05-where",
    actions: [
      { on: "email", click: "q.dest" },
      { on: "slack", after: 18, click: "widget.submit", set: "submit" },
    ],
  },
  { vo: "06-writing" },
  {
    vo: "07-created",
    actions: [{ on: "done", after: 4, set: "created" }],
  },
  {
    vo: "08-dots",
    actions: [
      { on: "want", after: 8, click: "schedule.dots", set: "menu" },
      { on: "settings", click: "schedule.edit", set: "dialog" },
    ],
  },
  {
    vo: "09-people",
    actions: [
      { on: "email", click: "dialog.emails", set: "recipient" },
      { on: "save", near: true, click: "dialog.save", set: "saved" },
    ],
    hold: 26,
  },
  {
    vo: "10-detail",
    actions: [{ on: "open", after: 4, click: `schedule.${CREATED_NAME}`, set: "detail" }],
  },
  {
    vo: "11-run",
    actions: [{ on: "run", after: 6, click: "schedule.run-now", set: "running" }],
  },
  { vo: "12-history" },
  {
    vo: "13-result",
    actions: [{ on: "open", after: 4, click: "run.Aug 11, 08:00 AM", set: "runChat" }],
  },
  { vo: "14-what" },
  { vo: "15-close" },
];

