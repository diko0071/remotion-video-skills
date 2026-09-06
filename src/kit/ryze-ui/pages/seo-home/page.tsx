import React from "react";
import { RyzeApp } from "../../app-shell";
import "../../pages.css";
import "./seo-home.css";
import { GROWTH_PHASES, SETUP_STEPS } from "./data";
import { ProjectionSection } from "./projection-section";
import { SetupCard } from "./setup-card";

export const SeoHomePage: React.FC = () => (
  <RyzeApp workspace="ember-and-oak" page="Home" nav="Home" stretch>
    <div className="pg sh-page">
      <div className="pg-scroll">
        <div className="pg-inner wide">
          <div className="pg-head">
            <div>
              <div className="pg-h1">Home</div>
            </div>
          </div>

          <SetupCard steps={SETUP_STEPS} />

          <ProjectionSection phases={GROWTH_PHASES} />
        </div>
      </div>
    </div>
  </RyzeApp>
);
