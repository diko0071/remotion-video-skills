import { LaunchLine } from "../../kit/launch";
import { T } from "./timeline";

export const HEADLINES: LaunchLine[] = [
  { words: ["Meta", "Ad", "Library,", "inside", "Claude."], plate: [3, 4] },
  { words: ["Ask", "for", "any", "competitor's", "ads."], plate: [2, 3] },
  { words: ["It", "finds", "the", "winners."], plate: [3, 3] },
  { words: ["Then", "rebuilds", "them", "for", "your", "brand."], plate: [4, 5] },
];

export const HEADLINE_STARTS = [-24, T.s2 - 4, T.s3 - 4, T.s4 - 4];
export const HEADLINE_ENDS = [T.s2, T.s3, T.s4, T.absorb + 9];

export const PROMPT_HEAD = "Show me ";
export const PROMPT_TAIL = " ads that have run longest";

export const SLOT_BRANDS = [
  { name: "Glossier's", fav: "brand/fav/glossier.com.png", em: 4.55 },
  { name: "Duolingo's", fav: "brand/fav/duolingo.com.png", em: 4.794 },
  { name: "Allbirds'", fav: "brand/fav/allbirds.com.png", em: 3.792 },
  { name: "Brex's", fav: "brand/fav/brex.com.png", em: 2.819 },
] as const;

export const WINNERS = [
  { src: "brex/w1.jpg", days: 369 },
  { src: "brex/w0b.jpg", days: 369 },
  { src: "brex/w2.jpg", days: 328 },
  { src: "brex/w3.jpg", days: 213 },
] as const;

export const REBUILDS = [
  { id: "v1", headline: "The last corporate card you'll ever need." },
  { id: "v2", headline: "One card. Every expense, handled." },
  { id: "v3", headline: "Higher limits. Zero receipts." },
  { id: "v4", headline: "Your whole team on one card." },
  { id: "v5", headline: "Spend smarter from day one." },
] as const;

export const URL_LEAD = "Try at ";
export const URL = "ryze.ai/ad-library";
