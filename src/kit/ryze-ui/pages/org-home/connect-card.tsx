import React from "react";
import { Img, staticFile } from "remotion";
import { CopyIcon } from "../../icons";
import "../../pages.css";
import "./org-home.css";
import { MCP_URL } from "./data";

export const OrgConnectCard: React.FC<{
  url?: string;
  title?: string;
  body?: string;
  style?: React.CSSProperties;
}> = ({
  url = MCP_URL,
  title = "Connect Claude to your marketing data",
  body = "Plug Ryze into Claude.ai and chat with your ad accounts, analytics, and search data wherever you already work.",
  style,
}) => (
  <div className="pg-card oh-connect" style={style}>
    <div className="oh-connect-body">
      <h2>{title}</h2>
      <p>{body}</p>
      <div className="oh-url">
        <span>{url}</span>
      </div>
      <div className="oh-connect-actions">
        <span className="btn-primary btn-sm">
          <CopyIcon />
          Copy link
        </span>
        <span className="btn-ghost">See instructions</span>
      </div>
    </div>
    <div className="oh-connect-art">
      <Img src={staticFile("home/banner.webp")} />
    </div>
  </div>
);
