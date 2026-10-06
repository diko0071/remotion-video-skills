import React from "react";
import { AbsoluteFill, Easing, Img, useCurrentFrame } from "remotion";
import { MASONRY, WIDGET, widgetOrigin, widgetPush } from "./geometry";
import { useLayout } from "./layout";
import { LIBRARY_ADS, LibraryAd } from "./library-ads";
import { C, SANS } from "../../kit/launch";
import { ACCENT, asset, W } from "./theme";
import { clamp01, lerp, pop, ramp, T } from "./timeline";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const fmtDate = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
};

const HEIGHT = Math.max(...MASONRY.map((b) => b.y + b.h)) + WIDGET.pad + 2 * WIDGET.border;

const Chip: React.FC<{ children: React.ReactNode; hot?: number }> = ({ children, hot = 0 }) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      height: 20,
      padding: "0 8px",
      borderRadius: 999,
      fontSize: 12,
      fontWeight: 500,
      lineHeight: 1,
      background: hot > 0.5 ? ACCENT : W.primary,
      color: hot > 0.5 ? C.ink : W.primaryFg,
      transform: `scale(${1 + 0.22 * Math.sin(Math.PI * clamp01(hot)) })`,
      transformOrigin: "0 50%",
    }}
  >
    {children}
  </span>
);

const Card: React.FC<{ ad: LibraryAd; i: number; f: number }> = ({ ad, i, f }) => {
  const box = MASONRY[i];
  const enter = pop(f, T.widget - 2 + i * 1.1, 15, 200);
  const hot = ad.winner >= 0 ? ramp(f, T.chipsHot + ad.winner * 3, 8) : 0;
  const dim = ad.winner < 0 ? ramp(f, T.chipsHot + 8, 10) : 0;
  const liftAt = T.lift + ad.winner * 3;
  const lifted = ad.winner >= 0 && f >= liftAt;
  const liftFade = ad.winner >= 0 ? ramp(f, liftAt, 5) : 0;
  const body = ad.headline || ad.body;
  return (
    <div
      style={{
        position: "absolute",
        left: box.x,
        top: box.y,
        width: box.w,
        height: box.h,
        border: `1px solid ${W.border}`,
        borderRadius: W.radius,
        overflow: "hidden",
        background: W.card,
        opacity: clamp01(enter * 2) * lerp(1, 0.35, dim) * (1 - liftFade),
        transform: `translateY(${(1 - enter) * 14}px) scale(${lerp(0.94, 1, enter)})`,
      }}
    >
      <div style={{ position: "relative", height: box.mediaH, background: W.muted }}>
        <Img src={asset(ad.src)} style={{ display: "block", width: "100%", height: box.mediaH, objectFit: "cover", opacity: lifted ? 0 : 1 }} />
        <div style={{ position: "absolute", left: 6, top: 6, display: "flex", gap: 4 }}>
          {ad.video ? <Chip>Video</Chip> : null}
          {ad.days >= 60 ? <Chip hot={hot}>{ad.days}d running</Chip> : null}
        </div>
      </div>
      <div style={{ height: WIDGET.meta, padding: 8, borderTop: `1px solid ${W.border}` }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 6, fontSize: 12, fontWeight: 600, lineHeight: "16px" }}>
          <span>Brex</span>
          <span style={{ fontSize: 11, fontWeight: 500, color: W.mutedFg, whiteSpace: "nowrap" }}>since {fmtDate(ad.start)}</span>
        </div>
        <p
          style={{
            margin: "4px 0 0",
            fontSize: 11,
            lineHeight: 1.5,
            color: W.mutedFg,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {body}
        </p>
      </div>
    </div>
  );
};

export const AdLibraryWidget: React.FC = () => {
  const f = useCurrentFrame();
  const l = useLayout();
  const o = widgetOrigin(l, f);
  const enter = pop(f, T.widget - 4, 16, 170);
  const exit = ramp(f, T.lift + 12, 24, Easing.inOut(Easing.cubic));
  if (f < T.widget - 4 || exit >= 1) return null;
  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: l.vis.cx - WIDGET.w / 2,
          top: o.y,
          boxSizing: "border-box",
          width: WIDGET.w,
          height: HEIGHT,
          fontFamily: SANS,
          fontSize: 14,
          color: W.foreground,
          background: W.card,
          border: `1px solid ${W.border}`,
          borderRadius: W.radius,
          transformOrigin: "50% 0",
          transform: `translateY(${(1 - enter) * 50 + exit * 120}px) scale(${l.chatUi * widgetPush(f)})`,
          opacity: clamp01(enter * 2) * (1 - exit),
        }}
      >
        <div style={{ position: "absolute", left: WIDGET.pad, right: WIDGET.pad, top: WIDGET.pad, height: 28, display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 600 }}>
            <Img src={asset("brand/ryze-sun.png")} style={{ width: 16, height: 16 }} />
            Ad Library
          </div>
          <span style={{ fontSize: 12, color: W.mutedFg }}>
            {LIBRARY_ADS.length} ads · <b style={{ fontWeight: 500, color: W.foreground }}>Brex</b>
          </span>
          <div
            style={{
              marginLeft: "auto",
              width: 200,
              height: 28,
              padding: "0 10px",
              border: `1px solid ${W.border}`,
              borderRadius: W.radius,
              display: "flex",
              alignItems: "center",
              fontSize: 12.8,
              color: W.mutedFg,
            }}
          >
            Filter by brand or copy
          </div>
        </div>
        {LIBRARY_ADS.map((ad, i) => (
          <Card key={ad.src} ad={ad} i={i} f={f} />
        ))}
      </div>
    </AbsoluteFill>
  );
};
