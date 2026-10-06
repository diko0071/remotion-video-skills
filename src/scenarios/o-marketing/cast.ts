import { Eyes, GlyphBallName } from "../../kit/glyph-ball";
import { LogoKey } from "./theme";

export type Metric = { bad: string; good: string; tween?: { from: number; to: number; fmt: (v: number) => string } };

export type CastTool = {
  k: LogoKey;
  ball: GlyphBallName;
  eyeColor?: string;
  stress: Eyes;
  title: string;
  sub: string;
  metric: Metric;
  badNote: string;
  goodNote: string;
  badChip: string;
  goodChip: string;
  crowd: { x: number; y: number; size: number };
  ring: number;
  fixAt: number;
};

const usd = (v: number) => `$${Math.round(v)}`;

export const O_CROWD = { x: 960, y: 690, size: 270 } as const;
export const RING = { rx: 440, ry: 240, size: 172 } as const;

export const CAST: readonly CastTool[] = [
  {
    k: "meta",
    ball: "blue",
    stress: "x",
    title: "Meta Ads",
    sub: "Cost per purchase",
    metric: { bad: "$80", good: "$31", tween: { from: 80, to: 31, fmt: usd } },
    badNote: "▲ 38% overnight",
    goodNote: "▼ 61% · 3 ad sets paused",
    badChip: "CPA ▲38%",
    goodChip: "CPA $31",
    crowd: { x: 430, y: 560, size: 210 },
    ring: -150,
    fixAt: 344,
  },
  {
    k: "gads",
    ball: "green",
    stress: "squint",
    title: "Google Ads",
    sub: "Wasted spend",
    metric: { bad: "$410/day", good: "$0/day", tween: { from: 410, to: 0, fmt: (v) => `$${Math.round(v)}/day` } },
    badNote: "14 search terms, 0 sales",
    goodNote: "14 negative keywords added",
    badChip: "$410/day wasted",
    goodChip: "$0 wasted",
    crowd: { x: 1490, y: 560, size: 205 },
    ring: -30,
    fixAt: 376,
  },
  {
    k: "shopify",
    ball: "purple",
    stress: "o",
    title: "Shopify",
    sub: "Product pages",
    metric: { bad: "37 broken", good: "37 fixed" },
    badNote: "404s and missing prices",
    goodNote: "all live again",
    badChip: "37 pages broken",
    goodChip: "37 pages fixed",
    crowd: { x: 300, y: 880, size: 220 },
    ring: 150,
    fixAt: 404,
  },
  {
    k: "ga",
    ball: "orange",
    stress: "flat",
    title: "GA4",
    sub: "Purchases tracked",
    metric: { bad: "0", good: "412", tween: { from: 0, to: 412, fmt: (v) => `${Math.round(v)}` } },
    badNote: "tag broken since Tuesday",
    goodNote: "tracking restored",
    badChip: "0 purchases tracked",
    goodChip: "tracking back",
    crowd: { x: 1620, y: 880, size: 210 },
    ring: 30,
    fixAt: 426,
  },
  {
    k: "tiktok",
    ball: "dark",
    eyeColor: "#FFFFFF",
    stress: "x",
    title: "TikTok Ads",
    sub: "Click-through rate",
    metric: { bad: "0.4%", good: "1.9%" },
    badNote: "creatives worn out",
    goodNote: "5 new creatives live",
    badChip: "ads fatigued",
    goodChip: "5 new creatives",
    crowd: { x: 730, y: 950, size: 190 },
    ring: 90,
    fixAt: 432,
  },
  {
    k: "gsc",
    ball: "sky",
    stress: "squint",
    title: "Search Console",
    sub: "Clicks",
    metric: { bad: "−40%", good: "+22%" },
    badNote: "6 pages lost rankings",
    goodNote: "pages rewritten",
    badChip: "clicks −40%",
    goodChip: "clicks +22%",
    crowd: { x: 1190, y: 950, size: 190 },
    ring: -90,
    fixAt: 438,
  },
];
