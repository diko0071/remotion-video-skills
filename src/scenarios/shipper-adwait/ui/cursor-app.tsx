import React from "react";
import { PALETTE } from "../timings";
import { UI_FONT } from "./composer";

const Chip: React.FC<{ children: React.ReactNode; scale: number }> = ({ children, scale }) => (
  <div
    style={{
      padding: `${12 * scale}px ${26 * scale}px`,
      borderRadius: 999,
      border: `1px solid ${PALETTE.line}`,
      color: "#B4B4B4",
      fontSize: 24 * scale,
      display: "flex",
      alignItems: "center",
      gap: 10 * scale,
    }}
  >
    {children}
  </div>
);

export const CursorComposer: React.FC<{
  value: string;
  caret?: boolean;
  width?: number;
  scale?: number;
}> = ({ value, caret = true, width = 1240, scale = 1 }) => (
  <div style={{ width, fontFamily: UI_FONT }}>
    <div
      style={{
        borderRadius: 18 * scale,
        background: "#121212",
        border: `1px solid ${PALETTE.lineSoft}`,
        padding: `${30 * scale}px ${32 * scale}px ${24 * scale}px`,
      }}
    >
      <div style={{ fontSize: 28 * scale, color: PALETTE.text, minHeight: 84 * scale }}>
        {value}
        {caret ? (
          <span
            style={{
              display: "inline-block",
              width: 2 * scale,
              height: 28 * scale,
              background: PALETTE.lime,
              marginLeft: 3,
              transform: "translateY(4px)",
            }}
          />
        ) : null}
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12 * scale,
            color: "#8E8E8E",
            fontSize: 24 * scale,
          }}
        >
          <span>Composer 2.5 Fast</span>
          <span style={{ fontSize: 20 * scale }}>🔒</span>
        </div>
        <div
          style={{
            width: 62 * scale,
            height: 62 * scale,
            borderRadius: 999,
            background: "#F2F2F2",
            display: "grid",
            placeItems: "center",
            color: "#101010",
            fontSize: 28 * scale,
          }}
        >
          ↑
        </div>
      </div>
    </div>
    <div style={{ display: "flex", gap: 16 * scale, marginTop: 20 * scale }}>
      <Chip scale={scale}>
        Plan New Idea <span style={{ color: "#6E6E6E", fontSize: 20 * scale }}>^ Tab</span>
      </Chip>
      <Chip scale={scale}>Multitask</Chip>
    </div>
  </div>
);

const NAV = ["New Agent", "Search", "Automations", "Customize"];

export const CursorWindow: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      width: 1860,
      height: 1046,
      borderRadius: 14,
      background: "#0B0B0B",
      border: "1px solid #1B1B1B",
      overflow: "hidden",
      position: "relative",
      fontFamily: UI_FONT,
    }}
  >
    <div
      style={{
        height: 52,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
      }}
    >
      <div style={{ display: "flex", gap: 9 }}>
        {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
          <div key={c} style={{ width: 15, height: 15, borderRadius: 999, background: c }} />
        ))}
      </div>
      <div style={{ color: "#5C5C5C", fontSize: 17 }}>Video Review 1</div>
    </div>
    <div style={{ display: "flex", height: "calc(100% - 52px)" }}>
      <div style={{ width: 300, padding: "6px 22px", flexShrink: 0 }}>
        {NAV.map((n) => (
          <div
            key={n}
            style={{ color: "#9E9E9E", fontSize: 20, padding: "11px 0", display: "flex", gap: 12 }}
          >
            <span style={{ color: "#5A5A5A" }}>◦</span>
            {n}
          </div>
        ))}
        <div style={{ color: "#4E4E4E", fontSize: 17, marginTop: 30 }}>Recents</div>
      </div>
      <div style={{ flex: 1, position: "relative" }}>{children}</div>
    </div>
  </div>
);
