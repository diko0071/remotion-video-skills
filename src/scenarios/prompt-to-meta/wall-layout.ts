import { Easing, random } from "remotion";
import { WALL, WINNERS } from "./story";
import { lerp, ramp, T } from "./timeline";
import { WALL_ADS } from "./wall-ads";

export type WallTile = {
  i: number;
  c: number;
  r: number;
  src: string;
  days: number;
  winner: number;
};

const SPAN = WALL.rows * WALL.pitchY;
const PHASE = Array.from({ length: WALL.cols }, (_, c) => random(`wall-phase-${c}`) * WALL.pitchY);
const DIR = Array.from({ length: WALL.cols }, (_, c) => (c % 2 === 0 ? -1 : 1));
const WINNER_TARGETS = [
  { x: 560, y: 450 },
  { x: 850, y: 690 },
  { x: 1110, y: 440 },
  { x: 1390, y: 670 },
];

export const wallRotation = (f: number) => lerp(-2, -5, ramp(f, T.burst, 70));

export const wallScroll = (f: number) =>
  WALL.scroll * ramp(f, T.burst, T.scrollEnd - T.burst, Easing.bezier(0.33, 0.33, 0.6, 1));

export const tileLocal = (c: number, r: number, f: number) => {
  const x = (c - (WALL.cols - 1) / 2) * WALL.pitchX;
  const raw = (r - (WALL.rows - 1) / 2) * WALL.pitchY + PHASE[c] + DIR[c] * wallScroll(f);
  const y = ((((raw + SPAN / 2) % SPAN) + SPAN) % SPAN) - SPAN / 2;
  return { x, y };
};

export const localToWorld = (x: number, y: number, f: number) => {
  const a = (wallRotation(f) * Math.PI) / 180;
  return {
    x: WALL.cx + x * Math.cos(a) - y * Math.sin(a),
    y: WALL.cy + x * Math.sin(a) + y * Math.cos(a),
  };
};

const pickWinnerSlots = () => {
  const taken = new Set<string>();
  return WINNER_TARGETS.map((target) => {
    let best = { c: 0, r: 0, d: Infinity };
    for (let c = 1; c < WALL.cols - 1; c++) {
      for (let r = 0; r < WALL.rows; r++) {
        if (taken.has(`${c}:${r}`)) continue;
        const l = tileLocal(c, r, T.pick);
        const w = localToWorld(l.x, l.y, T.pick);
        const d = Math.hypot(w.x - target.x, w.y - target.y);
        if (d < best.d) best = { c, r, d };
      }
    }
    taken.add(`${best.c}:${best.r}`);
    return best;
  });
};

const WINNER_SLOTS = pickWinnerSlots();

export const WALL_TILES: WallTile[] = Array.from({ length: WALL.cols * WALL.rows }, (_, i) => {
  const c = Math.floor(i / WALL.rows);
  const r = i % WALL.rows;
  const winner = WINNER_SLOTS.findIndex((s) => s.c === c && s.r === r);
  const ad = WALL_ADS[i % WALL_ADS.length];
  return winner >= 0
    ? { i, c, r, src: WINNERS[winner].src, days: WINNERS[winner].days, winner }
    : { i, c, r, src: ad.src, days: ad.days, winner: -1 };
});

export const WINNER_TILES = WINNERS.map((_, k) => WALL_TILES.find((t) => t.winner === k) as WallTile);

export const burstDelay = (tile: WallTile) => {
  const l = tileLocal(tile.c, tile.r, T.burst);
  return (Math.hypot(l.x, l.y * 1.2) / 1500) * 13;
};

export const PICK_SCALE = 1.12;
