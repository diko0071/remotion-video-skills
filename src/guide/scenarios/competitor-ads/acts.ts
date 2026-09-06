import type { GuideAct } from "../../script";

export const LIGHTBOX_AD_ID = "a2";
export const BRAND_FOCUS = "Yankee Candle";

export const ACTS: GuideAct[] = [
  { vo: "01-explore" },
  {
    vo: "01b-scroll",
    actions: [
      { on: "scrolling", set: "scrollStart", scroll: 430 },
      { on: "thousand", set: "scroll2", scroll: 880 },
      { on: "pulled", set: "scroll3", scroll: 1330 },
      { on: "refreshed", set: "scroll4", scroll: 1700 },
    ],
    hold: 40,
  },
  {
    vo: "02-filter",
    actions: [
      { on: "slice", set: "scrollBack", scroll: 0 },
      { on: "industry", after: 4, click: "e1//comp.filter.industry", set: "fltIndustry" },
      { on: "platform", after: 4, click: "e2//comp.filter.platform", set: "fltPlatform" },
      { on: "image", after: 4, click: "e3//comp.filter.format", set: "fltFormat" },
    ],
    hold: 20,
  },
  {
    vo: "03-tracked",
    actions: [
      { on: "tab", after: 2, click: "e4//comp.tab.Tracked Competitors", set: "tracked" },
      { on: "found", after: 4, click: "t0//comp.discover.open", set: "discover" },
    ],
    hold: 20,
  },
  {
    vo: "04-pick",
    actions: [
      { on: "pick", click: "comp.discover.brand.Yankee Candle", set: "pick1" },
      { on: "ones", after: 6, near: true, click: "comp.discover.brand.Brooklyn Candle Studio", set: "pick2" },
      { on: "care", after: 22, near: true, click: "comp.discover.brand.P.F. Candle Co.", set: "pick3" },
      { on: "track", after: 30, click: "comp.discover.save", set: "trackedSaved" },
    ],
    hold: 24,
  },
  { vo: "05-wall" },
  {
    vo: "06-brand",
    actions: [{ on: "click", after: 4, click: `t1//comp.chip.${BRAND_FOCUS}`, set: "brandOnly" }],
    hold: 20,
  },
  {
    vo: "07-lightbox",
    actions: [{ on: "open", after: 4, click: `t2//comp.ad.${LIGHTBOX_AD_ID}`, set: "lightbox" }],
  },
  {
    vo: "08-generate",
    actions: [{ on: "generate", after: 4, click: "comp.lightbox.generate", set: "genPanel" }],
    hold: 200,
  },
  {
    vo: "09-alerts",
    actions: [
      { on: "one", click: "agent.close", set: "panelClosed" },
      { on: "alerts", after: 4, click: `t2//comp.bell.${BRAND_FOCUS}`, set: "bellDialog" },
      { on: "enable", after: 6, click: "comp.notify.enable", set: "bellOn" },
    ],
    hold: 30,
  },
  { vo: "10-close" },
];
