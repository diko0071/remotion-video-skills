import React from "react";
import { SparkIcon } from "../../icons";
import "../../pages.css";
import "./backlinks.css";
import { HelpIcon, SettingsIcon } from "./icons";

export const BacklinksHead: React.FC<{
  title?: string;
  sub?: string;
  action?: string;
  style?: React.CSSProperties;
}> = ({
  title = "Mentions",
  sub = "Press placements and guest posts",
  action = "Improve Mentions",
  style,
}) => (
  <div className="pg-head" style={style}>
    <div>
      <div className="pg-h1">{title}</div>
      <div className="pg-sub">{sub}</div>
    </div>
    <div className="pg-actions">
      <span className="mn-iconbtn">
        <SettingsIcon />
      </span>
      <span className="mn-iconbtn">
        <HelpIcon />
      </span>
      <span className="btn-primary">
        <SparkIcon />
        {action}
      </span>
    </div>
  </div>
);
