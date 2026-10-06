import { Easing } from "remotion";
import { ramp } from "../../core/motion";
import { buildPath, DotPath, EyeKey, Kind, Mark, pathAt, Stop } from "../../kit/glyph-ball";
import { BLOCK, DOOR_FACE, HOOP, HOOP_Y, SKY, START, STAMP, stampBottom, SUN_PERCH } from "./level";
import { DOT, G, SUN, SUN_SKY } from "./theme";
import { BLOCK_T, DOOR_T, DROP, FALL, FEED, FEED_FLY, LIFT, RING_T, RISE, SMASH, STAMP_T } from "./timings";

const out = Easing.out(Easing.cubic);
const DOT_Y = G - DOT / 2;
const SUN_Y = G - SUN / 2;
const arc = (_a: Stop, b: Stop) => b.arc ?? 40;

const mk = (at: number, x: number, y: number, kind: Kind, a: number, extra: Partial<Mark> = {}): Mark => ({ at, x, y, kind, arc: a, ...extra });

const hops = (x0: number, x1: number, y: number, t0: number, t1: number, n: number, a: number): Mark[] =>
  Array.from({ length: n }, (_, i) => mk(t0 + ((t1 - t0) * (i + 1)) / n, x0 + ((x1 - x0) * (i + 1)) / n, y, "hop", a));

export const SUN_SKY_POS = { x: 4700, y: 230 } as const;
const SUN_SKY_LOW = G + 280;

export const skySunY = (f: number) => {
  if (f < RISE.eyes) return SUN_SKY_LOW + (SUN_SKY_POS.y - SUN_SKY_LOW) * ramp(f, RISE.from, RISE.top, out);
  return SUN_SKY_POS.y - 8 * Math.sin((Math.PI * (f - RISE.eyes)) / (RISE.jump - RISE.eyes));
};

const handleSeat = (drop: number) => stampBottom(drop) - STAMP.base - STAMP.handle - SUN / 2 + 6;
const BLOCK_SEAT = G - BLOCK.h - DOT / 2 + 4;
const LAND_X = 4170;

const sunMarks: Mark[] = [
  mk(RISE.jump, SUN_SKY_POS.x, SUN_SKY_POS.y, "slide", 0, { size: SUN_SKY }),
  mk(RISE.land, LAND_X, SUN_Y, "drop", 240, { until: RISE.ready }),
  mk(RISE.ready + 4, LAND_X, SUN_Y, "hop", 20, { until: DROP + 2 }),
  mk(SMASH.stamp - 4, STAMP.x, handleSeat(0), "drop", 260),
  mk(SMASH.stamp, STAMP.x, handleSeat(1), "slide", 0),
  mk(382, STAMP.x, SUN_Y, "drop", 16),
  mk(388, 3600, SUN_Y, "hop", 60),
  mk(404, 2500, SUN_Y, "hop", SUN_Y - HOOP_Y),
  mk(SMASH.block, BLOCK.x, G - BLOCK.h - SUN / 2 + 6, "stomp", 110),
  mk(SMASH.block + 6, BLOCK.x, G - BLOCK.pressed - SUN / 2 + 6, "slide", 0),
  mk(428, 1850, SUN_Y, "hop", 70),
  mk(434, 1600, SUN_Y, "hop", 50),
  mk(SMASH.door, DOOR_FACE.x, DOOR_FACE.y, "punch", 60),
  mk(450, 1080, SUN_Y, "drop", 40, { until: LIFT.launch }),
  mk(LIFT.sky - 4, SKY.x + 60, SKY.y - 150, "slide", 0),
  mk(LIFT.sky + 10, SUN_PERCH.x, SUN_PERCH.y, "slide", 0, { until: FALL.from + 4 }),
  mk(FALL.land + 6, SKY.x + 300, SUN_Y, "drop", 40),
  mk(FALL.land + 20, SKY.x + 300, SUN_Y, "hop", 60),
  mk(FALL.land + 34, SKY.x + 300, SUN_Y, "hop", 60, { until: Infinity }),
];

export const SUN_PATH: DotPath = buildPath(SUN, sunMarks, RISE.jump, arc);

const dotMarks: Mark[] = [
  mk(-12, START, DOT_Y, "hop", 40),
  ...hops(START, 900, DOT_Y, -12, DOOR_T.jump, 5, 44),
  mk(DOOR_T.splat, DOOR_FACE.x, DOOR_FACE.y, "slide", 70, { until: DOOR_T.splat + 2 }),
  mk(DOOR_T.slide, DOOR_FACE.x, DOOR_FACE.y + 70, "slide", 0),
  mk(DOOR_T.drop, DOOR_FACE.x, DOT_Y, "drop", 0, { until: DOOR_T.leave }),
  ...hops(DOOR_FACE.x, 1900, DOT_Y, DOOR_T.leave, 78, 3, 40),
  mk(BLOCK_T.on, BLOCK.x, BLOCK_SEAT, "stomp", 100, { until: BLOCK_T.stomps[0] - 7 }),
  mk(BLOCK_T.stomps[0], BLOCK.x, BLOCK_SEAT, "stomp", 44, { until: BLOCK_T.stomps[1] - 7 }),
  mk(BLOCK_T.stomps[1], BLOCK.x, BLOCK_SEAT, "stomp", 40, { until: BLOCK_T.off - 9 }),
  mk(BLOCK_T.off, 2420, DOT_Y, "hop", 60),
  ...hops(2420, HOOP.x - 250, DOT_Y, BLOCK_T.off, RING_T.under, 3, 40).map((m, i, a) => (i === a.length - 1 ? { ...m, until: RING_T.jump } : m)),
  mk(RING_T.hit, HOOP.x - 50, HOOP_Y + 40, "punch", 150),
  mk(RING_T.back, HOOP.x - 360, DOT_Y, "drop", 110, { until: RING_T.wake - 6 }),
  mk(RING_T.wake, HOOP.x - 360, DOT_Y, "hop", 26),
  ...hops(HOOP.x - 360, STAMP.x, DOT_Y, RING_T.wake, STAMP_T.under, 4, 46).map((m, i, a) => (i === a.length - 1 ? { ...m, until: DROP } : m)),
  mk(DROP + 8, 3720, DOT_Y, "hop", 60, { until: 386 }),
  mk(394, 3620, DOT_Y, "hop", 30),
  mk(410, 2480, DOT_Y, "hop", DOT_Y - HOOP_Y),
  mk(418, 2300, DOT_Y, "hop", 50),
  mk(426, BLOCK.x - 40, G - BLOCK.pressed - DOT / 2 + 4, "land", 90),
  mk(434, 1850, DOT_Y, "hop", 70),
  mk(442, 1560, DOT_Y, "hop", 60),
  mk(450, 1300, DOT_Y, "hop", 60),
  mk(LIFT.grab, 1190, DOT_Y, "land", 30, { until: LIFT.launch }),
  mk(LIFT.sky, SKY.x, SKY.y, "slide", 0, { until: Infinity }),
];

export const DOT_PATH: DotPath = buildPath(DOT, dotMarks, -30, arc);

export const DOT_EYES: readonly EyeKey[] = [
  { at: -99, eyes: "dot" },
  { at: DOOR_T.splat, eyes: "x" },
  { at: DOOR_T.look, eyes: "o" },
  { at: DOOR_T.leave + 4, eyes: "dot" },
  { at: BLOCK_T.stomps[0] - 4, eyes: "squint" },
  { at: BLOCK_T.tip + 2, eyes: "o" },
  { at: BLOCK_T.stomps[1] + 2, eyes: "squint" },
  { at: BLOCK_T.off, eyes: "dot" },
  { at: RING_T.jump - 4, eyes: "squint" },
  { at: RING_T.hit, eyes: "x" },
  { at: RING_T.back + 4, eyes: "flat" },
  { at: RING_T.wake - 4, eyes: "o" },
  { at: RING_T.wake + 6, eyes: "dot" },
  { at: STAMP_T.look, eyes: "o" },
  { at: STAMP_T.hit, eyes: "x" },
  { at: STAMP_T.up, eyes: "flat" },
  { at: 288, eyes: "o" },
  { at: RISE.land + 4, eyes: "happy" },
  { at: DROP + 2, eyes: "o" },
  { at: SMASH.stamp + 6, eyes: "happy" },
  { at: 400, eyes: "star" },
  { at: 412, eyes: "happy" },
  { at: LIFT.launch, eyes: "o" },
  { at: LIFT.sky - 6, eyes: "happy" },
  { at: FEED[FEED.length - 1] + FEED_FLY + 2, eyes: "happy" },
  { at: FALL.from, eyes: "o" },
  { at: FALL.land + 6, eyes: "happy" },
];
export const DOT_BLINKS = [12, 136, 250, 280, 474] as const;

export const SUN_EYES: readonly EyeKey[] = [
  { at: -99, eyes: "dot" },
  { at: RISE.land, eyes: "happy" },
  { at: RISE.wink, eyes: "wink" },
  { at: RISE.wink + 10, eyes: "dot" },
  { at: SMASH.stamp + 6, eyes: "happy" },
  { at: 384, eyes: "dot" },
  { at: LIFT.grab, eyes: "happy" },
  { at: 596, eyes: "wink" },
  { at: 612, eyes: "happy" },
];
export const SKY_SUN_EYES: readonly EyeKey[] = [
  { at: -99, eyes: "happy" },
  { at: RISE.eyes, eyes: "dot" },
];
export const SUN_BLINKS = [314, 470, 560] as const;

export const dotSquash = (f: number) => {
  if (f >= DOOR_T.splat && f < DOOR_T.drop) {
    const d = f - DOOR_T.splat;
    return d < 6 ? 0.42 * (1 - d / 14) : 0.42 * (1 - d / 14) * (1 - ramp(f, DOOR_T.splat + 6, DOOR_T.drop)) - 0.12 * ramp(f, DOOR_T.splat + 6, DOOR_T.drop);
  }
  if (f >= STAMP_T.hit && f < 262) {
    if (f < STAMP_T.peel) return 0.64;
    return 0.64 * (1 - ramp(f, STAMP_T.peel, STAMP_T.up, Easing.out(Easing.back(2.6))));
  }
  if (f >= 262 && f < RISE.land) return 0.07 + 0.015 * Math.sin(f / 9);
  return 0;
};

export const dotLook = (f: number) => {
  if (f >= DOOR_T.look && f < DOOR_T.leave) return { x: 0, y: -0.9 };
  if (f >= BLOCK_T.tip && f < BLOCK_T.off - 4) return { x: 0.8, y: -0.6 };
  if (f >= RING_T.under && f < RING_T.hit) return { x: 0.6, y: -0.8 };
  if (f >= RING_T.back && f < RING_T.wake) return { x: 0.7, y: -0.7 };
  if (f >= STAMP_T.look && f < STAMP_T.slam) return { x: 0, y: -1 };
  if (f >= 262 && f < 286) return { x: 0, y: 0.6 };
  if (f >= 286 && f < RISE.jump) return { x: 0.9, y: -0.5 };
  if (f >= RISE.jump && f < RISE.land) {
    const s = pathAt(SUN_PATH, f);
    if (!s) return undefined;
    return { x: Math.max(-1, Math.min(1, (s.x - STAMP.x) / 500)), y: Math.max(-1, Math.min(1, (s.y - DOT_Y) / 500)) };
  }
  if (f >= LIFT.sky) return { x: 0.6, y: -0.5 };
  return undefined;
};

export const sunLook = (f: number) => {
  if (f >= RISE.ready && f < DROP) return { x: -0.4, y: -0.9 };
  if (f >= LIFT.sky) return { x: -0.7, y: 0.5 };
  return undefined;
};

const GROW = 1.17;
export const absorbed = (f: number) => FEED.filter((t) => f >= t + FEED_FLY).length;

export const dotGrowth = (f: number) => {
  const n = absorbed(f);
  const last = n > 0 ? FEED[n - 1] + FEED_FLY : -99;
  const d = f - last;
  const pop = n > 0 && d < 12 ? 0.12 * Math.exp(-d / 3) * Math.cos(d * 0.9) : 0;
  return GROW ** n * (1 + pop);
};
