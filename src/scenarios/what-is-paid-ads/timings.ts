import DURATIONS from "./vo-durations.json";
import MARKS from "./vo-marks.json";
import { voTimeline } from "../../kit/explainer";

export const FPS = 30;

type Line = keyof typeof DURATIONS;

const ORDER: Line[] = ["00-title", "01-agent", "02-creatives", "03-competitors", "04-schedules", "05-reports", "06-dashboards", "07-close"];
const LEAD = 6;
const GAP: Record<Line, number> = {
  "00-title": 12,
  "01-agent": 26,
  "02-creatives": 26,
  "03-competitors": 26,
  "04-schedules": 26,
  "05-reports": 26,
  "06-dashboards": 30,
  "07-close": 0,
};

const TL = voTimeline({ order: ORDER, durations: DURATIONS, marks: MARKS, gaps: GAP, first: 8, fps: FPS });
const word = TL.word;

export const VO_LINES = TL.lines;

const from = (line: Line) => TL.at[line] - LEAD;

export const SCENE = {
  title: 0,
  agent: from("01-agent"),
  creatives: from("02-creatives"),
  competitors: from("03-competitors"),
  schedules: from("04-schedules"),
  reports: from("05-reports"),
  dashboards: from("06-dashboards"),
  close: from("07-close"),
} as const;

export const TOTAL = TL.end["07-close"] + 54;

const local = (scene: keyof typeof SCENE) => (frame: number) => frame - SCENE[scene];

const t0 = local("title");
export const K_TITLE = {
  what: t0(word("00-title", "what")),
  is: t0(word("00-title", "is")),
  ryze: t0(word("00-title", "rise")),
  for: t0(word("00-title", "for")),
  paid: t0(word("00-title", "paid")),
  ads: t0(word("00-title", "ads")),
};

const ta = local("agent");
export const K_AGENT = {
  platforms: [ta(word("01-agent", "google")), ta(word("01-agent", "meta")), ta(word("01-agent", "tiktok"))],
  watches: ta(word("01-agent", "watches")),
  clock: ta(word("01-agent", "clock")),
  sends: ta(word("01-agent", "sends")),
  approval: ta(word("01-agent", "approval")),
  end: SCENE.creatives - SCENE.agent,
};

const tc = local("creatives");
export const K_CREATIVES = {
  ask: tc(word("02-creatives", "ask")),
  makes: tc(word("02-creatives", "makes")),
  hook: tc(word("02-creatives", "hook")),
  image: tc(word("02-creatives", "image")),
  size: tc(word("02-creatives", "size")),
  start: tc(word("02-creatives", "start")),
  winning: tc(word("02-creatives", "winning")),
  yours: tc(word("02-creatives", "yours")),
  end: SCENE.competitors - SCENE.creatives,
};

const tk = local("competitors");
export const K_COMP = {
  track: tk(word("03-competitors", "track")),
  five: tk(word("03-competitors", "five")),
  see: tk(word("03-competitors", "see")),
  platforms: [tk(word("03-competitors", "google")), tk(word("03-competitors", "meta")), tk(word("03-competitors", "linkedin"))],
  sort: tk(word("03-competitors", "sort")),
  running: tk(word("03-competitors", "running")),
  works: tk(word("03-competitors", "works")),
  email: tk(word("03-competitors", "email")),
  launch: tk(word("03-competitors", "launch")),
  end: SCENE.schedules - SCENE.competitors,
};

const ts = local("schedules");
export const K_SCHED = {
  task: ts(word("04-schedules", "task")),
  check: ts(word("04-schedules", "check")),
  runs: ts(word("04-schedules", "runs")),
  repeats: [ts(word("04-schedules", "daily")), ts(word("04-schedules", "weekly", 1)), ts(word("04-schedules", "monthly"))],
  results: ts(word("04-schedules", "results")),
  email: ts(word("04-schedules", "email")),
  end: SCENE.reports - SCENE.schedules,
};

const tr = local("reports");
export const K_REPORTS = {
  report: tr(word("05-reports", "report")),
  deck: tr(word("05-reports", "deck")),
  live: tr(word("05-reports", "live")),
  download: tr(word("05-reports", "download")),
  pdf: tr(word("05-reports", "pdf")),
  send: tr(word("05-reports", "send")),
  email: tr(word("05-reports", "email")),
  end: SCENE.dashboards - SCENE.reports,
};

const td = local("dashboards");
export const K_DASH = {
  describe: td(word("06-dashboards", "describe")),
  builds: td(word("06-dashboards", "builds")),
  dashboard: td(word("06-dashboards", "dashboard")),
  refresh: td(word("06-dashboards", "refresh")),
  end: SCENE.close - SCENE.dashboards,
};

export const CLICKS = [SCENE.reports + K_REPORTS.send + 4, SCENE.dashboards + K_DASH.refresh + 2] as const;
