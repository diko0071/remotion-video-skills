import React from "react";
import { useCurrentFrame } from "remotion";
import { clamp01 } from "../../core/motion";
import { PathBall } from "../../kit/glyph-ball";
import { CREW_BLINKS, CREW_EYES, CREW_ORDER, crewPaths, mainPath } from "./crew";
import { SKINS } from "./theme";
import { GROOVE, SPLIT, STORE, STORM } from "./timings";

const MAIN_EYES = [
  { at: -99, eyes: "o" as const },
  { at: STORM.land, eyes: "dot" as const },
  { at: SPLIT.swell, eyes: "happy" as const },
];

const SKIN_OF = { b: SKINS.boxer, p: SKINS.builder, s: SKINS.skater, t1: SKINS.hero, t2: SKINS.star } as const;

const swell = (f: number) => {
  const t = clamp01((f - SPLIT.swell) / (SPLIT.pop - SPLIT.swell));
  return 1 + 0.55 * t * t + 0.06 * t * Math.sin(f * 2.4);
};

export const Crew: React.FC = () => {
  const f = useCurrentFrame();
  const crew = crewPaths();
  return (
    <>
      {f < SPLIT.pop ? (
        <PathBall id="fs-main" skin={SKINS.hero} path={mainPath()} track={MAIN_EYES} blinks={[GROOVE - 14]} scale={swell} />
      ) : null}
      {CREW_ORDER.map((name) => (
        <div key={name} style={{ opacity: name === "t1" ? 1 : 1 - clamp01((f - STORE.merge + 3) / 3) }}>
          <PathBall id={`fs-crew-${name}`} skin={SKIN_OF[name]} path={crew[name]} track={CREW_EYES[name]} blinks={CREW_BLINKS[name]} />
        </div>
      ))}
    </>
  );
};
