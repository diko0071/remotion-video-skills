export const SECTION_HEIGHTS = {
  hero: 1010,
  pickup: 820,
  sign: 900,
  zodiac: 900,
  journal: 580,
  footer: 660,
} as const;

const H = SECTION_HEIGHTS;

export const OFFSETS = {
  hero: 0,
  pickup: H.hero,
  sign: H.hero + H.pickup,
  zodiac: H.hero + H.pickup + H.sign,
  journal: H.hero + H.pickup + H.sign + H.zodiac,
  footer: H.hero + H.pickup + H.sign + H.zodiac + H.journal,
} as const;

export const PAGE_HEIGHT = OFFSETS.footer + H.footer;

export const SCROLL_STOPS: { f: number; y: number }[] = [
  { f: 0, y: 0 },
  { f: 0.035, y: 0 },
  { f: 0.155, y: OFFSETS.pickup - 20 },
  { f: 0.245, y: OFFSETS.pickup - 20 },
  { f: 0.385, y: OFFSETS.sign - 30 },
  { f: 0.465, y: OFFSETS.sign - 30 },
  { f: 0.6, y: OFFSETS.zodiac - 30 },
  { f: 0.67, y: OFFSETS.zodiac - 30 },
  { f: 0.795, y: OFFSETS.journal - 70 },
  { f: 0.855, y: OFFSETS.journal - 70 },
  { f: 1, y: 0 },
];

export const BUILD_FRACS = {
  pickup: 0.06,
  sign: 0.27,
  zodiac: 0.49,
  journal: 0.72,
  footer: 0.74,
} as const;
