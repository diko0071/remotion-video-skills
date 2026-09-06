import type { GuideAct } from "../../script";

export const ACTS: GuideAct[] = [
  { vo: "01-intro" },
  {
    vo: "02-monitor",
    actions: [{ on: "monitor", after: 4, click: "intro//tab.Monitor", set: "monitor" }],
  },
  {
    vo: "03-dash-open",
    actions: [
      { on: "open", after: 4, click: "m//tpl.Organic Traffic Overview", set: "dashDlg" },
    ],
    hold: 30,
  },
  {
    vo: "04-dash-scroll",
    actions: [{ on: "scroll", after: 4, set: "dashScroll" }],
    hold: 40,
  },
  {
    vo: "05-create",
    actions: [
      { on: "create", click: "dg1//dlg.close", set: "dashClosed" },
      { on: "create", after: 24, near: true, click: "m//tab.Create", set: "create" },
    ],
  },
  {
    vo: "06-optimize",
    actions: [{ on: "optimize", after: 4, click: "c//tab.Optimize", set: "optimize" }],
  },
  {
    vo: "07-card-use",
    actions: [
      { on: "google", after: 6, click: "o//tpl.Find Google Ads waste", set: "wastePanel" },
    ],
    hold: 30,
  },
  { vo: "08-agent-works" },
  {
    vo: "09-automate",
    actions: [
      { on: "close", after: 4, click: "agent.close", set: "panelClosed" },
      { on: "automate", after: 4, click: "o//tab.Automate", set: "automate" },
    ],
  },
  {
    vo: "10-report",
    actions: [{ on: "report", after: 4, click: "a//tab.Report", set: "report" }],
  },
  {
    vo: "11-deck-open",
    actions: [
      { on: "open", after: 4, click: "r//tpl.Monthly Client Report", set: "deckDlg" },
    ],
    hold: 30,
  },
  {
    vo: "12-deck-scroll",
    actions: [{ on: "scroll", after: 4, set: "deckScroll" }],
    hold: 40,
  },
  {
    vo: "13-deck-build",
    actions: [{ on: "build", after: 4, click: "dlg.build", set: "deckPanel" }],
    hold: 30,
  },
  {
    vo: "14-deck-works",
    actions: [{ on: "panel", after: 6, click: "agent.close", set: "deckPanelClosed" }],
    hold: 26,
  },
  { vo: "15-examples" },
  { vo: "15-close" },
];
