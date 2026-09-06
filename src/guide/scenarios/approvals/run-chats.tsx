import React from "react";
import { useCurrentFrame } from "remotion";
import { ChatTurnBlock, turnMarks, type ChatTurn } from "../../../kit/chat";
import "../../../kit/chat/chat.css";
import { ChatPage } from "../../../kit/ryze-ui/chat-page";

const RESEARCH_TURN: ChatTurn = {
  prompt:
    "Weekly paid-ads research: go through Google Ads, find wasted spend and improvement opportunities, and file each one for approval.",
  instant: true,
  reasoning: { seconds: 4 },
  tools: {
    summary: "Pulled 30 days of account data",
    rows: [
      { name: "google_ads__get_campaigns" },
      { name: "google_ads__get_ad_groups" },
      { name: "google_ads__get_keywords" },
      { name: "google_ads__get_search_terms" },
      { name: "google_ads__get_conversions" },
      { name: "google_ads__get_change_history" },
      { name: "google_ads__get_budget_pacing" },
    ],
  },
  answer: [
    {
      kind: "p",
      text: "Went through all 4 campaigns, 11 ad groups and 96 keywords. The account is healthy overall — Search — Candles US converts at an $18.40 CPA and Prospecting — Cozy Home holds a 4.1x ROAS — but three things are leaking money.",
    },
    {
      kind: "p",
      text: "First: three broad-match keywords spent $214.36 in 30 days without a single conversion — candle brands alone burned $96.10 on 1,204 clicks, and all three sit at Quality Score 3–4 against a campaign median of 7. Second: Prospecting — Cozy Home is capped by budget on its best days — it hit the $60 daily cap 11 times this month while converting at 4.1x. Third: the Retargeting — Cart Abandoners campaign keeps buying Audience Network placements that produced 0 conversions on $41 of spend.",
    },
    {
      kind: "p",
      text: "Filed 3 proposals for your approval: pause the 3 dead keywords (≈ $214/mo saved), raise the Cozy Home budget to $95/day, and exclude the Audience Network placement. Each card carries the full evidence — approve what you agree with.",
    },
  ],
};

const APPLY_TURN: ChatTurn = {
  prompt: "Apply: Pause 3 keywords burning spend with zero conversions",
  instant: true,
  reasoning: { seconds: 1 },
  tools: {
    summary: "Paused 3 keywords in Search — Candles US",
    rows: [
      { name: "google_ads__update_keywords" },
      { name: "google_ads__get_keywords" },
    ],
  },
  answer: [
    {
      kind: "p",
      text: "Done. All three keywords are paused in Search — Candles US, verified against the live account. The freed budget stays on the converting terms — I'll report the CPA shift in next week's run.",
    },
  ],
};

const RunChat: React.FC<{ title: string; turn: ChatTurn; from: number; settled?: boolean }> = ({
  title,
  turn,
  from,
  settled,
}) => {
  const frame = useCurrentFrame();
  const start = settled ? from - 4000 : from;
  if (frame < from - 2) return <div />;
  return (
    <ChatPage title={title} className="guide-run-chat">
      <ChatTurnBlock turn={turn} marks={turnMarks(turn, start)} frozen={false} />
    </ChatPage>
  );
};

export const ResearchRunChat: React.FC<{ from: number }> = ({ from }) => (
  <RunChat
    title="Paid Ads Scheduled Agent, Aug 17, 6:00 AM"
    turn={RESEARCH_TURN}
    from={from}
    settled
  />
);

export const ApplyRunChat: React.FC<{ from: number }> = ({ from }) => (
  <RunChat title="Apply: Pause 3 keywords, Aug 17" turn={APPLY_TURN} from={from} />
);
