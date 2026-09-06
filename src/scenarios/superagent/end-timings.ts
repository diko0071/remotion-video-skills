import { at } from "./timings";

export const END = {
  from: at(39.3),
  gradientIn: [at(39.3), at(39.9)] as const,
  cards: [
    { at: at(39.9), x: 600, y: 20, w: 680, h: 640, kind: "bars", text: "See your brand visibility\nscores at a glance." },
    { at: at(40.4), x: 60, y: 560, w: 680, h: 520, kind: "card", text: "Check and top up your\ncredit balance." },
    { at: at(40.8), x: 1200, y: 450, w: 680, h: 590, kind: "sparkles", text: "Discover prompts that boost\nLLM visibility." },
  ],
  cardsOut: [at(42.6), at(42.9)] as const,
  yourAt: at(43.0),
  aiAt: at(43.4),
  visAt: at(43.8),
  lineOut: [at(44.6), at(44.85)] as const,
  chipsAt: at(44.8),
  oneAt: at(45.0),
  oneOut: [at(45.0), at(45.25)] as const,
  orbAt: at(45.05),
  push: [at(45.5), at(46.35)] as const,
  dark: at(46.4),
  url: "get-ryze.ai/agent",
  urlType: [at(46.55), at(47.7)] as const,
  pillGlowOff: [at(47.8), at(48.3)] as const,
  white: at(49.4),
  tryAt: at(49.5),
  tryOut: at(50.3),
  lockupAt: at(50.45),
  end: at(53.0),
} as const;

export const CHIPS = [
  { text: "How can I rank higher in chatgpt?", x: 1230, y: 60, w: 720 },
  { text: "Give me 30 days content plan", x: -120, y: 220, w: 640 },
  { text: "Where should I get backlinks?", x: -60, y: 900, w: 660 },
  { text: "Why is my competitor outranking me?", x: 1650, y: 700, w: 700 },
  { text: "Which prompts mention my brand?", x: 1450, y: 980, w: 660 },
  { text: "Draft replies for Reddit threads", x: 100, y: 500, w: 620 },
] as const;

export const CAM_END = [
  { at: 0, zoom: 1, x: 960, y: 540 },
  { at: at(45.5) - at(39.3), zoom: 1, x: 960, y: 540 },
  { at: at(46.35) - at(39.3), zoom: 1.35, x: 960, y: 540 },
  { at: at(46.4) - at(39.3), zoom: 1, x: 960, y: 540, cut: true },
  { at: at(53.0) - at(39.3), zoom: 1, x: 960, y: 540 },
] as const;
