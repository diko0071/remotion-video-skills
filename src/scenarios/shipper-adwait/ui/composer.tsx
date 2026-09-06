import React from "react";
import { loadFont } from "@remotion/google-fonts/Inter";
import { PALETTE } from "../timings";

const { fontFamily } = loadFont();

export const UI_FONT = fontFamily;

const Pill: React.FC<{ label: string; scale: number }> = ({ label, scale }) => (
  <div
    style={{
      padding: `${11 * scale}px ${24 * scale}px`,
      borderRadius: 9 * scale,
      background: PALETTE.chip,
      border: `1px solid ${PALETTE.line}`,
      color: "#D8D8D8",
      fontSize: 24 * scale,
      letterSpacing: "-0.01em",
    }}
  >
    {label}
  </div>
);

export const ShipperComposer: React.FC<{
  value: string;
  caret?: boolean;
  width?: number;
  model?: string;
  scale?: number;
}> = ({ value, caret = true, width = 1800, model = "Opus 4.6", scale = 1 }) => {
  const dollar = value.match(/\$[\d.,k]+/i)?.[0];
  const [head, tail] = dollar ? value.split(dollar) : [value, ""];

  return (
    <div
      style={{
        width,
        borderRadius: 24 * scale,
        background: PALETTE.panel,
        border: `1px solid ${PALETTE.line}`,
        padding: `${38 * scale}px ${42 * scale}px ${32 * scale}px`,
        fontFamily,
        boxShadow: "0 40px 90px rgba(0,0,0,0.55)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 13 * scale }}>
        <Pill label="Local" scale={scale} />
        <Pill label="app" scale={scale} />
        <Pill label="main" scale={scale} />
        <div style={{ display: "flex", alignItems: "center", gap: 13 * scale, marginLeft: 10 * scale }}>
          <div style={{ width: 21 * scale, height: 21 * scale, borderRadius: 6 * scale, background: PALETTE.lime }} />
          <span style={{ color: PALETTE.textDim, fontSize: 24 * scale }}>worktree</span>
        </div>
      </div>

      <div
        style={{
          marginTop: 28 * scale,
          height: 132 * scale,
          borderRadius: 14 * scale,
          background: PALETTE.panelSoft,
          border: `1px solid ${PALETTE.lineSoft}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: `0 ${18 * scale}px 0 ${30 * scale}px`,
        }}
      >
        <div style={{ fontSize: 34 * scale, color: PALETTE.text, letterSpacing: "-0.012em" }}>
          {head}
          {dollar ? <span style={{ color: PALETTE.lime }}>{dollar}</span> : null}
          {tail}
          {caret ? (
            <span
              style={{
                display: "inline-block",
                width: 2 * scale,
                height: 34 * scale,
                background: PALETTE.lime,
                marginLeft: 2,
                transform: "translateY(4px)",
              }}
            />
          ) : null}
        </div>
        <div
          style={{
            width: 76,
            height: 64,
            borderRadius: 11,
            background: "#1C1C1C",
            border: `1px solid ${PALETTE.line}`,
            display: "grid",
            placeItems: "center",
            color: "#8A8A8A",
            fontSize: 24,
          }}
        >
          ↵
        </div>
      </div>

      <div
        style={{
          marginTop: 26 * scale,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: 24 * scale,
        }}
      >
        <span style={{ color: PALETTE.textFaint }}>Auto accept edits ⌘↵</span>
        <div style={{ display: "flex", alignItems: "center", gap: 12 * scale }}>
          <span style={{ color: "#A3A3A3" }}>{model}</span>
          <div
            style={{
              width: 22 * scale,
              height: 22 * scale,
              borderRadius: 999,
              border: `1.5px solid ${PALETTE.limeSoft}`,
              display: "grid",
              placeItems: "center",
              boxShadow: `0 0 18px ${PALETTE.limeSoft}66`,
            }}
          >
            <div style={{ width: 7 * scale, height: 7 * scale, borderRadius: 999, background: PALETTE.lime }} />
          </div>
        </div>
      </div>
    </div>
  );
};
