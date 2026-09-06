import type { GuideAct } from "../../script";

export const CARD_1 = "pause-keywords";
export const CARD_2 = "redirect-chain";
export const CARD_REJECT = "meta-title-soy";

export const ACTS: GuideAct[] = [
  { vo: "01-queue" },
  {
    vo: "02-open",
    actions: [{ on: "open", after: 4, click: `p1//apr.card.${CARD_1}`, set: "sheet1" }],
    hold: 26,
  },
  { vo: "03-evidence" },
  {
    vo: "03b-research",
    actions: [{ on: "open", after: 4, click: "s1//apr.sheet.research", set: "researchChat" }],
    hold: 40,
  },
  {
    vo: "04-approve",
    actions: [
      { on: "agree", after: -10, click: "nav.dashboard.Approvals", set: "backResearch" },
      { on: "approve", after: 4, click: `p1//apr.approve.${CARD_1}`, set: "approved1" },
    ],
    hold: 30,
  },
  {
    vo: "04b-apply",
    actions: [{ on: "watch", after: 4, click: `p2//apr.progress.${CARD_1}`, set: "applyChat" }],
    hold: 60,
  },
  {
    vo: "05-second",
    actions: [
      { on: "this", after: -8, click: "nav.dashboard.Approvals", set: "backApply" },
      { on: "redirect", after: 4, click: `p3//apr.card.${CARD_2}`, set: "sheet2" },
      { on: "approve", after: 6, click: "s2//apr.sheet.approve", set: "approved2" },
    ],
    hold: 30,
  },
  {
    vo: "06-reject",
    actions: [
      { on: "reject", after: 4, click: `p3b//apr.reject.${CARD_REJECT}`, set: "rejectDlg" },
      { on: "why", after: 8, set: "reasonTyping" },
    ],
    hold: 40,
  },
  {
    vo: "07-learning",
    actions: [{ on: "decision", after: -6, click: "apr.rejectdlg.confirm", set: "rejected" }],
  },
  {
    vo: "08-blocked",
    actions: [{ on: "honest", after: 4, click: "p4//apr.card.connect-google-ads", set: "sheetBlocked" }],
    hold: 26,
  },
  {
    vo: "09-history",
    actions: [
      { on: "everything", click: "sb//apr.sheet.ack", set: "blockedClosed" },
      { on: "history", after: 4, click: "p4//apr.tab.History", set: "history" },
    ],
    hold: 26,
  },
  { vo: "10-close" },
];
