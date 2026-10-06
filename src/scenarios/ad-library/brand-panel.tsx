import React from "react";
import { useLayout } from "./layout";
import { ACCENT } from "./theme";

const RADIUS = 28;

export const BrandPanel: React.FC<{ reveal: number; hide: number; scale: number }> = ({ reveal, hide, scale }) => {
  const l = useLayout();
  const p = l.panel;
  const o = { x: l.arrow.to.x - p.x, y: l.arrow.to.y - p.y };
  const reach = Math.hypot(Math.max(Math.abs(o.x), Math.abs(p.w - o.x)), Math.max(Math.abs(o.y), Math.abs(p.h - o.y)));
  return (
    <div
      style={{
        position: "absolute",
        left: p.x,
        top: p.y,
        width: p.w,
        height: p.h,
        borderRadius: RADIUS,
        background: ACCENT,
        clipPath: `circle(${reach * reveal}px at ${o.x}px ${o.y}px)`,
        opacity: 1 - hide,
        transform: `scale(${scale * (1 - 0.08 * hide)})`,
      }}
    />
  );
};
