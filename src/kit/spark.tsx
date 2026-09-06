import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { SPRINGS, useSpringAt } from "../core/motion";

export const Spark: React.FC<{ at: number; size?: number; hideAt?: number }> = ({
  at,
  size = 30,
  hideAt,
}) => {
  const frame = useCurrentFrame();
  const enter = useSpringAt(at, SPRINGS.pop, 20);
  const hide = useSpringAt(hideAt ?? 1e6, SPRINGS.smooth, 14);
  const pulse = 0.82 + 0.18 * Math.sin(frame / 7.5);
  return (
    <div style={{ height: size + 4, display: "flex", alignItems: "center" }}>
      <Img
        src={staticFile("ryze-sun.png")}
        style={{
          width: size,
          height: size,
          transform: `scale(${enter * pulse}) rotate(${frame * 0.9}deg)`,
          opacity: enter * (1 - hide),
        }}
      />
    </div>
  );
};
