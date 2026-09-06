import { cascade } from "../../core/schedule";

export const STAGE = 1080;
export const CENTER = STAGE / 2;
export const HERO_SIZE = 300;

export const HERO_BLINKS = [12];

export const TOOLS_FROM = 27;
export const TOOL_GAPS = [3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1];
export const TOOL_MARKS = cascade(TOOLS_FROM, TOOL_GAPS);
export const RING_R = 330;
export const TILE = 74;

export const COLLAPSE_FROM = 67;
export const COLLAPSE_TO = 89;
export const SQUASH_AT = COLLAPSE_TO - 4;
export const SWALLOW_BLINK = COLLAPSE_TO + 8;

export const MORPH_FROM = COLLAPSE_TO;
export const MORPH_TO = MORPH_FROM + 17;
export const APP_IN = MORPH_FROM;
export const LANDED_BLINK = MORPH_TO + 8;

export const DROP_MARKS = [MORPH_TO + 6, MORPH_TO + 17, MORPH_TO + 26, MORPH_TO + 35];
export const DROP_BLINK = 10;
export const INSTALLED_AT = DROP_MARKS[3] + 10;

export const THREAD_DROP = DROP_MARKS[3] + 8;
export const THREAD_CLICK = THREAD_DROP + 14;
export const PANEL_OPEN = THREAD_CLICK;

export const LIFT_AT = THREAD_CLICK + 22;
export const LIFT_LEN = 14;
export const STAGE_IN = LIFT_AT;
export const STAGE_FULL = LIFT_AT + LIFT_LEN;

export const PROMPT = "Run my marketing";
export const TYPE_FROM = LIFT_AT + 4;
export const TYPE_TO = TYPE_FROM + Math.ceil(PROMPT.length / 1.4);
export const SEND = TYPE_TO + 4;
export const BUBBLE_LEN = 12;
export const TYPING_AT = SEND + 18;
export const TYPING_STAGGER = 4;
export const SEO_AT = TYPING_AT + 44;
export const SEO_LEN = 84;
export const CREATIVES_AT = SEO_AT + SEO_LEN;
export const CREATIVES_LEN = 78;
export const ADS_AT = CREATIVES_AT + CREATIVES_LEN;
export const ADS_APPROVE = ADS_AT + 60;
export const ADS_LEN = 104;
export const WALL_AT = ADS_AT + ADS_LEN;
export const WALL_LEN = 100;
export const WALL_GAPS = [10, 9, 8, 7, 6, 6, 5, 5, 4, 4, 4, 3, 3, 3, 3, 3];
export const FILM_TOTAL = WALL_AT + WALL_LEN;

export const TAIL_HOOK = 50;
export const TAIL_LOCKUP = 112;
export const TAIL_BLINKS = [58, 80];
export const APP_SCALE = 0.92;
export const APP_OFF = (1080 - 1080 * APP_SCALE) / 2;
export const CREAM = "#FDFAF3";

export const TOOLS = [
  "integrations/google-search-console.svg",
  "integrations/google-ads.webp",
  "integrations/meta-ads.svg",
  "integrations/shopify-color.svg",
  "integrations/google-analytics.svg",
  "integrations/posthog.svg",
  "integrations/ahrefs.svg",
  "integrations/semrush.png",
  "integrations/openai-ads.svg",
  "integrations/wordpress.svg",
  "integrations/webflow.svg",
  "integrations/framer.svg",
  "integrations/klaviyo.svg",
  "integrations/tiktok-ads.svg",
  "integrations/linkedin-ads.svg",
  "integrations/hubspot.svg",
];

export type RyzeBot = { name: string; shape: "circle" | "triangle" | "square"; color: string; ready: string; done: string };

export const RYZE_BOTS: RyzeBot[] = [
  { name: "SEO Optimizer", shape: "square", color: "#F5872F", ready: "Search Console and Shopify connected.", done: "6 articles written." },
  { name: "Paid Ads Optimizer", shape: "triangle", color: "#2F7CF6", ready: "Google Ads and Meta connected.", done: "Paused 3 campaigns." },
  { name: "GEO Optimizer", shape: "circle", color: "#2BBFA5", ready: "Tracking ChatGPT, Claude and Perplexity.", done: "12 comparison pages drafted." },
  { name: "Creative Director", shape: "square", color: "#2FB36D", ready: "16 image and video models ready.", done: "6 new ads ready." },
];

