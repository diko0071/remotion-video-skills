import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { ramp } from "../../core/motion";
import { Cursor } from "../../kit/cursor";
import { RiseLetters } from "../../kit/rise-letters";
import { SANS } from "./font";
import { INTRO } from "./intro-timings";

const ease = (p: number) => 1 - Math.pow(1 - p, 3);
const CORAL = "#EE6A54";
const INK = "#1A1A1A";
const UI = "Inter, -apple-system, sans-serif";

const Blob: React.FC<{ color: string; x: number; y: number; r: number; opacity: number }> = ({ color, x, y, r, opacity }) => (
  <div style={{ position: "absolute", left: x * 1920 - r, top: y * 1080 - r, width: r * 2, height: r * 2, borderRadius: r, background: `radial-gradient(circle, ${color} 0%, ${color} 25%, rgba(255,255,255,0) 70%)`, opacity, filter: "blur(40px)" }} />
);

const TintWord: React.FC<{ text: string; at: number; tint: string; out: number }> = ({ text, at, tint, out }) => {
  const frame = useCurrentFrame();
  const gone = ramp(frame, out, out + 6);
  const dark = (i: number) => ramp(frame, at + i * 3 + 6, at + i * 3 + 16);
  return (
    <RiseLetters
      text={text}
      from={at}
      step={3}
      len={8}
      rise={0.25}
      blur={12}
      style={{ position: "absolute", left: 0, right: 0, top: INTRO.wordY, transform: "translateY(-50%)", textAlign: "center", fontFamily: SANS, fontSize: INTRO.wordSize, fontWeight: 500, letterSpacing: "-0.01em", whiteSpace: "pre", opacity: 1 - gone }}
      letterStyle={(p, i) => ({ color: dark(i) < 1 ? tint : INK })}
      letter={(ch, p, i) => <span style={{ color: dark(i) < 1 ? undefined : INK, opacity: 1 }}>{ch}</span>}
    />
  );
};

const Orb: React.FC<{ size: number; glow?: number }> = ({ size, glow = 1 }) => (
  <div style={{ width: size, height: size, borderRadius: "50%", background: "radial-gradient(circle at 50% 35%, #7A5A3A 0%, #2B1E14 55%, #120C08 100%)", boxShadow: `0 0 ${size * 0.35 * glow}px rgba(193,151,103,${0.55 * glow}), 0 0 ${size * 0.9 * glow}px rgba(193,151,103,${0.25 * glow})`, position: "relative", overflow: "hidden" }}>
    <div style={{ position: "absolute", left: "8%", right: "8%", top: "40%", height: "22%", borderRadius: "50%", background: "linear-gradient(90deg, rgba(255,230,200,0) 0%, #F6DDB8 30%, #FFF2E0 50%, #F6DDB8 70%, rgba(255,230,200,0) 100%)", filter: "blur(4px)" }} />
  </div>
);

const GradientText: React.FC<{ text: string; at: number; out: readonly [number, number]; size?: number }> = ({ text, at, out, size = 150 }) => {
  const frame = useCurrentFrame();
  const gone = ramp(frame, out[0], out[1]);
  return (
    <RiseLetters
      text={text}
      from={at}
      step={1.4}
      len={7}
      rise={0.2}
      blur={10}
      style={{ display: "inline-block", fontFamily: SANS, fontSize: size, fontWeight: 600, letterSpacing: "-0.01em", whiteSpace: "pre", backgroundImage: `linear-gradient(90deg, #6F9BFF 0%, #C86AD8 45%, ${CORAL} 100%)`, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", opacity: 1 - gone, filter: gone > 0 ? `blur(${gone * 10}px)` : undefined }}
      letterStyle={() => ({ backgroundImage: "inherit", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" })}
    />
  );
};

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const T = INTRO;
  const dark = frame >= T.dark;
  const reveal = ease(ramp(frame, T.reveal[0], T.reveal[1]));
  const light = frame >= T.reveal[0];
  const grow = ease(ramp(frame, T.icon.grow[0], T.icon.grow[1]));
  const settle = ease(ramp(frame, T.icon.settle[0], T.icon.settle[1]));
  const neon = frame >= T.icon.grow[0] ? 1 - ramp(frame, T.icon.neonOff[0], T.icon.neonOff[1]) : 0;
  const iconSize = 44 + (T.icon.big - 44) * grow + (T.icon.small - T.icon.big) * settle;
  const toChat = ease(ramp(frame, T.toChat[0], T.toChat[1]));
  const orbSize = T.orb.size + (T.orbSmall.size - T.orb.size) * toChat;
  const orbY = T.orb.y + (T.orbSmall.y - T.orb.y) * toChat;
  const bubble = frame >= T.bubbleAt ? ease(ramp(frame, T.bubbleAt, T.bubbleAt + 10)) * (1 - ramp(frame, T.bubbleOut, T.bubbleOut + 6)) : 0;
  const greeting = ease(ramp(frame, T.greetingAt, T.greetingAt + 12));
  const composer = ease(ramp(frame, T.composerAt, T.composerAt + 14));
  const chips = ramp(frame, T.chipsAt, T.chipsAt + 12);
  const activeWord = T.words.findIndex((w, i) => frame >= w.at && (i === T.words.length - 1 || frame < T.words[i + 1].at));
  const btn = ease(ramp(frame, T.buttonAt, T.buttonAt + 8));
  const buttonX = 960 + 140;
  const buttonY = T.wordY;
  const pressed = frame >= T.click && frame < T.click + 5;
  return (
    <AbsoluteFill style={{ background: dark && !light ? "#171518" : "#FCFCFC", overflow: "hidden" }}>
      {!dark || light ? (
        <>
          {T.words.map((w, i) => (
            <Blob key={w.text} color={w.blob.color} x={w.blob.x} y={w.blob.y} r={620} opacity={light ? 0 : Math.max(0, 1 - Math.abs(activeWord - i)) * 0.9} />
          ))}
          {light ? (
            <>
              <Blob color="#BFD3FF" x={0.18} y={0.25} r={700} opacity={0.9 * reveal} />
              <Blob color="#F7B9A8" x={0.85} y={0.85} r={700} opacity={0.9 * reveal} />
              <Blob color="#FBD3AE" x={0.75} y={0.15} r={500} opacity={0.6 * reveal} />
            </>
          ) : null}
        </>
      ) : null}
      {!dark ? (
        <>
          {T.words.map((w, i) => (frame >= w.at ? <TintWord key={w.text} text={w.text} at={w.at} tint={w.tint} out={i < T.words.length - 1 ? T.words[i + 1].at - 4 : 10 ** 6} /> : null))}
          {frame >= T.buttonAt ? (
            <div style={{ position: "absolute", left: buttonX - 22, top: buttonY - 22, width: 44, height: 44, borderRadius: 22, background: "#F1EFE0", boxShadow: "0 2px 8px rgba(0,0,0,0.12)", display: "flex", alignItems: "center", justifyContent: "center", opacity: btn, transform: `scale(${(0.4 + 0.6 * btn) * (pressed ? 0.85 : 1)})` }}>
              <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
            </div>
          ) : null}
        </>
      ) : null}
      {dark && !light ? (
        <>
          <Blob color="#3A4E9A" x={0.18} y={0.28} r={520} opacity={0.75} />
          <Blob color="#B44A2A" x={0.85} y={0.78} r={560} opacity={0.7} />
        </>
      ) : null}
      {dark && frame < T.reveal[1] + 2 ? (
        <div style={{ position: "absolute", left: 960 - iconSize / 2, top: (frame < T.icon.grow[0] ? buttonY : 540) - iconSize / 2, width: iconSize, height: iconSize, borderRadius: iconSize * 0.24, background: "#1C1A1F", boxShadow: `0 0 0 ${2 + 2 * neon}px rgba(255,255,255,${0.3 + 0.5 * neon}), 0 0 ${40 * neon}px rgba(210,120,255,${0.8 * neon}), 0 0 ${90 * neon}px rgba(100,140,255,${0.6 * neon}), inset 0 0 ${30 * neon}px rgba(210,120,255,${0.35 * neon})`, display: "flex", alignItems: "center", justifyContent: "center", opacity: light ? 1 - reveal : 1 }}>
          <Img src={staticFile("ryze-sun-white.png")} style={{ width: iconSize * 0.6, height: iconSize * 0.6, display: "block", filter: neon > 0.05 ? `drop-shadow(0 0 ${14 * neon}px rgba(255,200,240,${0.9 * neon}))` : undefined, opacity: 0.85 + 0.15 * (1 - neon) }} />
        </div>
      ) : null}
      {light && reveal < 1 ? (
        <div style={{ position: "absolute", inset: 0, opacity: 1, maskImage: `radial-gradient(circle at 960px 540px, black ${Math.max(0, (1 - reveal) * 1500 - 120)}px, transparent ${(1 - reveal) * 1500 + 40}px)`, WebkitMaskImage: `radial-gradient(circle at 960px 540px, black ${Math.max(0, (1 - reveal) * 1500 - 120)}px, transparent ${(1 - reveal) * 1500 + 40}px)` }}>
          <div style={{ position: "absolute", inset: 0, background: "#171518" }} />
        </div>
      ) : null}
      {light ? (
        <>
          <div style={{ position: "absolute", left: 0, right: 0, top: 300, textAlign: "center", transform: "translateY(-50%)" }}>
            <GradientText text="Introducing" at={T.introducingAt} out={T.textOut} />
          </div>
          <div style={{ position: "absolute", left: 0, right: 0, top: 770, textAlign: "center", transform: "translateY(-50%)" }}>
            <GradientText text="Ryze SuperAgent" at={T.superAt} out={T.textOut} size={140} />
          </div>
          <div style={{ position: "absolute", left: 960 - orbSize / 2, top: orbY - orbSize / 2 }}>
            <Orb size={orbSize} glow={1 - 0.4 * toChat} />
          </div>
          {bubble > 0 ? (
            <div style={{ position: "absolute", left: 1080, top: 300, opacity: bubble, transform: `translateY(${(1 - bubble) * 12}px)` }}>
              <svg width={200} height={140} style={{ position: "absolute", left: -110, top: 70 }}>
                <line x1={0} y1={130} x2={120} y2={10} stroke="#7A5CF0" strokeWidth={3} strokeDasharray="10 10" />
                <circle cx={122} cy={8} r={9} fill="#7A5CF0" />
              </svg>
              <div style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.12)", borderRadius: 18, padding: "20px 34px", fontFamily: UI, fontSize: 40, color: "#222", boxShadow: "0 12px 30px rgba(0,0,0,0.08)" }}>How may I help you?</div>
            </div>
          ) : null}
          {frame >= T.greetingAt ? (
            <div style={{ position: "absolute", left: 0, right: 0, top: 230, textAlign: "center", fontFamily: UI, fontSize: 40, fontWeight: 500, color: "#222", opacity: greeting, transform: `translateY(${(1 - greeting) * 10}px)` }}>Good Evening, Dmitry!</div>
          ) : null}
          {frame >= T.composerAt ? (
            <div style={{ position: "absolute", left: 300, top: 320, width: 1320, opacity: composer, transform: `translateY(${(1 - composer) * 30}px)` }}>
              <div style={{ height: 200, borderRadius: 26, background: "#FFFFFF", boxShadow: "0 0 0 1px rgba(60,50,20,0.12), 0 20px 50px rgba(60,50,20,0.10)", padding: "30px 34px", fontFamily: UI, fontSize: 30, color: "#8A7A5A", position: "relative" }}>
                How can I help you today?
                <div style={{ position: "absolute", right: 30, bottom: 26, display: "flex", gap: 14, alignItems: "center" }}>
                  <span style={{ width: 20, height: 20, borderRadius: 10, background: "#2F6BFF", display: "inline-block" }} />
                  <span style={{ width: 40, height: 40, borderRadius: 20, background: "#F1EFE0", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
                  </span>
                </div>
              </div>
              <div style={{ display: "flex", gap: 20, marginTop: 24 }}>
                {["AI Search", "SEO Growth", "Account", "Cleanup"].map((c, i) => (
                  <span key={c} style={{ fontFamily: UI, fontSize: 24, color: "#333", padding: "12px 22px", borderRadius: 12, border: "1px solid rgba(60,50,20,0.18)", background: "#FFFFFF", opacity: ramp(frame, T.chipsAt + i * 3, T.chipsAt + i * 3 + 8), transform: `translateY(${(1 - chips) * 10}px)` }}>
                    {c} <span style={{ marginLeft: 14, color: "#888" }}>+</span>
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </>
      ) : null}
      {!dark ? (
        <Cursor scale={2.2} appearAt={T.cursorIn} stops={[{ x: 1160, y: 860, at: T.cursorIn }, { x: buttonX + 6, y: buttonY + 8, at: T.cursorAtButton }, { x: buttonX + 6, y: buttonY + 8, at: T.click, click: true }]} />
      ) : null}
      {dark && !light ? <Cursor scale={2.2} stops={[{ x: buttonX + 6, y: buttonY + 8, at: T.dark }, { x: 1500, y: 1150, at: T.dark + 14 }]} /> : null}
    </AbsoluteFill>
  );
};
