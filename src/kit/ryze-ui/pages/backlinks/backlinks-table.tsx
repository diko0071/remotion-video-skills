import React from "react";
import "./backlinks.css";
import { REF_BACKLINK_ROWS } from "./data";
import { MentionsTabs } from "./mentions-table";
import { BacklinkTab, RefBacklinkRow } from "./types";

const STATUS_LABEL: Record<RefBacklinkRow["status"], string> = {
  published: "Published",
  lost: "Lost",
};

export const BacklinksRefTable: React.FC<{
  tabs: BacklinkTab[];
  rows?: RefBacklinkRow[];
  style?: React.CSSProperties;
}> = ({ tabs, rows = REF_BACKLINK_ROWS, style }) => (
  <div className="mn-card" style={style}>
    <MentionsTabs tabs={tabs} active="Backlinks" />
    <table className="mn-table">
      <thead>
        <tr>
          <th>URL (referring)</th>
          <th>Page (target)</th>
          <th>Product</th>
          <th>Keyword</th>
          <th>Anchor</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.url}>
            <td>
              <span className="mn-url">{r.url}</span>
            </td>
            <td>
              <span className="mn-url">{r.page}</span>
            </td>
            <td>
              <div className="mn-text">{r.product}</div>
            </td>
            <td className="mn-date">{r.keyword}</td>
            <td className="mn-date">{r.anchor}</td>
            <td>
              <span className="mn-pill">
                <span className={`dot ${r.status === "published" ? "positive" : "danger"}`} />
                {STATUS_LABEL[r.status]}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
