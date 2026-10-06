import DURATIONS from "./vo-durations.json";
import MARKS from "./vo-marks.json";

export const FPS = 30;

type Line = keyof typeof DURATIONS;
type Marks = Record<string, { words: { word: string; start: number }[] }>;

const ORDER: Line[] = ["00-title", "01-answer", "02-step1", "03-step2", "04-step3", "05-step4", "06-asks", "07-close"];
const FIRST = 8;
const GAP: Record<Line, number> = {
  "00-title": 10,
  "01-answer": 12,
  "02-step1": 12,
  "03-step2": 8,
  "04-step3": 8,
  "05-step4": 10,
  "06-asks": 12,
  "07-close": 0,
};

const starts = ORDER.reduce<Record<Line, number>>((acc, key, i) => {
  acc[key] = i === 0 ? FIRST : acc[ORDER[i - 1]] + Math.round(DURATIONS[ORDER[i - 1]] * FPS) + GAP[ORDER[i - 1]];
  return acc;
}, {} as Record<Line, number>);

export const LINE_AT = starts;
export const LINE_END = Object.fromEntries(ORDER.map((k) => [k, starts[k] + Math.round(DURATIONS[k] * FPS)])) as Record<Line, number>;
export const VO_LINES = ORDER.map((key) => ({ key, at: starts[key] }));

export const word = (line: Line, w: string, nth = 0) => {
  const words = (MARKS as Marks)[line].words;
  const hits = words.filter((x) => x.word === w);
  if (!hits[nth]) throw new Error(`word "${w}" #${nth} not in ${line}: ${words.map((x) => x.word).join(" ")}`);
  return starts[line] + Math.round(hits[nth].start * FPS);
};

export const MC_TOTAL = LINE_END["07-close"] + 24;

export const T = {
  answer: {
    at: LINE_AT["01-answer"] - 4,
    buyer: word("01-answer", "buyer"),
    campaigns: word("01-answer", "campaigns"),
    steps: word("01-answer", "here's"),
  },
  step1: {
    at: LINE_AT["02-step1"] - 6,
    budget: word("02-step1", "budget"),
    pick: word("02-step1", "pick"),
    run: word("02-step1", "run"),
    goal: word("02-step1", "goal"),
    sales: word("02-step1", "sales"),
    create: LINE_END["02-step1"] + 4,
  },
  step2: {
    at: LINE_AT["03-step2"] - 4,
    studies: word("03-step2", "studies"),
    builds: word("03-step2", "builds"),
    makes: word("03-step2", "makes"),
  },
  step3: {
    at: LINE_AT["04-step3"] - 4,
    launches: word("04-step3", "launches"),
  },
  step4: {
    at: LINE_AT["05-step4"] - 4,
    checking: word("05-step4", "checking"),
    schedule: word("05-step4", "schedule"),
    pauses: word("05-step4", "pauses"),
    moves: word("05-step4", "moves"),
  },
  asks: {
    at: LINE_AT["06-asks"] - 4,
    needs: word("06-asks", "needs"),
    asks: word("06-asks", "asks"),
    send: LINE_END["06-asks"] + 2,
  },
  close: {
    cut: LINE_AT["07-close"] - 4,
    your: word("07-close", "your"),
  },
} as const;
