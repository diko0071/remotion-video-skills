import { execSync, spawnSync } from "node:child_process";
import { existsSync, readFileSync, unlinkSync } from "node:fs";
import path from "node:path";
import { generateMusicToFile } from "../src/services/elevenlabs/client";
import { mediaDurationSec } from "../src/services/media/client";
import { projectRoot } from "../src/services/env";

const args = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const flags = new Set(process.argv.slice(2).filter((a) => a.startsWith("--")));
const id = args[0];

if (!id) {
  console.error("Usage: bun run video -- <composition-id> [--force-music] [--no-music]");
  process.exit(1);
}

const root = projectRoot;
const scenarioDir = id.startsWith("guide-")
  ? path.join(root, "src", "guide", "scenarios", id.slice("guide-".length))
  : path.join(root, "src", "scenarios", id);
const musicJsonPath = path.join(scenarioDir, "music.json");
const musicMp3 = path.join(root, "public", "music", `${id}.mp3`);
const outMp4 = path.join(root, "out", `${id}.mp4`);

type MusicConfig = { prompt: string; lengthMs?: number; volume?: number };

let durationCache: number | null | undefined;
const compositionDurationMs = (): number | null => {
  if (durationCache !== undefined) return durationCache;
  const out = execSync("bunx remotion compositions", { cwd: root, encoding: "utf8" });
  const escaped = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  for (const line of out.split("\n")) {
    const m = line.match(new RegExp(`^${escaped}\\s+([\\d.]+)\\s+\\d+x\\d+\\s+(\\d+)`));
    if (m) return (durationCache = Math.round((Number(m[2]) / Number(m[1])) * 1000));
  }
  return (durationCache = null);
};

const run = (cmd: string, cmdArgs: string[]) => {
  const r = spawnSync(cmd, cmdArgs, { cwd: root, stdio: "inherit" });
  if (r.error) {
    console.error(`${cmd} could not run: ${r.error.message}`);
    process.exit(1);
  }
  if (r.status !== 0) process.exit(r.status ?? 1);
};

const main = async () => {
  const wantMusic = existsSync(musicJsonPath) && !flags.has("--no-music");
  let config: MusicConfig | null = null;

  if (wantMusic) {
    config = JSON.parse(readFileSync(musicJsonPath, "utf8")) as MusicConfig;
    const videoMs = compositionDurationMs();
    let stale = false;
    if (existsSync(musicMp3) && videoMs) {
      const musicSec = mediaDurationSec(musicMp3);
      if (musicSec < videoMs / 1000 - 1) {
        console.log(
          `Music too short (${musicSec.toFixed(1)}s < video ${(videoMs / 1000).toFixed(1)}s) — regenerating`,
        );
        stale = true;
      }
    }
    if (!existsSync(musicMp3) || stale || flags.has("--force-music")) {
      const lengthMs = config.lengthMs ?? videoMs;
      if (!lengthMs) {
        console.error("Could not detect composition duration; set lengthMs in music.json");
        process.exit(1);
      }
      console.log(`Generating music (${Math.round(lengthMs / 1000)}s): ${config.prompt.slice(0, 80)}…`);
      await generateMusicToFile(config.prompt, musicMp3, { lengthMs });
      console.log(`Saved ${path.relative(root, musicMp3)}`);
    } else {
      console.log(`Music exists: ${path.relative(root, musicMp3)} (use --force-music to regenerate)`);
    }
  }

  if (!wantMusic || !config) {
    run("bunx", ["remotion", "render", id, path.relative(root, outMp4), "--overwrite"]);
    console.log(`Done: out/${id}.mp4 (no music)`);
    return;
  }

  const rawMp4 = path.join(root, "out", `${id}-raw.mp4`);
  run("bunx", ["remotion", "render", id, path.relative(root, rawMp4), "--overwrite"]);

  const volume = config.volume ?? 0.55;
  const durationMs = compositionDurationMs();
  if (!durationMs) {
    console.error(`Could not detect duration for "${id}" — refusing to mux (a 0s fallback would fade the music out at 0:00)`);
    process.exit(1);
  }
  const durationSec = durationMs / 1000;
  const fadeOutStart = Math.max(0, durationSec - 2.5).toFixed(2);
  run("ffmpeg", [
    "-y",
    "-i", rawMp4,
    "-i", musicMp3,
    "-filter_complex",
    `[1:a]volume=${volume},afade=t=in:d=1,afade=t=out:st=${fadeOutStart}:d=2.5[m];[0:a][m]amix=inputs=2:duration=first:normalize=0[a]`,
    "-map", "0:v",
    "-map", "[a]",
    "-c:v", "copy",
    "-c:a", "aac",
    "-shortest",
    outMp4,
  ]);
  unlinkSync(rawMp4);
  console.log(`Done: out/${id}.mp4 (with music)`);
};

main();
