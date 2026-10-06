export type Metric = { value: number; change: number | null };
export type Bar = { label: string; value: number; on?: boolean; partial?: boolean; show: boolean };

export type ExtView = {
  domain: string;
  brand: string;
  favicon: string;
  rating: number;
  cites: number;
  period: string;
  chatgpt: Metric;
  aio: Metric;
  asks: Metric;
  chatgptBars: { last: string; value: number; bars: Bar[] };
  aioBars: { last: string; value: number; bars: Bar[] };
  brandTrend: { volume: number; monthly: number[]; axis: [string, string] };
  questions: number;
  questionList: { question: string; volume: number }[];
  askVolume: number;
  lastSeen: string;
  sourceFavicons: string[];
  homepageMentions: number;
  citedPagesTotal: number;
  linkedAnswers: number;
  citedWith: { key: string; mentions: number; favicon: string }[];
};

export type ExtTab = "overview" | "questions" | "sources";
export type ExtTabSchedule = { tabAt: number; hero: number; stats: number; list: number };

export type ExtSchedule = {
  head: number;
  tabs: number;
  rating: number;
  gauge: number;
  metrics: number;
  rows: [number, number, number];
  analyze: number;
  chatgpt: number;
  scroll1: number;
  aio: number;
  scroll2: number;
  brand: number;
  explore: number;
};
