export type DashboardTab = "SEO" | "GEO" | "Content";

export type EngineSpec = { key: string; label: string; icon: string; color: string };

export type TrafficEngine = { label: string; icon: string; color: string };

export type LegendItem = { label: string; color: string };

export type Brand = {
  domain: string;
  initials: string;
  pct: number;
  sovPct: number;
  answers: number;
  own?: boolean;
};

export type CountryRow = { name: string; clicks: number };

export type BucketRow = { label: string; count: number; color: string };

export type MatrixRow = {
  domain: string;
  initials: string;
  own?: boolean;
  values: (number | null)[];
};

export type TopDomainRow = {
  domain: string;
  initials: string;
  usedPct: number;
  avg: number;
  own?: boolean;
};

export type CoverageRow = { engine: EngineSpec; named: number; total: number };

export type PromptRow = {
  text: string;
  engines: (boolean | null)[];
  named: number;
  total: number;
  cited: number;
  topBrand: string | null;
};

export type TrafficRow = { label: string; sessions: number; icon: string; color: string };

export type LandingPageRow = { url: string; byEngine: number[] };

export type ArticleRow = {
  title: string;
  published: string;
  clicks: string;
  pending?: boolean;
  impressions: string;
  ctr: string;
  position: string;
  delta: number;
};

export type ChartSeries = { label: string; color: string; values: number[] };

export type NamedSeries = { name: string; color: string; values: number[] };

export const fmtNumber = (n: number) => n.toLocaleString("en-US");

export const fmtCompact = (n: number) => {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 10_000) return `${(n / 1000).toFixed(0)}k`;
  if (n >= 1_000) return `${(n / 1000).toFixed(1)}k`;
  return fmtNumber(n);
};

export const fmtPct = (n: number) => `${n.toFixed(1)}%`;

export type KpiSpec = {
  label: string;
  value: string;
  sub?: string;
  unit?: string;
  delta?: number;
  tone?: string;
};

export type DualAxisChartSpec = {
  leftTicks: string[];
  rightTicks: string[];
  legend: LegendItem[];
};
