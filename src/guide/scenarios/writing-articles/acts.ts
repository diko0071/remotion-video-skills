import type { GuideAct } from "../../script";

export const ACTS: GuideAct[] = [
  {
    vo: "01-article",
    actions: [{ on: "hit", after: 2, click: "p1//preview.edit", set: "edit" }],
    hold: 24,
  },
  { vo: "02-edit", hold: 24 },
  {
    vo: "03-image",
    actions: [
      { on: "regenerate", after: 4, click: "e1//article.image.regenerate", set: "regenDlg" },
      { on: "say", after: 0, set: "regenTyping" },
      { on: "reworks", after: -4, click: "dlg.regen.generate", set: "regenDone" },
    ],
    hold: 30,
  },
  {
    vo: "04-products",
    actions: [
      { on: "drop", after: 0, set: "prodScroll", scroll: 560 },
      { on: "slash", after: 2, set: "slashOpen" },
      { on: "block", after: 0, click: "slash.Products block", set: "productsBlock" },
      { on: "store", after: 4, click: "block.products.search", set: "searchDlg" },
      { on: "couple", after: 4, click: "dlg.products.row1", set: "picked1" },
      { on: "cards", after: -6, click: "dlg.products.row2", set: "picked2" },
      { on: "sit", after: -2, click: "dlg.products.add", set: "productsAdded" },
    ],
    hold: 30,
  },
  {
    vo: "05-faq",
    actions: [
      { on: "same", after: 0, set: "faqScroll", scroll: 1080 },
      { on: "idea", after: 4, set: "slash2Open" },
      { on: "block", after: 2, click: "slash.FAQ block", set: "faqBlock" },
      { on: "write", after: 4, set: "faqTyping" },
    ],
    hold: 34,
  },
  {
    vo: "05c-agent",
    actions: [
      { on: "open", after: 0, set: "agentScroll", scroll: 0 },
      { on: "bar", after: -14, click: "navbar.agent", set: "agentPanel" },
      { on: "box", after: -6, click: "composer", set: "agentTyping" },
      { on: "reads", after: -10, click: "composer.send", set: "agentSend" },
    ],
    hold: 280,
  },
  {
    vo: "06-settings",
    actions: [
      { on: "now", after: -8, click: "agent.close", set: "panelClosed" },
      { on: "settings", after: -6, click: "nav.seo.Settings", set: "settings" },
      { on: "tone", after: 0, set: "toneTyping" },
      { on: "rule", after: -20, set: "instrTyping" },
    ],
    hold: 30,
  },
  {
    vo: "07-visuals",
    actions: [
      { on: "pictures", after: 2, set: "visualsScroll", scroll: 430 },
      { on: "sketch", after: -6, click: "s1//st.style.sketch", set: "styleSketch" },
      { on: "choose", after: 2, click: "s1//st.style.custom", set: "refsDlg" },
      { on: "upload", after: -4, click: "dlg.refs.upload", set: "upload1" },
      { on: "product", after: 0, click: "dlg.refs.upload", set: "upload2" },
      { on: "save", after: 0, click: "dlg.refs.save", set: "refsSaved" },
    ],
    hold: 40,
  },
  { vo: "08-close", hold: 30 },
];
