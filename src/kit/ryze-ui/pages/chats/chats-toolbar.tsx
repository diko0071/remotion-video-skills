import React from "react";
import { SearchIcon } from "../../icons";
import "../../pages.css";
import "./chats.css";

export const ChatsToolbar: React.FC<{
  tabs?: string[];
  active?: string;
  searchLabel?: string;
  style?: React.CSSProperties;
}> = ({
  tabs = ["Chats", "Agent tasks"],
  active = "Chats",
  searchLabel = "Search chats",
  style,
}) => (
  <div style={style}>
    <div className="chats-tabs">
      {tabs.map((tab) => (
        <span key={tab} className={tab === active ? "t on" : "t"}>
          {tab}
        </span>
      ))}
    </div>

    <div className="chats-search">
      <SearchIcon />
      <span>{searchLabel}</span>
    </div>
  </div>
);
