import React from "react";
import { Audio, Sequence } from "remotion";
import { clamp01 } from "../../core/motion";
import { HIT_MUSIC, RISE_MUSIC, RUN_MUSIC, SNEAK_MUSIC } from "./theme";
import { DROP, FAILS, FALL, LO_TOTAL, RISE, STAMP_T } from "./timings";

const DIP = 10;
const TAIL = 3;
const SNEAK_LEN = STAMP_T.slam + TAIL;
const HIT_LEN = 60;

const sneakVolume = (f: number) => {
  const dip = FAILS.some((t) => f >= t && f < t + DIP) ? 0.08 : 1;
  return 0.9 * dip * clamp01((SNEAK_LEN - f) / TAIL);
};

const runVolume = (f: number) => {
  const at = f + DROP;
  return at >= FALL.from + 2 && at < FALL.land ? 0.35 : 1;
};

export const Soundtrack: React.FC = () => (
  <>
    <Sequence durationInFrames={SNEAK_LEN} layout="none">
      <Audio src={SNEAK_MUSIC} trimBefore={2} volume={sneakVolume} />
    </Sequence>
    <Sequence from={RISE.from} durationInFrames={DROP - RISE.from + 2} layout="none">
      <Audio src={RISE_MUSIC} volume={0.85} />
    </Sequence>
    <Sequence from={DROP} durationInFrames={HIT_LEN} layout="none">
      <Audio src={HIT_MUSIC} volume={0.9} />
    </Sequence>
    <Sequence from={DROP} durationInFrames={LO_TOTAL - DROP} layout="none">
      <Audio src={RUN_MUSIC} volume={runVolume} />
    </Sequence>
    <Sequence from={FALL.land} durationInFrames={HIT_LEN} layout="none">
      <Audio src={HIT_MUSIC} volume={1} />
    </Sequence>
  </>
);
