import React from "react";
import { Img, staticFile } from "remotion";
import { loadFont as loadLato } from "@remotion/google-fonts/Lato";
import "./slack.css";
import { SlackIcon } from "./icons";
import { SLACK_AVATARS } from "./assets";

const { fontFamily: lato } = loadLato("normal", { weights: ["400", "700", "900"] });

export const slackFont = lato;

const RAIL_TABS = [
  { key: "home", label: "Home", icon: "home-filled" },
  { key: "dms", label: "DMs", icon: "direct-messages" },
  { key: "activity", label: "Activity", icon: "notifications" },
  { key: "files", label: "Files", icon: "canvas-browser" },
  { key: "more", label: "More", icon: "ellipsis-horizontal-filled" },
] as const;

export const SlackFrame: React.FC<{
  children: React.ReactNode;
  workspace?: string;
  activeTab?: string;
  userAvatar?: string;
  style?: React.CSSProperties;
}> = ({ children, workspace = "Just for Me", activeTab = "home", userAvatar = SLACK_AVATARS.dmitry, style }) => (
  <div className="slack-ui" style={{ fontFamily: lato, ...style }}>
    <div className="sk-topnav">
      <div className="nav-btns">
        <span className="nav-btn dim"><SlackIcon name="arrow-left" size={20} /></span>
        <span className="nav-btn dim"><SlackIcon name="arrow-right" size={20} /></span>
        <span className="nav-btn"><SlackIcon name="clock" size={18} /></span>
      </div>
      <div className="sk-search">
        <SlackIcon name="search" size={14} />
        <span>Search {workspace}</span>
      </div>
      <div className="right">
        <span className="nav-btn"><SlackIcon name="help-icon" size={18} /></span>
      </div>
    </div>
    <div className="sk-body">
      <div className="sk-rail">
        <div className="ws-avatar">{workspace.slice(0, 1).toUpperCase()}</div>
        {RAIL_TABS.map((t) => (
          <div key={t.key} className={`tab${t.key === activeTab ? " on" : ""}`}>
            <span className="ic"><SlackIcon name={t.icon} size={20} /></span>
            <span className="lb">{t.label}</span>
          </div>
        ))}
        <div className="spacer" />
        <div className="create"><SlackIcon name="plus" size={18} /></div>
        <div className="me">
          <Img src={staticFile(userAvatar)} />
          <span className="dot" />
        </div>
      </div>
      {children}
    </div>
  </div>
);
