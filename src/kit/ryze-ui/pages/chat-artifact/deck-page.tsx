import React from "react";
import { AssistantMessage, Markdown, UserMessage } from "../../message";
import { ArtifactCard } from "./artifact-card";
import { ArtifactPage } from "./artifact-page";
import { DECK_ARTIFACT_HEAD, DECK_TOOL_ROWS, DECK_TOOL_SUMMARY } from "./data";
import { DeckArtifact } from "./deck-artifact";
import { DeckTypeIcon } from "./icons";
import { ToolGroup } from "./tool-group";

export const ChatArtifactDeckPage: React.FC = () => (
  <ArtifactPage
    chatTitle={DECK_ARTIFACT_HEAD.chatTitle}
    name={DECK_ARTIFACT_HEAD.name}
    chat={
      <>
        <UserMessage>
          Run a full SEO audit on ember-and-oak.com and put it in a deck I can
          send to the team.
        </UserMessage>
        <AssistantMessage>
          <ToolGroup summary={DECK_TOOL_SUMMARY} rows={DECK_TOOL_ROWS} />
          <Markdown>
            <p>
              Audit is done — 940 URLs and 12,400 queries scored across six
              weighted categories. Health score lands at{" "}
              <strong>56 / 100</strong>, in the needs-attention band.
            </p>
          </Markdown>
          <ArtifactCard
            name={DECK_ARTIFACT_HEAD.name}
            typeLabel={DECK_ARTIFACT_HEAD.typeLabel}
            icon={<DeckTypeIcon />}
          />
          <Markdown>
            <p>
              Indexing is fine at 82. The drag is{" "}
              <strong>query opportunity capture</strong> at 38 — you rank on
              12,400 queries and convert almost none of the 4–10 band, which is
              about <strong>$182,000 a year</strong> in unclaimed organic
              revenue.
            </p>
            <p>
              Ten slides, PDF export is on the deck. Want me to start on the top
              three fixes?
            </p>
          </Markdown>
        </AssistantMessage>
      </>
    }
  >
    <DeckArtifact />
  </ArtifactPage>
);
