import React from "react";
import { PHONE_COLORS, PHONE_FONT, PHONE_GEOMETRY, PHONE_ISLAND, PhoneGeometry, phoneScreen } from "./geometry";
import { PhoneStatusBar } from "./status-bar";

export const Phone: React.FC<{
  x: number;
  y: number;
  time: string;
  rotate?: number;
  darkStatus?: boolean;
  islandExpand?: number;
  islandContent?: React.ReactNode;
  chrome?: number;
  geometry?: PhoneGeometry;
  zIndex?: number;
  children: React.ReactNode;
}> = ({ x, y, time, rotate = 0, darkStatus = false, islandExpand = 0, islandContent, chrome = 1, geometry = PHONE_GEOMETRY, zIndex = 12, children }) => {
  const screen = phoneScreen(geometry);
  const iw = PHONE_ISLAND.w + (screen.w - 24 - PHONE_ISLAND.w) * islandExpand;
  const ih = PHONE_ISLAND.h + (84 - PHONE_ISLAND.h) * islandExpand;
  const framed = chrome >= 1;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: geometry.w,
        height: geometry.h,
        borderRadius: geometry.r,
        background: framed ? PHONE_COLORS.bezel : `rgba(16,16,18,${chrome})`,
        boxShadow: framed ? "0 0 0 2px #3a3a3e inset" : `0 0 0 2px rgba(58,58,62,${chrome}) inset`,
        transform: `rotate(${rotate}deg)`,
        zIndex,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: geometry.bezel,
          top: geometry.bezel,
          width: screen.w,
          height: screen.h,
          borderRadius: screen.r,
          overflow: "hidden",
          background: "#fff",
          fontFamily: PHONE_FONT,
        }}
      >
        {children}
        <PhoneStatusBar dark={darkStatus} time={time} width={screen.w} opacity={chrome} />
        <div
          style={{
            position: "absolute",
            left: (screen.w - iw) / 2,
            top: PHONE_ISLAND.top,
            width: iw,
            height: ih,
            borderRadius: ih / 2,
            background: "#000",
            zIndex: 6,
            overflow: "hidden",
            opacity: chrome,
          }}
        >
          {islandExpand > 0.6 ? islandContent : null}
        </div>
      </div>
    </div>
  );
};
