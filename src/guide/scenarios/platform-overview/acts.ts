import type { GuideAct } from "../../script";

export const ACTS: GuideAct[] = [
  {
    vo: "01-connect",
    actions: [
      { on: "connect", after: 0, click: "nav.dashboard.Integrations", set: "integrations" },
    ],
    hold: 20,
  },
  {
    vo: "02-agent",
    actions: [{ on: "agent", after: 6, click: "navbar.agent", set: "panelOpen" }],
    hold: 20,
  },
  {
    vo: "03-paid",
    actions: [
      { on: "for", after: 0, click: "agent.close", set: "panelClosed" },
      { on: "dashboard", after: 0, click: "nav.dashboard.Dashboard", set: "paidDash" },
      { on: "creatives", after: 0, click: "nav.dashboard.Ad Creatives", set: "crv" },
      { on: "templates", after: 0, click: "nav.dashboard.Ad Templates", set: "tpl" },
      { on: "competitors'", after: 0, click: "nav.dashboard.Competitor Ads", set: "comp" },
    ],
    hold: 40,
  },
  {
    vo: "04-organic",
    actions: [
      { on: "organic", after: 4, click: "nav.dashboard.SEO", set: "seoRail" },
      { on: "dashboard", after: 0, click: "nav.seo.Dashboard", set: "seoDash" },
      { on: "geo", after: 0, click: "d1//tab.seo-dashboard.GEO", set: "geoTab" },
      { on: "content", after: 0, click: "nav.seo.Content Plan", set: "contentPlan" },
      { on: "technical", after: 0, click: "nav.seo.Technical Audit", set: "techAudit" },
    ],
    hold: 40,
  },
  {
    vo: "05-close",
    actions: [
      { on: "goes", after: 0, click: "rail.back", set: "railBack" },
      { on: "moving", after: 0, click: "nav.dashboard.Home", set: "homeAgain" },
    ],
    hold: 40,
  },
];
