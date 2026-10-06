import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { ramp } from "../../core/motion";
import { GrokApprovalCard, GrokBubble, GrokDay, GrokFrame, GrokHeader, GrokSidebar, GrokThread, grokFont } from "../../kit/grok-ui";
import type { BotAvatar, GrokBotRow } from "../../kit/grok-ui";
import { SfxTrack } from "../../kit/sfx";
import { CameraRig, rectCenter, useObjectRects } from "../../core/stage";
import { Cursor } from "../../kit/cursor";
import { SPRINGS, useSpringAt } from "../../core/motion";
import { ABSORB_LEN, APP, APPROVALS, BADGE_AT, CARD_AT, CARRY, CLICKS, EXPAND, FILM_END, GROUND, ICON, INK, LAND, MUTED, ROW_AT, SLIDE, SOURCES } from "./timings";
import { Pile } from "./signals";

export const RYZE: BotAvatar = { shape: "circle", color: "#C19767" };

const Approval: React.FC<{ index: number }> = ({ index }) => {
  const frame = useCurrentFrame();
  const a = APPROVALS[index];
  const click = CLICKS[index];
  const inn = useSpringAt(CARD_AT[index], SPRINGS.card, 18);
  return (
    <div style={{ flex: 1, minWidth: 0, opacity: Math.min(1, inn * 1.6), filter: inn < 0.9 ? `blur(${(1 - inn) * 6}px)` : undefined }}>
      <GrokApprovalCard id={`card.${index}`} approveId={`ap.${index}`} icon="ryze-sun.png" title="Ryze AI wants to run a task" body={`${a.title}. ${SOURCES[a.source].name}: ${a.body}`} approved={frame >= click.at + 2} width={456} />
    </div>
  );
};

const ROW_H = 232;

const ApprovalRow: React.FC = () => {
  const frame = useCurrentFrame();
  const open = useSpringAt(ROW_AT, SPRINGS.card, 18);
  if (frame < ROW_AT) return null;
  return (
    <div style={{ position: "relative", height: ROW_H * open, overflow: "hidden" }}>
      <div data-click="row" style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 0 }} />
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, display: "flex", gap: 16, alignItems: "flex-end" }}>
        {APPROVALS.map((_, i) => (
          <Approval key={i} index={i} />
        ))}
      </div>
    </div>
  );
};

const Window: React.FC = () => {
  const frame = useCurrentFrame();
  const ex = 1 - Math.pow(1 - ramp(frame, EXPAND.at, EXPAND.at + EXPAND.len), 3);
  const absorb = ramp(frame, CARRY.land, CARRY.land + ABSORB_LEN);
  const badge = 1 - Math.pow(1 - ramp(frame, BADGE_AT, BADGE_AT + 8), 3);
  const badgeAlpha = badge * (1 - ramp(frame, EXPAND.at, EXPAND.at + 6));
  const pressed = frame >= CARRY.land - 2 && frame <= CARRY.land + 2;
  const iconIn = interpolate(frame, [SLIDE.at, SLIDE.at + 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const x = ICON.x - ICON.size / 2 + (APP.x - (ICON.x - ICON.size / 2)) * ex;
  const y = ICON.y - ICON.size / 2 + (APP.y - (ICON.y - ICON.size / 2)) * ex;
  const w = ICON.size + (APP.w - ICON.size) * ex;
  const h = ICON.size + (APP.h - ICON.size) * ex;
  const radius = ICON.radius + (APP.radius - ICON.radius) * ex;
  const content = ramp(frame, EXPAND.at + 8, EXPAND.at + EXPAND.len);
  const open = ramp(frame, ROW_AT, ROW_AT + 16);
  const iconOut = ramp(frame, EXPAND.at + 2, EXPAND.at + 12);
  const rows: GrokBotRow[] = [
    { name: "Ryze AI", preview: frame >= ROW_AT ? "Ryze AI wants to run a task" : "Yes. I have updates for you.", time: "9:41 AM", avatar: RYZE, active: true },
    { name: "LinkedIn", preview: "Vex: Meta just cut coding…", time: "8:27 AM", avatar: { shape: "triangle", color: "#0F9D7A" } },
    { name: "Vex", preview: "Approval required: Run …", time: "Yesterday", avatar: { shape: "square", color: "#4C8DFF" } },
    { name: "Ink", preview: "Listing. Doorman/lift…", time: "Tuesday", avatar: { shape: "circle", color: "#0F9D7A" } },
  ];
  return (
    <AbsoluteFill style={{ fontFamily: grokFont }}>
      <style>{`.ga-open .gk-thread{flex:none;min-height:${APP.h - 56}px;height:auto;overflow:visible;justify-content:flex-end;padding-bottom:22px} .ga-open .gk-main{height:auto} .ga-open .gk-sidebar{height:auto;align-self:stretch} .ga-open .gk-approval{margin-left:0;width:100%} .ga-open .gk-pill{display:none}`}</style>
      <div className="ga-open" style={{ position: "absolute", left: x, top: y, width: w, height: ex >= 1 ? APP.h + 1400 : h, borderRadius: radius, overflow: ex >= 1 ? "visible" : "hidden", background: "#0C0C0E", boxShadow: `0 30px 80px rgba(0,0,0,${0.55 * (1 - open)}), 0 0 0 1px rgba(255,255,255,${0.08 * (1 - open)})`, transform: `scale(${pressed ? 0.96 : 1})`, opacity: iconIn }}>
        <Img src={staticFile("grok/bot-icon.jpg")} style={{ position: "absolute", left: w / 2 - ICON.size / 2, top: h / 2 - ICON.size / 2, width: ICON.size, height: ICON.size, borderRadius: ICON.radius, objectFit: "cover", display: "block", opacity: (1 - iconOut) * (absorb < 1 && frame >= CARRY.land ? 0.5 : 1) }} />
        <div style={{ position: "absolute", left: 0, top: 0, width: APP.w, height: ex >= 1 ? APP.h + 1400 : APP.h, opacity: content }}>
          <GrokFrame dark sidebar={<GrokSidebar rows={rows} />}>
            <GrokHeader name="Ryze AI" avatar={RYZE} />
            <GrokThread>
              <GrokDay text="Today" />
              <GrokBubble user>Morning. How did the sale ads do overnight?</GrokBubble>
              <GrokBubble>Meta retargeting is at 3.1× ROAS, prospecting is flat. Search spend is up 12% with the same CPA.</GrokBubble>
              <GrokBubble user>Ok. Keep watching it.</GrokBubble>
              <GrokBubble>Will do. I will ping you here when something needs a decision.</GrokBubble>
              <GrokBubble user>Anything for me today?</GrokBubble>
              <GrokBubble>Yes. I have updates for you.</GrokBubble>
              <ApprovalRow />
            </GrokThread>
          </GrokFrame>
        </div>
      </div>
      {badgeAlpha > 0.01 ? (
        <div style={{ position: "absolute", left: ICON.x + ICON.size / 2 - 46, top: ICON.y - ICON.size / 2 - 14, width: 60, height: 60, borderRadius: 30, background: "#FF3B30", color: "#fff", fontSize: 34, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${0.4 + 0.6 * badge})`, opacity: badgeAlpha, boxShadow: "0 6px 16px rgba(255,59,48,0.35)" }}>
          3
        </div>
      ) : null}
      <div style={{ position: "absolute", left: ICON.x - 200, width: 400, top: ICON.y + ICON.size / 2 + 28, textAlign: "center", fontSize: 26, color: MUTED, opacity: iconIn * (1 - ramp(frame, EXPAND.at, EXPAND.at + 8)) }}>
        Grok Bot
      </div>
    </AbsoluteFill>
  );
};

const SHOTS = [
  { at: 0, zoom: 1 },
  { at: ROW_AT, target: "row", zoom: 1.3, align: { x: 0.5, y: 0.86 } },
];

const RowCursor: React.FC = () => {
  const frame = useCurrentFrame();
  const ids = React.useMemo(() => CLICKS.map((c) => `ap.${c.index}`), []);
  const rects = useObjectRects(ids);
  if (frame < CLICKS[0].at - 14 || frame > CLICKS[2].at + 14) return null;
  const points = ids.map((id) => (rects[id] ? rectCenter(rects[id]) : null));
  if (points.some((p) => !p)) return null;
  const pts = points as { x: number; y: number }[];
  const stops = [
    { x: pts[0].x + 70, y: pts[0].y + 54, at: CLICKS[0].at - 14 },
    ...CLICKS.map((c, i) => ({ x: pts[i].x, y: pts[i].y, at: c.at, click: true })),
  ];
  return <Cursor stops={stops} appearAt={CLICKS[0].at - 14} scale={1.6} fill={INK} stroke={GROUND} />;
};

export const GrokPhase: React.FC = () => {
  const frame = useCurrentFrame();
  if (frame < SLIDE.at - 2 || frame >= FILM_END) return null;
  return (
    <AbsoluteFill>
      <CameraRig shots={SHOTS} drift={0} bounds={false}>
        <Window />
        <RowCursor />
      </CameraRig>
      {frame >= CARRY.land && frame < EXPAND.at + EXPAND.len ? (
        <div style={{ position: "absolute", inset: 0, opacity: 1 - ramp(frame, EXPAND.at + 6, EXPAND.at + 18), pointerEvents: "none" }}>
          <Cursor stops={[{ x: LAND.x, y: LAND.y, at: CARRY.land }]} appearAt={CARRY.land} scale={2.2} fill={INK} stroke={GROUND} />
        </div>
      ) : null}
      <SfxTrack hits={[{ name: "notify" as const, at: BADGE_AT }, ...CLICKS.map((c) => ({ name: "mouse-click" as const, at: c.at }))]} />
    </AbsoluteFill>
  );
};

export const DropLayer: React.FC = () => {
  const frame = useCurrentFrame();
  const p = ramp(frame, CARRY.land, CARRY.land + ABSORB_LEN, Easing.in(Easing.cubic));
  if (frame < CARRY.land || frame > CARRY.land + ABSORB_LEN) return null;
  const w = 340;
  return (
    <div style={{ position: "absolute", left: ICON.x - w / 2, top: ICON.y - 64, width: w, transform: `scale(${1 - 0.85 * p}) rotate(${-4 * (1 - p)}deg)`, transformOrigin: "center", opacity: 1 - p * p, pointerEvents: "none", color: INK }}>
      <Pile width={w} spread={1 - p} badge={1 - p} />
    </div>
  );
};

