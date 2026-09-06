
export type BeatGrid = {
  bpm: number;
  fps: number;
  beat: number;
  bar: number;
  beats: (n: number) => number;
  bars: (n: number) => number;
  snapToBar: (frames: number) => number;
  snapToBeat: (frames: number) => number;
};

export const beatGrid = (bpm: number, fps: number): BeatGrid => {
  const beat = (60 / bpm) * fps;
  const bar = beat * 4;
  const snap = (frames: number, unit: number) =>
    Math.round(Math.max(1, Math.round(frames / unit)) * unit);
  return {
    bpm,
    fps,
    beat,
    bar,
    beats: (n) => Math.round(n * beat),
    bars: (n) => Math.round(n * bar),
    snapToBar: (frames) => snap(frames, bar),
    snapToBeat: (frames) => snap(frames, beat),
  };
};
