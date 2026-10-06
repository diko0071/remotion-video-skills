import React from "react";
import { Img, staticFile } from "remotion";
import "./muse.css";
import { museFont } from "./font";
import { AppsIcon, BulbIcon, ChatIcon, EqualsIcon, GiftIcon, MenuIcon, NotesIcon, SearchIcon, TaskIcon } from "./icons";

export const MuseFrame: React.FC<{
  panel?: React.ReactNode;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ panel, children, style }) => (
  <div className="muse-ui" style={{ fontFamily: museFont, ...style }}>
    <MuseRail />
    <div className="mu-main">{children}</div>
    {panel}
  </div>
);

export const MuseRail: React.FC<{ active?: number; unread?: boolean; userAvatar?: string }> = ({ active = 0, unread, userAvatar }) => {
  const icons = [ChatIcon, SearchIcon, NotesIcon, BulbIcon, TaskIcon, AppsIcon];
  return (
    <div className="mu-rail">
      {icons.map((Icon, i) => (
        <span key={i} className={"mu-rail-icon" + (i === active ? " active" : "")}>
          <Icon size={30} />
          {i === 0 && unread ? <span className="mu-rail-dot" /> : null}
        </span>
      ))}
      <span className="mu-rail-sep" />
      {userAvatar ? (
        <span className="mu-rail-avatar">
          <Img src={staticFile(userAvatar)} />
        </span>
      ) : null}
      <span className="mu-rail-foot">
        <EqualsIcon size={30} />
      </span>
    </div>
  );
};

export const MuseTopbar: React.FC<{ title?: string; invite?: boolean }> = ({ title = "Chats", invite = true }) => (
  <div className="mu-topbar">
    <span className="mu-chip">
      <MenuIcon size={22} />
      {title}
    </span>
    {invite ? (
      <span className="mu-chip right">
        <GiftIcon size={20} />
        Invite
      </span>
    ) : null}
  </div>
);
