export type ReportKpi = {
  label: string;
  value: string;
  change?: number;
  sub?: string;
  peer?: string;
};

export type ReportMonth = { label: string; value: number };

export type ReportChannel = {
  channel: string;
  sub: string;
  sessions: string;
  revenue: string;
  conv: string;
};

export type ReportRec = { title: string; why: string[]; nextSteps: string[] };

export type ReportCheckStatus = "delivered" | "ongoing" | "blocked" | "planned";

export type ReportCheck = {
  slug: string;
  title: string;
  description: string;
  status: ReportCheckStatus;
  blockReason?: string;
};

export const CHECK_LABEL: Record<ReportCheckStatus, string> = {
  delivered: "Delivered",
  ongoing: "In progress",
  blocked: "Blocked",
  planned: "Planned",
};

export const CHECK_TONE: Record<ReportCheckStatus, string> = {
  delivered: "ok",
  ongoing: "warn",
  blocked: "bad",
  planned: "neutral",
};
