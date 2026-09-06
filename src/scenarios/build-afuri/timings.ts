export const PANEL_VIEW = 985;

export const SECTION_HEIGHTS = {
  hero: 1010,
  products: 950,
  goods: 720,
  about: 920,
  news: 620,
  mountain: 400,
  footer: 980,
} as const;

const H = SECTION_HEIGHTS;

export const OFFSETS = {
  hero: 0,
  products: H.hero,
  goods: H.hero + H.products,
  about: H.hero + H.products + H.goods,
  news: H.hero + H.products + H.goods + H.about,
  mountain: H.hero + H.products + H.goods + H.about + H.news,
  footer: H.hero + H.products + H.goods + H.about + H.news + H.mountain,
} as const;

export const PAGE_HEIGHT = OFFSETS.footer + H.footer;

export const SCROLL_STOPS: { f: number; y: number }[] = [
  { f: 0, y: 0 },
  { f: 0.035, y: 0 },
  { f: 0.15, y: OFFSETS.products - 20 },
  { f: 0.235, y: OFFSETS.products - 20 },
  { f: 0.37, y: OFFSETS.goods - 30 },
  { f: 0.445, y: OFFSETS.goods - 30 },
  { f: 0.575, y: OFFSETS.about - 30 },
  { f: 0.645, y: OFFSETS.about - 30 },
  { f: 0.76, y: OFFSETS.news - 70 },
  { f: 0.825, y: OFFSETS.news - 70 },
  { f: 1, y: 0 },
];

export const BUILD_FRACS = {
  products: 0.06,
  goods: 0.27,
  about: 0.49,
  news: 0.7,
  mountain: 0.72,
  footer: 0.73,
} as const;
