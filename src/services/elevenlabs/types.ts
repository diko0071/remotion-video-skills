export type MusicOptions = {
  lengthMs: number;
  forceInstrumental?: boolean;
  outputFormat?: string;
};

export type SpeechOptions = {
  voiceId: string;
  modelId?: string;
  outputFormat?: string;
  stability?: number;
  similarityBoost?: number;
};
