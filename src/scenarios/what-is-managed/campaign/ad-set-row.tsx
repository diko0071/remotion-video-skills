import React from "react";
import { Img, interpolate } from "remotion";
import { Switch } from "../ui/switch";
import { FONT, P, StatusPill } from "../../../kit/product-ui";

export const AD_ROW = { h: 60, thumb: 40, budgetX: 68, budgetDy: 33 } as const;

export const AdSetRow: React.FC<{
  name: string;
  img: string;
  budget: string;
  budgetBump: number;
  cpa: string;
  on: number;
  best: number;
  first: boolean;
}> = ({ name, img, budget, budgetBump, cpa, on, best, first }) => (
  <div
    style={{
      height: AD_ROW.h,
      boxSizing: "border-box",
      display: "flex",
      alignItems: "center",
      gap: 12,
      borderTop: first ? "none" : `1px solid ${P.border}`,
      fontFamily: FONT,
      opacity: interpolate(on, [0, 1], [0.5, 1]),
    }}
  >
    <Img src={img} style={{ width: AD_ROW.thumb, height: AD_ROW.thumb, objectFit: "cover", borderRadius: P.radius, flex: "none", filter: `grayscale(${1 - on})` }} />
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 600, color: P.fg, lineHeight: "20px" }}>
        {name}
        <span
          style={{
            opacity: best,
            transform: `scale(${0.8 + 0.2 * best})`,
            padding: "1px 6px",
            borderRadius: 2,
            background: P.emeraldSoft,
            color: "#047857",
            fontSize: 11,
            fontWeight: 600,
          }}
        >
          Best CPA
        </span>
      </div>
      <div style={{ marginTop: 2, fontSize: 13, color: P.mutedFg, lineHeight: "18px", display: "inline-block", transform: `scale(${1 + 0.12 * budgetBump})`, transformOrigin: "0 50%" }}>{budget}</div>
    </div>
    <div style={{ width: 92, textAlign: "right" }}>
      <div style={{ fontSize: 11, color: P.mutedFg }}>CPA</div>
      <div style={{ fontSize: 14, fontWeight: 600, color: P.fg, fontVariantNumeric: "tabular-nums" }}>{cpa}</div>
    </div>
    <div style={{ position: "relative", width: 86, height: 20 }}>
      <div style={{ position: "absolute", inset: 0, opacity: on }}>
        <StatusPill label="Live" tone="positive" />
      </div>
      <div style={{ position: "absolute", inset: 0, opacity: 1 - on }}>
        <StatusPill label="Paused" tone="neutral" />
      </div>
    </div>
    <Switch on={on} />
  </div>
);
