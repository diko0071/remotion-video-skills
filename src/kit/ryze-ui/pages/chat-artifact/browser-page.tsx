import React from "react";
import { AssistantMessage, Markdown, UserMessage } from "../../message";
import { ArtifactPage } from "./artifact-page";
import { SITE_ARTIFACT_HEAD, SITE_TOOL_ROWS, SITE_TOOL_SUMMARY } from "./data";
import { SiteArtifact } from "./site-artifact";
import { ToolGroup } from "./tool-group";

export const ChatArtifactBrowserPage: React.FC = () => (
  <ArtifactPage
    chatTitle={SITE_ARTIFACT_HEAD.chatTitle}
    name={SITE_ARTIFACT_HEAD.name}
    site
    chat={
      <>
        <UserMessage>
          The soy candles collection is losing clicks. Rewrite the title and
          meta description on the live page and show me the result.
        </UserMessage>
        <AssistantMessage>
          <ToolGroup summary={SITE_TOOL_SUMMARY} rows={SITE_TOOL_ROWS} />
          <Markdown>
            <p>
              Updated and published. The old title was truncated at 68
              characters and the meta description was empty.
            </p>
            <ul>
              <li>
                <strong>Title</strong> — “Soy Candles | Hand Poured, Clean
                Burning | Ember &amp; Oak” (54 characters)
              </li>
              <li>
                <strong>Meta description</strong> — leads with cedar &amp; oak
                and the 48-hour burn time, the two phrases people actually
                search
              </li>
              <li>
                <strong>H1</strong> — kept as “Soy Candles” so it still matches
                the query
              </li>
            </ul>
            <p>
              The live page is open next to this chat. On current impressions
              this is worth about 620 clicks a month. Want me to do the gift
              sets collection next?
            </p>
          </Markdown>
        </AssistantMessage>
      </>
    }
  >
    <SiteArtifact />
  </ArtifactPage>
);
