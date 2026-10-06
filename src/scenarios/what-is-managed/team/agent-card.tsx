import React from "react";
import { Img } from "remotion";
import { ROLES } from "../data";
import { LOGO } from "../theme";
import { DoneIcon, FONT, P } from "../../../kit/product-ui";

export const AGENT = { w: 296 } as const;

export const AgentCard: React.FC<{ start: number; checks: readonly number[] }> = ({ start, checks }) => (
  <div className="pg-card" style={{ width: AGENT.w, boxSizing: "border-box", padding: 18, fontFamily: FONT }}>
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <Img src={LOGO.sun} style={{ width: 30, height: 30, flex: "none" }} />
      <div>
        <div style={{ fontSize: 17, fontWeight: 700, color: P.fg, letterSpacing: "-0.02em" }}>Managed Campaigns</div>
        <div style={{ marginTop: 1, fontSize: 12, color: P.mutedFg }}>One AI agent</div>
      </div>
    </div>
    <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 12 }}>
      {ROLES.map((r, i) => (
        <div key={r.task} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 15, fontWeight: 500, color: P.fg }}>
          <DoneIcon start={start} done={checks[i]} size={18} />
          {r.task}
        </div>
      ))}
    </div>
  </div>
);
