import React from "react";
import { Img, interpolateColors } from "remotion";
import { CheckGlyph, ChevronDown, FONT, P } from "../../../kit/product-ui";

export const OPTION = { rowH: 43, openH: 53 } as const;

export const OptionCard: React.FC<{
  label: string;
  logo: string;
  sel: number;
  open: number;
  glow: number;
  account: string;
}> = ({ label, logo, sel, open, glow, account }) => {
  const border = interpolateColors(Math.max(sel, glow * 0.6), [0, 1], [P.border, P.fg]);
  return (
    <div
      style={{
        width: "100%",
        boxSizing: "border-box",
        borderRadius: P.radius,
        border: `1.5px solid ${border}`,
        background: `color-mix(in srgb, ${P.fg} ${3.5 * sel}%, ${P.card})`,
        fontFamily: FONT,
        overflow: "hidden",
        transform: `scale(${1 + 0.035 * glow})`,
        boxShadow: glow > 0.01 ? `0 0 0 ${3 * glow}px color-mix(in srgb, ${P.brand} ${40 * glow}%, transparent)` : undefined,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px" }}>
        <Img src={logo} style={{ width: 18, height: 18, objectFit: "contain", flex: "none" }} />
        <span style={{ flex: 1, fontSize: 14, fontWeight: 500, color: P.fg, lineHeight: "20px" }}>{label}</span>
        <span
          style={{
            width: 16,
            height: 16,
            borderRadius: 4,
            boxSizing: "border-box",
            border: `1.5px solid ${interpolateColors(sel, [0, 1], [P.border, P.fg])}`,
            background: interpolateColors(sel, [0, 1], ["rgba(15,23,42,0)", P.fg]),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flex: "none",
          }}
        >
          <span style={{ opacity: sel, display: "flex" }}>
            <CheckGlyph size={12} color="#fff" stroke={3.5} />
          </span>
        </span>
      </div>
      <div style={{ height: OPTION.openH * open, overflow: "hidden" }}>
        <div style={{ borderTop: `1px solid color-mix(in srgb, ${P.border} 60%, transparent)`, padding: "10px 16px", opacity: open }}>
          <div
            style={{
              height: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 10px",
              borderRadius: 2.4,
              border: `1px solid ${P.border}`,
              fontSize: 14,
              color: P.fg,
              background: P.card,
            }}
          >
            {account}
            <ChevronDown size={16} color={P.mutedFg} />
          </div>
        </div>
      </div>
    </div>
  );
};
