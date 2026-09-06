import React from "react";
import { RyzeApp } from "../../app-shell";
import "../../pages.css";
import "./backlinks.css";
import {
  BACKLINK_KPIS,
  BACKLINK_ROWS,
  BACKLINK_TABS,
  BACKLINKS_SUB,
  BACKLINKS_TITLE,
} from "./data";
import { BacklinksKpis } from "./kpis";
import { BacklinksRefTable } from "./backlinks-table";
import { MentionsTable } from "./mentions-table";
import { BacklinksHead } from "./page-head";

export const MentionsBody: React.FC<{
  activeTab?: string;
  firstLinksId?: string;
  backlinksView?: boolean;
  rows?: React.ComponentProps<typeof MentionsTable>["rows"];
  kpis?: React.ComponentProps<typeof BacklinksKpis>["items"];
  tabs?: React.ComponentProps<typeof MentionsTable>["tabs"];
}> = ({ activeTab, firstLinksId, backlinksView = false, rows = BACKLINK_ROWS, kpis = BACKLINK_KPIS, tabs = BACKLINK_TABS }) => (
  <div className="pg">
    <div className="pg-scroll" style={{ overflow: "hidden" }}>
      <div className="pg-inner wide">
        <BacklinksHead title={BACKLINKS_TITLE} sub={BACKLINKS_SUB} />
        <BacklinksKpis items={kpis} />
        {backlinksView ? (
          <BacklinksRefTable tabs={tabs} />
        ) : (
          <MentionsTable
            rows={rows}
            tabs={tabs}
            activeTab={activeTab}
            firstLinksId={firstLinksId}
          />
        )}
      </div>
    </div>
  </div>
);

export const BacklinksPage: React.FC = () => (
  <RyzeApp workspace="ember-and-oak" page="Mentions" nav="SEO" stretch>
    <MentionsBody />
  </RyzeApp>
);
