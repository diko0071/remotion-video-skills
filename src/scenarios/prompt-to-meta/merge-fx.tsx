import React from "react";
import { AbsoluteFill, Easing, random, useCurrentFrame } from "remotion";
import { C } from "./theme";
import { clamp01, ramp, T } from "./timeline";
import { MERGE_AT } from "./winners";

const COLORS = [C.brandLight, C.paper, "#ffd166", C.cream, C.brand, "#f2a93b"];
const PARTICLES = Array.from({ length: 44 }, (_, i) => ({
  angle: random(`p-a-${i}`) * Math.PI * 2,
  speed: 340 + random(`p-s-${i}`) * 820,
  size: 10 + Math.round(random(`p-z-${i}`) * 4) * 6,
  color: COLORS[i % COLORS.length],
  spin: (random(`p-r-${i}`) - 0.5) * 240,
  delay: random(`p-d-${i}`) * 4,
}));

export const MergeFx: React.FC = () => {
  const f = useCurrentFrame();
  if (f < T.flash - 2 || f > T.flash + 40) return null;
  const ring = ramp(f, T.flash, 18, Easing.out(Easing.cubic));
  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: MERGE_AT.x - 60,
          top: MERGE_AT.y - 60,
          width: 120,
          height: 120,
          borderRadius: 120,
          border: `6px solid ${C.brandLight}`,
          transform: `scale(${1 + ring * 9})`,
          opacity: (1 - ring) * 0.9,
        }}
      />
      {PARTICLES.map((p, i) => {
        const t = ramp(f, T.flash + p.delay, 30, Easing.out(Easing.quad));
        const d = p.speed * t;
        if (f < T.flash + p.delay) return null;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: MERGE_AT.x + Math.cos(p.angle) * d - p.size / 2,
              top: MERGE_AT.y + Math.sin(p.angle) * d - p.size / 2,
              width: p.size,
              height: p.size,
              background: p.color,
              opacity: clamp01(1.2 - t * 1.2),
              transform: `rotate(${p.spin * t}deg)`,
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

export const Flash: React.FC = () => {
  const f = useCurrentFrame();
  const up = ramp(f, T.flash - 3, 3);
  const down = ramp(f, T.flash, 12);
  const o = Math.min(up, 1 - down) * 0.6;
  if (o <= 0) return null;
  return <AbsoluteFill style={{ background: C.paper, opacity: o }} />;
};
