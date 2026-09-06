export type ImageSize = "1024x1024" | "1536x1024" | "1024x1536" | "auto";

export type GenerateImageOptions = {
  model?: string;
  size?: ImageSize;
  quality?: "low" | "medium" | "high";
  n?: number;
};

export type OpenAiImageResponse = {
  data?: Array<{ b64_json?: string; url?: string }>;
};
