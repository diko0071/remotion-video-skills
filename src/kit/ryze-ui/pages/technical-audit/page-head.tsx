import React from "react";
import { SparkIcon } from "../../icons";
import "../../pages.css";
import "./technical-audit.css";
import { HelpIcon, RefreshIcon } from "./icons";

export const AuditPageHead: React.FC<{ fixPressed?: number; scanning?: boolean }> = ({
  scanning,
  fixPressed = 1,
}) => (
  <div className="pg-head">
    <div>
      <div className="pg-h1">Technical Audit</div>
      <div className="pg-sub">
        Identifies issues that can block Google and ChatGPT from reading and
        ranking your site
      </div>
    </div>
    <div className="pg-actions">
      <span className="ta-iconbtn">
        <HelpIcon />
      </span>
      <span className="btn-outline" data-click="ta.run-scan">
        <RefreshIcon />
        {scanning ? "Scanning…" : "Run Scan"}
      </span>
      <span
        className="btn-primary"
        data-click="fix-with-agent"
        style={{ transform: `scale(${fixPressed})` }}
      >
        <SparkIcon />
        Fix with agent
      </span>
    </div>
  </div>
);
