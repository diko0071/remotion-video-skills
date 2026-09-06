import React from "react";
import { RyzeApp } from "../../app-shell";
import "./integrations.css";
import { INTEGRATION_CATEGORIES, INTEGRATION_GROUPS } from "./data";
import { IntegrationSection } from "./integration-section";
import {
  IntegrationsFilters,
  IntegrationsHead,
  IntegrationsSearch,
} from "./integrations-head";
import type { IntegrationState } from "./types";

export const IntegrationsBody: React.FC<{
  stateOverrides?: Partial<Record<string, IntegrationState>>;
  category?: string;
}> = ({ stateOverrides, category = "All" }) => (
  <div className="pg">
    <div className="pg-scroll" style={{ overflow: "hidden" }}>
      <div className="pg-inner wide">
        <IntegrationsHead />

        <IntegrationsSearch />

        <IntegrationsFilters
          categories={INTEGRATION_CATEGORIES}
          active={category}
        />

        {INTEGRATION_GROUPS.filter(
          (group) => category === "All" || group.category === category,
        ).map((group) => (
          <IntegrationSection
            key={group.category}
            group={{
              ...group,
              items: group.items.map((item) => {
                const state = stateOverrides?.[item.name];
                return state ? { ...item, state } : item;
              }),
            }}
          />
        ))}
      </div>
    </div>
  </div>
);

export const IntegrationsPage: React.FC = () => (
  <RyzeApp
    workspace="ember-and-oak"
    page="Integrations"
    nav="Integrations"
    stretch
  >
    <IntegrationsBody />
  </RyzeApp>
);
