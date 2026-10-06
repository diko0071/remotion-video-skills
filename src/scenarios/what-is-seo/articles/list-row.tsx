import React from "react";
import { FONT, P } from "../../../kit/product-ui";

export const LIST_ROW_H = 52;

export const ListRow: React.FC<{ title: string; sub: string; right: React.ReactNode; first: boolean }> = ({ title, sub, right, first }) => (
  <div
    style={{
      height: LIST_ROW_H,
      boxSizing: "border-box",
      display: "flex",
      alignItems: "center",
      gap: 12,
      borderTop: first ? "none" : `1px solid ${P.border}`,
      fontFamily: FONT,
    }}
  >
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontSize: 14, fontWeight: 500, color: P.fg, lineHeight: "20px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{title}</div>
      <div style={{ marginTop: 1, fontSize: 12, color: P.mutedFg, lineHeight: "16px" }}>{sub}</div>
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 12, flex: "none" }}>{right}</div>
  </div>
);
