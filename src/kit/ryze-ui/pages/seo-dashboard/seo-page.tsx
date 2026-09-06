import React from "react";
import "../../pages.css";
import "./seo-dashboard.css";
import { AuthorityBacklinksCard } from "./authority-backlinks-card";
import { BrandedSplitCard } from "./branded-split-card";
import { ClicksByCountryCard } from "./clicks-by-country-card";
import { DashboardShell } from "./dashboard-shell";
import { KpiGrid } from "./kpi-grid";
import { PositionDistributionCard } from "./position-distribution-card";
import { SearchPerformanceCard } from "./search-performance-card";
import {
  AUTHORITY_BACKLINKS_CHART,
  BL_LABELS,
  BRANDED,
  BRANDED_SPLIT_COLORS,
  BUCKETS,
  BUCKET_TOTAL,
  COUNTRIES,
  COUNTRY_MAP_SRC,
  COUNTRY_TOTAL,
  HEAD_SUB,
  NON_BRANDED,
  SEARCH_PERFORMANCE_CHART,
  SEO_KPIS,
  WEEK_CLICKS,
  WEEK_IMPR,
  WEEK_LABELS,
} from "./data";

export const SeoDashboardSections: React.FC = () => (
  <>
    <KpiGrid items={SEO_KPIS} />

    <div className="sd-grid-main">
      <SearchPerformanceCard
        labels={WEEK_LABELS}
        clicks={WEEK_CLICKS}
        impressions={WEEK_IMPR}
        clicksColor={SEARCH_PERFORMANCE_CHART.clicksColor}
        impressionsColor={SEARCH_PERFORMANCE_CHART.impressionsColor}
        clicksTicks={SEARCH_PERFORMANCE_CHART.leftTicks}
        impressionsTicks={SEARCH_PERFORMANCE_CHART.rightTicks}
        legend={SEARCH_PERFORMANCE_CHART.legend}
      />
      <ClicksByCountryCard
        map={COUNTRY_MAP_SRC}
        countries={COUNTRIES}
        total={COUNTRY_TOTAL}
      />
    </div>

    <div className="sd-grid-2">
      <PositionDistributionCard buckets={BUCKETS} total={BUCKET_TOTAL} />
      <BrandedSplitCard
        branded={BRANDED}
        nonBranded={NON_BRANDED}
        brandedColor={BRANDED_SPLIT_COLORS.branded}
        nonBrandedColor={BRANDED_SPLIT_COLORS.nonBranded}
      />
    </div>

    <AuthorityBacklinksCard
      labels={BL_LABELS}
      left={AUTHORITY_BACKLINKS_CHART.left}
      right={AUTHORITY_BACKLINKS_CHART.right}
      leftTicks={AUTHORITY_BACKLINKS_CHART.leftTicks}
      rightTicks={AUTHORITY_BACKLINKS_CHART.rightTicks}
      legend={AUTHORITY_BACKLINKS_CHART.legend}
    />
  </>
);

export const SeoDashboardPage: React.FC = () => (
  <DashboardShell tab="SEO" sub={HEAD_SUB}>
    <SeoDashboardSections />
  </DashboardShell>
);
