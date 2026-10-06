import React from "react";
import { Easing, Img, useCurrentFrame } from "remotion";
import { ramp } from "../../core/motion";
import { C, SANS } from "../../kit/launch";
import { PixelWipe } from "../../kit/pixel-wipe";
import { HANDSET, PANEL, PHONE, phoneRect } from "./geometry";
import { AGENCY_TEXT, ASK_TEXT } from "./story";
import { asset } from "./theme";
import { clamp01, pop, T } from "./timeline";

const AGENCY_WORDS = AGENCY_TEXT.split(" ");

const Speech: React.FC<{ x: number; y: number; at: number; tone: "gold" | "white"; avatar?: string; children: React.ReactNode; maxW: number; hide: number }> = ({
  x,
  y,
  at,
  tone,
  avatar,
  children,
  maxW,
  hide,
}) => {
  const f = useCurrentFrame();
  const p = pop(f, at, 14, 190);
  if (f < at - 1 || hide >= 1) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        maxWidth: maxW,
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        padding: "14px 20px 16px",
        borderRadius: 18,
        background: tone === "gold" ? C.brandLight : C.white,
        border: tone === "white" ? `1.5px solid ${C.border}` : "none",
        fontFamily: SANS,
        fontSize: 28,
        fontWeight: 700,
        lineHeight: 1.22,
        letterSpacing: "-0.02em",
        color: C.ink,
        opacity: clamp01(p * 2) * (1 - hide),
        transform: `translateY(${(1 - p) * 16}px) scale(${0.9 + 0.1 * p})`,
        transformOrigin: "0% 100%",
        zIndex: 9,
      }}
    >
      {avatar ? (
        <div style={{ flexShrink: 0, width: 36, height: 36, borderRadius: 36, background: C.white, display: "flex", alignItems: "center", justifyContent: "center", marginTop: -1 }}>
          <Img src={avatar} style={{ width: 28, height: 28 }} />
        </div>
      ) : null}
      <div>{children}</div>
    </div>
  );
};

export const AgencyScene: React.FC = () => {
  const f = useCurrentFrame();
  const reveal = ramp(f, T.panel, T.panel + 16, Easing.out(Easing.quad));
  const hide = ramp(f, T.hangup, T.hangup + 16, Easing.in(Easing.quad));
  if (f < T.panel || hide >= 1) return null;
  const chip = pop(f, T.panel + 12, 14, 200);
  const r = phoneRect(f);
  const from = { x: r.x + PHONE.w / 2 - 150, y: r.y + 66 };
  const to = { x: PANEL.x + HANDSET.x * PANEL.w, y: PANEL.y + HANDSET.y * PANEL.h };
  const ctrl = { x: (from.x + to.x) / 2, y: Math.min(from.y, to.y) - 170 };
  const d = `M${from.x} ${from.y} Q${ctrl.x} ${ctrl.y} ${to.x} ${to.y}`;
  const draw = ramp(f, T.arc, T.arc + 14, Easing.out(Easing.cubic));
  const ringing = f >= T.arc + 12 && f < T.pickup + 4;
  return (
    <>
      <div style={{ position: "absolute", left: PANEL.x, top: PANEL.y, zIndex: 3 }}>
        <PixelWipe src={asset("agency.png")} w={PANEL.w} h={PANEL.h} reveal={reveal} hide={hide} cover={C.cream} seed="agency" />
        <div
          style={{
            position: "absolute",
            left: 22,
            top: 22,
            padding: "7px 14px 9px",
            borderRadius: 8,
            background: C.primary,
            color: C.white,
            fontFamily: SANS,
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: "-0.01em",
            opacity: clamp01(chip * 2) * (1 - hide),
            transform: `scale(${0.85 + 0.15 * clamp01(chip)})`,
            transformOrigin: "0 0",
          }}
        >
          Your agency
        </div>
      </div>
      {f >= T.arc ? (
        <svg width={1920} height={1080} style={{ position: "absolute", left: 0, top: 0, overflow: "visible", zIndex: 11, opacity: 1 - hide }}>
          <defs>
            <mask id="agency-call-reveal">
              <path d={d} fill="none" stroke="#fff" strokeWidth={16} pathLength={1} strokeDasharray="1" strokeDashoffset={1 - draw} />
            </mask>
          </defs>
          <path d={d} fill="none" stroke={C.brand} strokeWidth={5} strokeLinecap="round" strokeDasharray="14 12" strokeDashoffset={-f * 2.2} mask="url(#agency-call-reveal)" />
          {ringing
            ? [0, 1].map((k) => {
                const t = ((f - T.arc - 12 + k * 7) % 14) / 14;
                return <circle key={k} cx={to.x} cy={to.y} r={14 + 34 * t} fill="none" stroke={C.brand} strokeWidth={3} opacity={1 - t} />;
              })
            : null}
        </svg>
      ) : null}
      <Speech x={PANEL.x + 214} y={PANEL.y + 34} at={T.ask} tone="gold" avatar={asset("instinct-icon.png")} maxW={400} hide={hide}>
        {ASK_TEXT}
      </Speech>
      <Speech x={PANEL.x + 24} y={PANEL.y + PANEL.h - 128} at={T.talk} tone="white" maxW={592} hide={hide}>
        {AGENCY_WORDS.map((w, i) => (
          <span key={i} style={{ opacity: clamp01((f - T.talk - i * 2.4) / 4) }}>
            {w}{" "}
          </span>
        ))}
      </Speech>
    </>
  );
};
