import React from "react";
import { Img, interpolate, staticFile } from "remotion";
import { SPRINGS, useSpringAt } from "../../../../core/motion";
import { useClickPress } from "../../../../core/press-context";
import "./competitor-ads.css";
import { LIGHTBOX_LABELS } from "./data";
import { CloseGlyph, ExternalLinkGlyph, WandGlyph } from "./icons";
import { AdCard } from "./types";

const InfoRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="cmp-lb-row">
    <span className="cmp-lb-row-label">{label}</span>
    <b className="cmp-lb-row-value">{value}</b>
  </div>
);

const platformLabel = (platform: AdCard["platform"]) =>
  platform === "meta" ? "Meta" : "Google";

export const CreativeLightbox: React.FC<{
  at: number;
  ad: AdCard;
  visible?: boolean;
}> = ({ at, ad, visible = true }) => {
  const p = useSpringAt(at, SPRINGS.panel, 22);
  const generateScale = useClickPress("comp.lightbox.generate");
  const closeScale = useClickPress("comp.lightbox.close");
  const l = LIGHTBOX_LABELS;
  return (
    <div className="cmp-veil" style={{ opacity: visible ? p : 0 }}>
      <div
        className="cmp-lb"
        data-click="comp.lightbox.dialog"
        style={{ transform: `translateY(${interpolate(p, [0, 1], [14, 0])}px)` }}
      >
        <span
          className="cmp-lb-close"
          data-click="comp.lightbox.close"
          style={{ scale: String(closeScale) }}
        >
          <CloseGlyph />
        </span>
        <div className="cmp-lb-media">
          {ad.format === "text" ? (
            <div className="cmp-text-ad full">
              <span className="cmp-ad-label">Ad</span>
              <span className="cmp-ad-domain">{ad.brand.domain}</span>
              {ad.headline ? <span className="cmp-ad-headline">{ad.headline}</span> : null}
              {ad.body ? <span className="cmp-ad-body">{ad.body}</span> : null}
            </div>
          ) : (
            <Img src={staticFile(ad.image as string)} className="cmp-lb-img" />
          )}
        </div>
        <div className="cmp-lb-side">
          <div className="cmp-lb-brand">
            <span className="cmp-lb-brand-tile">
              <Img src={staticFile(ad.brand.favicon)} />
            </span>
            <b>{ad.brand.name}</b>
          </div>
          {ad.headline ? <h4 className="cmp-lb-headline">{ad.headline}</h4> : null}
          {ad.body ? <p className="cmp-lb-body">{ad.body}</p> : null}
          {ad.cta ? <span className="cmp-lb-cta">{ad.cta}</span> : null}
          <div className="cmp-lb-info">
            <InfoRow label={l.format} value={ad.format === "text" ? "Text" : "Image"} />
            <InfoRow label={l.platform} value={platformLabel(ad.platform)} />
            <InfoRow label={l.running} value={`${ad.runningDays}d`} />
            <InfoRow
              label={l.status}
              value={ad.active === false ? l.statusInactive : l.statusActive}
            />
          </div>
          <div className="cmp-lb-actions">
            <span
              className="btn-primary"
              data-click="comp.lightbox.generate"
              style={{ scale: String(generateScale) }}
            >
              <WandGlyph />
              {l.generateSimilar}
            </span>
            <span className="btn-outline" data-click="comp.lightbox.open">
              <ExternalLinkGlyph />
              {l.openOriginal}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
