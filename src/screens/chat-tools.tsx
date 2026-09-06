import React from "react";
import { RyzeApp } from "../kit/ryze-ui/app-shell";
import {
  AssistantMessage,
  ChatPage,
  Markdown,
  MessageActions,
  ToolGroup,
  UserMessage,
} from "../kit/ryze-ui/chat";

const GAQL_INPUT = `{
  "query": "SELECT campaign.name, metrics.cost_micros, metrics.conversions FROM campaign WHERE segments.date DURING LAST_30_DAYS ORDER BY metrics.cost_micros DESC"
}`;

const GAQL_OUTPUT = `{
  "rows": [
    { "campaign": "Search — Generic Sheds", "cost": 4212.40, "conversions": 0 },
    { "campaign": "PMax — All Products", "cost": 2890.15, "conversions": 41 },
    { "campaign": "Brand Protect", "cost": 812.02, "conversions": 96 }
  ]
}`;

export const ChatTools: React.FC = () => (
  <RyzeApp>
    <ChatPage title="Audit ad spend for wasted budget">
      <UserMessage>
        Audit my ad spend from the last 30 days and find where I'm overspending without
        conversions.
      </UserMessage>

      <AssistantMessage>
        <ToolGroup state="collapsed" label="Ran Get account summary" />
        <ToolGroup
          state="expanded"
          label="Ran Run raw gaql"
          input={GAQL_INPUT}
          output={GAQL_OUTPUT}
        />
        <ToolGroup state="running" label="Running 3 tools" />
        <ToolGroup state="running" label="Running Run raw insights" />
        <ToolGroup
          state="error"
          label="Ran List lead forms"
          error="Meta Ads token expired for this account. Reconnect the integration in Settings → Integrations and try again."
        />
        <Markdown>
          <p>
            <strong>Found it: one campaign burned $4,212 with zero conversions.</strong> "Search —
            Generic Sheds" spent 38% of your budget in 30 days without a single sale — every other
            campaign converts fine.
          </p>
        </Markdown>
        <MessageActions />
      </AssistantMessage>
    </ChatPage>
  </RyzeApp>
);
