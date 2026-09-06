export type SetupState = "done" | "active" | "pending";

export type SetupSub = { label: string; state: SetupState; logo?: string };

export type SetupStep = {
  n: number;
  title: string;
  state: SetupState;
  subs: SetupSub[];
  logos?: string[];
};

export type GrowthPhase = {
  key: string;
  months: string;
  title: string;
  outcome: string;
  volume: string;
  icon: string;
  open?: boolean;
  description: string;
  milestones: string[];
  results: string[];
};
