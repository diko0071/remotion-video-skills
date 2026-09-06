import type { ChatTurn } from "../../../kit/chat";

export const Q_OVERSPEND = "Where am I overspending?";

export const OVERSPEND_TURN: ChatTurn = {
  prompt: Q_OVERSPEND,
  instant: true,
  reasoning: { seconds: 2 },
  tools: {
    summary: "Checked both ad accounts",
    rows: [
      { name: "Google ads run gaql" },
      { name: "Meta ads run raw insights" },
    ],
  },
  answer: [
    {
      kind: "p",
      text: "Three leaks, $834 a month combined:",
    },
    {
      kind: "bullets",
      items: [
        "$412/mo — zero-conversion keywords on Google Search",
        "$268/mo — fatigued creative in Meta prospecting",
        "$154/mo — broad targeting in Performance Max",
      ],
    },
    {
      kind: "p",
      text: "The biggest one is a broad-match ad group spending with zero purchases. Want me to pause it?",
    },
  ],
};
