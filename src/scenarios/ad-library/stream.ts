import { T } from "./timeline";

export const STREAM = { count: 34, flight: 30, card: { w: 190, h: 238 } } as const;

const LAST_SPAWN = T.morph - STREAM.flight + 4;

export const SPAWNS = Array.from({ length: STREAM.count }, (_, k) =>
  Math.round(T.streamStart + (k * (LAST_SPAWN - T.streamStart)) / (STREAM.count - 1)),
);

export const arrivals = (f: number) =>
  SPAWNS.reduce((acc, s) => {
    const since = f - (s + STREAM.flight);
    return since >= 0 && since < 8 ? acc + (1 - since / 8) : acc;
  }, 0);
