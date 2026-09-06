import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";

const W = 320;
const H = 180;
const CUT = 30;
const JUMP = 5;
const MOVING = 0.5;

const grayFrames = (file) => {
  const raw = execFileSync(
    "ffmpeg",
    ["-i", file, "-vf", `scale=${W}:${H},format=gray`, "-f", "rawvideo", "-"],
    { maxBuffer: 1024 * 1024 * 1024, stdio: ["ignore", "pipe", "ignore"] },
  );
  const size = W * H;
  const n = Math.floor(raw.length / size);
  const out = [];
  for (let i = 0; i < n; i += 1) out.push(raw.subarray(i * size, (i + 1) * size));
  return out;
};

const meanAbsDiff = (a, b) => {
  let sum = 0;
  for (let i = 0; i < a.length; i += 1) sum += Math.abs(a[i] - b[i]);
  return sum / a.length;
};

export const findJumps = (file) => {
  const frames = grayFrames(file);
  const motion = [];
  for (let i = 1; i < frames.length; i += 1) motion.push(meanAbsDiff(frames[i], frames[i - 1]));
  const jumps = [];
  for (let i = 1; i < motion.length - 1; i += 1) {
    const spike = motion[i] - Math.max(motion[i - 1], motion[i + 1]);
    const isCut = motion[i] > CUT || (motion[i] > 12 && motion[i + 1] < 1);
    if (!isCut && spike > JUMP && motion[i - 1] > MOVING) {
      jumps.push({ frame: i + 1, motion: Number(motion[i].toFixed(1)), spike: Number(spike.toFixed(1)) });
    }
  }
  return { frames: frames.length, jumps };
};

const ids = process.argv.slice(2);
if (ids.length === 0) {
  console.error("Usage: bun scripts/jump-check.mjs <composition-id> [...]");
  process.exit(1);
}

let failed = false;
for (const id of ids) {
  const file = `out/${id}.mp4`;
  if (!existsSync(file)) {
    console.log(`${id.padEnd(20)} MISSING ${file}`);
    failed = true;
    continue;
  }
  const { frames, jumps } = findJumps(file);
  const mark = jumps.length === 0 ? "clean" : `JUMPS ${jumps.length}`;
  console.log(`${id.padEnd(20)} ${String(frames).padStart(5)} frames  ${mark}`);
  for (const j of jumps) console.log(`  frame ${j.frame}  motion ${j.motion}  spike +${j.spike}`);
  if (jumps.length > 0) failed = true;
}
process.exit(failed ? 1 : 0);
