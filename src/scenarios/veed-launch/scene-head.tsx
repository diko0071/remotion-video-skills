import React from "react";
import { AbsoluteFill, Easing, Img, staticFile, useCurrentFrame } from "remotion";
import { ramp } from "../../core/motion";
import { Cursor } from "../../kit/cursor";
import { CHARACTER_TILES, SUBTITLE_TILES } from "./assets";
import { INTER } from "./font";
import { GREEN, GREY, HEAD, INK } from "./timings";
import { TileFace } from "./pick-grid";

const DOT_GRID: React.CSSProperties = {
  backgroundImage: "radial-gradient(circle, #DADADA 1.6px, transparent 1.9px)",
  backgroundSize: "48px 48px",
  backgroundPosition: "24px 24px",
};

const SUB_STYLES = [
  { fontFamily: INTER, fontWeight: 800, color: "#F5D20B" },
  { fontFamily: "'Source Serif 4', Georgia, serif", fontStyle: "italic" as const, fontWeight: 400, color: "#fff" },
  { fontFamily: INTER, fontWeight: 900, color: "#fff", textShadow: "0 2px 0 #111" },
];

const Word: React.FC<{ frame: number }> = ({ frame }) => {
  const w = HEAD.words.find((x) => frame >= x.at && frame < x.until);
  if (!w) return null;
  const bold = "boldAt" in w && frame >= w.boldAt;
  const grey = "greyUntil" in w && frame < w.greyUntil;
  return (
    <div style={{ position: "absolute", left: HEAD.wordX - 400, width: 800, top: HEAD.wordY - 112 * 0.62, textAlign: "center", fontFamily: INTER, fontSize: 112, fontWeight: bold ? 700 : 400, color: grey ? GREY : INK, letterSpacing: "-0.01em" }}>
      {w.text}
    </div>
  );
};

const Subtitle: React.FC<{ frame: number; style: number }> = ({ frame, style }) => {
  const s = [...HEAD.subtitles].reverse().find((x) => frame >= x.at);
  if (!s) return null;
  const st = SUB_STYLES[style];
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: "48%", textAlign: "center", fontSize: 56, letterSpacing: "-0.01em", ...st }}>{s.text}</div>
  );
};

const Panel: React.FC<{ frame: number }> = ({ frame }) => {
  const P = HEAD.panel;
  if (frame < P.subsAt || frame >= P.closeAt) return null;
  const chars = frame >= P.charsAt;
  const pop = 1 - Math.pow(1 - ramp(frame, chars ? P.charsAt : P.subsAt, (chars ? P.charsAt : P.subsAt) + 8), 3);
  const tiles = chars ? CHARACTER_TILES.slice(4, 10) : SUBTITLE_TILES.slice(0, 6);
  const pick = chars ? HEAD.charPick : HEAD.stylePick;
  const sel = frame >= pick.hover ? (chars ? 2 : 4) : -1;
  return (
    <div style={{ position: "absolute", left: P.x, top: P.y, width: P.w, height: P.h, borderRadius: 26, background: "#fff", boxShadow: "0 20px 60px rgba(0,0,0,0.12)", transform: `scale(${0.85 + 0.15 * pop})`, transformOrigin: "0% 100%", opacity: Math.min(1, pop * 1.5), fontFamily: INTER, color: INK }}>
      <div style={{ position: "absolute", left: 26, top: 26, fontSize: 34, fontWeight: 600 }}>{chars ? "Characters" : "Subtitle style"}</div>
      <div style={{ position: "absolute", right: 22, top: 24, width: 44, height: 44, borderRadius: 22, background: "#F0F0F0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>×</div>
      {tiles.map((t, i) => {
        const col = i % P.thumb.cols;
        const row = Math.floor(i / P.thumb.cols);
        const inAt = (chars ? P.charsAt : P.subsAt) + 4 + i * 2;
        const o = ramp(frame, inAt, inAt + 5);
        return (
          <div key={`${chars ? "c" : "s"}-${i}`} style={{ position: "absolute", left: 24 + col * (P.thumb.w + P.thumb.gap), top: 96 + row * (P.thumb.h + P.thumb.gap), width: P.thumb.w, height: P.thumb.h, borderRadius: 14, overflow: "hidden", opacity: o, outline: sel === i ? `4px solid ${GREEN}` : "none" }}>
            <TileFace tile={t} />
          </div>
        );
      })}
    </div>
  );
};

const FeedOverlay: React.FC<{ frame: number }> = ({ frame }) => {
  const o = ramp(frame, HEAD.feed.overlayAt, HEAD.feed.overlayAt + 6);
  return (
    <div style={{ position: "absolute", inset: 0, opacity: o, fontFamily: INTER, color: "#fff" }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,0.55) 100%)" }} />
      <div style={{ position: "absolute", left: 24, bottom: 118, display: "flex", alignItems: "center", gap: 12, fontSize: 20, fontWeight: 600 }}>
        <div style={{ width: 40, height: 40, borderRadius: 20, background: GREEN, color: INK, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900 }}>V</div>
        veedstudio
        <span style={{ border: "1.5px solid rgba(255,255,255,0.7)", borderRadius: 8, padding: "3px 10px", fontWeight: 500 }}>Follow</span>
      </div>
      <div style={{ position: "absolute", left: 24, bottom: 82, fontSize: 19 }}>Your marketing team isn't the problem. The...</div>
      <div style={{ position: "absolute", left: 24, bottom: 46, fontSize: 17, opacity: 0.9 }}>VEED Tune's are banging</div>
      <div style={{ position: "absolute", left: 250, bottom: 30, fontSize: 17, opacity: 0.9 }}>55 users</div>
      {[
        ["29.8K", 250],
        ["4321", 170],
        ["2540", 90],
      ].map(([n, b]) => (
        <div key={String(n)} style={{ position: "absolute", right: 24, bottom: Number(b) + 40, textAlign: "center", fontSize: 17 }}>
          <div style={{ width: 34, height: 34, borderRadius: 17, border: "2.5px solid #fff", margin: "0 auto 4px" }} />
          {n}
        </div>
      ))}
    </div>
  );
};

export const HeadScene: React.FC = () => {
  const frame = useCurrentFrame();
  const C = HEAD.card;
  const swap = ramp(frame, HEAD.charPick.swap[0], HEAD.charPick.swap[1]);
  const tilt = ramp(frame, HEAD.feed.tilt[0], HEAD.feed.tilt[1], Easing.out(Easing.cubic));
  const exit = ramp(frame, HEAD.feed.exit[0], HEAD.feed.exit[1], Easing.in(Easing.cubic));
  const style = frame >= HEAD.stylePick.click ? 1 : 0;
  const rotY = -26 * tilt;
  const rotX = 12 * tilt;
  const ty = -1300 * exit;
  return (
    <AbsoluteFill style={{ background: "#fff", ...DOT_GRID }}>
      <Word frame={frame} />
      <div style={{ position: "absolute", left: 0, top: 0, width: 1920, height: 1080, perspective: 2200, perspectiveOrigin: `${C.x + C.w / 2}px ${C.y + C.h / 2}px` }}>
        <div style={{ position: "absolute", left: C.x, top: C.y, width: C.w, height: C.h, borderRadius: C.radius, overflow: "hidden", transform: `translateY(${ty}px) rotateY(${rotY}deg) rotateX(${rotX}deg) scale(${1 + 0.06 * tilt})`, transformOrigin: "50% 50%", boxShadow: tilt > 0 ? "0 40px 90px rgba(0,0,0,0.25)" : "none" }}>
          <Img src={staticFile("veed-launch/result.jpg")} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          <Img src={staticFile("ad-templates/crown-affair_top-1-11d.jpg")} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%", display: "block", opacity: swap }} />
          <Subtitle frame={frame} style={style} />
          {frame >= HEAD.feed.overlayAt && <FeedOverlay frame={frame} />}
        </div>
      </div>
      <Panel frame={frame} />
      <Cursor stops={[...HEAD.cursor]} appearAt={HEAD.cursor[0].at + 4} scale={3.2} />
    </AbsoluteFill>
  );
};
