import type { GuideAct } from "../../script";

export const DRAFT_TITLE = "Why your candle tunnels and how to fix it";

export const ACTS: GuideAct[] = [
  {
    vo: "01-connect",
    actions: [{ on: "shopify", after: -20, click: "i1//intg-filter.Commerce & CMS", set: "cmsFilter" }],
  },
  {
    vo: "02-connected",
    actions: [{ on: "setup", after: -30, click: "i2//intg.Shopify", set: "connected" }],
    hold: 30,
  },
  {
    vo: "03-plan",
    actions: [
      { on: "now", click: "nav.dashboard.SEO", set: "seoRail" },
      { on: "researched", after: 4, click: "nav.seo.Content Plan", set: "plan" },
    ],
  },
  {
    vo: "04-planned",
    actions: [{ on: "planned", after: 2, click: "cp.tab.Planned", set: "tabPlanned" }],
  },
  { vo: "04b-autowrite" },
  {
    vo: "04c-generate",
    actions: [
      { on: "open", after: 4, click: "p1//article.dots", set: "plMenu" },
      { on: "generate", after: 2, click: "p1//article.menu.generate", set: "plGenerate" },
    ],
    hold: 30,
  },
  {
    vo: "05-drafted",
    actions: [{ on: "drafted", after: 2, click: "cp.tab.Drafted", set: "tabDrafted" }],
  },
  {
    vo: "06-published",
    actions: [{ on: "published", after: 2, click: "cp.tab.Published", set: "tabPublished" }],
  },
  {
    vo: "07-open",
    actions: [
      { on: "draft", after: -10, click: "cp.tab.Drafted", set: "tabDrafted2" },
      { on: "goes", click: `cp.${DRAFT_TITLE}`, set: "preview" },
    ],
    hold: 26,
  },
  { vo: "08-preview" },
  {
    vo: "09-ai",
    actions: [{ on: "ask", after: 4, click: "article.improve", set: "improvePanel" }],
    hold: 200,
  },
  {
    vo: "10-edit",
    actions: [
      { on: "or", click: "agent.close", set: "panelClosed" },
      { on: "yourself", after: 4, near: true, click: "preview.edit", set: "editor" },
    ],
    hold: 30,
  },
  { vo: "11-editor" },
  {
    vo: "12-image",
    actions: [{ on: "click", after: 4, click: "article.image.regenerate", set: "regen" }],
    hold: 40,
  },
  {
    vo: "13-save",
    actions: [
      { on: "save", after: 4, click: "article.save", set: "saved" },
      { on: "article", after: 6, click: "editor.back", set: "backToPreview" },
    ],
    hold: 26,
  },
  {
    vo: "14-publish",
    actions: [
      { on: "publish", after: 4, click: "article.publish", set: "published" },
      { on: "site", after: 8, click: "preview.back", set: "backToPlan" },
    ],
    hold: 30,
  },
  {
    vo: "15-auto",
    actions: [
      { on: "settings", after: 4, click: "nav.seo.Settings", set: "settings" },
      { on: "automatic", after: 6, click: "settings.mode.auto", set: "auto" },
    ],
  },
  { vo: "16-provider" },
  {
    vo: "17-republish",
    actions: [
      { on: "republish", after: -20, click: "nav.seo.Content Plan", set: "planAgain" },
      { on: "push", after: 0, click: "p2//article.dots", set: "menu" },
      { on: "send", after: 4, click: "p2//article.menu.republish", set: "republishDlg" },
      { on: "you", after: 10, click: "republish.confirm", set: "republished" },
    ],
    hold: 40,
  },
  { vo: "18-close" },
];
