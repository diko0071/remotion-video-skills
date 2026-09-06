import React from "react";

export type ToolRowState = "running" | "done" | "error";

export type ChatToolRow = {
  name: string;
  state?: ToolRowState;
  error?: string;
  skill?: boolean;
};

export type ChatToolRun = {
  summary: string;
  rows: ChatToolRow[];
};

export type ChatReasoning = {
  seconds: number;
};

export type AnswerBlock =
  | { kind: "p"; text: string }
  | { kind: "bullets"; items: string[] }
  | { kind: "heading"; text: string };

export type ChatAnswer = string | AnswerBlock[];

export type ChartSeries = {
  key: string;
  label: string;
  color?: string;
  axis?: "left" | "right";
};

export type ChartDatum = Record<string, string | number>;

export type ChartAxis = {
  max: number;
  ticks: string[];
};

export type ChartSlice = {
  label: string;
  value: number;
  color?: string;
};

export type ChartStatItem = {
  label: string;
  value: string;
  delta?: string;
  dir?: "up" | "down";
  color?: string;
};

export type ChartColumn = {
  key: string;
  label: string;
  align?: "left" | "right";
};

export type ChartRow = Record<string, string>;

export type LineChartSpec = {
  kind: "line" | "area";
  data: ChartDatum[];
  series: ChartSeries[];
  xKey?: string;
  left: ChartAxis;
  right?: ChartAxis;
  legend?: boolean;
  dots?: boolean;
};

export type BarChartSpec = {
  kind: "bar" | "column";
  data: ChartDatum[];
  series: ChartSeries[];
  xKey?: string;
  max: number;
  ticks?: string[];
  stacked?: boolean;
  legend?: boolean;
  valueLabels?: boolean;
  format?: "plain" | "usd" | "compact";
  growFrom?: number;
  tooltip?: { index: number; at: number; label: string; value: string };
};

export type DonutChartSpec = {
  kind: "donut";
  slices: ChartSlice[];
  centerValue?: string;
  centerLabel?: string;
  legend?: boolean;
};

export type StatListSpec = {
  kind: "stat_list";
  items: ChartStatItem[];
};

export type TableSpec = {
  kind: "table";
  columns: ChartColumn[];
  rows: ChartRow[];
  positive?: string[];
};

export type ChartSpec =
  | LineChartSpec
  | BarChartSpec
  | DonutChartSpec
  | StatListSpec
  | TableSpec;

export type CreativeItem = {
  file: string;
  name: string;
  caption: string;
  annotateId?: string;
};

export type ProposalItem = {
  label: string;
  detail: string;
  current: string;
  proposed: string;
  approved?: boolean;
};

export type MetricItem = {
  label: string;
  value: string;
  note?: string;
};

export type ChatResult =
  | { kind: "chart"; title?: string; subtitle?: string; chart: ChartSpec }
  | { kind: "creatives"; title: string; subtitle?: string; items: CreativeItem[]; tile?: number }
  | {
      kind: "proposal";
      title: string;
      subtitle?: string;
      rows: ProposalItem[];
      approveLabel?: string;
      rejectLabel?: string;
    }
  | { kind: "metrics"; title: string; subtitle?: string; items: MetricItem[] }
  | {
      kind: "article";
      title?: string;
      subtitle?: string;
      heading: string;
      meta?: string;
      paragraphs: string[];
    }
  | { kind: "custom"; Render: React.FC };

export type SiteNavItem = {
  label: string;
  active?: boolean;
};

export type SiteProduct = {
  name: string;
  note: string;
  price: string;
  img: string;
};

export type SiteSpec = {
  announce: string;
  brand: string;
  nav: SiteNavItem[];
  actions: string[];
  cart?: string;
  hero: {
    img: string;
    crumb: string;
    title: string;
    text: string;
  };
  toolbar?: {
    count: string;
    filters: string[];
    sort: string;
  };
  products: SiteProduct[];
};

export type DashboardKpi = {
  label: string;
  value: string;
  delta: string;
  note?: string;
  hero?: boolean;
};

export type DashboardWidget = {
  title: string;
  chart: ChartSpec;
  half?: boolean;
};

export type DashboardSpec = {
  title: string;
  context: string;
  pickers: string[];
  kpis: DashboardKpi[];
  widgets: DashboardWidget[];
};

export type DeckSource = {
  logo?: string;
  name: string;
  detail: string;
};

export type DeckCategory = {
  name: string;
  weight: string;
  score: number;
};

export type DeckContent =
  | {
      kind: "gauge";
      score: number;
      outOf: string;
      band: string;
      healthyAt: string;
      healthyLabel: string;
    }
  | {
      kind: "score";
      score: number;
      outOf: string;
      band: string;
      note: string;
      sources: DeckSource[];
      categories: DeckCategory[];
    }
  | { kind: "bullets"; items: string[] };

export type DeckSlide = {
  tone: "dark" | "light";
  index: string;
  title: string;
  sub?: string;
  footer: string;
  content: DeckContent;
};

export type DeckSpec = {
  slides: DeckSlide[];
};

export type ChatArtifact =
  | { kind: "browser"; name: string; site: SiteSpec }
  | { kind: "dashboard"; name: string; dashboard: DashboardSpec }
  | { kind: "deck"; name: string; deck: DeckSpec }
  | { kind: "custom"; name: string; site?: boolean; Render: React.FC };

export type ChatTurn = {
  prompt: string;
  instant?: boolean;
  attachments?: string[];
  attachmentSize?: number;
  reasoning?: ChatReasoning;
  tools?: ChatToolRun;
  answer?: ChatAnswer;
  result?: ChatResult;
  artifact?: ChatArtifact;
};

export type Conversation = {
  title: string;
  workspace?: string;
  turns: ChatTurn[];
};

export const answerBlocks = (answer: ChatAnswer | undefined): AnswerBlock[] => {
  if (!answer) return [];
  if (typeof answer === "string") return [{ kind: "p", text: answer }];
  return answer;
};
