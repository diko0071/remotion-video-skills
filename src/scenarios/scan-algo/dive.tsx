import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { evolvePath, getLength, getPointAtLength } from "@remotion/paths";
import { SPRINGS, blink, typing, useSpringAt } from "../../core/motion";
import { GSC_BLUE, GSC_PURPLE, GscChip, GscMetricTile } from "../../kit/gsc";
import { KineticLine } from "../../kit/kinetic-text";
import { Cursor } from "../../kit/cursor";
import { SfxTrack } from "../../kit/sfx";
import { Spark } from "../../kit/spark";
import { CrashCard } from "./crash-scene";
import { TWEETS } from "./tweet-card";

const DOMAIN = "grazaoliveoil.com";
const INK = "#171310";
const WORLD_H = 3900;

const CHART_ZONE = { x0: 170, x1: 1760 };
const DROP_X = 1500;
const RECEIVER = { x: 540, y: 3020 };
const FINAL_CAM_Y = 2760;

const wave = (x: number) => {
  const t = (x - CHART_ZONE.x0) / (DROP_X - CHART_ZONE.x0);
  return 620 - Math.sin(x / 120) * 62 - Math.sin(x / 51 + 2) * 26 - t * 150;
};

const STATIC_END = 520;

const buildStatic = () => {
  let d = `M ${CHART_ZONE.x0} ${wave(CHART_ZONE.x0).toFixed(1)}`;
  for (let x = CHART_ZONE.x0 + 14; x <= STATIC_END; x += 14) d += ` L ${x} ${wave(x).toFixed(1)}`;
  return d;
};

const buildLine = () => {
  let d = `M ${STATIC_END} ${wave(STATIC_END).toFixed(1)}`;
  for (let x = STATIC_END + 14; x <= DROP_X; x += 14) d += ` L ${x} ${wave(x).toFixed(1)}`;
  d += ` C ${DROP_X + 40} ${wave(DROP_X) + 420}, ${DROP_X + 30} ${1500}, ${DROP_X - 20} ${2050}`;
  d += ` L ${DROP_X - 40} ${2540}`;
  d += ` C ${DROP_X - 60} ${2960}, ${RECEIVER.x + 520} ${RECEIVER.y}, ${RECEIVER.x} ${RECEIVER.y}`;
  return d;
};

const buildWaveOnly = () => {
  let d = `M ${STATIC_END} ${wave(STATIC_END).toFixed(1)}`;
  for (let x = STATIC_END + 14; x <= DROP_X; x += 14) d += ` L ${x} ${wave(x).toFixed(1)}`;
  return d;
};

const STATIC_D = buildStatic();
const LINE_D = buildLine();
const LINE_LEN = getLength(LINE_D);
const WAVE_LEN = getLength(buildWaveOnly());

const DRAW_FROM = 6;
const DROP_FRAME = 44;
const ARRIVE = 84;
const TEXT_AT = 94;
const TEXT_OUT = 166;
const INPUT_AT = 174;
const TYPE_FROM = 188;
const TYPE_TO = 208;
const CLICK_AT = 220;
const RUN_AT = 225;
const STATUS_SPAN = 30;
const EXIT_AT = RUN_AT + 4 + STATUS_SPAN * 3 + 4;

export const DIVE_TOTAL = EXIT_AT + 16;

const lineProgress = (frame: number) => {
  const p1 = interpolate(frame, [DRAW_FROM, DROP_FRAME], [0, 0.42], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const p2 = interpolate(frame, [DROP_FRAME, ARRIVE], [0, 0.58], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return Math.min(1, p1 + p2);
};

const NodeFrame: React.FC<{ children: React.ReactNode; w: number }> = ({ children, w }) => (
  <div
    style={{
      position: "relative",
      width: w,
      borderRadius: 26,
      border: "1.5px solid rgba(23,19,16,0.25)",
      background: "#fffdf8",
      padding: 12,
      boxShadow: "0 10px 34px rgba(23,19,16,0.08)",
    }}
  >
    {children}
  </div>
);

const Widget: React.FC<{ x: number; y: number; at: number; tilt?: number; dim?: number; small?: boolean; children: React.ReactNode }> = ({
  x,
  y,
  at,
  tilt = 0,
  dim = 1,
  small,
  children,
}) => {
  const frame = useCurrentFrame();
  const pop = useSpringAt(at, SPRINGS.card);
  if (frame < at) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        translate: "-50% -50%",
        rotate: `${tilt}deg`,
        scale: String(interpolate(pop, [0, 1], [0.6, 1]) * (small ? 0.82 : 1)),
        opacity: Math.min(1, pop * 1.4) * dim,
      }}
    >
      {children}
    </div>
  );
};

const SmallTweet: React.FC<{ index: number }> = ({ index }) => {
  const tweet = TWEETS[index];
  return (
    <NodeFrame w={340}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "2px 4px 8px" }}>
        <span style={{ width: 34, height: 34, borderRadius: 999, overflow: "hidden", flex: "none" }}>
          <Img src={staticFile(tweet.avatar)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </span>
        <span style={{ fontSize: 16, fontWeight: 700, color: "#0f1419" }}>{tweet.name}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#0f1419" style={{ marginLeft: "auto" }}>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </div>
      <div style={{ fontSize: 15.5, lineHeight: 1.4, color: "#0f1419", padding: "0 4px 4px" }}>{tweet.text}</div>
    </NodeFrame>
  );
};


const STATUSES = ["Running your audit...", "Scraping all pages...", "Checking spam signals..."];

const StatusText: React.FC<{ text: string; at: number; hideAt: number | null }> = ({ text, at, hideAt }) => {
  const frame = useCurrentFrame();
  const on = useSpringAt(at, SPRINGS.card);
  const off = useSpringAt(hideAt ?? 1e6, SPRINGS.smooth, 10);
  if (frame < at) return null;
  return (
    <span
      style={{
        position: "absolute",
        left: 0,
        top: "50%",
        translate: `0 calc(-50% + ${(1 - on) * 26 - off * 26}px)`,
        opacity: Math.min(1, on * 1.4) * (1 - off),
        whiteSpace: "nowrap",
      }}
    >
      {text}
    </span>
  );
};

const MiniPill: React.FC<{ label: string; tone?: "red" | "muted" }> = ({ label, tone = "red" }) => (
  <span
    style={{
      display: "inline-block",
      background: tone === "red" ? "#d93025" : "#fffdf8",
      color: tone === "red" ? "#fff" : "#64748b",
      border: tone === "red" ? undefined : "1.5px solid rgba(23,19,16,0.2)",
      fontWeight: 800,
      fontSize: 17,
      borderRadius: 999,
      padding: "5px 14px",
      boxShadow: "0 8px 24px rgba(23,19,16,0.08)",
    }}
  >
    {label}
  </span>
);

const MiniSpark: React.FC<{ seed: number }> = ({ seed }) => (
  <svg width={150} height={54} viewBox="0 0 150 54">
    <path
      d={`M 4 ${20 + Math.sin(seed) * 6} C 24 ${14 + Math.sin(seed * 2) * 5}, 40 ${24 + Math.cos(seed) * 5}, 62 ${18 + Math.sin(seed * 3) * 4} L 84 ${16 + Math.cos(seed * 2) * 4} C 92 ${16}, 94 34, 98 44 C 112 48, 130 46, 146 47`}
      fill="none"
      stroke={GSC_PURPLE}
      strokeWidth={5}
      strokeLinecap="round"
      opacity={0.9}
    />
  </svg>
);

const MiniDot: React.FC = () => (
  <span style={{ position: "relative", display: "inline-block", width: 26, height: 26 }}>
    <span style={{ position: "absolute", inset: 0, borderRadius: 999, border: "1.5px solid rgba(23,19,16,0.3)" }} />
    <span style={{ position: "absolute", left: 8, top: 8, width: 10, height: 10, borderRadius: 999, background: "#171310", opacity: 0.65 }} />
  </span>
);

const fmt = (value: number) => (value >= 1000 ? `${Math.round(value / 1000)}K` : String(Math.round(value)));

export const SceneDive: React.FC = () => {
  const frame = useCurrentFrame();
  const progress = lineProgress(frame);
  const evo = evolvePath(progress, LINE_D);
  const head = getPointAtLength(LINE_D, LINE_LEN * progress);
  const hx = head?.x ?? 0;
  const hy = head?.y ?? 0;

  const CAM_START = -110;
  const followY = Math.min(WORLD_H - 1080, hy - 620);
  const settleMix = interpolate(frame, [ARRIVE - 30, ARRIVE - 4], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const falling = LINE_LEN * progress > WAVE_LEN;
  const chased = falling ? Math.max(CAM_START, followY) : CAM_START;
  const camY = chased * (1 - settleMix) + FINAL_CAM_Y * settleMix;

  const fall = interpolate(frame, [DROP_FRAME, DROP_FRAME + 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const impressions = fall > 0 ? interpolate(fall, [0, 1], [859000, 213000]) : interpolate(progress, [0, 0.42], [610000, 859000], { extrapolateRight: "clamp" });
  const clicks = fall > 0 ? interpolate(fall, [0, 1], [14200, 3600]) : interpolate(progress, [0, 0.42], [9800, 14200], { extrapolateRight: "clamp" });
  const lineFade = interpolate(frame, [ARRIVE + 4, ARRIVE + 18], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const threadsIn = interpolate(frame, [ARRIVE - 34, ARRIVE - 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const textOut = useSpringAt(TEXT_OUT, SPRINGS.smooth, 14);
  const inputIn = useSpringAt(INPUT_AT, SPRINGS.card);
  const exitOut = useSpringAt(EXIT_AT, SPRINGS.panel, 14);
  const typed = typing(frame, DOMAIN, TYPE_FROM, TYPE_TO);
  const caret = frame >= TYPE_FROM && frame < CLICK_AT && blink(frame, 20);
  const press = interpolate(frame, [CLICK_AT - 4, CLICK_AT, CLICK_AT + 5], [1, 0.85, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const inputOut = useSpringAt(RUN_AT, SPRINGS.smooth, 12);

  return (
    <AbsoluteFill style={{ background: "var(--background)", overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          width: 1920,
          height: WORLD_H,
          translate: `0 ${-camY}px`,
          scale: String(1 - exitOut * 0.96),
          opacity: 1 - exitOut * 0.55,
          filter: exitOut > 0.1 ? `blur(${exitOut * 6}px)` : undefined,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 40,
            top: 40,
            width: 1840,
            borderRadius: 16,
            background: "#fff",
            border: "1px solid rgba(15,23,42,0.1)",
            boxShadow: "0 50px 130px rgba(23,19,16,0.16)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 20, padding: "16px 28px", borderBottom: "1px solid #eceae4" }}>
            <Img src={staticFile("ai/gsc.png")} style={{ width: 30, height: 30 }} />
            <span style={{ fontSize: 20, color: "#5f6368" }}>Google Search Console</span>
            <div style={{ flex: 1, maxWidth: 660, margin: "0 14px", display: "flex", alignItems: "center", gap: 12, background: "#e8f0fe", borderRadius: 999, padding: "10px 20px", fontSize: 16, color: "#5f6368" }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#5f6368" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg>
              Inspect any URL in “{DOMAIN}”
            </div>
            <span style={{ marginLeft: "auto", fontSize: 17, color: "#202124", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 10, height: 10, borderRadius: 999, background: "#34a853" }} />
              {DOMAIN}
            </span>
            <div style={{ width: 32, height: 32, borderRadius: 999, background: "linear-gradient(135deg,#C19767,#8a6a43)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700 }}>
              D
            </div>
          </div>
          <div style={{ padding: "18px 30px 30px", display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 21, color: "#202124", marginRight: 12 }}>Performance on Search results</span>
              <GscChip label="3 months" checked />
              <GscChip label="28 days" />
              <GscChip label="+ Add filter" />
              <span style={{ marginLeft: "auto", fontSize: 14, color: "#5f6368" }}>Last updated: 3 hours ago</span>
            </div>
            <div style={{ display: "flex", gap: 3 }}>
              <GscMetricTile label="Total clicks" value={fmt(clicks)} color={GSC_BLUE} selected width={444} />
              <GscMetricTile label="Total impressions" value={fmt(impressions)} color={GSC_PURPLE} selected width={444} />
              <GscMetricTile label="Average CTR" value="2.8%" width={444} />
              <GscMetricTile label="Average position" value="14.1" width={444} />
            </div>
            <div style={{ position: "relative", height: 430 }}>
              {[0.25, 0.5, 0.75, 1].map((g) => (
                <div key={g} style={{ position: "absolute", left: 0, right: 0, top: 430 * g - 1, height: 1, background: "#f0f1f3" }} />
              ))}
            </div>
          </div>
        </div>

        <svg width={1920} height={WORLD_H} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
          <g stroke="rgba(23,19,16,0.13)" strokeWidth={1.6} strokeDasharray="3 8" fill="none" opacity={threadsIn}>
            <path d="M 300 2900 Q 380 2960, 430 2960" />
            <path d="M 900 2820 Q 760 2880, 660 2920" />
            <path d="M 1560 2900 Q 1200 2990, 800 3000" />
            <path d="M 1660 3300 Q 1260 3220, 800 3070" />
            <path d="M 260 3280 Q 280 3180, 340 3110" />
          </g>
          <g opacity={lineFade}>
            <path d={STATIC_D} fill="none" stroke={GSC_PURPLE} strokeWidth={11} strokeLinecap="round" />
            <path
              d={LINE_D}
              fill="none"
              stroke={GSC_PURPLE}
              strokeWidth={11}
              strokeLinecap="round"
              strokeDasharray={evo.strokeDasharray}
              strokeDashoffset={evo.strokeDashoffset}
            />
          </g>
          {progress < 0.995 ? <circle cx={hx} cy={hy} r={15} fill="#fff" stroke={GSC_PURPLE} strokeWidth={6} /> : null}
        </svg>


        <Widget x={210} y={2840} at={ARRIVE - 40} tilt={-3} dim={0.38} small>
          <SmallTweet index={5} />
        </Widget>
        <Widget x={960} y={2760} at={ARRIVE - 36} tilt={2} dim={0.35} small>
          <NodeFrame w={280}>
            <CrashCard domain="thecozyhomeshop.com" delta="-67%" seed={23} width={250} />
          </NodeFrame>
        </Widget>
        <Widget x={1700} y={2860} at={ARRIVE - 32} tilt={3} dim={0.38} small>
          <NodeFrame w={280}>
            <CrashCard domain="brightland.co" delta="-48%" seed={11} width={250} />
          </NodeFrame>
        </Widget>
        <Widget x={1760} y={3300} at={ARRIVE - 28} tilt={-2} dim={0.42} small>
          <NodeFrame w={120}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 94, height: 94 }}>
              <Img src={staticFile("ai/gsc.png")} style={{ width: 62, height: 62 }} />
            </div>
          </NodeFrame>
        </Widget>
        <Widget x={1680} y={3700} at={ARRIVE - 24} tilt={2} dim={0.38} small>
          <SmallTweet index={0} />
        </Widget>
        <Widget x={230} y={3680} at={ARRIVE - 16} tilt={2} dim={0.38} small>
          <SmallTweet index={4} />
        </Widget>
        <Widget x={410} y={3510} at={ARRIVE - 26} tilt={-4} dim={0.4} small>
          <MiniPill label="-42%" />
        </Widget>
        <Widget x={1330} y={2790} at={ARRIVE - 34} tilt={3} dim={0.34} small>
          <MiniPill label="-58%" />
        </Widget>
        <Widget x={1505} y={3555} at={ARRIVE - 22} tilt={-3} dim={0.42} small>
          <MiniSpark seed={5} />
        </Widget>
        <Widget x={615} y={3740} at={ARRIVE - 14} tilt={2} dim={0.4} small>
          <MiniSpark seed={9} />
        </Widget>
        <Widget x={960} y={3690} at={ARRIVE - 18} dim={0.4} small>
          <MiniDot />
        </Widget>
        <Widget x={140} y={3060} at={ARRIVE - 24} dim={0.38} small>
          <MiniDot />
        </Widget>
        <Widget x={1420} y={3180} at={ARRIVE - 30} dim={0.34} small>
          <MiniDot />
        </Widget>
        <Widget x={1240} y={3640} at={ARRIVE - 12} tilt={-2} dim={0.32} small>
          <MiniPill label="Impressions ↓" tone="muted" />
        </Widget>
        <Widget x={160} y={3280} at={ARRIVE - 20} tilt={-2} dim={0.4} small>
          <NodeFrame w={120}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 94, height: 94 }}>
              <svg width="58" height="58" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 5.8 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.6-.4-3.9z"/><path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 5.8 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-1.9 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.1 5.7l6.2 5.2C36.9 40.2 44 35 44 24c0-1.3-.1-2.6-.4-3.9z"/></svg>
            </div>
          </NodeFrame>
        </Widget>

        <div
          style={{
            position: "absolute",
            left: RECEIVER.x,
            top: RECEIVER.y,
            translate: "-50% -50%",
          }}
        >
          <Widget x={0} y={0} at={ARRIVE - 48}>
            <NodeFrame w={400}>
              <CrashCard domain={DOMAIN} delta="-71%" seed={4} width={370} progress={Math.min(1, Math.max(0.15, (frame - ARRIVE + 30) / 40))} />
            </NodeFrame>
          </Widget>
        </div>

        {frame >= TEXT_AT && frame < INPUT_AT + 10 ? (
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: FINAL_CAM_Y + 500,
              display: "flex",
              justifyContent: "center",
              opacity: 1 - textOut,
              translate: `0 ${textOut * -60}px`,
            }}
          >
            <KineticLine
              at={TEXT_AT}
              span={48}
              size={96}
              maxWidth={1500}
              parts={[
                { word: "Google" },
                { image: "ai/google.svg", size: 104, imgHeight: 72 },
                { word: "just" },
                { word: "updated" },
                { br: true },
                { word: "the" },
                { word: "spam" },
                { word: "filters." },
              ]}
            />
          </div>
        ) : null}

        {frame >= INPUT_AT && inputOut < 0.98 ? (
          <div
            style={{
              position: "absolute",
              left: 960,
              top: FINAL_CAM_Y + 540,
              translate: `-50% calc(-50% + ${(1 - inputIn) * 420}px)`,
              opacity: 1 - inputOut,
              display: "flex",
              alignItems: "center",
              gap: 18,
              width: 720,
              borderRadius: 16,
              border: `3px solid ${INK}`,
              background: "#fffdf8",
              padding: "20px 26px",
              boxShadow: "0 20px 60px rgba(23,19,16,0.12)",
              filter: inputIn < 0.85 ? `blur(${(1 - inputIn) * 6}px)` : undefined,
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            <span style={{ fontSize: 28, color: typed ? INK : "#94a3b8", whiteSpace: "nowrap" }}>
              {typed || "yourwebsite.com"}
              {caret && typed ? <span style={{ borderLeft: `3px solid ${INK}`, marginLeft: 2 }} /> : null}
            </span>
            <span
              style={{
                marginLeft: "auto",
                width: 50,
                height: 50,
                borderRadius: 10,
                background: INK,
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                scale: String(press),
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </span>
          </div>
        ) : null}

        {frame >= RUN_AT + 4 ? (
          <div
            style={{
              position: "absolute",
              left: 700,
              top: FINAL_CAM_Y + 540,
              translate: "0 -50%",
              display: "flex",
              alignItems: "center",
              gap: 18,
              fontSize: 46,
              fontWeight: 700,
              color: INK,
              letterSpacing: "-0.02em",
            }}
          >
            <Spark at={RUN_AT + 4} size={44} />
            <span style={{ position: "relative", height: 60, width: 700 }}>
              {STATUSES.map((text, i) => (
                <StatusText
                  key={text}
                  text={text}
                  at={RUN_AT + 4 + i * STATUS_SPAN}
                  hideAt={i < STATUSES.length - 1 ? RUN_AT + 4 + (i + 1) * STATUS_SPAN - 4 : null}
                />
              ))}
            </span>
          </div>
        ) : null}

        {frame >= INPUT_AT + 4 ? (
          <div style={{ position: "absolute", inset: 0, opacity: 1 - inputOut }}>
          <Cursor
            appearAt={INPUT_AT + 4}
            scale={2.1}
            stops={[
              { x: 1620, y: FINAL_CAM_Y + 1140, at: INPUT_AT + 4 },
              { x: 1262, y: FINAL_CAM_Y + 532, at: CLICK_AT, click: true },
            ]}
          />
          </div>
        ) : null}
      </div>

      <SfxTrack hits={[{ name: "mouse-click", at: CLICK_AT, volume: 0.5 }]} />
    </AbsoluteFill>
  );
};
