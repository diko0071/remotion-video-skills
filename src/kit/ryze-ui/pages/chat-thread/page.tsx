import React from "react";
import { RyzeApp } from "../../app-shell";
import { ChatPage } from "../../chat-page";
import { Composer } from "../../composer";
import "./chat-thread.css";
import { THREAD_TITLE } from "./data";
import { ThreadAssistantMessage, ThreadUserMessage } from "./thread-messages";

export const ChatThreadPage: React.FC = () => (
  <RyzeApp workspace="ember-and-oak" page="Chat" nav="New chat" stretch>
    <ChatPage
      title={THREAD_TITLE}
      composer={<Composer disclaimer approval="Skip" />}
    >
      <ThreadUserMessage />
      <ThreadAssistantMessage />
    </ChatPage>
  </RyzeApp>
);
