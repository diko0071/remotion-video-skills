import React from "react";
import { SearchIcon, SparkIcon } from "../../icons";
import "./creatives.css";

export const CreativesPageHead: React.FC<{
  title?: string;
  sub?: string;
  action?: string;
  style?: React.CSSProperties;
}> = ({
  title = "Ad Creatives",
  sub = "AI-generated ad creatives for this workspace. Generate new ones from the AI Analyst chat.",
  action = "Generate Creative",
  style,
}) => (
  <div className="pg-head" style={style}>
    <div>
      <h1 className="pg-h1 plain">{title}</h1>
      <p className="pg-sub plain">{sub}</p>
    </div>
    <div className="pg-actions">
      <span className="btn-primary" data-click="crv.generate">
        <SparkIcon />
        {action}
      </span>
    </div>
  </div>
);

export const CreativesSearchBar: React.FC<{
  label?: string;
  style?: React.CSSProperties;
}> = ({ label = "Search creatives", style }) => (
  <div className="crv-bar" style={style}>
    <span className="search-box">
      <SearchIcon />
      {label}
    </span>
  </div>
);
