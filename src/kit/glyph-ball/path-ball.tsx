import React from "react";
import { useCurrentFrame } from "remotion";
import { DirectionalBlur } from "../directional-blur";
import { BallSkin, GlyphBall } from "./ball";
import { EyeKey, Gaze } from "./eyes";
import { DotPath, nextStop, pathAt, squashAt } from "./path";

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

export const PathBall: React.FC<{
  id: string;
  skin: BallSkin;
  path: DotPath;
  track: readonly EyeKey[];
  blinks: readonly number[];
  scale?: (f: number) => number;
  look?: (f: number) => Gaze | undefined;
  squash?: (f: number) => number;
}> = ({ id, skin, path, track, blinks, scale, look, squash: extra }) => {
  const f = useCurrentFrame();
  const p = pathAt(path, f);
  if (!p) return null;
  const q = pathAt(path, f - 1) ?? p;
  const vx = p.x - q.x;
  const vy = p.y - q.y;
  const next = nextStop(path, f);
  const falling = f < path.stops[0].at;
  const gaze = look?.(f) ?? { x: next ? clamp((next.x - p.x) / 360, -1, 1) * 0.8 : 0, y: falling ? 0.7 : vy > 1 ? 0.4 : 0 };
  const squash = squashAt(path, f) - Math.min(0.24, Math.abs(vy) * 0.0045) + (extra ? extra(f) : 0);
  const size = p.size * (scale ? scale(f) : 1);
  return (
    <DirectionalBlur
      id={id}
      x={Math.min(10, Math.abs(vx) * 0.12)}
      y={Math.min(20, Math.abs(vy) * 0.1)}
      style={{ position: "absolute", left: p.x - size / 2, top: p.y + p.size / 2 - size, width: size, height: size }}
    >
      <GlyphBall f={f} size={size} src={skin.src} eyeAt={skin.eyeAt} track={track} gaze={gaze} blinks={blinks} squash={squash} tilt={clamp(vx * 0.5, -14, 14)} shadow={0} />
    </DirectionalBlur>
  );
};
