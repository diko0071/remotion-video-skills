import React from "react";
import { RyzeApp } from "../../app-shell";
import "./chat-empty.css";
import { ChatEmptyStage } from "./stage";

export const ChatEmptyPage: React.FC = () => (
  <RyzeApp workspace="ember-and-oak" page="Chat" nav="New chat" stretch>
    <ChatEmptyStage />
  </RyzeApp>
);
