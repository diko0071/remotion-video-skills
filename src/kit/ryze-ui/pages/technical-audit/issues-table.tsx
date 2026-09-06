import React from "react";
import { SearchIcon } from "../../icons";
import "../../pages.css";
import "./technical-audit.css";
import { ChecksIcon, ChevronLeft, ChevronRight, PageIcon, SortIcon } from "./icons";
import { AuditIssueRow } from "./issue-row";
import { AuditRow } from "./types";

export const AuditTableHead: React.FC<{ title?: string; meta?: string }> = ({
  title = "Issues Detected",
  meta = "300 pages checked from your top GSC traffic",
}) => (
  <div className="ta-table-head">
    <div className="ta-table-title">
      <span className="pg-h2">{title}</span>
      <span className="pg-meta">{meta}</span>
    </div>
    <div className="ta-table-tools">
      <span className="ta-iconbtn on">
        <PageIcon />
      </span>
      <span className="ta-iconbtn">
        <ChecksIcon />
      </span>
      <span className="ta-search">
        <SearchIcon />
        Filter pages
      </span>
    </div>
  </div>
);

export const AuditTableCols: React.FC = () => (
  <div className="ta-cols">
    <span className="ta-chev" />
    <span className="ta-page">Page</span>
    <span className="ta-score-cell head active">
      Score
      <SortIcon dir="asc" />
    </span>
    <span className="ta-count head">
      Issues
      <SortIcon />
    </span>
  </div>
);

export const AuditTableFoot: React.FC<{ label?: string }> = ({
  label = "1-25 of 300",
}) => (
  <div className="ta-foot">
    <span className="pg-meta">{label}</span>
    <span className="ta-pagination">
      <span className="pgn arrow disabled">
        <ChevronLeft />
      </span>
      <span className="pgn on">1</span>
      <span className="pgn">2</span>
      <span className="pgn">3</span>
      <span className="pgn-ellipsis">…</span>
      <span className="pgn">12</span>
      <span className="pgn arrow">
        <ChevronRight />
      </span>
    </span>
  </div>
);

export const AuditIssuesTable: React.FC<{
  rows: AuditRow[];
  meta?: string;
  footer?: string;
  style?: React.CSSProperties;
}> = ({ rows, meta, footer, style }) => (
  <div className="ta-table" style={style}>
    <AuditTableHead meta={meta} />
    <AuditTableCols />
    {rows.map((row) => (
      <AuditIssueRow key={row.url} row={row} />
    ))}
    <AuditTableFoot label={footer ?? `1-${rows.length} of 300`} />
  </div>
);
