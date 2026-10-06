import React from "react";
import { DAYS } from "../data";
import { FONT, P, Tick } from "../../../kit/product-ui";

export const WeekRow: React.FC<{ marks: readonly number[] }> = ({ marks }) => (
  <div style={{ fontFamily: FONT }}>
    <div style={{ fontSize: 13, fontWeight: 600, color: P.fg }}>Results checked</div>
    <div style={{ marginTop: 10, display: "flex", gap: 7 }}>
      {DAYS.map((d, i) => (
        <div
          key={d}
          style={{
            width: 74,
            height: 62,
            boxSizing: "border-box",
            borderRadius: P.radius,
            border: `1px solid ${P.border}`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "8px 0 9px",
            fontSize: 12,
            fontWeight: 600,
            color: P.mutedFg,
          }}
        >
          {d}
          <Tick at={marks[i]} size={20} />
        </div>
      ))}
    </div>
  </div>
);
