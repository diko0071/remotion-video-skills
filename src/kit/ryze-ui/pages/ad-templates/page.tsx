import React from "react";
import { RyzeApp } from "../../app-shell";
import "./ad-templates.css";
import { AdTemplatesCategoryFilter } from "./category-filter";
import { AD_TEMPLATE_COLUMNS } from "./data";
import { AdTemplatesPageHead } from "./page-head";
import { AdTemplatesPagination } from "./pagination";
import { AdTemplatesSelectionBar } from "./selection-bar";
import { AdTemplatesMasonry } from "./templates-masonry";

export const AdTemplatesPage: React.FC<{ panel?: React.ReactNode }> = ({ panel }) => (
  <RyzeApp workspace="ember-and-oak" page="Ad Templates" nav="Home" stretch panel={panel}>
    <div className="pg">
      <div className="pg-scroll">
        <div className="pg-inner wide">
          <AdTemplatesPageHead />
          <AdTemplatesCategoryFilter />
          <AdTemplatesMasonry columns={AD_TEMPLATE_COLUMNS} />
          <AdTemplatesPagination />
          <AdTemplatesSelectionBar />
        </div>
      </div>
    </div>
  </RyzeApp>
);
