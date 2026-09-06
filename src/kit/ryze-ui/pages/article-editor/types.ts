export type ArticleScoreCheck =
  | "structure"
  | "internal_links"
  | "external_links"
  | "statistics"
  | "image_alts"
  | "semantic_keywords"
  | "faq"
  | "meta_tags"
  | "json_ld";

export type ArticleScoreRow = {
  check: ArticleScoreCheck;
  label: string;
  passed: boolean;
};

export type ArticleDraftFields = {
  title: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  scheduledAt: string;
};

export type ArticleBodyBlock =
  | { kind: "h2"; text: string }
  | { kind: "p"; text: string; link?: { anchor: string; highlightId?: string } };

export const META_TITLE_MAX = 80;

export const META_DESCRIPTION_MAX = 200;

export const SCORE_BAND_STROKE = {
  good: "#0AAC8D",
  fair: "#F59E0B",
  poor: "#EF4444",
} as const;

export type ArticleScoreBand = keyof typeof SCORE_BAND_STROKE;

export const scoreBand = (score: number): ArticleScoreBand =>
  score < 50 ? "poor" : score < 75 ? "fair" : "good";
