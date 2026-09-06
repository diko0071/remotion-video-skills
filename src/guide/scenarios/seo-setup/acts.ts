import type { GuideAct } from "../../script";

export const ACTS: GuideAct[] = [
  {
    vo: "01-integrations",
    actions: [
      { on: "console", after: -14, click: "i1//intg.Google Search Console", set: "gsc" },
      { on: "analytics", after: 2, click: "i1//intg.Google Analytics 4", set: "ga" },
      { on: "commerce", after: 2, click: "intg-filter.Commerce & CMS", set: "commerce" },
      { on: "here", after: 8, click: "i2//intg.Shopify", set: "shopify" },
    ],
    hold: 30,
  },
  {
    vo: "02-runsetup",
    actions: [
      { on: "queries", after: -6, click: "nav.dashboard.SEO", set: "seoRail" },
      { on: "everything", after: -6, click: "nav.seo.Queries", set: "queries" },
      { on: "hit", after: 4, click: "setup.run", set: "run" },
    ],
    hold: 24,
  },
  {
    vo: "03-keywords",
    actions: [{ on: "minute", after: 10, set: "keywords" }],
    hold: 24,
  },
  {
    vo: "03b-prompts",
    actions: [{ on: "questions", after: -14, click: "q1//tab.queries.Prompts", set: "prompts" }],
    hold: 30,
  },
  {
    vo: "04-articles",
    actions: [{ on: "plan", after: 2, click: "nav.seo.Content Plan", set: "plan" }],
    hold: 30,
  },
  {
    vo: "05-mentions",
    actions: [{ on: "mentions", after: 2, click: "nav.seo.Mentions", set: "mentions" }],
    hold: 30,
  },
  {
    vo: "05b-audit",
    actions: [{ on: "technical", after: -4, click: "nav.seo.Technical Audit", set: "audit" }],
    hold: 30,
  },
  {
    vo: "06-dashboard",
    actions: [
      { on: "dashboard", after: 2, click: "nav.seo.Dashboard", set: "dash" },
      { on: "geo", after: -6, click: "d1//tab.seo-dashboard.GEO", set: "geo" },
    ],
    hold: 30,
  },
  {
    vo: "07-published",
    actions: [
      { on: "back", after: -4, click: "nav.seo.Content Plan", set: "planAgain" },
      { on: "published", after: -8, click: "cp.refresh", set: "published" },
    ],
    hold: 40,
  },
  { vo: "08-close", hold: 30 },
];
