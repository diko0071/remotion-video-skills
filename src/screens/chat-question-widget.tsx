import React from "react";
import { RyzeApp } from "../kit/ryze-ui/app-shell";
import { AssistantMessage, ChatPage, Markdown, UserMessage } from "../kit/ryze-ui/chat";
import { QuestionSection, SubmitButton, WidgetCard } from "../kit/ryze-ui/widgets";

export const ChatQuestionWidget: React.FC = () => (
  <RyzeApp>
    <ChatPage title="Campaign audit setup">
      <UserMessage>Audit my campaigns and fix what's wasting money</UserMessage>

      <AssistantMessage>
        <Markdown>
          <p>Before I dig in — two quick questions so the audit targets the right things:</p>
        </Markdown>

        <WidgetCard title="Quick setup" body={false} footer={<SubmitButton />}>
          <QuestionSection
            title="Which platforms should I audit?"
            options={[
              { label: "Google Ads" },
              { label: "Meta Ads" },
              { label: "Both", selected: true },
            ]}
          />
          <QuestionSection
            title="What's the primary goal?"
            options={[
              { label: "Lower CPA", selected: true },
              { label: "More conversions" },
              { label: "Scale spend" },
            ]}
            customInput="Other..."
          />
        </WidgetCard>
      </AssistantMessage>

      <AssistantMessage>
        <WidgetCard title="Quick setup" body={false} footer={<SubmitButton submitted />}>
          <QuestionSection
            title="Which platforms should I audit?"
            dimmed
            options={[
              { label: "Google Ads" },
              { label: "Meta Ads" },
              { label: "Both", selected: true },
            ]}
          />
        </WidgetCard>
      </AssistantMessage>
    </ChatPage>
  </RyzeApp>
);
