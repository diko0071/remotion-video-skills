import React from "react";
import { interpolateColors } from "remotion";
import { C } from "../launch";
import { AD_RED } from "./tokens";

export const TermRow: React.FC<{ term: string; spend: string; strike: number; tag: number; last: boolean }> = ({ term, spend, strike, tag, last }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "13px 0", borderBottom: last ? "none" : `1.5px solid ${C.border}` }}>
    <span style={{ position: "relative", fontSize: 24, fontWeight: 700, letterSpacing: "-0.02em", opacity: 1 - 0.45 * strike }}>
      {term}
      <span style={{ position: "absolute", left: -4, top: "54%", height: 3, width: `calc((100% + 8px) * ${strike})`, background: C.ink, borderRadius: 2 }} />
    </span>
    <span style={{ marginLeft: "auto", fontSize: 19, fontWeight: 700, color: interpolateColors(strike, [0, 1], [AD_RED, C.mutedFg]) }}>{spend} · 0 sales</span>
    <span
      style={{
        width: 116,
        textAlign: "center",
        padding: "4px 0 6px",
        borderRadius: 8,
        background: C.ink,
        color: C.white,
        fontSize: 17,
        fontWeight: 700,
        opacity: tag,
        transform: `scale(${0.7 + 0.3 * tag})`,
      }}
    >
      Negative
    </span>
  </div>
);
