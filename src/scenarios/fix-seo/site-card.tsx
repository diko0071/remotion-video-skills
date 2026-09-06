import React from "react";
import { Img, staticFile } from "remotion";
import { SCAN_SITE } from "./timings";

export const SiteCard: React.FC<{ label?: string }> = ({ label = "dusk.app" }) => (
  <div
    style={{
      width: SCAN_SITE.w,
      height: SCAN_SITE.h,
      background: "#FFFFFF",
      borderRadius: 18,
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      boxShadow: "0 24px 70px rgba(74,53,29,0.22)",
      border: "1px solid rgba(255,255,255,0.65)",
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "14px 18px",
        borderBottom: "1px solid rgba(23,19,16,0.08)",
        background: "#FFFFFF",
        flexShrink: 0,
      }}
    >
      {["#F87171", "#FBBF24", "#34D399"].map((c) => (
        <span key={c} style={{ width: 12, height: 12, borderRadius: 6, background: c }} />
      ))}
      <span
        style={{
          marginLeft: 14,
          fontSize: 18,
          fontWeight: 600,
          color: "rgba(23,19,16,0.55)",
          background: "rgba(23,19,16,0.05)",
          borderRadius: 8,
          padding: "5px 16px",
        }}
      >
        {label}
      </span>
    </div>
    <Img
      src={staticFile("dusk/site/after.png")}
      style={{ width: "100%", flex: 1, objectFit: "cover", objectPosition: "top", display: "block" }}
    />
  </div>
);
