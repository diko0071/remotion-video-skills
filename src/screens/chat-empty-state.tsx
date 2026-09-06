import React from "react";
import { AgentPanel, RyzeApp } from "../kit/ryze-ui/app-shell";
import { Composer } from "../kit/ryze-ui/chat";
import { AlertIcon, ArrowUpRightIcon, NetworkIcon, TrendIcon } from "../kit/ryze-ui/icons";

const SUGGESTIONS = [
  {
    icon: <TrendIcon size={14} strokeWidth={2} />,
    title: "Show this week's top campaigns",
    desc: "Quick performance snapshot across all connected platforms.",
  },
  {
    icon: <AlertIcon size={14} />,
    title: "Where am I overspending?",
    desc: "Find campaigns burning budget without converting.",
  },
  {
    icon: <NetworkIcon size={14} />,
    title: "Compare Meta vs Google ROAS",
    desc: "Cross-platform attribution and efficiency analysis.",
  },
];

export const ChatEmptyState: React.FC<{ agentPanelOpen?: boolean }> = ({
  agentPanelOpen = false,
}) => (
  <RyzeApp panel={agentPanelOpen ? <AgentPanel /> : null}>
    <div className="empty-wrap">
      <div className="empty-inner">
        <div className="welcome">
          <h1>What should we look at today?</h1>
        </div>
        <div className="composer-wrap" style={{ padding: 0 }}>
          <Composer />
        </div>
        <div className="suggestions">
          {SUGGESTIONS.map((s) => (
            <div key={s.title} className="suggestion">
              <span className="top">
                <span className="chip">{s.icon}</span>
                <span className="arrow">
                  <ArrowUpRightIcon size={14} />
                </span>
              </span>
              <span className="s-title">{s.title}</span>
              <span className="s-desc">{s.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </RyzeApp>
);
