import { execFileSync } from "node:child_process";
import { mkdirSync, rmSync, readdirSync } from "node:fs";
import path from "node:path";

const [, , id, refPath, rateArg] = process.argv;
if (!id || !refPath) {
  console.error("usage: bun scripts/frame-diff.mjs <composition-id> <reference.mp4> [fps]");
  process.exit(1);
}

const rate = Number(rateArg ?? 4);
const ours = path.resolve(`out/${id}.mp4`);
const ref = path.resolve(refPath);
const dir = path.resolve(`out/diff-${id}`);

rmSync(dir, { recursive: true, force: true });
mkdirSync(path.join(dir, "a"), { recursive: true });
mkdirSync(path.join(dir, "b"), { recursive: true });

const ff = (args) => execFileSync("ffmpeg", ["-v", "error", ...args]);
const probe = (file) =>
  Number(
    execFileSync("ffprobe", [
      "-v",
      "error",
      "-show_entries",
      "format=duration",
      "-of",
      "csv=p=0",
      file,
    ])
      .toString()
      .trim(),
  );

const refDur = probe(ref);
const ourDur = probe(ours);
const scale = ourDur / refDur;

ff(["-i", ref, "-vf", `fps=${rate},scale=640:-1`, path.join(dir, "a", "f%03d.png")]);
ff([
  "-i",
  ours,
  "-vf",
  `fps=${(rate * scale).toFixed(5)},scale=640:-1`,
  path.join(dir, "b", "f%03d.png"),
]);

const a = readdirSync(path.join(dir, "a")).sort();
const b = readdirSync(path.join(dir, "b")).sort();
const n = Math.min(a.length, b.length);

for (let i = 0; i < n; i++) {
  ff([
    "-i",
    path.join(dir, "a", a[i]),
    "-i",
    path.join(dir, "b", b[i]),
    "-filter_complex",
    "[0:v]pad=iw+6:ih:0:0:color=0x1D4ED8[l];[1:v]pad=iw+6:ih:6:0:color=0xDC2626[r];[l][r]hstack=inputs=2",
    path.join(dir, `pair-${String(i + 1).padStart(3, "0")}.png`),
  ]);
}

const perSheet = 12;
for (let s = 0; s * perSheet < n; s++) {
  ff([
    "-start_number",
    String(s * perSheet + 1),
    "-i",
    path.join(dir, "pair-%03d.png"),
    "-frames:v",
    String(Math.min(perSheet, n - s * perSheet)),
    "-vf",
    "scale=900:-1,tile=2x6",
    "-update",
    "1",
    "-frames:v",
    "1",
    path.join(dir, `sheet-${s + 1}.png`),
  ]);
}

console.log(`pairs: ${n}, sheets: ${Math.ceil(n / perSheet)} -> ${dir}`);
