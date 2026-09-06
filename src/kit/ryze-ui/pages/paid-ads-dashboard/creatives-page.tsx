import React from "react";
import "../../pages.css";
import "./paid-ads-dashboard.css";
import { CreativeViewToggle, CreativesGrid } from "./creatives-grid";
import { CREATIVES, TOP_HOOK_CREATIVE_ID } from "./data";
import { PaidAdsShell } from "./shell";

export const PaidAdsCreativesTabPage: React.FC = () => (
  <PaidAdsShell tab="Creatives">
    <>
      <CreativeViewToggle />
      <CreativesGrid items={CREATIVES} topHookId={TOP_HOOK_CREATIVE_ID} />
    </>
  </PaidAdsShell>
);
