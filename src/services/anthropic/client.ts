import { execSync } from "node:child_process";
import { readFileSync, statSync } from "node:fs";
import { readEnvKey } from "../env";
import type { AnthropicMessage, AnthropicResponse, MessageOptions } from "./types";

export const DEFAULT_MODEL = "claude-fable-5";
const API_URL = "https://api.anthropic.com/v1/messages";

export const createMessage = async (
  messages: AnthropicMessage[],
  opts: MessageOptions = {},
): Promise<string> => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": readEnvKey("ANTHROPIC_API_KEY"),
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: opts.model ?? DEFAULT_MODEL,
      max_tokens: opts.maxTokens ?? 2000,
      ...(opts.system ? { system: opts.system } : {}),
      messages,
    }),
  });
  if (!res.ok) throw new Error(`Anthropic API ${res.status}: ${await res.text()}`);
  const body = (await res.json()) as AnthropicResponse;
  return body.content?.map((c) => c.text ?? "").join("") ?? "";
};

const fitImageForApi = (imagePath: string): string => {
  if (statSync(imagePath).size <= 4_500_000) return imagePath;
  const jpg = imagePath.replace(/\.\w+$/, "-fit.jpg");
  execSync(`ffmpeg -y -v error -i "${imagePath}" -q:v 4 "${jpg}"`);
  return jpg;
};

export const reviewImage = async (
  imagePath: string,
  prompt: string,
  opts: MessageOptions = {},
): Promise<string> => {
  const fitted = fitImageForApi(imagePath);
  const mediaType = fitted.endsWith(".jpg") ? "image/jpeg" : "image/png";
  const data = readFileSync(fitted).toString("base64");
  return createMessage(
    [
      {
        role: "user",
        content: [
          { type: "image", source: { type: "base64", media_type: mediaType, data } },
          { type: "text", text: prompt },
        ],
      },
    ],
    opts,
  );
};

export const extractJson = <T>(text: string): T | null => {
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) return null;
  try {
    return JSON.parse(match[0]) as T;
  } catch {
    return null;
  }
};
