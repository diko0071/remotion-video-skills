import { existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { extractJson, reviewImage } from "../../services/anthropic/client";
import { mediaDurationSec } from "../../services/media/client";
import type { Check, CheckResult, Issue } from "../types";

const RULES = (secPerTile: number) => `You are reviewing a CONTACT SHEET of a
promo/demo video for Ryze (AI marketing product). Tiles read left-to-right,
top-to-bottom — together they are the full film.
DENSITY: one tile ≈ ${secPerTile.toFixed(2)}s of video. Convert tile counts to
seconds before judging pacing.

Judge it against these house rules:

PACING
- No state parks longer than ~3s (${Math.round(3 / secPerTile)} near-identical
  tiles at this density). Title hooks are ALLOWED 1.5-2.5s; endcards are
  ALLOWED up to 3s when their elements animate in staggered.
- Energy should build: later scenes tighter than earlier ones.
- No dead/empty tiles (blank frames, half-empty layouts, content overscrolled
  away). Black tiles at the very end are tile-grid padding — ignore those.

LAYOUT & CRAFT
- Headings centered; subheadings centered under them; no orphaned
  punctuation wrapping to its own line.
- Nothing clipped: numbers on charts, labels, buttons, text near edges.
- No double headings visible at once.
- Buttons: small corner radius, never pill/capsule. No terminal aesthetics.
- Consistent margins: content should not hug frame edges.

STORY
- Arc must read: hook (title) -> setup -> work-on-screen (tools/progress) ->
  wow (result/dashboard) -> close (outro with logo + domain pill).
- The product UI must look real and coherent (Claude UI: ivory bg, serif
  responses; Ryze UI: warm cream, small radii).
- Final scene: outro with logo, heading, domain button.

Report ONLY real defects you can see in the tiles. Be specific about WHERE
(quote the tile's visible heading text and approximate row). Do not invent
issues you cannot see. If pacing is good and layout is clean, say so.

Severity calibration: P0/P1 = broken things (dead/blank frames, clipped
text, overlapping elements, hard state-parks over the limit, missing story
beats). P2 = polish suggestions — keep reporting them, they are valuable,
but verdict is "FIX" ONLY when at least one P0/P1 exists. A film that obeys
the rules with only P2-level ideas left is a PASS.

Respond with the JSON object ONLY — no prose before or after it:
{
  "verdict": "PASS" | "FIX",
  "issues": [
    { "severity": "P0"|"P1"|"P2", "where": "...", "what": "...", "fix": "..." }
  ],
  "pacing_note": "...",
  "best_moment": "..."
}`;

type SheetVerdict = {
  verdict: "PASS" | "FIX";
  issues: Issue[];
  pacing_note?: string;
  best_moment?: string;
};

export const sheetReview: Check = {
  name: "sheet-review",
  run: async (ctx): Promise<CheckResult> => {
    if (!existsSync(ctx.sheetPath)) {
      execFileSync("bun", ["scripts/contact-sheet.mjs", ctx.id], { cwd: ctx.root, stdio: "pipe" });
    }
    const secPerTile = 1 / Math.min(2, 63 / mediaDurationSec(ctx.videoPath));
    const text = await reviewImage(ctx.sheetPath, RULES(secPerTile), {
      model: ctx.model,
      maxTokens: 8000,
    });
    const parsed = extractJson<SheetVerdict>(text);
    if (!parsed) return { check: "sheet-review", verdict: "UNPARSED", issues: [], raw: text };
    const blocking = (parsed.issues ?? []).some(
      (i) => i.severity === "P0" || i.severity === "P1",
    );
    return {
      check: "sheet-review",
      verdict: blocking ? "FIX" : "PASS",
      issues: parsed.issues ?? [],
      notes: {
        ...(parsed.pacing_note ? { pacing: parsed.pacing_note } : {}),
        ...(parsed.best_moment ? { best: parsed.best_moment } : {}),
      },
    };
  },
};
