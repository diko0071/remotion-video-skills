import React from "react";
import { INTER } from "./font";
import { IconArchive, IconCheck, IconCheckAll, IconChevron, IconDots, IconGear, IconInbox, IconPeople, IconPin, IconRefresh, IconSearch, IconUnread } from "./icons";
import { OrbitMark } from "./mark";
import { SCREEN_H, SCREEN_W } from "./phone";
import { Roller } from "./roller";
import { GREEN, INK, NUMBER } from "./timings";

export const CHIP = { x: SCREEN_W - 20 - 64, y: 66, w: 64, h: 30 };
export const MENU = { x: SCREEN_W - 16 - 214, y: 102, w: 214 };
export const ROW_H = 44;
export const SHEET = { x: -14, y: SCREEN_H - 372, w: SCREEN_W + 28, h: 348 };
export const FIELD = { x: 22, y: 110, h: 54 };

const THREADS = [
  { name: "Maya Chen", preview: "Saw your post, want to jam on it?", time: "1d", hue: "#F4C7A1", unread: true },
  { name: "Theo Grant", preview: "The prototype is finally stable", time: "2h", hue: "#A8D5BA" },
  { name: "Jun Okafor", preview: "Send me the deck when it's ready", time: "2h", hue: "#B7C4F2" },
  { name: "Priya Nair", preview: "Coffee Thursday works for me", time: "3h", hue: "#F2B8C6" },
  { name: "Sam Ortiz", preview: "Ha, that screenshot is perfect", time: "5h", hue: "#E9D8A6" },
  { name: "Lena Voss", preview: "Booked the room for Friday", time: "1d", hue: "#C9B6E4" },
] as const;

const Avatar: React.FC<{ hue: string; size: number }> = ({ hue, size }) => (
  <div style={{ width: size, height: size, borderRadius: size / 2, background: hue, position: "relative", overflow: "hidden", flexShrink: 0 }}>
    <div style={{ position: "absolute", left: size * 0.32, top: size * 0.2, width: size * 0.36, height: size * 0.36, borderRadius: "50%", background: "rgba(255,255,255,0.85)" }} />
    <div style={{ position: "absolute", left: size * 0.16, top: size * 0.62, width: size * 0.68, height: size * 0.6, borderRadius: "50%", background: "rgba(255,255,255,0.85)" }} />
  </div>
);

export const Inbox: React.FC<{ chipGlow: number }> = ({ chipGlow }) => (
  <div style={{ position: "absolute", inset: 0, fontFamily: INTER, color: INK }}>
    <div style={{ position: "absolute", left: 20, top: 64, display: "flex", alignItems: "center", gap: 10 }}>
      <span style={{ fontSize: 30, fontWeight: 700, letterSpacing: -0.8 }}>Messages</span>
    </div>
    <div
      style={{
        position: "absolute",
        left: CHIP.x,
        top: CHIP.y,
        width: CHIP.w,
        height: CHIP.h,
        borderRadius: 15,
        background: chipGlow > 0 ? `rgba(0,0,0,${0.05 + chipGlow * 0.07})` : "rgba(0,0,0,0.05)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 3,
        fontSize: 14,
        fontWeight: 600,
      }}
    >
      All
      <IconChevron size={14} stroke={2.2} />
    </div>
    <div style={{ position: "absolute", left: 16, right: 16, top: 112, height: 38, borderRadius: 12, background: "#F1F1F3", display: "flex", alignItems: "center", gap: 8, padding: "0 12px", color: "#8E8E93", fontSize: 16 }}>
      <IconSearch size={18} stroke={2} />
      Search
    </div>
    {THREADS.map((t, i) => (
      <div key={t.name} style={{ position: "absolute", left: 16, right: 16, top: 168 + i * 76, height: 76, display: "flex", alignItems: "center", gap: 12 }}>
        <Avatar hue={t.hue} size={52} />
        <div style={{ flex: 1, minWidth: 0, borderBottom: i < THREADS.length - 1 ? "1px solid #EFEFF1" : undefined, height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 16, fontWeight: 600 }}>
            <span>{t.name}</span>
            <span style={{ fontSize: 13.5, fontWeight: 400, color: "#8E8E93" }}>{t.time}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 14.5, color: "#6C6C70", marginTop: 3 }}>
            <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t.preview}</span>
            {"unread" in t ? <span style={{ width: 9, height: 9, borderRadius: 5, background: INK, flexShrink: 0, marginLeft: 8 }} /> : null}
          </div>
        </div>
      </div>
    ))}
  </div>
);

type MenuItem = { label: string; Icon: React.FC<{ size?: number; stroke?: number }>; check?: boolean; divider?: boolean; isNew?: boolean };

const ITEMS: MenuItem[] = [
  { label: "All", Icon: IconInbox, check: true },
  { label: "Unread", Icon: IconUnread },
  { label: "Pinned", Icon: IconPin },
  { label: "Groups", Icon: IconPeople, divider: true },
  { label: "Archived", Icon: IconArchive },
  { label: "Number", Icon: IconDots, isNew: true },
  { label: "Settings", Icon: IconGear, divider: true },
  { label: "Mark all read", Icon: IconCheckAll },
];

export const Menu: React.FC<{ open: number; insert: number; labelChars: number; press: number }> = ({ open, insert, labelChars, press }) => {
  const rows = ITEMS.map((it) => ({ ...it, h: it.isNew ? ROW_H * insert : ROW_H }));
  const height = rows.reduce((s, r) => s + r.h, 0) + 2 * 9 + 16;
  let y = 8;
  return (
    <div
      style={{
        position: "absolute",
        left: MENU.x,
        top: MENU.y,
        width: MENU.w,
        height,
        borderRadius: 18,
        background: "#fff",
        boxShadow: "0 18px 44px rgba(0,0,0,0.16), 0 0 0 0.5px rgba(0,0,0,0.08)",
        transformOrigin: `${MENU.w - 32}px -30px`,
        transform: `scale(${0.2 + 0.8 * open})`,
        opacity: Math.min(1, open * 2),
        fontFamily: INTER,
        color: INK,
        overflow: "hidden",
      }}
    >
      {rows.map((r) => {
        const top = y;
        y += r.h + (r.divider ? 9 : 0);
        const label = r.isNew ? r.label.slice(0, labelChars) : r.label;
        return (
          <React.Fragment key={r.label}>
            <div style={{ position: "absolute", left: 0, right: 0, top, height: r.h, overflow: "hidden" }}>
              {r.isNew ? <div style={{ position: "absolute", inset: "2px 6px", borderRadius: 10, background: "rgba(0,0,0,0.07)", clipPath: `inset(0 ${100 - press * 100}% 0 0)`, opacity: press > 0 && press < 1.5 ? 1 : 0 }} /> : null}
              <div style={{ position: "absolute", left: 16, top: (ROW_H - 22) / 2, display: "flex", alignItems: "center", gap: 12, fontSize: 16, fontWeight: 500, height: 22, opacity: r.isNew ? Math.min(1, insert * 1.4) : 1 }}>
                <r.Icon size={22} stroke={1.7} />
                <span>{label}</span>
              </div>
              {r.check ? (
                <div style={{ position: "absolute", right: 14, top: (ROW_H - 18) / 2 }}>
                  <IconCheck size={18} stroke={2.2} />
                </div>
              ) : null}
            </div>
            {r.divider ? <div style={{ position: "absolute", left: 14, right: 14, top: top + r.h + 4, height: 1, background: "#ECECEE" }} /> : null}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export const Sheet: React.FC<{ rollFrom: number; settleFrom: number; toggle: number }> = ({ rollFrom, settleFrom, toggle }) => {
  const tint = Math.min(1, toggle / 0.35);
  const knob = Math.max(0, Math.min(1, (toggle - 0.3) / 0.7));
  return (
    <div style={{ position: "absolute", left: SHEET.x, top: SHEET.y, width: SHEET.w, height: SHEET.h, borderRadius: 30, background: "#fff", boxShadow: "0 -10px 40px rgba(0,0,0,0.12)", fontFamily: INTER, color: INK }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 24, display: "flex", justifyContent: "center", alignItems: "center", gap: 7, fontSize: 17, fontWeight: 650 }}>
        Your
        <OrbitMark size={17} />
        Number
      </div>
      <div style={{ position: "absolute", left: 30, right: 30, top: 58, textAlign: "center", fontSize: 13.5, lineHeight: "19px", color: "#6C6C70" }}>
        Anyone with this number can reach your inbox. Give it to the people you want to hear from.
      </div>
      <div style={{ position: "absolute", left: FIELD.x, right: FIELD.x, top: FIELD.y, height: FIELD.h, borderRadius: 14, background: "#F2F2F4", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Roller value={NUMBER} rollFrom={rollFrom} settleFrom={settleFrom} settleStep={1.6} size={24} color={INK} gap={0.4} placeholder="#C7C7CC" />
      </div>
      <div style={{ position: "absolute", left: FIELD.x + 4, right: FIELD.x + 4, top: 188, height: 40, display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 15, fontWeight: 500 }}>
        Enabled
        <div style={{ position: "relative", width: 52, height: 31, borderRadius: 16, background: `rgb(${Math.round(229 - (229 - 52) * tint)},${Math.round(229 - (229 - 199) * tint)},${Math.round(234 - (234 - 89) * tint)})` }}>
          <div style={{ position: "absolute", top: 2, left: 2 + knob * 21, width: 27, height: 27, borderRadius: 14, background: "#fff", boxShadow: "0 2px 5px rgba(0,0,0,0.2)" }} />
        </div>
      </div>
      <div style={{ position: "absolute", left: FIELD.x, right: FIELD.x, top: 250, display: "flex", gap: 10 }}>
        <div style={{ flex: 1, height: 46, borderRadius: 23, background: "#F2F2F4", display: "flex", alignItems: "center", justifyContent: "center", gap: 7, fontSize: 15, fontWeight: 600 }}>
          <IconRefresh size={17} stroke={2} />
          New number
        </div>
        <div style={{ flex: 1, height: 46, borderRadius: 23, background: INK, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 600 }}>Share</div>
      </div>
    </div>
  );
};

export const TOGGLE_GREEN = GREEN;
