import React from "react";
import { AbsoluteFill, Easing, Img, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { ramp, springAt, SPRINGS } from "../../core/motion";
import { Starburst } from "../../kit/claude-ui";
import { TileImg } from "../../kit/tile-img";
import { SANS } from "./font";
import { INK, ORBIT } from "./timings";

const CARDS = [
  { title: "Paid ads", sub: "2 campaigns live · ROAS 3.4x", thumb: "ad-templates/crown-affair_top-10-2d.jpg", accent: "#2FA36B" },
  { title: "Creatives", sub: "6 on-brand creatives", thumb: "ad-templates/dandelion-chocolate_top-2-55d.jpg", accent: "#D97757" },
  { title: "Dashboards", sub: "Clicks +38% WoW", thumb: "ad-templates/atoms_top-5-6d.jpg", accent: "#3B6FD8" },
  { title: "SEO fixes", sub: "14 issues fixed · score 92", thumb: "creative-wall/momofuku-goods_top-2-79d.jpg", accent: "#2FA36B" },
  { title: "Audits", sub: "Site health 92", thumb: "ad-templates/salt-stone_top-10-38d.jpg", accent: "#8A5CF6" },
];

export const OrbitScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame - ORBIT.from;
  const tiltIn = ramp(frame, ORBIT.from, ORBIT.from + 20, Easing.out(Easing.cubic));
  const spin = t * ORBIT.spin;
  const starIn = springAt(frame, fps, ORBIT.from, SPRINGS.pop, 16);
  return (
    <AbsoluteFill style={{ background: "#FDFDFD" }}>
      <div style={{ position: "absolute", left: 960, top: 540, width: 0, height: 0, transform: `rotate(${ORBIT.tilt * tiltIn}deg)` }}>
        {CARDS.map((c, i) => {
          const at = ORBIT.from + i * ORBIT.step;
          const fly = springAt(frame, fps, at, SPRINGS.pop, ORBIT.flyLen);
          const ang = ((i * 360) / CARDS.length + spin) * (Math.PI / 180);
          const x = Math.cos(ang) * ORBIT.rx * fly;
          const y = Math.sin(ang) * ORBIT.ry * fly;
          const depth = (Math.sin(ang) + 1) / 2;
          const s = (0.82 + 0.3 * depth) * (0.4 + 0.6 * fly);
          return (
            <div key={c.title} style={{ position: "absolute", left: x - ORBIT.cardW / 2, top: y - ORBIT.cardH / 2, width: ORBIT.cardW, height: ORBIT.cardH, borderRadius: 18, background: "#fff", border: "0.5px solid rgba(20,20,19,0.14)", boxShadow: "0 18px 50px rgba(20,15,10,0.14)", overflow: "hidden", transform: `scale(${s})`, opacity: Math.min(1, fly * 1.4), zIndex: Math.round(depth * 10), fontFamily: SANS }}>
              <div style={{ position: "absolute", left: 0, top: 0, right: 0, height: 118, overflow: "hidden" }}>
                <TileImg file={c.thumb} />
              </div>
              <div style={{ position: "absolute", left: 16, top: 130, fontSize: 18, fontWeight: 600, color: INK }}>{c.title}</div>
              <div style={{ position: "absolute", left: 16, top: 158, fontSize: 13, color: "#7A7873" }}>{c.sub}</div>
              <div style={{ position: "absolute", right: 14, top: 134, width: 10, height: 10, borderRadius: 5, background: c.accent }} />
            </div>
          );
        })}
      </div>
      <div style={{ position: "absolute", left: 960, top: 540, transform: `translate(-50%, -50%) scale(${starIn})`, display: "flex", alignItems: "center", justifyContent: "center", width: 200, height: 200, borderRadius: 100, background: "#fff", boxShadow: "0 20px 60px rgba(20,15,10,0.16)", zIndex: 20 }}>
        <span style={{ color: "#D97757", display: "inline-flex" }}>
          <Starburst size={92} />
        </span>
        <div style={{ position: "absolute", right: 14, bottom: 14, width: 56, height: 56, borderRadius: 14, background: "#111", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 18px rgba(0,0,0,0.25)" }}>
          <Img src={staticFile("ryze-sun-white.png")} style={{ width: 32, height: 32 }} />
        </div>
      </div>
    </AbsoluteFill>
  );
};
