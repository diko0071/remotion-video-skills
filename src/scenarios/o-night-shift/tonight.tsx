import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { measureText } from "@remotion/layout-utils";
import { clamp01, springAt } from "../../core/motion";
import { Cursor } from "../../kit/cursor";
import { C, SANS } from "../../kit/launch";
import { hopAt, landSquash } from "./bounce";
import { OHero } from "./o-hero";
import { Piece } from "./piece";
import { CARD_SHADOW } from "../../kit/ad-objects";
import { INK_NIGHT, MUTED_NIGHT } from "./theme";
import { TONIGHT } from "./timings";

const ASK = "Watch our marketing tonight?";
const COMPOSER = { x: 760, y: 800, w: 900, h: 116 };
const SEND = { cx: COMPOSER.x + COMPOSER.w - 60, cy: COMPOSER.y + COMPOSER.h / 2, d: 66 };
const O_POS = { x: 330, y: 470, size: 330 };
const BUBBLE_PAD_X = 32;
const askWidth = () => measureText({ text: ASK, fontFamily: SANS, fontSize: 36, fontWeight: "600", letterSpacing: "-0.02em" }).width + BUBBLE_PAD_X * 2;

const Arrow: React.FC = () => (
  <svg width={30} height={30} viewBox="0 0 24 24" fill="none" stroke={C.ink} strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 19V5" />
    <path d="M5 12l7-7 7 7" />
  </svg>
);

const Composer: React.FC<{ f: number }> = ({ f }) => {
  const { fps } = useVideoConfig();
  const sent = f >= TONIGHT.send + 1;
  const n = sent ? 0 : Math.max(0, Math.min(ASK.length, Math.floor((f - TONIGHT.typeFrom) * TONIGHT.charsPerFrame)));
  const typing = !sent && f >= TONIGHT.typeFrom;
  const caret = typing && (n < ASK.length || Math.floor(f / 8) % 2 === 0);
  const press = springAt(f, fps, TONIGHT.send - 1, { damping: 12, stiffness: 260, mass: 0.5 });
  const pressDip = f >= TONIGHT.send - 1 && f < TONIGHT.send + 8 ? 1 - 0.12 * Math.sin(Math.PI * clamp01((f - TONIGHT.send + 1) / 8)) : 1;
  return (
    <div
      style={{
        position: "absolute",
        left: COMPOSER.x,
        top: COMPOSER.y,
        width: COMPOSER.w,
        height: COMPOSER.h,
        boxSizing: "border-box",
        borderRadius: 30,
        background: "rgba(255,255,255,0.08)",
        border: "1.5px solid rgba(255,255,255,0.16)",
        display: "flex",
        alignItems: "center",
        padding: "0 36px",
        fontFamily: SANS,
        fontSize: 34,
        fontWeight: 500,
        letterSpacing: "-0.01em",
      }}
    >
      {n === 0 ? <span style={{ color: MUTED_NIGHT }}>{typing ? "" : "Message your dot"}</span> : <span style={{ color: INK_NIGHT }}>{ASK.slice(0, n)}</span>}
      <span style={{ display: "inline-block", width: 3, height: 38, marginLeft: 3, background: INK_NIGHT, opacity: caret ? 1 : 0 }} />
      <div
        style={{
          position: "absolute",
          left: SEND.cx - COMPOSER.x - SEND.d / 2,
          top: (COMPOSER.h - SEND.d) / 2,
          width: SEND.d,
          height: SEND.d,
          borderRadius: SEND.d / 2,
          background: n > 0 || f < TONIGHT.send + 4 ? C.white : "rgba(255,255,255,0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${pressDip})`,
          boxShadow: `0 0 ${24 * clamp01(press)}px rgba(255,255,255,${0.35 * (1 - clamp01(press))})`,
        }}
      >
        <Arrow />
      </div>
    </div>
  );
};

export const Tonight: React.FC = () => {
  const f = useCurrentFrame();
  const hop = hopAt(f, TONIGHT.oHappy, 70, 16);
  const squash = landSquash(f, TONIGHT.oHappy + 16, 0.14) + Math.sin(f * 0.18) * 0.012;
  const gaze = f < TONIGHT.userBubble ? { x: 0.9, y: 0.45 } : { x: 0.8, y: -0.1 };
  return (
    <>
      <div style={{ position: "absolute", left: O_POS.x, top: O_POS.y + hop }}>
        <OHero
          f={f}
          size={O_POS.size}
          track={[{ at: -99, eyes: "star" }, { at: TONIGHT.oHappy, eyes: "happy" }]}
          gaze={gaze}
          blinks={TONIGHT.blinks}
          squash={squash}
        />
      </div>
      <Composer f={f} />
      <Piece id="ns-t-ask" at={TONIGHT.userBubble} x={COMPOSER.x + COMPOSER.w - askWidth()} y={540} z={6} rise={70}>
        <div
          style={{
            padding: `22px ${BUBBLE_PAD_X}px 24px`,
            borderRadius: 28,
            background: "rgba(255,255,255,0.14)",
            color: INK_NIGHT,
            fontFamily: SANS,
            fontSize: 36,
            fontWeight: 600,
            letterSpacing: "-0.02em",
            whiteSpace: "nowrap",
          }}
        >
          {ASK}
        </div>
      </Piece>
      <Piece id="ns-t-reply" at={TONIGHT.oReply} x={COMPOSER.x} y={664} z={6} rise={40}>
        <div
          style={{
            padding: "22px 32px 24px",
            borderRadius: 28,
            background: C.white,
            boxShadow: CARD_SHADOW,
            color: C.ink,
            fontFamily: SANS,
            fontSize: 36,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            whiteSpace: "nowrap",
          }}
        >
          On it. Get some sleep.
        </div>
      </Piece>
      <Cursor
        stops={[
          { x: 1780, y: 1010, at: 0 },
          { x: SEND.cx - 4, y: SEND.cy - 2, at: TONIGHT.send - 4 },
          { x: SEND.cx - 4, y: SEND.cy - 2, at: TONIGHT.send, click: true },
          { x: 1720, y: 990, at: TONIGHT.send + 30 },
        ]}
        scale={1.25}
      />
    </>
  );
};
