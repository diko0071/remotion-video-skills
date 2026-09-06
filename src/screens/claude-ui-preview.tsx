import React from "react";
import { AbsoluteFill } from "remotion";
import {
  ClaudeComposer,
  ClaudeDisclaimer,
  ClaudeFrame,
  ClaudeResponse,
  ClaudeThinking,
  ClaudeToolRows,
  ClaudeUserBubble,
  ClaudeWelcome,
  McpPopup,
  McpSettingsDialog,
} from "../kit/claude-ui";

export const ClaudeEmptyPreview: React.FC = () => (
  <AbsoluteFill>
    <ClaudeFrame>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 40,
          transform: "translateY(-5%)",
        }}
      >
        <ClaudeWelcome />
        <div style={{ width: 720 }}>
          <ClaudeComposer />
        </div>
      </div>
    </ClaudeFrame>
  </AbsoluteFill>
);

export const ClaudeChatPreview: React.FC = () => (
  <AbsoluteFill>
    <ClaudeFrame>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div
          style={{
            width: 760,
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 18,
            paddingTop: 20,
          }}
        >
          <ClaudeUserBubble>do you have MCP access?</ClaudeUserBubble>
          <ClaudeThinking text="Confirmed the MCP tools are connected and ready to answer" />
          <ClaudeResponse>
            <p>
              Yes — your Ryze AI connector is hooked up (connector.get-ryze.ai/mcp). Plenty of
              tools in there, grouped like this:
            </p>
            <ul>
              <li>
                <b>Google Ads</b> — GAQL queries, keyword planner, recommendations, mutations
              </li>
              <li>
                <b>GA4</b> — runReport, realtime, pivot, plus the AI traffic block
              </li>
              <li>
                <b>Search Console</b> — search analytics, URL inspection, sitemaps
              </li>
              <li>
                <b>Meta Ads</b> — insights, creatives, lead forms, Ad Library
              </li>
            </ul>
          </ClaudeResponse>
          <ClaudeUserBubble>take a look at google ads</ClaudeUserBubble>
          <ClaudeThinking text="Analyzed campaign metrics and surfaced the anomalies" running />
          <ClaudeToolRows
            items={[
              { label: "Google ads", tool: "listAccessibleCustomers" },
              { label: "Google ads", tool: "runGaqlQuery" },
            ]}
          />
        </div>
        <div style={{ width: 760, paddingBottom: 12 }}>
          <ClaudeComposer placeholder="Reply to Claude…" />
          <ClaudeDisclaimer />
        </div>
      </div>
    </ClaudeFrame>
  </AbsoluteFill>
);

export const McpSettingsPreview: React.FC = () => (
  <AbsoluteFill
    style={{
      background: "#E8E5DC",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <McpSettingsDialog
      rows={[
        { name: "GitHub Integration", type: "Web", connected: true, favicon: "claude/favicon-github.png" },
        { name: "Ryze AI", type: "Custom", connected: true },
      ]}
      highlightRow="Ryze AI"
    />
  </AbsoluteFill>
);

export const McpPopupPreview: React.FC = () => (
  <AbsoluteFill
    style={{
      background: "#E8E5DC",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <McpPopup name="Ryze AI" url="https://connector.get-ryze.ai/mcp" cursorInUrl />
  </AbsoluteFill>
);
