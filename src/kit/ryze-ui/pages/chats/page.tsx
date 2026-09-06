import React from "react";
import { RyzeApp } from "../../app-shell";
import "../../pages.css";
import "./chats.css";
import { ChatsList } from "./chats-list";
import { ChatsPager } from "./chats-pager";
import { ChatsToolbar } from "./chats-toolbar";
import { CHATS } from "./data";
import { ChatsPageHead } from "./page-head";

export const ChatsPage: React.FC = () => (
  <RyzeApp
    workspace="ember-and-oak"
    page="Chats"
    nav="Chat History"
    credits="4,180"
    stretch
  >
    <div className="pg">
      <div className="pg-scroll">
        <div className="pg-inner wide">
          <ChatsPageHead />
          <ChatsToolbar />
          <ChatsList chats={CHATS} />
          <ChatsPager />
        </div>
      </div>
    </div>
  </RyzeApp>
);
