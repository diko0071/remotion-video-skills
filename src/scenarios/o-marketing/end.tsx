import React from "react";
import { spring, useCurrentFrame } from "remotion";
import { EyeKey, GlyphBall, LogoBadge } from "../../kit/glyph-ball";
import { CAST } from "./cast";
import { logo, SUN, SUN_ASPECT } from "./theme";
import { FPS, SHOTS } from "./timings";

const SIZE = 132;
const GAP = 178;
const Y = 900;
const ROW = [CAST[0], CAST[1], CAST[2], null, CAST[3], CAST[4], CAST[5]];

export const EndRow: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + SHOTS.end.from;
  return (
    <>
      {ROW.map((t, i) => {
        const pop = spring({ frame: f + 8 - i * 1.5, fps: FPS, config: { damping: 11, stiffness: 170, mass: 0.7 } });
        const bob = -Math.abs(Math.sin(f / 7 + i * 0.7)) * 18;
        const x = 960 + (i - 3) * GAP;
        const track: readonly EyeKey[] = t
          ? [{ at: -99, eyes: "happy" }]
          : [
              { at: -99, eyes: "happy" },
              { at: 620, eyes: "wink" },
              { at: 638, eyes: "happy" },
            ];
        return (
          <div key={i} style={{ position: "absolute", left: x - SIZE / 2, top: Y - SIZE / 2 + bob, transform: `scale(${Math.max(0, pop)})`, transformOrigin: "50% 100%" }}>
            <GlyphBall
              f={g}
              size={SIZE}
              ball={t ? t.ball : "o"}
              track={track}
              eyeColor={t?.eyeColor}
              gaze={{ x: (3 - i) * 0.2, y: -0.3 }}
              badge={t ? <LogoBadge src={logo(t.k)} size={SIZE * 0.34} /> : <LogoBadge src={SUN} size={SIZE * 0.34} tilt={-12} aspect={SUN_ASPECT} />}
            />
          </div>
        );
      })}
    </>
  );
};
