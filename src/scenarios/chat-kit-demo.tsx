import React from "react";
import { Sequence } from "remotion";
import { ChatConversation, turnMarks, type ChatTurn } from "../kit/chat";
import { PAID_ADS_TURNS } from "./walkthrough-paid-ads/chat-flow";

const AtFrame: React.FC<{ frame: number; children: React.ReactNode }> = ({ frame, children }) => (
  <Sequence from={-frame} layout="none">
    {children}
  </Sequence>
);

const SITE_TURN: ChatTurn = {
  prompt:
    "The soy candles collection is losing clicks. Rewrite the title and meta description on the live page and show me the result.",
  reasoning: { seconds: 6 },
  tools: {
    summary: "Loaded Skill: Shopify editing, checked Shopify, updated Shopify",
    rows: [
      { name: "shopify-editing", skill: true },
      { name: "shopify__get_collection" },
      { name: "google_search_console__list_queries" },
      {
        name: "shopify__update_collection_seo",
        state: "error",
        error: "429 Too Many Requests — retrying in 2s",
      },
      { name: "open_artifact" },
    ],
  },
  answer: [
    {
      kind: "p",
      text: "Updated and published. The old title was truncated at 68 characters and the meta description was empty.",
    },
    {
      kind: "bullets",
      items: [
        "**Title** — “Soy Candles | Hand Poured, Clean Burning | Ember & Oak” (54 characters)",
        "**Meta description** — leads with cedar & oak and the 48-hour burn time",
        "**H1** — kept as “Soy Candles” so it still matches the query",
      ],
    },
    {
      kind: "p",
      text: "On current impressions this is worth about **620 clicks a month**. Want me to do the gift sets collection next?",
    },
  ],
  artifact: {
    kind: "browser",
    name: "ember-and-oak.com/collections/soy-candles",
    site: {
      announce: "Free shipping on orders over $60 · Hand poured in Portland",
      brand: "EMBER & OAK",
      nav: [
        { label: "Candles", active: true },
        { label: "Gift Sets" },
        { label: "Wax Melts" },
        { label: "Refills" },
        { label: "Our Story" },
      ],
      actions: ["Search", "Account"],
      cart: "Cart (2)",
      hero: {
        img: "hero-candles.jpg",
        crumb: "Home / Collections / Soy Candles",
        title: "Soy Candles",
        text: "Slow-burning soy wax, cotton and wooden wicks, poured in small batches in our Portland studio. Every candle burns clean for at least 48 hours.",
      },
      toolbar: {
        count: "24 products",
        filters: ["Scent family", "Burn time", "Price"],
        sort: "Sort: Best selling",
      },
      products: [
        {
          name: "Ember No. 4 — Cedar & Oak",
          price: "$38.00",
          note: "Wooden wick · 60 hr",
          img: "product-1.jpg",
        },
        {
          name: "Amber Jar — Fig & Smoke",
          price: "$34.00",
          note: "Cotton wick · 48 hr",
          img: "product-2.jpg",
        },
        {
          name: "Hearthstone — Vetiver",
          price: "$42.00",
          note: "Wooden wick · 60 hr",
          img: "product-3.jpg",
        },
        {
          name: "Oak Grove — Bergamot",
          price: "$36.00",
          note: "Cotton wick · 52 hr",
          img: "banner-candles.jpg",
        },
      ],
    },
  },
};

const SITE_TURNS: ChatTurn[] = [SITE_TURN];

export const ChatKitTurn1: React.FC = () => (
  <AtFrame frame={turnMarks(PAID_ADS_TURNS[0]).resultAt + 24}>
    <ChatConversation title="Autumn Cabin — ads" turns={PAID_ADS_TURNS} active={0} />
  </AtFrame>
);

export const ChatKitTurn2: React.FC = () => (
  <AtFrame frame={turnMarks(PAID_ADS_TURNS[1]).resultAt + 24}>
    <ChatConversation title="Autumn Cabin — ads" turns={PAID_ADS_TURNS} active={1} />
  </AtFrame>
);

export const ChatKitArtifactTurn: React.FC = () => (
  <AtFrame frame={turnMarks(SITE_TURN).artifactAt + 24}>
    <ChatConversation
      title="Fix the soy candles collection page"
      turns={SITE_TURNS}
      active={0}
    />
  </AtFrame>
);

export const ChatKitTyping: React.FC = () => (
  <AtFrame frame={turnMarks(PAID_ADS_TURNS[2]).typeTo - 8}>
    <ChatConversation title="Autumn Cabin — ads" turns={PAID_ADS_TURNS} active={2} />
  </AtFrame>
);

export const ChatKitTypingFirst: React.FC = () => (
  <AtFrame frame={turnMarks(PAID_ADS_TURNS[0]).typeTo - 6}>
    <ChatConversation title="Autumn Cabin — ads" turns={PAID_ADS_TURNS} active={0} />
  </AtFrame>
);

export const ChatKitArtifactOpening: React.FC = () => (
  <AtFrame frame={turnMarks(SITE_TURN).artifactAt + 7}>
    <ChatConversation title="Soy candles — organic traffic" turns={[SITE_TURN]} active={0} />
  </AtFrame>
);

export const ChatKitFirstSent: React.FC = () => (
  <AtFrame frame={turnMarks(PAID_ADS_TURNS[0]).toolsAt + 30}>
    <ChatConversation title="Autumn Cabin — ads" turns={PAID_ADS_TURNS} active={0} />
  </AtFrame>
);
