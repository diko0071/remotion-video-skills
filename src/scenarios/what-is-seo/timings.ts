import DURATIONS from "./vo-durations.json";
import MARKS from "./vo-marks.json";
import { voTimeline } from "../../kit/explainer";

export const FPS = 30;

type Line = keyof typeof DURATIONS;

const ORDER: Line[] = [
  "00-title",
  "01-three",
  "02-connect",
  "03-audit",
  "04a-keywords",
  "04b-gsc",
  "05a-prompts",
  "05b-named",
  "06a-write",
  "06b-score",
  "06c-publish",
  "07-links",
  "09-close",
];
const LEAD = 6;
const GAP: Record<Line, number> = {
  "00-title": 12,
  "01-three": 22,
  "02-connect": 24,
  "03-audit": 56,
  "04a-keywords": 14,
  "04b-gsc": 28,
  "05a-prompts": 14,
  "05b-named": 28,
  "06a-write": 26,
  "06b-score": 28,
  "06c-publish": 26,
  "07-links": 26,
  "09-close": 0,
};

const TL = voTimeline({ order: ORDER, durations: DURATIONS, marks: MARKS, gaps: GAP, first: 8, fps: FPS });
const word = TL.word;

export const VO_LINES = TL.lines;

const from = (line: Line) => TL.at[line] - LEAD;

export const SCENE = {
  title: 0,
  three: from("01-three"),
  connect: from("02-connect"),
  audit: from("03-audit"),
  keywords: from("04a-keywords"),
  prompts: from("05a-prompts"),
  write: from("06a-write"),
  score: from("06b-score"),
  publish: from("06c-publish"),
  links: from("07-links"),
  growth: from("09-close"),
  close: TL.at["09-close"] + Math.round(3.1 * FPS),
} as const;

export const TOTAL = TL.end["09-close"] + 62;

const local = (scene: keyof typeof SCENE) => (frame: number) => frame - SCENE[scene];

const t0 = local("title");
export const K_TITLE = {
  what: t0(word("00-title", "what")),
  is: t0(word("00-title", "is")),
  ryze: t0(word("00-title", "rise")),
  seo: t0(word("00-title", "seo")),
};

const t1 = local("three");
export const K_THREE = {
  three: t1(word("01-three", "three")),
  healthy: t1(word("01-three", "healthy")),
  relevant: t1(word("01-three", "relevant")),
  backlinks: t1(word("01-three", "backlinks")),
  ryze: t1(word("01-three", "rise")),
  does: t1(word("01-three", "does")),
  all: t1(word("01-three", "all")),
  threeEnd: t1(word("01-three", "three", 1)),
  end: SCENE.connect - SCENE.three,
};

const t2 = local("connect");
export const K_CONNECT = {
  website: t2(word("02-connect", "website")),
  console: t2(word("02-connect", "console")),
  end: SCENE.audit - SCENE.connect,
};

const t3 = local("audit");
export const K_AUDIT = {
  hundred: t3(word("03-audit", "hundred")),
  week: t3(word("03-audit", "week")),
  issues: [
    t3(word("03-audit", "broken")),
    t3(word("03-audit", "page")),
    t3(word("03-audit", "titles")),
    t3(word("03-audit", "schema")),
    t3(word("03-audit", "sitemap")),
  ],
  fixes: t3(word("03-audit", "it")),
  approve: t3(word("03-audit", "approve")),
  end: SCENE.keywords - SCENE.audit,
};

const t4 = local("keywords");
export const K_KEYWORDS = {
  picks: t4(word("04a-keywords", "picks")),
  search: t4(word("04a-keywords", "search")),
  match: t4(word("04a-keywords", "match")),
  competition: t4(word("04a-keywords", "competition")),
  gscLine: t4(TL.at["04b-gsc"]),
  already: t4(word("04b-gsc", "already")),
  google: t4(word("04b-gsc", "google")),
  page: t4(word("04b-gsc", "page")),
  end: SCENE.prompts - SCENE.keywords,
};

const t5 = local("prompts");
export const K_PROMPTS = {
  competitors: t5(word("05a-prompts", "competitors")),
  questions: t5(word("05a-prompts", "questions")),
  engines: [
    t5(word("05a-prompts", "chatgpt")),
    t5(word("05a-prompts", "claude")),
    t5(word("05a-prompts", "gemini")),
    t5(word("05a-prompts", "perplexity")),
  ],
  namedLine: t5(TL.at["05b-named"]),
  refresh: t5(word("05b-named", "refresh")),
  named: t5(word("05b-named", "named")),
  competitor: t5(word("05b-named", "competitor")),
  sources: t5(word("05b-named", "sources")),
  end: SCENE.write - SCENE.prompts,
};

const tw = local("write");
export const K_WRITE = {
  articles: tw(word("06a-write", "articles")),
  kinds: [
    tw(word("06a-write", "listicles")),
    tw(word("06a-write", "comparisons")),
    tw(word("06a-write", "alternatives")),
    tw(word("06a-write", "answers")),
  ],
  summary: tw(word("06a-write", "summary")),
  faq: tw(word("06a-write", "faq")),
  images: tw(word("06a-write", "images")),
  links: tw(word("06a-write", "links")),
  end: SCENE.score - SCENE.write,
};

const tsc = local("score");
export const K_SCORE = {
  scored: tsc(word("06b-score", "scored")),
  nine: tsc(word("06b-score", "nine")),
  structure: tsc(word("06b-score", "structure")),
  schema: tsc(word("06b-score", "schema")),
  end: SCENE.publish - SCENE.score,
};

const tp = local("publish");
export const K_PUBLISH = {
  publishes: tp(word("06c-publish", "publishes")),
  schedule: tp(word("06c-publish", "schedule")),
  ninety: tp(word("06c-publish", "90")),
  approve: tp(word("06c-publish", "approve")),
  end: SCENE.links - SCENE.publish,
};

const tl = local("links");
export const K_LINKS = {
  exchange: tl(word("07-links", "exchange")),
  compete: tl(word("07-links", "compete")),
  chains: tl(word("07-links", "chains")),
  newLinks: tl(word("07-links", "new")),
  month: tl(word("07-links", "month")),
  end: SCENE.growth - SCENE.links,
};

const t7 = local("growth");
export const K_GROWTH = {
  three: t7(word("09-close", "three")),
  months: t7(word("09-close", "months")),
  traffic: t7(word("09-close", "traffic")),
  grows: t7(word("09-close", "grows")),
  end: SCENE.close - SCENE.growth,
};

export const CLICKS = [
  SCENE.connect + K_CONNECT.website,
  SCENE.connect + K_CONNECT.console,
  SCENE.audit + K_AUDIT.approve,
] as const;
