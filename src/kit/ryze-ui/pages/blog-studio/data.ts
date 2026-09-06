import { BlogArticle, BlogColor, BlogCorner, BlogLayout, BlogTheme } from "./types";

export const THEMES: BlogTheme[] = [
  { key: "clean", label: "Clean", bg: "#ffffff", text: "#18181b", link: "#2563eb" },
  { key: "night", label: "Night", bg: "#0a0a0a", text: "#fafafa", link: "#60a5fa" },
  { key: "warm", label: "Warm", bg: "#fffbf5", text: "#292524", link: "#b45309" },
  { key: "mint", label: "Mint", bg: "#f8fafc", text: "#0f172a", link: "#0d9488" },
  { key: "violet", label: "Violet", bg: "#faf7ff", text: "#1e1b4b", link: "#7c3aed" },
  { key: "rose", label: "Rose", bg: "#fff1f2", text: "#1c1917", link: "#e11d48" },
];

export const COLORS: BlogColor[] = [
  { label: "Background", hex: "#FFFBF5" },
  { label: "Text", hex: "#292524" },
  { label: "Links", hex: "#B45309" },
];

export const CORNERS: BlogCorner[] = [
  { key: "sharp", label: "Sharp", radius: 0 },
  { key: "soft", label: "Soft", radius: 5.4 },
  { key: "round", label: "Round", radius: 9 },
  { key: "extra", label: "Extra", radius: 12.6 },
];

export const LAYOUTS: BlogLayout[] = [
  { key: "magazine", label: "Magazine", cells: 3 },
  { key: "grid", label: "Grid", cells: 6 },
  { key: "list", label: "List", cells: 3 },
  { key: "minimal", label: "Minimal", cells: 4 },
];

export const FEATURE: BlogArticle = {
  title: "How we hand-pour a candle that burns clean for 60 hours",
  description:
    "Wax blend, wick sizing and cure time — the three decisions behind every Ember & Oak jar.",
  cover: "hero-candles.jpg",
  date: "Aug 12, 2026",
};

export const SIDE: BlogArticle[] = [
  {
    title: "Soy vs. coconut wax: what actually changes the scent throw",
    description: "A side-by-side burn test across six of our best-selling fragrances.",
    cover: "product-1.jpg",
    date: "Aug 8, 2026",
  },
  {
    title: "Candle care: the first burn rule nobody tells you",
    description: "Why the first three hours decide how the rest of the jar behaves.",
    cover: "product-2.jpg",
    date: "Aug 5, 2026",
  },
  {
    title: "Building a gift set that feels considered, not generic",
    description: "How we pair scents by season, room and the person you're buying for.",
    cover: "product-3.jpg",
    date: "Jul 29, 2026",
  },
  {
    title: "Inside the Portland studio: a week of small batches",
    description: "From wax melt to labelled jar, the routine behind 400 candles a week.",
    cover: "banner-candles.jpg",
    date: "Jul 24, 2026",
  },
];

export const REST: BlogArticle[] = [
  {
    title: "Cedar, ember and smoke: building a woody scent",
    description: "The top, heart and base notes we layer for a fireplace in a jar.",
    cover: "product-2.jpg",
    date: "Jul 18, 2026",
  },
  {
    title: "Why our candle jars are made to be reused",
    description: "Five ways customers reuse the glass, and how to clean out the last of the wax.",
    cover: "product-3.jpg",
    date: "Jul 11, 2026",
  },
  {
    title: "Scent for small rooms: sizing a candle right",
    description: "Matching jar size and wick count to a bedroom, hallway or open kitchen.",
    cover: "product-1.jpg",
    date: "Jul 4, 2026",
  },
];
