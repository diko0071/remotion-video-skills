import React from "react";
import { Easing, Img, staticFile, useCurrentFrame } from "remotion";
import { ramp } from "../../core/motion";
import { BRAND_FONT_FAMILY } from "../brand-font";
import { useLaunchFrame } from "./frame";
import { C } from "./tokens";

const SUN_ASPECT = 731 / 714;

export const CornerLockup: React.FC<{ pulseAt?: number }> = ({ pulseAt }) => {
  const f = useCurrentFrame();
  const fr = useLaunchFrame();
  const ease = Easing.inOut(Easing.cubic);
  const hit = pulseAt === undefined ? 0 : Math.max(0, ramp(f, pulseAt, pulseAt + 5, ease) - ramp(f, pulseAt + 5, pulseAt + 19, ease));
  return (
    <div
      style={{
        position: "absolute",
        left: fr.logo.x,
        top: fr.logo.y,
        display: "flex",
        alignItems: "center",
        gap: fr.logo.icon * 0.3,
        fontFamily: BRAND_FONT_FAMILY,
        fontWeight: 700,
        fontSize: fr.logo.text,
        letterSpacing: "-0.02em",
        color: C.ink,
        zIndex: 20,
      }}
    >
      <Img
        src={staticFile("ryze-sun.png")}
        style={{
          width: fr.logo.icon,
          height: fr.logo.icon * SUN_ASPECT,
          transform: `scale(${1 + 0.35 * hit}) rotate(${hit * 40}deg)`,
        }}
      />
      Ryze AI
    </div>
  );
};
