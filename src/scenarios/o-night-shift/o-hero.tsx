import React from "react";
import { EyeKey, Gaze, GlyphBall, LogoBadge } from "../../kit/glyph-ball";
import { RYZE_SUN, SUN_ASPECT } from "./theme";

export const OHero: React.FC<{
  f: number;
  size: number;
  track: readonly EyeKey[];
  gaze?: Gaze;
  blinks?: readonly number[];
  squash?: number;
  shadow?: number;
}> = ({ f, size, track, gaze, blinks, squash = 0, shadow = 0 }) => (
  <GlyphBall
    f={f}
    size={size}
    ball="o"
    track={track}
    gaze={gaze}
    blinks={blinks}
    squash={squash}
    shadow={shadow}
    badge={<LogoBadge src={RYZE_SUN} size={size * 0.3} tilt={-12} aspect={SUN_ASPECT} />}
  />
);
