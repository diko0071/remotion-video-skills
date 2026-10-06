import React from "react";
import { Img } from "remotion";
import { SCREEN } from "./geometry";
import { ArrowUpIcon, ChevronLeftIcon } from "./icons";
import { REPLY_TEXT, USER_TEXT } from "./story";
import { asset, IOS } from "./theme";
import { clamp01, pop, T } from "./timeline";
import { Touch } from "./touch";

const HEADER_H = 138;
const INPUT = { top: SCREEN.h - 104, h: 40, left: 56 } as const;
const THREAD_BOTTOM = INPUT.top - 14;
const GAP = 8;
const TYPE_SPEED = 1.4;
const BUBBLE_W = 280;

type Item = { id: string; side: "left" | "right" | "center"; text: string; h: number; at: number };

const ITEMS: Item[] = [
  { id: "day", side: "center", text: "Today 2:41 PM", h: 20, at: -999 },
  { id: "old", side: "left", text: "Paused Retargeting. Spend is back to normal.", h: 68, at: -999 },
  { id: "user", side: "right", text: USER_TEXT, h: 68, at: T.send + 1 },
  { id: "reply", side: "left", text: REPLY_TEXT, h: 44, at: T.dots },
];

export const sendCenter = { x: SCREEN.w - 30, y: INPUT.top + INPUT.h / 2 };

const Dots: React.FC<{ f: number }> = ({ f }) => (
  <span style={{ display: "inline-flex", gap: 5, alignItems: "center", height: 24 }}>
    {[0, 1, 2].map((i) => (
      <span key={i} style={{ width: 8, height: 8, borderRadius: 8, background: "#8E8E93", opacity: 0.35 + 0.65 * Math.max(0, Math.sin(f / 3 - i * 0.9)) }} />
    ))}
  </span>
);

const Bubble: React.FC<{ item: Item; f: number; bottom: number; p: number }> = ({ item, f, bottom, p }) => {
  if (p <= 0.001) return null;
  if (item.side === "center") {
    return (
      <div style={{ position: "absolute", left: 0, right: 0, top: bottom - item.h, textAlign: "center", fontSize: 12, fontWeight: 600, color: IOS.secondary }}>
        {item.text}
      </div>
    );
  }
  const right = item.side === "right";
  const showDots = item.id === "reply" && f < T.reply;
  const swap = item.id === "reply" ? clamp01((f - T.reply) / 4) : 1;
  return (
    <div
      style={{
        position: "absolute",
        top: bottom - item.h,
        [right ? "right" : "left"]: 12,
        maxWidth: BUBBLE_W,
        height: item.h,
        padding: "10px 14px",
        borderRadius: 20,
        background: right ? IOS.blue : IOS.bubble,
        color: right ? "#fff" : IOS.label,
        fontSize: 18,
        lineHeight: "24px",
        opacity: clamp01(p * 2),
        transform: `scale(${0.85 + 0.15 * p})`,
        transformOrigin: right ? "100% 100%" : "0% 100%",
      }}
    >
      {showDots ? <Dots f={f} /> : <span style={{ opacity: item.id === "reply" ? swap : 1 }}>{item.text}</span>}
    </div>
  );
};

export const MessagesScreen: React.FC<{ f: number }> = ({ f }) => {
  const ps = ITEMS.map((it) => (it.at < 0 ? 1 : pop(f, it.at, 16, 220)));
  const bottoms = ITEMS.map((_, i) => THREAD_BOTTOM - ITEMS.slice(i + 1).reduce((acc, it, k) => acc + (it.h + GAP) * ps[i + 1 + k], 0));
  const typedLen = f >= T.send ? 0 : Math.max(0, Math.floor((f - T.typeStart) * TYPE_SPEED));
  const typed = USER_TEXT.slice(0, typedLen);
  const hasText = typed.length > 0;
  return (
    <div style={{ position: "absolute", inset: 0, background: "#fff" }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: HEADER_H, bottom: SCREEN.h - INPUT.top + 6, overflow: "hidden" }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: -HEADER_H, height: SCREEN.h }}>
          {ITEMS.map((it, i) => (
            <Bubble key={it.id} item={it} f={f} bottom={bottoms[i]} p={ps[i]} />
          ))}
        </div>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: HEADER_H, background: "rgba(249,249,249,0.96)", borderBottom: `1px solid ${IOS.separator}` }}>
        <div style={{ position: "absolute", left: 10, top: 74 }}>
          <ChevronLeftIcon size={28} />
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 58, display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
          <div style={{ width: 50, height: 50, borderRadius: 50, background: "#fff", border: `1px solid ${IOS.separator}`, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
            <Img src={asset("instinct-icon.png")} style={{ width: 40, height: 40 }} />
          </div>
          <span style={{ fontSize: 13, fontWeight: 500, color: IOS.label }}>Instinct</span>
        </div>
      </div>
      <div style={{ position: "absolute", left: 12, top: INPUT.top + 2, width: 36, height: 36, borderRadius: 36, background: IOS.grouped, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, color: IOS.secondary, fontWeight: 400 }}>
        +
      </div>
      <div
        style={{
          position: "absolute",
          left: INPUT.left,
          right: 14,
          top: INPUT.top,
          height: INPUT.h,
          borderRadius: INPUT.h / 2,
          border: `1px solid ${IOS.separator}`,
          display: "flex",
          alignItems: "center",
          padding: "0 44px 0 14px",
          fontSize: 15,
          color: hasText ? IOS.label : "#b0b0b5",
          whiteSpace: "nowrap",
          overflow: "hidden",
        }}
      >
        {hasText ? typed : "iMessage"}
      </div>
      {hasText ? (
        <div
          style={{
            position: "absolute",
            left: sendCenter.x - 15,
            top: sendCenter.y - 15,
            width: 30,
            height: 30,
            borderRadius: 30,
            background: IOS.blue,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ArrowUpIcon size={18} />
        </div>
      ) : null}
      <div style={{ position: "absolute", left: (SCREEN.w - 134) / 2, top: SCREEN.h - 16, width: 134, height: 5, borderRadius: 5, background: "#111" }} />
      <Touch f={f} at={T.send} x={sendCenter.x} y={sendCenter.y} />
    </div>
  );
};

export const IslandActivity: React.FC<{ f: number }> = ({ f }) => {
  const connected = f >= T.pickup;
  const secs = Math.max(0, Math.floor((f - T.pickup) / 30));
  return (
    <div style={{ display: "flex", alignItems: "center", height: "100%", padding: "0 18px 0 14px", gap: 12, color: "#fff" }}>
      <div style={{ width: 52, height: 52, borderRadius: 52, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Img src={asset("instinct-icon.png")} style={{ width: 38, height: 38 }} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#9a9aa0" }}>{connected ? `Instinct · 0:${String(secs).padStart(2, "0")}` : "Instinct"}</div>
        <div style={{ fontSize: 17, fontWeight: 600, whiteSpace: "nowrap" }}>{connected ? "On a call with your agency" : "Calling your agency…"}</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 3, height: 30 }}>
        {[0, 1, 2, 3, 4].map((i) => {
          const h = connected ? 8 + 18 * Math.abs(Math.sin(f / 3.2 + i * 1.3)) : 6;
          return <span key={i} style={{ width: 4, height: h, borderRadius: 3, background: IOS.green }} />;
        })}
      </div>
    </div>
  );
};
