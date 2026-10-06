import React from "react";
import { clamp01, SPRINGS, useSpringAt } from "../../core/motion";
import { P } from "./tokens";
import { CheckGlyph, Spinner } from "./icons";

export const DoneIcon: React.FC<{ start: number; done: number; size?: number }> = ({ start, done, size = 16 }) => {
  const fin = useSpringAt(done, SPRINGS.pop, 18);
  const on = useSpringAt(start, SPRINGS.smooth, 8);
  return (
    <span style={{ position: "relative", width: size, height: size, flex: "none", opacity: on }}>
      <span style={{ position: "absolute", inset: 0, opacity: 1 - clamp01(fin * 2) }}>
        <Spinner size={size} color={P.slate} />
      </span>
      <span
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 9999,
          background: P.emerald,
          transform: `scale(${fin})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CheckGlyph size={size * 0.68} color="#fff" stroke={3.4} />
      </span>
    </span>
  );
};
