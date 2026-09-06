import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { SPRINGS, useSpringAt } from "../../core/motion";

const W = 1360;
const H = 420;

const line = (seed: number, drop: number, up: boolean) => {
  const pts: string[] = [];
  for (let i = 0; i < 60; i++) {
    const t = i / 59;
    const wave = Math.sin(t * 40 + seed) * 0.06 + Math.sin(t * 21 + seed * 2) * 0.04;
    let v: number;
    if (up) {
      v = 0.3 + t * 0.5 + wave;
    } else if (t < drop) {
      v = 0.55 + t * 0.25 + wave;
    } else {
      const fall = Math.min(1, (t - drop) / 0.06);
      v = interpolate(fall, [0, 1], [0.55 + drop * 0.25, 0.07 + wave * 0.15]);
    }
    pts.push(`${i === 0 ? "M" : "L"}${(t * W).toFixed(0)},${(H - v * H).toFixed(0)}`);
  }
  return pts.join("");
};

export const CrashCard: React.FC<{
  domain: string;
  delta: string;
  seed: number;
  up?: boolean;
  width?: number;
  progress?: number;
}> = ({ domain, delta, seed, up, width = 420, progress = 1 }) => {
  const color = up ? "#059669" : "#7c4dff";
  const n = Math.max(2, Math.floor(60 * progress));
  const d = line(seed, 0.55 + (seed % 3) * 0.08, Boolean(up))
    .split(/(?=[ML])/)
    .slice(0, n)
    .join("");
  return (
    <div
      style={{
        width,
        background: "#ffffff",
        borderRadius: 12,
        border: "1px solid rgba(15,23,42,0.1)",
        boxShadow: "0 18px 50px rgba(23,19,16,0.14)",
        padding: "14px 16px 10px",
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: width * 0.032, color: "#64748b" }}>
        <span style={{ width: 8, height: 8, borderRadius: 999, background: color }} />
        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{domain}</span>
        <span
          style={{
            marginLeft: "auto",
            background: up ? "#059669" : "#d93025",
            color: "#fff",
            fontWeight: 800,
            fontSize: width * 0.033,
            borderRadius: 999,
            padding: "2px 10px",
          }}
        >
          {delta}
        </span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: width * 0.42, display: "block" }}>
        <line x1={0} x2={W} y1={H} y2={H} stroke="#e5e2da" strokeWidth={3} />
        <path d={d} fill="none" stroke={color} strokeWidth={7} />
      </svg>
    </div>
  );
};

type Drop = { domain: string; delta: string; col: number; start: number; speed: number; rot: number; width: number; seed: number };

const DOMAINS: [string, string][] = [
  ["thestylenest.com", "-62%"],
  ["peakgearlab.com", "-48%"],
  ["urbanplanted.co", "-71%"],
  ["dailybrewhq.com", "-55%"],
  ["thecozyhomeshop.com", "-67%"],
  ["trailandsummit.co", "-43%"],
  ["purepetgoods.com", "-58%"],
  ["modernmakerstudio.com", "-74%"],
  ["freshplateclub.com", "-51%"],
  ["thelinenloft.co", "-64%"],
  ["brightpathlearning.com", "-46%"],
  ["wildbloomskincare.com", "-69%"],
  ["gearedupcycling.com", "-53%"],
  ["theweekendchef.co", "-60%"],
  ["nestandnook.shop", "-66%"],
  ["summitroasters.com", "-49%"],
];

const DROPS: Drop[] = Array.from({ length: 34 }, (_, i) => {
  const [domain, delta] = DOMAINS[i % DOMAINS.length];
  return {
    domain,
    delta,
    col: -140 + ((i * 331) % 1960),
    start: -((i * 173) % 110),
    speed: 7 + ((i * 89) % 55) / 10,
    rot: (((i * 211) % 11) - 5) * 0.9,
    width: 340 + ((i * 127) % 180),
    seed: i + 1,
  };
});

export const CrashRain: React.FC<{ dim?: boolean; slow?: boolean }> = ({ dim, slow }) => {
  const frame = useCurrentFrame();
  const factor = (slow ? 0.35 : 1) * (1 + frame * 0.006);
  return (
    <AbsoluteFill style={{ overflow: "hidden", opacity: dim ? 0.3 : 1 }}>
      {DROPS.map((d, di) => {
        const travel = (frame - d.start) * d.speed * factor;
        const y = ((travel % 1750) + 1750) % 1750 - 420;
        if (y > 1220) return null;
        const blur = dim ? 2 : Math.min(7, d.speed * factor - 6.5);
        return (
          <div
            key={di}
            style={{
              position: "absolute",
              left: d.col,
              top: 0,
              translate: `0 ${y}px`,
              rotate: `${d.rot}deg`,
              filter: blur > 0.4 ? `blur(${blur}px)` : undefined,
            }}
          >
            <CrashCard domain={d.domain} delta={d.delta} seed={d.seed} width={d.width} />
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

export const CRASH_TOTAL_DEFAULT = 188;

export const SceneCrash: React.FC<{ total: number }> = ({ total }) => {
  const frame = useCurrentFrame();
  const catchAt = total - 30;
  const p = useSpringAt(catchAt, SPRINGS.panel, 26);
  const falling = interpolate(frame, [catchAt - 26, catchAt], [-500, 320], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const y = interpolate(p, [0, 1], [falling, 0]);
  const velocity = frame < catchAt ? 10 : Math.max(0, 1 - p) * 8;
  return (
    <AbsoluteFill style={{ background: "var(--background)" }}>
      <CrashRain />
      {frame >= catchAt - 26 ? (
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
          <div
            style={{
              translate: `0 ${y}px`,
              scale: String(interpolate(p, [0, 1], [1, 1.5])),
              filter: velocity > 0.5 ? `blur(${velocity}px)` : undefined,
              boxShadow: "0 40px 110px rgba(23,19,16,0.25)",
              borderRadius: 12,
            }}
          >
            <CrashCard domain="grazaoliveoil.com" delta="-71%" seed={4} width={560} />
          </div>
        </AbsoluteFill>
      ) : null}
    </AbsoluteFill>
  );
};

const GROWTH_WALL: { domain: string; delta: string; seed: number }[] = [
  { domain: "brightland.co", delta: "+24%", seed: 11 },
  { domain: "northwindpress.com", delta: "+31%", seed: 17 },
  { domain: "oakandember.com", delta: "+18%", seed: 23 },
  { domain: "loomhouserugs.com", delta: "+42%", seed: 29 },
  { domain: "pocketmonstercards.com", delta: "+27%", seed: 31 },
  { domain: "fizzmixers.com", delta: "+35%", seed: 37 },
  { domain: "ridewestbus.com", delta: "+21%", seed: 41 },
  { domain: "haulgearparts.com", delta: "+38%", seed: 43 },
  { domain: "ledgerscale.com", delta: "+29%", seed: 47 },
  { domain: "mossvalleyco.com", delta: "+46%", seed: 53 },
  { domain: "summitbrands.co", delta: "+19%", seed: 59 },
  { domain: "harbourcoachlines.com", delta: "+33%", seed: 61 },
];

export const SceneGrowth: React.FC<{ total: number }> = ({ total }) => {
  const frame = useCurrentFrame();
  const push = interpolate(frame, [0, total], [1.02, 1.14], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const tilt = interpolate(frame, [0, 24], [0, -4], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ background: "var(--background)", overflow: "hidden" }}>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 560px)",
            gap: 26,
            rotate: `${tilt}deg`,
            scale: String(push),
            width: 2380,
            flex: "none",
          }}
        >
          {GROWTH_WALL.map((card, i) => {
            const at = 4 + i * 9;
            const p = frame >= at - 2 ? 1 : 0;
            const enter = interpolate(frame, [at, at + 14], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const eased = 1 - Math.pow(1 - enter, 3);
            if (!p) return <div key={card.domain} style={{ height: 300 }} />;
            return (
              <div
                key={card.domain}
                style={{
                  translate: `0 ${(1 - eased) * 120}px`,
                  opacity: Math.min(1, eased * 1.5),
                  filter: eased < 0.8 ? `blur(${(1 - eased) * 8}px)` : undefined,
                }}
              >
                <CrashCard
                  domain={card.domain}
                  delta={card.delta}
                  seed={card.seed}
                  up
                  width={560}
                  progress={Math.min(1, Math.max(0.2, (frame - at) / 50))}
                />
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
