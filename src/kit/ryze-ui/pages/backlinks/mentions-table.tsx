import React from "react";
import { SearchIcon } from "../../icons";
import "./backlinks.css";
import { ArrowDownIcon } from "./icons";
import { MentionRow } from "./mention-row";
import { BacklinkRow, BacklinkTab } from "./types";

export const MentionsTabs: React.FC<{ tabs: BacklinkTab[]; active?: string }> = ({
  tabs,
  active,
}) => (
  <div className="mn-topbar">
    <div className="mn-tabs">
      {tabs.map((t) => (
        <span
          key={t.label}
          className={`mn-tab${(active ? t.label === active : t.active) ? " active" : ""}`}
          data-click={`mn.tab.${t.label}`}
        >
          {t.label}
          <span className="cnt">{t.count}</span>
        </span>
      ))}
    </div>
    <span className="mn-search">
      <SearchIcon />
      <span className="ph">Filter</span>
    </span>
  </div>
);

export const MentionsTable: React.FC<{
  rows: BacklinkRow[];
  tabs: BacklinkTab[];
  activeTab?: string;
  firstLinksId?: string;
  style?: React.CSSProperties;
}> = ({ rows, tabs, activeTab, firstLinksId, style }) => (
  <div className="mn-card" style={style}>
    <MentionsTabs tabs={tabs} active={activeTab} />
    <table className="mn-table">
      <thead>
        <tr>
          <th>Text</th>
          <th>URL</th>
          <th>
            <span className="sort">
              Published
              <ArrowDownIcon />
            </span>
          </th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <MentionRow key={r.text} row={r} linksId={i === 0 ? firstLinksId : undefined} />
        ))}
      </tbody>
    </table>
  </div>
);
