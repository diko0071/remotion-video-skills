import React from "react";
import { useClickPress } from "../../core/press-context";
import { Composer } from "./composer";
import {
  ArrowUpRightIcon,
  ChevronDownIcon,
  CloseIcon,
  ExpandIcon,
  PlusIcon,
  SparkIcon,
} from "./icons";

const AGENT_SUGGESTIONS = [
  "Show this week's top campaigns",
  "Where am I overspending?",
  "Compare Meta vs Google ROAS",
];

export const AgentPanel: React.FC<{
  open?: boolean;
  width?: number;
  progress?: number;
  title?: string;
  children?: React.ReactNode;
  composer?: React.ReactNode;
  actionsOpacity?: number;
  scrollPx?: number;
}> = ({
  open = true,
  width = 480,
  progress = 1,
  title = "New chat",
  children,
  composer,
  actionsOpacity = 1,
  scrollPx = 0,
}) => {
  const expandScale = useClickPress("agent.expand");
  const closeScale = useClickPress("agent.close");
  return (
    <aside
      style={{
        flexShrink: 0,
        width: open ? width * progress : 0,
        overflow: "hidden",
        background: "var(--background)",
      }}
    >
      <div
        data-click="agent.panel"
        style={{
          display: "flex",
          height: "100%",
          width,
          marginLeft: "auto",
          flexDirection: "column",
          borderLeft: "1px solid var(--border)",
        }}
      >
        <div className="agent-header">
          <span className="spark">
            <SparkIcon />
          </span>
          <span className="agent-title-btn">
            <span>{title}</span>
            <ChevronDownIcon size={14} />
          </span>
          <span className="agent-spacer" />
          <span
            style={{
              display: "flex",
              alignItems: "center",
              opacity: actionsOpacity,
            }}
          >
            <span className="agent-hbtn">
              <PlusIcon />
            </span>
            <span
              className="agent-hbtn"
              data-click="agent.expand"
              style={{ scale: String(expandScale) }}
            >
              <ExpandIcon />
            </span>
            <span
              className="agent-hbtn"
              data-click="agent.close"
              style={{ scale: String(closeScale) }}
            >
              <CloseIcon />
            </span>
          </span>
        </div>
        <div className="agent-body" style={{ overflow: "hidden" }}>
          <div style={{ marginTop: -scrollPx }}>
          {children !== undefined ? children : AGENT_SUGGESTIONS.map((s) => (
              <span key={s} className="agent-suggest">
                <span>{s}</span>
                <ArrowUpRightIcon size={14} />
              </span>
          ))}
          </div>
        </div>
        <div className="agent-composer">{composer ?? <Composer />}</div>
      </div>
    </aside>
  );
};
