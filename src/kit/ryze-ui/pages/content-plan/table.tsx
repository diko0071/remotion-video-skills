import React from "react";
import { SearchIcon } from "../../icons";
import "../../pages.css";
import "./content-plan.css";
import { SortIcon } from "./icons";
import { ContentPlanRowCells } from "./row";
import { ContentPlanRow, ContentPlanStatus, ContentPlanTab } from "./types";

export const ContentPlanTabs: React.FC<{
  tabs: ContentPlanTab[];
  active?: string;
}> = ({ tabs, active = "All" }) => (
  <div className="cp-tabsbar">
    <div className="cp-tabs">
      {tabs.map((t) => (
        <span
          key={t.label}
          className={`cp-tab${t.label === active ? " active" : ""}`}
          data-click={`cp.tab.${t.label}`}
        >
          {t.label}
          <span className="c">{t.count}</span>
        </span>
      ))}
    </div>
    <span className="cp-search">
      <SearchIcon />
      Filter
    </span>
  </div>
);

export const ContentPlanTable: React.FC<{
  rows: ContentPlanRow[];
  tabs: ContentPlanTab[];
  activeTab?: string;
  style?: React.CSSProperties;
  statusOverrides?: Partial<Record<string, ContentPlanStatus>>;
  publishNowRow?: string;
  publishNowVisible?: boolean;
  firstDotsId?: string;
  firstMenu?: React.ReactNode;
}> = ({
  rows,
  tabs,
  activeTab,
  style,
  statusOverrides,
  publishNowRow,
  publishNowVisible = true,
  firstDotsId,
  firstMenu,
}) => (
  <div className="cp-table" style={style}>
    <ContentPlanTabs tabs={tabs} active={activeTab} />
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>URL</th>
          <th>
            <span className="cp-sort active">
              Scheduled
              <SortIcon dir="desc" />
            </span>
          </th>
          <th className="num">
            <span className="cp-sort">
              Impressions
              <SortIcon />
            </span>
          </th>
          <th className="num">Trend</th>
          <th>Status</th>
          <th className="num" />
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <ContentPlanRowCells
            key={r.title}
            row={r}
            status={statusOverrides?.[r.title]}
            publishNow={
              publishNowRow === r.title ? publishNowVisible : undefined
            }
            dotsId={i === 0 ? firstDotsId : undefined}
            menu={i === 0 ? firstMenu : undefined}
          />
        ))}
      </tbody>
    </table>
  </div>
);
