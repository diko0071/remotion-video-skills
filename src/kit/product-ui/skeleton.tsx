import React from "react";
import { P } from "./tokens";

export const Skeleton: React.FC<{ w: number | string; h: number | string; rows?: number; on: number }> = ({ w, h, rows = 3, on }) => (
  <div style={{ position: "absolute", left: 0, top: 0, width: w, height: h, display: "flex", flexDirection: "column", gap: 8, padding: 12, boxSizing: "border-box", borderRadius: P.radius, background: P.muted, opacity: 1 - on }}>
    {Array.from({ length: rows }, (_, i) => (
      <span key={i} style={{ height: 9, width: `${92 - i * 14}%`, borderRadius: 2, background: "rgba(122,114,106,0.16)" }} />
    ))}
  </div>
);
