import React from "react";
import { RyzeApp } from "../../app-shell";
import "../../pages.css";
import "./paid-ads-dashboard.css";
import { PAID_ADS_PAGE_SUB, PAID_ADS_PAGE_TITLE, PAID_ADS_TABS } from "./data";
import { ChevronGlyph, RefreshGlyph } from "./icons";

export const PaidAdsPageHead: React.FC<{
  title?: string;
  sub?: string;
  style?: React.CSSProperties;
}> = ({ title = PAID_ADS_PAGE_TITLE, sub = PAID_ADS_PAGE_SUB, style }) => (
  <div className="pg-head" style={style}>
    <div>
      <div className="pg-h1">{title}</div>
      <div className="pg-sub">{sub}</div>
    </div>
    <div className="pg-actions">
      <span className="btn-outline">
        All accounts
        <ChevronGlyph />
      </span>
      <span className="btn-outline">
        <RefreshGlyph />
        Refresh
      </span>
    </div>
  </div>
);

export const PaidAdsTabs: React.FC<{
  tab: string;
  tabs?: string[];
  style?: React.CSSProperties;
}> = ({ tab, tabs = PAID_ADS_TABS, style }) => (
  <div className="pa-tabs" style={style}>
    {tabs.map((t) => (
      <span
        data-click={`tab.paid-ads.${t}`}
        className={`pa-tab${t === tab ? " on" : ""}`}
        key={t}
      >
        {t}
      </span>
    ))}
  </div>
);

export const PaidAdsShell: React.FC<{
  tab: string;
  children: React.ReactNode;
  title?: string;
  sub?: string;
  tabs?: string[];
  panel?: React.ReactNode;
}> = ({ tab, children, title, sub, tabs, panel }) => (
  <RyzeApp workspace="ember-and-oak" page="Dashboard" nav="Home" stretch panel={panel}>
    <div className="pg">
      <div className="pg-scroll">
        <div className="pg-inner wide">
          <PaidAdsPageHead title={title} sub={sub} />
          <PaidAdsTabs tab={tab} tabs={tabs} />
          {children}
        </div>
      </div>
    </div>
  </RyzeApp>
);
