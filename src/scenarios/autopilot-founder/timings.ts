import MARKS from "./vo-marks.json";

export const FPS = 30;
export const F = (s: number) => Math.round(s * FPS);

type Mark = { word: string; start: number };
const take = (MARKS as { _take: { text: string; words: Mark[] } })._take;

const DISPLAY_FIX: Record<string, string> = { rise: "Ryze", ai: "AI", seo: "SEO", chatgpt: "ChatGPT", url: "URL", perplexity: "Perplexity", google: "Google" };

export const WORDS = take.words.map((w, i) => {
  const raw = take.text.split(/\s+/)[i] ?? w.word;
  const clean = raw.replace(/[.,!?]+$/g, "");
  return { text: DISPLAY_FIX[w.word] ?? clean, at: F(w.start) };
});

export const wordAt = (index: number): number => WORDS[index]?.at ?? 0;
const find = (word: string, after = 0): number => {
  const i = take.words.findIndex((w, k) => k >= after && w.word === word);
  if (i < 0) throw new Error(`word mark not found: ${word}`);
  return i;
};
export const markOf = (word: string, after = 0): number => F(take.words[find(word, after)].start);

const iAutomatically2 = find("automatically", find("paste"));
const iAi3 = find("ai", find("brand"));

export const T = {
  hook: 0,
  zero: markOf("zero"),
  idea: markOf("here's"),
  autopilotLabel: markOf("on"),
  overwhelmed: markOf("google"),
  labelContent: markOf("fresh"),
  labelBacklinks: markOf("backlinks"),
  labelAi: markOf("ai"),
  confused: markOf("but"),
  money: markOf("thousands"),
  ryze: markOf("now"),
  relaxed: markOf("automatically"),
  typing: markOf("paste"),
  thumbs: markOf("publishes"),
  check1: markOf("daily"),
  check2: markOf("builds"),
  check3: F(take.words[iAi3].start),
  walking: markOf("you", find("results")),
  sleeping: markOf("no", find("work")),
  phone: markOf("just"),
  clock: markOf("background"),
  crowd: markOf("three"),
  endcard: markOf("and", find("this")),
  voEnd: F(take.words[take.words.length - 1].start) + 20,
  _automatically2: F(take.words[iAutomatically2].start),
};

export const TOTAL = T.endcard + 100;
