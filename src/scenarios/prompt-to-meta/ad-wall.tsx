import React from "react";
import { AbsoluteFill, Img, random, useCurrentFrame } from "remotion";
import { WALL } from "./story";
import { asset, C, R, SHADOW } from "./theme";
import { clamp01, lerp, pop, ramp, T, toScreen } from "./timeline";
import { burstDelay, localToWorld, PICK_SCALE, tileLocal, WALL_TILES, wallRotation, WallTile } from "./wall-layout";

const SWEEP_FROM = -200;
const SWEEP_TO = 2100;
const SWEEP_LEN = 36;
const TILE_RADIUS = 5;

const sweepCross = (screenX: number) => T.scan + ((screenX - SWEEP_FROM) / (SWEEP_TO - SWEEP_FROM)) * SWEEP_LEN;

export const DaysChip: React.FC<{ days: number; p: number; size?: number }> = ({ days, p, size = 15 }) => (
  <div
    style={{
      position: "absolute",
      right: 9,
      top: 9,
      display: "flex",
      alignItems: "center",
      gap: size * 0.45,
      padding: `${size * 0.32}px ${size * 0.62}px`,
      borderRadius: R.md,
      border: `1px solid ${C.border}`,
      background: "rgba(255,255,255,0.95)",
      boxShadow: SHADOW.chip,
      color: C.ink,
      fontWeight: 700,
      fontSize: size,
      lineHeight: 1.2,
      letterSpacing: "-0.01em",
      opacity: clamp01(p * 1.6),
      transform: `scale(${lerp(0.6, 1, p)})`,
      transformOrigin: "100% 0",
      whiteSpace: "nowrap",
    }}
  >
    <span style={{ width: size * 0.5, height: size * 0.5, borderRadius: size, background: C.emerald }} />
    {days} days
  </div>
);

const Tile: React.FC<{ tile: WallTile; f: number }> = ({ tile, f }) => {
  const delay = burstDelay(tile);
  const start = T.burst + delay;
  const pb = pop(f, start, 14, 150);
  const l = tileLocal(tile.c, tile.r, f);
  const spread = lerp(0.16, 1, pb);
  const jitter = (random(`wall-jitter-${tile.i}`) - 0.5) * 30 * (1 - pb);
  const isWinner = tile.winner >= 0;
  const ring = isWinner ? pop(f, T.pick + 4 + tile.winner * 3, 11, 200) : 0;
  const scale = lerp(0.45, 1, pb) * (1 + (PICK_SCALE - 1) * ring);
  const world = localToWorld(l.x * spread, l.y * spread, f);
  const cross = sweepCross(toScreen(f, world.x, world.y).x);
  const badge = pop(f, cross, 12, 210);
  const gone = isWinner && f >= T.fly + tile.winner * 2;
  if (f < start || gone) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: l.x * spread - WALL.w / 2,
        top: l.y * spread - WALL.h / 2,
        width: WALL.w,
        height: WALL.h,
        borderRadius: TILE_RADIUS,
        overflow: "hidden",
        border: `1.5px solid ${ring > 0.02 ? C.brandLight : "rgba(255,255,255,0.85)"}`,
        opacity: clamp01((f - start) / 4),
        transform: `rotate(${jitter}deg) scale(${scale})`,
        boxShadow: isWinner
          ? `0 0 0 ${3 * ring}px ${C.brandLight}, 0 0 ${46 * ring}px rgba(214,165,108,${0.7 * ring}), 0 18px 40px rgba(0,0,0,0.35)`
          : "0 10px 26px rgba(10,40,90,0.26)",
        zIndex: isWinner ? 2 : 0,
        background: C.paper,
      }}
    >
      <Img src={asset(tile.src)} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
      {f >= cross ? <DaysChip days={tile.days} p={badge} size={ring > 0.05 ? 17 : 15} /> : null}
    </div>
  );
};

export const AdWall: React.FC = () => {
  const f = useCurrentFrame();
  if (f < T.burst - 1 || f > T.fly + 40) return null;
  const dim = ramp(f, T.pick, 14);
  const fade = ramp(f, T.fly + 4, 26);
  const rot = wallRotation(f);
  const regular = WALL_TILES.filter((t) => t.winner < 0);
  const winners = WALL_TILES.filter((t) => t.winner >= 0);
  return (
    <AbsoluteFill style={{ opacity: 1 - fade }}>
      <div
        style={{
          position: "absolute",
          left: WALL.cx,
          top: WALL.cy,
          transform: `rotate(${rot}deg) scale(${1 + 0.05 * fade})`,
        }}
      >
        {regular.map((tile) => (
          <Tile key={tile.i} tile={tile} f={f} />
        ))}
        <div
          style={{
            position: "absolute",
            left: -1800,
            top: -1400,
            width: 3600,
            height: 2800,
            background: `rgba(6,12,24,${0.62 * dim})`,
          }}
        />
        {winners.map((tile) => (
          <Tile key={tile.i} tile={tile} f={f} />
        ))}
      </div>
    </AbsoluteFill>
  );
};

export const ScanBeam: React.FC = () => {
  const f = useCurrentFrame();
  const t = ramp(f, T.scan, SWEEP_LEN, (x) => x);
  if (f < T.scan || f > T.scan + SWEEP_LEN) return null;
  const x = lerp(SWEEP_FROM, SWEEP_TO, t);
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          left: x - 110,
          top: 0,
          width: 110,
          height: 1080,
          background: "linear-gradient(90deg, rgba(214,165,108,0) 0%, rgba(214,165,108,0.32) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: x - 2,
          top: 0,
          width: 4,
          height: 1080,
          background: C.brandLight,
          boxShadow: "0 0 26px 7px rgba(214,165,108,0.8)",
        }}
      />
    </AbsoluteFill>
  );
};
