import React from "react";
import "../../pages.css";
import "./seo-dashboard.css";
import { AiChatsTrafficCard } from "./ai-chats-traffic-card";
import { AiLandingPagesCard } from "./ai-landing-pages-card";
import { AiTrafficCard } from "./ai-traffic-card";
import { CoverageCard } from "./coverage-card";
import { DashboardShell } from "./dashboard-shell";
import { GeoHero } from "./geo-hero";
import { KpiGrid } from "./kpi-grid";
import { PromptsCard } from "./prompts-card";
import { RankingsCard } from "./rankings-card";
import { TopDomainsCard } from "./top-domains-card";
import { VisibilityMatrixCard } from "./visibility-matrix-card";
import { VisibilityTrendCard } from "./visibility-trend-card";
import {
  AI_CHATS_CHART,
  AI_SERIES,
  AI_SESSIONS_TOTAL,
  AI_TRAFFIC,
  AI_TRAFFIC_ENGINES,
  AI_WEEKS,
  ANSWERS,
  BRANDS,
  COVERAGE,
  ENGINES,
  GEO_HERO_SPEC,
  GEO_KPIS,
  HEAD_SUB,
  LANDING_PAGES,
  LP_ENGINE_COLORS,
  MATRIX,
  PROMPTS,
  RUN_DATES,
  TOP_DOMAINS,
  VISIBILITY_SERIES,
  VISIBILITY_TREND_MAX,
} from "./data";

export const GeoDashboardSections: React.FC = () => {
  const heroMax = BRANDS[0].pct;
  return (
    <>
      <GeoHero
        value={GEO_HERO_SPEC.value}
        rank={GEO_HERO_SPEC.rank}
        rankSub={GEO_HERO_SPEC.rankSub}
        brands={BRANDS.slice(0, GEO_HERO_SPEC.brandCount)}
        max={heroMax}
      />

      <KpiGrid items={GEO_KPIS} />

      <div className="sd-grid-75">
        <VisibilityTrendCard
          labels={RUN_DATES}
          series={VISIBILITY_SERIES}
          max={VISIBILITY_TREND_MAX}
        />
        <RankingsCard brands={BRANDS} max={heroMax} answers={ANSWERS} />
      </div>

      <VisibilityMatrixCard engines={ENGINES} rows={MATRIX} />

      <div className="sd-grid-75">
        <TopDomainsCard rows={TOP_DOMAINS} />
        <CoverageCard rows={COVERAGE} />
      </div>

      <PromptsCard engines={ENGINES} rows={PROMPTS} />

      <AiChatsTrafficCard
        labels={AI_WEEKS}
        series={AI_SERIES}
        ticks={AI_CHATS_CHART.ticks}
        vw={AI_CHATS_CHART.vw}
        engines={AI_TRAFFIC_ENGINES}
      />

      <div className="sd-grid-2">
        <AiTrafficCard rows={AI_TRAFFIC} total={AI_SESSIONS_TOTAL} />
        <AiLandingPagesCard
          pages={LANDING_PAGES}
          engineColors={LP_ENGINE_COLORS}
        />
      </div>
    </>
  );
};

export const SeoDashboardGeoPage: React.FC = () => (
  <DashboardShell tab="GEO" sub={HEAD_SUB}>
    <GeoDashboardSections />
  </DashboardShell>
);
