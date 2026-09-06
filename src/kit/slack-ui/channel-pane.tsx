import React from "react";
import { Img, staticFile } from "remotion";
import "./slack.css";
import { SlackIcon } from "./icons";
import { SLACK_AVATARS } from "./assets";

export const SlackPanes: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="sk-panes">{children}</div>
);

export const SlackChannelHeader: React.FC<{
  name: string;
  memberAvatars?: string[];
  memberCount?: number;
  huddleId?: string;
  huddleActive?: boolean;
}> = ({ name, memberAvatars = [SLACK_AVATARS.dmitry, SLACK_AVATARS.ryze], memberCount = 2, huddleId, huddleActive }) => (
  <div className="sk-pane-header">
    <span className="title">
      <SlackIcon name="channel" size={16} style={{ marginRight: 2 }} />
      {name}
      <SlackIcon name="caret-down" size={17} color="#616061" />
    </span>
    <span className="spacer" />
    <span className="members">
      {memberAvatars.map((a) => (
        <Img key={a} src={staticFile(a)} />
      ))}
      <span className="cnt">{memberCount}</span>
    </span>
    <span className={`hbtn${huddleActive ? " active" : ""}`} data-click={huddleId}><SlackIcon name="headphones" size={18} /></span>
    <span className="hbtn"><SlackIcon name="ellipsis-vertical-filled" size={18} /></span>
  </div>
);

export const SlackChannelPane: React.FC<{
  name?: string;
  header?: React.ReactNode;
  children: React.ReactNode;
  composer?: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ name = "social", header, children, composer, style }) => (
  <div className="sk-pane primary" style={style}>
    {header ?? <SlackChannelHeader name={name} />}
    <div className="sk-msgs">{children}</div>
    {composer ? <div className="sk-composer-wrap">{composer}</div> : null}
  </div>
);
