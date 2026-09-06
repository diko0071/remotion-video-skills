import React from "react";
import { Img, staticFile } from "remotion";
import { useClickPress } from "../../../../core/press-context";
import { TileImg } from "../../../tile-img";
import "./competitor-ads.css";
import { BookmarkFilledGlyph, BookmarkPlusGlyph } from "./icons";
import { AdCard } from "./types";

export const CompetitorAdCard: React.FC<{
  ad: AdCard;
  showTrack?: boolean;
  style?: React.CSSProperties;
}> = ({ ad, showTrack = false, style }) => {
  const scale = useClickPress(`comp.ad.${ad.id}`);
  const showBody = Boolean(
    ad.body && ad.headline && ad.body !== ad.headline && !ad.headline.startsWith(ad.body),
  );
  return (
    <div
      className="cmp-card"
      data-click={`comp.ad.${ad.id}`}
      style={{ scale: String(scale), ...style }}
    >
      {ad.format === "text" ? (
        <div className="cmp-text-ad">
          <span className="cmp-ad-label">Ad</span>
          <span className="cmp-ad-domain">{ad.brand.domain}</span>
          {ad.headline ? <span className="cmp-ad-headline">{ad.headline}</span> : null}
          {ad.body ? <span className="cmp-ad-body">{ad.body}</span> : null}
        </div>
      ) : (
        <>
          <div className="cmp-media" style={{ aspectRatio: String(ad.mediaAspect ?? 0.85) }}>
            <TileImg file={ad.image as string} />
          </div>
          {ad.headline || ad.body ? (
            <div className="cmp-body">
              {ad.headline ? <p className="cmp-headline">{ad.headline}</p> : null}
              {showBody ? <p className="cmp-copy">{ad.body}</p> : null}
            </div>
          ) : null}
        </>
      )}
      <span className="cmp-tag">
        <span className="cmp-brand">
          <Img src={staticFile(ad.brand.favicon)} />
          <span>{ad.brand.name}</span>
        </span>
        {showTrack && !ad.tracked ? (
          <span className="cmp-bookmark" data-click={`comp.ad-track.${ad.id}`}>
            <BookmarkPlusGlyph />
          </span>
        ) : null}
        {showTrack && ad.tracked ? (
          <span className="cmp-bookmark tracked">
            <BookmarkFilledGlyph />
          </span>
        ) : null}
      </span>
      {ad.landingHost ? (
        <div className="cmp-foot">
          <span className="cmp-host">{ad.landingHost}</span>
          <span className="cmp-cta">{ad.cta ?? "Learn more"}</span>
        </div>
      ) : null}
    </div>
  );
};
