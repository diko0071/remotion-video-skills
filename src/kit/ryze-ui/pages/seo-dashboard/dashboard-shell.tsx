import React from "react";
import { RyzeApp } from "../../app-shell";
import "../../pages.css";
import "./seo-dashboard.css";
import { RefreshGlyph } from "./icons";
import { DashboardTab } from "./types";

export const DashboardShell: React.FC<{
  tab: DashboardTab;
  title?: string;
  sub: string;
  tabs?: DashboardTab[];
  children: React.ReactNode;
  style?: React.CSSProperties;
  bare?: boolean;
  scrollPx?: number;
}> = ({
  tab,
  title = "Dashboard",
  sub,
  tabs = ["SEO", "GEO", "Content"],
  children,
  style,
  bare = false,
  scrollPx = 0,
}) => {
  const inner = (
    <div className="pg" style={style}>
      <div className="pg-scroll" style={{ overflow: "hidden" }}>
        <div className="pg-inner wide" style={{ marginTop: -scrollPx }}>
          <div className="pg-head">
            <div>
              <div className="pg-h1">{title}</div>
              <div className="pg-sub">{sub}</div>
            </div>
            <div className="pg-actions">
              <span className="btn-outline">
                <RefreshGlyph />
                Refresh
              </span>
            </div>
          </div>
          <div className="sd-tabs">
            {tabs.map((name) => (
              <span
                key={name}
                data-click={`tab.seo-dashboard.${name}`}
                className={`sd-tab${tab === name ? " on" : ""}`}
              >
                {name}
              </span>
            ))}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
  if (bare) return inner;
  return (
    <RyzeApp workspace="ember-and-oak" page="Dashboard" nav="Dashboard" stretch>
      {inner}
    </RyzeApp>
  );
};
