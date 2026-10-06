import React from "react";
import { AbsoluteFill } from "remotion";
import { useReveal } from "../../core/motion";
import { CameraRig, type CameraShot } from "../../core/stage";
import { ScanBeam } from "../../kit/scan-beam";
import { ScoreCard } from "../../kit/score-card";
import "../../kit/chat/chat.css";
import { BROWSER_BAR, SiteCard } from "./site-card";
import { BEAM_H_AT, BEAM_V_AT, SCAN_SITE, SCAN_TOTAL, SCORE_AT, SCORE_COL, SCORES_BEFORE, SCORES_FOCUS, SITE, SITE_AT } from "./timings";

export const SCAN_SCENE_TOTAL = SCAN_TOTAL;

const SHOTS: CameraShot[] = [
  { at: 0, target: "scan.site", zoom: 1.0 },
  { at: SCORES_FOCUS, target: "scan.scores", zoom: 1.3, align: { x: 0.62, y: 0.5 } },
];

export const ScanScene: React.FC = () => {
  const siteIn = useReveal(SITE_AT, 16, 34);
  return (
    <AbsoluteFill style={{ background: "var(--background)", fontFamily: "'Plus Jakarta Sans'" }}>
      <CameraRig shots={SHOTS}>
        <div data-click="scan.site" style={{ ...siteIn, position: "absolute", left: SCAN_SITE.x, top: SCAN_SITE.y }}>
          <SiteCard image={SITE.before}>
            <ScanBeam axis="x" at={BEAM_V_AT} span={SCAN_SITE.w} />
            <ScanBeam axis="y" at={BEAM_H_AT} span={SCAN_SITE.h - BROWSER_BAR} />
          </SiteCard>
        </div>
        <div data-click="scan.scores" style={{ position: "absolute", left: SCORE_COL.x, top: SCORE_COL.y, width: SCORE_COL.w, display: "flex", flexDirection: "column", gap: SCORE_COL.gap }}>
          {SCORES_BEFORE.map((s, i) => (
            <ScoreCard key={s.label} label={s.label} value={s.value} color={s.color} at={SCORE_AT[i]} />
          ))}
        </div>
      </CameraRig>
    </AbsoluteFill>
  );
};
