import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { SPRINGS, springAt } from "../../../core/motion";
import { CursorArrow } from "../../../core/stage";

export type Stop = { x: number; y: number; at: number; click?: boolean };

export const HandCursor: React.FC<{
  stops: Stop[];
  scale?: number;
  appearAt?: number;
  hand?: boolean;
}> = ({ stops, scale = 1, appearAt = 0, hand = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  let x = stops[0]?.x ?? 0;
  let y = stops[0]?.y ?? 0;
  for (let i = 1; i < stops.length; i++) {
    const prev = stops[i - 1];
    const next = stops[i];
    const p = springAt(frame, fps, prev.at, SPRINGS.drift, Math.max(12, next.at - prev.at));
    x += (next.x - prev.x) * p;
    y += (next.y - prev.y) * p;
  }

  let dip = 1;
  for (const stop of stops) {
    if (stop.click) {
      dip *= interpolate(frame, [stop.at - 3, stop.at, stop.at + 6], [1, 0.84, 1], {
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
        zIndex: 60,
        transform: `scale(${scale * dip})`,
        transformOrigin: "top left",
        filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.35))",
      }}
    >
      {hand ? (
        <svg width="26" height="32" viewBox="0 0 26 32" fill="none">
          <path
            d="M9 15V5.4a2.2 2.2 0 0 1 4.4 0V13m0 0V3.2a2.2 2.2 0 0 1 4.4 0V14m0-1.6a2.2 2.2 0 0 1 4.4 0v3.1c0 6.9-3 12.3-8.6 12.3-4.6 0-7-2.4-8.6-6.3l-2-4.9a2.1 2.1 0 0 1 3.5-2.2L9 17.6"
            fill="#FFFFFF"
            stroke="#111111"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <CursorArrow width={21} height={29} stroke="#111111" />
      )}
    </div>
  );
};
