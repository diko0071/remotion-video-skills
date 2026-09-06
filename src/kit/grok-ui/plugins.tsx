import React from "react";
import { Img, staticFile } from "remotion";
import { grokFont } from "./font";

export const PLUGIN_CATEGORIES = [
  "All",
  "Featured",
  "Agent Orchestration",
  "Canvas",
  "Customer Support",
  "Data Analytics",
  "Design",
  "Documents And Files",
  "Finance And Legal",
  "Inbox And Collaboration",
  "Infrastructure",
  "MCP",
  "Payments",
  "Productivity",
  "Research",
  "Sales",
  "Scheduling",
];

export type PluginCardProps = {
  icon: string;
  name: string;
  blurb: string;
  action?: string;
  added?: boolean;
  addedLabel?: string;
  iconBg?: string;
  buttonId?: string;
  buttonScale?: number;
  ring?: number;
  style?: React.CSSProperties;
};

export const PluginCard: React.FC<PluginCardProps> = ({ icon, name, blurb, action = "Add", added = false, addedLabel = "Added", iconBg = "#fff", buttonId, buttonScale = 1, ring = 0, style }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 22, ...style }}>
    <div style={{ width: 80, height: 80, borderRadius: 20, background: iconBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, overflow: "hidden" }}>
      <Img src={staticFile(icon)} style={{ width: 46, height: 46, objectFit: "contain", display: "block" }} />
    </div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontSize: 23, fontWeight: 500, color: "var(--gk-text)", marginBottom: 4 }}>{name}</div>
      <div style={{ fontSize: 21, color: "var(--gk-text-2)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{blurb}</div>
    </div>
    {added ? (
      <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 21, color: "var(--gk-text-2)", flexShrink: 0, paddingRight: 8 }}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 9.5l4 4 8-9" stroke="#3CC26A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        {addedLabel}
      </div>
    ) : (
      <div
        data-click={buttonId}
        style={{
          position: "relative",
          padding: "12px 26px",
          borderRadius: 999,
          background: "var(--gk-fill-2)",
          color: "var(--gk-text)",
          fontSize: 20,
          fontWeight: 500,
          flexShrink: 0,
          transform: `scale(${buttonScale})`,
        }}
      >
        {action}
        {ring > 0 ? (
          <div style={{ position: "absolute", inset: -4 - ring * 22, borderRadius: 999, border: `${2.5 - ring * 2}px solid rgba(60,194,106,${0.9 * (1 - ring)})`, pointerEvents: "none" }} />
        ) : null}
      </div>
    )}
  </div>
);

export const PluginSection: React.FC<{ title: string; children: React.ReactNode; style?: React.CSSProperties }> = ({ title, children, style }) => (
  <div style={{ marginBottom: 44, ...style }}>
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "var(--gk-text-2)", marginBottom: 26 }}>
      <span>{title}</span>
      <span>View all</span>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", rowGap: 36, columnGap: 64 }}>{children}</div>
  </div>
);

export const GrokPluginsModal: React.FC<{
  query?: string;
  placeholder?: string;
  installed?: string[];
  installedCount?: number;
  privateCount?: number;
  dark?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ query = "", placeholder = "Search plugins", installed = [], installedCount = 5, privateCount = 8, dark = false, children, style }) => (
  <div
    className={"grok-ui" + (dark ? " dark" : "")}
    style={{
      fontFamily: grokFont,
      width: 1800,
      height: 1400,
      borderRadius: 28,
      background: dark ? "#141416" : "#fff",
      boxShadow: "0 40px 120px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)",
      padding: "60px 64px 40px",
      position: "relative",
      overflow: "hidden",
      color: "var(--gk-text)",
      ...style,
    }}
  >
    <div style={{ position: "absolute", right: 44, top: 40, fontSize: 30, color: "var(--gk-text-2)" }}>×</div>
    <div style={{ fontSize: 34, fontWeight: 500, marginBottom: 44 }}>Plugins</div>
    <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 36, fontSize: 22, color: "var(--gk-text-2)" }}>
      <div style={{ display: "flex" }}>
        {installed.map((f, i) => (
          <Img key={f} src={staticFile(f)} style={{ width: 40, height: 40, borderRadius: 9, marginLeft: i === 0 ? 0 : -6, objectFit: "cover", border: "2px solid #141416", background: "#fff" }} />
        ))}
      </div>
      <span>
        {installedCount} installed · {privateCount} private
      </span>
      <span>›</span>
    </div>
    <div style={{ height: 64, borderRadius: 14, background: "var(--gk-fill)", border: "1px solid var(--gk-border)", display: "flex", alignItems: "center", gap: 14, padding: "0 20px", fontSize: 24, marginBottom: 30 }}>
      <span style={{ color: "var(--gk-text-3)" }}>⌕</span>
      {query ? <span>{query}</span> : <span style={{ color: "var(--gk-text-3)" }}>{placeholder}</span>}
      <span style={{ width: 2, height: 28, background: "var(--gk-text)", opacity: query ? 1 : 0 }} />
    </div>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginBottom: 70 }}>
      {PLUGIN_CATEGORIES.map((c, i) => (
        <div key={c} style={{ padding: "12px 20px", borderRadius: 12, border: "1px solid var(--gk-border)", background: i === 0 ? "var(--gk-fill)" : "transparent", fontSize: 22 }}>
          {c}
        </div>
      ))}
    </div>
    {children}
  </div>
);
