import React from "react";
import { FONT, P, Tick } from "../../../kit/product-ui";

export const PILLAR = { w: 276, h: 276, pad: 18 } as const;

export const PillarCard: React.FC<{ title: string; tickAt: number; children: React.ReactNode }> = ({ title, tickAt, children }) => (
  <div className="pg-card" style={{ width: PILLAR.w, height: PILLAR.h, boxSizing: "border-box", padding: PILLAR.pad, fontFamily: FONT, position: "relative" }}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <span style={{ fontSize: 15, fontWeight: 600, color: P.fg, letterSpacing: "-0.012em" }}>{title}</span>
      <Tick at={tickAt} size={18} />
    </div>
    <div style={{ marginTop: 12 }}>{children}</div>
  </div>
);
