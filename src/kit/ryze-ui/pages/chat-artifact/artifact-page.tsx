import React from "react";
import { RyzeApp } from "../../app-shell";
import "../../pages.css";
import "./chat-artifact.css";
import { ArtifactShell } from "./artifact-shell";
import { ARTIFACT_WORKSPACE } from "./data";

export const ArtifactPage: React.FC<{
  chatTitle: string;
  name: string;
  site?: boolean;
  chat: React.ReactNode;
  children: React.ReactNode;
}> = ({ chatTitle, name, site, chat, children }) => (
  <RyzeApp workspace={ARTIFACT_WORKSPACE} page="Chat" nav="New chat" stretch>
    <ArtifactShell chatTitle={chatTitle} name={name} site={site} chat={chat}>
      {children}
    </ArtifactShell>
  </RyzeApp>
);
