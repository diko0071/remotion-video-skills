import { beatGrid } from "../../core/beat";

export const GRID = beatGrid(126, 30);

export const HOOK_TEXT = "Why choose Ryze?";
export const HOOK_LINE_SPLIT = 10;

export const WORDS: { word: string; side: "ink" | "paper" }[] = [
  { word: "Daily", side: "ink" },
  { word: "Content", side: "paper" },
  { word: "More", side: "ink" },
  { word: "Backlinks", side: "paper" },
  { word: "Website", side: "ink" },
  { word: "Fixes", side: "paper" },
  { word: "AI", side: "ink" },
  { word: "Visibility", side: "paper" },
  { word: "Higher", side: "ink" },
  { word: "Rankings", side: "paper" },
  { word: "All On", side: "ink" },
  { word: "Autopilot.", side: "paper" },
];

export const WORD_STEP = GRID.beat * 1.5;
export const WORD_MARKS = WORDS.map((_, i) => Math.round(i * WORD_STEP));

export const T = {
  hook: GRID.beats(5),
  hookTypeFrom: 3,
  hookTypeTo: 3 + Math.round(HOOK_TEXT.length / 0.45),
  words: Math.round(WORDS.length * WORD_STEP),
  outro: 60,
  outroTodayFrom: GRID.beats(1),
};
