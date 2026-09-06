export type ContentPlanStatus = "Published" | "Drafted" | "Planned" | "Failed";

export type ContentPlanRow = {
  title: string;
  url: string | null;
  scheduled: string;
  impressions: number | null;
  delta: number | null;
  series: number[] | null;
  status: ContentPlanStatus;
};

export type ContentPlanKpi = { label: string; value: string };

export type ContentPlanTab = { label: string; count: number };

export const CONTENT_PLAN_STATUS_DOT: Record<ContentPlanStatus, string> = {
  Published: "dot-positive",
  Drafted: "dot-warn",
  Planned: "dot-neutral",
  Failed: "dot-danger",
};

export const formatCount = (n: number) => n.toLocaleString("en-US");
