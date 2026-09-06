import React from "react";
import "./claude.css";
import { grotesk, serif } from "./font";
import { IncognitoIcon, Starburst } from "./icons";

export const ClaudeFrame: React.FC<{
  children: React.ReactNode;
  header?: boolean;
  sidebar?: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ children, header = true, sidebar, style }) => (
  <div
    className="claude-ui"
    style={{
      fontFamily: grotesk,
      ["--cl-serif" as never]: serif,
      display: "flex",
      flexDirection: sidebar ? "row" : "column",
      width: "100%",
      height: "100%",
      ...style,
    }}
  >
    {sidebar}
    <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
      {header ? (
        <div className="cl-header">
          <span className="cl-icon-btn">
            <IncognitoIcon />
          </span>
        </div>
      ) : null}
      {children}
    </div>
  </div>
);

export const ClaudeWelcome: React.FC<{ text?: string }> = ({ text = "Let’s noodle" }) => (
  <div className="cl-welcome">
    <span className="star">
      <Starburst size={34} />
    </span>
    <span>{text}</span>
  </div>
);
