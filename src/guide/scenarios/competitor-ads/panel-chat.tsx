import React from "react";
import { useCurrentFrame } from "remotion";
import { ChatTurnBlock, turnMarks, type ChatTurn } from "../../../kit/chat";
import "../../../kit/chat/chat.css";

const GENERATE_PROMPT =
  "Help me iterate on this competitor ad — create my own version of it.";

export const GENERATE_TURN: ChatTurn = {
  prompt: GENERATE_PROMPT,
  instant: true,
  attachments: ["comp-ads/yankee-living.jpg"],
  attachmentSize: 84,
  reasoning: { seconds: 2 },
  tools: {
    summary: "Studied the ad and your brand",
    rows: [{ name: "competitors__get_creative" }, { name: "brand__get_brand" }],
  },
  answer: [
    {
      kind: "p",
      text: "Their ad sells a morning ritual, not a candle — that's why it survived 91 days. Here are two Ember & Oak takes on the same angle, in your palette and voice:",
    },
  ],
  result: {
    kind: "creatives",
    title: "Your versions",
    items: [
      {
        file: "hero-candles.jpg",
        name: "sunday-slow.jpg",
        caption: "“Sundays are for slow burns”",
      },
      {
        file: "product-1.jpg",
        name: "first-light.jpg",
        caption: "“Light it before the coffee's ready”",
      },
    ],
  },
};

export const PanelThread: React.FC<{ from: number }> = ({ from }) => {
  const frame = useCurrentFrame();
  if (frame < from - 2) return <div className="guide-thread" />;
  return (
    <div className="guide-thread">
      <ChatTurnBlock turn={GENERATE_TURN} marks={turnMarks(GENERATE_TURN, from)} frozen={false} />
    </div>
  );
};
