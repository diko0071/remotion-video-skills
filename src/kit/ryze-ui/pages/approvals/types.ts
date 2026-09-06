export type Tone = "neutral" | "ok" | "warn" | "bad" | "info";

export type ApprovalStatus =
  | "proposed"
  | "applying"
  | "applied"
  | "failed"
  | "rejected"
  | "acknowledged";

export type ApprovalChange = { label: string; from: string | null; to: string };

export type ApprovalDetail = {
  description: string;
  product: "SEO" | "Paid Ads";
  entity: Record<string, string>;
  changes: ApprovalChange[];
  evidence: { points: string[]; window?: string };
  impact?: { kind: "measured" | "modeled"; label: string };
  blocker?: string;
};

export type ApprovalRow = {
  id: string;
  title: string;
  channel: string;
  age: string;
  status: ApprovalStatus;
  blocked?: boolean;
  selected?: boolean;
  detail?: ApprovalDetail;
};

export type Card = {
  title: string;
  channel: string;
  age: string;
  blocked?: boolean;
  actions?: "decide" | "blocked";
};

export type Column = {
  status: string;
  tone: Tone;
  total: number;
  cards: Card[];
  more?: number;
};
