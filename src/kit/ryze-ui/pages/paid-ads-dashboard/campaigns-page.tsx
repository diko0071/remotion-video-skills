import React from "react";
import "../../pages.css";
import "./paid-ads-dashboard.css";
import { CampaignsTable } from "./campaigns-table";
import {
  CAMPAIGNS,
  CAMPAIGNS_CHART_TITLES,
  CAMPAIGNS_KPIS,
  SPEND_AXIS,
  SPLIT_CONV,
  SPLIT_CONV_AXIS,
  SPLIT_SPEND,
} from "./data";
import { KpiRow } from "./kpi-row";
import { PaidAdsShell } from "./shell";
import { StackedAreas } from "./stacked-areas";
import { StackedBars } from "./stacked-bars";

export const PaidAdsCampaignsPage: React.FC = () => (
  <PaidAdsShell tab="Campaigns">
    <>
      <KpiRow items={CAMPAIGNS_KPIS} />

      <div className="pa-grid-2">
        <StackedBars
          title={CAMPAIGNS_CHART_TITLES.conversions}
          data={SPLIT_CONV}
          axis={SPLIT_CONV_AXIS}
        />
        <StackedAreas
          title={CAMPAIGNS_CHART_TITLES.spend}
          data={SPLIT_SPEND}
          axis={SPEND_AXIS}
        />
      </div>

      <CampaignsTable rows={CAMPAIGNS} />
    </>
  </PaidAdsShell>
);
