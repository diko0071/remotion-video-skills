import type { GuideAct } from "../../script";

export const PROMPT_LINES = [
  "best soy candles for a small apartment",
  "what candle brand doesn't tunnel",
];

export const ACTS: GuideAct[] = [
  { vo: "01-geo" },
  { vo: "02-mentions" },
  {
    vo: "03-press",
    actions: [{ on: "click", after: 2, click: "m1//mention.links", set: "plDialog" }],
  },
  { vo: "04-why", hold: 10 },
  {
    vo: "05-backlinks",
    actions: [{ on: "backlinks", after: -6, click: "mn.tab.Backlinks", set: "blTab" }],
  },
  { vo: "06-geo-links" },
  {
    vo: "07-prompts",
    actions: [
      { on: "measure", after: 2, click: "nav.seo.Queries", set: "queries" },
      { on: "prompts", after: 2, click: "q1//tab.queries.Prompts", set: "promptsTab" },
    ],
  },
  {
    vo: "08-track",
    actions: [{ on: "click", after: 2, click: "q2//queries.add", set: "trackDlg" }],
    hold: 20,
  },
  {
    vo: "09-added",
    actions: [{ on: "add", after: 4, click: "prompts.add", set: "added" }],
    hold: 20,
  },
  {
    vo: "10-run",
    actions: [
      { on: "reask", after: 4, click: "q2//queries.refresh", set: "runDlg" },
      { on: "runs", after: 2, click: "prompts.run", set: "ran" },
    ],
    hold: 20,
  },
  {
    vo: "11-dash",
    actions: [
      { on: "open", after: 4, click: "nav.seo.Dashboard", set: "dash" },
      { on: "geo", after: 4, click: "d1//tab.seo-dashboard.GEO", set: "geoTab" },
    ],
    hold: 16,
  },
  { vo: "12-sov" },
  { vo: "13-trend", actions: [{ on: "visibility", set: "s1" }] },
  { vo: "14-assistants", actions: [{ on: "then", set: "s2" }] },
  { vo: "15-domains", actions: [{ on: "sources", set: "s3" }] },
  { vo: "16-prompt-table", actions: [{ on: "every", set: "s4" }] },
  { vo: "17-traffic", actions: [{ on: "finally", set: "s5" }], hold: 20 },
  { vo: "18-close" },
];
