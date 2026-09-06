import React from "react";
import { PlugIcon } from "../../icons";
import "./pipeline-gate.css";

export const GateEmptyState: React.FC<{
  title: string;
  description: string;
  action?: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ title, description, action, style }) => (
  <div className="gate-empty" style={style}>
    <div className="g-icon">
      <PlugIcon />
    </div>
    <div className="g-title">{title}</div>
    <div className="g-desc">{description}</div>
    {action ? <div className="g-action">{action}</div> : null}
  </div>
);
