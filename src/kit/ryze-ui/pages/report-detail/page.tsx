import React from "react";
import { RyzeApp } from "../../app-shell";
import "./report-detail.css";
import { AcquisitionSlide } from "./acquisition-slide";
import { CoverSlide } from "./cover-slide";
import { CHANNELS, CHECKS, KPIS, MONTHS, RECS } from "./data";
import { RecommendationsSlide } from "./recommendations-slide";
import { ReportTop } from "./report-top";
import { RevenueSlide } from "./revenue-slide";
import { TechnicalSlide } from "./technical-slide";

export const ReportDetailPage: React.FC = () => (
  <RyzeApp workspace="ember-and-oak" page="Reports" nav="Reports" stretch>
    <div className="pg">
      <div className="pg-scroll rd-scroll">
        <div className="pg-inner rd-inner">
          <ReportTop />

          <div className="rd-slides">
            <CoverSlide />
            <RevenueSlide kpis={KPIS} months={MONTHS} />
            <AcquisitionSlide channels={CHANNELS} />
            <RecommendationsSlide recs={RECS} />
            <TechnicalSlide checks={CHECKS} />
          </div>
        </div>
      </div>
    </div>
  </RyzeApp>
);
