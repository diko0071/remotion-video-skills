import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { useReveal } from "../../core/motion";
import { CameraRig, type CameraShot } from "../../core/stage";
import { ScoreRing } from "../../kit/score-ring";
import "../../kit/chat/chat.css";
import { BEAM_H_AT, BEAM_V_AT, ISSUES_AT, SCAN_SITE, SCAN_TOTAL, SCORE_AT, SCORE_COL, SITE_AT } from "./timings";

const INK = "#171310";
const BEAM_LEN = 52;

const SHOTS: CameraShot[] = [
  { at: 0, target: "scan.site", zoom: 1.0 },
  { at: ISSUES_AT - 2, target: "scan.scores", zoom: 1.12, align: { y: 0.52 } },
];

const SCORES: { label: string; value: number; color: string }[] = [
  { label: "SEO score", value: 34, color: "#DC2626" },
  { label: "GEO score", value: 28, color: "#D97706" },
  { label: "Site health", value: 58, color: "#D97706" },
];

const beamPos = (frame: number, at: number, span: number) =>
  interpolate(frame, [at, at + BEAM_LEN], [-60, span + 60], {
    easing: Easing.bezier(0.45, 0, 0.55, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

const Beam: React.FC<{ axis: "x" | "y"; at: number; span: number }> = ({ axis, at, span }) => {
  const frame = useCurrentFrame();
  const pos = beamPos(frame, at, span);
  const alive = frame >= at && frame <= at + BEAM_LEN + 6;
  const fade = interpolate(frame, [at, at + 6, at + BEAM_LEN, at + BEAM_LEN + 6], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  if (!alive) return null;
  const across = axis === "x";
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: across ? pos : 0,
          top: across ? 0 : pos,
          width: across ? 3 : "100%",
          height: across ? "100%" : 3,
          background: "rgba(255,255,255,0.95)",
          boxShadow: `0 0 18px 6px rgba(193,151,103,0.85), 0 0 60px 22px rgba(193,151,103,0.35)`,
          opacity: fade,
          zIndex: 4,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: across ? pos - 190 : 0,
          top: across ? 0 : pos - 190,
          width: across ? 190 : "100%",
          height: across ? "100%" : 190,
          background: `linear-gradient(${across ? "90deg" : "180deg"}, rgba(193,151,103,0), rgba(193,151,103,0.22))`,
          opacity: fade,
          zIndex: 3,
        }}
      />
    </>
  );
};

export const ScoreCard: React.FC<{ label: string; value: number; color: string; at: number }> = ({
  label,
  value,
  color,
  at,
}) => {
  const style = useReveal(at, 14, 26);
  return (
    <div
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        gap: 26,
        background: "#FFFFFF",
        borderRadius: 16,
        padding: "22px 34px 22px 24px",
        boxShadow: "0 10px 34px rgba(74,53,29,0.12)",
        border: "1px solid rgba(23,19,16,0.06)",
      }}
    >
      <ScoreRing score={value} size={128} appearAt={at + 4} color={color} />
      <div style={{ fontSize: 30, fontWeight: 700, color: INK }}>{label}</div>
    </div>
  );
};

export const FixSeoScan: React.FC = () => {
  const siteIn = useReveal(SITE_AT, 16, 34);
  const urlIn = useReveal(SITE_AT + 6, 10, 10);

  return (
    <AbsoluteFill style={{ background: "var(--background)", fontFamily: "'Plus Jakarta Sans'" }}>
      <CameraRig shots={SHOTS}>
        <div
          data-click="scan.site"
          style={{
            ...siteIn,
            position: "absolute",
            left: SCAN_SITE.x,
            top: SCAN_SITE.y,
            width: SCAN_SITE.w,
            height: SCAN_SITE.h,
            background: "#FFFFFF",
            borderRadius: 18,
            boxShadow: "0 24px 70px rgba(74,53,29,0.22)",
            border: "1px solid rgba(255,255,255,0.65)",
            overflow: "hidden",
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
            }}
          >
            {["#F87171", "#FBBF24", "#34D399"].map((c) => (
              <span key={c} style={{ width: 12, height: 12, borderRadius: 6, background: c }} />
            ))}
            <span
              style={{
                ...urlIn,
                marginLeft: 14,
                fontSize: 18,
                fontWeight: 600,
                color: "rgba(23,19,16,0.55)",
                background: "rgba(23,19,16,0.05)",
                borderRadius: 8,
                padding: "5px 16px",
              }}
            >
              dusk.app
            </span>
          </div>
          <div style={{ position: "relative", height: SCAN_SITE.h - 54, overflow: "hidden" }}>
            <Img
              src={staticFile("dusk/site/before.png")}
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" }}
            />
            <Beam axis="x" at={BEAM_V_AT} span={SCAN_SITE.w} />
            <Beam axis="y" at={BEAM_H_AT} span={SCAN_SITE.h - 54} />
          </div>
        </div>

        <div
          data-click="scan.scores"
          style={{
            position: "absolute",
            left: SCORE_COL.x,
            top: SCORE_COL.y,
            width: SCORE_COL.w,
            display: "flex",
            flexDirection: "column",
            gap: SCORE_COL.gap,
          }}
        >
          {SCORES.map((s, i) => (
            <ScoreCard key={s.label} {...s} at={SCORE_AT[i]} />
          ))}
        </div>
      </CameraRig>
    </AbsoluteFill>
  );
};

export const FIX_SEO_SCAN_TOTAL = SCAN_TOTAL;
