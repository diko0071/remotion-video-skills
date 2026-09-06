import React from "react";
import { RyzeApp } from "../../app-shell";
import "./creatives.css";
import { CREATIVES } from "./data";
import { CreativesMasonry } from "./creatives-masonry";
import { CreativesPager } from "./creatives-pager";
import { CreativesPageHead, CreativesSearchBar } from "./page-head";

export const CreativesPage: React.FC<{ panel?: React.ReactNode }> = ({ panel }) => (
  <RyzeApp workspace="ember-and-oak" page="Ad Creatives" nav="Home" stretch panel={panel}>
    <div className="pg">
      <div className="pg-scroll">
        <div className="pg-inner wide">
          <CreativesPageHead />
          <CreativesSearchBar />
          <CreativesMasonry creatives={CREATIVES} />
          <CreativesPager />
        </div>
      </div>
    </div>
  </RyzeApp>
);
