import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { transcribeWords } from "../src/services/elevenlabs/client";

const id = process.argv[2];
if (!id) {
  console.error("Usage: bun scripts/vo-marks.ts <composition-id>");
  process.exit(1);
}

const root = process.cwd();
const scenarioDir = id.startsWith("guide-")
  ? path.join(root, "src", "guide", "scenarios", id.slice("guide-".length))
  : path.join(root, "src", "scenarios", id);
const voDir = path.join(root, "public", "vo", id);
const outPath = path.join(scenarioDir, "vo-marks.json");

const marks: Record<string, { text: string; words: { word: string; start: number }[] }> = existsSync(
  outPath,
)
  ? JSON.parse(readFileSync(outPath, "utf8"))
  : {};

for (const file of readdirSync(voDir).filter((f) => f.endsWith(".mp3")).sort()) {
  const key = file.replace(/\.mp3$/, "");
  if (marks[key] && !process.argv.includes("--force")) continue;
  const words = await transcribeWords(path.join(voDir, file));
  marks[key] = {
    text: words.map((w) => w.text).join(" "),
    words: words.map((w) => ({ word: w.text.toLowerCase().replace(/[^a-z0-9']/g, ""), start: w.start })),
  };
  console.log(`marked ${key} (${words.length} words)`);
}

writeFileSync(outPath, `${JSON.stringify(marks, null, 2)}\n`);
console.log(`Word marks written: ${path.relative(root, outPath)}`);
