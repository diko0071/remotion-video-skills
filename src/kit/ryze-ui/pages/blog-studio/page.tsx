import React from "react";
import { RyzeApp } from "../../app-shell";
import "./blog-studio.css";
import { COLORS, CORNERS, FEATURE, LAYOUTS, REST, SIDE, THEMES } from "./data";
import { StudioPanel } from "./studio-panel";
import { StudioPreview } from "./studio-preview";
import { StudioSeoPane } from "./seo-pane";
import { StudioTopbar } from "./studio-topbar";

export const BlogStudioBody: React.FC<{
  activeTheme?: string;
  dark?: boolean;
  domain?: string;
  mode?: "Design" | "SEO";
  seoVerified?: boolean;
  seoChecking?: boolean;
  panelHidden?: boolean;
  matched?: boolean;
  domainPopover?: boolean;
}> = ({ activeTheme = "warm", dark = false, domain, mode = "Design", seoVerified, seoChecking, panelHidden, matched, domainPopover }) => (
  <div className="bs-frame">
    <StudioTopbar domain={domain} mode={mode} domainPopover={domainPopover} />

    <div className="bs-body">
      {panelHidden ? null : mode === "SEO" ? (
        <StudioSeoPane verified={seoVerified} checking={seoChecking} />
      ) : (
        <StudioPanel
          themes={THEMES}
          colors={COLORS}
          corners={CORNERS}
          layouts={LAYOUTS}
          activeTheme={activeTheme}
        />
      )}

      <StudioPreview feature={FEATURE} side={SIDE} rest={REST} dark={dark} matched={matched} />
    </div>
  </div>
);

export const BlogStudioPage: React.FC = () => (
  <RyzeApp workspace="ember-and-oak" page="Blog Studio" nav="SEO" stretch>
    <BlogStudioBody />
  </RyzeApp>
);
