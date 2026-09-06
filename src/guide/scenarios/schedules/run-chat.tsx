import React from "react";
import { ChatTurnBlock, turnMarks, type ChatTurn } from "../../../kit/chat";
import "../../../kit/chat/chat.css";
import { ChatPage } from "../../../kit/ryze-ui/chat-page";
import { SCHEDULE_TASK_TEXT } from "../../../kit/ryze-ui/pages/schedules";

const RUN_TURN: ChatTurn = {
  prompt: SCHEDULE_TASK_TEXT,
  instant: true,
  tools: {
    summary: "Checked Meta Ads 2 times, checked Google Ads 2 times",
    rows: [
      { name: "meta_ads__get_campaign_insights" },
      { name: "meta_ads__list_campaigns" },
      { name: "google_ads__get_campaign_performance" },
      { name: "google_ads__list_search_terms" },
    ],
  },
  answer: [
    {
      kind: "p",
      text: "Spend held flat at **$4,180** while conversions rose **18%**, so blended CPA fell from $41 to $34.",
    },
    {
      kind: "bullets",
      items: [
        "**Biggest mover** — Meta “Gift Sets — Broad” went from 46 to 89 purchases after the creative swap",
        "**Next week** — cap “Candle Care” on Google: its search terms drifted to wax melts and burned $260 for 3 conversions",
      ],
    },
  ],
  result: {
    kind: "metrics",
    title: "Last 7 days vs previous 7",
    items: [
      { label: "Spend", value: "$4,180", note: "−1%" },
      { label: "Conversions", value: "182", note: "+18%" },
      { label: "CPA", value: "$34", note: "−17%" },
      { label: "ROAS", value: "3.4x", note: "+0.5" },
    ],
  },
};

export const RunChatBody: React.FC = () => (
  <ChatPage title="Weekly performance digest — Aug 11" className="chat-conv">
    <ChatTurnBlock turn={RUN_TURN} marks={turnMarks(RUN_TURN)} frozen />
  </ChatPage>
);
