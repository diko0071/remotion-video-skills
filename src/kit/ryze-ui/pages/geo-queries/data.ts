import { Engine, Keyword, QueriesKpi, QueriesTab, Topic } from "./types";

export const ENGINES: Engine[] = [
  { key: "chat_gpt", label: "ChatGPT", icon: "ai/chatgpt.png" },
  { key: "claude", label: "Claude", icon: "ai/claude.png" },
  { key: "gemini", label: "Gemini", icon: "ai/gemini.png" },
  { key: "perplexity", label: "Perplexity", icon: "ai/perplexity.webp" },
];

export const TOPICS: Topic[] = [
  {
    name: "Candle gift sets",
    open: true,
    visibility: "29%",
    position: "#5",
    engines: [true, true, true, true],
    lastRun: "2026-08-13",
    prompts: [
      {
        text: "best candle gift sets under $50",
        engines: [false, true, false, true],
        position: 4,
        lastRun: "2026-08-13",
      },
      {
        text: "housewarming gift ideas for someone who loves candles",
        engines: [true, false, true, false],
        position: 7,
        lastRun: "2026-08-13",
      },
      {
        text: "where to buy hand poured candle gift boxes online",
        engines: [false, true, false, false],
        position: 3,
        lastRun: "2026-08-13",
      },
      {
        text: "candle gift set vs candle subscription which is better",
        engines: [false, false, false, false],
        position: null,
        lastRun: "2026-08-13",
      },
      {
        text: "luxury soy candle gift sets for the holidays",
        engines: [false, true, false, true],
        position: 6,
        lastRun: "2026-08-13",
      },
      {
        text: "affordable candle gifts for coworkers",
        engines: [false, false, false, false],
        position: null,
        lastRun: "2026-08-12",
      },
    ],
  },
  {
    name: "Non-toxic candles",
    open: true,
    visibility: "30%",
    position: "#8",
    engines: [true, true, false, true],
    lastRun: "2026-08-13",
    prompts: [
      {
        text: "are soy candles safer to burn than paraffin candles",
        engines: [true, false, false, false],
        position: 8,
        lastRun: "2026-08-13",
      },
      {
        text: "best non toxic candles for a nursery",
        engines: [false, false, false, true],
        position: 10,
        lastRun: "2026-08-13",
      },
      {
        text: "which candle brands disclose their fragrance ingredients",
        engines: [true, true, false, false],
        position: 5,
        lastRun: "2026-08-13",
      },
      {
        text: "do wooden wick candles release less soot",
        engines: [false, true, false, false],
        position: 6,
        lastRun: "2026-08-12",
      },
      {
        text: "clean burning candles without phthalates",
        engines: [false, true, false, false],
        position: 9,
        lastRun: "2026-08-12",
      },
    ],
  },
  {
    name: "Scent guides",
    open: false,
    visibility: "20%",
    position: "#9",
    engines: [true, true, false, false],
    lastRun: "2026-08-13",
    prompts: [
      {
        text: "what candle scents work best in a small apartment",
        engines: [false, true, false, false],
        position: 9,
        lastRun: "2026-08-13",
      },
      {
        text: "which candle scents feel warm in autumn",
        engines: [true, false, false, false],
        position: 8,
        lastRun: "2026-08-13",
      },
      {
        text: "how to layer candle scents across a living room",
        engines: [false, false, false, false],
        position: null,
        lastRun: "2026-08-13",
      },
      {
        text: "best bedroom candle scents for winding down",
        engines: [false, true, false, false],
        position: 11,
        lastRun: "2026-08-12",
      },
      {
        text: "do smoky cedar candles work in a kitchen",
        engines: [false, false, false, false],
        position: null,
        lastRun: "2026-08-12",
      },
    ],
  },
  {
    name: "Wood wick candles",
    open: false,
    visibility: "19%",
    position: "#7",
    engines: [false, true, true, false],
    lastRun: "2026-08-13",
    prompts: [
      {
        text: "wood wick vs cotton wick candles which burns longer",
        engines: [false, true, false, false],
        position: 6,
        lastRun: "2026-08-13",
      },
      {
        text: "why does my wood wick candle keep going out",
        engines: [false, false, true, false],
        position: 9,
        lastRun: "2026-08-13",
      },
      {
        text: "how to trim a wooden candle wick",
        engines: [false, true, false, false],
        position: 7,
        lastRun: "2026-08-13",
      },
      {
        text: "are crackling candles worth the price",
        engines: [false, false, false, false],
        position: null,
        lastRun: "2026-08-12",
      },
    ],
  },
  {
    name: "Ember & Oak vs competitors",
    open: false,
    visibility: "81%",
    position: "#2",
    engines: [true, true, true, true],
    lastRun: "2026-08-13",
    prompts: [
      {
        text: "is Ember & Oak a good hand-poured candle brand",
        engines: [true, true, true, true],
        position: 1,
        lastRun: "2026-08-13",
      },
      {
        text: "Ember & Oak vs Brooklyn Candle Studio",
        engines: [true, true, false, true],
        position: 2,
        lastRun: "2026-08-13",
      },
      {
        text: "Ember & Oak vs Yankee Candle which is better value",
        engines: [true, true, true, false],
        position: 2,
        lastRun: "2026-08-13",
      },
      {
        text: "who makes the best small-batch soy candles",
        engines: [true, true, false, true],
        position: 4,
        lastRun: "2026-08-13",
      },
    ],
  },
];

export const KPIS: QueriesKpi[] = [
  { label: "Keywords", value: "128" },
  { label: "Avg search volume", value: "2430" },
  { label: "AI prompts", value: "24/50" },
  { label: "AI visibility", value: "34%" },
];

export const TABS: QueriesTab[] = [
  { label: "Keywords", count: 128, active: false },
  { label: "Prompts", count: 24, active: true },
];

export const KEYWORD_TABS: QueriesTab[] = [
  { label: "Keywords", count: 128, active: true },
  { label: "Prompts", count: 24, active: false },
];

export const KEYWORDS: Keyword[] = [
  { text: "hand poured candles", volume: 8100, difficulty: 41, position: 7, delta: -3, trend: [14, 13, 11, 11, 9, 8, 7] },
  { text: "wood wick candles", volume: 6600, difficulty: 38, position: 9, delta: -2, trend: [15, 14, 14, 12, 11, 10, 9] },
  { text: "non toxic candles", volume: 5400, difficulty: 52, position: 12, delta: 1, trend: [10, 11, 11, 12, 13, 12, 12] },
  { text: "candle gift set", volume: 4400, difficulty: 47, position: 14, delta: -4, trend: [22, 21, 19, 17, 16, 15, 14] },
  { text: "coconut wax candles", volume: 3600, difficulty: 29, position: 5, delta: -1, trend: [8, 8, 7, 7, 6, 6, 5] },
  { text: "best candles for living room", volume: 2900, difficulty: 44, position: 18, delta: 2, trend: [14, 15, 15, 16, 17, 18, 18] },
  { text: "candle refill jars", volume: 2400, difficulty: 22, position: 4, delta: -2, trend: [9, 8, 7, 6, 6, 5, 4] },
  { text: "small batch candle studio", volume: 1900, difficulty: 18, position: 3, delta: 0, trend: [4, 3, 3, 3, 3, 3, 3] },
  { text: "how to trim a wooden wick", volume: 1600, difficulty: 15, position: 2, delta: -1, trend: [5, 4, 4, 3, 3, 2, 2] },
  { text: "candle subscription box", volume: 1300, difficulty: 56, position: 24, delta: 3, trend: [19, 20, 21, 22, 22, 23, 24] },
  { text: "soy vs paraffin candles", volume: 1000, difficulty: 33, position: 8, delta: -5, trend: [17, 15, 13, 12, 10, 9, 8] },
  { text: "housewarming candle gift", volume: 880, difficulty: 36, position: 11, delta: -2, trend: [16, 15, 14, 13, 13, 12, 11] },
  { text: "asheville candle company", volume: 720, difficulty: 12, position: 1, delta: 0, trend: [2, 1, 1, 1, 1, 1, 1] },
  { text: "candle burn time by size", volume: 590, difficulty: 21, position: 6, delta: -1, trend: [9, 8, 8, 7, 7, 6, 6] },
];
