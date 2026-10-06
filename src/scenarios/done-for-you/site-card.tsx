import React from "react";
import { Img, staticFile } from "remotion";
import { SCAN_SITE, SITE } from "./timings";

export const BROWSER_BAR = 54;

export const SiteCard: React.FC<{
  image?: string;
  w?: number;
  h?: number;
  radius?: number;
  shadow?: boolean;
  children?: React.ReactNode;
}> = ({ image = SITE.after, w = SCAN_SITE.w, h = SCAN_SITE.h, radius = 18, shadow = true, children }) => (
  <div
    style={{
      width: w,
      height: h,
      background: "#FFFFFF",
      borderRadius: radius,
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      boxShadow: shadow ? "0 24px 70px rgba(74,53,29,0.22)" : undefined,
      border: "1px solid rgba(23,19,16,0.08)",
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 18px", height: BROWSER_BAR, borderBottom: "1px solid rgba(23,19,16,0.08)", background: "#FFFFFF", flexShrink: 0 }}>
      {["#F87171", "#FBBF24", "#34D399"].map((c) => (
        <span key={c} style={{ width: 12, height: 12, borderRadius: 6, background: c }} />
      ))}
      <span style={{ marginLeft: 14, fontSize: 18, fontWeight: 600, color: "rgba(23,19,16,0.55)", background: "rgba(23,19,16,0.05)", borderRadius: 8, padding: "5px 16px" }}>{SITE.domain}</span>
    </div>
    <div style={{ position: "relative", flex: 1, overflow: "hidden" }}>
      <Img src={staticFile(image)} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" }} />
      {children}
    </div>
  </div>
);
