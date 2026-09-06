import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { SPRINGS, useReveal, useSpringAt } from "../../core/motion";
import { HighlightWord } from "../../kit/kinetic-text";

export const STORES: { domain: string; dr: number }[] = [
  { domain: "todoist.com", dr: 78 },
  { domain: "perplexity.ai", dr: 74 },
  { domain: "whoop.com", dr: 66 },
  { domain: "eightsleep.com", dr: 63 },
  { domain: "replit.com", dr: 76 },
  { domain: "granola.ai", dr: 61 },
  { domain: "cluely.com", dr: 58 },
  { domain: "wisprflow.ai", dr: 62 },
  { domain: "meetcleo.com", dr: 47 },
  { domain: "hatch.co", dr: 52 },
  { domain: "suno.com", dr: 70 },
  { domain: "lovable.dev", dr: 51 },
  { domain: "akiflow.com", dr: 59 },
  { domain: "nanit.com", dr: 48 },
  { domain: "rocketmoney.com", dr: 60 },
];

const CX = 960;
const CY = 445;
const DRIFT = 0.0012;
const RING_FROM = 20;
const SPARKS_FROM = 140;
const ZOOM_FROM = 88;
const ZOOM_END = 200;
export const NETWORK_TOTAL = 212;

const RINGS = 50;
const CARD_RINGS = 5;
const SQ = 0.62;

const ringRadii = (r: number) => ({ rx: 620 + r * 185, ry: 300 + r * 92 });

const squirclePoint = (r: number, t: number, drift: number) => {
  const a = t * Math.PI * 2 + drift * (r % 2 === 0 ? 1 : -1);
  const { rx, ry } = ringRadii(r);
  const c = Math.cos(a);
  const sn = Math.sin(a);
  return {
    x: CX + Math.sign(c) * Math.pow(Math.abs(c), SQ) * rx,
    y: CY + Math.sign(sn) * Math.pow(Math.abs(sn), SQ) * ry,
  };
};

const ringAt = (r: number) => RING_FROM + 150 * (1 - Math.pow(0.94, r));

const RingLine: React.FC<{ ring: number }> = ({ ring }) => {
  const frame = useCurrentFrame();
  const at = ringAt(ring);
  const p = useSpringAt(at, SPRINGS.panel, 34);
  if (frame < at) return null;
  const drift = frame * DRIFT;
  const pts = Array.from({ length: 90 }, (_, k) =>
    squirclePoint(ring, k / 90, drift),
  );
  const d = `M ${pts.map((pt) => `${pt.x} ${pt.y}`).join(" L ")} Z`;
  const { rx } = ringRadii(ring);
  const pad = rx + 400;
  return (
    <svg
      width={1920 + pad * 2}
      height={1080 + pad * 2}
      viewBox={`${-pad} ${-pad} ${1920 + pad * 2} ${1080 + pad * 2}`}
      style={{ position: "absolute", left: -pad, top: -pad }}
    >
      <path
        d={d}
        stroke="#C19767"
        strokeWidth={2.2}
        fill="none"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1 - p}
        opacity={0.55}
      />
    </svg>
  );
};

const StoreCard: React.FC<{ ring: number; slot: number; slots: number }> = ({
  ring,
  slot,
  slots,
}) => {
  const frame = useCurrentFrame();
  const at = ringAt(ring) + 6 + slot * 2;
  const pop = useSpringAt(at, SPRINGS.pop, 18);
  const idx = ring * 7 + slot;
  const { domain, dr } = STORES[idx % STORES.length];
  const { x, y } = squirclePoint(ring, slot / slots + ring * 0.07, frame * DRIFT);
  if (frame < at) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `translate(-50%, -50%) scale(${interpolate(pop, [0, 1], [0.5, 1])})`,
        opacity: pop,
        display: "flex",
        alignItems: "center",
        gap: 10,
        background: "#FFFFFF",
        border: "1px solid rgba(23,19,16,0.07)",
        borderRadius: 11,
        boxShadow: "0 12px 30px rgba(74,53,29,0.16)",
        padding: "10px 16px",
        fontSize: 19,
        fontWeight: 700,
        color: "#171310",
        whiteSpace: "nowrap",
        fontFamily: "'Plus Jakarta Sans'",
      }}
    >
      <Img
        src={staticFile(`appicons/${domain}.png`)}
        style={{ width: 28, height: 28, borderRadius: 7 }}
      />
      {domain}
      <span
        style={{
          fontSize: 14,
          fontWeight: 800,
          color: "#0F6B4F",
          background: "#DEF3EA",
          borderRadius: 6,
          padding: "3px 8px",
        }}
      >
        DR {dr}
      </span>
    </div>
  );
};

const FILLER: string[] = [
  "stillmind.app", "loopy.app", "notely.app", "brightwake.app",
  "focusdeck.app", "lumelist.app", "tidalhabits.app", "paperbook.app",
  "moodkit.app", "quietloop.app", "streakly.app", "petalnotes.app",
  "emberfocus.app", "coppertask.app", "driftlog.app", "junipercal.app",
  "goldenhour.app", "willowmind.app", "saltmeter.app", "birchtimer.app",
  "cloverbudget.app", "wildplate.app", "mossmoney.app", "sundialrun.app",
  "ferriscoach.app", "quartzsleep.app", "bluffride.app", "meridianfit.app",
  "hearthmeals.app", "gulfsplit.app", "larkspurread.app", "atlasroutes.app",
  "novelnotes.app", "reedbudget.app", "shorelinesurf.app", "maplelearn.app",
];

const MiniCard: React.FC<{ ring: number; slot: number; slots: number }> = ({
  ring,
  slot,
  slots,
}) => {
  const frame = useCurrentFrame();
  const at = ringAt(ring) + 4 + slot * 1.2;
  const pop = useSpringAt(at, SPRINGS.pop, 14);
  const idx = ring * 11 + slot;
  const domain = FILLER[idx % FILLER.length];
  const dr = 28 + ((idx * 13) % 37);
  const { x, y } = squirclePoint(ring, slot / slots + ring * 0.045, frame * DRIFT);
  if (frame < at) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `translate(-50%, -50%) scale(${interpolate(pop, [0, 1], [0.5, 1])})`,
        opacity: pop,
        display: "flex",
        alignItems: "center",
        gap: 8,
        background: "#FFFFFF",
        border: "1px solid rgba(23,19,16,0.07)",
        borderRadius: 10,
        boxShadow: "0 8px 22px rgba(74,53,29,0.14)",
        padding: "8px 13px",
        fontSize: 17,
        fontWeight: 700,
        color: "#171310",
        whiteSpace: "nowrap",
        fontFamily: "'Plus Jakarta Sans'",
      }}
    >
      {domain}
      <span
        style={{
          fontSize: 12,
          fontWeight: 800,
          color: "#0F6B4F",
          background: "#DEF3EA",
          borderRadius: 5,
          padding: "2px 7px",
        }}
      >
        DR {dr}
      </span>
    </div>
  );
};

const SPARK_COUNT = 30;

const Sparks: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <svg width={1920} height={1080} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
      {Array.from({ length: SPARK_COUNT }, (_, j) => {
        const ring = j % 3;
        const at = SPARKS_FROM + j * 2.2;
        const dur = 20;
        if (frame < at || frame > at + dur + 6) return null;
        const t0 = ((j * 13) % 17) / 17;
        const t = interpolate(frame, [at, at + dur], [t0, t0 + 0.09], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const p = squirclePoint(ring, t, frame * DRIFT);
        const o = interpolate(frame, [at, at + 3, at + dur, at + dur + 6], [0, 1, 1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <g key={j} opacity={o}>
            <circle cx={p.x} cy={p.y} r={7} fill="#C19767" />
            <circle cx={p.x} cy={p.y} r={13} fill="#C19767" opacity={0.3} />
          </g>
        );
      })}
    </svg>
  );
};

const CARD_SLOTS = [10, 12, 14, 16, 18];
const DOT_SLOTS = 16;

export const NetworkScene: React.FC = () => {
  const frame = useCurrentFrame();
  const youIn = useReveal(4, 20, 18);
  const capIn = useReveal(100, 20, 18);
  const count = interpolate(frame, [104, 170], [0, 3000], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const zoom =
    frame < ZOOM_FROM
      ? 1
      : Math.pow(0.15, Math.min((frame - ZOOM_FROM) / (ZOOM_END - ZOOM_FROM), 1));
  return (
    <AbsoluteFill style={{ background: "var(--background)", fontFamily: "'Plus Jakarta Sans'" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `scale(${zoom})`,
          transformOrigin: `${CX}px ${CY}px`,
        }}
      >
        {Array.from({ length: RINGS }, (_, r) => (
          <RingLine key={r} ring={r} />
        ))}
        <Sparks />
        {Array.from({ length: CARD_RINGS }, (_, r) =>
          Array.from({ length: CARD_SLOTS[r] }, (_, k) => (
            <StoreCard key={`${r}-${k}`} ring={r} slot={k} slots={CARD_SLOTS[r]} />
          )),
        )}
        {Array.from({ length: 27 }, (_, ri) =>
          Array.from({ length: DOT_SLOTS }, (_, k) => (
            <MiniCard key={`${ri}-${k}`} ring={ri + CARD_RINGS} slot={k} slots={DOT_SLOTS} />
          )),
        )}
        <div
          style={{
            ...youIn,
            position: "absolute",
            left: CX - 210,
            top: CY - 105,
            width: 420,
            background: "#FFFFFF",
            borderRadius: 14,
            boxShadow: "0 26px 70px rgba(74,53,29,0.28)",
            border: "1px solid rgba(23,19,16,0.07)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 9,
              padding: "11px 16px",
              borderBottom: "1px solid rgba(23,19,16,0.08)",
            }}
          >
            {["#F87171", "#FBBF24", "#34D399"].map((c) => (
              <span key={c} style={{ width: 10, height: 10, borderRadius: 5, background: c }} />
            ))}
            <span
              style={{
                marginLeft: 8,
                fontSize: 15,
                fontWeight: 600,
                color: "rgba(23,19,16,0.55)",
                background: "rgba(23,19,16,0.05)",
                borderRadius: 6,
                padding: "3px 12px",
              }}
            >
              dusk.app
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "18px 20px",
            }}
          >
            <Img
              src={staticFile("appicons/dusk.app.png")}
              style={{ width: 74, height: 74, borderRadius: 16 }}
            />
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <span style={{ fontSize: 24, fontWeight: 800, color: "#171310" }}>Dusk</span>
              <span
                style={{
                  alignSelf: "flex-start",
                  fontSize: 15,
                  fontWeight: 800,
                  color: "#0F6B4F",
                  background: "#DEF3EA",
                  borderRadius: 6,
                  padding: "3px 9px",
                }}
              >
                in the exchange
              </span>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          ...capIn,
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 56,
          textAlign: "center",
          fontSize: 62,
          fontWeight: 800,
          letterSpacing: "-0.03em",
          color: "#171310",
        }}
      >
        <HighlightWord at={130}>{Math.round(count).toLocaleString("en-US")}</HighlightWord>{" "}
        websites
      </div>
    </AbsoluteFill>
  );
};
