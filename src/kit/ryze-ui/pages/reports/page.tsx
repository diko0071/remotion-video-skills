import React from "react";
import { RyzeApp } from "../../app-shell";
import "../../pages.css";
import "./reports.css";
import { REPORT_ROWS } from "./data";
import { ReportsPageHead, ReportsSearch } from "./page-head";
import { ReportsList } from "./report-row";

export const ReportsPage: React.FC = () => (
  <RyzeApp workspace="ember-and-oak" page="Reports" nav="Reports" stretch>
    <div className="pg">
      <div className="pg-scroll">
        <div className="pg-inner wide">
          <ReportsPageHead />
          <ReportsSearch />
          <ReportsList rows={REPORT_ROWS} />
        </div>
      </div>
    </div>
  </RyzeApp>
);
