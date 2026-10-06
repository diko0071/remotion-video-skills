import React from "react";
import { AbsoluteFill, Easing, Img, staticFile, useCurrentFrame } from "remotion";
import { ramp } from "../../core/motion";
import { Cursor } from "../../kit/cursor";
import { CLONE_FILES } from "./assets";
import { DotDissolve } from "./dissolve";
import { CLONE_GRIDS } from "./dots-data";
import { INTER } from "./font";
import { GREEN, INK, PHONE } from "./timings";

const DOT_GRID: React.CSSProperties = {
  backgroundImage: "radial-gradient(circle, #DADADA 1.6px, transparent 1.9px)",
  backgroundSize: "48px 48px",
  backgroundPosition: "24px 24px",
};

const SELFIE = "veed-launch/clone.jpg";

const CameraUI: React.FC<{ frame: number }> = ({ frame }) => {
  const R = PHONE.rect;
  const drop = 1 - Math.pow(1 - ramp(frame, PHONE.drop[0], PHONE.drop[1]), 3);
  const flash = frame >= PHONE.flash[0] && frame < PHONE.flash[1];
  const split = ramp(frame, PHONE.split[0], PHONE.split[1], Easing.in(Easing.cubic));
  const sc = 0.9 + 0.1 * drop;
  const photoTop = 128;
  const photoH = 640;
  const topShift = -(photoTop + 60) * split - 400 * split;
  const botShift = (R.h - photoTop - photoH) * split + 400 * split;
  const chrome = (children: React.ReactNode, style: React.CSSProperties) => (
    <div style={{ position: "absolute", left: 0, right: 0, background: "#000", ...style }}>{children}</div>
  );
  return (
    <div style={{ position: "absolute", left: R.x, top: R.y, width: R.w, height: R.h, transform: `scale(${sc})`, transformOrigin: "50% 50%", opacity: drop, fontFamily: INTER, color: "#fff" }}>
      <div style={{ position: "absolute", left: 0, top: photoTop, width: R.w, height: photoH, overflow: "hidden", opacity: split >= 1 ? 0 : 1 }}>
        <Img src={staticFile(SELFIE)} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        <div style={{ position: "absolute", left: "50%", bottom: 26, transform: "translateX(-50%)", display: "flex", gap: 8, fontSize: 15 }}>
          <span style={{ background: "rgba(0,0,0,0.5)", borderRadius: 999, padding: "6px 10px" }}>0.5</span>
          <span style={{ background: "rgba(0,0,0,0.5)", borderRadius: 999, padding: "6px 10px", color: "#F5D20B" }}>1×</span>
        </div>
        {flash && <div style={{ position: "absolute", inset: 0, background: "#fff" }} />}
      </div>
      {chrome(
        <>
          <div style={{ position: "absolute", left: 40, top: 22, fontSize: 22, fontWeight: 600 }}>9:41</div>
          <div style={{ position: "absolute", right: 40, top: 26, width: 60, height: 14, borderRadius: 4, border: "2px solid #fff" }} />
          <div style={{ position: "absolute", left: 28, top: 78, fontSize: 18, background: "#2a2a2a", borderRadius: 999, padding: "8px 14px" }}>JPEG</div>
          <div style={{ position: "absolute", right: 28, top: 78, width: 130, height: 36, background: "#2a2a2a", borderRadius: 999 }} />
        </>,
        { top: 0, height: photoTop, borderRadius: `${R.radius}px ${R.radius}px 0 0`, transform: `translateY(${topShift}px)` },
      )}
      {chrome(
        <>
          <div style={{ position: "absolute", left: "50%", top: 34, width: 92, height: 92, marginLeft: -46, borderRadius: 46, border: "5px solid #fff" }}>
            <div style={{ position: "absolute", inset: 6, borderRadius: 999, background: "#fff" }} />
          </div>
          <div style={{ position: "absolute", left: "50%", top: 150, transform: "translateX(-50%)", display: "flex", gap: 6, background: "#1c1c1c", borderRadius: 999, padding: 6, fontSize: 19 }}>
            <span style={{ padding: "8px 20px" }}>VIDEO</span>
            <span style={{ padding: "8px 20px", background: "#2c2c2c", borderRadius: 999, color: "#F5D20B" }}>PHOTO</span>
          </div>
          <div style={{ position: "absolute", left: 40, top: 152, width: 56, height: 56, borderRadius: 28, overflow: "hidden" }}>
            <Img src={staticFile(SELFIE)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ position: "absolute", right: 40, top: 152, width: 56, height: 56, borderRadius: 28, background: "#2a2a2a" }} />
        </>,
        { top: photoTop + photoH, height: R.h - photoTop - photoH, borderRadius: `0 0 ${R.radius}px ${R.radius}px`, transform: `translateY(${botShift}px)` },
      )}
    </div>
  );
};

const Photo: React.FC<{ frame: number }> = ({ frame }) => {
  const R = PHONE.rect;
  const P = PHONE.photo;
  const shrink = ramp(frame, PHONE.split[0], PHONE.split[1], Easing.inOut(Easing.cubic));
  const from = { x: R.x, y: R.y + 128, w: R.w, h: 640 };
  const x = from.x + (P.x - from.x) * shrink;
  const y = from.y + (P.y - from.y) * shrink;
  const w = from.w + (P.w - from.w) * shrink;
  const h = from.h + (P.h - from.h) * shrink;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, borderRadius: 24 * shrink, overflow: "hidden" }}>
      <Img src={staticFile(SELFIE)} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
    </div>
  );
};

const Clones: React.FC<{ frame: number }> = ({ frame }) => {
  const P = PHONE.photo;
  const pickI = PHONE.pickIndex;
  const others = ramp(frame, PHONE.pick.others[0], PHONE.pick.others[1], Easing.in(Easing.cubic));
  return (
    <>
      {PHONE.clones.map((c, i) => {
        const at = PHONE.scatter[0] + (i * 1.3) % 10;
        const e = 1 - Math.pow(1 - ramp(frame, at, at + 12), 3);
        const isPick = i === pickI;
        const grow = isPick ? ramp(frame, PHONE.pick.grow[0], PHONE.pick.grow[1], Easing.inOut(Easing.cubic)) : 0;
        const B = PHONE.pick.big;
        const fx = c.x + (B.x - c.x) * grow;
        const fy = c.y + (B.y - c.y) * grow;
        const fw = c.w + (B.w - c.w) * grow;
        const fh = c.h + (B.h - c.h) * grow;
        const x = P.x + (fx - P.x) * e;
        const y = P.y + (fy - P.y) * e;
        const w = P.w + (fw - P.w) * e;
        const h = P.h + (fh - P.h) * e;
        const away = isPick ? 0 : others;
        const dx = (c.x + c.w / 2 - 960) * 1.6 * away;
        const dy = (c.y + c.h / 2 - 540) * 1.6 * away;
        const green = isPick ? ramp(frame, PHONE.pick.greenAt, PHONE.pick.greenAt + 4) : 0;
        if (isPick && frame >= PHONE.pick.dissolve[0]) return null;
        return (
          <div key={i} style={{ position: "absolute", left: x + dx, top: y + dy, width: w, height: h, borderRadius: 26, overflow: "hidden", opacity: 1 - away, zIndex: isPick ? 20 : 1 }}>
            <Img src={staticFile(isPick ? "veed-launch/clone.jpg" : CLONE_FILES[i % CLONE_FILES.length])} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 35%", display: "block" }} />
            {green > 0 && <div style={{ position: "absolute", inset: 0, background: GREEN, opacity: 0.55 * green, mixBlendMode: "multiply" }} />}
          </div>
        );
      })}
    </>
  );
};

const Words: React.FC<{ frame: number }> = ({ frame }) => {
  const w = PHONE.words.find((x) => frame >= x.at && frame < x.until);
  if (!w) return null;
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: 540 - 112 * 0.62, textAlign: "center", fontFamily: INTER, fontSize: 112, color: INK, letterSpacing: "-0.01em", zIndex: 30 }}>{w.text}</div>
  );
};

const Row: React.FC<{ frame: number }> = ({ frame }) => {
  const R = PHONE.row;
  const morph = ramp(frame, PHONE.morph[0], PHONE.morph[1], Easing.inOut(Easing.cubic));
  const B = PHONE.pick.big;
  const shift = ramp(frame, R.shift[0], R.shift[1], Easing.inOut(Easing.cubic));
  const baseX = R.firstX + (R.shiftTo - R.firstX) * shift;
  const step = R.cardW + R.gap;
  return (
    <>
      {[0, 1, 2, 3].map((i) => {
        const entry = i === 0 ? 1 : ramp(frame, R.entries[i], R.entries[i] + 12, Easing.out(Easing.cubic));
        if (i > 0 && entry <= 0) return null;
        const fx = baseX + i * step;
        const x = i === 0 ? B.x + (fx - B.x) * morph : fx + (1920 - fx) * (1 - entry);
        const y = i === 0 ? B.y + (R.y - B.y) * morph : R.y + 70 * (1 - entry);
        const w = i === 0 ? B.w + (R.cardW - B.w) * morph : R.cardW;
        const h = i === 0 ? B.h + (R.cardH - B.h) * morph : R.cardH;
        return (
          <div key={i} style={{ position: "absolute", left: x, top: y, width: w, height: h, borderRadius: 40, overflow: "hidden" }}>
            <Img src={staticFile(i === 0 ? "veed-launch/clone.jpg" : CLONE_FILES[i - 1])} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%", display: "block" }} />
          </div>
        );
      })}
    </>
  );
};

export const PhoneScene: React.FC = () => {
  const frame = useCurrentFrame();
  const D = PHONE.pick.dissolve;
  const inDissolve = frame >= D[0] && frame < D[1];
  return (
    <AbsoluteFill style={{ background: "#fff", ...DOT_GRID }}>
      {frame < PHONE.split[1] && <CameraUI frame={frame} />}
      {frame >= PHONE.split[0] && frame < PHONE.scatter[0] && <Photo frame={frame} />}
      {frame >= PHONE.scatter[0] && frame < PHONE.morph[0] && <Clones frame={frame} />}
      {inDissolve && (
        <DotDissolve grids={CLONE_GRIDS} cols={[20, 40, 60]} from={D[0]} to={D[1]} card={{ ...PHONE.pick.big, radius: 40 }} startCell={PHONE.pick.big.w / 20} palette="green" file="veed-launch/clone.jpg" bg="transparent" />
      )}
      {frame >= D[1] && <Row frame={frame} />}
      <Words frame={frame} />
      <Cursor stops={[...PHONE.cursor]} appearAt={PHONE.cursor[0].at} scale={3.2} />
    </AbsoluteFill>
  );
};
