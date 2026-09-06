import React from "react";
import { Img, staticFile } from "remotion";
import "./grok.css";
import { Bloub } from "./bloub";
import type { BotAvatar } from "./sidebar";
import { ChevronsIcon, ClockIcon, GearIcon, PlusIcon } from "./icons";

export const GrokPanel: React.FC<{
  width: number;
  innerWidth: number;
  children: React.ReactNode;
  tools?: boolean;
}> = ({ width, innerWidth, children, tools = true }) => (
  <div className="gk-panel" style={{ width }}>
    <div className="gk-panel-inner" style={{ width: innerWidth, height: "100%" }}>
      <div className="gk-panel-top">
        {tools ? (
          <>
            <GearIcon size={20} />
            <ChevronsIcon size={20} />
          </>
        ) : null}
      </div>
      {children}
    </div>
  </div>
);

export const GrokMembers: React.FC<{
  members: { name: string; avatar: BotAvatar; gaze?: { x: number; y: number } }[];
}> = ({ members }) => (
  <>
    <div className="gk-panel-h" style={{ fontWeight: 500, color: "var(--gk-text-2)" }}>
      Members
    </div>
    {members.map((m) => (
      <div key={m.name} className="gk-member">
        <Bloub size={30} shape={m.avatar.shape} color={m.avatar.color} gaze={m.gaze} />
        {m.name}
      </div>
    ))}
    <div className="gk-member" style={{ color: "var(--gk-text-2)" }}>
      <span style={{ width: 30, display: "flex", justifyContent: "center" }}>
        <PlusIcon size={18} />
      </span>
      Add Member
    </div>
  </>
);

export const GrokRoutinesEmpty: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <div className="gk-routines-empty" style={style}>
    <div>Routines are recurring tasks this Bot runs on a schedule.</div>
    <span className="gk-btn">Create Routine</span>
  </div>
);

const DOCK = ["#4285F4", "#E8453C", "#2B2B2E"];

export const GrokScreen: React.FC<{ file: string; caption: string; url: string; tab: string; height: number }> = ({
  file,
  caption,
  url,
  tab,
  height,
}) => (
  <>
    <div className="gk-screen">
      <div className="gk-screen-bar">
        <span className="gk-tab">{tab}</span>
        <span className="gk-url" style={{ flex: 1 }}>
          {url}
        </span>
      </div>
      <div className="gk-screen-body" style={{ height }}>
        <Img src={staticFile(file)} />
        <span className="gk-dock">
          {DOCK.map((c) => (
            <span key={c} style={{ background: c }} />
          ))}
        </span>
      </div>
    </div>
    <div className="gk-caption">{caption}</div>
  </>
);

export const GrokRoutines: React.FC<{
  items: { title: string; sub: string; style?: React.CSSProperties; id?: string }[];
}> = ({
  items,
}) => (
  <>
    <div className="gk-panel-h">
      Routines
      <span className="plus">
        <PlusIcon size={20} />
      </span>
    </div>
    {items.map((it) => (
      <div key={it.title} className="gk-routine" style={it.style} data-click={it.id}>
        <span className="gk-routine-icon">
          <ClockIcon size={13} />
        </span>
        <span>
          <div className="gk-routine-title">{it.title}</div>
          <div className="gk-routine-sub">{it.sub}</div>
        </span>
      </div>
    ))}
  </>
);
