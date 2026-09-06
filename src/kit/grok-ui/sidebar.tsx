import React from "react";
import "./grok.css";
import { Bloub, BloubForm, Gaze } from "./bloub";
import { GrokCluster } from "./cluster";
import { CollapseIcon, PlugIcon, PlusIcon, SearchIcon } from "./icons";

export const SB_W = 280;
export const SB_TOP = 60;
export const SB_SEARCH_H = 40;
export const SB_SEARCH_MB = 12;
export const ROW_H = 76;
export const ROW_PAD = 12;
export const LIST_PAD = 8;
export const AVATAR = 46;

export const sidebarAvatarRect = (i: number) => ({
  x: LIST_PAD + ROW_PAD,
  y: SB_TOP + SB_SEARCH_H + SB_SEARCH_MB + i * ROW_H + (ROW_H - AVATAR) / 2,
  size: AVATAR,
});

export type BotAvatar = { shape: BloubForm; color: string };

export type GrokBotRow = {
  name: string;
  preview: React.ReactNode;
  time?: string;
  unread?: boolean;
  active?: boolean;
  avatar: BotAvatar;
  cluster?: BotAvatar[];
  gaze?: Gaze;
  blink?: number;
  avatarHidden?: boolean;
  style?: React.CSSProperties;
  id?: string;
};

const LIGHTS = ["#FF5F57", "#FEBC2E", "#28C840"];

export const GrokSidebar: React.FC<{ rows: GrokBotRow[]; user?: string; initials?: string }> = ({
  rows,
  user = "Dmitry Korzhov",
  initials = "DK",
}) => (
  <aside className="gk-sidebar" style={{ width: SB_W }}>
    <div className="gk-sb-top" style={{ height: SB_TOP }}>
      <span className="gk-lights">
        {LIGHTS.map((c) => (
          <span key={c} className="gk-light" style={{ background: c }} />
        ))}
      </span>
      <span className="gk-sb-chrome">
        <CollapseIcon size={18} />
        <PlusIcon size={18} />
      </span>
    </div>
    <div className="gk-search" style={{ height: SB_SEARCH_H, marginBottom: SB_SEARCH_MB }}>
      <SearchIcon size={17} />
      Search
    </div>
    <div className="gk-list" data-click="sb.list" style={{ padding: `0 ${LIST_PAD}px` }}>
      {rows.map((r) => (
        <div
          key={r.name}
          className={"gk-row" + (r.active ? " active" : "")}
          style={{ height: ROW_H, padding: `0 ${ROW_PAD}px`, ...r.style }}
          data-click={r.id}
        >
          <span style={{ width: AVATAR, height: AVATAR, flexShrink: 0, opacity: r.avatarHidden ? 0 : 1 }}>
            {r.cluster ? (
              <GrokCluster avatars={r.cluster} size={AVATAR} />
            ) : (
              <Bloub size={AVATAR} shape={r.avatar.shape} color={r.avatar.color} gaze={r.gaze} blink={r.blink} />
            )}
          </span>
          <span className="gk-row-body">
            <span className="gk-row-head">
              <span className="gk-row-name">{r.name}</span>
              {r.time ? <span className="gk-row-time">{r.time}</span> : null}
            </span>
            <span className="gk-row-preview">
              <span style={{ minWidth: 0, overflow: "hidden", textOverflow: "ellipsis" }}>{r.preview}</span>
              {r.unread ? <span className="gk-unread" /> : null}
            </span>
          </span>
        </div>
      ))}
    </div>
    <div className="gk-sb-foot">
      <span className="gk-foot-row">
        <span className="gk-foot-icon">
          <PlugIcon size={16} />
        </span>
        Plugins
      </span>
      <span className="gk-foot-row">
        <span className="gk-foot-avatar">{initials}</span>
        {user}
      </span>
    </div>
  </aside>
);
