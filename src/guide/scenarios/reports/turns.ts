import type { ChatTurn } from "../../../kit/chat";
import {
  DASHBOARD_TOOL_ROWS,
  DASHBOARD_TOOL_SUMMARY,
  DECK_TOOL_ROWS,
  DECK_TOOL_SUMMARY,
} from "../../../kit/ryze-ui/pages/chat-artifact";

export const REPORT_ASK = "Build me a monthly performance report";
export const DASH_ASK = "Now make it a live dashboard";
export const EDIT_ASK = "Rename to September growth plan";

export const UPDATE_SEED_TURN: ChatTurn = {
  prompt: "Help me update this report.",
  instant: true,
  answer: [
    { kind: "p", text: "Sure — tell me what to change, and I'll rewrite it live." },
  ],
};

export const EDIT_TURN: ChatTurn = {
  prompt: EDIT_ASK,
  instant: true,
  reasoning: { seconds: 1 },
  tools: { summary: "Updated the report", rows: [{ name: "Write report" }] },
  answer: [
    { kind: "p", text: "Renamed — the cover now reads September growth plan." },
  ],
};

export const REPORT_TURN: ChatTurn = {
  prompt: REPORT_ASK,
  instant: true,
  reasoning: { seconds: 2 },
  tools: {
    summary: DECK_TOOL_SUMMARY,
    rows: DECK_TOOL_ROWS.map((name) => ({
      name: name.replace(/^Ran /, "").replace(/^Uploading Skill: seo-audit$/, "skill: seo-audit"),
    })),
  },
  answer: [
    {
      kind: "p",
      text: "Your August performance review is ready — I opened it next to the chat. The short version: organic revenue is up 18%, three pages carry most of the growth, and two technical issues are worth fixing this week.",
    },
  ],
  artifact: {
    kind: "deck",
    name: "Ember & Oak — August performance review",
    deck: { slides: [] },
  },
};

export const DASH_TURN: ChatTurn = {
  prompt: DASH_ASK,
  instant: true,
  reasoning: { seconds: 1 },
  tools: {
    summary: DASHBOARD_TOOL_SUMMARY,
    rows: DASHBOARD_TOOL_ROWS.slice(0, 2).map((name) => ({ name: name.replace(/^Ran /, "") })),
  },
  answer: [
    {
      kind: "p",
      text: "Done — same numbers, live. It refreshes from Search Console every time you open it.",
    },
  ],
  artifact: {
    kind: "dashboard",
    name: "Search Console live dashboard",
    dashboard: { title: "", context: "", pickers: [], kpis: [], widgets: [] },
  },
};
