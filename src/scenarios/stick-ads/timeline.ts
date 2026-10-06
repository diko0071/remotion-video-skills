export const FPS = 30;
export const F = (s: number) => Math.round(s * FPS);

type Mark = { word: string; start: number };
export type StickMarks = { _take: { text: string; words: Mark[] } };

const DISPLAY_FIX: Record<string, string> = {
  rise: "Ryze",
  ai: "AI",
  seo: "SEO",
  chatgpt: "ChatGPT",
  url: "URL",
  perplexity: "Perplexity",
  google: "Google",
  claude: "Claude",
};

export const timeline = (marks: StickMarks) => {
  const take = marks._take;
  const raw = take.text.split(/\s+/);

  const words = take.words.map((w, i) => {
    const clean = (raw[i] ?? w.word).replace(/[.,!?"]+$/g, "").replace(/^"/, "");
    return { text: DISPLAY_FIX[w.word] ?? clean, at: F(w.start) };
  });

  const find = (word: string, after = 0): number => {
    const i = take.words.findIndex((w, k) => k >= after && w.word === word);
    if (i < 0) throw new Error(`word mark not found: ${word} after ${after}`);
    return i;
  };
  const at = (word: string, after = 0): number => F(take.words[find(word, after)].start);
  const atIndex = (i: number): number => F(take.words[i].start);

  const websites = take.words.map((w) => w.word).lastIndexOf("websites");
  const crowd = atIndex(websites - 1);
  const endcard = at("and", websites);

  return { words, find, at, atIndex, crowd, endcard, total: endcard + 100 };
};
