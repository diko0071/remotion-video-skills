import React from "react";
import { Easing, useCurrentFrame } from "remotion";
import { ramp } from "../../core/motion";
import { DirectionalBlur } from "../../kit/directional-blur";
import { ExtPanel, type ExtSchedule, type ExtTab, type ExtTabSchedule, type ExtView } from "../../kit/ext-ui";
import { DOCKED, PANEL, PANEL_X } from "./timings";

export const PanelRise: React.FC<{ at: number; top: number; view: ExtView; t: ExtSchedule; tab?: ExtTab; questions?: ExtTabSchedule; sources?: ExtTabSchedule; len?: number; dock?: { at: number; len: number }; overviewAt?: number; parts?: 1 | 2 }> = ({ at, top, view, t, tab, questions, sources, len = 14, dock, overviewAt, parts = 1 }) => {
  const frame = useCurrentFrame();
  if (frame < at) return null;
  const p = ramp(frame, at, at + len, Easing.out(Easing.cubic));
  const prev = ramp(frame - 1, at, at + len, Easing.out(Easing.cubic));
  const d = dock ? ramp(frame, dock.at, dock.at + dock.len, Easing.inOut(Easing.cubic)) : 0;
  const dPrev = dock ? ramp(frame - 1, dock.at, dock.at + dock.len, Easing.inOut(Easing.cubic)) : 0;
  const y = (top + (1 - p) * (1080 - top + 40)) * (1 - d) + DOCKED.y * d;
  const x = PANEL_X * (1 - d) + DOCKED.x * d;
  const scale = PANEL.scale * (1 - d) + d;
  return (
    <DirectionalBlur id="panel-rise" x={Math.abs(d - dPrev) * 600 * 0.3} y={Math.abs(p - prev) * 1080 * 0.35 + Math.abs(d - dPrev) * 600 * 0.3} style={{ position: "absolute", left: x, top: y, width: PANEL.w, height: PANEL.h, transformOrigin: "0 0", transform: `scale(${scale})`, borderRadius: 22, overflow: "hidden", background: "#1a0e06", boxShadow: "0 30px 80px rgba(15,23,42,.28), 0 0 0 1px rgba(15,23,42,.08)" }}>
      <ExtPanel view={view} t={t} scroll={[]} parts={parts} gaugeInstant tab={tab} questions={questions} sources={sources} overviewAt={overviewAt} />
    </DirectionalBlur>
  );
};
