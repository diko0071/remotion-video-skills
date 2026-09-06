import { beatGrid } from "../../core/beat";
import { cascade } from "../../core/schedule";

export const GRID = beatGrid(120, 30);
const { bars, beats } = GRID;

export const T = {
  title: beats(5),
  research: bars(2),
  approvals: bars(4),
  avalanche: beats(9),
  autopilot: bars(1.5),
  outro: bars(1.5),
  outroShort: bars(1),
};

export const R = {
  heading: 0,
  card: 8,
  tools: [
    { start: 8, done: 36 },
    { start: 36, done: 62 },
    { start: 62, done: 86 },
    { start: 86, done: 106 },
  ],
  pill: 96,
};

export const A = {
  morph: 8,
  morphDur: 18,
  cardIn: 26,
  cursorIn: beats(2),
  clicks: cascade(beats(5), [3, 2, 2, 1, 1, 1].map(beats)),
  flyAfter: 6,
};

export const V = {
  heading: 0,
  rowStarts: cascade(12, [14, 12, 10, 8, 7, 6, 5, 4, 4]),
  statAt: 98,
};

export const P = {
  toggleAt: 14,
  word: 2,
  sub: 36,
};
