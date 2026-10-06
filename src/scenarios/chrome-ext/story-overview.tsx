import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { ramp, SPRINGS, springAt, typing } from "../../core/motion";
import { DirectionalBlur } from "../../kit/directional-blur";
import { Gauge, type ExtView } from "../../kit/ext-ui";
import { GREY, HEADLINE_FONT } from "../../kit/headline";
import { PanelRise } from "./panel-rise";
import { GAUGE_IN_PANEL, INK, MUTED, OV, OV_SCHEDULE, PANEL, PANEL_X } from "./timings";

const eo = Easing.out(Easing.cubic);
const CARD = { x: 260, y: 300, w: 1400 } as const;
const CHIP = { x: CARD.x + 1000, y: CARD.y + 250 } as const;

const AnswerCard: React.FC<{ i: number }> = ({ i }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const a = OV.answers[i];
  const next = OV.answers[i + 1];
  const outAt = next ? next.at : OV.gather;
  if (frame < a.at || frame > outAt + 6) return null;
  const inLen = Math.min(8, Math.floor((outAt - a.at) / 2));
  const inP = ramp(frame, a.at, a.at + inLen, eo);
  const out = ramp(frame, outAt, outAt + 4, Easing.in(Easing.cubic));
  const text = a.type > 0 ? typing(frame, a.a, a.at + 10, a.at + 10 + a.type) : frame >= a.at + 1 ? a.a : "";
  const doneAt = a.type > 0 ? a.at + 12 + a.type : a.at + 2;
  const done = frame >= doneAt && frame < outAt;
  const flash = springAt(frame, fps, doneAt, SPRINGS.pop, 18);
  return (
    <DirectionalBlur id={`ans-${i}`} x={out * 30} style={{ position: "absolute", left: CARD.x + (1 - inP) * 40 - out * 700, top: CARD.y, width: CARD.w, opacity: Math.min(inP, 1 - out), transform: `scale(${1 - out * 0.12})`, transformOrigin: "0 50%", fontFamily: HEADLINE_FONT, color: INK }}>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <div style={{ background: "#F1F1F1", borderRadius: 30, padding: "18px 30px", fontSize: 40, fontWeight: 500, maxWidth: 900, whiteSpace: "pre" }}>{a.q}</div>
      </div>
      <div style={{ marginTop: 44, fontSize: 46, lineHeight: 1.35, fontWeight: 400, maxWidth: 1320 }}>
        {text}
        {done ? (
          <span style={{ display: "inline-flex", alignItems: "center", gap: 10, verticalAlign: "middle", marginLeft: 16, height: 58, padding: "0 20px 0 12px", borderRadius: 16, background: "#FFF1E0", boxShadow: `0 0 0 ${2 + 8 * flash}px rgba(193,95,60,${0.35 * (1 - flash)})`, transform: `scale(${1 + 0.3 * Math.sin(Math.min(1, Math.max(0, flash)) * Math.PI)})`, transformOrigin: "left center", fontSize: 28, fontWeight: 600 }}>
            <Img src={staticFile("chrome-ext/favicons/notion.png")} style={{ width: 30, height: 30, borderRadius: 8 }} />
            {a.page}
          </span>
        ) : null}
        {!done && a.type > 0 ? <span style={{ display: "inline-block", width: 14, height: 14, borderRadius: 7, background: MUTED, marginLeft: 8, opacity: 0.5 + 0.5 * Math.sin(frame / 3) }} /> : null}
      </div>
    </DirectionalBlur>
  );
};

const Pill: React.FC<{ page: string; scale?: number }> = ({ page, scale = 1 }) => (
  <span style={{ display: "inline-flex", alignItems: "center", gap: 10, height: 58, padding: "0 20px 0 12px", borderRadius: 16, background: "#FFF1E0", boxShadow: "0 8px 22px rgba(23,19,16,.10)", fontSize: 28, fontWeight: 600, fontFamily: HEADLINE_FONT, color: INK, whiteSpace: "nowrap", transform: `scale(${scale})`, transformOrigin: "center" }}>
    <Img src={staticFile("chrome-ext/favicons/notion.png")} style={{ width: 30, height: 30, borderRadius: 8 }} />
    {page}
  </span>
);

const SLOTS = [
  { x: 300, y: 120 },
  { x: 1620, y: 940 },
  { x: 1620, y: 120 },
  { x: 300, y: 940 },
  { x: 1700, y: 530 },
  { x: 220, y: 530 },
] as const;

const TopPills: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <>
      {OV.answers.map((a, i) => {
        const next = OV.answers[i + 1];
        const liftAt = next ? next.at : OV.gather;
        if (frame < liftAt) return null;
        const up = ramp(frame, liftAt, liftAt + 14, Easing.out(Easing.cubic));
        const shootAt = OV.gather + i * 2;
        const shoot = ramp(frame, shootAt, shootAt + 9, Easing.in(Easing.cubic));
        if (shoot >= 1) return null;
        const from = { x: CHIP.x, y: CHIP.y };
        const slot = SLOTS[i % SLOTS.length];
        const x = interpolate(shoot, [0, 1], [interpolate(up, [0, 1], [from.x, slot.x]), OV.ringPos.x]);
        const y = interpolate(shoot, [0, 1], [interpolate(up, [0, 1], [from.y, slot.y]), OV.ringPos.y]);
        const prevShoot = ramp(frame - 1, shootAt, shootAt + 9, Easing.in(Easing.cubic));
        const speed = Math.abs(shoot - prevShoot) * 600;
        return (
          <DirectionalBlur key={i} id={`pill-${i}`} x={speed * 0.3} y={speed * 0.3} style={{ position: "absolute", left: x, top: y, transform: "translate(-50%, -50%)", opacity: Math.min(1, up * 3) }}>
            <Pill page={a.page} scale={1 - 0.6 * shoot} />
          </DirectionalBlur>
        );
      })}
    </>
  );
};

const Ring: React.FC<{ value: number }> = ({ value }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (frame < OV.ring || frame >= OV.land + OV.landLen + 2) return null;
  const pop = springAt(frame, fps, OV.ring, SPRINGS.pop, 22);
  const land = ramp(frame, OV.land, OV.land + OV.landLen, Easing.inOut(Easing.cubic));
  const to = { x: PANEL_X + GAUGE_IN_PANEL.x * PANEL.scale, y: OV.panelTop + GAUGE_IN_PANEL.y * PANEL.scale, size: GAUGE_IN_PANEL.size * PANEL.scale };
  const x = interpolate(land, [0, 1], [OV.ringPos.x, to.x]);
  const y = interpolate(land, [0, 1], [OV.ringPos.y, to.y]);
  const size = interpolate(land, [0, 1], [OV.ringPos.size, to.size]);
  const n = Math.round(value * ramp(frame, OV.ring + 2, OV.ring + OV.ringCount, (t) => 1 - (1 - t) * (1 - t)));
  const labelOut = 1 - ramp(frame, OV.land, OV.land + 8);
  return (
    <div style={{ position: "absolute", left: x - size / 2, top: y - size / 2, width: size, height: size, transform: `scale(${0.7 + 0.3 * pop})`, fontFamily: HEADLINE_FONT, color: INK }}>
      <Gauge value={value} at={OV.ring + 2} size={size} />
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", opacity: labelOut }}>
        <span style={{ fontSize: size * 0.3, fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1 }}>{n}</span>
        <span style={{ fontSize: size * 0.07, fontWeight: 500, color: GREY, marginTop: size * 0.02 }}>GEO rating</span>
      </div>
    </div>
  );
};

export const OverviewStory: React.FC<{ view: ExtView }> = ({ view }) => {
  return (
    <AbsoluteFill>
      {OV.answers.map((_, i) => (
        <AnswerCard key={i} i={i} />
      ))}
      <TopPills />
      <PanelRise at={OV.panelIn} top={OV.panelTop} view={view} t={OV_SCHEDULE} />
      <Ring value={view.rating} />
    </AbsoluteFill>
  );
};
