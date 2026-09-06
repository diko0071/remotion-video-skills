import React from "react";
import { RyzeApp } from "../kit/ryze-ui/app-shell";
import { AssistantMessage, ChatPage, Markdown, UserMessage } from "../kit/ryze-ui/chat";
import { ProposalRow, WidgetCard } from "../kit/ryze-ui/widgets";

export const ChatActionsWidget: React.FC = () => (
  <RyzeApp>
    <ChatPage title="Fix underperforming campaigns">
      <UserMessage>Prepare the optimizations — I'll approve what makes sense</UserMessage>

      <AssistantMessage>
        <Markdown>
          <p>
            <strong>3 optimizations ready</strong> — combined impact around $234/mo in recovered
            spend. Pick the ones to apply:
          </p>
        </Markdown>

        <WidgetCard
          title="Proposed optimizations"
          body={false}
          footer={<span className="btn-primary">Approve (2)</span>}
        >
          <ProposalRow
            checked
            label={'Pause keyword "cheap sheds"'}
            detail="312 clicks, 0 conversions in the last 30 days"
            current="$184/mo spend"
            proposed="Paused — $0"
          />
          <ProposalRow
            checked
            label="Raise budget on Brand Protect"
            detail="ROAS 6.2, currently limited by budget"
            current="$50/day"
            proposed="$75/day"
          />
          <ProposalRow
            checked
            approved
            label={'Add negative keyword "free"'}
            detail="Blocks 1,240 junk impressions per week"
            current="28 wasted clicks/wk"
            proposed="Excluded"
          />
          <ProposalRow
            label="Lower tROAS target on PMax"
            detail="Current target throttles delivery on best days"
            current="tROAS 450%"
            proposed="tROAS 380%"
          />
        </WidgetCard>
      </AssistantMessage>
    </ChatPage>
  </RyzeApp>
);
