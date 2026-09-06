import React from "react";
import { PALETTE } from "../timings";
import { UI_FONT } from "./composer";

const CODE_LINES: { text: string; color: string; indent?: number }[] = [
  { text: '"use client"', color: "#C8C8C8" },
  { text: 'import * as React from "react"', color: "#7C8BD9" },
  { text: 'import * as RechartsPrimitive from "recharts"', color: "#7C8BD9" },
  { text: "", color: "#000" },
  { text: 'import { cn } from "@/lib/utils"', color: "#9AA4C4" },
  { text: "", color: "#000" },
  { text: "// Format: { THEME_NAME: CSS_SELECTOR }", color: "#5E6B8C" },
  { text: 'const THEMES = { light: "", dark: ".dark" } as const', color: "#B6B6B6" },
  { text: "", color: "#000" },
  { text: "export type ChartConfig = {", color: "#8FA0CF" },
  { text: "[k in string]: {", color: "#7E7E7E", indent: 1 },
];

export const CodePanel: React.FC<{ lines?: number }> = ({ lines = CODE_LINES.length }) => (
  <div
    style={{
      padding: "34px 44px",
      fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
      fontSize: 20,
      lineHeight: 1.62,
      maskImage: "linear-gradient(180deg, #000 0%, #000 42%, transparent 72%)",
      WebkitMaskImage: "linear-gradient(180deg, #000 0%, #000 42%, transparent 72%)",
    }}
  >
    {CODE_LINES.slice(0, Math.max(0, Math.round(lines))).map((line, i) => (
      <div key={i} style={{ color: line.color, paddingLeft: (line.indent ?? 0) * 26, minHeight: 32 }}>
        {line.text}
      </div>
    ))}
  </div>
);

const Seg: React.FC<{ label: string; active?: boolean }> = ({ label, active }) => (
  <div
    style={{
      padding: "7px 16px",
      borderRadius: 8,
      background: active ? "#2A2A2A" : "transparent",
      color: active ? "#EDEDED" : "#7C7C7C",
      fontSize: 19,
    }}
  >
    {label}
  </div>
);

const NavItem: React.FC<{ label: string }> = ({ label }) => (
  <div style={{ color: "#D2D2D2", fontSize: 21, padding: "13px 0" }}>{label}</div>
);

const GroupLabel: React.FC<{ label: string }> = ({ label }) => (
  <div style={{ color: PALETTE.textFaint, fontSize: 17, margin: "34px 0 12px" }}>{label}</div>
);

export const Sidebar: React.FC = () => (
  <div
    style={{
      width: 388,
      flexShrink: 0,
      background: PALETTE.panelSoft,
      borderRight: `1px solid #1A1A1A`,
      padding: "26px 22px",
      display: "flex",
      flexDirection: "column",
      fontFamily: UI_FONT,
    }}
  >
    <div style={{ display: "flex", gap: 6 }}>
      <Seg label="msg" />
      <Seg label="list" />
      <Seg label="Code" active />
    </div>
    <div style={{ marginTop: 22 }}>
      <NavItem label="+ New session" />
      <NavItem label="Scheduled" />
      <NavItem label="Customize" />
    </div>
    <GroupLabel label="Pinned" />
    <div
      style={{
        background: "#1C1C1C",
        border: `1px solid ${PALETTE.line}`,
        borderRadius: 10,
        padding: "13px 16px",
        color: "#E2E2E2",
        fontSize: 20,
      }}
    >
      how can i make money with prompt
    </div>
    <GroupLabel label="Recents" />
    <div style={{ paddingLeft: 16 }}>
      <div style={{ color: "#9C9C9C", fontSize: 20, padding: "30px 0" }}>Migrate API client to fetch</div>
      <div style={{ color: "#9C9C9C", fontSize: 20, padding: "30px 0" }}>Fix race condition in queue</div>
      <div style={{ color: "#9C9C9C", fontSize: 20, padding: "30px 0" }}>Add keyboard shortcuts</div>
    </div>
    <div
      style={{
        marginTop: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        color: "#8E8E8E",
        fontSize: 20,
      }}
    >
      <span>Idle Attention Co.</span>
      <div style={{ width: 22, height: 22, borderRadius: 999, border: "1.5px solid #4A5A22" }} />
    </div>
  </div>
);

export const AppWindow: React.FC<{ children?: React.ReactNode; showCode?: boolean }> = ({
  children,
  showCode = true,
}) => (
  <div
    style={{
      width: 1660,
      height: 1030,
      borderRadius: 22,
      background: "#0C0C0C",
      border: "1px solid #1C1C1C",
      display: "flex",
      overflow: "hidden",
      position: "relative",
      boxShadow: "0 60px 140px rgba(0,0,0,0.7)",
    }}
  >
    <Sidebar />
    <div style={{ flex: 1, position: "relative" }}>{showCode ? <CodePanel /> : null}{children}</div>
  </div>
);
