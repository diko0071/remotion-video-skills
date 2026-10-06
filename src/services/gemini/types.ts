export type GeminiImageOptions = {
  model?: string;
  references?: string[];
  aspectRatio?: "1:1" | "9:16" | "16:9" | "3:4" | "4:3";
};

export type GeminiPart = { text?: string; inlineData?: { mimeType: string; data: string } };

export type GeminiGenerateResponse = {
  candidates?: Array<{ content?: { parts?: GeminiPart[] } }>;
  error?: { message?: string };
};
