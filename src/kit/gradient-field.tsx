import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";

export type GradientBlob = { color: string; x: number; y: number; r: number; dx?: number; dy?: number; speed?: number };

export const GEMINI_FIELD: GradientBlob[] = [
  { color: "#2F6BFF", x: 0.15, y: 0.25, r: 0.9, dx: 0.05, dy: 0.04, speed: 0.6 },
  { color: "#2FD06A", x: 0.85, y: 0.15, r: 0.55, dx: 0.06, dy: 0.05, speed: 0.8 },
  { color: "#F7D21E", x: 0.55, y: 0.95, r: 0.5, dx: 0.07, dy: 0.04, speed: 0.7 },
  { color: "#F0402E", x: 0.05, y: 1.0, r: 0.5, dx: 0.05, dy: 0.06, speed: 0.9 },
];

export const RYZE_FIELD: GradientBlob[] = [
  { color: "#C19767", x: 0.2, y: 0.3, r: 0.8, dx: 0.05, dy: 0.04, speed: 0.6 },
  { color: "#F2E6CF", x: 0.8, y: 0.2, r: 0.6, dx: 0.06, dy: 0.05, speed: 0.8 },
  { color: "#8A5A2B", x: 0.6, y: 0.95, r: 0.5, dx: 0.07, dy: 0.04, speed: 0.7 },
];

export const GradientField: React.FC<{
  blobs?: GradientBlob[];
  base?: string;
  blur?: number;
  opacity?: number;
  style?: React.CSSProperties;
}> = ({ blobs = GEMINI_FIELD, base = "#2F6BFF", blur = 90, opacity = 1, style }) => {
  const frame = useCurrentFrame();
  const t = frame / 30;
  return (
    <AbsoluteFill style={{ background: base, overflow: "hidden", opacity, ...style }}>
      <AbsoluteFill style={{ filter: `blur(${blur}px)`, transform: "scale(1.15)" }}>
        {blobs.map((b, i) => {
          const x = (b.x + (b.dx ?? 0.05) * Math.sin(t * (b.speed ?? 0.7) + i)) * 1920;
          const y = (b.y + (b.dy ?? 0.04) * Math.cos(t * (b.speed ?? 0.7) * 0.8 + i * 1.7)) * 1080;
          const r = b.r * 1080;
          return (
            <div
              key={i}
              style={{ position: "absolute", left: x - r, top: y - r, width: r * 2, height: r * 2, borderRadius: r, background: `radial-gradient(circle, ${b.color} 0%, ${b.color} 35%, rgba(0,0,0,0) 70%)` }}
            />
          );
        })}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
