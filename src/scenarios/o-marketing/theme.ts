import { staticFile } from "remotion";

export const PLATE = "#B6EE3A";
export const RED = "#E11D48";
export const GREEN = "#12A150";
export const CONFETTI = ["#8838F0", "#10D048", "#F06820", "#0868F0", "#B6EE3A"] as const;

export const LOGOS = {
  meta: "meta-ads.svg",
  gads: "google-ads.webp",
  shopify: "shopify-color.svg",
  ga: "google-analytics.svg",
  tiktok: "tiktok-ads.svg",
  gsc: "google-search-console.svg",
} as const;

export type LogoKey = keyof typeof LOGOS;

export const logo = (k: LogoKey) => staticFile(`integrations/${LOGOS[k]}`);
export const SUN = staticFile("ryze-sun.png");
export const SUN_ASPECT = 731 / 714;
