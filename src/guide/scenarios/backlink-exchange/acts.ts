import type { GuideAct } from "../../script";

export const ACTS: GuideAct[] = [
  {
    vo: "01-article",
    actions: [{ on: "text", after: -6, set: "scrollLink", scroll: 540 }],
    hold: 20,
  },
  { vo: "02-chains" },
  { vo: "03-noncompeting" },
  {
    vo: "04-where",
    actions: [
      { on: "mentions", after: -20, click: "nav.seo.Mentions", set: "mentions" },
      { on: "backlinks", after: 2, click: "m1//mn.tab.Backlinks", set: "backlinksTab" },
    ],
    hold: 26,
  },
  {
    vo: "05-default",
    actions: [{ on: "already", after: -10, click: "nav.seo.Settings", set: "settings" }],
    hold: 26,
  },
  {
    vo: "05b-toggle",
    actions: [
      { on: "flip", after: 4, click: "s1//settings.backlinks", set: "toggleOff" },
      { on: "leave", after: 6, click: "s1//settings.backlinks", set: "toggleOn" },
    ],
    hold: 26,
  },
  { vo: "06-close" },
];
