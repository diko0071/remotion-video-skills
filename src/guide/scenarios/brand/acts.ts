import type { GuideAct } from "../../script";

export const ACTS: GuideAct[] = [
  { vo: "01-page" },
  { vo: "02-identity" },
  {
    vo: "03-visual",
    actions: [{ on: "visual", after: -6, click: "b1//tab.brand.Visual", set: "visual" }],
    hold: 24,
  },
  {
    vo: "04-context",
    actions: [{ on: "context", after: 2, click: "b2//tab.brand.Context", set: "context" }],
    hold: 24,
  },
  {
    vo: "05-notes",
    actions: [
      { on: "tell", after: 4, click: "b3//brand.notes.edit", set: "notesDialog" },
      { on: "remember", after: 6, set: "notesTyping" },
      { on: "rules", after: 8, click: "brand.notes.save", set: "notesSaved" },
    ],
    hold: 30,
  },
  { vo: "06-examples" },
  {
    vo: "06b-improve",
    actions: [{ on: "hit", after: 2, click: "b4//brand.improve", set: "improvePanel" }],
    hold: 60,
  },
  { vo: "07-close", hold: 30 },
];
