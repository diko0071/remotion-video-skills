import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { generateSpeechToFile } from "../src/services/elevenlabs/client";
import { mediaDurationSec } from "../src/services/media/client";

const id = process.argv[2];
const force = process.argv.includes("--force");
if (!id) {
  console.error("Usage: bun scripts/generate-vo.ts <scenario-id> [--force]");
  process.exit(1);
}

const root = process.cwd();
const scenarioDir = id.startsWith("guide-")
  ? path.join(root, "src", "guide", "scenarios", id.slice("guide-".length))
  : path.join(root, "src", "scenarios", id);
const scriptPath = path.join(scenarioDir, "vo.json");
const outDir = path.join(root, "public", "vo", id);
const durationsPath = path.join(scenarioDir, "vo-durations.json");

type VoScript = { voiceId: string; modelId?: string; lines: { key: string; text: string }[] };

const script = JSON.parse(readFileSync(scriptPath, "utf8")) as VoScript;
mkdirSync(outDir, { recursive: true });

const durations: Record<string, number> = existsSync(durationsPath)
  ? (JSON.parse(readFileSync(durationsPath, "utf8")) as Record<string, number>)
  : {};

for (const line of script.lines) {
  const file = path.join(outDir, `${line.key}.mp3`);
  if (!existsSync(file) || force) {
    await generateSpeechToFile(line.text, file, {
      voiceId: script.voiceId,
      modelId: script.modelId,
      stability: script.modelId === "eleven_v3" ? 0.5 : 0.45,
      similarityBoost: 0.75,
    });
    console.log(`voiced ${line.key}`);
  }
  durations[line.key] = Number(mediaDurationSec(file).toFixed(2));
}

writeFileSync(durationsPath, `${JSON.stringify(durations, null, 2)}\n`);
console.log(`Durations written: ${path.relative(root, durationsPath)}`);
