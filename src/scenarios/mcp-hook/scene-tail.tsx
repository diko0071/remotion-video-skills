import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { DirectionalBlur } from "../../kit/directional-blur";
import { ramp } from "../../core/motion";
import { SANS } from "./font";
import { glowShadow, RiseLetters } from "../../kit/rise-letters";
import { TAIL } from "./claude-timings";

const CORAL = "#F0644A";
const ease = (p: number) => 1 - Math.pow(1 - p, 3);

export const TailScene: React.FC = () => {
  const frame = useCurrentFrame();
  const T = TAIL;
  const darken = ramp(frame, T.dark1[0], T.dark1[1]);
  const lighten = ramp(frame, T.light2[0], T.light2[1]);
  const toBlack = frame >= T.dark2;
  const bgLevel = toBlack ? 11 : Math.round(255 - 244 * darken + 244 * lighten * (frame >= T.light2[0] ? 1 : 0));
  const bg = `rgb(${bgLevel},${bgLevel},${bgLevel})`;
  const ink = bgLevel < 128 ? "#FFFFFF" : "#141413";
  const lineSize = interpolate(frame, [T.talkAt, T.lineSettle], [T.talkSize, T.lineSize], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const exit = ease(ramp(frame, T.exit[0], T.exit[1]));
  const exitPrev = ease(ramp(frame - 1, T.exit[0], T.exit[1]));
  const dataOut = ramp(frame, T.exit[0], T.exit[0] + 5);
  const dataGlow = frame >= T.dataAt ? 1 : 0;
  const buildGlow = frame >= T.buildAt ? 1 - ramp(frame, T.buildGlowOff[0], T.buildGlowOff[1]) : 0;
  const buildDrift = ease(ramp(frame, T.buildAt, T.buildAt + 22));
  const buildSize = interpolate(frame, [T.light2[0], T.light2[1] + 4], [T.buildSize, T.buildSmall], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const pillIn = ease(ramp(frame, T.pillAt, T.pillAt + 8));
  const typedLen = Math.min(T.url.length, Math.max(0, Math.floor((frame - T.urlType[0]) / ((T.urlType[1] - T.urlType[0]) / T.url.length))));
  const pillGlow = frame >= T.pillAt ? 1 - ramp(frame, T.pillGlowOff[0], T.pillGlowOff[1]) : 0;
  const push = 1 + 0.07 * ramp(frame, T.pillAt, T.end);
  const phaseText = frame < T.buildAt;
  const phaseBuild = frame >= T.buildAt && !toBlack;
  return (
    <AbsoluteFill style={{ background: bg, fontFamily: SANS, fontWeight: 600, letterSpacing: "-0.02em" }}>
      {toBlack ? (
        <>
          <div style={{ position: "absolute", left: -250, top: 520, width: 1000, height: 900, borderRadius: 500, background: "radial-gradient(circle, rgba(200,80,45,0.32) 0%, rgba(200,80,45,0) 70%)" }} />
          <div style={{ position: "absolute", left: 1200, top: -350, width: 1000, height: 1000, borderRadius: 500, background: "radial-gradient(circle, rgba(60,80,170,0.32) 0%, rgba(60,80,170,0) 70%)" }} />
        </>
      ) : null}
      {(phaseText || exit < 1) && !toBlack ? (
        <DirectionalBlur id="mh-tail-line" x={Math.abs(exit - exitPrev) * 1600 * 0.3} style={{ position: "absolute", left: 0, right: 0, top: 540, transform: `translate(${-exit * 1700}px, -50%)`, textAlign: "center", fontSize: lineSize, lineHeight: 1 }}>
          <RiseLetters text="Talk" from={T.talkAt} step={3} color={ink} />
          <RiseLetters text=" to your" from={T.toYourAt} step={2} color={ink} />
          {frame >= T.dataAt ? (
            <span style={{ display: "inline-block", opacity: 1 - dataOut }}>
              <RiseLetters text=" data." from={T.dataAt} step={2} color={CORAL} glow={dataGlow} />
            </span>
          ) : null}
        </DirectionalBlur>
      ) : null}
      {phaseBuild ? (
        <div style={{ position: "absolute", left: 0, right: 0, top: 540, transform: `translate(${(1 - buildDrift) * T.buildFromX}px, -50%)`, textAlign: "center", fontSize: buildSize, lineHeight: 1 }}>
          <RiseLetters text="Build" from={T.buildAt} step={3} color={CORAL} glow={buildGlow} />
          {frame >= T.withAt ? <RiseLetters text=" with it." from={T.withAt} step={2} color="#141413" /> : null}
        </div>
      ) : null}
      {toBlack ? (
        <div style={{ position: "absolute", left: 0, right: 0, top: 540, display: "flex", justifyContent: "center", transform: `translateY(-50%) scale(${push})` }}>
          <div style={{ height: 206, minWidth: 90, borderRadius: 103, border: `2.5px solid rgba(255,${Math.round(255 - 110 * pillGlow)},${Math.round(255 - 140 * pillGlow)},${0.6 + 0.4 * pillGlow})`, padding: "0 80px", display: "flex", alignItems: "center", justifyContent: "center", opacity: pillIn, transform: `scale(${0.5 + 0.5 * pillIn})`, boxShadow: `0 0 ${16 * pillGlow}px rgba(255,200,180,${0.9 * pillGlow}), 0 0 ${46 * pillGlow}px rgba(240,100,74,${0.85 * pillGlow}), 0 0 ${120 * pillGlow}px rgba(240,100,74,${0.45 * pillGlow}), inset 0 0 ${28 * pillGlow}px rgba(240,100,74,${0.4 * pillGlow})`, fontSize: 76, fontWeight: 500, letterSpacing: "-0.01em", whiteSpace: "pre" }}>
            {T.url.split("").map((ch, i) => {
              const at = T.urlType[0] + (i * (T.urlType[1] - T.urlType[0])) / T.url.length;
              const cool = ramp(frame, at + 6, at + 22);
              const r = 240 + (255 - 240) * cool;
              const g = 100 + (255 - 100) * cool;
              const b = 74 + (255 - 74) * cool;
              return (
                <span key={i} style={{ display: i < typedLen ? "inline-block" : "none", color: `rgb(${r},${g},${b})`, textShadow: glowShadow(1 - cool) }}>
                  {ch}
                </span>
              );
            })}
            <span style={{ display: "inline-block", width: 3, height: 76, background: "#FFFFFF", marginLeft: 8, opacity: frame < T.urlType[1] + 14 && Math.floor(frame / 9) % 2 === 0 ? 1 : 0 }} />
          </div>
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
