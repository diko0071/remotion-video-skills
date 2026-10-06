import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { Block, Tooltip } from "./block";
import { Door, DoorShards } from "./door";
import { Cloud, Dust, Tufts } from "./fx";
import { HoopInside, HoopRing } from "./hoop";
import { Metrics } from "./metrics";
import { BLOCK, DOOR, LEVEL_END, STAMP, TUFT_GAP } from "./level";
import { Stamp, StampShards } from "./stamp";
import { PALETTE } from "./theme";
import { DOOR_T, RISE, SMASH, STAMP_T } from "./timings";

const CLEAR = [
  [DOOR.x - DOOR.w / 2, DOOR.x + DOOR.w / 2],
  [BLOCK.x - BLOCK.w / 2, BLOCK.x + BLOCK.w / 2],
  [STAMP.x - STAMP.w / 2, STAMP.x + STAMP.w / 2],
] as const;

const CLOUDS = [
  { x: 420, y: 150, s: 0.9 },
  { x: 1700, y: 90, s: 0.75 },
  { x: 2700, y: 170, s: 1 },
  { x: 3550, y: 110, s: 0.8 },
  { x: 4500, y: 60, s: 0.95 },
  { x: 5300, y: 150, s: 0.8 },
  { x: 760, y: -260, s: 1.1 },
  { x: 1720, y: -420, s: 0.85 },
  { x: 480, y: -760, s: 1 },
  { x: 1980, y: -980, s: 1.15 },
  { x: 260, y: -1330, s: 0.8 },
  { x: 1500, y: -1420, s: 0.9 },
] as const;

export const WorldBack: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <>
      {CLOUDS.map((c, i) => (
        <Cloud key={i} x={c.x} y={c.y} s={c.s} />
      ))}
      <Tufts from={-700} to={LEVEL_END} gap={TUFT_GAP} color={PALETTE.tuft.color} clear={CLEAR} />
      <Door f={f} />
      <Block f={f} />
      <HoopInside f={f} fps={fps} />
      <Dust f={f} at={DOOR_T.drop} x={DOOR.x} spread={140} />
      <Dust f={f} at={STAMP_T.hit} x={STAMP.x} spread={300} />
      <Dust f={f} at={RISE.land} x={4170} spread={240} />
      <Dust f={f} at={SMASH.stamp + 6} x={STAMP.x} spread={280} />
      <Tooltip f={f} fps={fps} />
      <Metrics f={f} fps={fps} />
    </>
  );
};

export const WorldFront: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <>
      <HoopRing f={f} />
      <Stamp f={f} />
      <DoorShards f={f} />
      <StampShards f={f} />
    </>
  );
};
