import React from "react";
import { MenuDotsIcon } from "./icons";

export const ChatHeader: React.FC<{ title: string }> = ({ title }) => (
  <header className="chat-header">
    <h1>{title}</h1>
    <div className="menu-btn">
      <MenuDotsIcon />
    </div>
  </header>
);
