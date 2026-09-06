import React from "react";
import { ChatConversation, turnDuration, type ChatTurn } from "../../kit/chat";

const TITLE = "Autumn Cabin — ads";

export const PAID_ADS_TURNS: ChatTurn[] = [
  {
    prompt: "Make three ad creatives for our autumn candle collection",
    tools: {
      summary: "Checked Brand, checked Shopify, made 3 changes in Ad Creatives",
      rows: [
        { name: "brand__get_brand_profile" },
        { name: "shopify__list_top_products" },
        { name: "creatives__generate_creative" },
      ],
    },
    answer: [
      {
        kind: "p",
        text: "Here are three, each on a different angle — **scarcity**, **price**, and the clean-burn doubt.",
      },
    ],
    result: {
      kind: "creatives",
      title: "3 creatives ready",
      subtitle: "Autumn Cabin collection · Meta 4:5 and 1:1",
      items: [
        {
          file: "ad-templates/p-f-candle-co_top-1-57d.jpg",
          name: "Cabin Season — Hero",
          caption: "Hook: seasonal scarcity · 1080x1350",
        },
        {
          file: "ad-templates/homesick_top-1-22d.jpg",
          name: "Gift Set Under $50",
          caption: "Hook: price anchor · 1080x1080",
        },
        {
          file: "ad-templates/otherland_top-2-107d.jpg",
          name: "Clean Burn — Proof",
          caption: "Hook: ingredient objection · 1080x1350",
        },
      ],
    },
  },
  {
    prompt: "How did my campaigns do last week?",
    reasoning: { seconds: 4 },
    tools: {
      summary: "Checked Google Ads, checked Meta Ads, checked TikTok Ads",
      rows: [
        { name: "google_ads__run_report" },
        { name: "meta_ads__get_insights" },
        { name: "tiktok_ads__get_insights" },
      ],
    },
    answer: [
      {
        kind: "p",
        text: "You spent **$9,000** and made back three and a half times that. Brand search earns the most, TikTok the least.",
      },
    ],
    result: {
      kind: "chart",
      title: "Spend and return by campaign",
      subtitle: "Last 7 days · all platforms",
      chart: {
        kind: "bar",
        max: 3600,
        format: "usd",
        series: [{ key: "spend", label: "Spend" }],
        data: [
          { label: "PMax — Signature Wicks", spend: 3140, note: "4.6x" },
          { label: "Advantage+ — Autumn", spend: 2480, note: "3.2x" },
          { label: "Search — Brand", spend: 1260, note: "6.1x" },
          { label: "Retargeting — Cart 14d", spend: 1180, note: "2.4x" },
          { label: "Spark Ads — ASMR", spend: 940, note: "1.6x" },
        ],
      },
    },
  },
  {
    prompt: "Build a Meta campaign with the best creative and pause what is losing money",
    tools: {
      summary: "Checked Ad Creatives, checked Meta Ads, made 2 changes in Meta Ads",
      rows: [
        { name: "creatives__rank_creatives" },
        { name: "meta_ads__draft_campaign" },
        { name: "meta_ads__get_ad_group" },
      ],
    },
    answer: [{ kind: "p", text: "Ready. Nothing goes live until you approve it." }],
    result: {
      kind: "proposal",
      title: "New campaign ready for approval",
      subtitle: "Meta · Advantage+ Shopping · Autumn Cabin",
      rows: [
        {
          label: "Create campaign — Autumn Cabin",
          detail: "Meta · Advantage+ Shopping · 3 creatives",
          current: "no campaign",
          proposed: "$60/day",
        },
        {
          label: "Pause losing ad group",
          detail: "Candle Gifts — Broad · $412 spent, 0 purchases",
          current: "$29.40/day",
          proposed: "Paused",
        },
      ],
    },
  },
];

export const PAID_ADS_TURN_FRAMES = PAID_ADS_TURNS.map(turnDuration);

export const PaidAdsChatTurn1: React.FC = () => (
  <ChatConversation title={TITLE} turns={PAID_ADS_TURNS} active={0} />
);
export const PaidAdsChatTurn2: React.FC = () => (
  <ChatConversation title={TITLE} turns={PAID_ADS_TURNS} active={1} />
);
export const PaidAdsChatTurn3: React.FC = () => (
  <ChatConversation title={TITLE} turns={PAID_ADS_TURNS} active={2} />
);
