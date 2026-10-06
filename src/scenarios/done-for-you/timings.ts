export const PROMPT = "Fix everything.";
export const SITE = { before: "fix-seo-2/before.png", after: "fix-seo-2/after.png", domain: "dusk.app" } as const;

export const SCAN_SITE = { x: 407, y: 56, w: 1106, h: 968 } as const;
export const SCORE_COL = { x: 1230, y: 176, w: 440, gap: 26 } as const;

export const SITE_AT = -8;
export const BEAM_V_AT = 14;
export const BEAM_H_AT = 40;
export const SCORE_AT = [26, 38, 50] as const;
export const SCORES_FOCUS = 58;
export const SCAN_TOTAL = 92;

export const SITE_CARD_AT = 4;
export const COMPOSER_AT = -26;
export const FLY_AT = 30;
export const TYPE_FROM = 62;
export const TYPE_TO = TYPE_FROM + Math.ceil(PROMPT.length / 1.35);
export const SEND = 100;
export const INPUT_TOTAL = 122;

export const SCORES_BEFORE = [
  { label: "SEO score", value: 23, color: "#DC2626" },
  { label: "GEO score", value: 12, color: "#D97706" },
  { label: "Site health", value: 41, color: "#D97706" },
] as const;
export const SCORES_AFTER = [
  { label: "SEO score", value: 92, color: "#059669" },
  { label: "GEO score", value: 84, color: "#059669" },
  { label: "Site health", value: 96, color: "#059669" },
] as const;

export const FIX_LABELS: [string, string, string][] = [
  ["Auditing 48 pages", "Titles · links · schema · canonicals", "integrations/google-search-console.svg"],
  ["Rewriting titles and meta", "31 pages · target keywords added", "integrations/shopify-color.svg"],
  ["Fixing 9 broken links", "Redirected to live pages", "integrations/shopify-color.svg"],
  ["Adding schema markup", "Product + Organization JSON-LD", "integrations/shopify-color.svg"],
  ["Fixing canonicals", "6 duplicates resolved", "integrations/shopify-color.svg"],
];

export const PUBLISHERS = [
  { domain: "eightsleep.com", dr: 63 },
  { domain: "whoop.com", dr: 66 },
  { domain: "hatch.co", dr: 52 },
  { domain: "nanit.com", dr: 48 },
  { domain: "todoist.com", dr: 78 },
  { domain: "akiflow.com", dr: 59 },
  { domain: "granola.ai", dr: 61 },
  { domain: "meetcleo.com", dr: 47 },
  { domain: "replit.com", dr: 76 },
  { domain: "suno.com", dr: 70 },
  { domain: "lovable.dev", dr: 51 },
  { domain: "rocketmoney.com", dr: 60 },
] as const;

export const ARTICLE = {
  heading: "How much deep sleep do you actually need?",
  meta: "dusk.app/blog · 1,900 words · published",
  paragraphs: [
    "Most adults get between one and two hours of deep sleep a night, but the number that matters is the share of your total sleep, not the clock.",
    "Here is how to read your own nights, and the one habit that moves the number fastest.",
  ],
} as const;
export const PILE = [
  { title: "Why you wake up at 3am", image: "hosted/sample-2.jpg" },
  { title: "Sleep debt, explained", image: "hosted/sample-3.jpg" },
  { title: "Caffeine cutoff by chronotype", image: "hosted/sample-4.jpg" },
  { title: "The 10-3-2-1 rule, tested", image: "hosted/sample-5.jpg" },
  { title: "Melatonin: dose and timing", image: "hosted/sample-6.jpg" },
  { title: "Best temperature for sleep", image: "hosted/sample-1.jpg" },
  { title: "REM vs deep sleep", image: "hosted/sample-2.jpg" },
  { title: "Screen time and sleep onset", image: "hosted/sample-3.jpg" },
] as const;

export const CORAL = "#E3705A";
export const GREEN = "#059669";
export const INK = "#171310";
