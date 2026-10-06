import { buildPath, DotPath, EyeKey, Mark, Stop } from "../../kit/glyph-ball";
import { Line } from "./measure";
import {
  barTop,
  CARD,
  chartNumber,
  CHART_CARD,
  CREW,
  GRID,
  MERGE,
  mergeSeat,
  badgeSeat,
  capTop,
  ROW,
  SPIKE,
  statement,
  termW,
  TERMS_CARD,
  TILE,
  tileBox,
  toggleSeat,
  wastedNumber,
  WASTED_SIZE,
} from "./stage";
import { BALL, Y0 } from "./theme";
import { CHART, SPLIT, STORE, STORM, TERMS } from "./timings";

export type CrewName = "b" | "p" | "s" | "t1" | "t2";
export const CREW_ORDER: readonly CrewName[] = ["b", "p", "s", "t1", "t2"];

type Pos = { x: number; y: number };

const m = (at: number, pos: Pos, kind: Mark["kind"], opts: Partial<Mark> = {}): Mark => ({ at, x: pos.x, y: pos.y, kind, ...opts });

const arcFor = (a: Stop, b: Stop) => Math.min(380, Math.max(36, Math.abs(b.x - a.x) * 0.22));

const wordSeat = (line: Line, i: number, size: number): Pos => {
  const w = line.words[i];
  return { x: w.x + w.w / 2, y: Y0 - w.top - size / 2 + 4 };
};

const periodSeat = (line: Line, size: number): Pos => ({ x: line.slotX + (size - BALL) / 2, y: Y0 - size / 2 });

const barSeat = (i: number, q: number, size: number): Pos => {
  const t = barTop(i, q);
  return { x: t.x, y: t.y - size / 2 + 2 };
};

const onCardTop = (x: number, size: number, cardY: number): Pos => ({ x, y: cardY - size / 2 });

export const mainPath = (): DotPath => {
  const line = statement();
  return buildPath(BALL, [m(STORM.land, { x: line.slotX, y: Y0 - BALL / 2 }, "drop", { until: Infinity })], STORM.dropFrom, arcFor, 620);
};

const spawn = (line: Line): Mark => m(SPLIT.pop, { x: line.slotX, y: Y0 - BALL / 2 }, "hop", { size: 30 });

const travel = (at: number, pos: Pos, kind: Mark["kind"], arc: number, opts: Partial<Mark> = {}) => m(at, pos, kind, { arc, ...opts });

const hopsInPlace = (pos: Pos, times: readonly number[], arc: number, kind: Mark["kind"] = "hop"): Mark[] => times.map((at) => m(at, pos, kind, { arc }));

const withLifts = (marks: Mark[]): Mark[] =>
  marks.map((mk, i) => {
    const next = marks[i + 1];
    if (mk.until !== undefined || !next) return mk;
    const dist = Math.hypot(next.x - mk.x, next.y - mk.y);
    const flight = next.kind === "slide" ? next.at - mk.at : dist < 2 ? Math.min(12, next.at - mk.at) : Math.min(next.at - mk.at, Math.max(7, Math.min(26, dist / 70)));
    return { ...mk, until: next.at - flight };
  });

const chartIdle = (k: number, size: number): Pos => onCardTop(CHART_CARD.x + 120 + k * 112, size, CHART_CARD.y);
const termsIdle = (k: number, size: number): Pos => onCardTop(TERMS_CARD.x + 120 + k * 120, size, TERMS_CARD.y);
const gridTop = (k: number, size: number): Pos => ({ x: GRID.x + (GRID.w * (k + 0.5)) / 5, y: GRID.y - size / 2 });
const DANCE = 100;

const tile5Seat = (k: number, size: number): Pos => {
  const t = tileBox(5);
  const spots = [
    { x: 64, y: 110 },
    { x: 170, y: 96 },
    { x: 116, y: 196 },
    { x: 58, y: 262 },
    { x: 200, y: 250 },
  ];
  return { x: t.x + spots[k].x * TILE.scale, y: t.y + spots[k].y * TILE.scale - size / 2 };
};

const termsRowStart = (): Pos => ({ x: TERMS_CARD.x + 34, y: ROW.top + ROW.mid });
const termsRowEnd = (k: number): Pos => ({ x: TERMS_CARD.x + 44 + termW(k) + 18, y: ROW.top + ROW.mid });

const counterSeat = (size: number): Pos => {
  const n = wastedNumber(0);
  return { x: n.right - 170, y: capTop(n.baseline, WASTED_SIZE) - size / 2 + 6 };
};

const periodAfter = (right: number, baseline: number, size: number): Pos => ({ x: right + 10 + size / 2, y: baseline - size / 2 + 2 });

const dotB = (line: Line): Mark[] => {
  const size = CREW.b;
  const num = chartNumber();
  const windup = onCardTop(num.left - 150, size, CHART_CARD.y);
  const contact = onCardTop(num.left - 42, size, CHART_CARD.y);
  const kickRest = { x: TERMS_CARD.x - 64, y: ROW.top + ROW.mid };
  const kickHit = { x: TERMS_CARD.x - 16, y: ROW.top + ROW.mid };
  const marks: Mark[] = [spawn(line), travel(SPLIT.land, wordSeat(line, 2, size), "land", 140), ...hopsInPlace(wordSeat(line, 2, size), [SPLIT.bounce], 46)];
  marks.push(travel(160, windup, "land", 340));
  CHART.punches.forEach((t) => {
    marks.push(m(t, contact, "punch", { arc: 0, until: t + 1 }));
    marks.push(m(t + 7, windup, "land", { arc: 14 }));
  });
  marks.push(...hopsInPlace(windup, [CHART.cheer], 64));
  marks.push(travel(262, kickRest, "land", 300));
  TERMS.rows.forEach((t) => {
    const hit = t + TERMS.kick;
    marks.push(m(hit, kickHit, "punch", { arc: 0, until: hit + 1 }));
    marks.push(m(hit + 6, kickRest, "land", { arc: 12 }));
  });
  marks.push(...hopsInPlace(kickRest, [TERMS.cheer], 60));
  marks.push(travel(360, gridTop(0, size), "land", 320));
  marks.push(travel(STORE.badges[0], badgeSeat(0, size), "stomp", 90));
  marks.push(travel(STORE.badges[5], tile5Seat(0, size), "land", 110));
  marks.push(travel(STORE.line, gridTop(0, size), "land", 120));
  marks.push(...hopsInPlace(gridTop(0, size), STORE.on, DANCE));
  marks.push(travel(STORE.merge, mergeSeat(30), "slide", 120, { size: 30, until: Infinity }));
  return marks;
};

const dotP = (line: Line): Mark[] => {
  const size = CREW.p;
  const counter = counterSeat(size);
  const marks: Mark[] = [spawn(line), travel(SPLIT.land, wordSeat(line, 1, size), "land", 140), ...hopsInPlace(wordSeat(line, 1, size), [SPLIT.bounce], 46)];
  marks.push(travel(CHART.stomps[0], barSeat(SPIKE[0], 0, size), "stomp", 380));
  CHART.stomps.forEach((t, k) => {
    if (k > 0) marks.push(m(t, barSeat(SPIKE[k], 0, size), "stomp", { arc: 74 }));
    marks.push(m(t + 7, barSeat(SPIKE[k], 1, size), "slide", { arc: 0 }));
  });
  marks.push(...hopsInPlace(barSeat(SPIKE[SPIKE.length - 1], 1, size), [CHART.cheer], 70));
  marks.push(travel(266, counter, "land", 300));
  TERMS.rows.forEach((t) => marks.push(m(t + TERMS.kick, counter, "stomp", { arc: 30 })));
  marks.push(...hopsInPlace(counter, [TERMS.cheer], 36));
  marks.push(travel(362, gridTop(1, size), "land", 320));
  marks.push(travel(STORE.badges[1], badgeSeat(1, size), "stomp", 90));
  marks.push(travel(STORE.badges[5], tile5Seat(1, size), "land", 110));
  marks.push(travel(STORE.line, gridTop(1, size), "land", 120));
  marks.push(...hopsInPlace(gridTop(1, size), STORE.off, DANCE));
  marks.push(travel(STORE.merge, mergeSeat(30), "slide", 120, { size: 30, until: Infinity }));
  return marks;
};

const dotS = (line: Line): Mark[] => {
  const size = CREW.s;
  const marks: Mark[] = [spawn(line), travel(SPLIT.land, wordSeat(line, 0, size), "land", 140), ...hopsInPlace(wordSeat(line, 0, size), [SPLIT.bounce], 46)];
  marks.push(travel(156, chartIdle(0, size), "land", 300));
  marks.push(travel(CHART.toggles[1], toggleSeat(1, 0, size), "stomp", 90));
  marks.push(m(CHART.toggles[1] + 7, toggleSeat(1, 1, size), "slide", { arc: 0 }));
  marks.push(...hopsInPlace(toggleSeat(1, 1, size), [CHART.cheer], 60));
  TERMS.rows.forEach((t, k) => {
    marks.push(travel(t, termsRowStart(), k === 0 ? "land" : "hop", k === 0 ? 300 : 108));
    marks.push(m(t + TERMS.skate, termsRowEnd(k), "slide", { arc: 0 }));
  });
  marks.push(travel(330, termsIdle(0, size), "land", 140));
  marks.push(...hopsInPlace(termsIdle(0, size), [TERMS.cheer], 60));
  marks.push(travel(364, gridTop(2, size), "land", 320));
  marks.push(travel(STORE.badges[2], badgeSeat(2, size), "stomp", 90));
  marks.push(travel(STORE.badges[5], tile5Seat(2, size), "land", 110));
  marks.push(travel(STORE.line, gridTop(2, size), "land", 120));
  marks.push(...hopsInPlace(gridTop(2, size), STORE.on, DANCE));
  marks.push(travel(STORE.merge, mergeSeat(30), "slide", 120, { size: 30, until: Infinity }));
  return marks;
};

const dotT = (line: Line, which: 0 | 1): Mark[] => {
  const size = which === 0 ? CREW.t1 : CREW.t2;
  const seat = which === 0 ? wordSeat(line, 3, size) : periodSeat(line, size);
  const toggle = which === 0 ? 0 : 2;
  const tAt = CHART.toggles[toggle];
  const marks: Mark[] = [spawn(line), travel(SPLIT.land, seat, "land", 140), ...hopsInPlace(seat, [SPLIT.bounce], 46)];
  marks.push(travel(which === 0 ? 158 : 162, chartIdle(which + 1, size), "land", 300));
  marks.push(travel(tAt, toggleSeat(toggle, 0, size), "stomp", 90));
  marks.push(m(tAt + 7, toggleSeat(toggle, 1, size), "slide", { arc: 0 }));
  if (which === 0) {
    const num = chartNumber();
    marks.push(travel(CHART.period, periodAfter(num.right, num.baseline, size), "period", 110));
    marks.push(...hopsInPlace(periodAfter(num.right, num.baseline, size), [CHART.cheer], 44));
    marks.push(travel(262, termsIdle(1, size), "land", 300));
    const last = wastedNumber(4);
    marks.push(travel(TERMS.period, periodAfter(last.right, last.baseline, size), "period", 110));
    marks.push(...hopsInPlace(periodAfter(last.right, last.baseline, size), [TERMS.cheer], 60));
  } else {
    marks.push(...hopsInPlace(toggleSeat(toggle, 1, size), [CHART.cheer], 60));
    marks.push(travel(264, termsIdle(2, size), "land", 300));
    marks.push(...hopsInPlace(termsIdle(2, size), [285, 300, 315], 52));
    marks.push(...hopsInPlace(termsIdle(2, size), [TERMS.cheer], 60));
  }
  marks.push(travel(which === 0 ? 365 : 366, gridTop(3 + which, size), "land", 320));
  marks.push(travel(STORE.badges[3 + which], badgeSeat(3 + which, size), "stomp", 90));
  marks.push(travel(STORE.badges[5], tile5Seat(3 + which, size), "land", 110));
  marks.push(travel(STORE.line, gridTop(3 + which, size), "land", 120));
  marks.push(...hopsInPlace(gridTop(3 + which, size), which === 0 ? STORE.off : STORE.on, DANCE));
  marks.push(which === 0 ? travel(STORE.merge, mergeSeat(MERGE), "drop", 120, { size: MERGE, until: Infinity }) : travel(STORE.merge, mergeSeat(30), "slide", 120, { size: 30, until: Infinity }));
  return marks;
};

let crew: Record<CrewName, DotPath> | null = null;

export const crewPaths = (): Record<CrewName, DotPath> => {
  if (crew) return crew;
  const line = statement();
  const build = (size: number, marks: Mark[]) => buildPath(size, withLifts(marks), SPLIT.pop, arcFor);
  crew = {
    b: build(CREW.b, dotB(line)),
    p: build(CREW.p, dotP(line)),
    s: build(CREW.s, dotS(line)),
    t1: build(CREW.t1, dotT(line, 0)),
    t2: build(CREW.t2, dotT(line, 1)),
  };
  return crew;
};

const joy = (at: number): EyeKey => ({ at, eyes: "happy" });
const calm = (at: number): EyeKey => ({ at, eyes: "dot" });

export const CREW_EYES: Record<CrewName, readonly EyeKey[]> = {
  b: [calm(-99), joy(118), calm(130), { at: 150, eyes: "squint" }, joy(208), calm(218), { at: 262, eyes: "squint" }, joy(326), calm(336), { at: 368, eyes: "squint" }, joy(380), calm(392), joy(428)],
  p: [calm(-99), joy(118), calm(130), { at: 152, eyes: "squint" }, joy(203), calm(214), { at: 270, eyes: "squint" }, joy(326), calm(336), { at: 372, eyes: "squint" }, joy(388), calm(398), joy(428)],
  s: [calm(-99), joy(118), calm(130), { at: 208, eyes: "o" }, joy(222), calm(232), { at: 266, eyes: "squint" }, joy(324), calm(336), { at: 382, eyes: "squint" }, joy(395), calm(404), joy(428)],
  t1: [calm(-99), joy(118), calm(130), { at: 203, eyes: "o" }, joy(214), calm(224), joy(233), calm(246), joy(331), calm(342), { at: 390, eyes: "o" }, joy(402), joy(428)],
  t2: [calm(-99), joy(118), calm(130), { at: 218, eyes: "o" }, joy(230), calm(244), joy(280), calm(320), { at: 398, eyes: "o" }, joy(410), joy(428)],
};

export const CREW_BLINKS: Record<CrewName, readonly number[]> = {
  b: [142, 226, 300, 446],
  p: [148, 236, 312, 452],
  s: [139, 244, 352, 438],
  t1: [176, 276, 420, 487],
  t2: [184, 292, 428],
};

export const CARD_W = CARD.w;
