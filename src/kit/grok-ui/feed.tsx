import React from "react";
import { Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { SPRINGS, useSpringAt } from "../../core/motion";
import { Bloub } from "./bloub";
import type { BotAvatar } from "./sidebar";

export const FEED = {
  ground: "#0A0A0B",
  ink: "#F1F1F3",
  muted: "#9A9AA1",
  green: "#3CC26A",
  fill: "#161618",
  border: "1px solid #26262B",
  colW: 940,
  avatar: 64,
  indent: 64 + 18,
} as const;

export const feedReveal = (frame: number, at: number, span = 12) =>
  interpolate(frame, [at, at + span], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

export const feedRise = (p: number, d = 26): React.CSSProperties => ({ opacity: p, transform: `translateY(${(1 - p) * d}px)` });

export const FeedLogo: React.FC<{ file: string; size?: number; inline?: boolean }> = ({ file, size = 36, inline = true }) => (
  <span style={{ display: "inline-flex", width: size, height: size, borderRadius: size * 0.28, background: "#fff", alignItems: "center", justifyContent: "center", verticalAlign: inline ? "-8px" : undefined, marginRight: inline ? 12 : 0, flexShrink: 0 }}>
    <Img src={staticFile(file)} style={{ width: size * 0.62, height: size * 0.62, objectFit: "contain", display: "block" }} />
  </span>
);

export const FeedBotLine: React.FC<{ at: number; avatar: BotAvatar; children: React.ReactNode; gaze?: { x: number; y: number }; logo?: string }> = ({ at, avatar, children, gaze, logo }) => {
  const p = useSpringAt(at, SPRINGS.card, 16);
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 18, ...feedRise(Math.min(1, p * 1.4), 20) }}>
      <span style={{ width: FEED.avatar, height: FEED.avatar, flexShrink: 0 }}>
        <Bloub size={FEED.avatar} shape={avatar.shape} color={avatar.color} gaze={gaze} />
      </span>
      <div style={{ background: FEED.fill, border: FEED.border, borderRadius: 26, padding: "20px 26px", fontSize: 28, color: FEED.ink, lineHeight: "38px", maxWidth: FEED.colW - FEED.indent - 40, display: "flex", alignItems: "flex-start", gap: 12 }}>
        {logo ? <span style={{ marginTop: 1 }}><FeedLogo file={logo} inline={false} /></span> : null}
        <span>{children}</span>
      </div>
    </div>
  );
};

export const FeedUserLine: React.FC<{ at: number; children: React.ReactNode }> = ({ at, children }) => {
  const p = useSpringAt(at, SPRINGS.pop, 14);
  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <div style={{ background: FEED.ink, color: FEED.ground, borderRadius: 26, padding: "18px 28px", fontSize: 30, fontWeight: 500, transform: `scale(${interpolate(p, [0, 1], [0.7, 1])})`, transformOrigin: "right bottom", opacity: Math.min(1, p * 2) }}>{children}</div>
    </div>
  );
};

export const FeedCard: React.FC<{ children: React.ReactNode; at: number }> = ({ children, at }) => {
  const p = useSpringAt(at, SPRINGS.card, 18);
  return (
    <div style={{ marginLeft: FEED.indent, marginTop: 6, width: FEED.colW - FEED.indent, background: FEED.fill, border: FEED.border, borderRadius: 26, padding: 22, overflow: "hidden", maxHeight: interpolate(p, [0, 1], [0, 900]), opacity: Math.min(1, p * 1.5), transform: `translateY(${(1 - p) * 18}px)` }}>
      {children}
    </div>
  );
};

export const FeedBotLabel: React.FC<{ at: number; name: string }> = ({ at, name }) => {
  const frame = useCurrentFrame();
  return <div style={{ fontSize: 22, color: FEED.muted, paddingLeft: FEED.indent, ...feedRise(feedReveal(frame, at, 10), 8) }}>{name}</div>;
};
