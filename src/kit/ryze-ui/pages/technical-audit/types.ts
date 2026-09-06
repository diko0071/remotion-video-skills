export type AuditSeverity = "critical" | "warning" | "notice";

export type AuditIssue = { name: string; severity: AuditSeverity; fix: string };

export type AuditPassed = { label: string; description: string };

export type AuditRow = {
  url: string;
  site?: boolean;
  score: number;
  issues: AuditIssue[];
  passed?: AuditPassed[];
  open?: boolean;
  count?: number;
};

export const scoreTone = (score: number) => (score >= 80 ? "good" : score >= 50 ? "fair" : "poor");
