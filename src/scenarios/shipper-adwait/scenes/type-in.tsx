import React from "react";
import { AbsoluteFill, interpolate, random, useCurrentFrame } from "remotion";
import { typing } from "../../../core/motion";
import { PALETTE } from "../timings";
import { ShipperComposer } from "../ui/composer";

const PARTICLES = new Array(120).fill(0).map((_, i) => ({
  x: random(`x${i}`) * 1920,
  y: random(`y${i}`) * 1080 - 540,
  size: 10 + random(`s${i}`) * 26,
  speed: 16 + random(`v${i}`) * 26,
  life: 5 + random(`l${i}`) * 9,
}));

export const PixelRain: React.FC<{ fadeAt: number }> = ({ fadeAt }) => {
  const frame = useCurrentFrame();
  const globalFade = interpolate(frame, [fadeAt, fadeAt + 6], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  if (globalFade <= 0) return null;

  return (
    <AbsoluteFill style={{ opacity: globalFade }}>
      {PARTICLES.map((p, i) => {
        const y = p.y + frame * p.speed;
        if (y > 1180 || frame > p.life + 14) return null;
        const fade = interpolate(frame, [p.life, p.life + 8], [1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: p.x,
              top: y,
              width: p.size,
              height: p.size,
              background: PALETTE.lime,
              opacity: fade,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

export const TypeInShot: React.FC = () => {
  const frame = useCurrentFrame();
  const text = typing(frame, "hi claude, pls make me $10k/mo,", 0, 22);

  return (
    <AbsoluteFill style={{ background: PALETTE.black }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <ShipperComposer value={text} />
      </AbsoluteFill>
      <PixelRain fadeAt={5} />
    </AbsoluteFill>
  );
};
