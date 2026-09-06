export type BacklinkStatusKey =
  | "published"
  | "scheduled"
  | "drafted"
  | "in_progress"
  | "waiting_approval"
  | "planned"
  | "failed";

export type BacklinkRow = {
  text: string;
  url: string;
  extra?: number;
  published: string;
  status: BacklinkStatusKey;
};

export type BacklinkKpi = { label: string; value: string };

export type BacklinkTab = { label: string; count: number; active?: boolean };

export const BACKLINK_STATUS_LABEL: Record<BacklinkStatusKey, string> = {
  waiting_approval: "Waiting approval",
  planned: "Planned",
  drafted: "Draft",
  in_progress: "In progress",
  scheduled: "Submitted to publisher",
  published: "Published",
  failed: "Failed",
};

export const BACKLINK_STATUS_TONE: Record<BacklinkStatusKey, string> = {
  waiting_approval: "warn",
  planned: "neutral",
  drafted: "warn",
  in_progress: "warn",
  scheduled: "warn",
  published: "positive",
  failed: "danger",
};

export type RefBacklinkRow = {
  url: string;
  page: string;
  product: string;
  keyword: string;
  anchor: string;
  status: "published" | "lost";
};
