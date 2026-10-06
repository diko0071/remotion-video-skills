import React from "react";
import { Img } from "remotion";
import { ramp } from "../../core/motion";
import { SCREEN } from "./geometry";
import { HandsetIcon } from "./icons";
import { CALLER } from "./story";
import { asset, IOS } from "./theme";
import { T } from "./timeline";
import { Touch } from "./touch";

const BTN = 76;
const BTN_Y = SCREEN.h - 176;
const BTN_X = { decline: 92, accept: SCREEN.w - 92 } as const;

const CallButton: React.FC<{ cx: number; color: string; label: string; down?: boolean; scale?: number }> = ({ cx, color, label, down, scale = 1 }) => (
  <div style={{ position: "absolute", left: cx - 60, top: BTN_Y, width: 120, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
    <div
      style={{
        width: BTN,
        height: BTN,
        borderRadius: BTN,
        background: color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: `scale(${scale})`,
      }}
    >
      <HandsetIcon size={36} down={down} />
    </div>
    <span style={{ fontSize: 16, fontWeight: 500, color: IOS.label }}>{label}</span>
  </div>
);

export const acceptCenter = { x: BTN_X.accept, y: BTN_Y + BTN / 2 };

export const IncomingScreen: React.FC<{ f: number }> = ({ f }) => {
  const swap = ramp(f, T.spikeLabel, T.spikeLabel + 8);
  const breathe = 1 + 0.06 * Math.max(0, Math.sin(f / 4.5));
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <Img src={asset("instinct-poster.jpg")} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 62%" }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 88, textAlign: "center", color: "#151515" }}>
        <div style={{ fontSize: 50, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.05 }}>{CALLER.name}</div>
        <div style={{ position: "relative", height: 26, marginTop: 10, fontSize: 19, fontWeight: 500 }}>
          <span style={{ position: "absolute", left: 0, right: 0, opacity: 1 - swap, transform: `translateY(${-swap * 10}px)` }}>{CALLER.ring}</span>
          <span style={{ position: "absolute", left: 0, right: 0, opacity: swap, transform: `translateY(${(1 - swap) * 10}px)`, color: "#c0262d", fontWeight: 600 }}>
            {CALLER.spike}
          </span>
        </div>
      </div>
      <CallButton cx={BTN_X.decline} color={IOS.red} label="Decline" down />
      <CallButton cx={BTN_X.accept} color={IOS.green} label="Accept" scale={breathe} />
      <Touch f={f} at={T.tap} x={acceptCenter.x} y={acceptCenter.y} />
    </div>
  );
};
