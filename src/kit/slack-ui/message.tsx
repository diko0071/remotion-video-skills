import React from "react";
import { Img, staticFile } from "remotion";
import "./slack.css";
import { SlackIcon } from "./icons";
import { SLACK_AVATARS } from "./assets";

export const SlackMention: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="sk-mention">{children}</span>
);

export const SlackReactions: React.FC<{
  items: { emoji: string; count: number; mine?: boolean }[];
}> = ({ items }) => (
  <div className="sk-reactions">
    {items.map((r, i) => (
      <span key={i} className={`sk-reaction${r.mine ? " mine" : ""}`}>
        <Img src={staticFile(r.emoji)} />
        {r.count}
      </span>
    ))}
    <span className="sk-reaction"><SlackIcon name="emoji" size={15} /></span>
  </div>
);

export const SlackThreadBar: React.FC<{
  count: number;
  avatars?: string[];
  lastReply?: string;
}> = ({ count, avatars = [SLACK_AVATARS.ryze], lastReply = "Last reply today" }) => (
  <div className="sk-threadbar">
    {avatars.map((a) => (
      <Img key={a} src={staticFile(a)} />
    ))}
    <span className="cnt">{count === 1 ? "1 reply" : `${count} replies`}</span>
    <span className="last">{lastReply}</span>
  </div>
);

export const SlackMessage: React.FC<{
  avatar: string;
  sender: string;
  badge?: "APP" | "AGENT";
  time: string;
  children: React.ReactNode;
  extra?: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ avatar, sender, badge, time, children, extra, style }) => (
  <div className="sk-msg" style={style}>
    <Img className="avatar" src={staticFile(avatar)} />
    <div className="body">
      <div className="head">
        <span className="sender">{sender}</span>
        {badge ? <span className="app-badge">{badge}</span> : null}
        <span className="time">{time}</span>
      </div>
      <div className="text">{children}</div>
      {extra}
    </div>
  </div>
);

export const SlackDateDivider: React.FC<{ label: string }> = ({ label }) => (
  <div className="sk-date-divider">
    <span className="line" />
    <span className="pill">
      {label}
      <SlackIcon name="caret-down" size={14} color="#616061" />
    </span>
    <span className="line" />
  </div>
);

export const SlackForeword: React.FC<{
  name?: string;
  title?: string;
  description?: string;
}> = ({
  name = "social",
  title,
  description = "Other channels are for work. This one’s just for fun. Get to know your teammates and show your lighter side.",
}) => (
  <div className="sk-foreword">
    <div className="big-icon"><SlackIcon name="channel-filled" size={34} /></div>
    <h1>{title ?? `Have a little chit-chat in #${name}`}</h1>
    <p>{description}</p>
  </div>
);
