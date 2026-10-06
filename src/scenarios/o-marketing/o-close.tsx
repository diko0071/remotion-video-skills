import React from "react";
import { Easing, spring, useCurrentFrame } from "remotion";
import { C } from "../../kit/launch";
import { clamp01 } from "../../core/motion";
import { GlyphBall, LogoBadge } from "../../kit/glyph-ball";
import { O_TRACK } from "./crowd";
import { PLATE, SUN, SUN_ASPECT } from "./theme";
import { FPS, SHOTS, T } from "./timings";

const SIZE = 560;
const X = 960;
const Y = 690;

export const OClose: React.FC = () => {
  const f = useCurrentFrame();
  const g = f + SHOTS.oClose.from;
  const slap = g - T.slap;
  const fly = Easing.in(Easing.cubic)(clamp01((slap + 8) / 8));
  const badgeSize = SIZE * 0.32;
  const bx = X + SIZE * 0.5 - SIZE * 0.02 - badgeSize / 2;
  const by = Y + SIZE * 0.5 - SIZE * 0.05 - badgeSize / 2;
  const fromX = 1900;
  const fromY = -200;
  const hit = slap >= 0 ? Math.exp(-slap / 5) * Math.cos(slap * 0.8) : 0;
  const ring = clamp01(slap / 14);
  const push = 1 + 0.06 * clamp01(f / SHOTS.oClose.len);
  const look = f < 16 ? Math.sin((f / 16) * Math.PI * 2) * 0.9 : 0;
  const settle = spring({ frame: slap, fps: FPS, config: { damping: 10, stiffness: 180, mass: 0.7 } });
  return (
    <div style={{ position: "absolute", inset: 0, transform: `scale(${push}) translate(${Math.sin(slap * 2.6) * 10 * Math.max(0, hit)}px, 0)`, transformOrigin: `${X}px ${Y}px` }}>
      {slap >= 0 && ring < 1 ? (
        <div
          style={{
            position: "absolute",
            left: X - SIZE * (0.5 + 0.6 * ring),
            top: Y - SIZE * (0.5 + 0.6 * ring),
            width: SIZE * (1 + 1.2 * ring),
            height: SIZE * (1 + 1.2 * ring),
            borderRadius: "50%",
            border: `${14 * (1 - ring)}px solid ${PLATE}`,
            opacity: 1 - ring,
          }}
        />
      ) : null}
      <div style={{ position: "absolute", left: X - SIZE / 2, top: Y - SIZE / 2 }}>
        <GlyphBall f={g} size={SIZE} ball="o" track={O_TRACK} gaze={{ x: look, y: 0 }} blinks={[T.gazeCut + 36]} squash={0.2 * Math.max(0, hit)} badge={slap >= 0 ? <LogoBadge src={SUN} size={badgeSize} tilt={-12} aspect={SUN_ASPECT} /> : null} />
      </div>
      {slap < 0 && slap > -9 ? (
        <div style={{ position: "absolute", left: fromX + (bx - fromX) * fly, top: fromY + (by - fromY) * fly, transform: `scale(${2.6 - 1.6 * fly}) rotate(${(1 - fly) * 90 - 12}deg)` }}>
          <LogoBadge src={SUN} size={badgeSize} tilt={0} aspect={SUN_ASPECT} />
        </div>
      ) : null}
      {slap >= 0 && slap < 12 ? (
        <div style={{ position: "absolute", left: bx - 30, top: by - 30, width: badgeSize + 60, height: badgeSize + 60, borderRadius: "50%", border: `6px solid ${C.ink}`, opacity: 0.4 * (1 - settle) }} />
      ) : null}
    </div>
  );
};
