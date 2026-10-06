import { clamp01 } from "../../core/motion";
import { Eyes } from "./glyph";

export type EyeKey = { at: number; eyes: Eyes };
export type Gaze = { x: number; y: number };

export const eyesState = (track: readonly EyeKey[], f: number) => {
  let i = 0;
  for (let k = 0; k < track.length; k++) if (track[k].at <= f) i = k;
  const cur = track[i];
  const prev = i > 0 ? track[i - 1] : null;
  return { cur: cur.eyes, prev: prev ? prev.eyes : null, p: prev ? clamp01((f - cur.at) / 5) : 1 };
};

export const blinkAmount = (blinks: readonly number[], f: number) => {
  let b = 0;
  for (const t of blinks) {
    const d = f - t;
    if (d >= 0 && d <= 6) b = Math.max(b, Math.sin((Math.PI * d) / 6));
  }
  return b;
};
