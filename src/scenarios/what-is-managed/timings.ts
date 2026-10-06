import DURATIONS from "./vo-durations.json";
import MARKS from "./vo-marks.json";
import { voTimeline } from "../../kit/explainer";

export const FPS = 30;

type Line = keyof typeof DURATIONS;

const ORDER: Line[] = ["00-title", "01-team", "02-agent", "03-platforms", "04-budget", "05-build", "06-run", "07-fee", "08-close"];
const LEAD = 6;
const GAP: Record<Line, number> = {
  "00-title": 10,
  "01-team": 10,
  "02-agent": 12,
  "03-platforms": 10,
  "04-budget": 22,
  "05-build": 20,
  "06-run": 10,
  "07-fee": 34,
  "08-close": 0,
};

const TL = voTimeline({ order: ORDER, durations: DURATIONS, marks: MARKS, gaps: GAP, first: 8, fps: FPS });
const LINE_AT = TL.at;
const LINE_END = TL.end;
const word = TL.word;

export const VO_LINES = TL.lines;

const from = (line: Line) => LINE_AT[line] - LEAD;

export const SCENE = {
  title: 0,
  team: from("01-team"),
  platforms: from("03-platforms"),
  budget: from("04-budget"),
  build: from("05-build"),
  run: from("06-run"),
  fee: from("07-fee"),
  close: from("08-close"),
} as const;

export const TOTAL = LINE_END["08-close"] + 36;

const local = (scene: keyof typeof SCENE) => (frame: number) => frame - SCENE[scene];

const t0 = local("title");
export const K_TITLE = {
  what: t0(word("00-title", "what")),
  is: t0(word("00-title", "is")),
  managed: t0(word("00-title", "managed")),
  campaigns: t0(word("00-title", "campaigns")),
};

const t1 = local("team");
export const K_TEAM = {
  team: t1(word("01-team", "team")),
  set: t1(word("01-team", "set")),
  creatives: t1(word("01-team", "creatives")),
  check: t1(word("01-team", "check")),
  day: t1(word("01-team", "day")),
  agentLine: t1(LINE_AT["02-agent"]),
  merge: t1(LINE_AT["02-agent"]) + 8,
  is: t1(word("02-agent", "is")),
  that: t1(word("02-agent", "that")),
  one: t1(word("02-agent", "one")),
  ai: t1(word("02-agent", "ai")),
  end: SCENE.platforms - SCENE.team,
};

const t2 = local("platforms");
export const K_PLATFORMS = {
  connect: t2(word("03-platforms", "connect")),
  pick: t2(word("03-platforms", "pick")),
  run: t2(word("03-platforms", "run")),
  names: [
    t2(word("03-platforms", "meta")),
    t2(word("03-platforms", "google")),
    t2(word("03-platforms", "tiktok")),
    t2(word("03-platforms", "linkedin")),
  ],
  four: t2(word("03-platforms", "four")),
  end: SCENE.budget - SCENE.platforms,
};

const t3 = local("budget");
export const K_BUDGET = {
  budget: t3(word("04-budget", "budget")),
  goal: t3(word("04-budget", "goal")),
  sales: t3(word("04-budget", "sales")),
  create: t3(LINE_END["04-budget"] + 6),
  end: SCENE.build - SCENE.budget,
};

const t4 = local("build");
export const K_BUILD = {
  studies: t4(word("05-build", "studies")),
  history: t4(word("05-build", "history")),
  builds: t4(word("05-build", "builds")),
  campaign: t4(word("05-build", "campaign")),
  makes: t4(word("05-build", "makes")),
  ads: t4(word("05-build", "ads")),
  end: SCENE.run - SCENE.build,
};

const t5 = local("run");
export const K_RUN = {
  launches: t5(word("06-run", "launches")),
  checks: t5(word("06-run", "checks")),
  day: t5(word("06-run", "day")),
  swap: t5(word("06-run", "day")) + 12,
  pauses: t5(word("06-run", "pauses")),
  moves: t5(word("06-run", "moves")),
  sells: t5(word("06-run", "sells")),
  end: SCENE.fee - SCENE.run,
};

const t6 = local("fee");
export const K_FEE = {
  pay: t6(word("07-fee", "pay")),
  spend: t6(word("07-fee", "spend")),
  platforms: t6(word("07-fee", "platforms")),
  fee: t6(word("07-fee", "fee")),
  five: t6(word("07-fee", "5")),
  only: t6(word("07-fee", "only")),
  nothing: t6(word("07-fee", "nothing")),
  steps: [t6(word("07-fee", "more")), t6(word("07-fee", "spend", 1)), t6(word("07-fee", "lower")), t6(word("07-fee", "rate"))],
  end: SCENE.close - SCENE.fee,
};

export const CLICKS = [
  SCENE.budget + K_BUDGET.budget - 8,
  SCENE.platforms + K_PLATFORMS.pick + 2,
  SCENE.platforms + K_PLATFORMS.run,
  SCENE.budget + K_BUDGET.goal - 4,
  SCENE.budget + K_BUDGET.sales,
  SCENE.budget + K_BUDGET.create,
] as const;
