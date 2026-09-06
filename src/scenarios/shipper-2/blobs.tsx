import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

const BLOB = (x: number, y: number, r: number, c: string, o: number): React.CSSProperties => ({
  position: "absolute",
  left: x - r,
  top: y - r,
  width: r * 2,
  height: r * 2,
  borderRadius: r,
  background: `radial-gradient(circle, ${c} 0%, rgba(255,255,255,0) 70%)`,
  opacity: o,
  filter: "blur(30px)",
});

export const Blobs: React.FC<{ from: number; dim?: number }> = ({ from, dim = 1 }) => {
  const frame = useCurrentFrame();
  const t = frame / 30;
  const o = interpolate(frame, [from, from + 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) * dim;
  return (
    <>
      <div style={BLOB(1180 + Math.sin(t * 0.9) * 60, 300 + Math.cos(t * 0.7) * 40, 420, "rgba(240,150,90,0.75)", o)} />
      <div style={BLOB(760 + Math.cos(t * 0.8) * 50, 640 + Math.sin(t * 0.6) * 40, 380, "rgba(120,235,140,0.8)", o)} />
      <div style={BLOB(1500 + Math.sin(t * 0.5) * 40, 760, 340, "rgba(120,190,255,0.7)", o * 0.8)} />
    </>
  );
};
