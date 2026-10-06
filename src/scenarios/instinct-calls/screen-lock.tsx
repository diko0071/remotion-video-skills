import React from "react";
import { Img } from "remotion";
import { SCREEN } from "./geometry";
import { MessagesAppIcon } from "./icons";
import { SUMMARY_TEXT } from "./story";
import { asset, IOS } from "./theme";
import { clamp01, pop, T } from "./timeline";

const CARD_TOP = SCREEN.h - 300;

const Corner: React.FC<{ left?: boolean; children: React.ReactNode }> = ({ left, children }) => (
  <div
    style={{
      position: "absolute",
      [left ? "left" : "right"]: 40,
      top: SCREEN.h - 100,
      width: 52,
      height: 52,
      borderRadius: 52,
      background: "rgba(0,0,0,0.3)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    {children}
  </div>
);

export const LockScreen: React.FC<{ f: number }> = ({ f }) => {
  const wake = clamp01((f - T.wake) / 6);
  const card = pop(f, T.banner, 15, 170);
  return (
    <div style={{ position: "absolute", inset: 0, background: "#000" }}>
      <div style={{ position: "absolute", inset: 0, opacity: wake }}>
        <Img src={asset("sky.webp")} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "85% 50%" }} />
        <div style={{ position: "absolute", left: 0, right: 0, top: 96, textAlign: "center", color: "#fff" }}>
          <div style={{ fontSize: 20, fontWeight: 600, opacity: 0.92 }}>Friday, October 2</div>
          <div style={{ fontSize: 104, fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1 }}>2:47</div>
        </div>
        <div
          style={{
            position: "absolute",
            left: 12,
            right: 12,
            top: CARD_TOP,
            padding: "14px 16px 16px",
            borderRadius: 24,
            background: "rgba(255,255,255,0.86)",
            display: "flex",
            gap: 12,
            opacity: clamp01(card * 2),
            transform: `translateY(${(1 - card) * 70}px) scale(${0.94 + 0.06 * card})`,
          }}
        >
          <div style={{ flexShrink: 0 }}>
            <MessagesAppIcon size={40} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span style={{ fontSize: 16, fontWeight: 600, color: IOS.label }}>Instinct</span>
              <span style={{ fontSize: 14, color: "#6c6c70" }}>now</span>
            </div>
            <div style={{ marginTop: 3, fontSize: 17, lineHeight: 1.3, color: IOS.label }}>{SUMMARY_TEXT}</div>
          </div>
        </div>
        <Corner left>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} strokeLinejoin="round">
            <path d="M8 2h8v5l-2 3v11a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V10L8 7z" />
          </svg>
        </Corner>
        <Corner>
          <svg width="24" height="22" viewBox="0 0 24 22" fill="none" stroke="#fff" strokeWidth={2} strokeLinejoin="round">
            <path d="M3 6h4l2-3h6l2 3h4v13H3z" />
            <circle cx="12" cy="12" r="4" />
          </svg>
        </Corner>
        <div style={{ position: "absolute", left: (SCREEN.w - 134) / 2, top: SCREEN.h - 16, width: 134, height: 5, borderRadius: 5, background: "#fff" }} />
      </div>
    </div>
  );
};
