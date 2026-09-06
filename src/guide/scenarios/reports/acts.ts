import type { GuideAct } from "../../script";

export const ACTS: GuideAct[] = [
  {
    vo: "01-ask",
    actions: [
      { on: "ask", after: 0, click: "composer", set: "focus1" },
      { on: "send", after: 4, click: "composer.send", set: "sent1" },
    ],
    hold: 30,
  },
  { vo: "02-work", hold: 20 },
  {
    vo: "03-deck",
    actions: [
      { on: "opens", after: 4, set: "deckOpen" },
      { on: "scrolling", after: 2, scrollTo: "c1//dk.slide.02" },
      { on: "fix", after: 2, scrollTo: "c1//dk.slide.03" },
      { on: "number", after: 6, scrollTo: "c1//dk.slide.04", align: "end" },
    ],
    hold: 30,
  },
  {
    vo: "04-dash",
    actions: [
      { on: "ask", after: 0, click: "composer", set: "focus2" },
      { on: "connected", after: 4, click: "composer.send", set: "sent2" },
      { on: 365, set: "dashOpen" },
      { on: 395, scrollTo: "c1//dash.queries-table", align: "end" },
    ],
    hold: 90,
  },
  {
    vo: "05-list",
    actions: [
      { on: "lands", after: 0, click: "nav.dashboard.Reports", set: "listPage" },
    ],
    hold: 30,
  },
  {
    vo: "05b-detail",
    actions: [
      {
        on: "open",
        after: 4,
        click: "l1//report.Ember & Oak — August performance review",
        set: "detail",
      },
      { on: "pdf", after: 4, click: "rd.pdf", set: "pdfToast" },
      { on: "email", after: 4, click: "rd.email", set: "emailDialog" },
      { on: "team", after: 4, click: "rep.email.send", set: "emailSent" },
      { on: "button", after: 4, click: "rd.update", set: "updPanel" },
      { on: "ask", after: 4, click: "composer", set: "focus3" },
      { on: "live", after: 6, click: "composer.send", set: "sent3" },
    ],
    hold: 120,
  },
  {
    vo: "06-templates",
    actions: [
      { on: "open", after: 4, click: "nav.dashboard.Templates", set: "tplPage" },
      { on: "hit", after: 6, click: "t1//tab.Report", set: "tplReport" },
    ],
    hold: 50,
  },
  { vo: "07-close", hold: 30 },
];
