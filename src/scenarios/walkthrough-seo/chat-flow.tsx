import React from "react";
import { ChatConversation, turnDuration, type ChatTurn } from "../../kit/chat";

const TITLE = "Soy candles — organic traffic";

export const SEO_TURNS: ChatTurn[] = [
  {
    prompt: "Where are we losing traffic on Google?",
    reasoning: { seconds: 5 },
    tools: {
      summary: "Checked Google Search Console 3 times, checked Shopify",
      rows: [
        { name: "google_search_console__list_queries" },
        { name: "google_search_console__list_pages" },
        { name: "google_search_console__get_indexation_summary" },
        { name: "shopify__get_collection" },
      ],
    },
    answer: [
      {
        kind: "p",
        text: "Four pages slipped out of the top ten in the last month. Together they used to bring **1,240 clicks** a month.",
      },
    ],
    result: {
      kind: "chart",
      title: "Clicks lost per page",
      subtitle: "Last 28 days vs previous 28 days",
      chart: {
        kind: "bar",
        max: 520,
        format: "plain",
        series: [{ key: "lost", label: "Clicks lost" }],
        data: [
          { label: "/collections/soy-candles", lost: 480, note: "pos 6 → 11" },
          { label: "/blog/candle-tunneling", lost: 320, note: "pos 3 → 8" },
          { label: "/collections/gift-sets", lost: 260, note: "pos 8 → 14" },
          { label: "/blog/soy-vs-paraffin", lost: 180, note: "pos 5 → 9" },
        ],
      },
    },
  },
  {
    prompt: "Rewrite the soy candles page and show me the live result",
    tools: {
      summary: "Loaded Skill: Shopify editing, checked Shopify, updated Shopify",
      rows: [
        { name: "skills__shopify_editing", skill: true },
        { name: "shopify__get_collection" },
        { name: "shopify__update_collection_seo" },
        { name: "artifacts__open_artifact" },
      ],
    },
    answer: [
      {
        kind: "p",
        text: "Updated and published. The old title was cut off at 68 characters and the description was empty.",
      },
      {
        kind: "bullets",
        items: [
          "**Title** — “Soy Candles | Hand Poured, Clean Burning | Ember & Oak”",
          "**Meta description** — leads with cedar and oak and the 48-hour burn",
        ],
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
  },
  {
    prompt: "Do ChatGPT and Claude mention us when people ask for candles?",
    reasoning: { seconds: 6 },
    tools: {
      summary: "Checked Queries 4 times",
      rows: [
        { name: "queries__run_prompts" },
        { name: "queries__get_visibility" },
        { name: "queries__get_share_of_voice" },
      ],
    },
    answer: [
      {
        kind: "p",
        text: "You are named in **110 of 480** answers — third in your niche. Yankee Candle is named four times more often.",
      },
    ],
    result: {
      kind: "chart",
      title: "Brands named in AI answers",
      subtitle: "480 answers across ChatGPT, Claude, Gemini and Perplexity",
      chart: {
        kind: "bar",
        max: 210,
        format: "plain",
        series: [{ key: "named", label: "Answers naming the brand" }],
        data: [
          { label: "yankeecandle.com", named: 199, note: "41.5%" },
          { label: "brooklyncandle.com", named: 116, note: "24.2%" },
          { label: "ember-and-oak.com", named: 110, note: "22.9%" },
          { label: "diptyqueparis.com", named: 79, note: "16.5%" },
        ],
      },
    },
  },
];

export const SEO_TURN_FRAMES = SEO_TURNS.map(turnDuration);

export const SeoChatTurn1: React.FC = () => (
  <ChatConversation title={TITLE} turns={SEO_TURNS} active={0} />
);
export const SeoChatTurn2: React.FC = () => (
  <ChatConversation title={TITLE} turns={SEO_TURNS} active={1} />
);
export const SeoChatTurn3: React.FC = () => (
  <ChatConversation title={TITLE} turns={SEO_TURNS} active={2} />
);
