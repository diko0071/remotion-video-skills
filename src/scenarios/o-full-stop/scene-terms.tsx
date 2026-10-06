import React from "react";
import { Easing, Img, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { clamp01, springAt } from "../../core/motion";
import { AD_GREEN, AD_RED, Card, CARD_SHADOW_SOFT, TermRow } from "../../kit/ad-objects";
import { C, SANS } from "../../kit/launch";
import { CARD, ROW, TERM_ROWS, TERMS_CARD, TERMS_PILL_Y, WASTED, wastedNumber } from "./stage";
import { BASELINE } from "./theme";
import { TERMS } from "./timings";

const LOGO = staticFile("integrations/google-ads.webp");
const ENTER = { damping: 14, stiffness: 160, mass: 0.8 };
const ROW_SCALE = 1.4;
const eio = Easing.inOut(Easing.cubic);

const kickAt = (k: number) => TERMS.rows[k] + TERMS.kick;

const shiftAt = (f: number, k: number) => {
  let s = 0;
  for (let j = 0; j < k; j++) s += eio(clamp01((f - kickAt(j) - 1) / 6));
  return s;
};

const Row: React.FC<{ k: number; f: number }> = ({ k, f }) => {
  const t = TERMS.rows[k];
  const strike = clamp01((f - t) / TERMS.skate);
  const tag = clamp01((f - t - 4) / 4);
  const kicked = f - kickAt(k);
  const y = ROW.top + (k - shiftAt(f, k)) * ROW.h;
  const fly = kicked > 0 ? kicked : 0;
  const dx = 30 * Math.pow(fly, 1.45);
  const dy = fly > 0 ? -7 * fly + 0.9 * fly * fly : 0;
  const rot = 1.6 * Math.pow(fly, 1.3);
  const fade = 1 - clamp01((kicked - 7) / 7);
  if (fade <= 0) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: TERMS_CARD.x + 40,
        top: y,
        width: (CARD.w - 80) / ROW_SCALE,
        transform: `translate(${dx}px, ${dy}px) rotate(${rot}deg) scale(${ROW_SCALE})`,
        transformOrigin: "0 0",
        opacity: fade,
        fontFamily: SANS,
        color: C.ink,
      }}
    >
      <TermRow term={TERM_ROWS[k].term} spend={TERM_ROWS[k].spend} strike={strike} tag={tag} last={false} />
    </div>
  );
};

export const TermsScene: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = springAt(f, fps, TERMS.enter, ENTER);
  const kicks = TERMS.rows.filter((_, k) => f >= kickAt(k)).length;
  const lastKick = kicks > 0 ? kickAt(kicks - 1) : -99;
  const d = f - lastKick;
  const press = d >= 0 && d < 12 ? 0.18 * Math.exp(-d / 2.6) : 0;
  const good = kicks >= TERMS.rows.length;
  const num = wastedNumber(kicks);
  const pill = springAt(f, fps, TERMS.pill, { damping: 12, stiffness: 190, mass: 0.7 });
  return (
    <div style={{ position: "absolute", left: 0, top: 0, width: 1, height: 1, opacity: clamp01(enter * 2), transform: `translateY(${(1 - enter) * 80}px)` }}>
      <div style={{ position: "absolute", left: TERMS_CARD.x, top: TERMS_CARD.y }}>
        <Card w={CARD.w} h={TERMS_CARD.h} pad="0" shadow={CARD_SHADOW_SOFT}>
          <div style={{ position: "relative", width: CARD.w, height: TERMS_CARD.h }}>
            <Img src={LOGO} style={{ position: "absolute", left: 40, top: 40, width: 52, height: 52, objectFit: "contain" }} />
            <span style={{ position: "absolute", left: 108, top: 34, fontSize: 36, fontWeight: 800, letterSpacing: "-0.025em" }}>Search terms</span>
            <span style={{ position: "absolute", left: 108, top: 80, fontSize: 24, fontWeight: 600, color: C.mutedFg }}>Google Ads · spending with 0 sales</span>
          </div>
        </Card>
      </div>
      {TERM_ROWS.map((_, k) => (
        <Row key={k} k={k} f={f} />
      ))}
      <div
        style={{
          position: "absolute",
          left: TERMS_CARD.x + CARD.w / 2,
          top: TERMS_PILL_Y,
          transform: `translate(-50%, -50%) scale(${0.6 + 0.4 * pill})`,
          opacity: clamp01(pill * 2),
          padding: "14px 30px 18px",
          borderRadius: 14,
          background: AD_GREEN,
          color: C.white,
          fontFamily: SANS,
          fontSize: 36,
          fontWeight: 800,
          letterSpacing: "-0.02em",
          whiteSpace: "nowrap",
        }}
      >
        14 negative keywords added
      </div>
      <span
        style={{
          position: "absolute",
          left: num.left,
          top: num.baseline - BASELINE * num.size,
          width: num.w,
          textAlign: "right",
          fontFamily: SANS,
          fontWeight: 800,
          fontSize: num.size,
          lineHeight: 1.08,
          letterSpacing: "-0.04em",
          fontVariantNumeric: "tabular-nums",
          color: good ? C.ink : AD_RED,
          whiteSpace: "nowrap",
          transform: `scaleY(${1 - press}) scaleX(${1 + press * 0.5})`,
          transformOrigin: "50% 86%",
        }}
      >
        {WASTED[kicks]}
      </span>
    </div>
  );
};
