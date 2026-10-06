import React from "react";
import { DAYS } from "../data";
import { FONT, P, Tick } from "../../../kit/product-ui";

export const MiniWeek: React.FC<{ from: number; to: number }> = ({ from, to }) => (
  <div style={{ display: "flex", gap: 5, height: 96, alignItems: "center" }}>
    {DAYS.map((d, i) => (
      <div
        key={d}
        style={{
          width: 28,
          height: 48,
          boxSizing: "border-box",
          borderRadius: P.radius,
          border: `1px solid ${P.border}`,
          background: P.card,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "5px 0 6px",
          fontFamily: FONT,
          fontSize: 10,
          fontWeight: 600,
          color: P.mutedFg,
        }}
      >
        {d[0]}
        <Tick at={from + Math.round(((to - from) * i) / (DAYS.length - 1))} size={14} />
      </div>
    ))}
  </div>
);
