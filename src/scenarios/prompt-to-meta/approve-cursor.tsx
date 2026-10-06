import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { approveButtonCenter } from "./campaign-panel";
import { clickDip, Pointer, pointerPath } from "./pointer";
import { ramp, T } from "./timeline";

export const ApproveCursor: React.FC = () => {
  const f = useCurrentFrame();
  if (f < T.userCursor || f > T.approve + 24) return null;
  const target = approveButtonCenter();
  const p = pointerPath(f, { x: 1500, y: 1140 }, { x: target.x + 6, y: target.y + 8 }, T.userCursor, -50);
  const opacity = ramp(f, T.userCursor, 5) * (1 - ramp(f, T.approve + 14, 8));
  return (
    <AbsoluteFill>
      <Pointer x={p.x} y={p.y} dip={clickDip(f, T.approve)} opacity={opacity} />
    </AbsoluteFill>
  );
};
