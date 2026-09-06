export type Severity = "P0" | "P1" | "P2";

export type Issue = {
  severity: Severity;
  where: string;
  what: string;
  fix: string;
};

export type CheckResult = {
  check: string;
  verdict: "PASS" | "FIX" | "SKIP" | "UNPARSED";
  issues: Issue[];
  notes?: Record<string, string>;
  raw?: string;
};

export type ValidationReport = {
  id: string;
  verdict: "PASS" | "FIX";
  results: CheckResult[];
};

export type CheckContext = {
  id: string;
  root: string;
  videoPath: string;
  sheetPath: string;
  model: string;
};

export type Check = {
  name: string;
  run: (ctx: CheckContext) => Promise<CheckResult>;
};
