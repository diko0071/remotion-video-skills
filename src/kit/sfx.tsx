import React from "react";
import { Audio, Sequence, staticFile } from "remotion";

export type SfxName =
  | "mouse-click"
  | "whoosh"
  | "switch"
  | "whip"
  | "ding"
  | "page-turn"
  | "shutter-modern"
  | "cash"
  | "pop"
  | "sparkle"
  | "paper-flick"
  | "notify"
  | "gather";

const DEFAULT_VOLUME: Record<SfxName, number> = {
  "mouse-click": 0.6,
  whoosh: 0.35,
  switch: 0.45,
  whip: 0.4,
  ding: 0.3,
  "page-turn": 0.4,
  "shutter-modern": 0.35,
  cash: 0.45,
  pop: 0.5,
  sparkle: 0.35,
  "paper-flick": 0.5,
  notify: 0.5,
  gather: 0.55,
};

export const Sfx: React.FC<{ name: SfxName; at: number; volume?: number }> = ({
  name,
  at,
  volume,
}) => {
  const level = volume ?? DEFAULT_VOLUME[name];
  return (
    <Sequence from={at} layout="none">
      <Audio src={staticFile(`sfx/${name}.wav`)} volume={level} />
    </Sequence>
  );
};

export const SfxTrack: React.FC<{ hits: Array<{ name: SfxName; at: number; volume?: number }> }> = ({
  hits,
}) => (
  <>
    {hits.map((h, i) => (
      <Sfx key={`${h.name}-${h.at}-${i}`} name={h.name} at={h.at} volume={h.volume} />
    ))}
  </>
);
