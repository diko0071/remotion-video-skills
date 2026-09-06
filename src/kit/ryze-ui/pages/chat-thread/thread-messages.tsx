import React from "react";
import { AssistantMessage, Markdown, UserMessage } from "../../message";
import { WidgetCard, DownloadAction } from "../../widget-card";
import "./chat-thread.css";
import { ClicksChart } from "./clicks-chart";
import {
  BARS,
  TOOL_GROUP_SUMMARY,
  TOOL_ROWS,
  WIDGET_SUBTITLE,
  WIDGET_TITLE,
} from "./data";
import { ToolRunGroup } from "./tool-run-group";

export const ThreadUserMessage: React.FC = () => (
  <UserMessage>
    Where is ember-and-oak.com losing organic clicks? Look at the collection
    pages over the last 28 days and tell me what to fix first.
  </UserMessage>
);

export const ThreadAssistantMessage: React.FC = () => (
  <AssistantMessage>
    <ToolRunGroup summary={TOOL_GROUP_SUMMARY} rows={TOOL_ROWS} />
    <Markdown>
      <p>
        Collection pages pulled <strong>5,270 clicks</strong> in the last 28
        days, down 11% against the previous period. Two pages carry the whole
        loss.
      </p>
      <ul>
        <li>
          <strong>Soy candles</strong> slipped from position 6.2 to 8.4 after
          the October re-write — the H1 no longer carries the query people
          search.
        </li>
        <li>
          <strong>Gift sets</strong> holds position 4.1 with a 2.1% CTR — the
          title tag is truncated at 68 characters and the meta description is
          missing.
        </li>
      </ul>
    </Markdown>
    <WidgetCard
      title={WIDGET_TITLE}
      subtitle={WIDGET_SUBTITLE}
      headerAction={<DownloadAction />}
    >
      <ClicksChart bars={BARS} />
    </WidgetCard>
    <Markdown>
      <p>
        Fixing both titles recovers an estimated 640 clicks a month. Want me to
        apply them?
      </p>
    </Markdown>
  </AssistantMessage>
);
