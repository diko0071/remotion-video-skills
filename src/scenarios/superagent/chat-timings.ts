import { at } from "./timings";

export const CHATX = {
  from: at(21.3),
  push: [at(21.3), at(21.9)] as const,
  cursorIn: at(21.5),
  click: at(22.0),
  type: [at(22.2), at(24.9)] as const,
  send: at(25.2),
  thread: at(25.35),
  chipAt: at(25.5),
  line1: [at(25.9), at(26.7)] as const,
  line2: [at(27.0), at(27.8)] as const,
  scroll1: at(28.3),
  headAt: at(28.5),
  cardsAt: at(28.6),
  cardFill: [at(28.9), at(29.6), at(30.2)],
  scroll2: at(31.0),
  askAt: at(31.2),
  yesAt: at(31.9),
  initAt: at(32.15),
  rowsAt: at(32.8),
  rowFill: [at(33.8), at(34.1), at(34.5), at(34.9)],
  push2: [at(35.6), at(36.0)] as const,
  counterLine: at(35.9),
  counter: [at(36.2), at(37.2)] as const,
  flashAt: at(37.2),
  end: at(39.3),
} as const;

export const PROMPT_TEXT = "Why isnt my brand showing up in chatgpt??";
export const AGENT_LINE1 = "Analysing your prompt gaps on ChatGPT...";
export const AGENT_LINE2 = "Found 27 prompts your buyers ask where you never show up.";
export const GAPS = [
  { title: "1. No intent based content", body: "Your site has no content pages answering what buyers actually ask." },
  { title: "2. Missing from trusted sources", body: "The conversations AI trusts, Reddit, reviews, roundups, don't mention you" },
  { title: "3. No brand mentions", body: "Almost no credible sites link to you, so AI reads you as unknown" },
] as const;
export const ACTIONS = [
  { title: "Content Creation:", body: "27 pages live, built around the prompts your buyers ask" },
  { title: "Citations Outreach:", body: "19 mentions earned on the sources AI already cites for your prompts" },
  { title: "Backlinks Marketplace", body: "14 placements secured across high-authority sites" },
  { title: "Social Visibility", body: "Engaged on 11 conversations where your buyers ask questions" },
] as const;

export const THREAD_Y = { line1: 60, head: 260, cards: 350, ask: 880, init: 1020, rows: 1180, counter: 1520 } as const;

export const CAM_CHAT = [
  { at: 0, zoom: 1, x: 960, y: 540 },
  { at: CHATX.push[0] - CHATX.from, zoom: 1, x: 960, y: 540 },
  { at: CHATX.push[1] - CHATX.from, zoom: 1.35, x: 960, y: 470 },
  { at: CHATX.thread - CHATX.from - 1, zoom: 1.35, x: 960, y: 470 },
  { at: CHATX.thread - CHATX.from, zoom: 1, x: 960, y: 540, cut: true },
  { at: CHATX.scroll1 - CHATX.from, zoom: 1, x: 960, y: 540 },
  { at: CHATX.scroll1 - CHATX.from + 14, zoom: 1, x: 960, y: 760 },
  { at: CHATX.scroll2 - CHATX.from, zoom: 1, x: 960, y: 760 },
  { at: CHATX.scroll2 - CHATX.from + 14, zoom: 1, x: 960, y: 1400 },
  { at: CHATX.rowsAt - CHATX.from, zoom: 1, x: 960, y: 1400 },
  { at: CHATX.rowsAt - CHATX.from + 14, zoom: 1, x: 960, y: 1400 },
  { at: CHATX.push2[0] - CHATX.from, zoom: 1, x: 960, y: 1400 },
  { at: CHATX.push2[1] - CHATX.from, zoom: 1.3, x: 900, y: 1760 },
  { at: CHATX.end - CHATX.from, zoom: 1.3, x: 900, y: 1760 },
] as const;
