import React from "react";
import { AbsoluteFill, Img, interpolate, Sequence, staticFile, useCurrentFrame } from "remotion";
import { SPRINGS, useSpringAt } from "../../core/motion";
import { CameraRig, SceneCursor, type CameraShot } from "../../core/stage";
import { SparkBurst } from "../../kit/kinetic-text";
import { SfxTrack } from "../../kit/sfx";
import { RadarField, RADAR_TOTAL } from "./scene-radar";
import type { RadarConfig, RadarNode } from "../../kit/radar";

export const NOTIF_AT = 8;
export const CLICK_AT = 78;
const AD_AT = CLICK_AT + 8;
export const NOTIFY_TOTAL = 148;

const NEW_ADS = [
  "apps/wispr-flow_top-s1-23d.jpg",
  "apps/wispr-flow_top-s5-24d.jpg",
  "apps/wispr-flow_top-s3-18d.jpg",
];

const SHOTS: CameraShot[] = [
  { at: 0, zoom: 1.02 },
  { at: NOTIF_AT + 4, target: "notif", zoom: 1.32, align: { y: 0.42 } },
  { at: AD_AT + 4, target: "ad", zoom: 1.16 },
];

const Thumb: React.FC<{ file: string; at: number }> = ({ file, at }) => {
  const pop = useSpringAt(at, SPRINGS.pop, 14);
  return (
    <Img
      src={staticFile(file)}
      style={{ width: 150, height: 150, borderRadius: 10, objectFit: "contain", background: "#0A0E22", opacity: pop }}
    />
  );
};

export const Notification: React.FC = () => {
  const frame = useCurrentFrame();
  const inn = useSpringAt(NOTIF_AT, SPRINGS.card, 24);
  const away = useSpringAt(AD_AT, SPRINGS.smooth, 18);
  if (frame < NOTIF_AT) return null;
  return (
    <div
      data-click="notif"
      style={{
        position: "absolute",
        left: 960 - 330,
        top: 90,
        width: 660,
        background: "#FFFFFF",
        borderRadius: 16,
        boxShadow: "0 34px 90px rgba(23,19,16,0.28)",
        border: "1px solid rgba(23,19,16,0.08)",
        padding: "20px 24px",
        display: "flex",
        flexDirection: "column",
        gap: 14,
        fontFamily: "'Plus Jakarta Sans'",
        opacity: inn * (1 - away),
        transform: `translateY(${interpolate(inn, [0, 1], [-140, 0]) - away * 160}px)`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
        <Img src={staticFile("ryze-sun.png")} style={{ width: 21, height: 21, opacity: 0.8 }} />
        <span style={{ fontSize: 15, fontWeight: 600, color: "rgba(23,19,16,0.42)" }}>
          Competitor Ads
        </span>
        <span
          style={{ marginLeft: "auto", fontSize: 15, fontWeight: 500, color: "rgba(23,19,16,0.32)" }}
        >
          now
        </span>
      </div>
      <span style={{ fontSize: 26, fontWeight: 700, letterSpacing: "-0.015em", color: "#171310" }}>
        wisprflow.ai launched 3 new ads
      </span>
      <div style={{ display: "flex", gap: 10 }}>
        {NEW_ADS.map((f, i) => (
          <Thumb key={f} file={f} at={NOTIF_AT + 8 + i * 4} />
        ))}
      </div>
    </div>
  );
};

export const ExpandedAd: React.FC = () => {
  const frame = useCurrentFrame();
  const inn = useSpringAt(AD_AT, SPRINGS.card, 26);
  if (frame < AD_AT) return null;
  return (
    <div
      data-click="ad"
      style={{
        position: "absolute",
        left: 960 - 300,
        top: 180,
        width: 600,
        background: "#FFFFFF",
        borderRadius: 18,
        boxShadow: "0 44px 110px rgba(23,19,16,0.32)",
        border: "1px solid rgba(23,19,16,0.08)",
        overflow: "hidden",
        fontFamily: "'Plus Jakarta Sans'",
        opacity: inn,
        transform: `scale(${interpolate(inn, [0, 1], [0.62, 1])})`,
      }}
    >
      <Img
        src={staticFile(NEW_ADS[0])}
        style={{ width: "100%", height: 560, objectFit: "contain", background: "#0A0E22", display: "block" }}
      />
      <div style={{ display: "flex", alignItems: "center", gap: 11, padding: "20px 24px" }}>
        <Img src={staticFile("appicons/wisprflow.ai.png")} style={{ width: 26, height: 26, borderRadius: 6 }} />
        <span style={{ fontSize: 18, fontWeight: 700, color: "#171310" }}>wisprflow.ai</span>
        <span style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 7, height: 7, borderRadius: 4, background: "#12A150" }} />
          <span style={{ fontSize: 16, fontWeight: 500, color: "rgba(23,19,16,0.55)" }}>
            Running · launched today
          </span>
        </span>
      </div>
      <SparkBurst at={AD_AT + 10} />
    </div>
  );
};

export const NotifyScene: React.FC<{
  radarNodes?: RadarNode[];
  radarCfg?: RadarConfig;
}> = ({ radarNodes, radarCfg }) => (
  <AbsoluteFill style={{ background: "var(--background)" }}>
    <CameraRig shots={SHOTS}>
      <div style={{ position: "absolute", inset: 0, transform: "scale(0.726)", transformOrigin: "960px 480px" }}>
        <Sequence from={-RADAR_TOTAL} layout="none">
          <RadarField dim={0.32} highlight="wisprflow.ai" nodes={radarNodes} cfg={radarCfg} />
        </Sequence>
      </div>
      <Notification />
      <ExpandedAd />
      <SceneCursor
        from={{ x: 1560, y: 980 }}
        appearAt={NOTIF_AT + 20}
        moves={[{ target: "notif", at: CLICK_AT, travel: 30 }]}
      />
    </CameraRig>
    <SfxTrack hits={[{ name: "mouse-click", at: CLICK_AT }]} />
  </AbsoluteFill>
);
