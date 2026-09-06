import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { cursorAt, CursorArrow, Stop } from "../core/stage";

export type CursorStop = Stop;

export const Cursor: React.FC<{ stops: CursorStop[]; appearAt?: number; scale?: number; fill?: string; stroke?: string }> = ({
  stops,
  appearAt = 0,
  scale = 1,
  fill = "#FFFFFF",
  stroke = "#141413",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { x, y } = cursorAt(stops, frame, fps);

  let dip = 1;
  for (const stop of stops) {
    if (stop.click) {
      dip *= interpolate(frame, [stop.at - 3, stop.at, stop.at + 5], [1, 0.78, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
    }
  }

  if (frame < appearAt) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        zIndex: 50,
        pointerEvents: "none",
        transform: `scale(${scale * dip})`,
        transformOrigin: "top left",
        filter: "drop-shadow(0 2px 5px rgba(0,0,0,0.28))",
      }}
    >
      <CursorArrow fill={fill} stroke={stroke} />
    </div>
  );
};
