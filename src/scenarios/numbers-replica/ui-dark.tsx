import React from "react";
import { INTER } from "./font";
import { IconBack, IconBackspace, IconBell, IconDots, IconHome, IconLock, IconMic, IconPhone, IconPlus, IconSearch, IconBubble, IconVideo } from "./icons";
import { OrbitMark } from "./mark";
import { SCREEN_H, SCREEN_W } from "./phone";
import { BLUE, TYPED } from "./timings";

export const NOTICE_Y = 560;
export const KEYPAD_SHEET = { y: SCREEN_H - 470, h: 470 };
export const ENTER_BTN = { y: NOTICE_Y + 62, h: 34 };
export const KEY_ROWS = ["123", "456", "789", ".0<"];
export const KEY = { top: 150, rowH: 58 };

const GREY = "#8E8E93";

const Face: React.FC<{ size: number }> = ({ size }) => (
  <div style={{ width: size, height: size, borderRadius: size / 2, background: "#D9A77C", position: "relative", overflow: "hidden", flexShrink: 0 }}>
    <div style={{ position: "absolute", left: size * 0.3, top: size * 0.18, width: size * 0.4, height: size * 0.4, borderRadius: "50%", background: "#F6E3D0" }} />
    <div style={{ position: "absolute", left: size * 0.12, top: size * 0.64, width: size * 0.76, height: size * 0.6, borderRadius: "50%", background: "#F6E3D0" }} />
  </div>
);

export const DarkHeader: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 58, height: 52, display: "flex", alignItems: "center", padding: "0 16px", gap: 10, fontFamily: INTER, color: "#fff" }}>
    <IconBack size={22} stroke={2} />
    <Face size={36} />
    <div style={{ flex: 1, lineHeight: 1.15 }}>
      <div style={{ fontSize: 16, fontWeight: 650 }}>Leo Park</div>
      <div style={{ fontSize: 12, color: GREY, display: "flex", alignItems: "center", gap: 3 }}>
        <IconLock size={11} stroke={2} />
        Protected
      </div>
    </div>
    <div style={{ color: GREY, display: "flex", gap: 16 }}>
      <IconPhone size={21} stroke={1.8} />
      <IconVideo size={23} stroke={1.8} />
    </div>
  </div>
);

export const ProfileBlock: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 128, textAlign: "center", fontFamily: INTER, color: "#fff" }}>
    <div style={{ fontSize: 14.5, color: "#C7C7CC", lineHeight: "20px" }}>Member since 2019</div>
    <div style={{ fontSize: 14.5, color: "#C7C7CC", lineHeight: "20px" }}>48K followers</div>
    <div style={{ display: "inline-block", marginTop: 10, padding: "8px 16px", borderRadius: 18, background: "#2C2C2E", fontSize: 14, fontWeight: 600 }}>Open profile</div>
  </div>
);

export const Notice: React.FC<{ press: number; opacity: number }> = ({ press, opacity }) => (
  <div style={{ position: "absolute", left: 28, right: 28, top: NOTICE_Y, textAlign: "center", fontFamily: INTER, color: "#fff", opacity }}>
    <div style={{ fontSize: 13, lineHeight: "18px", color: "#C7C7CC" }}>
      <b style={{ color: "#fff" }}>Leo</b> only hears from people he follows. Have his Number? Use it to reach his inbox.
    </div>
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        marginTop: 12,
        height: ENTER_BTN.h,
        padding: "0 14px",
        borderRadius: 17,
        background: "#fff",
        color: "#000",
        fontSize: 13.5,
        fontWeight: 650,
        transform: `scale(${1 - press * 0.08})`,
      }}
    >
      <IconDots size={15} />
      Enter Number
    </div>
  </div>
);

export const Composer: React.FC<{ placeholder: string }> = ({ placeholder }) => (
  <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 120, background: "#000", fontFamily: INTER }}>
    <div style={{ position: "absolute", left: 14, right: 14, top: 8, height: 40, display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ width: 36, height: 36, borderRadius: 18, background: "#1C1C1E", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
        <IconPlus size={18} stroke={2} />
      </div>
      <div style={{ flex: 1, height: 38, borderRadius: 19, background: "#1C1C1E", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 14px", color: "#6C6C70", fontSize: 15 }}>
        {placeholder}
        <IconMic size={18} stroke={1.8} />
      </div>
    </div>
    <div style={{ position: "absolute", left: 30, right: 30, top: 64, display: "flex", justifyContent: "space-between", color: "#fff" }}>
      <IconHome size={24} />
      <IconSearch size={24} />
      <IconBell size={24} />
      <IconBubble size={24} />
    </div>
  </div>
);

export const Keypad: React.FC<{ typed: number; flash: number; flashKey: string; enterReady: number }> = ({ typed, flash, flashKey, enterReady }) => {
  const digits = TYPED.replace("-", "");
  const shown = digits.slice(0, typed);
  const slots = [0, 1, 2, 3, -1, 4, 5, 6, 7];
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: KEYPAD_SHEET.y, height: KEYPAD_SHEET.h + 40, borderRadius: 30, background: "#1C1C1E", fontFamily: INTER, color: "#fff" }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 18, display: "flex", justifyContent: "center", alignItems: "center", gap: 6, fontSize: 15.5, fontWeight: 650 }}>
        Enter
        <OrbitMark size={15} color="#fff" />
        Number
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 48, height: 1, background: "#2C2C2E" }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 62, textAlign: "center", fontSize: 12, color: "#AEAEB2" }}>
        Type <b style={{ color: "#fff" }}>Leo's</b> Number to open a conversation.
      </div>
      <div style={{ position: "absolute", left: 18, right: 18, top: 88, height: 44, borderRadius: 12, background: "#2C2C2E", display: "flex", alignItems: "center", justifyContent: "center", gap: 13, fontSize: 18, fontVariantNumeric: "tabular-nums" }}>
        {slots.map((s, i) => {
          if (s < 0) return <span key={i} style={{ color: typed >= 4 ? "#fff" : "#636366" }}>-</span>;
          const has = s < shown.length;
          const caret = s === shown.length;
          return (
            <span key={i} style={{ width: 12, textAlign: "center", color: has ? "#fff" : "#48484A", position: "relative" }}>
              {has ? shown[s] : "0"}
              {caret ? <span style={{ position: "absolute", left: -3, top: 2, width: 1.6, height: 20, background: "#fff" }} /> : null}
            </span>
          );
        })}
      </div>
      {KEY_ROWS.map((row, r) =>
        row.split("").map((k, c) => {
          const lit = k === flashKey ? flash : 0;
          return (
            <div key={`${r}${c}`} style={{ position: "absolute", left: 40 + c * 118, top: KEY.top + r * KEY.rowH, width: 76, height: 50, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 21, fontWeight: 500 }}>
              <div style={{ position: "absolute", width: 44, height: 44, borderRadius: 22, background: "#48484A", opacity: lit }} />
              <span style={{ position: "relative" }}>{k === "<" ? <IconBackspace size={20} stroke={2} /> : k}</span>
            </div>
          );
        }),
      )}
      <div style={{ position: "absolute", left: 18, right: 18, top: KEY.top + 4 * KEY.rowH + 8, height: 44, borderRadius: 22, background: enterReady > 0.5 ? "#fff" : "#2C2C2E", color: enterReady > 0.5 ? "#000" : "#8E8E93", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 600 }}>
        Enter
      </div>
    </div>
  );
};

export const Conversation: React.FC<{ system: number; sent: number; reply: number }> = ({ system, sent, reply }) => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 232, fontFamily: INTER }}>
    <div style={{ textAlign: "center", fontSize: 12.5, color: GREY, opacity: system }}>Today</div>
    <div style={{ textAlign: "center", fontSize: 13, lineHeight: "18px", color: "#C7C7CC", marginTop: 10, opacity: system }}>
      You used <b style={{ color: "#fff" }}>Leo's</b> Number.
      <br />
      Messages and calls are open now.
    </div>
    <div style={{ display: "flex", justifyContent: "flex-end", padding: "0 16px", marginTop: 18, opacity: sent, transform: `translateY(${(1 - sent) * 14}px)` }}>
      <div style={{ background: BLUE, color: "#fff", fontSize: 15, padding: "9px 14px", borderRadius: 19 }}>Your talk yesterday was great</div>
    </div>
    <div style={{ display: "flex", justifyContent: "flex-start", padding: "0 16px", marginTop: 10, opacity: reply, transform: `translateY(${(1 - reply) * 14}px)` }}>
      <div style={{ background: "#2C2C2E", color: "#fff", fontSize: 15, padding: "9px 14px", borderRadius: 19 }}>Ha, thank you! Glad you came</div>
    </div>
  </div>
);

export const DARK_SCREEN = { w: SCREEN_W, h: SCREEN_H };
