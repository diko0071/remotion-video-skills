import React from "react";
import "../../pages.css";
import "./chats.css";
import { Chat } from "./types";

export const ChatsList: React.FC<{
  chats: Chat[];
  style?: React.CSSProperties;
}> = ({ chats, style }) => (
  <div className="chats-list" style={style}>
    {chats.map((c) => (
      <div className="chat-row" key={c.title}>
        <span className="c-title">{c.title}</span>
        <span className="c-when">{c.when}</span>
      </div>
    ))}
  </div>
);
