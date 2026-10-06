import { staticFile } from "remotion";

export const GROUND = "#FDFAF3";
export const SOFT = "#F6F2EA";
export const AMBER = "#F59E0B";
export const BLUE = "#2563EB";

export const LOGOS = {
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

export const PLATFORMS = [
  { name: "Meta", logo: LOGOS.meta, picked: true },
  { name: "Google", logo: LOGOS.google, picked: true },
  { name: "TikTok", logo: LOGOS.tiktok, picked: false },
  { name: "LinkedIn", logo: LOGOS.linkedin, picked: false },
  { name: "Microsoft", logo: LOGOS.microsoft, picked: false },
  { name: "Snapchat", logo: LOGOS.snapchat, picked: false },
  { name: "Reddit", logo: LOGOS.reddit, picked: false },
  { name: "OpenAI", logo: LOGOS.openai, picked: false },
] as const;

const ADS = ["a01", "c2", "a09", "a04", "c4", "a02", "a12", "c1"] as const;
export const ad = (i: number) => `managed-campaigns/ads/${ADS[i % ADS.length]}.jpg`;

export const CARD = { x: 960, top: 330, w: 1240 } as const;
export const STAGE_SCALE = 1.18;
export const STAGE_ORIGIN = { x: 960, y: 620 } as const;
export const BODY_H = 492;
