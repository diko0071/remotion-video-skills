import React from "react";
import { Img } from "remotion";
import { SANS } from "../../kit/launch";
import { Shards } from "./fx";
import { Padlock } from "./icons";
import { DOOR, DOOR_FACE, doorLeft } from "./level";
import { G, INK, LOGOS, META_BLUE } from "./theme";
import { DOOR_T, SMASH } from "./timings";

const SHADOW = "0 36px 70px rgba(15,23,42,0.16), 0 4px 12px rgba(15,23,42,0.08)";
const FIELD_W = DOOR.w - 96;

const Field: React.FC<{ label: string; dots?: boolean }> = ({ label, dots }) => (
  <div
    style={{
      width: FIELD_W,
      height: 72,
      borderRadius: 16,
      border: "2px solid #DADDE1",
      background: "#F7F8FA",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 24px",
      fontSize: 26,
      fontWeight: 600,
      color: "#8A8D91",
      boxSizing: "border-box",
    }}
  >
    {label}
    {dots ? <span style={{ letterSpacing: "0.2em", color: "#BEC3C9" }}>••••••</span> : null}
  </div>
);

export const Door: React.FC<{ f: number }> = ({ f }) => {
  if (f >= SMASH.door) return null;
  const d = f - DOOR_T.splat;
  const rot = d >= 0 && d < 30 ? 2 * Math.exp(-d / 6) * Math.sin(d * 0.95) : 0;
  const j = f - DOOR_T.look;
  const jiggle = j >= 0 && j < 20 ? 14 * Math.exp(-j / 5) * Math.sin(j * 1.5) : 0;
  return (
    <div style={{ position: "absolute", left: doorLeft, top: G - DOOR.h, width: DOOR.w, height: DOOR.h, transform: `rotate(${rot}deg)`, transformOrigin: "50% 100%" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 34,
          background: "#FFFFFF",
          boxShadow: SHADOW,
          fontFamily: SANS,
          color: INK,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 52,
          boxSizing: "border-box",
        }}
      >
        <Img src={LOGOS.meta} style={{ width: 96, height: 64, objectFit: "contain" }} />
        <span style={{ marginTop: 22, fontSize: 36, fontWeight: 800, letterSpacing: "-0.025em" }}>Log in to Ads Manager</span>
        <span style={{ marginTop: 8, fontSize: 23, fontWeight: 600, color: "#65676B" }}>Use your Meta account</span>
        <div style={{ marginTop: 34, display: "flex", flexDirection: "column", gap: 16 }}>
          <Field label="Email or phone" />
          <Field label="Password" dots />
        </div>
        <div
          style={{
            marginTop: 24,
            width: FIELD_W,
            height: 74,
            borderRadius: 16,
            background: META_BLUE,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 29,
            fontWeight: 800,
            color: "#FFFFFF",
          }}
        >
          Log in
        </div>
        <span style={{ marginTop: 20, fontSize: 22, fontWeight: 700, color: META_BLUE }}>Forgot password?</span>
      </div>
      <div
        style={{
          position: "absolute",
          right: -26,
          top: -26,
          width: 92,
          height: 92,
          borderRadius: 46,
          background: "#1C2230",
          boxShadow: "0 12px 26px rgba(15,23,42,0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `rotate(${jiggle}deg)`,
        }}
      >
        <Padlock size={44} color="#FFFFFF" hole="#1C2230" />
      </div>
    </div>
  );
};

export const DoorShards: React.FC<{ f: number }> = ({ f }) => (
  <Shards f={f} at={SMASH.door} rect={{ x: doorLeft, y: G - DOOR.h, w: DOOR.w, h: DOOR.h }} impact={DOOR_FACE} fill="#FFFFFF" stroke="#D9DEE5" cols={5} rows={6} push={-10} life={22} />
);
