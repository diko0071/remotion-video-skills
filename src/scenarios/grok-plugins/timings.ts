export const GROUND = "#0A0A0B";
export const INK = "#F1F1F3";
export const MUTED = "#9A9AA1";
export const GREEN = "#3CC26A";
export const APP_SCALE = 0.92;
export const APP_OFF_X = (1920 - 1920 * APP_SCALE) / 2;
export const APP_OFF_Y = (1080 - 1080 * APP_SCALE) / 2;
export const MODAL_SCALE = 0.62;
export const MODAL = { x: 402, y: 106 } as const;
export const SLOT = { x: 64, y: 604, w: 804, h: 80 } as const;
export const HERO_SCALE = 2.0;

export const INTRO_LEN = 70;
export const INTRO_OUT = 56;
export const CARRY_LEN = 8;
export const HERO_POP = 0;
export const HERO_SLIDE = 22;
export const HERO_ADD = 50;
export const MORPH = { at: 74, len: 26 } as const;
export const CURSOR = { from: 92, at: 130 } as const;
export const ADDED_AT = 130;
export const STAGE_IN = 138;
export const STAGE_FULL = 152;

export const BLOCK_LEN = 62;
export const REPLY_AT = 20;
export const DONE_AT = 34;
export const FIRST_BLOCK = STAGE_IN + 4;
export const CASE_COUNT = 5;
export const FILM_TOTAL = FIRST_BLOCK + BLOCK_LEN * CASE_COUNT + 10;
export const LOCKUP_LEN = 112;
export const TAIL_BLINKS = [58, 80];
export const TOTAL = INTRO_OUT + CARRY_LEN + FILM_TOTAL + LOCKUP_LEN;
export const LABELS = ["Watch your ads", "Make creatives", "Launch ads", "Fix SEO", "Get cited by AI"];

export type CaseSpec = {
  logo?: string;
  doneLogos?: string[];
  bot: string;
  reply: string;
  done: string;
  artifact: "paused" | "creatives" | "live" | "fixes" | "leaderboard";
  files?: string[];
};

export const CASES: CaseSpec[] = [
  { logo: "integrations/meta-ads.svg", bot: "Meta spend is at $9,540 today, 2.3x your daily cap. ROAS dropped to 1.4.", reply: "Pause it", done: "Paused 2 ad sets. Saved $6,120 today.", artifact: "paused" },
  { bot: "Summer sale creatives are ready. Three variants in your brand style.", reply: "Ship them", done: "Live on Meta and TikTok.", doneLogos: ["integrations/meta-ads.svg", "integrations/tiktok-ads.svg"], artifact: "creatives", files: ["creative-wall/airtable_top-1-106d.jpg", "creative-wall/artistly-ai_top-1-446d.jpg", "creative-wall/akka-superbiotics_top-9-24d.jpg"] },
  { logo: "integrations/meta-ads.svg", bot: "The summer sale campaign is ready: 3 ad sets, 6 creatives, $120 a day on Meta.", reply: "Launch it", done: "Live. First results in about two hours.", artifact: "live" },
  { logo: "integrations/google-search-console.svg", bot: "12 pages lost rankings after the core update. Fixes are ready.", reply: "Fix it", done: "12 pages fixed and resubmitted.", artifact: "fixes" },
  { logo: "ai-engines/chatgpt.png", bot: "ChatGPT now cites you for 4 of your 20 tracked prompts.", reply: "Nice", done: "Perplexity and Claude picked you up too.", artifact: "leaderboard" },
];
export const BLOCK_AT = (i: number) => FIRST_BLOCK + i * BLOCK_LEN;
