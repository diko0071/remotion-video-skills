import React from "react";
import { Img } from "remotion";
import { Favicon } from "./icons";
import { CARD } from "./story";
import { asset, C, R, SHADOW } from "./theme";
import { clamp01, lerp } from "./timeline";

export const CARD_RADIUS = 5;
const DETAILS_MAX = 240;

export const OutlineChip: React.FC<{ children: React.ReactNode; size?: number; style?: React.CSSProperties }> = ({
  children,
  size = CARD.body,
  style,
}) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: size * 0.45,
      padding: `${size * 0.34}px ${size * 0.7}px`,
      borderRadius: R.md,
      border: `1px solid ${C.border}`,
      background: "rgba(255,255,255,0.95)",
      boxShadow: SHADOW.chip,
      fontSize: size,
      fontWeight: 700,
      lineHeight: 1.2,
      color: C.ink,
      whiteSpace: "nowrap",
      ...style,
    }}
  >
    {children}
  </span>
);

export const AdCard: React.FC<{
  src: string;
  width: number;
  mediaH: number;
  brand: string;
  domain: string;
  host: string;
  headline?: string;
  body?: string;
  footerRight?: React.ReactNode;
  topLeft?: React.ReactNode;
  details: number;
  ring?: number;
}> = ({ src, width, mediaH, brand, domain, host, headline, body, footerRight, topLeft, details, ring = 0 }) => {
  const d = clamp01(details);
  return (
    <div
      style={{
        width,
        borderRadius: CARD_RADIUS,
        overflow: "hidden",
        background: C.paper,
        border: `1.5px solid ${ring > 0.02 ? C.brandLight : C.border}`,
        boxShadow: `0 0 0 ${3 * ring}px ${C.brandLight}, 0 0 ${44 * ring}px rgba(214,165,108,${0.6 * ring}), 0 1px 2px rgba(74,53,29,0.03), 0 20px 46px rgba(10,40,90,0.28)`,
      }}
    >
      <div style={{ position: "relative", width: "100%", height: mediaH, background: C.muted }}>
        <Img src={asset(src)} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
        <span style={{ position: "absolute", right: 10, top: 10, opacity: d, transform: `translateY(${(1 - d) * -6}px)` }}>
          <OutlineChip>
            <Favicon domain={domain} size={CARD.body * 1.1} radius={3} />
            {brand}
          </OutlineChip>
        </span>
        {topLeft ? (
          <span style={{ position: "absolute", left: 10, top: 10, opacity: d, transform: `translateY(${(1 - d) * -6}px)` }}>
            {topLeft}
          </span>
        ) : null}
      </div>
      <div style={{ maxHeight: DETAILS_MAX * d, overflow: "hidden" }}>
        <div style={{ padding: `${CARD.pad * 0.85}px ${CARD.pad}px ${CARD.pad}px`, opacity: lerp(0, 1, d) }}>
          {headline ? (
            <div
              style={{
                fontSize: CARD.headline,
                fontWeight: 600,
                lineHeight: 1.35,
                letterSpacing: "-0.01em",
                color: "#1a0e06",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {headline}
            </div>
          ) : null}
          {body ? (
            <div
              style={{
                marginTop: headline ? 6 : 0,
                fontSize: headline ? CARD.body : CARD.headline * 0.92,
                fontWeight: headline ? 400 : 500,
                lineHeight: 1.4,
                color: headline ? C.mutedFg : "#1a0e06",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {body}
            </div>
          ) : null}
        </div>
        <div
          style={{
            height: CARD.footer,
            borderTop: `1px solid rgba(231,224,214,0.6)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 10,
            padding: `0 ${CARD.pad}px`,
            fontSize: CARD.body,
            color: C.mutedFg,
            opacity: lerp(0, 1, d),
          }}
        >
          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{host}</span>
          {footerRight}
        </div>
      </div>
    </div>
  );
};

export const DaysLive: React.FC<{ days: number }> = ({ days }) => (
  <span style={{ display: "inline-flex", alignItems: "center", gap: 8, color: C.ink, fontWeight: 600, whiteSpace: "nowrap" }}>
    <span style={{ width: 9, height: 9, borderRadius: 9, background: C.emerald }} />
    {days} days live
  </span>
);
