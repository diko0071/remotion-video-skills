import React from "react";
import { ArticleResult } from "../../kit/chat/results/article";
import { AssistantMessage, Markdown, UserMessage } from "../../kit/ryze-ui/message";
import { SubmitButton } from "../../kit/ryze-ui/question";
import { WidgetCard } from "../../kit/ryze-ui/widget-card";
import { ToolFlow, type ToolSpec } from "../../kit/tool-flow";
import { ARTICLE, FIX_LABELS, PROMPT, SITE } from "./timings";
import { ArticlePile, FixPreview, PlacementsGrid } from "./widgets";

export const FIX_ANSWER = "Found **48 issues** across your site. Fixing all of them now —";
export const LINKS_ANSWER = "Site fixed. **12 publications** in the exchange match your niche —";
export const CONTENT_ANSWER = "Writing **30 articles** for the keywords you don't rank for yet —";
export const FINAL_ANSWER = "Done. Here is where you stand now —";

export const ATTACHMENT = { files: [SITE.before], size: 132 } as const;

const DONE_TOOLS: ToolSpec[] = FIX_LABELS.map(([label, detail, logo]) => ({ label, detail, logos: [logo], start: -60, done: -40 }));

const Turn: React.FC<{ tail?: boolean; children: React.ReactNode }> = ({ tail, children }) => (
  <div style={{ marginTop: 30 }} data-click={tail ? "history.tail" : undefined}>
    <AssistantMessage>{children}</AssistantMessage>
  </div>
);

export const HistoryPrompt: React.FC = () => (
  <UserMessage attachments={[...ATTACHMENT.files]} attachmentSize={ATTACHMENT.size}>
    {PROMPT}
  </UserMessage>
);

export const HistoryFixTurn: React.FC<{ tail?: boolean }> = ({ tail }) => (
  <Turn tail={tail}>
    <Markdown>Found 48 issues across your site. Fixing all of them now —</Markdown>
    <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 14 }}>
      <ToolFlow tools={DONE_TOOLS} size={22} />
      <FixPreview at={-100} wipe={[-100, -90]} ring={[-100, -90]} from={23} to={71} frozen />
    </div>
  </Turn>
);

export const HistoryLinksTurn: React.FC<{ tail?: boolean }> = ({ tail }) => (
  <Turn tail={tail}>
    <Markdown>Site fixed. 12 publications in the exchange match your niche —</Markdown>
    <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 12 }}>
      <div style={{ width: 860 }}>
        <WidgetCard title="Backlink Exchange" subtitle="Do-follow links from websites in your niche" footer={<SubmitButton submitted label="Find placements" />}>
          <div style={{ fontSize: 15, color: "var(--muted-foreground)", lineHeight: 1.5 }}>12 publications with DR 47–78 write about sleep, habits and health tech. I can place one contextual link on each.</div>
        </WidgetCard>
      </div>
      <PlacementsGrid at={-100} popStep={0} arrowsAt={[-100, -100, -100]} checks={PUBLISHERS_DONE} frozen />
    </div>
  </Turn>
);

const PUBLISHERS_DONE = Array.from({ length: 12 }, () => -100);
const PILE_DONE = Array.from({ length: 8 }, () => -100);

export const HistoryContentTurn: React.FC<{ tail?: boolean }> = ({ tail }) => (
  <Turn tail={tail}>
    <Markdown>Writing 30 articles for the keywords you don't rank for yet —</Markdown>
    <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 12 }}>
      <div style={{ width: 860 }}>
        <ArticleResult title="Blog" subtitle="Article 1 of 30 · published" heading={ARTICLE.heading} meta={ARTICLE.meta} paragraphs={[...ARTICLE.paragraphs]} />
      </div>
      <ArticlePile marks={PILE_DONE} frozen />
    </div>
  </Turn>
);
