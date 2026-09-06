import type { GuideAct } from "../../script";

export const ACTS: GuideAct[] = [
  {
    vo: "01-library",
    actions: [{ on: "hit", after: 4, click: "l1//crv.generate", set: "panel" }],
    hold: 30,
  },
  { vo: "02-seeded", hold: 20 },
  {
    vo: "03-ask",
    actions: [
      { on: "answer", after: 0, click: "composer", set: "focus" },
      { on: "photos", after: 2, click: "composer.plus", set: "plusMenu" },
      { on: "computer", after: 2, near: true, click: "menu.upload", set: "attached" },
      { on: "send", after: 4, click: "composer.send", set: "sent" },
    ],
    hold: 40,
  },
  {
    vo: "04-generated",
    actions: [
      { on: "width", after: 0, click: "agent.expand", set: "expand" },
      { on: "cuts", after: 0, scroll: 360 },
    ],
    hold: 50,
  },
  {
    vo: "05-annotate",
    actions: [
      { on: "brush", after: 4, click: "f1//crv.annotate", set: "lightbox" },
      { on: "spot", after: 2, near: true, click: "lb.spot1", set: "pin1" },
      { on: "type", after: 2, set: "note1" },
      { on: "second", after: 2, near: true, click: "lb.spot2", set: "pin2" },
      { on: "another", after: 4, set: "note2" },
    ],
    hold: 40,
  },
  {
    vo: "06-send",
    actions: [
      { on: "send", after: 4, click: "lb.send", set: "annotateSent" },
      { on: "send", after: 12, scroll: 980 },
    ],
    hold: 30,
  },
  {
    vo: "07-text",
    actions: [
      { on: "plain", after: 0, click: "composer", set: "focus2" },
      { on: "warmer", after: 10, click: "composer.send", set: "sent2" },
      { on: "comes", after: 0, scroll: 1880 },
    ],
    hold: 170,
  },
  {
    vo: "08-templates",
    actions: [
      { on: "templates", after: 0, click: "nav.dashboard.Ad Templates", set: "tplPage" },
      { on: "pick", after: 0, click: "t1//adt.card.homesick_top-1-22d.jpg", set: "pick1" },
      { on: "love", after: 4, near: true, click: "t1//adt.card.otherland_top-2-107d.jpg", set: "pick2" },
      { on: "reference", after: 6, click: "t1//adt.use", set: "tplPanel" },
    ],
    hold: 60,
  },
  {
    vo: "09-competitors",
    actions: [
      { on: "leave", after: 4, click: "agent.close", set: "tplClosed" },
      { on: "competitor", after: 6, click: "nav.dashboard.Competitor Ads", set: "compPage" },
      { on: "open", after: 0, click: "c1//comp.ad.a2", set: "compLightbox" },
      { on: "iterate", after: 6, click: "comp.lightbox.generate", set: "compSent" },
    ],
    hold: 50,
  },
  {
    vo: "10-close",
    actions: [{ on: "everything", after: 0, click: "nav.dashboard.Ad Creatives", set: "backLib" }],
    hold: 40,
  },
];
