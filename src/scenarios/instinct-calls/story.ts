import { LaunchLine } from "../../kit/launch";
import { T } from "./timeline";

export const HEADLINES: LaunchLine[] = [
  { words: ["Your", "ads", "can", "call", "you", "now."], plate: [3, 5] },
  { words: ["It", "calls", "when", "spend", "spikes."], plate: [3, 4] },
  { words: ["It", "can", "call", "your", "agency", "for", "you."], plate: [3, 4] },
  { words: ["You", "get", "the", "summary", "as", "a", "text."], plate: [4, 6] },
];

export const HEADLINE_STARTS = [-24, T.s2 - 4, T.s3 - 4, T.s4 - 4];
export const HEADLINE_ENDS = [T.s2, T.s3, T.s4, T.exit + 11];

export const CALLER = { name: "Instinct", ring: "Ryze AI · your ads", spike: "Spend spike · Meta Ads" } as const;

export const CAPTION =
  "Meta spend is up 30% since noon, with no extra customers. Want me to pause Retargeting?";

export const USER_TEXT = "Ask the agency why Google CPA doubled";
export const REPLY_TEXT = "On it. Calling them now.";
export const ASK_TEXT = "Why did your Google CPA double?";
export const AGENCY_TEXT = "Uh… we launched broad match on Monday.";
export const SUMMARY_TEXT = "Agency: new broad-match campaign. Ryze paused it, CPA back to $58.";

export const SPEND_POINTS = [120, 250, 380, 520, 650, 790, 910, 1040, 1170, 1480] as const;
export const SPEND_LABELS = ["8 AM", "10 AM", "12 PM", "2 PM", "4 PM"] as const;

export const CPA_POINTS = [58, 57, 59, 116, 61, 58] as const;
export const CPA_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

export const URL_LEAD = "Try at";
export const URL = "ryze.ai/instinct";
