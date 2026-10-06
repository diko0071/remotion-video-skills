import React from "react";
import { interpolateColors } from "remotion";
import { P } from "../../../kit/product-ui";

export const Switch: React.FC<{ on: number }> = ({ on }) => (
  <span style={{ position: "relative", width: 32, height: 18, borderRadius: 9999, background: interpolateColors(on, [0, 1], [P.border, P.primary]), flex: "none" }}>
    <span
      style={{
        position: "absolute",
        top: 1,
        left: 1 + 14 * on,
        width: 16,
        height: 16,
        borderRadius: 9999,
        background: "#fff",
        boxShadow: "0 1px 2px rgba(15,23,42,0.2)",
      }}
    />
  </span>
);
