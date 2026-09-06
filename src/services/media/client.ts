import { execFileSync } from "node:child_process";

export const mediaDurationSec = (file: string): number => {
  const out = execFileSync(
    "ffprobe",
    ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", file],
    { encoding: "utf8" },
  ).trim();
  const seconds = parseFloat(out);
  if (!Number.isFinite(seconds)) {
    throw new Error(`ffprobe returned no duration for ${file}: "${out}"`);
  }
  return seconds;
};
