export type Engines = [boolean, boolean, boolean, boolean];

export type Engine = { key: string; label: string; icon: string };

export type Prompt = {
  text: string;
  engines: Engines;
  position: number | null;
  lastRun: string;
};

export type Topic = {
  name: string;
  prompts: Prompt[];
  open: boolean;
  visibility: string;
  position: string;
  engines: Engines;
  lastRun: string;
};

export type Keyword = {
  text: string;
  volume: number;
  difficulty: number;
  position: number | null;
  delta: number;
  trend: number[];
};

export type QueriesKpi = { label: string; value: string };

export type QueriesTab = { label: string; count: number; active: boolean };
