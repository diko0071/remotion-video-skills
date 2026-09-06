import React from "react";
import { CreativeGridResult } from "../../kit/chat/results/creatives";
import { AssistantMessage, Markdown, UserMessage } from "../../kit/ryze-ui/message";
import { QuestionSection, SubmitButton } from "../../kit/ryze-ui/question";
import { WidgetCard } from "../../kit/ryze-ui/widget-card";
import { ToolFlow, type ToolSpec } from "../../kit/tool-flow";
import { PROMPT } from "./timings";

export const WORK_ITEMS = [
  { name: "Your brain needs sleep", caption: "Type · navy", file: "dusk/launch/n1.png" },
  { name: "+47 min deep sleep", caption: "Data · hypnogram", file: "dusk/launch/n2.png" },
  { name: "14 nights free", caption: "Offer · CTA", file: "dusk/launch/n3.png" },
];

const DONE_TOOLS: ToolSpec[] = [
  { label: "Reading your store", detail: "Bestsellers · palette · voice", start: -60, done: -40 },
  { label: "Generating creatives", detail: "3 ads in your brand style", start: -60, done: -40 },
  { label: "Writing ad copy", detail: "Headlines + CTAs · conversion intent", start: -60, done: -40 },
];

export const HistoryPrompt: React.FC = () => (
  <UserMessage>{PROMPT}</UserMessage>
);

export const HistoryFormTurn: React.FC<{ tail?: boolean }> = ({ tail }) => (
  <div style={{ marginTop: 30 }} data-click={tail ? "history.tail" : undefined}>
    <AssistantMessage>
      <Markdown>Two quick questions so I set this up right —</Markdown>
      <div style={{ width: 760, marginTop: 12 }}>
        <WidgetCard title="Quick setup" body={false} footer={<SubmitButton submitted />}>
          <QuestionSection
            title="Where should the ads run?"
            dimmed
            options={[
              { label: "Google Ads", logos: ["integrations/google-ads.webp"] },
              { label: "Meta Ads", logos: ["integrations/meta-ads.svg"] },
              {
                label: "Both",
                logos: ["integrations/google-ads.webp", "integrations/meta-ads.svg"],
                selected: true,
              },
            ]}
          />
          <QuestionSection
            title="What's the primary goal?"
            dimmed
            options={[
              { label: "Lower CPA" },
              { label: "More conversions", selected: true },
              { label: "Scale spend" },
            ]}
          />
        </WidgetCard>
      </div>
    </AssistantMessage>
  </div>
);

export const HistoryWorkTurn: React.FC<{ tail?: boolean }> = ({ tail }) => (
  <div style={{ marginTop: 30 }} data-click={tail ? "history.tail" : undefined}>
    <AssistantMessage>
      <Markdown>Building everything for Dusk —</Markdown>
      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 12 }}>
        <ToolFlow tools={DONE_TOOLS} size={22} />
        <div style={{ width: 860 }}>
          <CreativeGridResult
            title="New creatives — Dusk"
            subtitle="Generated in your brand style"
            items={WORK_ITEMS}
          />
        </div>
      </div>
    </AssistantMessage>
  </div>
);
