export const FPS = 30;
export const TOTAL = 979;

export const SHOTS = {
  hero: { from: 0, duration: 110 },
  connectFlow: { from: 110, duration: 242 },
  chipEmpty: { from: 352, duration: 50 },
  bugs: { from: 402, duration: 46 },
  prompt2: { from: 448, duration: 112 },
  finished: { from: 560, duration: 70 },
  slackChip: { from: 630, duration: 64 },
  slackSlide: { from: 694, duration: 67 },
  slackFull: { from: 761, duration: 112 },
  logo: { from: 873, duration: 27 },
  endcard: { from: 900, duration: 79 },
} as const;

export const LAYOUT = {
  heroTop: 300,
  compW: 1730,
  compLeft: 95,
  compTop: 468,
  plus: { x: 138, y: 563 },
  send: { x: 1782, y: 563 },
  panel: { left: 260, top: 140, w: 900 },
  panelBtnX: 1070,
  panelRowY: (i: number) => 264 + i * 88,
} as const;

export const AMP = {
  bg: "#FAFBFD",
  ink: "#16181D",
  inkSoft: "#5A616E",
  line: "#D9DFEA",
  blue: "#2160F0",
  blueSoft: "#EDF2FE",
  chip: "#F1F4FA",
  red: "#E5484D",
  yellow: "#F5A623",
  green: "#30A46C",
  endcard: "#1F5AEF",
} as const;

export const CONNECTORS = [
  { name: "Atlassian", icon: "atlassian.png" },
  { name: "GitHub", icon: "github.png" },
  { name: "Granola", icon: "granola.png" },
  { name: "Linear", icon: "linear.png" },
  { name: "Notion", icon: "notion.png" },
  { name: "Sentry", icon: "sentry.png" },
  { name: "Slack", icon: "slack.png" },
] as const;

export const PROMPT_1 = "Pull all Jira tickets in the current sprint and identify any issues";
export const PROMPT_2 = "Get me more context on the Dashboard Export release from Notion";

export const BUGS = [
  { id: "SPRINT-212", text: "Dashboard export – 34% drop-off, 2,847 error events", sev: "red" },
  { id: "SPRINT-201", text: "Search refactor – 0.6% drop-off, 9 error events", sev: "green" },
  { id: "SPRINT-204", text: "File upload redesign – 22% drop-off, 1,104 error events", sev: "yellow" },
  { id: "SPRINT-209", text: "Notification preferences – 1.8% drop-off, 41 error events", sev: "green" },
] as const;
