import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { DirectionalBlur } from "../../kit/directional-blur";
import { Bot, blinkTrack } from "./bot";
import { LADDER_GPT, LADDER_GROK, LADDER_OPUS } from "./curves";
import { SANS } from "./font";
import { Headline, mix, textWidth } from "./headline";
import { CUT, GREY, INK, PANEL, r, sample } from "./timings";

const MODELS = [
  { key: "openai", icon: "ai/chatgpt.png", name: "GPT-5" },
  { key: "claude", icon: "icons/ai/claude.png", name: "Opus 5" },
  { key: "grok", icon: "integrations/x.svg", name: "Grok 4" },
  { key: "gemini", icon: "ai/gemini.png", name: "Gemini Flash" },
] as const;

const Mark: React.FC<{ icon: string; size: number }> = ({ icon, size }) => <Img src={staticFile(icon)} style={{ width: size, height: size, objectFit: "contain", display: "block" }} />;
const eo = Easing.out(Easing.cubic);
const back = Easing.out(Easing.back(1.6));
const clamp = (frame: number, a: number, b: number, easing = eo) => interpolate(frame, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing });

export const RoutesLine: React.FC = () => {
  const b = CUT.routes;
  const node = (icon: string) => <Mark icon={icon} size={80} />;
  return (
    <Headline
      size={135}
      lines={[
        { at: 0, words: [{ text: "Ryze" }, { text: "routes", at: r(565) - b, node: node("ai/gemini.png"), nodeAt: r(609) - b }] },
        { at: r(570) - b, words: [{ text: "to" }, { text: "the", node: node("icons/ai/claude.png"), nodeAt: r(610) - b }, { text: "best", at: r(576) - b }] },
        { at: r(582) - b, words: [{ text: "model", node: node("ai/chatgpt.png"), nodeAt: r(612) - b }, { text: "for", at: r(586) - b }, { text: "the", at: r(586) - b }, { text: "task", at: r(590) - b, node: node("integrations/x.svg"), nodeAt: r(611) - b }] },
      ]}
    />
  );
};

const MSG1 = "#growth: can someone pull this week's numbers?";
const MSG2 = "content calendar: new entry added to Q3 plan";
const ICON_X = [630, 850, 1070, 1290];
const ROW_Y = 660;

const Pill: React.FC<{ icon: string; text: string; typed: number; at: number; caret: boolean; grey: number }> = ({ icon, text, typed, at, caret, grey }) => {
  const frame = useCurrentFrame();
  const p = clamp(frame, at, at + 5, back);
  return (
    <div style={{ position: "absolute", left: 200, top: 455, width: 1520, height: 100, borderRadius: 999, background: mix(PANEL, "#8A8A8A", grey), color: "#FFF", display: "flex", alignItems: "center", gap: 20, padding: "0 40px", fontFamily: SANS, fontSize: 32, opacity: p > 0 ? 1 : 0, transform: `scale(${Math.max(0, p)})`, whiteSpace: "pre" }}>
      <Mark icon={icon} size={34} />
      <span>{text.slice(0, typed)}</span>
      <span style={{ width: 2, height: 34, background: "#FFF", marginLeft: -14, opacity: caret && Math.floor(frame / 8) % 2 === 0 ? 1 : 0 }} />
    </div>
  );
};

const RouteRow: React.FC<{ active: number; label: string; at: number; slideIn?: number; slideOut?: number }> = ({ active, label, at, slideIn, slideOut }) => {
  const frame = useCurrentFrame();
  const g = clamp(frame, at, at + 6);
  const typed = Math.min(label.length, Math.floor(Math.max(0, frame - at - 4) / 0.5));
  const sin = slideIn !== undefined ? clamp(frame, slideIn, slideIn + 9) : 1;
  const sout = slideOut !== undefined ? clamp(frame, slideOut, slideOut + 9, Easing.in(Easing.cubic)) : 0;
  const dx = (1 - sin) * -1400 + sout * 1400;
  const activeX = ICON_X[active] - 200;
  const textW = textWidth(label, 52, 500);
  const leftSlots = [activeX - 190, activeX - 330, activeX - 470];
  const rightSlots = [activeX + 46 + 22 + textW + 150, activeX + 46 + 22 + textW + 290, activeX + 46 + 22 + textW + 430];
  return (
    <DirectionalBlur id={`rr-${at}`} x={Math.abs((1 - sin) + sout) * 12} style={{ position: "absolute", left: dx, right: -dx, top: ROW_Y, height: 90 }}>
      {MODELS.map((m, i) => {
        const isA = i === active;
        const side = i < active ? -1 : i > active ? 1 : 0;
        const slot = side < 0 ? leftSlots[active - 1 - i] ?? leftSlots[2] : side > 0 ? rightSlots[i - active - 1] ?? rightSlots[2] : ICON_X[i];
        const x = isA ? ICON_X[i] - g * 200 : ICON_X[i] + (slot - ICON_X[i]) * g;
        const size = 68 + (isA ? g * 40 : 0);
        return (
          <div key={m.key} style={{ position: "absolute", left: x - size / 2, top: 45 - size / 2, display: "flex", alignItems: "center", gap: 22, opacity: isA ? 1 : Math.max(0, sin - sout) }}>
            <Mark icon={m.icon} size={size} />
            {isA ? (
              <span style={{ fontFamily: SANS, fontSize: 52, fontWeight: 500, whiteSpace: "pre", opacity: g }}>
                {label.split("").map((ch, k) => (
                  <span key={k} style={{ color: k < typed ? (k < 10 ? INK : GREY) : "transparent" }}>{ch}</span>
                ))}
              </span>
            ) : null}
          </div>
        );
      })}
    </DirectionalBlur>
  );
};

export const RoutingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const b = CUT.routing;
  const t = (f: number) => r(f) - b;
  const typed1 = Math.floor(interpolate(frame, [t(634), t(658)], [0, MSG1.length], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const second = frame >= t(703);
  const grey = interpolate(frame, [t(699), t(702), t(703), t(706)], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const pulse = (a: number, bb: number) => interpolate(frame, [a, a + 3, bb - 3, bb], [1, 1.5, 1.5, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const pulses = [1, pulse(t(650), t(656)), pulse(t(658), t(664)), pulse(t(668), t(676))];
  const heroS = clamp(frame, 0, 6, back);
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: 960 - 125, top: 270, transform: `scale(${Math.max(0, heroS)})`, opacity: heroS > 0 ? 1 : 0 }}>
        <Bot kind="hero" size={250} gaze={{ x: Math.sin(frame / 18) * 0.5, y: 0.5 }} blink={blinkTrack(frame, [t(646), t(650), t(690), t(740)])} />
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 455, height: 100, background: "#FDFDFD" }} />
      {second ? <Pill icon="integrations/google-docs.svg" text={MSG2} typed={MSG2.length} at={-10} caret={false} grey={grey} /> : <Pill icon="integrations/slack.svg" text={MSG1} typed={typed1} at={1} caret={frame < t(662)} grey={grey} />}
      {frame < t(680) ? (
        <div style={{ position: "absolute", left: 0, right: 0, top: ROW_Y, height: 90 }}>
          {MODELS.map((m, i) => {
            const s = clamp(frame, t(632) + i * 2, t(638) + i * 2, back) * pulses[i];
            return (
              <div key={m.key} style={{ position: "absolute", left: ICON_X[i] - 34, top: 11, transform: `scale(${Math.max(0, s)})`, opacity: s > 0 ? 1 : 0 }}>
                <Mark icon={m.icon} size={68} />
              </div>
            );
          })}
        </div>
      ) : null}
      {frame >= t(680) ? <RouteRow active={2} label="Routing to Grok 4…" at={t(680)} slideOut={t(724)} /> : null}
      {frame >= t(722) ? <RouteRow active={0} label="Routing to GPT-5…" at={t(730)} slideIn={t(724)} /> : null}
    </AbsoluteFill>
  );
};

const plateFor = (price: number) => {
  const stops = [
    { p: 4.6, bg: "#FFD9D6", ink: "#D6362B" },
    { p: 3.2, bg: "#FFE3D3", ink: "#E8611F" },
    { p: 2.5, bg: "#FFF1C2", ink: "#C99A00" },
    { p: 0.4, bg: "#D9F7E3", ink: "#1FA84B" },
  ];
  let a = stops[0];
  let bb = stops[stops.length - 1];
  for (let i = 0; i < stops.length - 1; i++) {
    if (price <= stops[i].p && price >= stops[i + 1].p) {
      a = stops[i];
      bb = stops[i + 1];
      break;
    }
  }
  const tt = a === bb ? 1 : (a.p - price) / (a.p - bb.p);
  return { bg: mix(a.bg, bb.bg, tt), ink: mix(a.ink, bb.ink, tt) };
};

export const LadderScene: React.FC = () => {
  const frame = useCurrentFrame();
  const b = CUT.ladder;
  const t = (f: number) => r(f) - b;
  let price = 4.56;
  let model = 1;
  if (frame >= t(780)) price = sample(LADDER_OPUS, frame, t(780));
  if (frame >= t(792)) model = 0;
  if (frame >= t(803)) price = sample(LADDER_GPT, frame, t(803));
  if (frame >= t(825)) model = 2;
  if (frame >= t(834)) price = sample(LADDER_GROK, frame, t(834));
  if (frame >= t(846)) {
    model = 3;
    price = 0.48;
  }
  const swapAt = [t(792), t(825), t(846)];
  const fade = swapAt.reduce((m, s) => Math.max(m, frame >= s && frame < s + 4 ? 1 - (frame - s) / 4 : 0), 0);
  const plate = plateFor(price);
  const pop = clamp(frame, 0, 6, back);
  const up = clamp(frame, t(852), t(858));
  const m = MODELS[model];
  return (
    <AbsoluteFill style={{ fontFamily: SANS }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 540 - 50 - up * 160, display: "flex", justifyContent: "center", alignItems: "center", gap: 26, fontSize: 96, fontWeight: 500, letterSpacing: "-0.02em", transform: `scale(${Math.max(0, pop)})`, opacity: pop > 0 ? 1 : 0 }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 22, opacity: 1 - fade * 0.8 }}>
          <Mark icon={m.icon} size={88} />
          <span style={{ color: GREY }}>{m.name}</span>
        </span>
        <span style={{ background: plate.bg, color: plate.ink, borderRadius: 10, padding: "2px 18px", fontVariantNumeric: "tabular-nums" }}>${price.toFixed(2)}</span>
      </div>
      <Headline y={680} size={92} lines={[{ at: t(854), words: [{ text: "bringing" }, { text: "your" }, { text: "cost" }, { text: "per" }, { text: "task" }] }, { at: t(857), words: [{ text: "all" }, { text: "the" }, { text: "way" }, { text: "down" }] }]} />
    </AbsoluteFill>
  );
};
