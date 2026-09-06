import React from "react";
import "../../pages.css";
import "./seo-dashboard.css";
import { ArticlesTableCard } from "./articles-table-card";
import { ArticlesTrafficCard } from "./articles-traffic-card";
import { ContentPipelineCard } from "./content-pipeline-card";
import { DashboardShell } from "./dashboard-shell";
import { KpiGrid } from "./kpi-grid";
import {
  ARTICLES,
  ARTICLES_TRAFFIC_CHART,
  ART_TRAFFIC_BARS,
  ART_TRAFFIC_LINE,
  CONTENT_KPIS,
  CONTENT_PIPELINE_CHART,
  HEAD_SUB,
  PIPE_GENERATED,
  PIPE_LABELS,
  PIPE_PUBLISHED,
} from "./data";

export const SeoDashboardContentPage: React.FC<{ bare?: boolean }> = ({ bare }) => (
  <DashboardShell tab="Content" sub={HEAD_SUB} bare={bare}>
    <KpiGrid items={CONTENT_KPIS} />

    <div className="sd-grid-2">
      <ContentPipelineCard
        labels={PIPE_LABELS}
        generated={PIPE_GENERATED}
        published={PIPE_PUBLISHED}
        generatedColor={CONTENT_PIPELINE_CHART.generatedColor}
        publishedColor={CONTENT_PIPELINE_CHART.publishedColor}
        generatedTicks={CONTENT_PIPELINE_CHART.leftTicks}
        publishedTicks={CONTENT_PIPELINE_CHART.rightTicks}
        legend={CONTENT_PIPELINE_CHART.legend}
      />
      <ArticlesTrafficCard
        labels={PIPE_LABELS}
        bars={ART_TRAFFIC_BARS}
        line={ART_TRAFFIC_LINE}
        barTicks={ARTICLES_TRAFFIC_CHART.leftTicks}
        lineTicks={ARTICLES_TRAFFIC_CHART.rightTicks}
        legend={ARTICLES_TRAFFIC_CHART.legend}
      />
    </div>

    <ArticlesTableCard rows={ARTICLES} />
  </DashboardShell>
);
