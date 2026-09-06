import type { ArticleBodyBlock, ArticleDraftFields, ArticleScoreRow } from "./types";

export const ARTICLE_EDITOR_BACK_LABEL = "Back to article";

export const ARTICLE_EDITOR_PREVIEW_BACK_LABEL = "Back to programmatic";

export const ARTICLE_EDITOR_TITLE_PLACEHOLDER = "Article title";

export const ARTICLE_EDITOR_DETAILS_TITLE = "Details";

export const ARTICLE_EDITOR_FIELD_LABELS = {
  slug: "Slug",
  metaTitle: "Meta title",
  metaDescription: "Meta description",
  scheduledAt: "Scheduled date",
} as const;

export const ARTICLE_EDITOR_SAVE = "Save";

export const ARTICLE_EDITOR_SAVING = "Saving…";

export const ARTICLE_EDITOR_IMAGE_ACTIONS = {
  replace: "Replace",
  regenerate: "Regenerate",
  remove: "Remove",
} as const;

export const ARTICLE_SCORE_TITLE = "Article score";

export const ARTICLE_SCORE_OF_MAX = "/100";

export const articleChecksPassed = (passed: number, total: number) =>
  `${passed} of ${total} checks passed`;

export const ARTICLE_EDITOR_FIELDS: ArticleDraftFields = {
  title: "Why your candle tunnels and how to fix it",
  slug: "why-candles-tunnel-how-to-fix",
  metaTitle: "Why Your Candle Tunnels (And How To Fix It)",
  metaDescription:
    "Tunnelling wastes up to a third of a hand-poured candle. Here is why the wax burns down the middle, how to reset a tunnelled jar, and how to stop it happening again.",
  scheduledAt: "Aug 16 2026",
};

export const ARTICLE_EDITOR_IMAGE = "hero-candles.jpg";

export const ARTICLE_EDITOR_IMAGE_ALT =
  "Hand-poured soy candles burning on a wooden shelf";

export const ARTICLE_EDITOR_BODY: ArticleBodyBlock[] = [
  {
    kind: "p",
    text: "A tunnelled candle burns a narrow shaft straight down the centre of the jar and leaves a thick ring of wax clinging to the glass. The flame drops below the rim, the scent throw fades, and a candle you paid for stops giving you most of what is in it.",
  },
  { kind: "h2", text: "Why tunnelling happens" },
  {
    kind: "p",
    text: "Wax has a memory. The first burn sets the width of every burn that follows: if you blow the candle out before the melt pool reaches the edge of the jar, the wax remembers that smaller circle and keeps to it. Soy is especially unforgiving here — it melts at a lower temperature than paraffin and needs longer to spread evenly across a wide vessel.",
  },
  { kind: "h2", text: "How to fix a candle that already tunnels" },
  {
    kind: "p",
    text: "Wrap a collar of aluminium foil around the top of the jar, leaving a small opening above the flame. The foil traps heat over the hardened ring and pulls the melt pool back out to the glass. Two hours is usually enough to level a shallow tunnel; a deep one may take a second session.",
  },
  { kind: "h2", text: "How to stop it happening again" },
  {
    kind: "p",
    text: "Give every new candle one long first burn — roughly one hour for each inch of jar diameter — until the melt pool reaches the edge. Trim the wick to a quarter of an inch before each light so the flame stays the right size, and keep the jar away from draughts that pull the flame to one side.",
  },
];

export const ARTICLE_EDITOR_SCORE = 92;

export const ARTICLE_EDITOR_CHECKS: ArticleScoreRow[] = [
  { check: "structure", label: "Optimal content structure", passed: true },
  { check: "internal_links", label: "Internal links", passed: true },
  { check: "external_links", label: "External links", passed: true },
  { check: "statistics", label: "Statistics data points", passed: true },
  { check: "image_alts", label: "Image alt texts", passed: true },
  { check: "semantic_keywords", label: "Semantic keywords", passed: true },
  { check: "faq", label: "FAQ section", passed: true },
  { check: "meta_tags", label: "Optimized meta tags", passed: true },
  { check: "json_ld", label: "JSON-LD schema", passed: false },
];
