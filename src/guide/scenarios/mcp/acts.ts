import type { GuideAct } from "../../script";

export const ACTS: GuideAct[] = [
  {
    vo: "01-card",
    actions: [
      { on: "hit", after: 4, click: "i1//intg.Claude MCP", set: "dialog" },
    ],
    hold: 30,
  },
  {
    vo: "02-copy",
    actions: [
      { on: "copy", after: 4, click: "rz.copy", set: "copied" },
      { on: "open", after: 4, click: "rz.open", set: "claudeSettings" },
    ],
    hold: 24,
  },
  {
    vo: "03-add",
    actions: [
      { on: "add", after: 4, click: "cl.add", set: "popup" },
      { on: "paste", after: 8, set: "pasted" },
      { on: "setup", after: 0, click: "cl.popup.add", set: "connected" },
    ],
    hold: 60,
  },
  {
    vo: "04-ask",
    actions: [
      { on: "chat", after: 4, set: "claudeChat" },
      { on: "ask", after: 8, click: "cl.composer", set: "focus1" },
      { on: "walks", after: 10, set: "sent1" },
    ],
    hold: 190,
  },
  { vo: "05-close", hold: 40 },
];
