import React from "react";
import "./ad-templates.css";

export const AdTemplatesPageHead: React.FC<{
  title?: string;
  sub?: string;
  style?: React.CSSProperties;
}> = ({
  title = "Ad Templates",
  sub = "Browse ad templates, pick the ones you like, and send them to the AI Analyst to make similar creatives.",
  style,
}) => (
  <div className="pg-head" style={style}>
    <div>
      <h1 className="pg-h1 plain">{title}</h1>
      <p className="pg-sub plain">{sub}</p>
    </div>
  </div>
);
