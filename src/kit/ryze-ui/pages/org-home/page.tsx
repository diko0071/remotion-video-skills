import React from "react";
import { RyzeApp } from "../../app-shell";
import "../../pages.css";
import "./org-home.css";
import { OrgConnectCard } from "./connect-card";
import { ORG_TEMPLATES } from "./data";
import { OrgHomePageHead } from "./page-head";
import { OrgUseCasesCard } from "./use-cases-card";

export const OrgHomePage: React.FC = () => (
  <RyzeApp workspace="ember-and-oak" page="Home" nav="Home" stretch>
    <div className="pg">
      <div className="pg-scroll oh-scroll">
        <div className="pg-inner wide">
          <OrgHomePageHead />
          <OrgConnectCard />
          <OrgUseCasesCard templates={ORG_TEMPLATES} />
        </div>
      </div>
    </div>
  </RyzeApp>
);
