import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { CamKey } from "../../core/stage";
import { ramp } from "../../core/motion";
import { DirectionalBlur } from "../../kit/directional-blur";
import { KeyedRig, projectThroughKeys } from "../../kit/keyed-rig";
import { INTER } from "./font";
import { Phone, PHONE_SCALE, PHONE_TOP, toWorld } from "./phone";
import { FIELD, Inbox, Menu, MENU, ROW_H, Sheet, SHEET } from "./ui-light";
import { INK, LIGHT, LINE, PHONE_LIGHT as P } from "./timings";

const menuPoint = (dy: number) => toWorld(MENU.x + MENU.w / 2, MENU.y + dy);
const fieldPoint = toWorld(SHEET.x + SHEET.w / 2, SHEET.y + FIELD.y + FIELD.h / 2);
const sheetPoint = toWorld(SHEET.x + SHEET.w / 2, SHEET.y + SHEET.h / 2 + 20);
const numberRow = menuPoint(8 + ROW_H * 5.5 + 9);
const menuMid = menuPoint(200);
const LENS_ZOOM = 2.25;

export const LIGHT_KEYS: readonly CamKey[] = [
  { at: P.from, zoom: 1, x: 960, y: 540 },
  { at: P.lens[1] - 1, zoom: 1, x: 960, y: 540 },
  { at: P.lens[1], zoom: LENS_ZOOM, x: menuMid.x, y: menuMid.y, cut: true },
  { at: P.rowInsert, zoom: 2.35, x: menuMid.x, y: menuMid.y + 20 },
  { at: P.labelTo + 8, zoom: 2.45, x: numberRow.x, y: numberRow.y },
  { at: P.press[1] + 1, zoom: 2.5, x: numberRow.x, y: numberRow.y },
  { at: P.menuExit[0], zoom: 0.74, x: sheetPoint.x, y: sheetPoint.y, cut: true },
  { at: P.toggle[1], zoom: 0.78, x: sheetPoint.x, y: sheetPoint.y },
  { at: P.dot.at + 4, zoom: 0.82, x: fieldPoint.x, y: fieldPoint.y },
];

const LENS_KEYS: readonly CamKey[] = [
  { at: P.lens[0], zoom: 1.3, x: menuMid.x, y: menuMid.y },
  { at: P.lens[1], zoom: LENS_ZOOM, x: menuMid.x, y: menuMid.y },
  ...LIGHT_KEYS.filter((k) => k.at > P.lens[1]),
];
const EXIT_KEYS: readonly CamKey[] = [{ at: 0, zoom: 2.5, x: numberRow.x, y: numberRow.y }];

const DIAL_DIGITS = "9 0 3 2 5 6 8 7 1 4 3 5 5 0 1 6 2 9 8 4 0 7 2 6 1 3".split(" ");

const Dial: React.FC<{ frame: number }> = ({ frame }) => {
  const rise = ramp(frame, P.rise[0] - 4, P.rise[1] + 2, Easing.out(Easing.cubic));
  const cy = interpolate(rise, [0, 1], [1900, 1100]);
  const r = 660;
  const fade = 1 - ramp(frame, P.menuOpen[1], P.menuOpen[1] + 12);
  return (
    <svg width={1920} height={2400} style={{ position: "absolute", left: 0, top: 0, opacity: fade }}>
      <circle cx={960} cy={cy} r={r} fill="none" stroke={LINE} strokeWidth={1.6} />
      <circle cx={960} cy={cy} r={r + 80} fill="none" stroke={LINE} strokeWidth={1.2} strokeDasharray="3 10" />
      {DIAL_DIGITS.map((d, i) => {
        const a = -170 + i * 6.2 + frame * 0.18;
        const rad = (a * Math.PI) / 180;
        const x = 960 + (r + 36) * Math.cos(rad);
        const y = cy + (r + 36) * Math.sin(rad);
        return (
          <text key={i} x={x} y={y} fontFamily={INTER} fontSize={26} fill={INK} textAnchor="middle" dominantBaseline="middle" transform={`rotate(${a + 90} ${x} ${y})`}>
            {d}
          </text>
        );
      })}
    </svg>
  );
};

type State = {
  top: number;
  chipGlow: number;
  open: number;
  insert: number;
  labelChars: number;
  press: number;
  white: number;
  sheetIn: number;
  toggle: number;
};

const useLightState = (frame: number): State => {
  const rise = ramp(frame, P.rise[0], P.rise[1], Easing.out(Easing.cubic));
  return {
    top: interpolate(rise, [0, 1], [1000, PHONE_TOP]),
    chipGlow: ramp(frame, P.chipGlow, P.menuOpen[0]) * (1 - ramp(frame, P.menuOpen[1], P.menuOpen[1] + 6)),
    open: ramp(frame, P.menuOpen[0], P.menuOpen[1], Easing.out(Easing.back(1.2))),
    insert: ramp(frame, P.rowInsert - 4, P.rowInsert + 4, Easing.out(Easing.cubic)),
    labelChars: Math.floor(interpolate(frame, [P.labelFrom, P.labelTo], [0, 6], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })),
    press: ramp(frame, P.press[0], P.press[0] + 7, Easing.out(Easing.cubic)),
    white: ramp(frame, P.lens[1], P.lens[1] + 8) * (1 - ramp(frame, P.menuExit[0] - 1, P.menuExit[0])),
    sheetIn: ramp(frame, P.sheetUp[0], P.sheetUp[1], Easing.out(Easing.cubic)),
    toggle: ramp(frame, P.toggle[0], P.toggle[1], Easing.inOut(Easing.cubic)),
  };
};

const MenuAt: React.FC<{ s: State }> = ({ s }) => (
  <Menu open={s.open} insert={s.insert} labelChars={s.labelChars} press={s.press} />
);

const LightWorld: React.FC<{ frame: number; s: State; showMenu: boolean }> = ({ frame, s, showMenu }) => {
  const origin = toWorld(0, 0, s.top);
  return (
    <>
      <Dial frame={frame} />
      <Phone top={s.top}>
        <Inbox chipGlow={s.chipGlow} />
        <div style={{ position: "absolute", inset: 0, background: `rgba(0,0,0,${s.sheetIn * 0.35})` }} />
        <div style={{ position: "absolute", inset: 0, background: `rgba(255,255,255,${s.white})` }} />
        {showMenu ? <MenuAt s={s} /> : null}
      </Phone>
      {s.sheetIn > 0 ? (
        <div style={{ position: "absolute", left: origin.x, top: origin.y, transformOrigin: "0 0", transform: `scale(${PHONE_SCALE}) translateY(${(1 - s.sheetIn) * 420}px)` }}>
          <Sheet rollFrom={P.rollFrom} settleFrom={P.settleFrom} toggle={s.toggle} />
        </div>
      ) : null}
    </>
  );
};

export const PhoneLightScene: React.FC = () => {
  const frame = useCurrentFrame();
  const s = useLightState(frame);
  const menuLive = frame < P.menuExit[0];

  const lensP = ramp(frame, P.lens[0], P.lens[1], Easing.in(Easing.quad));
  const lensR = frame >= P.lens[1] ? 2400 : lensP * 1250;
  const lensC = projectThroughKeys(LIGHT_KEYS, frame, menuMid.x, menuMid.y);

  const exitP = ramp(frame, P.menuExit[0], P.menuExit[1], Easing.in(Easing.cubic));
  const exitPrev = ramp(frame - 1, P.menuExit[0], P.menuExit[1], Easing.in(Easing.cubic));
  const exitY = -exitP * 1300;
  const exitBlur = Math.min(30, Math.abs(exitP - exitPrev) * 1300 * 0.25);
  const origin = toWorld(0, 0, s.top);

  const dot = projectThroughKeys(LIGHT_KEYS, frame, fieldPoint.x, fieldPoint.y);
  const dotIn = ramp(frame, P.dot.at, P.dot.at + 4, Easing.out(Easing.back(2)));
  const grow = ramp(frame, P.dot.grow[0], P.dot.grow[1], Easing.in(Easing.cubic));
  const dotR = 14 * dotIn + grow * 1500;
  const whiteR = dotR * 1.6 + 22 * dotIn + ramp(frame, P.dot.at + 1, P.dot.grow[0] + 10, Easing.out(Easing.cubic)) * 360;

  return (
    <AbsoluteFill style={{ background: LIGHT }}>
      <KeyedRig id="nr-light" keys={LIGHT_KEYS} bg={LIGHT}>
        <LightWorld frame={frame} s={s} showMenu={menuLive} />
      </KeyedRig>
      {frame >= P.lens[0] && frame < P.lens[1] + 3 ? (
        <AbsoluteFill style={{ clipPath: `circle(${lensR}px at ${lensC.x}px ${lensC.y}px)` }}>
          <KeyedRig id="nr-lens" keys={LENS_KEYS} bg={LIGHT}>
            <LightWorld frame={frame} s={s} showMenu />
          </KeyedRig>
          <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
            <circle cx={lensC.x} cy={lensC.y} r={Math.max(0, lensR - 1)} fill="none" stroke="rgba(0,0,0,0.12)" strokeWidth={2} />
          </svg>
        </AbsoluteFill>
      ) : null}
      {frame >= P.menuExit[0] && frame < P.menuExit[1] ? (
        <AbsoluteFill style={{ transform: `translateY(${exitY}px)` }}>
          <DirectionalBlur id="nr-menu-exit" y={exitBlur} style={{ position: "absolute", inset: 0 }}>
            <KeyedRig id="nr-exit" keys={EXIT_KEYS} bg="transparent">
              <div style={{ position: "absolute", left: origin.x, top: origin.y, transformOrigin: "0 0", transform: `scale(${PHONE_SCALE})` }}>
                <MenuAt s={s} />
              </div>
            </KeyedRig>
          </DirectionalBlur>
        </AbsoluteFill>
      ) : null}
      {frame >= P.dot.at ? (
        <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
          <circle cx={dot.x} cy={dot.y} r={whiteR} fill="#fff" />
          <circle cx={dot.x} cy={dot.y} r={whiteR} fill="none" stroke={LINE} strokeWidth={1.4} opacity={1 - grow} />
          <circle cx={dot.x} cy={dot.y} r={dotR} fill="#000" />
        </svg>
      ) : null}
    </AbsoluteFill>
  );
};
