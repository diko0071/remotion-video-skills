import React from "react";
import "../../pages.css";
import "./org-home.css";

export const OrgHomePageHead: React.FC<{
  title?: string;
  sub?: string;
  style?: React.CSSProperties;
}> = ({
  title = "Home",
  sub = "Connect Claude, explore plays, and put your marketing on autopilot.",
  style,
}) => (
  <div className="pg-head" style={style}>
    <div>
      <h1 className="pg-h1">{title}</h1>
      <p className="pg-sub">{sub}</p>
    </div>
  </div>
);
