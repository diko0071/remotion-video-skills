import { cascade } from "../../core/schedule";

export const W = 1920;
export const H = 1080;
export const GROUND = "#FDFDFD";

export const PROMPT = "Can you manage my marketing?";
export const TYPE_FROM = 10;
export const TYPE_TO = TYPE_FROM + Math.ceil(PROMPT.length / 1.1);
export const SEND = TYPE_TO + 10;
export const BUBBLE_AT = SEND + 2;
export const THINK_AT = BUBBLE_AT + 14;

export const STAGE_IN = THINK_AT + 40;
export const STAGE_LEN = 16;
export const STAGE_FULL = STAGE_IN + STAGE_LEN;
export const HERO_SIZE = 300;
export const HERO_X = W / 2 - 150;
export const HERO_Y = H / 2 - 40;

export const SUN_IN = STAGE_FULL + 4;
export const SUN_SIZE = 150;
export const SUN_GAP = 70;
export const TOOLS_FROM = SUN_IN + 12;
export const TOOL_GAPS = [3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1];
export const TOOL_MARKS = cascade(TOOLS_FROM, TOOL_GAPS);
export const RING_R = 430;
export const TILE = 92;
export const COLLAPSE_FROM = TOOLS_FROM + 44;
export const COLLAPSE_TO = COLLAPSE_FROM + 24;
export const SQUASH_AT = COLLAPSE_TO - 4;
export const HEADPHONES_AT = COLLAPSE_TO + 4;
export const YES_AT = HEADPHONES_AT + 14;
export const STAGE_OUT = YES_AT + 32;

export const HEADLINE_AT = STAGE_OUT - 8;
export const HEADLINE_LEN = 72;

export const WORK_IN = HEADLINE_AT + HEADLINE_LEN;
export const PANEL_AT = WORK_IN + 6;
export const PANEL_W = 1150;
export const STATS_AT = PANEL_AT + 18;
export const LEAK_MARKS = cascade(STATS_AT + 20, [12, 11, 10, 9]);
export const CARD_AT = LEAK_MARKS[3] + 26;
export const ALLOW_AT = CARD_AT + 46;
export const APPROVED_AT = ALLOW_AT + 6;
export const YES2_AT = APPROVED_AT + 18;
export const DONE_AT = YES2_AT + 22;
export const WORK_OUT = DONE_AT + 24;

export const TAIL_LEN = 112;
export const TOTAL = WORK_OUT + TAIL_LEN;

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

export const ID = {
  send: "mu.send",
  composer: "mu.composer",
  allow: "mu.allow",
  card: "mu.card",
  float: "mu.float",
};
