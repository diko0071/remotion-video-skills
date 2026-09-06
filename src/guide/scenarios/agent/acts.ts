import type { GuideAct } from "../../script";

export const ACTS: GuideAct[] = [
  {
    vo: "01-chat",
    actions: [
      { on: "ask", after: 0, click: "composer", set: "focus1" },
      { on: "send", after: 4, click: "composer.send", set: "sent1" },
    ],
    hold: 30,
  },
  { vo: "02-tools", hold: 90 },
  {
    vo: "03-brand",
    actions: [
      { on: "brand", after: 0, click: "nav.dashboard.Brand", set: "brandPage" },
      { on: "right", after: 4, click: "navbar.agent", set: "panelOpen" },
    ],
    hold: 30,
  },
  {
    vo: "04-voice",
    actions: [
      { on: "ask", after: 8, click: "composer", set: "focus2" },
      { on: "watch", after: 0, click: "composer.send", set: "sent2" },
    ],
    hold: 110,
  },
  {
    vo: "05-open",
    actions: [
      { on: "seo", after: 0, click: "nav.dashboard.SEO", set: "seoRail" },
      { on: "plan", after: 4, click: "nav.seo.Content Plan", set: "contentPlan" },
      { on: "draft", after: 6, click: "cp1//cp.Why your candle tunnels and how to fix it", set: "articlePage" },
    ],
    hold: 40,
  },
  {
    vo: "06-intro",
    actions: [
      { on: "scroll", after: 4, scrollTo: "a1//ae.body", margin: 150 },
      { on: "shorten", after: 6, click: "composer", set: "focus3" },
      { on: "edits", after: 4, click: "composer.send", set: "sent3" },
    ],
    hold: 110,
  },
  {
    vo: "07-ad",
    actions: [
      { on: "back", after: 0, click: "rail.back", set: "railBack" },
      { on: "creatives", after: 16, click: "nav.dashboard.Ad Creatives", set: "crvPage" },
      { on: "ask", after: 28, click: "composer", set: "focus4" },
      { on: "library", after: 0, click: "composer.send", set: "sent4" },
    ],
    hold: 130,
  },
  {
    vo: "08-sched",
    actions: [
      { on: "autopilot", after: 4, click: "nav.dashboard.Schedules", set: "schedulesPage" },
      { on: "say", after: 8, click: "composer", set: "focus5" },
      { on: "task", after: 0, click: "composer.send", set: "sent5" },
    ],
    hold: 170,
  },
  {
    vo: "09-close",
    actions: [
      { on: "connected", after: 4, click: "nav.dashboard.Integrations", set: "integrations" },
    ],
    hold: 40,
  },
];
