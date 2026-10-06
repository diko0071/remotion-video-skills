import React from "react";
import { Img, interpolateColors, staticFile, useCurrentFrame } from "remotion";
import { ramp } from "../../../core/motion";
import { FONT, P, Skeleton } from "../../../kit/product-ui";
import { SITE } from "../data";

export const ARTICLE = { w: 720, h: 336 } as const;

const TLDR = ["Soy burns cooler and slower than paraffin", "Paraffin throws scent faster in big rooms", "Trim the wick to 5 mm for a clean burn"] as const;
const FAQ = ["Is soy wax really cleaner?", "Why does my candle tunnel?"] as const;
const LINKS = ["/collections/soy-candles", "/products/cedar-ember-18oz"] as const;

const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", color: P.brandDeep }}>{children}</div>
);

export const ArticleCard: React.FC<{ titles: readonly { at: number; title: string; slug: string }[]; summaryAt: number; faqAt: number; imageAt: number; linksAt: number }> = ({ titles, summaryAt, faqAt, imageAt, linksAt }) => {
  const f = useCurrentFrame();
  const linkHl = ramp(f, linksAt, linksAt + 8);
  let ti = 0;
  titles.forEach((t, i) => {
    if (f >= t.at) ti = i;
  });
  const swap = ramp(f, titles[ti].at, titles[ti].at + 6);
  const on = (at: number) => ramp(f, at - 2, at + 6);
  return (
    <div className="pg-card" style={{ width: ARTICLE.w, height: ARTICLE.h, boxSizing: "border-box", padding: 22, fontFamily: FONT, boxShadow: "0 0 0 1px rgba(15,23,42,0.1), 0 12px 32px rgba(15,23,42,0.06)" }}>
      <div style={{ opacity: ti === 0 ? 1 : swap, transform: `translateY(${ti === 0 ? 0 : (1 - swap) * 10}px)` }}>
        <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em", color: P.fg }}>{titles[ti].title}</div>
        <div style={{ marginTop: 4, fontSize: 12, color: P.mutedFg }}>
          {SITE}/blogs/journal/{titles[ti].slug}
        </div>
      </div>
      <div style={{ marginTop: 18, display: "flex", gap: 22 }}>
        <div style={{ width: 400, display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ position: "relative", width: 400, minHeight: 104 }}>
            <Skeleton w={400} h={104} on={on(summaryAt)} />
            <div style={{ width: 400, boxSizing: "border-box", padding: 12, borderRadius: P.radius, background: P.muted, opacity: on(summaryAt) }}>
              <Label>TL;DR</Label>
              <div style={{ marginTop: 6, display: "flex", flexDirection: "column", gap: 4 }}>
                {TLDR.map((t) => (
                  <div key={t} style={{ fontSize: 12.5, color: P.fg }}>• {t}</div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ position: "relative", width: 400, minHeight: 96 }}>
            <Skeleton w={400} h={96} rows={3} on={on(faqAt)} />
            <div style={{ width: 400, opacity: on(faqAt) }}>
              <Label>FAQ</Label>
              <div style={{ marginTop: 6 }}>
                {FAQ.map((q, i) => (
                  <div key={q} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderTop: i === 0 ? "none" : `1px solid ${P.border}`, fontSize: 13, fontWeight: 500, color: P.fg }}>
                    {q}
                    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={P.mutedFg} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ position: "relative", width: 254, height: 143 }}>
            <Skeleton w={254} h={143} rows={0} on={on(imageAt)} />
            <Img src={staticFile("hero-candles.jpg")} style={{ width: 254, height: 143, objectFit: "cover", borderRadius: P.radius, display: "block", opacity: on(imageAt) }} />
          </div>
          <div style={{ position: "relative", width: 254, minHeight: 64 }}>
            <Skeleton w={254} h={64} rows={2} on={on(linksAt)} />
            <div style={{ width: 254, opacity: on(linksAt) }}>
              <Label>Links to your pages</Label>
              <div style={{ marginTop: 6, display: "flex", flexDirection: "column", gap: 6 }}>
                {LINKS.map((l) => (
                  <span key={l} style={{ fontSize: 12, fontWeight: 600, color: interpolateColors(linkHl, [0, 1], [P.fg, P.brandDeep]), textDecoration: "underline", textDecorationColor: `color-mix(in srgb, ${P.brand} ${60 * linkHl}%, transparent)` }}>
                    → {l}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
