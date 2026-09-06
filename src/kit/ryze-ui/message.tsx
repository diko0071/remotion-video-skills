import React from "react";
import { Img, staticFile } from "remotion";
import { CopyIcon, CreditsIcon } from "./icons";
import { Shimmer } from "../../core/motion";

export const UserMessage: React.FC<{
  children: React.ReactNode;
  attachments?: string[];
  attachmentSize?: number;
  attachmentsNode?: React.ReactNode;
}> = ({ children, attachments, attachmentSize = 52, attachmentsNode }) => (
  <div>
    {attachmentsNode ? (
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 8,
          marginBottom: 8,
        }}
      >
        {attachmentsNode}
      </div>
    ) : null}
    {attachments?.length ? (
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 8,
          marginBottom: 8,
        }}
      >
        {attachments.map((file) => (
          <Img
            key={file}
            src={staticFile(file)}
            style={{
              width: attachmentSize,
              height: attachmentSize,
              borderRadius: 8,
              objectFit: "contain",
              background: "#0A0E22",
              border: "1px solid var(--border)",
            }}
          />
        ))}
      </div>
    ) : null}
    <div className="msg-user" data-click="msg.user">
      <div className="bubble" data-click="msg.user.bubble">{children}</div>
    </div>
  </div>
);

export const AssistantMessage: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="msg-assistant" data-click="msg.assistant">
    <div className="blocks">{children}</div>
  </div>
);

export const Markdown: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="md">{children}</div>
);

export const MessageActions: React.FC = () => (
  <div className="msg-actions">
    <div className="act">
      <CopyIcon />
    </div>
    <div className="act">
      <CreditsIcon />
    </div>
  </div>
);

export const Thinking: React.FC<{ animated?: boolean }> = ({ animated = true }) => (
  <div className="thinking">{animated ? <Shimmer text="Thinking..." /> : "Thinking..."}</div>
);
