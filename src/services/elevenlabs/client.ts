import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { readEnvKey } from "../env";
import type { MusicOptions, SpeechOptions } from "./types";

const BASE = "https://api.elevenlabs.io/v1";

const post = async (url: string, body: unknown): Promise<Buffer> => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "xi-api-key": readEnvKey("ELEVENLABS_API_KEY"),
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`ElevenLabs API ${res.status}: ${await res.text()}`);
  return Buffer.from(await res.arrayBuffer());
};

export const generateMusic = async (prompt: string, opts: MusicOptions): Promise<Buffer> =>
  post(`${BASE}/music?output_format=${opts.outputFormat ?? "mp3_44100_128"}`, {
    prompt,
    music_length_ms: Math.max(10000, Math.min(opts.lengthMs, 300000)),
    force_instrumental: opts.forceInstrumental ?? true,
  });

export const generateMusicToFile = async (
  prompt: string,
  outPath: string,
  opts: MusicOptions,
): Promise<string> => {
  const buffer = await generateMusic(prompt, opts);
  mkdirSync(path.dirname(outPath), { recursive: true });
  writeFileSync(outPath, buffer);
  return outPath;
};

export const generateSpeech = async (text: string, opts: SpeechOptions): Promise<Buffer> =>
  post(
    `${BASE}/text-to-speech/${opts.voiceId}?output_format=${opts.outputFormat ?? "mp3_44100_128"}`,
    {
      text,
      model_id: opts.modelId ?? "eleven_multilingual_v2",
      voice_settings: {
        stability: opts.stability ?? 0.5,
        similarity_boost: opts.similarityBoost ?? 0.75,
      },
    },
  );

export const generateSpeechToFile = async (
  text: string,
  outPath: string,
  opts: SpeechOptions,
): Promise<string> => {
  const buffer = await generateSpeech(text, opts);
  mkdirSync(path.dirname(outPath), { recursive: true });
  writeFileSync(outPath, buffer);
  return outPath;
};

export type TranscriptWord = { text: string; start: number; end: number; type?: string };

export const transcribeWords = async (filePath: string): Promise<TranscriptWord[]> => {
  const form = new FormData();
  form.append("model_id", "scribe_v1");
  form.append("file", new Blob([readFileSync(filePath)]), path.basename(filePath));
  const res = await fetch(`${BASE}/speech-to-text`, {
    method: "POST",
    headers: { "xi-api-key": readEnvKey("ELEVENLABS_API_KEY") },
    body: form,
  });
  if (!res.ok) throw new Error(`ElevenLabs STT ${res.status}: ${await res.text()}`);
  const json = (await res.json()) as { words?: TranscriptWord[] };
  return (json.words ?? []).filter((w) => w.type !== "spacing");
};
