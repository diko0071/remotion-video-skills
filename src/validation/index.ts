import path from "node:path";
import { DEFAULT_MODEL } from "../services/anthropic/client";
import { projectRoot } from "../services/env";
import { sheetReview } from "./checks/sheet-review";
import type { Check, CheckContext, ValidationReport } from "./types";

export const CHECKS: Check[] = [sheetReview];

export const runValidation = async (
  id: string,
  opts: { model?: string; checks?: string[] } = {},
): Promise<ValidationReport> => {
  const ctx: CheckContext = {
    id,
    root: projectRoot,
    videoPath: path.join(projectRoot, "out", `${id}.mp4`),
    sheetPath: path.join(projectRoot, "out", `${id}-sheet.png`),
    model: opts.model ?? DEFAULT_MODEL,
  };
  const selected = opts.checks
    ? CHECKS.filter((check) => opts.checks?.includes(check.name))
    : CHECKS;
  const results = [];
  for (const check of selected) {
    results.push(await check.run(ctx));
  }
  const verdict = results.some((r) => r.verdict === "FIX" || r.verdict === "UNPARSED")
    ? "FIX"
    : "PASS";
  return { id, verdict, results };
};

export const printReport = (report: ValidationReport): void => {
  console.log(`\n=== VALIDATION ${report.id}: ${report.verdict} ===`);
  for (const result of report.results) {
    console.log(`\n-- ${result.check}: ${result.verdict}`);
    for (const issue of result.issues) {
      console.log(`  [${issue.severity}] ${issue.where}`);
      console.log(`    problem: ${issue.what}`);
      console.log(`    fix:     ${issue.fix}`);
    }
    for (const [key, value] of Object.entries(result.notes ?? {})) {
      console.log(`  ${key}: ${value}`);
    }
    if (result.raw) console.log(result.raw);
  }
};

export type { Check, CheckContext, CheckResult, Issue, ValidationReport } from "./types";
