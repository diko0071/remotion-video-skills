import type { GuideAct } from "../../script";

export const ROW_URL = "https://ember-and-oak.com/pages/wholesale-2024";

export const ACTS: GuideAct[] = [
  { vo: "01-page" },
  { vo: "02-scores" },
  { vo: "03-sitewide" },
  {
    vo: "04-row",
    actions: [{ on: "open", after: 4, click: `t1//ta.row.${ROW_URL}`, set: "rowOpen" }],
    hold: 30,
  },
  {
    vo: "05-fix",
    actions: [{ on: "agent", after: 4, click: "t2//fix-with-agent", set: "fixPanel" }],
    hold: 40,
  },
  { vo: "06-agent", hold: 40 },
  {
    vo: "07-rescan",
    actions: [
      { on: "done", click: "agent.close", set: "panelClosed" },
      { on: "run", after: 4, near: true, click: "t2//ta.run-scan", set: "rescanned" },
    ],
    hold: 40,
  },
  { vo: "08-close" },
];
