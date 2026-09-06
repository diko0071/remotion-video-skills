import type { GuideAct } from "../../script";

export const ACTS: GuideAct[] = [
  { vo: "01-studio" },
  {
    vo: "02-design",
    actions: [{ on: "click", after: 4, click: "s1//bs.theme.night", set: "night" }],
    hold: 30,
  },
  {
    vo: "03-match",
    actions: [{ on: "hit", after: 4, click: "s2//bs.match", set: "matchPanel" }],
    hold: 80,
  },
  {
    vo: "04-google",
    actions: [
      { on: "google", after: -10, click: "agent.close", set: "panelClosed" },
      { on: "address", after: -8, click: "s3//bs.domain", set: "domainPop" },
      { on: "switch", after: 0, click: "s3//bs.tab.SEO", set: "seoTab" },
      { on: "check", after: 4, click: "s4//bs.seo.check", set: "checked" },
    ],
    hold: 30,
  },
  {
    vo: "05-performance",
    actions: [
      { on: "dashboard", after: 2, click: "nav.seo.Dashboard", set: "dash" },
      { on: "traffic", after: -6, click: "d1//tab.seo-dashboard.Content", set: "contentTab" },
    ],
    hold: 30,
  },
  { vo: "06-close" },
];
