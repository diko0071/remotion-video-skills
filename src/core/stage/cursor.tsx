import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { noise2D } from "@remotion/noise";
import { CHASE, chase } from "./chase";
import { CursorArrow } from "./cursor-arrow";
import { rectCenter, useObjectRects } from "./objects";

export type CursorMove = {
  target: string;
  at: number;
  nudge?: { x?: number; y?: number };
  press?: boolean;
  travel?: number;
};

const TRAVEL = 26;
const WANDER_PX = 3.5;
const WANDER_SPEED = 0.012;

export const SceneCursor: React.FC<{
  from: { x: number; y: number };
  moves: CursorMove[];
  appearAt?: number;
  scale?: number;
  liveMeasure?: boolean;
  wander?: number;
}> = ({ from, moves, appearAt = 0, scale = 1.5, liveMeasure = false, wander = WANDER_PX }) => {
  const frame = useCurrentFrame();
  const ids = React.useMemo(() => moves.map((m) => m.target), [moves]);
  const rects = useObjectRects(ids, liveMeasure);

  const points = moves.map((move) => {
    const rect = rects[move.target];
    if (!rect) {
      if (frame >= move.at - (move.travel ?? TRAVEL)) {
        console.warn(`SceneCursor: object "${move.target}" not mounted at frame ${frame}`);
      }
      return from;
    }
    const center = rectCenter(rect);
    return { x: center.x + (move.nudge?.x ?? 0), y: center.y + (move.nudge?.y ?? 0) };
  });

  const HOLD = 5;
  const targetAt = (k: number) => {
    let point = from;
    for (let i = 0; i < moves.length; i += 1) {
      const depart = moves[i].at - (moves[i].travel ?? TRAVEL);
      const start = i === 0 ? depart : Math.max(depart, moves[i - 1].at + HOLD);
      if (k >= start) point = points[i];
      else break;
    }
    return point;
  };

  const cx = chase((k) => targetAt(k).x, frame, () => CHASE.cursor);
  const cy = chase((k) => targetAt(k).y, frame, () => CHASE.cursor);

  const speed = Math.hypot(cx.velocity, cy.velocity);
  const calm = Math.max(0, 1 - speed / 1.5);
  const wx = noise2D("cursor-wander-x", frame * WANDER_SPEED, 7) * wander * calm;
  const wy = noise2D("cursor-wander-y", 3, frame * WANDER_SPEED) * wander * calm;

  let dip = 1;
  for (const move of moves) {
    if (move.press === false) continue;
    dip = Math.min(
      dip,
      interpolate(frame, [move.at - 3, move.at, move.at + 5], [1, 0.78, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }),
    );
  }

  if (frame < appearAt) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: cx.value + wx,
        top: cy.value + wy,
        zIndex: 60,
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
