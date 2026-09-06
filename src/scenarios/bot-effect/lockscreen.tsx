import React from "react";
import { Img, staticFile } from "remotion";
import { CARD, PHONE } from "./timings";
import { ROBOTO } from "./fonts";

const INK = "#1d1f1e";
const MUTED = "#4a4d4b";

const Chevron: React.FC = () => (
  <div
    style={{
      position: "absolute",
      right: 30,
      top: (CARD.h - 44) / 2,
      width: 44,
      height: 44,
      borderRadius: 22,
      background: "rgba(20,30,24,0.08)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M4 6.5L9 11.5L14 6.5" stroke={INK} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

export const NotificationCard: React.FC<{
  y: number;
  icon: React.ReactNode;
  title: string;
  age: string;
  lines: string[];
  opacity?: number;
  behind?: boolean;
}> = ({ y, icon, title, age, lines, opacity = 1, behind = false }) => (
  <div
    style={{
      position: "absolute",
      left: CARD.x,
      top: y,
      width: CARD.w,
      height: CARD.h,
      borderRadius: CARD.radius,
      background: "rgba(238,246,240,0.93)",
      boxShadow: "0 6px 18px rgba(0,40,20,0.10)",
      fontFamily: ROBOTO,
      color: INK,
      opacity,
      zIndex: behind ? 0 : 1,
    }}
  >
    <div style={{ position: "absolute", left: 32, top: 40, width: 92, height: 92 }}>{icon}</div>
    <div style={{ position: "absolute", left: 154, top: lines.length > 1 ? 30 : 46, right: 90, lineHeight: "40px" }}>
      <div style={{ fontSize: 30, fontWeight: 500 }}>
        {title}
        <span style={{ fontWeight: 400, color: MUTED, fontSize: 26 }}> · {age}</span>
      </div>
      {lines.map((l) => (
        <div key={l} style={{ fontSize: 29, fontWeight: 400, color: MUTED, whiteSpace: "nowrap" }}>
          {l}
        </div>
      ))}
    </div>
    <Chevron />
  </div>
);

export const GrokIcon: React.FC = () => (
  <Img
    src={staticFile("bot-effect/grok-app-icon.jpg")}
    style={{ width: 92, height: 92, borderRadius: 22, display: "block" }}
  />
);

export const BenjiIcon: React.FC = () => (
  <div style={{ position: "relative", width: 92, height: 92 }}>
    <Img
      src={staticFile("bot-effect/benji.png")}
      style={{ width: 92, height: 92, borderRadius: 46, display: "block", objectFit: "cover" }}
    />
    <div
      style={{
        position: "absolute",
        left: -6,
        bottom: -8,
        width: 40,
        height: 40,
        borderRadius: 11,
        background: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
      }}
    >
      <Img src={staticFile("integrations/slack.svg")} style={{ width: 24, height: 24, display: "block" }} />
    </div>
  </div>
);

const StatusIcons: React.FC = () => (
  <svg width="86" height="26" viewBox="0 0 86 26" fill="#fff" style={{ display: "block" }}>
    <path d="M13 22L1 8.5C4.4 5.8 8.5 4.3 13 4.3s8.6 1.5 12 4.2L13 22z" />
    <path d="M32 22h20L52 4z" />
    <rect x="60" y="4" width="20" height="18" rx="3" />
    <rect x="81" y="10" width="3" height="6" rx="1" />
  </svg>
);

export const LockscreenChrome: React.FC<{ opacity?: number }> = ({ opacity = 1 }) => (
  <div style={{ position: "absolute", left: PHONE.x, top: PHONE.y, width: PHONE.w, height: PHONE.h, fontFamily: ROBOTO, color: "#fff", opacity }}>
    <div style={{ position: "absolute", left: 40, top: 30, fontSize: 26, fontWeight: 400, opacity: 0.95 }}>Starlink</div>
    <div style={{ position: "absolute", left: PHONE.w / 2 - 15, top: 18, width: 30, height: 30, borderRadius: 15, background: "#0a0a0c" }} />
    <div style={{ position: "absolute", right: 38, top: 30 }}>
      <StatusIcons />
    </div>
    <div style={{ position: "absolute", left: 40, top: 148, fontSize: 164, fontWeight: 300, letterSpacing: "-0.01em", lineHeight: 1 }}>9:30</div>
    <div style={{ position: "absolute", left: 40, top: 366, fontSize: 38, fontWeight: 400 }}>Tues Sep 1</div>
    <div style={{ position: "absolute", left: 40, top: 436, fontSize: 30, fontWeight: 400, opacity: 0.86 }}>Good morning, Luke</div>
  </div>
);
