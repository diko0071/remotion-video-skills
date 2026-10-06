import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { ramp, SPRINGS, useSpringAt } from "../../core/motion";
import { grokFont } from "../../kit/grok-ui";
import { Cursor } from "../../kit/cursor";
import { cursorAt } from "../../core/stage";
import { KeyedRig } from "../../kit/keyed-rig";
import { SfxTrack } from "../../kit/sfx";
import { AMBIENT_EVERY, AMBIENT_FROM, APPROVALS, CAM_SIG, CARD, CARD_PULSE, CARD_Y, CARRY, GRAB, GROUND, HUB, HUB_AT, INK, LINES_AT, LINES_LEN, MUTED, PILE, PULSE_LEN, SIG_IN, SOURCES, SRC_AT, SRC_SIZE, SRC_X, SRC_Y } from "./timings";

type Pt = { x: number; y: number };
const bez = (a: Pt, b: Pt, c: Pt, d: Pt, t: number): Pt => {
  const u = 1 - t;
  return {
    x: u * u * u * a.x + 3 * u * u * t * b.x + 3 * u * t * t * c.x + t * t * t * d.x,
    y: u * u * u * a.y + 3 * u * u * t * b.y + 3 * u * t * t * c.y + t * t * t * d.y,
  };
};
const srcPath = (i: number) => {
  const a = { x: SRC_X + SRC_SIZE / 2 + 6, y: SRC_Y[i] };
  const d = { x: HUB.x - HUB.size / 2 - 8, y: HUB.y };
  return [a, { x: a.x + 240, y: a.y }, { x: d.x - 240, y: d.y }, d] as const;
};
const cardPath = (j: number) => {
  const a = { x: HUB.x + HUB.size / 2 + 8, y: HUB.y };
  const d = { x: CARD.x - 6, y: CARD_Y[j] };
  return [a, { x: a.x + 120, y: a.y }, { x: d.x - 120, y: d.y }, d] as const;
};
const svgPath = (p: readonly [Pt, Pt, Pt, Pt]) => `M ${p[0].x} ${p[0].y} C ${p[1].x} ${p[1].y}, ${p[2].x} ${p[2].y}, ${p[3].x} ${p[3].y}`;

const Pulse: React.FC<{ path: readonly [Pt, Pt, Pt, Pt]; at: number; len?: number; strong?: boolean }> = ({ path, at, len = PULSE_LEN, strong }) => {
  const frame = useCurrentFrame();
  const t = ramp(frame, at, at + len);
  if (frame < at || frame > at + len) return null;
  const dots = [0, 0.05, 0.1, 0.15];
  return (
    <>
      {dots.map((d, k) => {
        const tt = Math.max(0, t - d);
        const p = bez(path[0], path[1], path[2], path[3], tt);
        const r = (strong ? 7 : 4.5) * (1 - k * 0.2);
        return <circle key={k} cx={p.x} cy={p.y} r={r} fill={strong ? INK : MUTED} opacity={(strong ? 1 : 0.55) * (1 - k * 0.22)} />;
      })}
    </>
  );
};

const Tile: React.FC<{ file: string; at: number; x: number; y: number; size: number }> = ({ file, at, x, y, size }) => {
  const p = useSpringAt(at, SPRINGS.pop, 18);
  return (
    <div style={{ position: "absolute", left: x - size / 2, top: y - size / 2, width: size, height: size, borderRadius: size * 0.26, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 10px 30px rgba(0,0,0,0.45)", transform: `scale(${interpolate(p, [0, 1], [0.5, 1])})`, opacity: Math.min(1, p * 2) }}>
      <Img src={staticFile(file)} style={{ width: size * 0.56, height: size * 0.56, objectFit: "contain", display: "block" }} />
    </div>
  );
};

const Hub: React.FC = () => {
  const frame = useCurrentFrame();
  const p = useSpringAt(HUB_AT, SPRINGS.pop, 22);
  const spin = interpolate(frame, [HUB_AT, HUB_AT + 40], [-300, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const ring = ramp(frame, HUB_AT + 6, HUB_AT + 30);
  const beat = CARD_PULSE.reduce((acc, c) => acc + Math.max(0, 1 - Math.abs(frame - c.hub) / 8), 0);
  const s = interpolate(p, [0, 1], [0.3, 1]) * (1 + beat * 0.1);
  return (
    <>
      <div style={{ position: "absolute", left: HUB.x - HUB.size, top: HUB.y - HUB.size, width: HUB.size * 2, height: HUB.size * 2, borderRadius: "50%", border: "2px solid rgba(241,241,243,0.5)", transform: `scale(${0.5 + ring * 1.1})`, opacity: (1 - ring) * 0.8 }} />
      <div style={{ position: "absolute", left: HUB.x - HUB.size / 2, top: HUB.y - HUB.size / 2, width: HUB.size, height: HUB.size, borderRadius: HUB.size * 0.28, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${s}) rotate(${spin}deg)`, opacity: Math.min(1, p * 2), boxShadow: `0 0 ${40 + beat * 60}px rgba(241,241,243,${0.14 + beat * 0.3})` }}>
        <Img src={staticFile("ryze-sun.png")} style={{ width: HUB.size * 0.6, height: HUB.size * 0.6, display: "block" }} />
      </div>
    </>
  );
};

const CURSOR_STOPS = [
  { x: 1700, y: 1100, at: GRAB.cursorFrom },
  { x: PILE.x, y: CARD_Y[0], at: GRAB.at, click: true },
  { x: PILE.x, y: CARD_Y[2], at: GRAB.at + GRAB.gatherLen },
];
export const sweepY = (frame: number) => (frame < GRAB.at ? CARD_Y[0] : Math.min(CARD_Y[2], Math.max(CARD_Y[0], cursorAt(CURSOR_STOPS, frame, 30).y)));

export const ApprovalTile: React.FC<{ index: number; width?: number; flat?: boolean }> = ({ index, width = CARD.w, flat }) => {
  const a = APPROVALS[index];
  const src = SOURCES[a.source];
  return (
    <div style={{ width, height: CARD.h, borderRadius: 22, background: "#161618", border: "1px solid #26262B", boxShadow: flat ? undefined : "0 16px 40px rgba(0,0,0,0.45)", display: "flex", alignItems: "center", gap: 22, padding: "0 28px", fontFamily: grokFont, boxSizing: "border-box" }}>
      <span style={{ width: 64, height: 64, borderRadius: 17, background: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Img src={staticFile(src.file)} style={{ width: 38, height: 38, objectFit: "contain", display: "block" }} />
      </span>
      <span style={{ display: "flex", flexDirection: "column", gap: 4, minWidth: 0, flex: 1 }}>
        <span style={{ fontSize: 28, fontWeight: 600, color: INK, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a.title}</span>
        <span style={{ fontSize: 23, color: MUTED, whiteSpace: "nowrap" }}>{src.name} · {a.meta}</span>
      </span>
      <span style={{ width: 44, height: 44, borderRadius: 22, background: "#242429", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 15L15 5M7 5h8v8" stroke={INK} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </span>
    </div>
  );
};

export const Pile: React.FC<{ width: number; spread?: number; badge?: number }> = ({ width, spread = 1, badge = 1 }) => {
  const k = width / CARD.w;
  return (
    <div style={{ position: "relative", width, height: CARD.h * k }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: CARD.w, height: CARD.h, transform: `scale(${k})`, transformOrigin: "top left" }}>
        {[2, 1, 0].map((j) => (
          <div key={j} style={{ position: "absolute", left: 0, top: 0, width: CARD.w, transform: `translateY(${j * 10 * spread}px) rotate(${(j - 1) * 2.5 * spread}deg) scale(${1 - j * 0.03 * spread})`, transformOrigin: "center" }}>
            <ApprovalTile index={j} />
          </div>
        ))}
        <div style={{ position: "absolute", right: -14, top: -14, minWidth: 44, height: 44, borderRadius: 22, background: INK, color: GROUND, fontSize: 24, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: grokFont, transform: `scale(${badge})`, opacity: badge }}>
          3
        </div>
      </div>
    </div>
  );
};

const Card: React.FC<{ index: number }> = ({ index }) => {
  const frame = useCurrentFrame();
  const at = CARD_PULSE[index].card;
  const p = useSpringAt(at, SPRINGS.card, 18);
  const y = Math.max(CARD_Y[index], sweepY(frame));
  const joined = ramp(frame, GRAB.at, GRAB.at + 6) * (y > CARD_Y[index] + 1 || index === 0 ? 1 : 0);
  const rot = (index - 1) * 2.5 * joined;
  const sc = 1 - index * 0.03 * joined;
  if (frame >= CARRY.from) return null;
  return (
    <div style={{ position: "absolute", left: CARD.x, top: y - CARD.h / 2 + index * 10 * joined, width: CARD.w, zIndex: 10 - index, opacity: Math.min(1, p * 1.6), transform: `translateX(${(1 - p) * -40}px) rotate(${rot}deg) scale(${interpolate(p, [0, 1], [0.92, 1]) * sc})`, transformOrigin: "center" }}>
      <ApprovalTile index={index} />
    </div>
  );
};

const Badge: React.FC = () => {
  const frame = useCurrentFrame();
  const p = useSpringAt(GRAB.at + GRAB.gatherLen - 6, SPRINGS.pop, 14);
  if (frame < GRAB.at + GRAB.gatherLen - 6 || frame >= CARRY.from) return null;
  return (
    <div style={{ position: "absolute", left: CARD.x + CARD.w - 22, top: sweepY(frame) - CARD.h / 2 - 22, width: 44, height: 44, borderRadius: 22, background: INK, color: GROUND, fontSize: 24, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: grokFont, transform: `scale(${p})`, zIndex: 20 }}>
      3
    </div>
  );
};

export const SignalsStage: React.FC = () => {
  const frame = useCurrentFrame();
  const draw = ramp(frame, LINES_AT, LINES_AT + LINES_LEN);
  const inn = ramp(frame, SIG_IN, SIG_IN + 8);
  const ambient: { path: readonly [Pt, Pt, Pt, Pt]; at: number }[] = [];
  for (let i = 0; i < SOURCES.length; i++) {
    for (let k = 0; k < 8; k++) ambient.push({ path: srcPath(i), at: AMBIENT_FROM + i * 9 + k * AMBIENT_EVERY });
  }
  return (
    <AbsoluteFill style={{ background: GROUND, opacity: inn, fontFamily: grokFont }}>
      <KeyedRig id="ga-sig" keys={CAM_SIG} bg={GROUND}>
        <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
          {SOURCES.map((_, i) => (
            <path key={`s${i}`} d={svgPath(srcPath(i))} stroke="rgba(241,241,243,0.16)" strokeWidth={2} fill="none" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - draw} />
          ))}
          {CARD_Y.map((_, j) => (
            <path key={`c${j}`} d={svgPath(cardPath(j))} stroke="rgba(241,241,243,0.16)" strokeWidth={2} fill="none" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - draw} />
          ))}
          {ambient.map((a, k) => (
            <Pulse key={k} path={a.path} at={a.at} len={22} />
          ))}
          {CARD_PULSE.map((c, j) => (
            <React.Fragment key={j}>
              <Pulse path={srcPath(APPROVALS[j].source)} at={c.leave} strong />
              <Pulse path={cardPath(j)} at={c.hub + 2} strong />
            </React.Fragment>
          ))}
        </svg>
        {SOURCES.map((s, i) => (
          <Tile key={s.name} file={s.file} at={SRC_AT(i)} x={SRC_X} y={SRC_Y[i]} size={SRC_SIZE} />
        ))}
        <Hub />
        {APPROVALS.map((_, j) => (
          <Card key={j} index={j} />
        ))}
        <Badge />
        {frame < CARRY.from ? (
          <Cursor stops={CURSOR_STOPS} appearAt={GRAB.cursorFrom} scale={2.2} fill={INK} stroke={GROUND} />
        ) : null}
      </KeyedRig>
      <SfxTrack hits={[{ name: "gather", at: GRAB.at }]} />
    </AbsoluteFill>
  );
};
