import React from "react";
import { Img, staticFile } from "remotion";
import { Shimmer } from "../../core/motion";
import "./claude.css";
import { ChevronRight, Starburst } from "./icons";

export const ClaudeUserBubble: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="cl-user-row">
    <div className="cl-user-bubble">{children}</div>
  </div>
);

export const ClaudeThinking: React.FC<{ text: string; running?: boolean }> = ({
  text,
  running = false,
}) => (
  <div className="cl-thinking">
    <ChevronRight size={13} />
    {running ? <Shimmer text={text} rgb="94,93,89" /> : <span>{text}</span>}
  </div>
);

export type ClaudeToolItem = {
  label: string;
  tool: string;
  favicon?: string;
  claudeIcon?: boolean;
};

export const ClaudeToolRows: React.FC<{ items: ClaudeToolItem[]; line?: boolean }> = ({
  items,
  line = true,
}) => (
  <div className="cl-tools">
    {line && items.length > 1 ? <div className="cl-tool-line" /> : null}
    {items.map((item) => (
      <div key={`${item.label}-${item.tool}`} className="cl-tool-row">
        {item.claudeIcon ? (
          <span style={{ color: "var(--cl-accent)", display: "inline-flex", width: 16 }}>
            <Starburst size={15} />
          </span>
        ) : (
          <Img src={staticFile(item.favicon ?? "claude/favicon-ryze.png")} />
        )}
        <span>
          <b>{item.label}</b> {item.tool}
        </span>
      </div>
    ))}
  </div>
);

export const ClaudeResponse: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="cl-response">{children}</div>
);

export const ClaudeDisclaimer: React.FC = () => (
  <div className="cl-disclaimer">Claude is AI and can make mistakes. Please double-check responses.</div>
);
