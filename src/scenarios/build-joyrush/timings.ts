export const SECTION_HEIGHTS = {
  hero: 1010,
  juices: 1450,
  gummies: 880,
  about: 780,
  joylife: 860,
  bundle: 720,
  footer: 620,
} as const;

const H = SECTION_HEIGHTS;

export const OFFSETS = {
  hero: 0,
  juices: H.hero,
  gummies: H.hero + H.juices,
  about: H.hero + H.juices + H.gummies,
  joylife: H.hero + H.juices + H.gummies + H.about,
  bundle: H.hero + H.juices + H.gummies + H.about + H.joylife,
  footer: H.hero + H.juices + H.gummies + H.about + H.joylife + H.bundle,
} as const;

export const PAGE_HEIGHT = OFFSETS.footer + H.footer;

export const SCROLL_STOPS = [
  { f: 0, y: 0 },
  { f: 0.03, y: 0 },
  { f: 0.115, y: OFFSETS.juices - 20 },
  { f: 0.185, y: OFFSETS.juices - 20 },
  { f: 0.27, y: OFFSETS.juices + 470 },
  { f: 0.33, y: OFFSETS.juices + 470 },
  { f: 0.435, y: OFFSETS.gummies - 30 },
  { f: 0.505, y: OFFSETS.gummies - 30 },
  { f: 0.6, y: OFFSETS.about - 30 },
  { f: 0.665, y: OFFSETS.about - 30 },
  { f: 0.75, y: OFFSETS.joylife - 30 },
  { f: 0.805, y: OFFSETS.joylife - 30 },
  { f: 0.885, y: OFFSETS.bundle - 50 },
  { f: 0.925, y: OFFSETS.bundle - 50 },
  { f: 1, y: 0 },
];

export const BUILD_FRACS = {
  juices: 0.045,
  gummies: 0.37,
  about: 0.55,
  joylife: 0.7,
  bundle: 0.84,
  footer: 0.9,
} as const;
