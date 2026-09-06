import React from "react";
import { AssistantMessage, Markdown, UserMessage } from "../../message";
import { ArtifactCard } from "./artifact-card";
import { ArtifactPage } from "./artifact-page";
import {
  DASHBOARD_ARTIFACT_HEAD,
  DASHBOARD_TOOL_ROWS,
  DASHBOARD_TOOL_SUMMARY,
} from "./data";
import { DashboardArtifact } from "./dashboard-artifact";
import { DashboardTypeIcon } from "./icons";
import { ToolGroup } from "./tool-group";

export const ChatArtifactDashboardPage: React.FC = () => (
  <ArtifactPage
    chatTitle={DASHBOARD_ARTIFACT_HEAD.chatTitle}
    name={DASHBOARD_ARTIFACT_HEAD.name}
    chat={
      <>
        <UserMessage>
          Build me a live dashboard of our organic traffic — clicks,
          impressions, CTR and position, plus which queries are moving.
        </UserMessage>
        <AssistantMessage>
          <ToolGroup
            summary={DASHBOARD_TOOL_SUMMARY}
            rows={DASHBOARD_TOOL_ROWS}
          />
          <Markdown>
            <p>
              Built it as a live dashboard — it pulls from Search Console every
              time you open it, so the numbers stay current.
            </p>
          </Markdown>
          <ArtifactCard
            name={DASHBOARD_ARTIFACT_HEAD.name}
            typeLabel={DASHBOARD_ARTIFACT_HEAD.typeLabel}
            icon={<DashboardTypeIcon />}
          />
          <Markdown>
            <p>
              Clicks are up <strong>12.4%</strong> against the prior 28 days on
              a 1.4 position gain. The swings table is where the money is:{" "}
              <strong>candle refill kit</strong> and{" "}
              <strong>wax melts uk</strong> lost 132 clicks between them after
              slipping past position 10.
            </p>
            <ul>
              <li>
                Five queries sit at 4–10 with roughly 2,310 clicks left on the
                table.
              </li>
              <li>
                Position buckets 1–3 grew from 42 to 81 queries over 12 weeks.
              </li>
            </ul>
            <p>Want me to schedule this dashboard as a Monday morning email?</p>
          </Markdown>
        </AssistantMessage>
      </>
    }
  >
    <DashboardArtifact />
  </ArtifactPage>
);
