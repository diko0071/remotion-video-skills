import React from "react";
import { CheckGlyph, ChevronDown, FONT, P } from "../../../kit/product-ui";

export const SELECT = { h: 36, itemH: 32, pad: 4 } as const;

export const SelectTrigger: React.FC<{ value: string | null; meta?: string; placeholder: string; focus: number }> = ({ value, meta, placeholder, focus }) => (
  <div
    style={{
      height: SELECT.h,
      boxSizing: "border-box",
      display: "flex",
      alignItems: "center",
      gap: 6,
      padding: "0 12px",
      borderRadius: 2.4,
      border: `1px solid ${P.border}`,
      boxShadow: `0 1px 2px rgba(15,23,42,0.05)${focus > 0.01 ? `, 0 0 0 ${3 * focus}px color-mix(in srgb, ${P.fg} 12%, transparent)` : ""}`,
      background: P.card,
      fontFamily: FONT,
      fontSize: 14,
      color: value ? P.fg : P.mutedFg,
    }}
  >
    <span>{value ?? placeholder}</span>
    {value && meta ? <span style={{ fontSize: 11, color: P.mutedFg }}>({meta})</span> : null}
    <span style={{ marginLeft: "auto", display: "flex" }}>
      <ChevronDown size={16} color={P.mutedFg} />
    </span>
  </div>
);

export const SelectList: React.FC<{ items: readonly { friendly: string; event: string }[]; hover: number; chosen: number | null }> = ({ items, hover, chosen }) => (
  <div
    style={{
      padding: SELECT.pad,
      borderRadius: 2.4,
      border: `1px solid ${P.border}`,
      background: P.card,
      boxShadow: "0 10px 24px rgba(15,23,42,0.10), 0 2px 6px rgba(15,23,42,0.06)",
      fontFamily: FONT,
    }}
  >
    {items.map((it, i) => (
      <div
        key={it.event}
        style={{
          height: SELECT.itemH,
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "0 8px",
          borderRadius: 1.8,
          background: i === hover ? P.muted : "transparent",
          fontSize: 14,
          color: P.fg,
        }}
      >
        {it.friendly}
        <span style={{ fontSize: 11, color: P.mutedFg }}>({it.event})</span>
        <span style={{ marginLeft: "auto", display: "flex", opacity: chosen === i ? 1 : 0 }}>
          <CheckGlyph size={14} color={P.fg} stroke={2.4} />
        </span>
      </div>
    ))}
  </div>
);
