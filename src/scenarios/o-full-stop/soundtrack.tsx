import React from "react";
import { Audio, Sequence } from "remotion";
import { clamp01 } from "../../core/motion";
import { GROOVE_MUSIC, STORM_MUSIC, THUNK } from "./theme";
import { FS_TOTAL, GROOVE, STORM, STORM_TRIM, THUNKS } from "./timings";

export const Soundtrack: React.FC = () => (
  <>
    <Sequence durationInFrames={STORM.freeze} layout="none">
      <Audio src={STORM_MUSIC} trimBefore={STORM_TRIM} volume={1} />
    </Sequence>
    <Sequence from={GROOVE} layout="none">
      <Audio src={GROOVE_MUSIC} volume={(f) => 0.82 * clamp01((FS_TOTAL - GROOVE - f) / 40)} />
    </Sequence>
    {THUNKS.map((at, i) => (
      <Sequence key={at} from={at} layout="none">
        <Audio src={THUNK} volume={() => (i === 0 ? 1 : 0.8)} />
      </Sequence>
    ))}
  </>
);
