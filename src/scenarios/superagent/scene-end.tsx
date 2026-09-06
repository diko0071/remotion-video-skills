import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame } from "remotion";
import { ramp } from "../../core/motion";
import { DirectionalBlur } from "../../kit/directional-blur";
import { KeyedRig } from "../../kit/keyed-rig";
import { Lockup } from "../../kit/lockup";
import { glowShadow, RiseLetters } from "../../kit/rise-letters";
import { CAM_END, CHIPS, END } from "./end-timings";
import { SANS } from "./font";

const ease = (p: number) => 1 - Math.pow(1 - p, 3);
const UI = "Inter, -apple-system, sans-serif";
const CORAL = "#EE6A54";
const L = (t: number) => t - END.from;

const Blob: React.FC<{ color: string; x: number; y: number; r: number; opacity: number }> = ({ color, x, y, r, opacity }) => (
  <div style={{ position: "absolute", left: x * 1920 - r, top: y * 1080 - r, width: r * 2, height: r * 2, borderRadius: r, background: `radial-gradient(circle, ${color} 0%, ${color} 30%, rgba(255,255,255,0) 70%)`, opacity, filter: "blur(40px)" }} />
);

const Illustration: React.FC<{ kind: string; at: number }> = ({ kind, at }) => {
  const frame = useCurrentFrame();
  if (kind === "bars") {
    return (
      <svg width={380} height={250} viewBox="0 0 380 250">
        {[
          { x: 40, h: 90, c: "#BFD3FF" },
          { x: 165, h: 160, c: "#F26B5B" },
          { x: 290, h: 235, c: "#EE4D3A" },
        ].map((b, i) => {
          const p = ease(ramp(frame, at + 8 + i * 5, at + 20 + i * 5));
          return <rect key={i} x={b.x} y={245 - b.h * p} width={80} height={b.h * p} rx={10} fill={b.c} />;
        })}
        <line x1={10} y1={247} x2={370} y2={247} stroke="#D8DCE8" strokeWidth={3} />
      </svg>
    );
  }
  if (kind === "card") {
    const p = ease(ramp(frame, at + 12, at + 22));
    return (
      <div style={{ position: "relative", width: 460, height: 190 }}>
        <div style={{ position: "absolute", right: 30, top: 0, width: 130, height: 130, borderRadius: 65, background: "#BFD3FF" }} />
        <div style={{ position: "absolute", left: 40, top: 40, width: 340, height: 170, borderRadius: 24, background: CORAL }}>
          <div style={{ position: "absolute", left: 30, top: 28, width: 48, height: 32, borderRadius: 8, background: "#BFD3FF" }} />
          <div style={{ position: "absolute", left: 30, top: 96, width: 240, height: 12, borderRadius: 6, background: "rgba(255,255,255,0.55)" }} />
          <div style={{ position: "absolute", left: 30, top: 122, width: 160, height: 12, borderRadius: 6, background: "rgba(255,255,255,0.55)" }} />
        </div>
        <div style={{ position: "absolute", left: 350, top: 70, width: 150, height: 150, borderRadius: 75, background: "#E85A45", display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${p})`, color: "#FFF", fontSize: 110, fontWeight: 300, lineHeight: 1 }}>+</div>
      </div>
    );
  }
  const twinkle = (i: number) => 0.6 + 0.4 * Math.sin(frame / 6 + i * 1.7);
  return (
    <svg width={460} height={230} viewBox="0 0 460 230">
      {[{ x: 230, y: 115, s: 110, c: CORAL, o: 1 }, { x: 60, y: 40, s: 40, c: CORAL, o: twinkle(1) }, { x: 400, y: 190, s: 40, c: CORAL, o: twinkle(2) }, { x: 380, y: 50, s: 26, c: "#BFD3FF", o: twinkle(3) }, { x: 80, y: 190, s: 26, c: "#BFD3FF", o: twinkle(4) }].map((s, i) => (
        <path key={i} d={`M ${s.x} ${s.y - s.s} Q ${s.x} ${s.y} ${s.x + s.s} ${s.y} Q ${s.x} ${s.y} ${s.x} ${s.y + s.s} Q ${s.x} ${s.y} ${s.x - s.s} ${s.y} Q ${s.x} ${s.y} ${s.x} ${s.y - s.s} Z`} fill={s.c} opacity={s.o} transform={`scale(${ease(ramp(frame, at + 10 + i * 3, at + 20 + i * 3))})`} style={{ transformOrigin: `${s.x}px ${s.y}px` }} />
      ))}
    </svg>
  );
};

const FeatureCard: React.FC<{ index: number }> = ({ index }) => {
  const frame = useCurrentFrame();
  const c = END.cards[index];
  const a = L(c.at);
  const p = ease(ramp(frame, a, a + 14));
  const pPrev = ease(ramp(frame - 1, a, a + 14));
  const out = ramp(frame, L(END.cardsOut[0]), L(END.cardsOut[1]));
  if (frame < a) return null;
  return (
    <DirectionalBlur id={`sa-feat-${index}`} x={Math.abs(p - pPrev) * 60} y={Math.abs(p - pPrev) * 60} style={{ position: "absolute", left: c.x, top: c.y, width: c.w, height: c.h }}>
      <div style={{ width: c.w, height: c.h, borderRadius: 40, background: "rgba(255,255,255,0.55)", boxShadow: "0 0 0 2px rgba(255,255,255,0.9), 0 30px 60px rgba(90,80,140,0.12)", padding: 42, opacity: p * (1 - out), transform: `scale(${0.35 + 0.65 * p}) translateY(${out * -60}px)`, filter: out > 0 ? `blur(${out * 12}px)` : undefined }}>
        <div style={{ height: c.h - 84 - 150, borderRadius: 30, background: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Illustration kind={c.kind} at={a} />
        </div>
        <div style={{ fontFamily: UI, fontSize: 44, lineHeight: 1.35, color: "#4A4A55", marginTop: 34 }}>
          <RiseLetters text={c.text} from={a + 8} step={0.6} color="#4A4A55" rise={0.15} blur={6} len={5} />
        </div>
      </div>
    </DirectionalBlur>
  );
};

const Chip: React.FC<{ index: number }> = ({ index }) => {
  const frame = useCurrentFrame();
  const c = CHIPS[index];
  const a = L(END.chipsAt) + index * 3;
  const p = ease(ramp(frame, a, a + 14));
  const drift = (frame - a) * 0.35;
  const dirX = c.x < 960 ? -1 : 1;
  const dirY = c.y < 540 ? -1 : 1;
  if (frame < a) return null;
  return (
    <div style={{ position: "absolute", left: c.x + (1 - p) * dirX * 300 + drift * dirX, top: c.y + (1 - p) * dirY * 200 + drift * dirY * 0.6, width: c.w, opacity: p, filter: p < 0.95 ? `blur(${(1 - p) * 14}px)` : undefined }}>
      <div style={{ height: 150, borderRadius: 34, background: "#FFFFFF", boxShadow: "0 0 0 3px rgba(150,140,220,0.35)", borderTop: "8px solid transparent", backgroundImage: "linear-gradient(#FFF, #FFF), linear-gradient(90deg, #F3A9C7, #B9C6FF)", backgroundOrigin: "border-box", backgroundClip: "padding-box, border-box", display: "flex", alignItems: "center", padding: "0 40px", gap: 26, fontFamily: UI, fontSize: 34, color: "#5A4E40", whiteSpace: "nowrap" }}>
        <span style={{ flex: 1, overflow: "hidden" }}>{c.text}</span>
        <span style={{ width: 40, height: 40, borderRadius: 20, border: "6px solid #E4DFC5", borderTopColor: "#2F6BFF", flex: "none" }} />
        <span style={{ width: 62, height: 62, borderRadius: 16, background: "#F1EFE0", display: "inline-flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
          <svg width={30} height={30} viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
        </span>
      </div>
    </div>
  );
};

const Orb: React.FC<{ size: number; glow: number }> = ({ size, glow }) => (
  <div style={{ width: size, height: size, borderRadius: "50%", background: "radial-gradient(circle at 50% 35%, #7A5A3A 0%, #2B1E14 55%, #120C08 100%)", boxShadow: `0 0 ${size * 0.4 * glow}px rgba(193,151,103,${0.6 * glow}), 0 0 ${size * 1.1 * glow}px rgba(193,151,103,${0.3 * glow})`, position: "relative", overflow: "hidden" }}>
    <div style={{ position: "absolute", left: "8%", right: "8%", top: "40%", height: "22%", borderRadius: "50%", background: "linear-gradient(90deg, rgba(255,230,200,0) 0%, #F6DDB8 30%, #FFF2E0 50%, #F6DDB8 70%, rgba(255,230,200,0) 100%)", filter: "blur(4px)" }} />
  </div>
);

const LightPhase: React.FC = () => {
  const frame = useCurrentFrame();
  const g = ramp(frame, L(END.gradientIn[0]), L(END.gradientIn[1]));
  const toPink = ramp(frame, L(END.cardsOut[0]), L(END.cardsOut[1]) + 6);
  const lineOut = ramp(frame, L(END.lineOut[0]), L(END.lineOut[1]));
  const oneOut = ramp(frame, L(END.oneOut[0]), L(END.oneOut[1]));
  const orbIn = ease(ramp(frame, L(END.orbAt), L(END.orbAt) + 14));
  return (
    <KeyedRig id="sa-end-rig" keys={CAM_END} bg="#FBFAFC">
      <Blob color="#BFD3FF" x={0.8} y={0.15} r={900} opacity={g * (1 - toPink * 0.7)} />
      <Blob color="#F3B8DA" x={0.15} y={0.85} r={900} opacity={g} />
      <Blob color="#FBD3AE" x={0.85} y={0.9} r={600} opacity={g * toPink} />
      {END.cards.map((_, i) => (
        <FeatureCard key={i} index={i} />
      ))}
      {frame >= L(END.yourAt) && lineOut < 1 ? (
        <div style={{ position: "absolute", left: 0, right: 0, top: 540, transform: "translateY(-50%)", textAlign: "center", fontFamily: SANS, fontSize: 76, fontWeight: 500, color: "#1A1A1A", whiteSpace: "pre", opacity: 1 - lineOut, filter: lineOut > 0 ? `blur(${lineOut * 10}px)` : undefined }}>
          <RiseLetters text="Your" from={L(END.yourAt)} step={3} color="#1A1A1A" rise={0.2} />
          <RiseLetters text=" AI" from={L(END.aiAt)} step={3} color="#1A1A1A" rise={0.2} />
          <RiseLetters text=" visibility" from={L(END.visAt)} step={2} color="#1A1A1A" rise={0.2} />
        </div>
      ) : null}
      {CHIPS.map((_, i) => (
        <Chip key={i} index={i} />
      ))}
      {frame >= L(END.oneAt) && oneOut < 1 ? (
        <div style={{ position: "absolute", left: 0, right: 0, top: 540, transform: "translateY(-50%)", textAlign: "center", fontFamily: SANS, fontSize: 76, fontWeight: 500, color: "#1A1A1A", opacity: 1 - oneOut, filter: oneOut > 0 ? `blur(${oneOut * 10}px)` : undefined }}>
          <RiseLetters text="One prompt away" from={L(END.oneAt)} step={2} color="#1A1A1A" rise={0.2} />
        </div>
      ) : null}
      {frame >= L(END.orbAt) ? (
        <div style={{ position: "absolute", left: 960 - 190, top: 540 - 190, opacity: orbIn, transform: `scale(${0.6 + 0.4 * orbIn})` }}>
          <Orb size={380} glow={1} />
        </div>
      ) : null}
    </KeyedRig>
  );
};

const DarkPhase: React.FC = () => {
  const frame = useCurrentFrame();
  const typedLen = Math.min(END.url.length, Math.max(0, Math.floor((frame - L(END.urlType[0])) / ((L(END.urlType[1]) - L(END.urlType[0])) / END.url.length))));
  const glow = 1 - ramp(frame, L(END.pillGlowOff[0]), L(END.pillGlowOff[1]));
  const pillIn = ease(ramp(frame, L(END.dark), L(END.dark) + 8));
  return (
    <AbsoluteFill style={{ background: "#141216" }}>
      <Blob color="#3A4E9A" x={0.18} y={0.18} r={600} opacity={0.7} />
      <Blob color="#B44A2A" x={0.85} y={0.85} r={640} opacity={0.65} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 540, display: "flex", justifyContent: "center", transform: "translateY(-50%)" }}>
        <div style={{ height: 96, minWidth: 80, borderRadius: 48, border: `2px solid rgba(255,${Math.round(255 - 100 * glow)},${Math.round(255 - 130 * glow)},${0.55 + 0.45 * glow})`, padding: "0 40px", display: "flex", alignItems: "center", fontFamily: SANS, fontSize: 40, fontWeight: 500, color: "#FFFFFF", whiteSpace: "pre", opacity: pillIn, transform: `scale(${0.6 + 0.4 * pillIn})`, boxShadow: `0 0 ${14 * glow}px rgba(255,200,180,${0.9 * glow}), 0 0 ${40 * glow}px rgba(240,100,74,${0.8 * glow}), inset 0 0 ${22 * glow}px rgba(240,100,74,${0.4 * glow})` }}>
          {END.url.split("").map((ch, i) => {
            const a = L(END.urlType[0]) + (i * (L(END.urlType[1]) - L(END.urlType[0]))) / END.url.length;
            const cool = ramp(frame, a + 6, a + 20);
            return (
              <span key={i} style={{ display: i < typedLen ? "inline-block" : "none", color: `rgb(${Math.round(240 + 15 * cool)},${Math.round(100 + 155 * cool)},${Math.round(74 + 181 * cool)})`, textShadow: glowShadow(1 - cool) }}>
                {ch}
              </span>
            );
          })}
          <span style={{ display: "inline-block", width: 2, height: 40, background: "#FFF", marginLeft: 6, opacity: frame < L(END.urlType[1]) + 14 && Math.floor(frame / 9) % 2 === 0 ? 1 : 0 }} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

const WhitePhase: React.FC = () => {
  const frame = useCurrentFrame();
  const tryOut = ramp(frame, L(END.tryOut), L(END.tryOut) + 6);
  return (
    <AbsoluteFill style={{ background: "#FCFCFC" }}>
      {frame < L(END.lockupAt) ? (
        <div style={{ position: "absolute", left: 0, right: 0, top: 540, transform: "translateY(-50%)", textAlign: "center", fontFamily: SANS, fontSize: 48, fontWeight: 500, color: "#1A1A1A", opacity: 1 - tryOut }}>
          <RiseLetters text="Try it free" from={L(END.tryAt)} step={2} color="#1A1A1A" rise={0.2} />
        </div>
      ) : (
        <Sequence from={L(END.lockupAt)} layout="none">
          <Lockup mark="ryze-sun.png" word="Ryze AI" tagline="Only on Ryze SuperAgent" background="#FCFCFC" markSize={72} wordSize={96} />
        </Sequence>
      )}
    </AbsoluteFill>
  );
};

export const EndScene: React.FC = () => {
  const frame = useCurrentFrame();
  if (frame >= L(END.white)) return <WhitePhase />;
  if (frame >= L(END.dark)) return <DarkPhase />;
  return <LightPhase />;
};
