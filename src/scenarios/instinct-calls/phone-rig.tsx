import React from "react";
import { useCurrentFrame } from "remotion";
import { buzz, phoneRect } from "./geometry";
import { Phone } from "../../kit/phone";
import { InCallScreen } from "./screen-in-call";
import { IncomingScreen } from "./screen-incoming";
import { LockScreen } from "./screen-lock";
import { IslandActivity, MessagesScreen } from "./screen-messages";
import { clamp01, glide, T } from "./timeline";

const Layer: React.FC<{ opacity: number; children: React.ReactNode }> = ({ opacity, children }) =>
  opacity <= 0 ? null : <div style={{ position: "absolute", inset: 0, opacity }}>{children}</div>;

export const PhoneRig: React.FC = () => {
  const f = useCurrentFrame();
  const r = phoneRect(f);
  const b = buzz(f);
  const float = Math.sin(f / 26) * 0.6;
  const island = glide(f, T.island, 150) * (1 - glide(f, T.hangup, 150));
  const inCall = clamp01((f - T.answer) / 5);
  const msgs = clamp01((f - T.msgs) / 6);
  const lock = f >= T.sleep ? 1 : 0;
  return (
    <div style={{ position: "absolute", inset: 0, transform: `translateX(${b * 3}px)` }}>
      <Phone
        x={r.x}
        y={r.y}
        rotate={b * 2.4 + float}
        darkStatus={lock > 0}
        time={lock > 0 ? "" : "2:41"}
        islandExpand={island}
        islandContent={<IslandActivity f={f} />}
      >
        <Layer opacity={f < T.msgs + 6 ? 1 - inCall : 0}>
          <IncomingScreen f={f} />
        </Layer>
        <Layer opacity={f >= T.answer && f < T.sleep ? inCall * (1 - msgs) : 0}>
          <InCallScreen f={f} />
        </Layer>
        <Layer opacity={f >= T.msgs && f < T.sleep ? msgs : 0}>
          <MessagesScreen f={f} />
        </Layer>
        <Layer opacity={lock}>
          <LockScreen f={f} />
        </Layer>
      </Phone>
    </div>
  );
};
