import React from "react";
import { useCurrentFrame } from "remotion";
import { ChatTurnBlock, turnMarks, type ChatTurn } from "../../../kit/chat";
import "../../../kit/chat/chat.css";

const WASTE_PROMPT =
  "Identify campaigns spending >$500/week with ROAS <2 over last 14d (min 20 conv for significance). Per campaign: spend, conv, top wasted search terms, % spend on Search partners + Display expansion, and whether Smart Bidding is beating a manual benchmark. Recommend pause, -40% budget, or targeting tightening.";

const DECK_PROMPT =
  "Build me a monthly client report deck for this workspace covering last month. Pull real numbers first, then 9-10 slides: a conclusion cover, month hero stats versus the prior month, the revenue trend, channel split with ROAS, what we shipped and its impact, one honest underperformer, top campaigns, and next month's plan as P0/P1 priorities.";

export const WASTE_TURN: ChatTurn = {
  prompt: WASTE_PROMPT,
  instant: true,
  reasoning: { seconds: 2 },
  tools: {
    summary: "Checking Google Ads",
    rows: [
      { name: "google_ads__list_campaigns" },
      { name: "google_ads__list_search_terms", state: "running" },
    ],
  },
};

export const DECK_TURN: ChatTurn = {
  prompt: DECK_PROMPT,
  instant: true,
  reasoning: { seconds: 2 },
  tools: {
    summary: "Checking Google Ads and GA4",
    rows: [
      { name: "google_ads__get_campaign_performance" },
      { name: "google_analytics__get_revenue_report", state: "running" },
    ],
  },
};

export const PanelThread: React.FC<{ turn: ChatTurn; from: number }> = ({ turn, from }) => {
  const frame = useCurrentFrame();
  if (frame < from - 2) return <div className="guide-thread" />;
  return (
    <div className="guide-thread">
      <ChatTurnBlock turn={turn} marks={turnMarks(turn, from)} frozen={false} />
    </div>
  );
};
