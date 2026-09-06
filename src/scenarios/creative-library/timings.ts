import VO from "./vo-durations.json";

export const PROMPT = "Make me creatives like these, in my brand.";

const F = (s: number) => Math.ceil(s * 30);

export const K1_TOTAL = F(VO["01-hook"]) + 26;
export const K2_TOTAL = F(VO["02-guess"]) + 26;
export const K3_TOTAL = F(VO["03-turn"]) + 26;

import type { KineticBeat } from "../../kit/kinetic-beats";

export type { KineticBeat };

export const K1_BEATS: KineticBeat[] = [
  {
    at: 0,
    size: 104,
    words: [
      { t: "Ever", at: 4 },
      { t: "wondered", at: 12 },
      { t: "how", at: 23 },
      { t: "these", at: 28 },
      { t: "brands", at: 34 },
      { t: "make", at: 47 },
      { t: "such", at: 53 },
      { t: "insanely", at: 73, hl: true },
      { t: "good", at: 100, hl: true, sparks: true },
      { t: "creatives?", at: 108 },
    ],
    tiles: [
      { image: "apps/wispr-flow_top-s1-23d.jpg", tilt: -3, at: 116 },
      { image: "apps/rocket-money_top-s3.jpg", tilt: 3, at: 121 },
      { image: "apps/cluely_top-4-11d.jpg", tilt: -4, at: 126 },
    ],
  },
];

export const K2_BEATS: KineticBeat[] = [
  {
    at: 0,
    size: 110,
    words: [
      { t: "Maybe", at: 3 },
      { t: "they", at: 14 },
      { t: "hire", at: 20 },
      { t: "the", at: 29 },
      { t: "best", at: 33 },
      { t: "designers?", at: 40, hl: true, sparks: true },
    ],
    tiles: [{ image: "apps/granola_top-2-30d.jpg", tilt: 4, at: 62 }],
  },
  {
    at: 100,
    size: 110,
    words: [
      { t: "or", at: 105 },
      { t: "the", at: 114 },
      { t: "most", at: 119 },
      { t: "expensive", at: 127 },
      { t: "\u{1F4B8}", at: 136 },
      { t: "agencies?", at: 146, hl: true, sparks: true },
    ],
    tiles: [{ image: "apps/whoop_top-1-53d.jpg", tilt: -3, at: 158 }],
  },
];

export const K3_BEATS: KineticBeat[] = [
  {
    at: 0,
    size: 116,
    words: [
      { t: "Or", at: 3 },
      { t: "maybe...", at: 9 },
      { t: "\u{1F440}", at: 20 },
      { t: "they", at: 35 },
      { t: "just", at: 41 },
      { t: "know", at: 49 },
      { t: "what", at: 57 },
      { t: "already", at: 64, hl: true },
      { t: "works.", at: 77, hl: true, sparks: true },
    ],
  },
];

export const PLANET_AT = 74;
export const PLANET_SPIN_FROM = 98;
export const PLANET_SPIN_RATE = 1.6 / 400;
export const PLANET_MORPH_SPIN = 0.35;
export const WALL_TOTAL = 136;
export const WALL_ZOOM: [number, number][] = [
  [0, 1.06],
  [35, 0.88],
  [70, 0.73],
  [105, 0.61],
  [140, 0.51],
  [175, 0.42],
  [210, 0.35],
  [245, 0.29],
  [280, 0.24],
];

export const WALL_END_SPIN =
  (WALL_TOTAL - PLANET_SPIN_FROM) * PLANET_SPIN_RATE + PLANET_MORPH_SPIN;

export const BROWSE_POPS = [6, 26, 46, 64];
export const BROWSE_COMPOSER_AT = 84;
export const BROWSE_FLY_AT = 100;
export const BROWSE_FLY_STAGGER = 6;
export const BROWSE_TYPE_FROM = 134;
export const BROWSE_TYPE_TO = BROWSE_TYPE_FROM + Math.ceil(PROMPT.length / 1.35);
export const BROWSE_SEND = Math.max(F(VO["05-use"]) + 70, BROWSE_TYPE_TO + 26);
export const BROWSE_TOTAL = BROWSE_SEND + 26;

export const FAVORITES = [
  "apps/wispr-flow_top-s1-23d.jpg",
  "apps/rocket-money_top-s3.jpg",
  "apps/cluely_top-4-11d.jpg",
  "apps/granola_top-2-30d.jpg",
];
