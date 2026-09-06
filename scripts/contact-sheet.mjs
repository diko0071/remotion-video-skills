#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const id = process.argv[2];
if (!id) {
  console.error("Usage: bun run sheet -- <composition-id> (needs out/<id>.mp4)");
  process.exit(1);
}
const video = path.join(root, "out", `${id}.mp4`);
if (!existsSync(video)) {
  console.error(`No render at out/${id}.mp4 — render first`);
  process.exit(1);
}
const out = path.join(root, "out", `${id}-sheet.png`);
const probe = execFileSync(
  "ffprobe",
  ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", video],
  { encoding: "utf8" },
);
const duration = parseFloat(probe.trim());
if (!Number.isFinite(duration) || duration <= 0) {
  console.error(`ffprobe returned no duration for ${video}: "${probe.trim()}"`);
  process.exit(1);
}
const fps = Math.min(2, 63 / duration);
execFileSync(
  "ffmpeg",
  ["-y", "-i", video, "-vf", `fps=${fps.toFixed(4)},scale=320:-1,tile=8x8`, "-frames:v", "1", out],
  { stdio: "inherit" },
);
console.log(`Contact sheet: out/${id}-sheet.png — read it with your eyes before shipping`);
