import React from "react";
import { Img, staticFile } from "remotion";
import "./grok.css";
import { Bloub, Gaze } from "./bloub";
import { BotAvatar } from "./sidebar";
import { GrokCluster } from "./cluster";
import { ChevronsIcon, GearIcon, MonitorIcon } from "./icons";

export const GrokHeader: React.FC<{
  name: string;
  avatar: BotAvatar;
  cluster?: BotAvatar[];
  gaze?: Gaze;
  blink?: number;
  panelTools?: boolean;
}> = ({ name, avatar, cluster, gaze, blink, panelTools }) => (
  <div className="gk-header">
    {cluster ? (
      <GrokCluster avatars={cluster} size={30} />
    ) : (
      <Bloub size={26} shape={avatar.shape} color={avatar.color} gaze={gaze} blink={blink} />
    )}
    {name}
    <span className="gk-header-tools">
      {panelTools ? (
        <>
          <GearIcon size={20} />
          <ChevronsIcon size={20} />
        </>
      ) : (
        <MonitorIcon size={20} />
      )}
    </span>
  </div>
);

export const GrokInlineBot: React.FC<{ avatar: BotAvatar; name: string }> = ({ avatar, name }) => (
  <span className="gk-inline-bot">
    <Bloub size={16} shape={avatar.shape} color={avatar.color} />
    {name}
  </span>
);

export const GrokSystemRow: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({
  children,
  style,
}) => (
  <div className="gk-system" style={style}>
    {children}
  </div>
);

export const GrokBotMessage: React.FC<{
  name: string;
  avatar: BotAvatar;
  gaze?: Gaze;
  children: React.ReactNode;
  style?: React.CSSProperties;
  id?: string;
}> = ({ name, avatar, gaze, children, style, id }) => (
  <div className="gk-botmsg" style={style} data-click={id}>
    <div className="gk-botmsg-name" style={{ color: avatar.color }}>
      {name}
    </div>
    <div className="gk-botmsg-row">
      <span className="gk-botmsg-avatar">
        <Bloub size={26} shape={avatar.shape} color={avatar.color} gaze={gaze} />
      </span>
      <div className="gk-bubble">{children}</div>
    </div>
  </div>
);

export const GrokThumb: React.FC<{ file: string; width: number; height: number }> = ({ file, width, height }) => (
  <div className="gk-thumb" style={{ width, height }}>
    <Img src={staticFile(file)} />
  </div>
);

export const GrokThumbRow: React.FC<{ files: string[]; size: number; height?: number }> = ({ files, size, height }) => (
  <div className="gk-thumb-row">
    {files.map((f) => (
      <GrokThumb key={f} file={f} width={size} height={height ?? size} />
    ))}
  </div>
);

export const GrokApprovalCard: React.FC<{
  title: string;
  body: string;
  approved: boolean;
  approveId?: string;
  id?: string;
  width?: number;
  icon?: string;
  style?: React.CSSProperties;
}> = ({ title, body, approved, approveId, id, width = 400, icon, style }) => (
  <div className="gk-approval" style={{ width, ...style }} data-click={id}>
    <div className="gk-card-head">
      {icon ? (
        <span style={{ width: 24, height: 24, borderRadius: 7, background: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Img src={staticFile(icon)} style={{ width: 15, height: 15, display: "block" }} />
        </span>
      ) : null}
      <span className="gk-card-title" style={{ fontSize: 16 }}>
        {title}
      </span>
      <span className={"gk-pill" + (approved ? " on" : " warn")}>
        <span className="dot" />
        {approved ? "Approved" : "Approval required"}
      </span>
    </div>
    <div className="gk-approval-body">{body}</div>
    <div className="gk-approval-details">› Show the details</div>
    <div className="gk-card-actions" style={{ position: "relative" }}>
      <span className="gk-btn primary" data-click={approveId} style={{ height: 38, fontSize: 14, visibility: approved ? "hidden" : "visible" }}>
        Approve
      </span>
      <span className="gk-btn" style={{ height: 38, fontSize: 14, visibility: approved ? "hidden" : "visible" }}>
        Deny
      </span>
      {approved ? (
        <div style={{ position: "absolute", left: 0, top: 0, height: 38, display: "flex", alignItems: "center", color: "#1C8A5A", fontSize: 14, fontWeight: 500, whiteSpace: "nowrap" }}>
          Approved. Running now.
        </div>
      ) : null}
    </div>
  </div>
);

export const GrokThread: React.FC<{ children: React.ReactNode; anchored?: boolean }> = ({ children, anchored }) => (
  <div className={"gk-thread" + (anchored ? " anchored" : "")}>{children}</div>
);

export const GrokDay: React.FC<{ text: string }> = ({ text }) => <div className="gk-day">{text}</div>;

export const GrokBubble: React.FC<{
  user?: boolean;
  children: React.ReactNode;
  style?: React.CSSProperties;
  id?: string;
}> = ({ user, children, style, id }) => (
  <div className={"gk-bubble" + (user ? " user" : "")} style={style} data-click={id}>
    {children}
  </div>
);

export const GrokBotCard: React.FC<{
  title: string;
  status: string;
  statusOn?: boolean;
  cover: string;
  description: string;
  primary: string;
  secondary: string;
  width?: number;
  style?: React.CSSProperties;
}> = ({ title, status, statusOn, cover, description, primary, secondary, width = 460, style }) => (
  <div className="gk-card" style={{ width, ...style }}>
    <div className="gk-card-head">
      <span className="gk-card-title">{title}</span>
      <span className={"gk-pill" + (statusOn ? " on" : "")}>
        <span className="dot" />
        {status}
      </span>
    </div>
    <div className="gk-card-cover" style={{ height: (width - 32) * 0.46 }}>
      <Img src={staticFile(cover)} />
    </div>
    <div className="gk-card-desc">{description}</div>
    <div className="gk-card-actions">
      <span className="gk-btn primary">{primary}</span>
      <span className="gk-btn">{secondary}</span>
    </div>
  </div>
);
