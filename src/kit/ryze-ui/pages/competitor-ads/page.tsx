import React from "react";
import { RyzeApp } from "../../app-shell";
import "../../pages.css";
import "./competitor-ads.css";
import { CompetitorChips } from "./chips";
import { COMPETITOR_ROWS, TRACKED_BRANDS, TRACKED_ROWS } from "./data";
import { CompetitorFilterBar } from "./filter-bar";
import { CompetitorAdsMasonry } from "./masonry";
import { CompetitorAdsHead } from "./page-head";
import { CompetitorAdsPager } from "./pager";
import { CompetitorAdsTabs } from "./tabs";
import { AdCard, CompetitorsTab, TrackedBrand } from "./types";

export const CompetitorAdsBody: React.FC<{
  tab: CompetitorsTab;
  brandFilter?: string;
  trackedBrands?: TrackedBrand[];
  syncingBrand?: string;
  rows?: AdCard[];
  filterValues?: Partial<Record<string, string>>;
  scrollPx?: number;
}> = ({ tab, brandFilter, trackedBrands = TRACKED_BRANDS, syncingBrand, rows, filterValues, scrollPx = 0 }) => {
  const explore = tab === "explore";
  const ads = rows ?? (explore ? COMPETITOR_ROWS : TRACKED_ROWS);
  const chipBrands = syncingBrand
    ? trackedBrands.map((brand) =>
        brand.name === syncingBrand ? { ...brand, syncing: true } : brand,
      )
    : trackedBrands;
  return (
    <div className="pg">
      <div className="pg-scroll" style={{ overflow: "hidden" }}>
        <div className="pg-inner wide" style={{ marginTop: -scrollPx }}>
          <CompetitorAdsHead />
          <CompetitorAdsTabs active={explore ? "Explore" : "Tracked Competitors"} />
          <div className="cmp-stack">
            {explore ? null : (
              <CompetitorChips brands={chipBrands} activeBrand={brandFilter} />
            )}
            <CompetitorFilterBar values={filterValues} />
            <CompetitorAdsMasonry ads={ads} showTrack={explore} />
            <CompetitorAdsPager />
          </div>
        </div>
      </div>
    </div>
  );
};

export const CompetitorAdsPage: React.FC<{
  tab?: CompetitorsTab;
  brandFilter?: string;
  trackedBrands?: TrackedBrand[];
  syncingBrand?: string;
  rows?: AdCard[];
  panel?: React.ReactNode;
}> = ({ tab = "explore", panel, ...rest }) => (
  <RyzeApp workspace="ember-and-oak" page="Competitor Ads" nav="Competitor Ads" stretch panel={panel}>
    <CompetitorAdsBody tab={tab} {...rest} />
  </RyzeApp>
);
