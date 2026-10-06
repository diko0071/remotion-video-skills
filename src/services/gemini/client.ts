import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { readEnvKey } from "../env";
import type { GeminiGenerateResponse, GeminiImageOptions, GeminiPart } from "./types";

export const DEFAULT_GEMINI_IMAGE_MODEL = "gemini-3-pro-image-preview";
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models";

const mimeOf = (file: string): string =>
  file.endsWith(".jpg") || file.endsWith(".jpeg") ? "image/jpeg" : "image/png";

export const generateImage = async (
  prompt: string,
  opts: GeminiImageOptions = {},
): Promise<Buffer> => {
  const model = opts.model ?? DEFAULT_GEMINI_IMAGE_MODEL;
  const parts: GeminiPart[] = (opts.references ?? []).map((file) => ({
    inlineData: { mimeType: mimeOf(file), data: readFileSync(file).toString("base64") },
  }));
  parts.push({ text: prompt });
  const res = await fetch(`${API_URL}/${model}:generateContent?key=${readEnvKey("GEMINI_API_KEY")}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts }],
      generationConfig: {
        responseModalities: ["IMAGE"],
        ...(opts.aspectRatio ? { imageConfig: { aspectRatio: opts.aspectRatio } } : {}),
      },
    }),
  });
  if (!res.ok) throw new Error(`Gemini API ${res.status}: ${await res.text()}`);
  const body = (await res.json()) as GeminiGenerateResponse;
  const image = body.candidates?.[0]?.content?.parts?.find((p) => p.inlineData)?.inlineData;
  if (!image) throw new Error(`Gemini returned no image data: ${JSON.stringify(body).slice(0, 300)}`);
  return Buffer.from(image.data, "base64");
};

export const generateImageToFile = async (
  prompt: string,
  outPath: string,
  opts: GeminiImageOptions = {},
): Promise<string> => {
  const buffer = await generateImage(prompt, opts);
  mkdirSync(path.dirname(outPath), { recursive: true });
  writeFileSync(outPath, buffer);
  return outPath;
};
