import React from "react";
import { ChevronRight } from "../../icons";
import "./chat-thread.css";

export const ToolRunGroup: React.FC<{
  summary: string;
  rows: string[];
  style?: React.CSSProperties;
}> = ({ summary, rows, style }) => (
  <div className="ct-group" style={style}>
    <div className="ct-group-head">
      <span className="ct-chev open">
        <ChevronRight size={16} />
      </span>
      <span className="ct-group-label">{summary}</span>
    </div>
    <div className="ct-group-rows">
      {rows.map((row) => (
        <div key={row} className="ct-tool-row">
          <span className="ct-chev">
            <ChevronRight size={16} />
          </span>
          <span className="ct-tool-label">{row}</span>
        </div>
      ))}
    </div>
  </div>
);
