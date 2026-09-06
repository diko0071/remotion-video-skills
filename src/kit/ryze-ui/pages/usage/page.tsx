import React from "react";
import { RyzeApp } from "../../app-shell";
import "./usage.css";
import { UsageBreakdownCard } from "./breakdown-card";
import { USAGE_USERS, USAGE_WORKSPACES } from "./data";
import { UsageChartCard } from "./usage-chart";
import { UsageFilters, UsageHead, UsageQuota } from "./usage-quota";

export const UsagePage: React.FC = () => (
  <RyzeApp workspace="ember-and-oak" page="Usage" nav="Home" stretch>
    <div className="pg">
      <div className="pg-scroll" style={{ padding: "32px 20px" }}>
        <div className="pg-inner wide">
          <UsageHead />
          <UsageQuota />
          <UsageFilters />
          <UsageChartCard />
          <div className="us-break">
            <UsageBreakdownCard title="Workspaces" entries={USAGE_WORKSPACES} />
            <UsageBreakdownCard
              title="Users"
              entries={USAGE_USERS}
              withAvatar
            />
          </div>
        </div>
      </div>
    </div>
  </RyzeApp>
);
