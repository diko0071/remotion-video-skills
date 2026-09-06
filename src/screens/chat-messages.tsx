import React from "react";
import { RyzeApp } from "../kit/ryze-ui/app-shell";
import {
  AssistantMessage,
  ChatPage,
  Markdown,
  MessageActions,
  Thinking,
  UserMessage,
} from "../kit/ryze-ui/chat";

export const ChatMessages: React.FC = () => (
  <RyzeApp>
    <ChatPage title="Organic traffic weekly review">
      <UserMessage>How did our organic traffic do this week?</UserMessage>

      <AssistantMessage>
        <Markdown>
          <p>
            <strong>Organic clicks are up 18% week over week</strong> — 12,480 clicks vs 10,571
            last week, with impressions holding at 402K.
          </p>
          <ul>
            <li>
              <strong>3 pages</strong> drove most of the gain — the shed buying guide alone added
              940 clicks
            </li>
            <li>
              <strong>Avg. position improved 4.2 → 3.6</strong> on your top 20 keywords
            </li>
            <li>
              <strong>2 new keywords</strong> entered the top 10: "10x12 storage shed" and "resin
              shed vs wood"
            </li>
          </ul>
          <p>
            Want me to break down which pages moved, or push the two new keywords into this
            month's content batch?
          </p>
        </Markdown>
        <MessageActions />
      </AssistantMessage>

      <UserMessage>Push them into the batch and show me the pages</UserMessage>

      <Thinking />
    </ChatPage>
  </RyzeApp>
);
