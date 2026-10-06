import React from "react";
import { interpolateColors } from "remotion";
import { SPRINGS, useSpringAt } from "../../core/motion";
import { P } from "./tokens";
import { CheckGlyph } from "./icons";

export const Tick: React.FC<{ at: number; size: number }> = ({ at, size }) => {
  const p = useSpringAt(at, SPRINGS.pop, 16);
  return (
    <span
      style={{
        width: size,
        height: size,
        borderRadius: 9999,
        boxSizing: "border-box",
        border: `1.5px solid ${interpolateColors(Math.min(1, p), [0, 1], [P.border, P.emerald])}`,
        background: interpolateColors(Math.min(1, p), [0, 1], ["rgba(16,185,129,0)", P.emerald]),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flex: "none",
      }}
    >
      <span style={{ transform: `scale(${p})`, display: "flex" }}>
        <CheckGlyph size={size * 0.66} color="#fff" stroke={3.6} />
      </span>
    </span>
  );
};
