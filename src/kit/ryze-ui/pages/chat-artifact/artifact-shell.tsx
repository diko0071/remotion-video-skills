import React from "react";
import { ChatPage } from "../../chat-page";
import { Composer } from "../../composer";
import { CloseIcon, ExpandDiagIcon } from "../../icons";
import "../../pages.css";
import "./chat-artifact.css";
import { ExternalLinkIcon, RefreshIcon } from "./icons";

export const HeadButton: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <span className="ca-hbtn">{children}</span>;

export const ArtifactShell: React.FC<{
  chatTitle: string;
  chat: React.ReactNode;
  name: string;
  site?: boolean;
  progress?: number;
  chatClassName?: string;
  composer?: React.ReactNode;
  actions?: React.ReactNode;
  children: React.ReactNode;
}> = ({
  chatTitle,
  chat,
  name,
  site = false,
  progress = 1,
  chatClassName,
  composer,
  actions,
  children,
}) => (
  <div className="ca-row">
    <div className="ca-chat">
      <ChatPage
        title={chatTitle}
        className={chatClassName}
        composer={composer ?? <Composer disclaimer />}
      >
        {chat}
      </ChatPage>
    </div>
    <div className="ca-panel" style={{ width: `${70 * progress}%` }}>
      <div
        className="ca-panel-inner"
        style={{
          width: "70vw",
          transform: `translateX(${(1 - progress) * 100}%)`,
          opacity: progress > 0.02 ? 1 : 0,
        }}
      >
        <header className="ca-panel-head">
          <h2>{name}</h2>
          {actions}
          <HeadButton>
            <ExpandDiagIcon size={16} />
          </HeadButton>
          {site && (
            <HeadButton>
              <RefreshIcon />
            </HeadButton>
          )}
          <HeadButton>
            <ExternalLinkIcon />
          </HeadButton>
          <HeadButton>
            <CloseIcon size={16} />
          </HeadButton>
        </header>
        <div className={site ? "ca-panel-body site" : "ca-panel-body"}>
          {children}
        </div>
      </div>
    </div>
  </div>
);
