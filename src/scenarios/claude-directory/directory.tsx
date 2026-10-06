import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { ramp, springAt, SPRINGS, typing } from "../../core/motion";
import { Cursor } from "../../kit/cursor";
import { DirectionalBlur } from "../../kit/directional-blur";
import { Pop } from "../../kit/pop";
import { SANS } from "./font";
import { CAPSULE, CAPSULE_BLACK, DIR } from "./timings";

const DARK = "#1F1F1E";
const PANEL = "#262625";
const TEXT = "#ECEAE4";
const MUTED = "#9B988F";
const SERIF = "'Source Serif 4', Georgia, serif";

export const cardWorld = () => {
  const left = CAPSULE.cx - CAPSULE.w / 2 + DIR.pageX;
  const top = CAPSULE.cy - CAPSULE.h / 2 + DIR.pageY;
  return { x: left + DIR.card.x * DIR.scale, y: top + DIR.card.y * DIR.scale, w: DIR.card.w * DIR.scale, h: DIR.card.h * DIR.scale };
};

export const CURSOR_STOPS = [
  { x: 1500, y: 1000, at: 54 },
  { x: 620, y: 402, at: 60 },
  { x: 620, y: 402, at: 62, click: true },
  { x: 620, y: 402, at: 88 },
  { x: 778, y: 572, at: 100 },
  { x: 778, y: 572, at: DIR.cursorClick, click: true },
] as const;

const CONNECTORS = [
  { name: "Gmail", sub: "Read and send mail", icon: "claude/favicon-gmail.png" },
  { name: "Slack", sub: "Channels and messages", icon: "claude/favicon-slack.png" },
  { name: "Google Drive", sub: "Files and docs", icon: "claude/favicon-google-drive.png" },
  { name: "GitHub", sub: "Repos and issues", icon: "claude/favicon-github.png" },
  { name: "HubSpot", sub: "CRM and deals", icon: "claude/int-hubspot.png" },
  { name: "LinkedIn", sub: "Pages and posts", icon: "claude/int-linkedin.png" },
  { name: "Shopify", sub: "Store and orders", icon: "claude/int-shopify.png" },
  { name: "Klaviyo", sub: "Email flows", icon: "claude/int-klaviyo.png" },
] as const;

const DirectoryIcon: React.FC = () => (
  <svg width="74" height="70" viewBox="0 0 74 70" fill="none" stroke={TEXT} strokeWidth="2">
    <rect x="1" y="1" width="42" height="36" rx="3" />
    <circle cx="18" cy="18" r="8" />
    <path d="M24 24 L30 30" />
    <path d="M44 22 L72 68 L28 68 Z" />
    <circle cx="50" cy="58" r="6" />
  </svg>
);

export const DirectoryPage: React.FC = () => {
  const frame = useCurrentFrame();
  const q = typing(frame, DIR.query, DIR.typeFrom, DIR.typeTo);
  const focused = frame >= DIR.typeFrom - 2;
  const caret = focused && Math.floor(frame / 14) % 2 === 0;
  const check = ramp(frame, DIR.checkAt, DIR.checkAt + 5);
  const connected = ramp(frame, DIR.connectedAt, DIR.connectedAt + 6);
  return (
    <div style={{ position: "absolute", left: CAPSULE.cx - CAPSULE.w / 2 + DIR.pageX, top: CAPSULE.cy - CAPSULE.h / 2 + DIR.pageY, width: 1500, height: 760, transform: `scale(${DIR.scale})`, transformOrigin: "0 0", fontFamily: SANS, color: TEXT }}>
      <div style={{ position: "absolute", left: 0, top: 0, display: "flex", alignItems: "center", gap: 34 }}>
        <Pop at={DIR.titleAt} from={0.7} rise={10}>
          <DirectoryIcon />
        </Pop>
        <div>
          <Pop at={DIR.titleAt + 1} from={0.85} rise={12}>
            <div style={{ fontFamily: SERIF, fontSize: 62, fontWeight: 400, lineHeight: 1 }}>Directory</div>
          </Pop>
          <Pop at={DIR.subAt} from={0.9} rise={10}>
            <div style={{ fontSize: 24, color: MUTED, marginTop: 10 }}>Connect Claude to your favorite apps and data sources.</div>
          </Pop>
        </div>
      </div>
      <Pop at={DIR.searchAt} from={0.9} rise={14} style={{ position: "absolute", left: 0, top: 200 }}>
        <div style={{ width: 1180, height: 60, borderRadius: 14, border: `1px solid ${focused ? "#5A5852" : "#3A3937"}`, background: DARK, display: "flex", alignItems: "center", padding: "0 20px", gap: 14, fontSize: 24 }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke={MUTED} strokeWidth="2">
            <circle cx="8.5" cy="8.5" r="6" />
            <path d="M13 13 L18 18" />
          </svg>
          <span style={{ color: q ? TEXT : MUTED }}>{q || "Search"}</span>
          <span style={{ width: 2, height: 28, background: TEXT, opacity: caret ? 1 : 0 }} />
          {q.length > 0 && <span style={{ marginLeft: "auto", color: MUTED, fontSize: 26 }}>×</span>}
        </div>
      </Pop>
      <Pop at={DIR.filtersAt} from={0.9} rise={12} style={{ position: "absolute", left: 1206, top: 200 }}>
        <div style={{ height: 60, padding: "0 22px", borderRadius: 14, background: PANEL, display: "flex", alignItems: "center", fontSize: 22, color: MUTED }}>Filter: All</div>
      </Pop>
      <Pop at={DIR.filtersAt + 1} from={0.9} rise={12} style={{ position: "absolute", left: 1364, top: 200 }}>
        <div style={{ height: 60, padding: "0 22px", borderRadius: 14, background: PANEL, display: "flex", alignItems: "center", gap: 10, fontSize: 22 }}>
          <span style={{ fontSize: 26 }}>+</span>Add custom
        </div>
      </Pop>
      {CONNECTORS.map((c, i) => {
        const col = i % 4;
        const row = Math.floor(i / 4);
        const out = ramp(frame, DIR.gridOut[0] + i, DIR.gridOut[1] + i);
        return (
          <Pop key={c.name} at={DIR.gridAt + i * DIR.gridStep} from={0.7} rise={14} style={{ position: "absolute", left: col * 370, top: DIR.card.y + row * 140, opacity: 1 - out, transform: `scale(${1 - 0.1 * out})` }}>
            <div style={{ width: 350, height: 120, borderRadius: 20, border: "1px solid #3A3937", background: DARK, display: "flex", alignItems: "center", padding: "0 20px", gap: 18 }}>
              <div style={{ width: 70, height: 70, borderRadius: 16, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Img src={staticFile(c.icon)} style={{ width: 42, height: 42, borderRadius: 8 }} />
              </div>
              <div>
                <div style={{ fontSize: 22, fontWeight: 600 }}>{c.name}</div>
                <div style={{ fontSize: 16, color: MUTED, marginTop: 4 }}>{c.sub}</div>
              </div>
            </div>
          </Pop>
        );
      })}
      {frame >= DIR.cardAt && (
        <Pop at={DIR.cardAt} from={0.6} rise={16} style={{ position: "absolute", left: DIR.card.x, top: DIR.card.y }}>
          <div style={{ width: DIR.card.w, height: DIR.card.h, borderRadius: 20, border: "1px solid #3A3937", background: DARK, display: "flex", alignItems: "center", padding: "0 20px", gap: 18 }}>
            <div style={{ width: 78, height: 78, borderRadius: 16, background: "#111", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Img src={staticFile("ryze-sun-white.png")} style={{ width: 46, height: 46 }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 22, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Ryze AI — Google Ads, Meta…</span>
                <Pop at={DIR.pillAt} from={0.6} rise={0}>
                  <span style={{ fontSize: 15, color: MUTED, background: PANEL, borderRadius: 999, padding: "4px 10px" }}>Community</span>
                </Pop>
              </div>
              <Pop at={DIR.descAt} from={0.95} rise={6}>
                <div style={{ fontSize: 17, color: MUTED, lineHeight: 1.3, marginTop: 6 }}>
                  Google Ads, Meta Ads, GA4,
                  <br />
                  Search Console, SEO/GEO/AE…
                </div>
              </Pop>
            </div>
            <div style={{ width: DIR.connect.w, height: DIR.connect.h, borderRadius: 12, background: connected > 0.5 ? "rgba(46,150,90,0.18)" : "#fff", color: connected > 0.5 ? "#2FA36B" : "#111", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: 19, fontWeight: 600, transform: `scale(${(0.6 + 0.4 * check) * (1 - 0.08 * Math.sin(connected * Math.PI))})`, opacity: check, flexShrink: 0 }}>
              {connected > 0.5 ? (
                <>
                  <svg width="18" height="18" viewBox="0 0 22 22" fill="none" stroke="#2FA36B" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 12 L9 17 L18 6" />
                  </svg>
                  Connected
                </>
              ) : (
                "Connect"
              )}
            </div>
          </div>
        </Pop>
      )}
    </div>
  );
};

export const CapsuleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const rise = springAt(frame, fps, CAPSULE.rise, SPRINGS.pop, CAPSULE.riseLen);
  const risePrev = springAt(frame - 1, fps, CAPSULE.rise, SPRINGS.pop, CAPSULE.riseLen);
  const top = CAPSULE.cy - CAPSULE.h / 2 + (1 - rise) * 1100;
  const vy = Math.abs(rise - risePrev) * 1100;
  if (frame < CAPSULE.rise) return null;
  return (
    <AbsoluteFill>
      <DirectionalBlur id="cd-capsule" y={vy * 0.32} style={{ position: "absolute", left: CAPSULE.cx - CAPSULE.w / 2, top, width: CAPSULE.w, height: CAPSULE.h, borderRadius: CAPSULE.radius, background: CAPSULE_BLACK, overflow: "hidden", boxShadow: "0 40px 120px rgba(0,0,0,0.25)" }}>
        <div style={{ position: "absolute", left: -(CAPSULE.cx - CAPSULE.w / 2), top: -(CAPSULE.cy - CAPSULE.h / 2), width: 1920, height: 1080 }}>
          <DirectoryPage />
        </div>
      </DirectionalBlur>
      <Cursor stops={[...CURSOR_STOPS]} appearAt={CURSOR_STOPS[0].at + 2} scale={1.6} />
    </AbsoluteFill>
  );
};
