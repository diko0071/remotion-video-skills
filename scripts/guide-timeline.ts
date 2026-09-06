import { readFileSync } from "node:fs";
import path from "node:path";
import { buildTimeline, FPS, type VoMarks } from "../src/guide/script";

const id = process.argv[2];
const dir = path.join(process.cwd(), "src", "guide", "scenarios", id.replace(/^guide-/, ""));
const { ACTS } = await import(path.join(dir, "acts.ts"));
const marks = JSON.parse(readFileSync(path.join(dir, "vo-marks.json"), "utf8")) as VoMarks;
const durations = JSON.parse(readFileSync(path.join(dir, "vo-durations.json"), "utf8"));
const title = Math.ceil(durations["00-title"] * FPS) + 20;
const timeline = buildTimeline(ACTS, marks, durations, title);

for (const cue of timeline.cues) {
  console.log(
    `${(cue.start / FPS).toFixed(1).padStart(6)}s  ${cue.act.vo.padEnd(12)} → ${(cue.end / FPS).toFixed(1)}s`,
  );
  for (const a of cue.actions) {
    console.log(
      `${(a.frame / FPS).toFixed(1).padStart(6)}s      ${a.click ?? "(state)"} ${a.set ? `[${a.set}]` : ""}`,
    );
  }
}
console.log(`total ${(timeline.total / FPS).toFixed(1)}s`);
