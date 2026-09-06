import React from "react";
import { RyzeApp } from "../../app-shell";
import "../../pages.css";
import "./seo-settings.css";
import {
  PUBLISHING,
  SEO_SETTINGS_GROUPS,
  SEO_SETTINGS_SUBTITLE,
  SEO_SETTINGS_TITLE,
} from "./data";
import { PublishToSelect, PublishingModeControl } from "./mode-control";
import { PublishingPlatformsSection } from "./platform-card";
import { SectionRow, SettingsSection } from "./settings-section";
import { SettingsSwitch } from "./switch";
import type { PublishPlatform, PublishingMode } from "./types";

export const SeoSettingsBody: React.FC<{
  mode?: PublishingMode;
  publishTo?: string;
  blogUrl?: string;
  backlinks?: boolean;
  platforms?: PublishPlatform[];
  sectionStyle?: React.CSSProperties;
  platformsStyle?: React.CSSProperties;
}> = ({
  mode = "auto",
  publishTo = "Shopify",
  blogUrl,
  backlinks = true,
  platforms,
  sectionStyle,
  platformsStyle,
}) => (
  <div className="pg">
    <div className="pg-scroll">
      <div className="pg-inner wide">
        <div className="pg-head">
          <div>
            <h1 className="pg-h1">{SEO_SETTINGS_TITLE}</h1>
            <p className="pg-sub">{SEO_SETTINGS_SUBTITLE}</p>
          </div>
        </div>
        <div className="st-tabs">
          <span className="st-tab" data-click="settings.tab.content">
            {SEO_SETTINGS_GROUPS.content}
          </span>
          <span className="st-tab on" data-click="settings.tab.publishing">
            {SEO_SETTINGS_GROUPS.publishing}
          </span>
        </div>
        <SettingsSection
          title={PUBLISHING.title}
          hint={PUBLISHING.hint}
          style={sectionStyle}
        >
          <SectionRow
            label={PUBLISHING.modeLabel}
            hint={mode === "auto" ? PUBLISHING.autoHint : PUBLISHING.manualHint}
            control={<PublishingModeControl mode={mode} />}
          />
          <SectionRow
            label={PUBLISHING.targetLabel}
            hint={PUBLISHING.targetHint}
            control={<PublishToSelect value={publishTo} />}
          />
          <SectionRow
            stacked
            label={PUBLISHING.blogUrlLabel}
            hint={PUBLISHING.blogUrlHint}
            control={
              <div className="st-blogurl">
                <span className={`st-input${blogUrl ? "" : " placeholder"}`}>
                  {blogUrl ?? PUBLISHING.blogUrlPlaceholder}
                </span>
                {blogUrl ? (
                  <span className="st-blogurl-preview">
                    {PUBLISHING.blogUrlPreview}{" "}
                    <b>
                      {blogUrl}/{"{slug}"}
                    </b>
                  </span>
                ) : null}
              </div>
            }
          />
          <SectionRow
            label={PUBLISHING.backlinksLabel}
            hint={PUBLISHING.backlinksHint}
            control={
              <span data-click="settings.backlinks" style={{ display: "inline-flex" }}>
                <SettingsSwitch on={backlinks} />
              </span>
            }
          />
        </SettingsSection>
        <PublishingPlatformsSection
          platforms={platforms}
          style={platformsStyle}
        />
      </div>
    </div>
  </div>
);

export const SeoSettingsPage: React.FC<{
  mode?: PublishingMode;
  publishTo?: string;
  blogUrl?: string;
  backlinks?: boolean;
  platforms?: PublishPlatform[];
}> = (props) => (
  <RyzeApp
    workspace="ember-and-oak"
    page="Settings"
    nav="SEO"
    credits="4,180"
    stretch
  >
    <SeoSettingsBody {...props} />
  </RyzeApp>
);
