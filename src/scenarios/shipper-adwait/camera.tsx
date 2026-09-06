import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export type CamKey = { frame: number; x?: number; y?: number; zoom?: number; blur?: number };

const track = (frame: number, keys: CamKey[], field: "x" | "y" | "zoom" | "blur", fallback: number) => {
  const pts = keys.filter((k) => k[field] !== undefined);
  if (pts.length === 0) return fallback;
  if (pts.length === 1) return pts[0][field] as number;
  return interpolate(
    frame,
    pts.map((k) => k.frame),
    pts.map((k) => k[field] as number),
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: (t) => t },
  );
};

export const Camera: React.FC<{ keys: CamKey[]; children: React.ReactNode }> = ({
  keys,
  children,
}) => {
  const frame = useCurrentFrame();
  const zoom = track(frame, keys, "zoom", 1);
  const x = track(frame, keys, "x", 0);
  const y = track(frame, keys, "y", 0);
  const blur = track(frame, keys, "blur", 0);

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
      <div
        style={{
          transform: `scale(${zoom}) translate(${x}px, ${y}px)`,
          filter: blur > 0.05 ? `blur(${blur}px)` : undefined,
          willChange: "transform",
        }}
      >
        {children}
      </div>
    </AbsoluteFill>
  );
};
