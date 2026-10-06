import React from "react";
import { Easing, useCurrentFrame } from "remotion";
import { ramp } from "../../core/motion";
import type { GridTile } from "./assets";
import { INTER } from "./font";
import { COMPOSE, GREEN, INK, PROMPT_TEXT, SCRIPT_TEXT } from "./timings";

export type Rect = { x: number; y: number; w: number; h: number };

export const cardRect = (frame: number): Rect => {
  const keys = COMPOSE.card;
  if (frame <= keys[0].at) return keys[0];
  for (let i = 1; i < keys.length; i++) {
    if (frame <= keys[i].at) {
      const a = keys[i - 1];
      const b = keys[i];
      const p = ramp(frame, a.at, b.at, Easing.inOut(Easing.cubic));
      return { x: a.x + (b.x - a.x) * p, y: a.y + (b.y - a.y) * p, w: a.w + (b.w - a.w) * p, h: a.h + (b.h - a.h) * p };
    }
  }
  return keys[keys.length - 1];
};

export const slotRect = (card: Rect, i: number): Rect => {
  const { size, gap, inset } = COMPOSE.slots;
  return { x: card.x + inset + i * (size + gap), y: card.y + card.h - inset - size, w: size, h: size };
};

export const arrowRect = (card: Rect): Rect => {
  const { size, inset } = COMPOSE.arrow;
  return { x: card.x + card.w - inset - size, y: card.y + card.h - inset - 12 - size, w: size, h: size };
};

export const generateRect = (card: Rect): Rect => {
  const { pillW, pillH } = COMPOSE.generate;
  return { x: card.x + card.w - 50 - pillW, y: card.y + card.h - 51 - pillH, w: pillW, h: pillH };
};

const typedPrompt = (frame: number) => {
  const t = COMPOSE.promptTyping;
  const n = Math.min(PROMPT_TEXT.length, Math.floor(t.charsAt478 + (frame - t.from) * t.cps));
  return PROMPT_TEXT.slice(0, Math.max(0, n));
};

const Stream: React.FC<{ frame: number }> = ({ frame }) => {
  const words = SCRIPT_TEXT.split(" ");
  const { streamFrom, streamTo } = COMPOSE.script;
  const per = (streamTo - streamFrom) / words.length;
  return (
    <span>
      {words.map((w, i) => {
        const at = streamFrom + i * per;
        const o = ramp(frame, at, at + 6);
        return (
          <span key={i} style={{ opacity: o, color: o < 1 ? `rgba(18,18,18,${0.3 + 0.7 * o})` : INK }}>
            {w}{" "}
          </span>
        );
      })}
    </span>
  );
};

export const Sparkle: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 2 C12.8 8 16 11.2 22 12 C16 12.8 12.8 16 12 22 C11.2 16 8 12.8 2 12 C8 11.2 11.2 8 12 2 Z" fill={INK} />
  </svg>
);

const Refresh: React.FC = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={INK} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 11a8 8 0 0 0-14.5-4.5L4 8" />
    <path d="M4 3v5h5" />
    <path d="M4 13a8 8 0 0 0 14.5 4.5L20 16" />
    <path d="M20 21v-5h-5" />
  </svg>
);

export const ComposeCard: React.FC<{ chips: readonly (GridTile | null)[]; renderTile: (t: GridTile) => React.ReactNode }> = ({ chips, renderTile }) => {
  const frame = useCurrentFrame();
  const r = cardRect(frame);
  const phase = frame < COMPOSE.pick.from ? "prompt" : frame < COMPOSE.script.from ? "pick" : "script";
  const big = frame < COMPOSE.card[4].at;
  const fontSize = phase === "script" ? 44 : big ? 50 : 34;
  const pad = phase === "script" ? 104 : big ? 92 : 34;
  const label = frame < COMPOSE.labelUntil;
  const scriptIn = ramp(frame, COMPOSE.script.from, COMPOSE.script.from + 6);
  const promptOut = 1 - scriptIn;
  return (
    <div style={{ position: "absolute", left: r.x, top: r.y, width: r.w, height: r.h, background: "#fff", borderRadius: phase === "script" ? 36 : 30, overflow: "hidden", fontFamily: INTER, color: INK }}>
      {label && (
        <div style={{ position: "absolute", left: 0, right: 0, top: 58, textAlign: "center", fontSize: 24, fontWeight: 800, letterSpacing: "0.02em" }}>PROMPT</div>
      )}
      <div style={{ position: "absolute", left: pad, right: pad, top: label ? 140 : big ? 70 : 42, fontSize, lineHeight: 1.36, letterSpacing: "-0.01em", opacity: promptOut }}>
        {phase === "prompt" ? typedPrompt(frame) : PROMPT_TEXT}
      </div>
      {phase === "script" && (
        <div style={{ position: "absolute", left: pad, right: pad, top: 66, fontSize, lineHeight: 1.5, letterSpacing: "-0.01em", opacity: scriptIn }}>
          <Stream frame={frame} />
        </div>
      )}
      {phase === "pick" && (
        <>
          {chips.map((c, i) => {
            const s = slotRect(r, i);
            return (
              <div key={i} style={{ position: "absolute", left: s.x - r.x, top: s.y - r.y, width: s.w, height: s.h, borderRadius: 18, background: "#EFEFEF", overflow: "hidden" }}>
                {c && renderTile(c)}
              </div>
            );
          })}
          {(() => {
            const a = arrowRect(r);
            return (
              <div style={{ position: "absolute", left: a.x - r.x, top: a.y - r.y, width: a.w, height: a.h, borderRadius: 999, background: GREEN, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={INK} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12h15" />
                  <path d="M13 6l6 6-6 6" />
                </svg>
              </div>
            );
          })()}
        </>
      )}
      {phase === "script" && frame >= COMPOSE.script.buttonsAt && (
        <>
          <div style={{ position: "absolute", left: 107, bottom: 73, height: 120, padding: "0 44px 0 40px", borderRadius: 999, background: "#F2F2F2", display: "flex", alignItems: "center", gap: 22, fontSize: 40, fontWeight: 500 }}>
            <Refresh />
            Regenerate
          </div>
          {(() => {
            const g = generateRect(r);
            return (
              <div style={{ position: "absolute", left: g.x - r.x, top: g.y - r.y, width: g.w, height: g.h, borderRadius: 999, background: GREEN, display: "flex", alignItems: "center", justifyContent: "center", gap: 18, fontSize: 40, fontWeight: 500 }}>
                <Sparkle size={34} />
                Generate
              </div>
            );
          })()}
        </>
      )}
    </div>
  );
};
