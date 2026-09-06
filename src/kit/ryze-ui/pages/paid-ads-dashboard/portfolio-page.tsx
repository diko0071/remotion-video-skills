import React from "react";
import "../../pages.css";
import "./paid-ads-dashboard.css";
import { AccountsTable } from "./accounts-table";
import { BarsCard } from "./bars-card";
import {
  ACCOUNTS,
  CPA_BAR_MAX,
  CPA_BAR_ROWS,
  PORTFOLIO_BARS_HEADS,
  ROAS_BAR_MAX,
  ROAS_BAR_ROWS,
  SPEND_BAR_MAX,
  SPEND_BAR_ROWS,
} from "./data";
import { FunnelsSection } from "./funnels-section";
import { PaidAdsShell } from "./shell";

export const PaidAdsPortfolioPage: React.FC = () => (
  <PaidAdsShell tab="Portfolio View">
    <>
      <div className="pa-grid-2">
        <BarsCard
          title={PORTFOLIO_BARS_HEADS.spend.title}
          sub={PORTFOLIO_BARS_HEADS.spend.sub}
          max={SPEND_BAR_MAX}
          rows={SPEND_BAR_ROWS}
        />
        <BarsCard
          title={PORTFOLIO_BARS_HEADS.roas.title}
          sub={PORTFOLIO_BARS_HEADS.roas.sub}
          max={ROAS_BAR_MAX}
          rows={ROAS_BAR_ROWS}
        />
      </div>

      <BarsCard
        title={PORTFOLIO_BARS_HEADS.cpa.title}
        sub={PORTFOLIO_BARS_HEADS.cpa.sub}
        max={CPA_BAR_MAX}
        rows={CPA_BAR_ROWS}
      />

      <AccountsTable rows={ACCOUNTS} />

      <FunnelsSection rows={ACCOUNTS} />
    </>
  </PaidAdsShell>
);
