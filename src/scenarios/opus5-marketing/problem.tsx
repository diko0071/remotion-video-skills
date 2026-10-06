import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { ramp, SPRINGS, useSpringAt } from "../../core/motion";
import { DirectionalBlur } from "../../kit/directional-blur";
import { Pop } from "../../kit/pop";
import { SettleLine } from "../../kit/settle-text";
import { SANS } from "./font";
import { CHAT, CREAM, DARK, HOOK, MUTED } from "./timings";

const CARD_X = 960 - CHAT.w / 2;

const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const out = ramp(frame, HOOK.out[0], HOOK.out[1]);
  if (frame >= HOOK.out[1]) return null;
  return (
    <AbsoluteFill style={{ opacity: 1 - out, filter: out > 0.02 ? `blur(${out * 12}px)` : undefined, transform: `translateY(${-out * 40}px)` }}>
      <SettleLine
        size={112}
        ink={CREAM}
        fontFamily={SANS}
        weight={600}
        lineHeight={1.2}
        parts={[
          { word: "AI", at: HOOK.words[0] },
          { word: "writes", at: HOOK.words[1] },
          { word: "your", at: HOOK.words[2] },
          { word: "ads.", at: HOOK.words[3] },
          { br: true },
          { word: "Then", at: HOOK.line2[0], dim: true },
          { word: "it", at: HOOK.line2[1], dim: true },
          { word: "stops.", at: HOOK.line2[2], dim: true },
        ]}
      />
    </AbsoluteFill>
  );
};

const Bubble: React.FC<{ at: number; text: string; top: number }> = ({ at, text, top }) => (
  <div style={{ position: "absolute", right: 44, top }}>
    <Pop at={at} from={0.8} rise={10}>
      <div style={{ background: "#2E2D2A", color: CREAM, fontSize: 36, padding: "18px 30px", borderRadius: 24, whiteSpace: "nowrap" }}>{text}</div>
    </Pop>
  </div>
);

const trashPos = (i: number) => ({ x: CHAT.trash.x - CARD_X - 40, y: CHAT.trash.y - CHAT.top - 20 + i * 2 });

const Refusal: React.FC<{ i: number; text: string }> = ({ i, text }) => {
  const frame = useCurrentFrame();
  const inAt = CHAT.refusalFrom + i * CHAT.refusalStep;
  const flyAt = CHAT.flyFrom + i * CHAT.flyStep;
  const pop = useSpringAt(inAt, SPRINGS.pop, 16);
  const fly = interpolate(frame, [flyAt, flyAt + CHAT.flyLen], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.cubic) });
  const flyPrev = interpolate(frame - 1, [flyAt, flyAt + CHAT.flyLen], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.cubic) });
  if (frame < inAt - 1 || fly >= 1) return null;
  const x0 = 44;
  const y0 = CHAT.rowTop + i * CHAT.rowStep;
  const t = trashPos(i);
  const x = x0 + (t.x - x0) * fly;
  const y = y0 + (t.y - y0) * fly - Math.sin(fly * Math.PI) * 120;
  const speed = Math.hypot((t.x - x0) * (fly - flyPrev), (t.y - y0) * (fly - flyPrev));
  return (
    <DirectionalBlur
      id={`o5-ref-${i}`}
      x={speed * 0.12}
      y={speed * 0.12}
      style={{
        position: "absolute",
        left: x,
        top: y,
        height: CHAT.rowH,
        display: "flex",
        alignItems: "center",
        gap: 18,
        padding: "0 30px",
        borderRadius: 18,
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.08)",
        color: MUTED,
        fontSize: 34,
        whiteSpace: "nowrap",
        opacity: Math.min(1, pop * 1.5),
        transform: `translateY(${(1 - pop) * 12}px) scale(${(0.9 + 0.1 * pop) * (1 - 0.72 * fly)}) rotate(${fly * (i % 2 === 0 ? -18 : 14)}deg)`,
        transformOrigin: "left center",
      }}
    >
      <span style={{ width: 30, height: 30, borderRadius: 15, border: `2.5px solid ${MUTED}`, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 19, fontWeight: 700 }}>!</span>
      {text}
    </DirectionalBlur>
  );
};

const Trash: React.FC = () => {
  const frame = useCurrentFrame();
  const rise = useSpringAt(CHAT.trashAt, SPRINGS.pop, 18);
  const hits = CHAT.refusals.map((_, i) => CHAT.flyFrom + i * CHAT.flyStep + CHAT.flyLen);
  const lid = Math.max(0, ...hits.map((h) => (frame >= h - 6 && frame < h + 8 ? 1 - Math.abs(frame - h) / 8 : 0)));
  const bump = Math.max(0, ...hits.map((h) => (frame >= h && frame < h + 8 ? Math.sin(((frame - h) / 8) * Math.PI) : 0)));
  const s = CHAT.trash.size;
  return (
    <div style={{ position: "absolute", left: CHAT.trash.x - s / 2, top: CHAT.trash.y - s / 2, width: s, height: s, opacity: Math.min(1, rise * 1.5), transform: `translateY(${(1 - rise) * 60 + bump * 6}px) scale(${0.7 + 0.3 * rise})` }}>
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none" stroke={CREAM} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <g style={{ transform: `rotate(${-lid * 26}deg)`, transformOrigin: "10px 12px" }}>
          <path d="M8 12h32" />
          <path d="M19 12V8.5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2V12" />
        </g>
        <path d="M11.5 15.5l2 24a3 3 0 0 0 3 2.8h15a3 3 0 0 0 3-2.8l2-24" />
        <path d="M20 21v14M28 21v14" />
      </svg>
    </div>
  );
};

const Chat: React.FC = () => {
  const frame = useCurrentFrame();
  const inP = useSpringAt(CHAT.from, SPRINGS.card, 20);
  const out = ramp(frame, CHAT.out[0], CHAT.out[1]);
  if (frame < CHAT.from - 1 || frame >= CHAT.out[1]) return null;
  return (
    <AbsoluteFill style={{ opacity: Math.min(1, inP * 1.4) * (1 - out), filter: out > 0.02 ? `blur(${out * 14}px)` : undefined }}>
      <div style={{ position: "absolute", left: CARD_X, top: CHAT.top, width: CHAT.w, height: CHAT.h, borderRadius: 28, background: "#1C1C1A", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 40px 90px rgba(0,0,0,0.45)", transform: `translateY(${(1 - inP) * 70}px) scale(${0.94 + 0.06 * inP})` }}>
        <Bubble at={CHAT.userAt} text={CHAT.userText} top={44} />
        <Bubble at={CHAT.whyAt} text={CHAT.whyText} top={CHAT.rowTop + CHAT.refusals.length * CHAT.rowStep + 8} />
        <div style={{ position: "absolute", left: 44, right: 44, bottom: 34, height: 84, borderRadius: 22, border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", padding: "0 30px", color: "#5E5C57", fontSize: 30 }}>Ask anything</div>
      </div>
      <div style={{ position: "absolute", left: CARD_X, top: CHAT.top, width: CHAT.w, height: CHAT.h, overflow: "visible", transform: `translateY(${(1 - inP) * 70}px)` }}>
        {CHAT.refusals.map((text, i) => (
          <Refusal key={text} i={i} text={text} />
        ))}
      </div>
      <Trash />
    </AbsoluteFill>
  );
};

export const ProblemScene: React.FC = () => (
  <AbsoluteFill style={{ background: DARK, fontFamily: SANS }}>
    <Hook />
    <Chat />
  </AbsoluteFill>
);
