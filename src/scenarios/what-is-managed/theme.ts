import { staticFile } from "remotion";

export const LOGO = {
  meta: staticFile("integrations/meta-ads.svg"),
  google: staticFile("integrations/google-ads.webp"),
  tiktok: staticFile("integrations/tiktok-ads.svg"),
  linkedin: staticFile("integrations/linkedin-ads.svg"),
  microsoft: staticFile("integrations/microsoft-ads.svg"),
  snapchat: staticFile("integrations/snapchat-ads.svg"),
  reddit: staticFile("integrations/reddit-ads.svg"),
  openai: staticFile("integrations/openai-ads.svg"),
  sun: staticFile("ryze-sun.png"),
} as const;

const ADS = ["a01", "c2", "a09", "a04", "c4", "a02", "a12", "c1", "a05"] as const;
export const ad = (i: number) => staticFile(`managed-campaigns/ads/${ADS[i % ADS.length]}.jpg`);
