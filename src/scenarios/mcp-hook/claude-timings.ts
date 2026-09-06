import { at30 } from "./curves";

const T0 = 10.44;
export const cl = (t: number) => at30((t - T0) * 25);

export const CL_TOTAL = cl(44.0);

export const UI_SCALE = 1.6;
export const UI = { w: 1200, h: 675 } as const;
export const WELCOME = { popLen: 8, y: 208, star: { x: 801, y: 374 }, morphLen: 18 } as const;
export const TILE_AT_CUT = { x: 508, y: 663, size: 217, radius: 45 } as const;
export const COMPOSER = { w: 760, y: 292 } as const;
export const PROMPT = "How do I rank higher in AI answers?";
export const TYPE = { click: cl(11.7), from: cl(11.8), to: cl(13.5) } as const;
export const SEND = { hover: cl(14.3), press: cl(14.73), cut: cl(15.3) } as const;

export const CAM_C = [
  { at: 0, zoom: 1, x: 960, y: 540 },
  { at: cl(12.5), zoom: 1, x: 960, y: 540 },
  { at: cl(13.0), zoom: 2.1, x: 691, y: 520 },
  { at: cl(13.9), zoom: 2.1, x: 691, y: 520 },
  { at: cl(14.3), zoom: 2.9, x: 1483, y: 585 },
  { at: SEND.cut - 1, zoom: 3.08, x: 1492, y: 590 },
  { at: SEND.cut, zoom: 1.2, x: 960, y: 540, cut: true },
  { at: cl(16.8), zoom: 1.2, x: 960, y: 540 },
  { at: cl(17.6), zoom: 1.28, x: 960, y: 560 },
  { at: cl(18.3), zoom: 1.28, x: 960, y: 560 },
  { at: cl(18.7), zoom: 1.4, x: 960, y: 620 },
  { at: cl(22.7), zoom: 1.4, x: 960, y: 620 },
  { at: cl(23.4), zoom: 1.62, x: 960, y: 630 },
  { at: cl(25.5), zoom: 1.78, x: 960, y: 640 },
  { at: cl(26.3), zoom: 1.85, x: 960, y: 890 },
  { at: cl(28.6), zoom: 1.85, x: 960, y: 890 },
  { at: cl(29.2), zoom: 1.85, x: 960, y: 610 },
  { at: cl(30.4), zoom: 1.85, x: 960, y: 610 },
  { at: cl(30.9), zoom: 1.85, x: 960, y: 700 },
  { at: cl(32.2), zoom: 1.85, x: 960, y: 700 },
  { at: cl(33.0), zoom: 2.2, x: 820, y: 880 },
  { at: cl(33.6), zoom: 2.2, x: 820, y: 880 },
] as const;

export const CURSOR3 = {
  start: { x: 324, y: 423 },
  carry: { x: 502, y: 238, at: 18 },
  toComposer: { x: 430, y: 330, at: cl(11.55) },
  click: { x: 430, y: 330, at: TYPE.click },
  toSend: { x: 956, y: 386, at: cl(14.3) },
  press: SEND.press,
} as const;

export const CHAT = {
  from: SEND.cut,
  streamFrom: cl(15.4),
  streamTo: cl(16.6),
  composerRise: [cl(16.4), cl(16.65)] as const,
  scoreAt: cl(16.7),
  cards: [cl(16.8), cl(16.95), cl(17.1), cl(17.25)],
  scrollAt: cl(18.4),
  scrollBy: 300,
  initAt: cl(18.5),
  rows: [cl(18.55), cl(18.62), cl(18.69), cl(18.76)],
  fills: [cl(20.5), cl(21.1), cl(20.9), cl(21.6)],
  scoreScroll: cl(22.7),
  scoreScrollBy: 0,
} as const;

export const SCORE = { showAt: cl(22.9), countFrom: cl(23.1), countTo: cl(24.4), from: 34, to: 71, greenAt: cl(24.4), checkAt: cl(24.7) } as const;

export const NEW = {
  cut: cl(25.6),
  click: cl(26.13),
  typeFrom: cl(26.25),
  typeTo: cl(28.4),
  dock: [cl(28.6), cl(29.0)] as const,
  scrollBy: 210,
  bubbleAt: cl(28.75),
  answerFrom: cl(29.0),
  answerTo: cl(29.6),
  pullAt: cl(29.8),
  pullTo: cl(30.3),
} as const;
export const PROMPT2 = "Build me a weekly visibility report for my client";
export const ANSWER2 = "Now let me pull live data from Ryze to build the report.";
export const PULLING = "Pulling weekly visibility data";
export const CURSOR4 = {
  from: { x: 1150, y: 700 },
  toComposer: { x: 360, y: 545, at: cl(26.0) },
  click: { x: 360, y: 545, at: NEW.click },
  leave: { x: 1250, y: 720, at: cl(28.6) },
} as const;

export const ANSWER =
  "Analysing your prompt gaps... found 27 prompts you should rank for and don't yet, so your name shows up everywhere AI looks.";

export const CARDS = [
  { title: "Content Creation", body: "I'll build pages around the exact prompts your buyers ask, so AI has something accurate to cite.", color: "#4C7DFF" },
  { title: "Citations Outreach", body: "I'll start an outreach campaign to websites AI models already cite for your prompts.", color: "#E24AA6" },
  { title: "Authority Backlinks", body: "I'll place you across our backlinks marketplace with 40k+ publishers.", color: "#8A8A8A" },
  { title: "PR Outreach", body: "I'll place coverage across press, so your name shows up everywhere AI looks.", color: "#2FA36B" },
] as const;

export const ROWS = [
  { title: "Content Creation:", value: "12 pages live. 15 scheduled." },
  { title: "Citations Outreach:", value: "9 mentions earned" },
  { title: "Authority Backlinks:", value: "14 backlinks placed" },
  { title: "PR Outreach:", value: "6 placements secured" },
] as const;

export const REPORT = { at: cl(30.4), scrollBy: 60, rows: [cl(30.5), cl(30.6), cl(30.7), cl(30.8), cl(30.9), cl(31.0)], readyAt: cl(31.35), docAt: cl(31.45) } as const;
export const REPORT_ROWS = [
  { icon: "trend", text: "Brightland's AI visibility: 7.4% this week. 33 mentions across 446 responses." },
  { icon: "target", text: "Sentiment 84.9, position 1 when it shows." },
  { icon: "trend", text: "Trending up: 5.3% to 8.7% since Jun 21. Worth watching." },
  { icon: "chart", text: "All of it is branded queries. Every category prompt sits at 0%." },
  { icon: "star", text: "\"Best olive oil brands\" returns zero Brightland. Graza, Kosterina and Fat Gold own those roundups." },
  { icon: "edit", text: "Brightland's AI visibility: 7.4% this week. 33 mentions across 446 responses." },
] as const;
export const DOC = { title: "Brightland weekly visibility report June 26", meta: "Document · DOCX" } as const;
export const DRAG = { cursorIn: cl(32.7), toDoc: cl(33.0), grab: cl(33.3), lift: cl(33.55), cut: cl(33.6) } as const;
export const CARRY = { from: { x: 331, y: 738 }, lift: { x: 300, y: 690 }, liftAt: cl(33.55), size: [80, 140] as const, grow: [cl(33.5), cl(34.0)] as const } as const;
export const CURSOR5 = { from: { x: 1150, y: 700 }, doc: { x: 322, y: 594 }, lift: { x: 180, y: 430 } } as const;
export const SLACK = {
  from: cl(33.45),
  end: cl(36.75),
  bg: "#E4ECFA",
  tile: { x: 830, y: 409, size: 240, radius: 56 },
  docFrom: { x: 1180, y: 720 },
  slide: 10,
  land: cl(34.34),
  absorb: [cl(34.36), cl(34.5)] as const,
  badgeAt: cl(34.55),
  cursorOut: cl(34.7),
  card: { x: 402, y: 392, w: 1120, h: 291, radius: 36, icon: 180 },
  expand: [cl(35.0), cl(35.5)] as const,
  lines: [cl(35.3), cl(35.4), cl(35.5), cl(35.6)],
} as const;
export const SLACK_MSG = { title: "New message in #brand-monitoring", when: "Mon", lines: ["AI visibility this week: 43% (up 11%)", "Top citation: TechCrunch", "Competitor gap: 18pts"] } as const;

const t0 = cl(36.75);
const tl = (t: number) => cl(t) - t0;
export const TAIL = {
  from: t0,
  end: tl(44.0),
  talkAt: tl(36.78),
  talkSize: 340,
  lineSize: 165,
  lineSettle: tl(38.2),
  toYourAt: tl(37.55),
  dark1: [tl(37.98), tl(38.2)] as const,
  dataAt: tl(38.15),
  exit: [tl(39.05), tl(39.5)] as const,
  buildAt: tl(39.2),
  buildSize: 350,
  buildSmall: 145,
  buildFromX: 140,
  buildGlowOff: [tl(39.9), tl(40.15)] as const,
  light2: [tl(40.3), tl(40.5)] as const,
  withAt: tl(40.55),
  dark2: tl(41.85),
  pillAt: tl(41.9),
  url: "get-ryze.ai/mcp",
  urlType: [tl(42.0), tl(43.0)] as const,
  pillGlowOff: [tl(43.05), tl(43.4)] as const,
} as const;
