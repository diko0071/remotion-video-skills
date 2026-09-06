import type { GuideAct } from "../../script";

export const ACTS: GuideAct[] = [
  { vo: "01-dash", hold: 30 },
  {
    vo: "02-connect",
    actions: [
      { on: "under", after: 0, click: "nav.dashboard.Integrations", set: "integrations" },
      { on: "advertising", after: 4, click: "intg-filter.Advertising", set: "adsTab" },
    ],
    hold: 30,
  },
  {
    vo: "03-ask",
    actions: [
      { on: "back", after: 4, click: "nav.dashboard.Dashboard", set: "dashAgain" },
      { on: "open", after: 4, click: "navbar.agent", set: "panelOpen" },
      { on: "where", after: 4, click: "composer", set: "focus1" },
      { on: "walks", after: 4, click: "composer.send", set: "sent1" },
    ],
    hold: 120,
  },
  {
    vo: "04-approvals",
    actions: [
      { on: "finding", after: 0, click: "nav.dashboard.Approvals", set: "approvals" },
    ],
    hold: 30,
  },
  {
    vo: "05-creatives",
    actions: [
      { on: "creatives", after: 0, click: "nav.dashboard.Ad Creatives", set: "crv" },
    ],
    hold: 30,
  },
  {
    vo: "05b-inspire",
    actions: [
      { on: "grab", after: 4, click: "nav.dashboard.Ad Templates", set: "tpl" },
      { on: "peek", after: 4, click: "nav.dashboard.Competitor Ads", set: "comp" },
    ],
    hold: 30,
  },
  { vo: "06-close", hold: 40 },
];
