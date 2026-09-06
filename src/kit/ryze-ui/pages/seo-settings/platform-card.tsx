import React from "react";
import { Img, staticFile } from "remotion";
import { useClickPress } from "../../../../core/press-context";
import { PlugIcon } from "../../icons";
import "../../pages.css";
import "./seo-settings.css";
import {
  CONNECTED_LABEL,
  CONNECT_LABEL,
  PUBLISH_PLATFORMS,
  PUBLISHING,
  VIEW_LABEL,
} from "./data";
import type { PublishPlatform } from "./types";

export const PlatformCard: React.FC<{ platform: PublishPlatform }> = ({
  platform,
}) => {
  const scale = useClickPress(`settings.platform.${platform.id}`);
  return (
    <div
      className="st-plat"
      data-click={`settings.platform.${platform.id}`}
      style={{ scale: String(scale) }}
    >
      <div className="st-plat-top">
        <span
          className="st-plat-logo"
          style={platform.iconBg ? { background: platform.iconBg } : undefined}
        >
          <Img src={staticFile(platform.icon)} />
        </span>
        <div className="st-plat-body">
          <div className="st-plat-title-row">
            <span className="st-plat-name">{platform.name}</span>
            {platform.state === "connected" ? (
              <span className="spill ok">
                <span className="dot" />
                {CONNECTED_LABEL}
              </span>
            ) : null}
          </div>
          <p className="st-plat-desc">{platform.description}</p>
        </div>
      </div>
      <div className="st-plat-actions">
        {platform.state === "connected" ? (
          <span className="btn-outline">{VIEW_LABEL}</span>
        ) : (
          <span className="btn-primary">
            <PlugIcon />
            {CONNECT_LABEL}
          </span>
        )}
      </div>
    </div>
  );
};

export const PublishingPlatformsSection: React.FC<{
  platforms?: PublishPlatform[];
  style?: React.CSSProperties;
}> = ({ platforms = PUBLISH_PLATFORMS, style }) => (
  <section className="st-section" style={style}>
    <div className="st-section-head">
      <h2 className="st-section-title">{PUBLISHING.platformsLabel}</h2>
      <p className="st-section-hint">{PUBLISHING.platformsHint}</p>
    </div>
    <div className="st-plat-grid">
      {platforms.map((platform) => (
        <PlatformCard key={platform.id} platform={platform} />
      ))}
    </div>
  </section>
);
