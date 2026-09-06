import React from "react";
import { RyzeApp } from "../../app-shell";
import { PlusIcon, SearchIcon, SparkIcon } from "../../icons";
import "../../pages.css";
import "./geo-queries.css";
import { KPIS } from "./data";
import { HelpIcon, RefreshIcon } from "./icons";
import { QueriesKpi, QueriesTab } from "./types";

export const QueriesShell: React.FC<{
  tabs: QueriesTab[];
  children: React.ReactNode;
  after?: React.ReactNode;
  title?: string;
  sub?: string;
  kpis?: QueriesKpi[];
  style?: React.CSSProperties;
  bare?: boolean;
}> = ({
  tabs,
  children,
  after,
  title = "Queries",
  sub = "Keywords and AI prompts tracked for this workspace",
  kpis = KPIS,
  style,
  bare = false,
}) => {
  const inner = (
    <div className="pg" style={style}>
      <div className="pg-scroll" style={{ overflow: "hidden" }}>
        <div className="pg-inner wide">
          <div className="pg-head">
            <div>
              <div className="pg-h1">{title}</div>
              <div className="pg-sub">{sub}</div>
            </div>
            <div className="pg-actions">
              <span className="btn-outline" data-click="queries.add">
                <PlusIcon />
                Add
              </span>
              <span className="gq-iconbtn" data-click="queries.refresh">
                <RefreshIcon />
              </span>
              <span className="gq-iconbtn">
                <HelpIcon />
              </span>
              <span className="btn-primary">
                <SparkIcon />
                Explore Queries
              </span>
            </div>
          </div>

          <div className="gq-kpis">
            {kpis.map((k) => (
              <div key={k.label} className="gq-kpi">
                <div className="k-label">{k.label}</div>
                <div className="k-val">{k.value}</div>
              </div>
            ))}
          </div>

          <div className="gq-card">
            <div className="gq-topbar">
              <div className="gq-tabs">
                {tabs.map((t) => (
                  <span
                    key={t.label}
                    data-click={`tab.queries.${t.label}`}
                    className={`gq-tab${t.active ? " active" : ""}`}
                  >
                    {t.label}
                    <span className="cnt">{t.count}</span>
                  </span>
                ))}
              </div>
              <span className="gq-search">
                <SearchIcon />
                <span className="ph">Filter keywords</span>
              </span>
            </div>
            {children}
          </div>
          {after}
        </div>
      </div>
    </div>
  );
  if (bare) return inner;
  return (
    <RyzeApp workspace="ember-and-oak" page="Queries" nav="SEO" stretch>
      {inner}
    </RyzeApp>
  );
};
