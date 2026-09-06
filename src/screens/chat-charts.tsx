import React from "react";
import { RyzeApp } from "../kit/ryze-ui/app-shell";
import { AssistantMessage, ChatPage, Markdown, UserMessage } from "../kit/ryze-ui/chat";
import {
  BarChart,
  DonutChart,
  DownloadAction,
  LineChart,
  StatList,
  WidgetCard,
} from "../kit/ryze-ui/widgets";

export const ChatCharts: React.FC = () => (
  <RyzeApp>
    <ChatPage title="Weekly performance charts">
      <UserMessage>
        Build me a visual snapshot of last week: traffic trend, spend by campaign, and platform
        split.
      </UserMessage>

      <AssistantMessage>
        <Markdown>
          <p>
            Here's your week at a glance — <strong>clicks climbed all week</strong>, one campaign
            dominates spend, and Google still takes half the budget.
          </p>
        </Markdown>

        <WidgetCard
          title="Organic clicks — last 7 days"
          subtitle="Google Search Console, daily clicks"
          headerAction={<DownloadAction />}
        >
          <LineChart />
        </WidgetCard>

        <WidgetCard
          title="Spend by campaign — last 30 days"
          subtitle="Google Ads, USD"
          headerAction={<DownloadAction />}
        >
          <BarChart />
        </WidgetCard>

        <WidgetCard
          title="Spend split by platform"
          subtitle="Last 30 days, share of total spend"
          headerAction={<DownloadAction />}
        >
          <DonutChart />
        </WidgetCard>

        <WidgetCard
          title="Key metrics — week over week"
          subtitle="All channels, vs previous 7 days"
          headerAction={<DownloadAction />}
        >
          <StatList />
        </WidgetCard>
      </AssistantMessage>
    </ChatPage>
  </RyzeApp>
);
