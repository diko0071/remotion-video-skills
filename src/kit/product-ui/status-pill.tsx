import React from "react";
import { FONT, P } from "./tokens";

export type Tone = "positive" | "info" | "neutral" | "warn";

const DOT: Record<Tone, string> = { positive: P.emerald, info: P.sky, neutral: P.slate, warn: P.amber };

export const StatusPill: React.FC<{ label: string; tone: Tone }> = ({ label, tone }) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      minWidth: 86,
      padding: "2px 8px",
      borderRadius: 2,
      background: P.muted,
      color: P.fg,
      fontFamily: FONT,
      fontSize: 11,
      fontWeight: 500,
      letterSpacing: "0.025em",
      whiteSpace: "nowrap",
      fontVariantNumeric: "tabular-nums",
    }}
  >
    <span style={{ width: 6, height: 6, borderRadius: 9999, background: DOT[tone], flex: "none" }} />
    {label}
  </span>
);
