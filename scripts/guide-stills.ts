import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import { buildTimeline, FPS, titleHold, type VoMarks } from "../src/guide/script";

const id = process.argv[2];
if (!id) {
  console.error("Usage: bun scripts/guide-stills.ts guide-<id>");
  process.exit(1);
}
const dir = path.join(process.cwd(), "src", "guide", "scenarios", id.replace(/^guide-/, ""));
const { ACTS } = await import(path.join(dir, "acts.ts"));
const marks = JSON.parse(readFileSync(path.join(dir, "vo-marks.json"), "utf8")) as VoMarks;
const durations = JSON.parse(readFileSync(path.join(dir, "vo-durations.json"), "utf8"));
const timeline = buildTimeline(ACTS, marks, durations, titleHold(durations));

const shots: { frame: number; label: string }[] = [];
for (const cue of timeline.cues) {
  const voFrames = Math.ceil(durations[cue.act.vo] * FPS);
  shots.push({ frame: cue.start + Math.floor(voFrames / 2), label: `${cue.act.vo} (mid-line)` });
  for (const a of cue.actions) {
    if (!a.click) continue;
    shots.push({ frame: a.frame - 14, label: `${cue.act.vo} approach ${a.click}` });
    shots.push({ frame: a.frame + 1, label: `${cue.act.vo} click ${a.click}` });
  }
}

console.log(`${shots.length} stills: every VO midpoint + every click frame`);
for (const [i, shot] of shots.entries()) {
  const out = `out/stills-${id}/${String(i).padStart(2, "0")}-f${shot.frame}.png`;
  execSync(
    `bunx remotion still ${id} ${out} --frame=${shot.frame} --scale=0.4 --log=error`,
    { stdio: "pipe" },
  );
  console.log(`${out}  ←  ${shot.label}`);
}
console.log("Now LOOK at every still: is the narrated thing in frame? did the click land and press?");
