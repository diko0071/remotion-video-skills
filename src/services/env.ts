import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..", "..");

const ENV_FILES = [path.join(ROOT, ".env.local")];

export const projectRoot = ROOT;

export const readEnvKey = (name: string): string => {
  if (process.env[name]) return process.env[name] as string;
  for (const file of ENV_FILES) {
    if (!existsSync(file)) continue;
    const match = readFileSync(file, "utf8").match(new RegExp(`^${name}=(.+)$`, "m"));
    if (match) return match[1].trim();
  }
  throw new Error(`${name} not found (env or .env.local)`);
};
