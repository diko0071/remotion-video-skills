import React from "react";
import { Bloub } from "./bloub";
import type { BotAvatar } from "./sidebar";

export const GrokCluster: React.FC<{ avatars: BotAvatar[]; size: number }> = ({ avatars, size }) => {
  const s = Math.round(size * 0.66);
  const [a, b] = avatars;
  return (
    <span style={{ position: "relative", display: "inline-block", width: size, height: size, flexShrink: 0 }}>
      <span style={{ position: "absolute", left: 0, top: 0 }}>
        <Bloub size={s} shape={a.shape} color={a.color} gaze={{ x: -0.4, y: 0.1 }} />
      </span>
      <span style={{ position: "absolute", right: 0, bottom: 0 }}>
        <Bloub size={s} shape={b.shape} color={b.color} gaze={{ x: 0.3, y: -0.1 }} />
      </span>
    </span>
  );
};
