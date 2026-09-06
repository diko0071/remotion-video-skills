import React from "react";
import { interpolate } from "remotion";
import { SPRINGS, useSpringAt } from "../../core/motion";

export const SlackSlideIn: React.FC<{
  at: number;
  from?: number;
  to?: number;
  width?: number;
  children: React.ReactNode;
}> = ({ at, from = 1920, to = 0, width = 1920, children }) => {
  const p = useSpringAt(at, SPRINGS.panel, 34);
  const push = useSpringAt(at + 44, SPRINGS.drift, 120);
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        width,
        transform: `translateX(${interpolate(p, [0, 1], [from, to])}px) scale(${interpolate(push, [0, 1], [1, 1.035])})`,
        transformOrigin: "62% 45%",
        boxShadow: "-30px 0 80px rgba(20,15,10,0.28)",
      }}
    >
      {children}
    </div>
  );
};
