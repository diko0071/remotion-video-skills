import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { press, SPRINGS, useReveal, useSpringAt } from "../core/motion";

export const CampaignPanel: React.FC<{
  appearAt: number;
  clickAt: number;
  liveAt: number;
  title: string;
  meta: string;
  liveMeta: string;
  logos: string[];
  thumbs: string[];
  buttonLabel?: string;
  liveLabel?: string;
  width?: number;
  objectId?: string;
  buttonId?: string;
}> = ({
  appearAt,
  clickAt,
  liveAt,
  title,
  meta,
  liveMeta,
  logos,
  thumbs,
  buttonLabel = "Launch",
  liveLabel = "Live",
  width = 860,
  objectId = "campaign.ready",
  buttonId = "campaign.launch",
}) => {
  const frame = useCurrentFrame();
  const style = useReveal(appearAt, 90, 24);
  const live = useSpringAt(liveAt, SPRINGS.pop, 20);
  if (frame < appearAt - 2) return null;
  return (
    <div
      data-click={objectId}
      style={{
        ...style,
        width,
        background: "#FFFFFF",
        borderRadius: 14,
        border: "1px solid rgba(23,19,16,0.08)",
        boxShadow: "0 16px 44px rgba(74,53,29,0.16)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          padding: "18px 22px",
          borderBottom: "1px solid rgba(23,19,16,0.06)",
        }}
      >
        <span style={{ display: "flex", gap: 8 }}>
          {logos.map((logo) => (
            <Img
              key={logo}
              src={staticFile(logo)}
              style={{ width: 34, height: 34, objectFit: "contain", display: "block" }}
            />
          ))}
        </span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 19, fontWeight: 700 }}>{title}</div>
          <div style={{ fontSize: 14, color: "var(--muted-foreground)", marginTop: 2 }}>
            <span style={{ display: "block", minHeight: 20 }}>{live > 0.5 ? liveMeta : meta}</span>
          </div>
        </div>
        <div
          data-click={buttonId}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 152,
            height: 48,
            flexShrink: 0,
            background: live > 0.5 ? "#059669" : "#171310",
            color: "#FFFFFF",
            borderRadius: 8,
            fontSize: 17,
            fontWeight: 700,
            transform: `scale(${press(frame, clickAt)})`,
          }}
        >
          {live > 0.5 ? liveLabel : buttonLabel}
        </div>
      </div>
      {thumbs.length === 0 ? null : (
      <div style={{ display: "flex", gap: 12, padding: 18 }}>
        {thumbs.map((file) => (
          <div key={file} style={{ flex: 1, borderRadius: 10, overflow: "hidden" }}>
            <Img
              src={staticFile(file)}
              style={{ width: "100%", aspectRatio: "1 / 1", objectFit: "contain", background: "#0A0E22", display: "block" }}
            />
          </div>
        ))}
      </div>
      )}
    </div>
  );
};
