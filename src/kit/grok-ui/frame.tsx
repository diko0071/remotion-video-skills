import React from "react";
import "./grok.css";
import { grokFont } from "./font";

export const GrokFrame: React.FC<{
  sidebar?: React.ReactNode;
  panel?: React.ReactNode;
  children: React.ReactNode;
  style?: React.CSSProperties;
  dark?: boolean;
}> = ({ sidebar, panel, children, style, dark }) => (
  <div
    className={"grok-ui" + (dark ? " dark" : "")}
    style={{ fontFamily: grokFont, display: "flex", width: "100%", height: "100%", ...style }}
  >
    {sidebar}
    <div className="gk-main">{children}</div>
    {panel}
  </div>
);
