import { Easing, interpolate, spring } from "remotion";
import { PHONE } from "./story";

export const FPS = 30;
export const PROMPT_TO_META_TOTAL = 825;

export const T = {
  title1: 2,
  title2: 18,
  zoomOut: 30,
  zoomEnd: 82,
  titleOut: 62,
  composerIn: 78,
  line1: 88,
  line2: 116,
  line3: 130,
  cursorIn: 128,
  send: 152,
  morph: 155,
  drop: 160,
  burst: 162,
  scrollEnd: 262,
  scan: 184,
  pick: 220,
  fly: 244,
  findDone: 262,
  make: 280,
  fan: 280,
  merge: 306,
  flash: 328,
  gen: 330,
  makeDone: 384,
  launch: 400,
  panel: 400,
  fields: 414,
  toggles: 462,
  approvalIn: 478,
  userCursor: 484,
  approve: 506,
  live: 534,
  phone: 550,
  like: 586,
  feedScroll: 598,
  stories: 610,
  reels: 624,
  push: 652,
  handoff: 680,
  shrinkEnd: 702,
  zoomOut2: 704,
  zoomEnd2: 750,
  endText: 744,
  endButton: 762,
  endHit: 779,
} as const;

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const ramp = (f: number, start: number, dur: number, easing = Easing.inOut(Easing.cubic)) =>
  interpolate(f, [start, start + dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing,
  });

export const pop = (f: number, start: number, damping = 13, stiffness = 180) =>
  spring({ frame: Math.max(0, f - start), fps: FPS, config: { damping, stiffness, mass: 0.9 } });

export const glide = (f: number, start: number, stiffness = 110) =>
  spring({ frame: Math.max(0, f - start), fps: FPS, config: { damping: 200, stiffness, mass: 1 } });

export const logZoom = (f: number, start: number, end: number, from: number, to: number, easing = Easing.inOut(Easing.cubic)) =>
  Math.exp(lerp(Math.log(from), Math.log(to), ramp(f, start, end - start, easing)));

export const toScreen = (_f: number, x: number, y: number) => ({ x, y, zoom: 1 });

export const WORLD_BLUR: Array<[number, number]> = [
  [T.burst, T.burst + 26],
  [T.fly - 2, T.fly + 22],
  [T.fan - 2, T.fan + 18],
  [T.merge, T.gen + 36],
  [T.panel - 2, T.panel + 24],
  [T.phone - 2, T.phone + 20],
  [T.feedScroll, T.feedScroll + 18],
  [T.stories, T.stories + 14],
  [T.reels, T.reels + 14],
];

export const PUSH_BLUR: [number, number] = [T.push + 4, T.handoff - 1];

export const PHONE_FOCUS = { x: PHONE.cx, y: PHONE.cy } as const;
export const PUSH_END_SCALE = 1920 / (PHONE.w - PHONE.bezel * 2);

export const pushProgress = (f: number) => ramp(f, T.push, T.handoff - T.push, Easing.in(Easing.cubic));

export const pushCamera = (f: number) => {
  const t = pushProgress(f);
  return {
    scale: Math.exp(Math.log(PUSH_END_SCALE) * t),
    dx: (960 - PHONE_FOCUS.x) * t,
    dy: (540 - PHONE_FOCUS.y) * t,
  };
};

export const HUD_BLUR: Array<[number, number]> = [[T.morph, T.morph + 20]];

export const MOSAIC_BLUR: Array<[number, number]> = [
  [T.zoomOut + 6, T.zoomEnd - 4],
  [T.zoomOut2 + 4, T.zoomEnd2 - 4],
];
