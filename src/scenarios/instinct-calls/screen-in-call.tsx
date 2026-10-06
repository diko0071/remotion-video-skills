import React from "react";
import { Img } from "remotion";
import { SCREEN } from "./geometry";
import { HandsetIcon, KeypadIcon, MicOffIcon, SpeakerIcon } from "./icons";
import { CALLER, CAPTION } from "./story";
import { asset, IOS } from "./theme";
import { clamp01, FPS, pop, T } from "./timeline";
import { Touch } from "./touch";

const WORDS = CAPTION.split(" ");
const WORD_STEP = 2.2;
const END = { size: 72, y: SCREEN.h - 150 } as const;

export const endCallCenter = { x: SCREEN.w / 2, y: END.y + END.size / 2 };

const Round: React.FC<{ icon: React.ReactNode; label: string }> = ({ icon, label }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, width: 92 }}>
    <div
      style={{
        width: 70,
        height: 70,
        borderRadius: 70,
        background: "rgba(60,60,67,0.12)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {icon}
    </div>
    <span style={{ fontSize: 13, fontWeight: 500, color: IOS.label }}>{label}</span>
  </div>
);

export const InCallScreen: React.FC<{ f: number }> = ({ f }) => {
  const secs = Math.max(0, Math.floor((f - T.answer) / FPS));
  const card = pop(f, T.answer + 2, 16, 200);
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <Img src={asset("instinct-poster.jpg")} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 62%" }} />
      <div style={{ position: "absolute", inset: 0, background: "rgba(253,250,243,0.92)" }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 84, textAlign: "center", color: IOS.label }}>
        <div style={{ fontSize: 38, fontWeight: 600, letterSpacing: "-0.02em" }}>{CALLER.name}</div>
        <div style={{ marginTop: 6, fontSize: 19, fontWeight: 500, color: IOS.secondary, fontVariantNumeric: "tabular-nums" }}>
          {`00:${String(secs).padStart(2, "0")}`}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 18,
          right: 18,
          top: 196,
          padding: "18px 20px 22px",
          borderRadius: 24,
          background: "#fff",
          opacity: clamp01(card * 2),
          transform: `translateY(${(1 - card) * 20}px)`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 600, color: IOS.secondary }}>
          <span style={{ width: 8, height: 8, borderRadius: 8, background: IOS.red }} />
          Live captions
        </div>
        <div style={{ marginTop: 10, fontSize: 25, fontWeight: 500, lineHeight: 1.32, color: IOS.label, letterSpacing: "-0.01em" }}>
          {WORDS.map((w, i) => {
            const at = T.caption + i * WORD_STEP;
            const p = clamp01((f - at) / 4);
            return (
              <span key={i} style={{ opacity: p }}>
                {w}{" "}
              </span>
            );
          })}
        </div>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: SCREEN.h - 290, display: "flex", justifyContent: "center", gap: 18 }}>
        <Round icon={<MicOffIcon size={28} color={IOS.label} />} label="mute" />
        <Round icon={<KeypadIcon size={26} color={IOS.label} />} label="keypad" />
        <Round icon={<SpeakerIcon size={28} color={IOS.label} />} label="speaker" />
      </div>
      <div
        style={{
          position: "absolute",
          left: (SCREEN.w - END.size) / 2,
          top: END.y,
          width: END.size,
          height: END.size,
          borderRadius: END.size,
          background: IOS.red,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <HandsetIcon size={34} down />
      </div>
      <Touch f={f} at={T.endTap} x={endCallCenter.x} y={endCallCenter.y} />
    </div>
  );
};
