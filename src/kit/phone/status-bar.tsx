import React from "react";
import { PHONE_COLORS, PHONE_FONT, PHONE_STATUS_H } from "./geometry";

export const PhoneStatusBar: React.FC<{ dark: boolean; time: string; width: number; opacity?: number }> = ({ dark, time, width, opacity = 1 }) => {
  const c = dark ? "#fff" : PHONE_COLORS.label;
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width,
        height: PHONE_STATUS_H,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "6px 34px 0 42px",
        fontFamily: PHONE_FONT,
        fontSize: 17,
        fontWeight: 600,
        color: c,
        zIndex: 5,
        opacity,
      }}
    >
      <span>{time}</span>
      <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <svg width="19" height="12" viewBox="0 0 19 12">
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={i * 5} y={9 - i * 3} width="3.4" height={3 + i * 3} rx="1" fill={c} />
          ))}
        </svg>
        <svg width="17" height="12" viewBox="0 0 17 12">
          <path d="M8.5 2.2c2.5 0 4.8 1 6.5 2.6l1.3-1.3C14.2 1.5 11.5.4 8.5.4S2.8 1.5.7 3.5L2 4.8c1.7-1.6 4-2.6 6.5-2.6z" fill={c} />
          <path d="M8.5 5.8c1.5 0 2.9.6 3.9 1.6l1.3-1.3c-1.4-1.3-3.2-2.1-5.2-2.1s-3.8.8-5.2 2.1l1.3 1.3c1-1 2.4-1.6 3.9-1.6z" fill={c} />
          <circle cx="8.5" cy="10" r="1.8" fill={c} />
        </svg>
        <svg width="27" height="13" viewBox="0 0 27 13">
          <rect x="0.5" y="0.5" width="23" height="12" rx="3.6" fill="none" stroke={c} strokeOpacity="0.4" />
          <rect x="2.2" y="2.2" width="17" height="8.6" rx="2" fill={c} />
          <path d="M25 4.4v4.2c.8-.3 1.4-1.1 1.4-2.1S25.8 4.7 25 4.4z" fill={c} fillOpacity="0.45" />
        </svg>
      </span>
    </div>
  );
};
