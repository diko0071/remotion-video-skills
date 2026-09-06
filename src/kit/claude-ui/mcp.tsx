import React from "react";
import { Img, staticFile } from "remotion";
import "./claude.css";
import { grotesk, serif } from "./font";
import { CheckIcon, Caret } from "./icons";

const NAV = [
  "General",
  "Account",
  "Privacy",
  "Billing",
  "Usage",
  "Capabilities",
  "Claude Code",
  "Cowork",
  "Claude in Chrome",
  "Customize",
  "Skills",
  "Connectors",
  "Plugins",
  "Memory",
];

export type ConnectorRow = {
  name: string;
  type: string;
  connected?: boolean;
  favicon?: string;
};

export const McpSettingsDialog: React.FC<{
  width?: number;
  rows: ConnectorRow[];
  highlightRow?: string;
  addPressed?: number;
}> = ({ width = 860, rows, highlightRow, addPressed = 1 }) => (
  <div className="cl-dialog claude-ui" style={{ width, fontFamily: grotesk, ["--cl-serif" as never]: serif }}>
    <div className="cl-settings">
      <div className="cl-settings-nav">
        <div className="title">Settings</div>
        {NAV.map((item) => (
          <div key={item} className={`item${item === "Connectors" ? " on" : ""}`}>
            {item}
          </div>
        ))}
      </div>
      <div className="cl-settings-body">
        <div className="cl-settings-head">
          <h2>Connectors</h2>
          <span className="cl-btn-primary" data-click="cl.add" style={{ transform: `scale(${addPressed})`, display: "inline-block" }}>Add</span>
        </div>
        <div className="cl-filters">
          {["All", "Connected", "Not connected"].map((filter, i) => (
            <span key={filter} className={`cl-filter${i === 0 ? " on" : ""}`}>
              {filter}
            </span>
          ))}
        </div>
        <div className="cl-section-label">Popular</div>
        {["Gmail", "Google Drive", "Slack"].map((name) => (
          <div key={name} className="cl-connector-row">
            <span className="logo">
              <Img src={staticFile(`claude/favicon-${name.toLowerCase().replace(" ", "-")}.png`)} />
            </span>
            <span className="name">{name}</span>
            <span className="spacer" />
            <span className="cl-btn-outline">Connect</span>
          </div>
        ))}
        <div className="cl-section-label">Your connectors</div>
        {rows.map((row) => (
          <div
            key={row.name}
            className="cl-connector-row"
            style={
              highlightRow === row.name
                ? { background: "rgba(217,119,87,0.07)", borderRadius: 10, padding: "10px 10px" }
                : undefined
            }
          >
            <span className="logo">
              <Img src={staticFile(row.favicon ?? "claude/favicon-ryze.png")} />
            </span>
            <span className="name">{row.name}</span>
            <span className="meta">{row.type}</span>
            <span className="spacer" />
            {row.connected ? (
              <span className="cl-badge-connected">
                <CheckIcon /> Connected
              </span>
            ) : (
              <span className="cl-btn-outline">Connect</span>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const McpPopup: React.FC<{
  name?: string;
  url?: string;
  cursorInUrl?: boolean;
}> = ({ name = "", url = "", cursorInUrl = false }) => (
  <div className="cl-dialog cl-popup claude-ui" style={{ fontFamily: grotesk, ["--cl-serif" as never]: serif }}>
    <h2>Add custom connector</h2>
    <div className="sub">
      Connect Claude to your data and tools. <a>Learn more about connectors</a> or get started with{" "}
      <a>pre-built ones</a>.
    </div>
    <div className="cl-field">
      <label>Name</label>
      <div className="box">{name || <span className="ph">Ryze AI</span>}</div>
    </div>
    <div className="cl-field">
      <label>Remote MCP server URL</label>
      <div className="box">
        {url ? (
          <span>
            {url}
            <Caret on={cursorInUrl} height={15} align={-2} />
          </span>
        ) : (
          <span className="ph">https://example.com/mcp</span>
        )}
      </div>
    </div>
    <div style={{ fontSize: 13, color: "var(--cl-text-2)" }}>Advanced settings</div>
    <div className="cl-popup-foot">
      <span className="hint">Building an MCP server?</span>
      <span className="cl-btn-ghost">Cancel</span>
      <span className="cl-btn-primary" data-click="cl.popup.add">Add</span>
    </div>
  </div>
);
