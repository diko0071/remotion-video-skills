import React from "react";
import { RyzeApp } from "../../app-shell";
import "../../pages.css";
import "./content-plan.css";
import {
  CONTENT_PLAN_KPIS,
  CONTENT_PLAN_ROWS,
  CONTENT_PLAN_SUB,
  CONTENT_PLAN_TABS,
  CONTENT_PLAN_TITLE,
} from "./data";
import { ContentPlanKpis } from "./kpis";
import { ContentPlanHead } from "./page-head";
import { ContentPlanPagination } from "./pagination";
import { ContentPlanTable } from "./table";

export const ContentPlanBody: React.FC<
  Omit<React.ComponentProps<typeof ContentPlanTable>, "rows" | "tabs"> & {
    rows?: React.ComponentProps<typeof ContentPlanTable>["rows"];
    tabs?: React.ComponentProps<typeof ContentPlanTable>["tabs"];
    kpis?: React.ComponentProps<typeof ContentPlanKpis>["items"];
  }
> = ({ rows = CONTENT_PLAN_ROWS, tabs = CONTENT_PLAN_TABS, kpis = CONTENT_PLAN_KPIS, ...tableProps }) => (
  <div className="pg">
    <div className="pg-scroll" style={{ overflow: "hidden" }}>
      <div className="pg-inner wide">
        <ContentPlanHead
          title={CONTENT_PLAN_TITLE}
          sub={CONTENT_PLAN_SUB}
          view="list"
        />
        <ContentPlanKpis items={kpis} />
        <ContentPlanTable
          rows={rows}
          tabs={tabs}
          {...tableProps}
        />
        <ContentPlanPagination />
      </div>
    </div>
  </div>
);

export const ContentPlanPage: React.FC = () => (
  <RyzeApp workspace="ember-and-oak" page="Content Plan" nav="SEO" stretch>
    <ContentPlanBody />
  </RyzeApp>
);
