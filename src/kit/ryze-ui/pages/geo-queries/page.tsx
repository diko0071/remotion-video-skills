import React from "react";
import "../../pages.css";
import "./geo-queries.css";
import { KEYWORDS, KEYWORD_TABS, TABS, TOPICS } from "./data";
import { KeywordsTable } from "./keywords-table";
import { QueriesPager } from "./pager";
import { QueriesShell } from "./queries-shell";
import { TopicsTable } from "./topics-table";

export const GeoQueriesPage: React.FC = () => (
  <QueriesShell tabs={TABS}>
    <TopicsTable topics={TOPICS} />
  </QueriesShell>
);

export const QueriesKeywordsPage: React.FC = () => (
  <QueriesShell tabs={KEYWORD_TABS} after={<QueriesPager />}>
    <KeywordsTable keywords={KEYWORDS} />
  </QueriesShell>
);
