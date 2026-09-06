export type ScheduleRow = {
  name: string;
  cadence: string;
  once?: boolean;
  enabled: boolean;
};

export type ScheduleRunTone = "ok" | "warn" | "bad" | "neutral";

export type ScheduleRun = {
  when: string;
  status: string;
  tone: ScheduleRunTone;
};
