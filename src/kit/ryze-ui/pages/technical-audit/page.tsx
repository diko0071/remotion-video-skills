import React from "react";
import { RyzeApp } from "../../app-shell";
import "../../pages.css";
import "./technical-audit.css";
import { AUDIT_PAGE_ROWS, AUDIT_SITE_ROW } from "./data";
import { AuditIssuesTable } from "./issues-table";
import { AuditPageHead } from "./page-head";
import { AuditScoresCard } from "./scores-card";

export const AUDIT_RINGS = [
  {
    value: 48,
    tone: "#e11d48",
    stroke: "#f43f5e",
    label: "Page Speed Score",
    sub: "Core Web Vitals from real Chrome users",
  },
  {
    value: 57,
    tone: "#d97706",
    stroke: "#f59e0b",
    label: "LLM Optimization Score",
    sub: "llms.txt, AI crawlers, structured data",
  },
  {
    value: 74,
    tone: "#d97706",
    stroke: "#f59e0b",
    label: "SEO Optimization Score",
    sub: "Meta tags, links, sitemap, canonicals",
  },
];

export const TechnicalAuditBody: React.FC<{
  health?: number;
  rings?: typeof AUDIT_RINGS;
  rows?: React.ComponentProps<typeof AuditIssuesTable>["rows"];
  scrollPx?: number;
  scanning?: boolean;
}> = ({
  health = 62,
  rings = AUDIT_RINGS,
  rows = [AUDIT_SITE_ROW, ...AUDIT_PAGE_ROWS],
  scrollPx = 0,
  scanning,
}) => (
  <div className="pg">
    <div className="pg-scroll" style={{ overflow: "hidden" }}>
      <div className="pg-inner wide" style={{ marginTop: -scrollPx }}>
        <AuditPageHead scanning={scanning} />
        <AuditScoresCard health={health} rings={rings} />
        {scanning ? (
          <div className="ta-scan-skeleton">
            {Array.from({ length: 7 }, (_, i) => (
              <div key={i} className="ta-skel-row" />
            ))}
          </div>
        ) : (
          <AuditIssuesTable rows={rows} />
        )}
      </div>
    </div>
  </div>
);

export const TechnicalAuditPage: React.FC = () => (
  <RyzeApp workspace="ember-and-oak" page="Technical Audit" nav="SEO" stretch>
    <TechnicalAuditBody />
  </RyzeApp>
);
