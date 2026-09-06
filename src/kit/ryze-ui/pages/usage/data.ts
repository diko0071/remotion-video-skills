import { UsageDay, UsageEntry } from "./types";

export const USAGE_DAYS: UsageDay[] = [
  { date: "Jul 14", count: 160 },
  { date: "Jul 15", count: 186 },
  { date: "Jul 16", count: 144 },
  { date: "Jul 17", count: 198 },
  { date: "Jul 18", count: 220 },
  { date: "Jul 19", count: 132 },
  { date: "Jul 20", count: 108 },
  { date: "Jul 21", count: 212 },
  { date: "Jul 22", count: 246 },
  { date: "Jul 23", count: 190 },
  { date: "Jul 24", count: 224 },
  { date: "Jul 25", count: 258 },
  { date: "Jul 26", count: 168 },
  { date: "Jul 27", count: 122 },
  { date: "Jul 28", count: 234 },
  { date: "Jul 29", count: 280 },
  { date: "Jul 30", count: 252 },
  { date: "Jul 31", count: 206 },
  { date: "Aug 1", count: 238 },
  { date: "Aug 2", count: 144 },
  { date: "Aug 3", count: 136 },
  { date: "Aug 4", count: 292 },
  { date: "Aug 5", count: 316 },
  { date: "Aug 6", count: 260 },
  { date: "Aug 7", count: 226 },
  { date: "Aug 8", count: 188 },
  { date: "Aug 9", count: 150 },
  { date: "Aug 10", count: 304 },
  { date: "Aug 11", count: 336 },
  { date: "Aug 12", count: 190 },
];

export const USAGE_SPENT = USAGE_DAYS.reduce((sum, d) => sum + d.count, 0);

export const USAGE_BALANCE = 4180;

export const USAGE_RESET_NOTE = "Resets in 14 days · Aug 26, 2026";

export const USAGE_WORKSPACES: UsageEntry[] = [
  { id: "ember-and-oak", label: "Ember & Oak", count: 3040 },
  { id: "wholesale", label: "Ember & Oak Wholesale", count: 1245 },
  { id: "labs", label: "Oak Candle Labs", count: 860 },
  { id: "gifts", label: "Ember Gift Sets", count: 635 },
  { id: "hearth", label: "Hearth & Home Refills", count: 540 },
];

export const USAGE_USERS: UsageEntry[] = [
  { id: "dana", label: "Dana Whitfield", count: 2540 },
  { id: "marcus", label: "Marcus Ellery", count: 1610 },
  { id: "priya", label: "Priya Raman", count: 1120 },
  { id: "tomas", label: "Tomas Lindqvist", count: 760 },
  { id: "nina", label: "Nina Alvarez", count: 290 },
];
