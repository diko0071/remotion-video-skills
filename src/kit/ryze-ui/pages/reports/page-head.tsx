import React from "react";
import { SparkIcon } from "../../icons";
import "../../pages.css";
import "./reports.css";
import { LayoutGridGlyph, SearchGlyph } from "./icons";

export const ReportsPageHead: React.FC<{
  title?: string;
  sub?: string;
  style?: React.CSSProperties;
}> = ({
  title = "Reports",
  sub = "Performance reports built by your AI marketer.",
  style,
}) => (
  <div className="pg-head" style={style}>
    <div>
      <div className="pg-h1">{title}</div>
      <div className="pg-sub">{sub}</div>
    </div>
    <div className="pg-actions">
      <span className="btn-outline">
        <LayoutGridGlyph />
        View templates
      </span>
      <span className="btn-primary">
        <SparkIcon size={14} />
        Generate Report
      </span>
    </div>
  </div>
);

export const ReportsSearch: React.FC<{
  label?: string;
  style?: React.CSSProperties;
}> = ({ label = "Search reports", style }) => (
  <div className="rep-search" style={style}>
    <SearchGlyph />
    <span>{label}</span>
  </div>
);
