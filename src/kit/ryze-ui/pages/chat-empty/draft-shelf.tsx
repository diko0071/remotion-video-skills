import React from "react";
import "./chat-empty.css";
import {
  DashboardIcon,
  ImagesIcon,
  PresentationIcon,
  RocketIcon,
  ZapIcon,
} from "./icons";
import { QuickAction } from "./types";

export const ACTION_ICON: Record<string, React.ReactNode> = {
  campaign: <RocketIcon />,
  creatives: <ImagesIcon />,
  deck: <PresentationIcon />,
  dashboard: <DashboardIcon />,
  automate: <ZapIcon />,
};

export const ChatEmptyDraftShelf: React.FC<{
  actions: QuickAction[];
  active?: string;
  style?: React.CSSProperties;
}> = ({ actions, active = "campaign", style }) => (
  <div className="ce-draft-shelf" style={style}>
    <div className="ce-draft-inner">
      {actions.map((a) => (
        <span key={a.key} className={`ce-chip${a.key === active ? " on" : ""}`}>
          <span className="ce-chip-icon">{ACTION_ICON[a.key]}</span>
          {a.key === active ? (
            <span className="ce-chip-label">{a.label}</span>
          ) : null}
        </span>
      ))}
    </div>
  </div>
);
