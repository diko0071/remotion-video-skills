import React from "react";
import { PlusIcon } from "../../icons";
import "../../pages.css";
import "./chats.css";

export const ChatsPageHead: React.FC<{
  title?: string;
  subtitle?: string;
  action?: string;
  style?: React.CSSProperties;
}> = ({
  title = "Chats",
  subtitle = "Your conversation history with the AI analyst.",
  action = "New chat",
  style,
}) => (
  <div className="pg-head" style={style}>
    <div>
      <h1 className="pg-h1">{title}</h1>
      <p className="pg-sub">{subtitle}</p>
    </div>
    <div className="pg-actions">
      <span className="btn-primary">
        <PlusIcon />
        {action}
      </span>
    </div>
  </div>
);
