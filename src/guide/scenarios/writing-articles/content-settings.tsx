import React from "react";
import "../../../kit/ryze-ui/pages.css";
import "../../../kit/ryze-ui/pages/seo-settings/seo-settings.css";
import {
  LanguageSection,
  SEO_SETTINGS_GROUPS,
  SEO_SETTINGS_SUBTITLE,
  SEO_SETTINGS_TITLE,
  VisualsSection,
  WritingSection,
} from "../../../kit/ryze-ui/pages/seo-settings";

export const ContentSettingsBody: React.FC<{
  writing?: React.ComponentProps<typeof WritingSection>;
  visuals?: React.ComponentProps<typeof VisualsSection>;
  scrollPx?: number;
}> = ({ writing, visuals, scrollPx = 0 }) => (
  <div className="pg">
    <div className="pg-scroll" style={{ overflow: "hidden" }}>
      <div className="pg-inner wide" style={{ marginTop: -scrollPx }}>
        <div className="pg-head">
          <div>
            <h1 className="pg-h1">{SEO_SETTINGS_TITLE}</h1>
            <p className="pg-sub">{SEO_SETTINGS_SUBTITLE}</p>
          </div>
        </div>
        <div className="st-tabs">
          <span className="st-tab on" data-click="settings.tab.content">
            {SEO_SETTINGS_GROUPS.content}
          </span>
          <span className="st-tab" data-click="settings.tab.publishing">
            {SEO_SETTINGS_GROUPS.publishing}
          </span>
        </div>
        <LanguageSection />
        <WritingSection {...writing} />
        <VisualsSection {...visuals} />
      </div>
    </div>
  </div>
);
