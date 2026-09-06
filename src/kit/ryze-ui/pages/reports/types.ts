export type ReportStatus = "completed" | "in_progress" | "failed" | "not_started";

export type ReportRowData = {
  name: string | null;
  type: "deck" | "dashboard";
  created: string;
  status: ReportStatus;
};

export const STATUS_LABEL: Record<ReportStatus, string> = {
  completed: "Completed",
  in_progress: "In progress",
  failed: "Failed",
  not_started: "Not started",
};

export const STATUS_TONE: Record<ReportStatus, string> = {
  completed: "ok",
  in_progress: "warn",
  failed: "bad",
  not_started: "neutral",
};
