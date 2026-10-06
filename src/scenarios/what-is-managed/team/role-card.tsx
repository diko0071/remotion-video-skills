import React from "react";
import { FONT, P } from "../../../kit/product-ui";

export const ROLE = { w: 260, pad: 16, gap: 24 } as const;

export const RoleCard: React.FC<{ role: string; task: string; children: React.ReactNode }> = ({ role, task, children }) => (
  <div className="pg-card" style={{ width: ROLE.w, boxSizing: "border-box", padding: ROLE.pad, fontFamily: FONT }}>
    <div style={{ fontSize: 12, fontWeight: 500, color: P.mutedFg }}>{role}</div>
    <div style={{ marginTop: 3, fontSize: 15, fontWeight: 600, color: P.fg, letterSpacing: "-0.012em" }}>{task}</div>
    <div style={{ marginTop: 12 }}>{children}</div>
  </div>
);
