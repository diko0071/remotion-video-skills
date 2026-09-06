import React from "react";
import { ChatHeader } from "./chat-header";
import { Composer } from "./composer";

export const ChatPage: React.FC<{
  title: string;
  children: React.ReactNode;
  composer?: React.ReactNode;
  className?: string;
  scrollPx?: number;
}> = ({ title, children, composer, className, scrollPx = 0 }) => (
  <div className={className ? `chat-page ${className}` : "chat-page"}>
    <ChatHeader title={title} />
    <div className="chat-scroll" style={{ overflow: "hidden" }}>
      <div className="chat-messages" style={{ marginTop: -scrollPx }}>
        {children}
      </div>
    </div>
    {composer ?? <Composer disclaimer />}
  </div>
);
