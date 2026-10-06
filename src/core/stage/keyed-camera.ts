import { Easing, interpolate } from "remotion";

export type CamKey = { at: number; zoom: number; x: number; y: number; cut?: boolean; ease?: (t: number) => number };

const ease = Easing.out(Easing.cubic);

const poseAt = (keys: readonly CamKey[], frame: number) => {
  let a = keys[0];
  let b = keys[0];
  for (const k of keys) {
    if (k.at <= frame) a = k;
    if (k.at > frame) {
      b = k;
      break;
    }
    b = k;
  }
  if (a === b || b.at === a.at || b.cut) return { zoom: a.zoom, x: a.x, y: a.y };
  const p = interpolate(frame, [a.at, b.at], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: b.ease ?? ease });
  return { zoom: a.zoom + (b.zoom - a.zoom) * p, x: a.x + (b.x - a.x) * p, y: a.y + (b.y - a.y) * p };
};

export const keyedCamera = (keys: readonly CamKey[], frame: number) => {
  const now = poseAt(keys, frame);
  const prev = poseAt(keys, frame - 1);
  const dz = Math.abs(now.zoom - prev.zoom);
  const dx = Math.abs(now.x - prev.x) * now.zoom;
  const dy = Math.abs(now.y - prev.y) * now.zoom;
  return { ...now, blurX: Math.min(24, dz * 150 + dx * 0.08), blurY: Math.min(24, dz * 150 + dy * 0.08) };
};
