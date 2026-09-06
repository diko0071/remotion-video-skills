import React from "react";
import { KineticBeats, type KineticBeat } from "../../kit/kinetic-beats";
import { HOOK_TOTAL } from "./timings";

const BEATS: KineticBeat[] = [
  {
    at: 0,
    size: 120,
    words: [
      { t: "Who", at: 3 },
      { t: "does", at: 11 },
      { t: "AI", at: 19 },
      { t: "recommend?", at: 29 },
    ],
  },
  {
    at: 80,
    size: 120,
    words: [
      { t: "You...", at: 83 },
      { t: "\u{1F440}", at: 100 },
      { t: "or", at: 116 },
      { t: "your", at: 131 },
      { t: "competitors?", at: 136, hl: true, sparks: true },
    ],
  },
];

export const HookScene: React.FC = () => (
  <KineticBeats beats={BEATS} total={HOOK_TOTAL} sfx={false} />
);
