import React from "react";
import { AbsoluteFill, Easing, Img, staticFile, useCurrentFrame } from "remotion";
import { ramp } from "../../core/motion";
import { sampleRef } from "../../core/measure";
import { RING_CARDS, type RingCard } from "./assets";
import { INTER } from "./font";
import { GREEN, GREY, HOLE_FONT, HOLE_WORDS, HOLE_WORDS_END, HOLE_Y, INK, RING } from "./timings";

const hash = (i: number, k: number) => {
  const x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453;
  return x - Math.floor(x);
};

const DOT_GRID: React.CSSProperties = {
  backgroundImage: "radial-gradient(circle, #DADADA 1.6px, transparent 1.9px)",
  backgroundSize: "48px 48px",
  backgroundPosition: "24px 24px",
};

const CardFace: React.FC<{ card: RingCard }> = ({ card }) => {
  if (card.kind === "img") {
    return <Img src={staticFile(card.file)} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 25%", display: "block" }} />;
  }
  if (card.kind === "disc") {
    return (
      <div style={{ width: "100%", height: "100%", borderRadius: "50%", position: "relative", background: `radial-gradient(circle at 35% 30%, ${card.a} 0%, ${card.b} 45%, ${card.c} 100%)` }}>
        <div style={{ position: "absolute", left: "50%", top: "50%", width: 12, height: 12, marginLeft: -6, marginTop: -6, borderRadius: 6, background: "#111" }} />
        <div style={{ position: "absolute", left: "18%", top: "18%", width: 26, height: "64%", backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.9) 1.6px, transparent 2px)", backgroundSize: "7px 7px" }} />
      </div>
    );
  }
  if (card.kind === "pill") {
    return (
      <div style={{ width: "100%", height: "100%", borderRadius: 999, background: GREEN, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: INTER, fontSize: 24, fontWeight: 500, color: INK }}>
        {card.label}
      </div>
    );
  }
  if (card.kind === "list") {
    return (
      <div style={{ width: "100%", height: "100%", background: "#fff", padding: "14px 18px", fontFamily: INTER, fontSize: 22, color: INK, display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}><span>English</span><span style={{ color: GREY }}>Hello</span></div>
        <div style={{ display: "flex", justifyContent: "space-between" }}><span>Arabic</span><span style={{ color: GREY }}>مرحبا</span></div>
        <div style={{ display: "flex", justifyContent: "space-between" }}><span>Assamese</span><span style={{ color: GREY }}>নমস্কাৰ</span></div>
        <div style={{ display: "flex", justifyContent: "space-between" }}><span>Bengali</span><span style={{ color: GREY }}>হ্যালো</span></div>
      </div>
    );
  }
  return (
    <div style={{ width: "100%", height: "100%", background: "#fff", padding: 14, fontFamily: INTER, fontSize: 20, color: INK, display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <span style={{ border: "1.5px solid #ddd", borderRadius: 999, padding: "4px 12px" }}>Character</span>
        <span style={{ border: "1.5px solid #ddd", borderRadius: 999, padding: "4px 12px" }}>10s</span>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <span style={{ border: "1.5px solid #ddd", borderRadius: 999, padding: "4px 12px" }}>Music</span>
        <span style={{ border: "1.5px solid #ddd", borderRadius: 999, padding: "4px 12px" }}>Subtitles</span>
      </div>
    </div>
  );
};

export const ringScale = (frame: number) => {
  const raw = frame < RING.growFrom ? 0 : Math.min(1, sampleRef(RING.growWidth, frame, RING.growFrom, 30) / RING.fullWidth);
  const push = ramp(frame, RING.push[0], RING.push[1], Easing.out(Easing.cubic));
  const creep = ramp(frame, RING.push[1], RING.collapse[0]);
  const zoom = 1 + (RING.pushZoom - 1) * push + (RING.creepZoom - RING.pushZoom) * creep;
  const collapse = ramp(frame, RING.collapse[0], RING.collapse[1], Easing.in(Easing.cubic));
  return raw * zoom * (1 - collapse);
};

const shapeOf = (card: RingCard) => (card.kind === "disc" || card.kind === "pill" ? 999 : 18);

export const Ring: React.FC = () => {
  const frame = useCurrentFrame();
  const scale = ringScale(frame);
  const spin = frame * RING.spin;
  let idx = 0;
  const cards = RING.rings.flatMap((ring, ri) =>
    Array.from({ length: ring.count }, (_, k) => {
      const card = RING_CARDS[idx++ % RING_CARDS.length];
      const i = ri * 100 + k;
      const theta = ((k * 360) / ring.count + spin * (ri === 0 ? 1 : ri === 1 ? 1.1 : 1.22) + hash(i, 1) * 5) * (Math.PI / 180);
      const rj = 1 + (hash(i, 2) - 0.5) * 0.08;
      const d = (Math.sin(theta) + 1) / 2;
      const s = RING.backScale + (RING.frontScale - RING.backScale) * d;
      const x = RING.cx + ring.r * rj * Math.cos(theta);
      const y = RING.cy + ring.r * RING.ry * rj * Math.sin(theta) - 40 * (1 - d);
      const isDisc = card.kind === "disc";
      const w = isDisc ? ring.h : ring.w;
      const h = isDisc ? ring.h : card.kind === "pill" ? ring.h * 0.42 : ring.h;
      return { card, key: `${ri}-${k}`, x, y, s, w, h, z: Math.round(d * 100) + (1 - ri) * 4 };
    }),
  );
  return (
    <AbsoluteFill style={{ background: "#fff", ...DOT_GRID }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: 1920, height: 1080, transform: `scale(${scale})`, transformOrigin: `${RING.cx}px ${RING.cy}px` }}>
        {cards.map(({ card, key, x, y, s, w, h, z }) => (
          <div
            key={key}
            style={{
              position: "absolute",
              left: x - (w * s) / 2,
              top: y - (h * s) / 2,
              width: w * s,
              height: h * s,
              zIndex: z,
              borderRadius: shapeOf(card) === 999 ? 999 : 26 * s,
              overflow: "hidden",
              boxShadow: shapeOf(card) === 999 ? "none" : "0 2px 12px rgba(0,0,0,0.14)",
            }}
          >
            <CardFace card={card} />
          </div>
        ))}
      </div>
      <HoleWords />
    </AbsoluteFill>
  );
};

const HoleWords: React.FC = () => {
  const frame = useCurrentFrame();
  if (frame >= HOLE_WORDS_END) return null;
  const idx = HOLE_WORDS.findIndex((w, i) => frame >= w.at && (i === HOLE_WORDS.length - 1 || frame < HOLE_WORDS[i + 1].at));
  if (idx < 0) return null;
  const w = HOLE_WORDS[idx];
  const bold = "boldAt" in w && frame >= w.boldAt;
  const grey = "greyUntil" in w && frame < w.greyUntil;
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: HOLE_Y - HOLE_FONT * 0.62,
        textAlign: "center",
        fontFamily: INTER,
        fontSize: HOLE_FONT,
        fontWeight: bold ? 700 : 400,
        color: grey ? GREY : INK,
        letterSpacing: "-0.01em",
        zIndex: 500,
      }}
    >
      {w.text}
    </div>
  );
};
