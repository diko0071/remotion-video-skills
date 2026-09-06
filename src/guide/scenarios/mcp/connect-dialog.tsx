import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { SPRINGS, useSpringAt } from "../../../core/motion";
import { useClickPress } from "../../../core/press-context";
import "./mcp-guide.css";

export const MCP_URL = "https://connector.get-ryze.ai/mcp";

export const ConnectMcpDialog: React.FC<{
  at: number;
  visible: boolean;
  copiedAt: number;
}> = ({ at, visible, copiedAt }) => {
  const frame = useCurrentFrame();
  const p = useSpringAt(at, SPRINGS.panel, 18);
  const copyScale = useClickPress("rz.copy");
  const openScale = useClickPress("rz.open");
  const copied = frame >= copiedAt;
  return (
    <div className="mcpx-veil" style={{ opacity: visible ? p : 0 }}>
      <div
        className="mcpx-dialog"
        style={{ transform: `translateY(${interpolate(p, [0, 1], [12, 0])}px)` }}
      >
        <h4>Connect Claude MCP</h4>
        <p className="mcpx-sub">
          Use Ryze tools and data directly from Claude — chat with your marketing anywhere.
        </p>
        <div className="mcpx-input">
          <span className="mcpx-url">{MCP_URL}</span>
          <span className="mcpx-copy" data-click="rz.copy" style={{ scale: String(copyScale) }}>
            {copied ? (
              <svg viewBox="0 0 24 24" width={15} height={15} fill="none" stroke="#059669" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
            ) : (
              <svg viewBox="0 0 24 24" width={15} height={15} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>
            )}
          </span>
        </div>
        <div className="mcpx-actions">
          <span className="btn-outline">Setup guide</span>
          <span style={{ flex: 1 }} />
          <span className="btn-primary" data-click="rz.open" style={{ scale: String(openScale) }}>
            Open Claude
          </span>
        </div>
      </div>
    </div>
  );
};
