import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { ramp } from "../../core/motion";
import { cursorAt, Stop } from "../../core/stage";
import { Cursor } from "../cursor";

export const CarriedObject: React.FC<{
  stops: readonly Stop[];
  from: number;
  until: number;
  size: [number, number];
  grow: [number, number];
  aspect?: number;
  anchor?: { x: number; y: number };
  cursorScale?: number;
  render: (w: number, h: number, lift: number) => React.ReactNode;
}> = ({ stops, from, until, size, grow, aspect = 1, anchor = { x: 0.62, y: 0.62 }, cursorScale = 2.2, render }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cur = cursorAt(stops, frame, fps);
  const g = ramp(frame, grow[0], grow[1]);
  const w = size[0] + (size[1] - size[0]) * g;
  const h = w * aspect;
  const lift = ramp(frame, from, from + 6);
  if (frame < from || frame >= until) return null;
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div style={{ position: "absolute", left: cur.x - w * anchor.x, top: cur.y - h * anchor.y, width: w, height: h, transform: `scale(${1 + 0.1 * lift}) rotate(${-4 * lift}deg)`, filter: `drop-shadow(0 ${8 + 10 * lift}px ${12 + 12 * lift}px rgba(20,30,60,${0.2 + 0.12 * lift}))` }}>
        {render(w, h, lift)}
      </div>
      <Cursor scale={cursorScale} appearAt={from} stops={[...stops]} />
    </AbsoluteFill>
  );
};
