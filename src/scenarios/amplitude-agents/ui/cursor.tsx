import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { SPRINGS, useSpringAt } from "../../../core/motion";

export type Stop = { x: number; y: number; at: number; click?: boolean };

export const STOP_SLOTS = 16;
const NEVER = Number.MAX_SAFE_INTEGER;

const legAt = (stops: { at: number }[], i: number): number =>
  i + 1 < stops.length ? stops[i].at : NEVER;

const legLen = (stops: { at: number }[], i: number): number =>
  i + 1 < stops.length ? Math.max(8, stops[i + 1].at - stops[i].at) : 8;

export const useLegSprings = (stops: { at: number }[]): number[] => {
  const p0 = useSpringAt(legAt(stops, 0), SPRINGS.drift, legLen(stops, 0));
  const p1 = useSpringAt(legAt(stops, 1), SPRINGS.drift, legLen(stops, 1));
  const p2 = useSpringAt(legAt(stops, 2), SPRINGS.drift, legLen(stops, 2));
  const p3 = useSpringAt(legAt(stops, 3), SPRINGS.drift, legLen(stops, 3));
  const p4 = useSpringAt(legAt(stops, 4), SPRINGS.drift, legLen(stops, 4));
  const p5 = useSpringAt(legAt(stops, 5), SPRINGS.drift, legLen(stops, 5));
  const p6 = useSpringAt(legAt(stops, 6), SPRINGS.drift, legLen(stops, 6));
  const p7 = useSpringAt(legAt(stops, 7), SPRINGS.drift, legLen(stops, 7));
  const p8 = useSpringAt(legAt(stops, 8), SPRINGS.drift, legLen(stops, 8));
  const p9 = useSpringAt(legAt(stops, 9), SPRINGS.drift, legLen(stops, 9));
  const p10 = useSpringAt(legAt(stops, 10), SPRINGS.drift, legLen(stops, 10));
  const p11 = useSpringAt(legAt(stops, 11), SPRINGS.drift, legLen(stops, 11));
  const p12 = useSpringAt(legAt(stops, 12), SPRINGS.drift, legLen(stops, 12));
  const p13 = useSpringAt(legAt(stops, 13), SPRINGS.drift, legLen(stops, 13));
  const p14 = useSpringAt(legAt(stops, 14), SPRINGS.drift, legLen(stops, 14));
  const p15 = useSpringAt(legAt(stops, 15), SPRINGS.drift, legLen(stops, 15));

  if (stops.length > STOP_SLOTS) {
    throw new Error(`cursor: ${stops.length} stops — max ${STOP_SLOTS}`);
  }

  return [p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15];
};

export const MacCursor: React.FC<{ stops: Stop[]; appearAt?: number; size?: number }> = ({
  stops,
  appearAt = 0,
  size = 44,
}) => {
  const frame = useCurrentFrame();
  const legs = useLegSprings(stops);

  let x = stops[0]?.x ?? 0;
  let y = stops[0]?.y ?? 0;
  for (let i = 1; i < stops.length; i++) {
    const prev = stops[i - 1];
    const next = stops[i];
    const p = legs[i - 1];
    x += (next.x - prev.x) * p;
    y += (next.y - prev.y) * p;
  }

  let dip = 1;
  for (const stop of stops) {
    if (stop.click) {
      dip *= interpolate(frame, [stop.at - 2, stop.at, stop.at + 4], [1, 0.86, 1], {
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
        zIndex: 80,
        transform: `scale(${dip})`,
        transformOrigin: "top left",
        filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
      }}
    >
      <svg width={size} height={size * 1.45} viewBox="0 0 20 29" fill="none">
        <path
          d="M1.5 1.5 L1.5 22.5 L6.6 17.9 L9.9 26.2 L13.3 24.8 L10 16.7 L17.3 16.2 Z"
          fill="#000000"
          stroke="#FFFFFF"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
