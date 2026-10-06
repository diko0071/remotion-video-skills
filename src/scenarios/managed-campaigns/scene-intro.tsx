import React from "react";
import { AbsoluteFill, Easing, Img, useCurrentFrame, useVideoConfig } from "remotion";
import { clamp01, ramp, springAt } from "../../core/motion";
import { AD_GREEN, CARD_SHADOW_SOFT } from "../../kit/ad-objects";
import { C, SANS } from "../../kit/launch";
import { CheckIcon, POP } from "./parts";
import { PLATFORMS } from "./theme";
import { LINE_AT, T } from "./timings";

const WORD = { damping: 15, stiffness: 190, mass: 0.9 };

type Row = { words: readonly string[]; plate?: readonly [number, number]; at: number };

const Word: React.FC<{ text: string; enter: number; exit: number }> = ({ text, enter, exit }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = springAt(f, fps, enter, WORD);
  const out = ramp(f, exit, exit + 7, (x) => x * x);
  return (
    <span
      style={{
        display: "inline-block",
        opacity: clamp01(p * 2) * (1 - out),
        transform: `translateY(${(1 - p) * 0.42 - out * 0.3}em)`,
        filter: `blur(${(1 - clamp01(p)) * 8 + out * 6}px)`,
      }}
    >
      {text}
    </span>
  );
};

export const BigLines: React.FC<{ rows: readonly Row[]; exit: number; size: number; step?: number }> = ({ rows, exit, size, step = 3 }) => {
  const f = useCurrentFrame();
  if (f > exit + 8) return null;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: size * 0.06 }}>
      {rows.map((row, r) => {
        const [p0, p1] = row.plate ?? [-1, -2];
        const plateIn = row.plate ? ramp(f, row.at + p1 * step + 4, row.at + p1 * step + 12, Easing.out(Easing.cubic)) : 0;
        const plateOut = ramp(f, exit, exit + 6);
        return (
          <div key={r} style={{ display: "flex", columnGap: "0.24em", fontSize: size, fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.05, whiteSpace: "nowrap" }}>
            {row.words.map((w, i) => {
              const inPlate = i >= p0 && i <= p1;
              const word = <Word key={i} text={w} enter={row.at + i * step} exit={exit + Math.round(i * 0.6)} />;
              if (!inPlate || i !== p0) return inPlate ? null : word;
              return (
                <span key={i} style={{ position: "relative", display: "inline-flex", columnGap: "0.24em" }}>
                  <span style={{ position: "absolute", left: "-0.1em", top: "0.08em", bottom: "-0.02em", width: `calc((100% + 0.2em) * ${plateIn})`, background: C.brandLight, opacity: 1 - plateOut }} />
                  {row.words.slice(p0, p1 + 1).map((pw, k) => (
                    <span key={k} style={{ position: "relative" }}>
                      <Word text={pw} enter={row.at + (p0 + k) * step} exit={exit + Math.round((p0 + k) * 0.6)} />
                    </span>
                  ))}
                </span>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

const STEPS = [
  { title: "You set the goal", sub: "Budget, platforms, goal" },
  { title: "It sets it up", sub: "History, structure, ads" },
  { title: "It launches", sub: "On its own" },
  { title: "It keeps optimizing", sub: "Checks, pauses, shifts budget" },
] as const;

export const Overview: React.FC<{ from: number; exit?: number; checked?: boolean; title?: boolean }> = ({ from, exit = Infinity, checked = false, title = true }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const head = f < from ? 0 : springAt(f, fps, from, POP);
  const out = Number.isFinite(exit) ? ramp(f, exit, exit + 8, Easing.in(Easing.cubic)) : 0;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 56, opacity: 1 - out, transform: `translateY(${-40 * out}px)` }}>
      {title ? <div style={{ fontSize: 110, fontWeight: 800, letterSpacing: "-0.04em", opacity: clamp01(head * 2), transform: `translateY(${(1 - head) * 30}px)` }}>How it works</div> : null}
      <div style={{ display: "flex", gap: 28 }}>
        {STEPS.map((s, i) => {
          const at = from + 4 + i * 4;
          const tick = checked ? springAt(f, fps, from + 14 + i * 5, POP) : 0;
          const p = f < at ? 0 : springAt(f, fps, at, POP);
          return (
            <div
              key={s.title}
              style={{
                width: 400,
                padding: "34px 34px 38px",
                boxSizing: "border-box",
                borderRadius: 24,
                background: C.white,
                boxShadow: CARD_SHADOW_SOFT,
                opacity: clamp01(p * 2),
                transform: `translateY(${(1 - p) * 50}px) scale(${0.9 + 0.1 * p})`,
              }}
            >
              <div style={{ position: "relative", width: 60, height: 60 }}>
                <div style={{ position: "absolute", inset: 0, borderRadius: 30, background: C.ink, color: C.white, fontSize: 30, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>{i + 1}</div>
                <div style={{ position: "absolute", inset: 0, borderRadius: 30, background: AD_GREEN, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${tick})` }}>
                  <CheckIcon size={36} />
                </div>
              </div>
              <div style={{ fontSize: 42, fontWeight: 800, letterSpacing: "-0.03em", marginTop: 24 }}>{s.title}</div>
              <div style={{ fontSize: 26, fontWeight: 600, color: C.mutedFg, marginTop: 8 }}>{s.sub}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const IntroScene: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (f >= T.step1.at) return null;
  const push = 1 + 0.04 * ramp(f, 0, T.step1.at, Easing.linear);
  const answerExit = T.answer.steps - 6;
  return (
    <AbsoluteFill style={{ fontFamily: SANS, color: C.ink, alignItems: "center", justifyContent: "center", transform: `scale(${push})` }}>
      {f < T.answer.at + 8 ? (
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <BigLines
            size={168}
            exit={T.answer.at - 2}
            rows={[
              { words: ["What", "is"], at: -14 },
              { words: ["Managed", "Campaigns?"], plate: [0, 1], at: -6 },
            ]}
          />
        </AbsoluteFill>
      ) : null}
      {f >= T.answer.at - 2 && f < answerExit + 10 ? (
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 70 }}>
          <BigLines
            size={128}
            exit={answerExit}
            step={4}
            rows={[
              { words: ["An", "AI", "media", "buyer"], plate: [1, 3], at: LINE_AT["01-answer"] },
              { words: ["that", "runs", "your", "ads", "for", "you."], at: T.answer.buyer + 10 },
            ]}
          />
          <div style={{ display: "flex", gap: 22 }}>
            {PLATFORMS.map((p, i) => {
              const at = T.answer.campaigns - 6 + i * 3;
              const s = f < at ? 0 : springAt(f, fps, at, POP);
              const out = ramp(f, answerExit + i, answerExit + i + 7);
              return (
                <div
                  key={p.name}
                  style={{
                    width: 112,
                    height: 112,
                    borderRadius: 24,
                    background: C.white,
                    boxShadow: CARD_SHADOW_SOFT,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: clamp01(s * 2) * (1 - out),
                    transform: `translateY(${(1 - s) * 40 - out * 30}px) scale(${0.7 + 0.3 * s})`,
                  }}
                >
                  <Img src={p.logo} style={{ width: 62, height: 62, objectFit: "contain" }} />
                </div>
              );
            })}
          </div>
        </AbsoluteFill>
      ) : null}
      {f >= T.answer.steps ? (
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <Overview from={T.answer.steps} />
        </AbsoluteFill>
      ) : null}
    </AbsoluteFill>
  );
};
