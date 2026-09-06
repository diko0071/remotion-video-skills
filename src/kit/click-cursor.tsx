import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { SPRINGS, useSpringAt } from "../core/motion";
import { CursorArrow } from "../core/stage";

const APPROACH = 12;
const HOLD = 8;
const FADE = 5;
const OFFSET_X = 86;
const OFFSET_Y = 66;

export const clickTarget = (id: string) => ({ "data-click": id });

const useTargetPoint = (id: string | undefined, active: boolean) => {
  const frame = useCurrentFrame();
  const [point, setPoint] = React.useState<{ x: number; y: number } | null>(null);
  React.useLayoutEffect(() => {
    if (!id || !active) return;
    const el = document.querySelector(`[data-click="${id}"]`);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    if (!point || Math.abs(point.x - next.x) > 0.5 || Math.abs(point.y - next.y) > 0.5) {
      setPoint(next);
    }
  }, [id, active, point, frame]);
  return point;
};

export const ClickCursor: React.FC<{
  target: string;
  at: number;
  scale?: number;
}> = ({ target, at, scale = 1 }) => {
  const frame = useCurrentFrame();
  const windowStart = at - APPROACH - 3;
  const windowEnd = at + HOLD + FADE;
  const active = frame >= windowStart && frame <= windowEnd;
  const point = useTargetPoint(target, active);
  const fly = useSpringAt(at - APPROACH, SPRINGS.smooth, APPROACH);
  const dip = interpolate(frame, [at - 3, at, at + 5], [1, 0.76, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const appear = interpolate(frame, [windowStart, at - APPROACH + 2], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const leave = interpolate(frame, [at + HOLD, windowEnd], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = Math.min(appear, leave);

  if (!active || !point || opacity <= 0.001) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: point.x + interpolate(fly, [0, 1], [OFFSET_X, 0]),
        top: point.y + interpolate(fly, [0, 1], [OFFSET_Y, 0]),
        zIndex: 50,
        opacity,
        pointerEvents: "none",
        transform: `scale(${scale * dip})`,
        transformOrigin: "top left",
        filter: "drop-shadow(0 2px 5px rgba(0,0,0,0.28))",
      }}
    >
      <CursorArrow />
    </div>
  );
};
