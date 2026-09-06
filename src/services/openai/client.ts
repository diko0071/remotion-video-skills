import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { readEnvKey } from "../env";
import type { GenerateImageOptions, OpenAiImageResponse } from "./types";

export const DEFAULT_IMAGE_MODEL = "gpt-image-2";
const API_URL = "https://api.openai.com/v1/images/generations";

export const generateImage = async (
  prompt: string,
  opts: GenerateImageOptions = {},
): Promise<Buffer> => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${readEnvKey("OPENAI_API_KEY")}`,
    },
    body: JSON.stringify({
      model: opts.model ?? DEFAULT_IMAGE_MODEL,
      prompt,
      size: opts.size ?? "1024x1024",
      quality: opts.quality ?? "high",
      n: opts.n ?? 1,
    }),
  });
  if (!res.ok) throw new Error(`OpenAI API ${res.status}: ${await res.text()}`);
  const body = (await res.json()) as OpenAiImageResponse;
  const b64 = body.data?.[0]?.b64_json;
  if (!b64) throw new Error("OpenAI returned no image data");
  return Buffer.from(b64, "base64");
};

export const generateImageToFile = async (
  prompt: string,
  outPath: string,
  opts: GenerateImageOptions = {},
): Promise<string> => {
  const buffer = await generateImage(prompt, opts);
  mkdirSync(path.dirname(outPath), { recursive: true });
  writeFileSync(outPath, buffer);
  return outPath;
};
