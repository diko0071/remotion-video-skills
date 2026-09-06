import React from "react";
import { ChevronRight } from "../../icons";
import "../../pages.css";
import "./chat-artifact.css";

export const ToolGroup: React.FC<{
  summary: string;
  rows: string[];
  style?: React.CSSProperties;
}> = ({ summary, rows, style }) => (
  <div className="ca-group" style={style}>
    <div className="ca-group-head">
      <span className="ca-chev open">
        <ChevronRight size={16} />
      </span>
      <span className="ca-group-label">{summary}</span>
    </div>
    <div className="ca-group-rows">
      {rows.map((row) => (
        <div key={row} className="ca-tool-row">
          <span className="ca-chev">
            <ChevronRight size={16} />
          </span>
          <span className="ca-tool-label">{row}</span>
        </div>
      ))}
    </div>
  </div>
);
