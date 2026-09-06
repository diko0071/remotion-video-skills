export const refFrame = (frameRef: number, refFps: number, fps = 30) => Math.round((frameRef * fps) / refFps);

export const sampleRef = (values: readonly number[], frame: number, start: number, refFps: number, fps = 30) => {
  const t = ((frame - start) * refFps) / fps;
  const i = Math.floor(t);
  if (t <= 0) return values[0];
  if (i >= values.length - 1) return values[values.length - 1];
  return values[i] + (values[i + 1] - values[i]) * (t - i);
};
