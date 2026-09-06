import React from "react";
import { Img, staticFile } from "remotion";
import "./slack.css";
import { SlackIcon } from "./icons";
import { SLACK_AVATARS } from "./assets";

export type SidebarRow =
  | { kind: "link"; icon: string; name: string }
  | { kind: "heading"; name: string }
  | {
      kind: "channel";
      name: string;
      selected?: boolean;
      unread?: boolean;
      badge?: number;
      id?: string;
    }
  | { kind: "dm"; name: string; avatar?: string; unread?: boolean; badge?: number };

export const SLACK_SIDEBAR_DEFAULT: SidebarRow[] = [
  { kind: "link", icon: "threads", name: "Threads" },
  { kind: "link", icon: "headphones", name: "Huddles" },
  { kind: "link", icon: "send-filled", name: "Drafts & sent" },
  { kind: "heading", name: "Starred" },
  { kind: "heading", name: "Channels" },
  { kind: "channel", name: "all-just-for-me" },
  { kind: "channel", name: "new-channel" },
  { kind: "channel", name: "social", selected: true },
  { kind: "heading", name: "Direct Messages" },
  { kind: "heading", name: "Agents & apps" },
  { kind: "dm", name: "Ryze AI", avatar: SLACK_AVATARS.ryze },
  { kind: "dm", name: "Slackbot" },
];

export const SlackSidebar: React.FC<{
  workspace?: string;
  rows?: SidebarRow[];
}> = ({ workspace = "Just for Me", rows = SLACK_SIDEBAR_DEFAULT }) => (
  <div className="sk-sidebar">
    <div className="sk-sidebar-head">
      <span className="name">
        {workspace}
        <SlackIcon name="caret-down" size={18} />
      </span>
      <span className="compose"><SlackIcon name="compose" size={17} /></span>
    </div>
    <div className="sk-sidebar-list">
      {rows.map((r, i) => {
        if (r.kind === "heading") {
          return (
            <div key={i} className="sk-side-heading">
              <span className="caret"><SlackIcon name="caret-down" size={15} /></span>
              <span>{r.name}</span>
            </div>
          );
        }
        if (r.kind === "link") {
          return (
            <div key={i} className="sk-side-row">
              <span className="ic"><SlackIcon name={r.icon} size={17} /></span>
              <span className="nm">{r.name}</span>
            </div>
          );
        }
        if (r.kind === "channel") {
          return (
            <div
              key={i}
              className={`sk-side-row${r.selected ? " sel" : ""}${r.unread ? " unread" : ""}`}
              data-click={r.id}
            >
              <span className="ic"><SlackIcon name="channel" size={16} /></span>
              <span className="nm">{r.name}</span>
              {r.badge ? <span className="badge">{r.badge}</span> : null}
            </div>
          );
        }
        return (
          <div key={i} className={`sk-side-row${r.unread ? " unread" : ""}`}>
            {r.avatar ? (
              <Img className="av" src={staticFile(r.avatar)} />
            ) : (
              <span className="ic"><SlackIcon name="ai-agents" size={16} /></span>
            )}
            <span className="nm">{r.name}</span>
            {r.badge ? <span className="badge">{r.badge}</span> : null}
          </div>
        );
      })}
    </div>
  </div>
);
