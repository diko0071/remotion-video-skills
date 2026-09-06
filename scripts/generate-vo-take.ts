import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { generateSpeechToFile, transcribeWords } from "../src/services/elevenlabs/client";
import { mediaDurationSec } from "../src/services/media/client";

const id = process.argv[2];
if (!id) {
  console.error("Usage: bun scripts/generate-vo-take.ts <scenario-id> [--reuse-take]");
  process.exit(1);
}
const reuseTake = process.argv.includes("--reuse-take");

const root = process.cwd();
const scenarioDir = id.startsWith("guide-")
  ? path.join(root, "src", "guide", "scenarios", id.slice("guide-".length))
  : path.join(root, "src", "scenarios", id);
const outDir = path.join(root, "public", "vo", id);
const takePath = path.join(outDir, "_take.mp3");

type VoScript = { voiceId: string; modelId?: string; lines: { key: string; text: string }[] };
const script = JSON.parse(readFileSync(path.join(scenarioDir, "vo.json"), "utf8")) as VoScript;
mkdirSync(outDir, { recursive: true });

const fullText = script.lines.map((l) => l.text).join("\n\n");
if (!reuseTake) {
  await generateSpeechToFile(fullText, takePath, {
    voiceId: script.voiceId,
    modelId: script.modelId,
    stability: script.modelId === "eleven_v3" ? 0.5 : 0.45,
    similarityBoost: 0.75,
  });
  console.log(`voiced full take (${fullText.length} chars)`);
}

const norm = (w: string) => w.toLowerCase().replace(/[^a-z0-9']/g, "");
const fuzzy = (a: string, b: string) =>
  a === b || (a.length >= 3 && b.length >= 3 && a.slice(0, 3) === b.slice(0, 3));

const words = (await transcribeWords(takePath)).map((w) => ({
  word: norm(w.text),
  start: w.start,
}));

const lineWords = script.lines.map((l) =>
  l.text
    .replace(/\[[a-z]+\]/g, "")
    .split(/\s+/)
    .map(norm)
    .filter(Boolean),
);

const anchors: number[] = [];
let t = 0;
for (let li = 0; li < script.lines.length; li++) {
  const probe = lineWords[li].slice(0, 3);
  let found = -1;
  for (let i = t; i < words.length - probe.length + 1; i++) {
    const matched = probe.map((w, k) => fuzzy(words[i + k].word, w));
    const hits = matched.filter(Boolean).length;
    const adjacent = matched.some((m, k) => m && matched[k + 1]);
    if (hits >= 2 && adjacent) {
      found = i;
      break;
    }
  }
  if (found < 0) {
    console.error(`ANCHOR NOT FOUND for ${script.lines[li].key} (probe: ${probe.join(" ")})`);
    process.exit(1);
  }
  anchors.push(found);
  t = found + 2;
}

const total = mediaDurationSec(takePath);
const LEAD = 0.12;
for (let li = 0; li < script.lines.length; li++) {
  const from = Math.max(0, words[anchors[li]].start - LEAD);
  const to = li + 1 < script.lines.length ? Math.max(from + 0.3, words[anchors[li + 1]].start - LEAD) : total;
  const file = path.join(outDir, `${script.lines[li].key}.mp3`);
  execFileSync("ffmpeg", [
    "-y",
    "-i",
    takePath,
    "-ss",
    from.toFixed(3),
    "-to",
    to.toFixed(3),
    "-c:a",
    "libmp3lame",
    "-q:a",
    "2",
    file,
  ]);
  console.log(`cut ${script.lines[li].key}  ${from.toFixed(2)}s -> ${to.toFixed(2)}s`);
}

const durations: Record<string, number> = {};
for (const l of script.lines) {
  durations[l.key] = Number(mediaDurationSec(path.join(outDir, `${l.key}.mp3`)).toFixed(2));
}
writeFileSync(
  path.join(scenarioDir, "vo-durations.json"),
  `${JSON.stringify(durations, null, 2)}\n`,
);
console.log("Durations written. Now run: bun scripts/vo-marks.ts", id, "--force");
