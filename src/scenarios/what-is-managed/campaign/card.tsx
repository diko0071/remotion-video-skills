import React from "react";
import { interpolate } from "remotion";
import { COPY } from "../data";
import { FONT, P, StatusPill } from "../../../kit/product-ui";

export const CARD = { w: 600, pad: 16, headH: 62, bodyTop: 74 } as const;

export const CampaignCard: React.FC<{ live: number; height: number; children: React.ReactNode }> = ({ live, height, children }) => (
  <div
    style={{
      position: "relative",
      width: CARD.w,
      height,
      boxSizing: "border-box",
      borderRadius: P.radius,
      border: `1px solid ${P.border}`,
      background: P.card,
      fontFamily: FONT,
      boxShadow: "0 12px 32px rgba(15,23,42,0.06)",
      overflow: "hidden",
    }}
  >
    <div style={{ position: "absolute", left: CARD.pad, top: CARD.pad, right: CARD.pad, display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
      <div>
        <div style={{ fontSize: 16, fontWeight: 500, color: P.fg, lineHeight: "24px" }}>{COPY.campaignName}</div>
        <div style={{ marginTop: 2, fontSize: 14, color: P.mutedFg, lineHeight: "20px" }}>{COPY.metaLine}</div>
      </div>
      <div style={{ position: "relative", height: 20 }}>
        <div style={{ opacity: 1 - live, transform: `translateY(${interpolate(live, [0, 1], [0, -6])}px)` }}>
          <StatusPill label="Setting up" tone="info" />
        </div>
        <div style={{ position: "absolute", right: 0, top: 0, opacity: live, transform: `translateY(${interpolate(live, [0, 1], [6, 0])}px) scale(${1 + 0.12 * Math.sin(Math.PI * live)})` }}>
          <StatusPill label="Live" tone="positive" />
        </div>
      </div>
    </div>
    {children}
  </div>
);
